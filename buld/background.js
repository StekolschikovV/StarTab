var bookmarks_menu = {


    id_page: '',
    url_page: '',
    title_page: '',
    page_added: false,
    page_added_parentId: '',
    page_added_id: '',
    dir_added_id_last: '',



    start: function () {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            bookmarks_menu.url_page = tabs[0].url;
            bookmarks_menu.title_page = tabs[0].title;
            chrome.bookmarks.search({url: bookmarks_menu.url_page.toString()}, function (e) {
                if(e[0] != undefined)
                    bookmarks_menu.page_added_id = e[0].id;
                e[0] == undefined ? bookmarks_menu.page_added = false : bookmarks_menu.page_added = true;
                bookmarks_menu.page_added == false ?  bookmarks_menu.page_added_parentId = '' : bookmarks_menu.page_added_parentId = e[0].parentId;
                bookmarks_menu.setTiteAndUrl();
                bookmarks_menu.getTreeDir();
                bookmarks_menu.setTamplate();
            });
            bookmarks_menu.eventsLisner();
        });
        bookmarks_menu.dir_added_id_last = localStorage["lastAddDirId"];
    },



    eventsLisner: function () {
        $('.cancel').click(function () {            window.close();                             });
        $('.add').click(function () {               bookmarks_menu.addBookmark();               });
        $('.new_dir_btn').click(function () {       bookmarks_menu.addNewDir()                  });
        $('.edit').click(function () {              bookmarks_menu.editBookmark()               });
    },



    restart: function () {
        bookmarks_menu.start();
        var timerId = setInterval(function() {      location.reload();                          }, 9000);
    },
    addBookmark: function () {
        chrome.bookmarks.create({
            parentId: $('option:selected', $('.dir')).attr('data-id'),
            title: $('.title').val(),
            url: $('.url').val()
        }, bookmarks_menu.sayInModal('add') );
        localStorage["lastAddDirId"] =  $('option:selected', $('.dir')).attr('data-id');
        bookmarks_menu.restart();
    },
    sayInModal: function (commad) {
        let sayText = '';
        if(commad == 'del')
            sayText = 'item removed';
        else if(commad == 'updated')
            sayText = 'item was updated';
        else if(commad == 'add')
            sayText = 'item added';
        $('#modal .modal-body').text(sayText);
        $('#modal').modal('toggle');
    },
    editBookmark: function () {
        chrome.bookmarks.update(bookmarks_menu.page_added_id.toString(), {
            title: $('#old .title').val(),
            url: $('#old .url').val()
        },
            bookmarks_menu.sayInModal('updated')
        );
    },
    addNewDir: function () {
        chrome.bookmarks.create({
            parentId: '1',
            title: $('.new_dir_title').val().toString(),
            url: null
        });
        bookmarks_menu.sayInModal('add');
        bookmarks_menu.getTreeDir();
    },
    delBookmark: function () {
        chrome.bookmarks.remove(bookmarks_menu.page_added_id);
        bookmarks_menu.sayInModal('del');
        bookmarks_menu.restart();
    },
    setTamplate: function () {
        if(bookmarks_menu.page_added == true){
            $('#new').hide();
            $('#old').show();
            $('.del').click(function () { bookmarks_menu.delBookmark() });
        } else {
            $('#old').hide()
            $('#new').show();
        }
    },
    setTiteAndUrl: function () {
        $('.title').val(bookmarks_menu.title_page);
        $('.url').val(bookmarks_menu.url_page);
    },
    getTreeDir: function () {
        $('.dir').empty();
        chrome.bookmarks.getTree(function(results) {
            var lengthBookmarks = results[0].children[0].children.length;
            function run(lengthBookmarks, i) {
                if(i < lengthBookmarks) {
                    if(results[0].children[0].children[i].children !== undefined){
                        var nameDir = results[0].children[0].children[i].title;
                        var nameId = results[0].children[0].children[i].id;
                        let selected = '';
                        if( bookmarks_menu.dir_added_id_last == nameId )
                            selected = 'selected';
                        $('.dir')
                            .append($(`<option ${selected}></option>`)
                                .attr("value", nameDir)
                                .attr("data-id", nameId)
                                .text(nameDir)
                            );
                        run(lengthBookmarks, i+1)
                    } else {
                        run(lengthBookmarks, i+1)
                    }
                }
            }
            run(lengthBookmarks, 0);
            if (bookmarks_menu.page_added_parentId != '') {
                $('[data-id="' + bookmarks_menu.page_added_parentId + '"]').prop('selected', true);
            }
        });
    }




};
$( document ).ready(function() {
    bookmarks_menu.start();
});



// изменение
$( function() {
    $('.update').on( "click", function () {
        let id = '' + $(this).parent().data('id');
        $('#modal-update').attr('data-id', id);
        chrome.bookmarks.get(id, function (results){
            $('#modal-update .name').val(results[0].title);
            $('#modal-update .url').val(results[0].url);
        });
        $('#modal-update').show();
    });
    $('#modal-update .save').on( "click", function () {
        let id = '' + $(this).parent().parent().data('id');
        chrome.bookmarks.update(String(id), {
            title: $('.modal-window .name').val(),
            url: $('.modal-window .url').val()
        });
        $('#modal-update').hide();
        $('*[data-id="' + id + '"]').find('.title').text($('#modal-update .name').val());
        $('*[data-id="' + id + '"]').find('a').attr("href", $('#modal-update .url').val());
    });
    $('#modal-update .close').on( "click", function () {
        $('#modal-update').hide();
    });
});
// изменение



// картинка
chrome.bookmarks.getTree(function(results) {
    var lengthBookmarks = results[0].children[0].children.length;
    function run(lengthBookmarks, i) {
        if(i < lengthBookmarks) {
            if(results[0].children[0].children[i].children !== undefined){
                var nameDir = results[0].children[0].children[i].title;
                var nameId = results[0].children[0].children[i].id;
                var tabStr =    `<li class="nav-item" data-id="${nameId}" data-dir="true">
                                    <span class="nav-item-id" data-id="${nameId}"></span>
                                    <span class='del'>                               
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                    </span>
                                    <span class='edit' data-toggle="modal" data-target="#edit_dir">
                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </span>
                                    <a class="nav-link" data-toggle="tab" href="#t${nameId}" role="tab">
                                        ${nameDir}
                                    </a>
                                </li>`;
                $( ".nav-tabs" ).append(tabStr);
                var tabContentStrTemp = "";
                chrome.bookmarks.getSubTree( "" + nameId, function(array) {
                    for( j=0; j<array[0].children.length; j++ ){
                        var tabContentText = array[0].children[j].title;
                        var tabContentUrl = array[0].children[j].url;
                        var tabContentId = array[0].children[j].id;
                        let l = document.createElement("a");
                        l.href = tabContentUrl;
                        var imageUrl = `http://stekolschikov.info/extensions/StarTab/screens/${l.hostname}.jpg)`;
                        tabContentStrTemp = tabContentStrTemp + `
                                                                <div class="el" data-id="${tabContentId}" draggable="true">
                                                                    <span class='del'>
                                                                        <i class="fa fa-times" aria-hidden="true"></i>
                                                                    </span>
                                                                    <span class='edit' data-toggle="modal" data-target="#edit">
                                                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                                                    </span>
                                                                    <a href="${tabContentUrl}"  style="background-image: url('http://stekolschikov.info/extensions/StarTab/screens/${l.hostname}.jpg')">
                                                                        <span class="text">` + tabContentText + `</span>
                                                                    </a>
                                                                </div>
                                                                `;
                    }
                    var tabContentStr = '<div class="tab-pane" id="t' + nameId + '" role="tabpanel">'+tabContentStrTemp+'</div>';
                    $( ".tab-content" ).append(tabContentStr);
                    run(lengthBookmarks, i+1)
                });
            } else {
                run(lengthBookmarks, i+1)
            }
        }
    }
    run(lengthBookmarks, 0);
});
// картинка//



let edit_id = 0;
$(document).ready(function () {
    setTimeout(function() {

        // $('.nav-link:first').click();

        // удаление
        del();
        // удаление//

        // изменить
        edit();
        // изменить//

        // сохранить изменения
        $('#edit_dir_save').on( "click", function () {
            let text = $('#edit_dir_title').val();
            chrome.bookmarks.update(''+edit_id, {title: text});
            $("*[data-id='" + edit_id + "']").find('a').text(text);
        });
        $('#link_save').on( "click", function () {
            let link_title = $('#link_title').val();
            let link_url = $('#link_url').val();
            chrome.bookmarks.update(''+edit_id, {title: link_title, url: link_url});
            $("*[data-id='" + edit_id + "']").find('a').attr('href', link_url);
            $("*[data-id='" + edit_id + "']").find('.text').text(link_title);

            let setDir = $('#link_dir').val();
            let activeDir = $('li.nav-item.active').attr('data-id');
            if(setDir != activeDir){
                chrome.bookmarks.move(edit_id.toString(), {parentId: setDir.toString()});
                $('*[data-id="' + edit_id + '"]').detach().appendTo('#t' + setDir)

            }
        });
        // сохранить изменения//

    }, 500);
});


// удаление
function del() {
    $('.del').on( "click", function () {
        let id = '' + $(this).parent().data('id');
        console.log(id)
        let isDir = $(this).parent().attr('data-dir');
        let href = $(this).parent().find('a').attr('href');

        if (isDir == 'true' || href == 'undefined'){
            chrome.bookmarks.removeTree(''+id, function(){
                $('.nav-link').eq(0).click();
                $('.nav-link').eq(1).click();
                $('.nav-link').eq(0).click();
                // console.log('href ',href)
            });
        } else{
            chrome.bookmarks.remove(id);
            // console.log('href2 ',href)
        }
        $(this).parent().remove();
    });
}
// удаление//

// изменить
function edit() {
    $('.edit').on( "click", function () {

        edit_id = '' + $(this).parent().data('id');
        let isDir = $(this).parent().attr('data-dir');
        if (isDir == 'true'){
            let text = $(this).parent().find('a').text();
            // $('#edit_dir_title').val('');
            $('#edit_dir_title').val(text.trim());
        } else{
            let id = '' + $(this).parent().data('id');
            let src = $(this).parent().find('a').attr('href');
            let text = $(this).parent().find('.text').text();
            $('#link_title').val('');
            $('#link_url').val('');
            $('#link_title').val(text);
            $('#link_url').val(src);
            $('#link_dir').empty()

            $('.nav-tabs>li').each(function( index ) {
                let title = $('.nav-tabs>li').eq(index).text().trim();
                let id = $('.nav-tabs>li').eq(index).find('.nav-item-id').attr('data-id');
                let active = $('.nav-tabs>li').eq(index).hasClass( "active" )


                if(active == true){
                    $('#link_dir')
                        .append($("<option></option>")
                            .attr("value",id)
                            .text(title)
                            .attr("selected", "selected")
                        );
                } else {
                    $('#link_dir')
                        .append($("<option></option>")
                            .attr("value",id)
                            .text(title)
                        );
                }

            });
        }
    });
}
// изменить//

















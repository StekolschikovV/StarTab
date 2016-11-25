//
// var  App = {
//     lastUpdatedImg: 0,
//
//     // картинка загрузка//
//     loadImg: function () {
//         setTimeout(function() {
//             checkUrl( $(".tab-content a").length, 0);
//         }, 500);
//     },
//     // картинка загрузка//
//
//     // проверка времени
//     checkLocalStorage: function () {
//         let timeNow = new Date();
//         timeNow = timeNow.getTime();
//         let timeLS = parseInt( localStorage["lastUpdatedImg"] );
//         if(timeLS == undefined || isNaN(timeLS) ){
//             localStorage["lastUpdatedImg"] = timeNow;
//         } else if( ( timeNow - timeLS ) > ( (1000*10) * 5 ) ){
//             localStorage["lastUpdatedImg"] = timeNow;
//             this.loadImg();
//         }
//     }
//     // проверка времени//
// };
//
// App.checkLocalStorage();
//
// // картинка загрузка
// let timer;
// let countLoadImg = 0;
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// function checkUrl(lenght, i) {
//     if(lenght > i){
//         console.log('------------------------');
//         let parser = document.createElement('a');
//         parser.href = $(".tab-content a").eq(i).attr( 'href' );
//         let host = parser.hostname;
//         let imageUrl = `http://stekolschikov.info/extensions/StarTab/screens/${host}.jpg`;
//         let imageUrlGet = `http://stekolschikov.info/extensions/StarTab/getScreenshot.php?url=${host}`;
//         $.ajax ({
//             type: "HEAD",
//             url: imageUrl,
//             success: function (message, text, response) {
//                 if (response.getResponseHeader('Content-Type').indexOf("image") != -1) {
//
//                 } else {
//                     $.get( imageUrlGet, function() {});
//                     countLoadImg++;
//                     console.log(imageUrl)
//                 }
//             },
//             complete: function () {
//                 if(lenght > i + 1){
//                     window.clearTimeout(timer);
//                     timer = window.setTimeout(function(){ checkUrl(lenght, i+1) }, 5);
//                 } else{
//                     if(countLoadImg > 0) {
//                         console.log('nead reload')
//                     }
//                 }
//             }
//         })
//     }
// }
// // картинка загрузка//
//
//
//
//
// // изменение
// $( function() {
//     $('.update').on( "click", function () {
//         let id = '' + $(this).parent().data('id');
//         $('#modal-update').attr('data-id', id);
//         chrome.bookmarks.get(id, function (results){
//             $('#modal-update .name').val(results[0].title);
//             $('#modal-update .url').val(results[0].url);
//         });
//         $('#modal-update').show();
//     });
//     $('#modal-update .save').on( "click", function () {
//         let id = '' + $(this).parent().parent().data('id');
//         chrome.bookmarks.update(String(id), {
//             title: $('.modal-window .name').val(),
//             url: $('.modal-window .url').val()
//         });
//         $('#modal-update').hide();
//         $('*[data-id="' + id + '"]').find('.title').text($('#modal-update .name').val());
//         $('*[data-id="' + id + '"]').find('a').attr("href", $('#modal-update .url').val());
//     });
//     $('#modal-update .close').on( "click", function () {
//         $('#modal-update').hide();
//     });
// });
// // изменение
//
// // поиск
// $( function() {
//     function search(searchIn) {
//         let searchText = $('#search-text').val();
//         if(searchIn == 'google'){
//             window.location.replace('https://www.google.com.ua/search?q=' + searchText);
//         } else {
//             window.location.replace('https://yandex.ua/search/?text=' + searchText);
//         }
//     }
//     $('#google').on( "click", function () {search('google')})
//     $('#yandex').on( "click", function () {search('yandex')})
// });
// // поиск//
//
// // картинка
// chrome.bookmarks.getTree(function(results) {
//     var lengthBookmarks = results[0].children[0].children.length;
//     function run(lengthBookmarks, i) {
//         if(i < lengthBookmarks) {
//             if(results[0].children[0].children[i].children !== undefined){
//                 var nameDir = results[0].children[0].children[i].title;
//                 var nameId = results[0].children[0].children[i].id;
//                 var tabStr = `<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#t${nameId}" role="tab">` + nameDir + `</a></li>`;
//                 $( ".nav-tabs" ).append(tabStr);
//                 var tabContentStrTemp = "";
//                 chrome.bookmarks.getSubTree( "" + nameId, function(array) {
//                     for( j=0; j<array[0].children.length; j++ ){
//                         var tabContentText = array[0].children[j].title;
//                         var tabContentUrl = array[0].children[j].url;
//                         var tabContentId = array[0].children[j].id;
//                         let l = document.createElement("a");
//                         l.href = tabContentUrl;
//                         var imageUrl = `http://stekolschikov.info/extensions/StarTab/screens/${l.hostname}.jpg)`;
//                         tabContentStrTemp = tabContentStrTemp + `<div class="el" data-id="${tabContentId}">
//                                                                     <span class='del'>
//                                                                         <i class="fa fa-times" aria-hidden="true"></i>
//                                                                     </span>
//                                                                     <a href="${tabContentUrl}"  style="background-image: url('http://stekolschikov.info/extensions/StarTab/screens/${l.hostname}.jpg')">
//                                                                         <span class="text">` + tabContentText + `</span>
//
//                                                                     </a>
//                                                                 </div>`;
//                     }
//                     var tabContentStr = '<div class="tab-pane" id="t' + nameId + '" role="tabpanel">'+tabContentStrTemp+'</div>';
//                     $( ".tab-content" ).append(tabContentStr);
//                     run(lengthBookmarks, i+1)
//                 });
//             } else {
//                 run(lengthBookmarks, i+1)
//             }
//         }
//     }
//     run(lengthBookmarks, 0);
// });
// // картинка//
// $(document).ready(function () {
//     setTimeout(function() {
//         $('.nav-link:first').click();
//     }, 500);
// });
//
//
//
//
//
// // удаление
// $( function() {
//
// });
// function addDel() {
//     $('.del').on( "click", function () {
//         let id = '' + $(this).parent().data('id');
//         chrome.bookmarks.remove(id);
//         $(this).parent().remove();
//         // alert(id)
//     })
// }
//
// // удаление
//
//
//

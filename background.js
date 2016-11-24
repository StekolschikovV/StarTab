

// $( function() {
//     $( "#accordion" ).accordion({
//         heightStyle: "content"
//     });
// } );
//
// // подключение стилей
// chrome.tabs.executeScript(null, { file: 'libs/jquery-3.1.1.min.js' }, function() {});
// chrome.tabs.executeScript(null, { file: 'libs/jquery-ui.min.js' }, function() {});
// chrome.tabs.insertCSS(null, { file: 'libs/jquery-ui.min.css' }, function() {});
// chrome.tabs.executeScript(null, { file: 'include/include.js' }, function() {});
// chrome.tabs.insertCSS(null, { file: 'include/include.css' }, function() {});
// // подключение стилей//
//
// // Загрузка значений
// $('#inputAttr').val(localStorage.getItem('inputAttr'));
// $('#inputId').val(localStorage.getItem('inputId'));
// $('#inputClass').val(localStorage.getItem('inputClass'));
// // Загрузка значений//
//
// // Сохранение значений
// function seveInf() {
//     localStorage.setItem('inputAttr', $('#inputAttr').val())
//     localStorage.setItem('inputId', $('#inputId').val())
//     localStorage.setItem('inputClass', $('#inputClass').val())
// }
// window.addEventListener('input', seveInf);
// window.addEventListener('click', seveInf);
// // Сохранение значений//
//
// // Mark DOM
// sendAttr.onclick = function() {
//     var text = $('#inputAttr').val();
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { greeting: "tag: " + text }, function(response) {
//         });
//     });
//
// };
// sendId.onclick = function() {
//     var text = $('#inputId').val();
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { greeting: "id: " + text }, function(response) {
//         });
//     });
// };
// sendClass.onclick = function() {
//     var text = $('#inputClass').val();
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { greeting: "class: " + text }, function(response) {
//         });
//     });
// };
// removeMark.onclick = function() {
//     var text = $('#inputClass').val();
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { greeting: "removeMark: " + text }, function(response) {
//         });
//     });
// };
// // Mark DOM//
//
// // Site info
// var siteUrl = '1';
// chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true
// }, function(tabs) {
//     var tab = tabs[0];
//     getInfo(tab.url);
// });
// function getInfo(siteUrl) {
//     // Получить ЮРЛ
//     var getLocation = function(href) {
//         var l = document.createElement("a");
//         l.href = href;
//         return l;
//     };
//     var url = getLocation(siteUrl);
//     // Получить ЮРЛ//
//     $.get( "http://freegeoip.net/xml/" + url.hostname, function( data ) {
//         function getXmlString(xml) {
//             if (window.ActiveXObject) { return xml.xml; }
//             return new XMLSerializer().serializeToString(xml);
//         }
//         data = getXmlString(data);
//         data = data.replace('<Response>','');
//         data = data.replace('</Response>','');
//         data = data.replace('<IP>','<div id="ipSite">IP: ');
//         data = data.replace('</IP>','</div>');
//         data = data.replace('<CountryCode>','<div id="countryCode">COUNTRY CODE: ');
//         data = data.replace('</CountryCode>','</div>');
//         data = data.replace('<CountryName>','<div id="countryName">COUNTRY NAME: ');
//         data = data.replace('</CountryName>','</div>');
//         data = data.replace('<RegionCode>','<div id="RegionCode">REGION CODE: ');
//         data = data.replace('</RegionCode>','</div>');
//         data = data.replace('<RegionName>','<div id="RegionCode">REGION NAME: ');
//         data = data.replace('</RegionName>','</div>');
//         data = data.replace('<City>','<div id="city">CITY:');
//         data = data.replace('</City>','</div>');
//         data = data.replace('<ZipCode>','<div id="zipCode">ZIP CODE: ');
//         data = data.replace('</ZipCode>','</div>');
//         data = data.replace('<TimeZone>','<div id="timeZone">TIME ZONE: ');
//         data = data.replace('</TimeZone>','</div>');
//         data = data.replace('<Latitude>','<div id="latitude">LATITUDE: ');
//         data = data.replace('</Latitude>','</div>');
//         data = data.replace('<Longitude>','<div id="longitude">LONGITUDE: ');
//         data = data.replace('</Longitude>','</div>');
//         data = data.replace('<MetroCode>','<div id="metroCode">METRO CODE: ');
//         data = data.replace('</MetroCode>','</div>');
//         $('#siteInfo').html(data);
//     });
//     getSeoInfo(url.hostname);
// }
// // Site info//
//
// // Site seo info
// function getSeoInfo(siteUrl) {
//     $.get( "http://api.pr-cy.ru/analysis.json?domain=" + siteUrl, function( data ) {
//         $( '#yandexCatalog span' ).text(data.stats.yandexCatalog);
//         $( '#yandexCatalogDescription span' ).text(data.stats.yandexCatalogDescription);
//         $( '#yandexCatalogTitle span' ).text(data.stats.yandexCatalogTitle);
//         $( '#yandexRang span' ).text(data.stats.yandexRang);
//         $( '#yandexMentions span' ).text(data.stats.yandexMentions);
//         $( '#googleIndex span' ).text(data.stats.googleIndex);
//         $( '#yandexCatalogCategory span' ).text(data.stats.yandexCatalogCategory);
//         $( '#yandexIndex span' ).text(data.stats.yandexIndex);
//         $( '#pageRank span' ).text(data.stats.pageRank);
//         $( '#expirationDate span' ).text(data.stats.expirationDate);
//         $( '#yandexCitation span' ).text(data.stats.yandexCitation);
//         $( '#dmoz span' ).text(data.stats.dmoz);
//     });
// }
// // Site seo info//
//

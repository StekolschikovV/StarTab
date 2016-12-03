
// поиск
$( function() {
    function search(searchIn) {
        let searchText = $('#search-text').val();
        if(searchIn == 'google'){
            window.location.replace('https://www.google.com.ua/search?q=' + searchText);
        } else if (searchIn == 'google_img'){
            window.location.replace('https://www.google.nl/search?tbm=isch&q=' + searchText);
        } else if (searchIn == 'google_map'){
            window.location.replace('https://www.google.nl/maps/search/' + searchText);
        } else if (searchIn == 'google_video'){
            window.location.replace('https://www.google.com.ua/search?tbm=vid&q=' + searchText);
        } else if (searchIn == 'google_news'){
            window.location.replace('https://www.google.com.ua/search?tbm=nws&q=' + searchText);
        } else if (searchIn == 'google_books'){
            window.location.replace('https://www.google.com.ua/search?tbm=bks&q=' + searchText);
        } else if (searchIn == 'yandex'){
            window.location.replace('https://yandex.ua/search/?text=' + searchText);
        } else if (searchIn == 'yandex_img'){
            window.location.replace('https://yandex.ua/images/search?text=' + searchText);
        } else if (searchIn == 'yandex_map'){
            window.location.replace('https://yandex.ua/maps/?text=' + searchText);
        } else if (searchIn == 'yandex_video'){
            window.location.replace('https://yandex.ua/video/search?text=' + searchText);
        } else if (searchIn == 'yandex_news'){
            window.location.replace('https://www.google.com.ua/search?tbm=nws&q=' + searchText);
        } else if (searchIn == 'yandex_market'){
            window.location.replace('https://market.yandex.ua/search.xml?text=' + searchText);
        }
    }
    $('#google').on( "click", function () {search('google')});
    $('#google_img').on( "click", function () {search('google_img')});
    $('#google_map').on( "click", function () {search('google_map')});
    $('#google_video').on( "click", function () {search('google_video')});
    $('#google_news').on( "click", function () {search('google_news')});
    $('#google_books').on( "click", function () {search('google_books')});
    $('#yandex').on( "click", function () {search('yandex')});
    $('#yandex_img').on( "click", function () {search('yandex_img')});
    $('#yandex_map').on( "click", function () {search('yandex_map')});
    $('#yandex_video').on( "click", function () {search('yandex_video')});
    $('#yandex_news').on( "click", function () {search('yandex_news')});
    $('#yandex_market').on( "click", function () {search('yandex_market')});





    $( "#search-text" ).keypress(function(e) {
        if(e.keyCode == 13)
            search('google')
        else if (e.keyCode == 10)
            search('yandex')
    });
    $('#deep-search_add').on( "click", function () {
        let rule = $('#deep-search_rule').val();
        let text = $('#deep-search_text').val();
        let text_in_input = $('#search-text').val();
        let str = "";
        switch (rule) {
            case '0':
                str = " -" + text + " ";
                break;
            case '1':
                str = " +" + text + " ";
                break;
            case '2':
                str = " ~" + text + " ";
                break;
            case '3':
                str = " &" + text + " ";
                break;
            case '4':
                str = ' "' + text + '" ';
                break;
            case '5':
                str = ' site:' + text + ' ';
                break;
            case '6':
                str = ' -site:' + text + ' ';
                break;
            case '7':
                str = ' related:' + text + ' ';
                break;
            case '8':
                str = ' intitle:' + text + ' ';
                break;
            case '9':
                str = ' filetype:' + text + ' ';
                break;
            case '10':
                str = ' translate ' + text + ' ';
                break;
            case '11':
                str = ' define:' + text + ' ';
                break;
        }
            // case 3:
            // case 5:
            //     alert('Неверно!')
            //     break
        $('#search-text').val(text_in_input + str);
    });
});
// поиск//
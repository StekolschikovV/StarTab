$(function() {

    let time_interval = '';
    let url = '';

    // search
    function search(searchIn) {

        let searchText = $('#search-text').val();
        if (searchIn == 'google') {
            url = url + 'https://www.google.com.ua/search?q=';
        } else if (searchIn == 'google_img') {
            url = url + 'https://www.google.nl/search?tbm=isch&q=';
        } else if (searchIn == 'google_map') {
            url = url + 'https://www.google.nl/maps/search/';
        } else if (searchIn == 'google_video') {
            url = url + 'https://www.google.com.ua/search?tbm=vid&q=';
        } else if (searchIn == 'google_news') {
            url = url + 'https://www.google.com.ua/search?tbm=nws&q=';
        } else if (searchIn == 'google_books') {
            url = url + 'https://www.google.com.ua/search?tbm=bks&q=';
        } else if (searchIn == 'yandex') {
            url = url + 'https://yandex.ua/search/?text=';
        } else if (searchIn == 'yandex_img') {
            url = url + 'https://yandex.ua/images/search?text=';
        } else if (searchIn == 'yandex_map') {
            url = url + 'https://yandex.ua/maps/?text=';
        } else if (searchIn == 'yandex_video') {
            url = url + 'https://yandex.ua/video/search?text=';
        } else if (searchIn == 'yandex_news') {
            url = url + 'https://www.google.com.ua/search?tbm=nws&q=';
        } else if (searchIn == 'yandex_market') {
            url = url + 'https://market.yandex.ua/search.xml?text=';
        }
        window.location.replace(url + searchText + time_interval);
    }

    $('#google').on("click", function() { search('google') });
    $('#google_img').on("click", function() { search('google_img') });
    $('#google_map').on("click", function() { search('google_map') });
    $('#google_video').on("click", function() { search('google_video') });
    $('#google_news').on("click", function() { search('google_news') });
    $('#google_books').on("click", function() { search('google_books') });
    $('#yandex').on("click", function() { search('yandex') });
    $('#yandex_img').on("click", function() { search('yandex_img') });
    $('#yandex_map').on("click", function() { search('yandex_map') });
    $('#yandex_video').on("click", function() { search('yandex_video') });
    $('#yandex_news').on("click", function() { search('yandex_news') });
    $('#yandex_market').on("click", function() { search('yandex_market') });

    $("#search-text").keypress(function(e) {
        if (e.keyCode == 13)
            search('google')
        else if (e.keyCode == 10)
            search('yandex')
    });
    // search//

    // deep search
    $('#deep-search_add').on("click", function() {
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
        $('#search-text').val(text_in_input + str);
    });
    // deep search//

    // time interval
    $('#time_interval_add').on("click", function() {
        time_interval = '&' + $('#time_interval_rule').val() + $('#time_interval_text').val();
    });
    // time interval//



});

// поиск
$( function() {
    function search(searchIn) {
        let searchText = $('#search-text').val();
        if(searchIn == 'google'){
            window.location.replace('https://www.google.com.ua/search?q=' + searchText);
        } else {
            window.location.replace('https://yandex.ua/search/?text=' + searchText);
        }
    }
    $('#google').on( "click", function () {search('google')})
    $('#yandex').on( "click", function () {search('yandex')})
    $( "#search-text" ).keypress(function(e) {
        if(e.keyCode == 13)
            search('google')
        else if (e.keyCode == 10)
            search('yandex')
    });
});
// поиск//

$( document ).ready(function() {

    let BGUrl = localStorage["BGUrl"];
    set_BGUrl(BGUrl);

    $('.btn-save-conf').on('click', function () {
        let BGUrl_input = $('#BGUrl').val();
        localStorage["BGUrl"] = BGUrl_input;
        set_BGUrl(BGUrl_input);
    });

    function set_BGUrl(imageUrl) {
        if (imageUrl == undefined)
            imageUrl = '';
        $('body').css('background-image', 'url(' + imageUrl + ')');
        $('#BGUrl').val(imageUrl);
    };

});
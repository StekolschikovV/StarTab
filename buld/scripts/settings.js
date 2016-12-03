
$( document ).ready(function() {
    setTimeout(function() {
        let BGUrl_input = localStorage["BGUrl"];
        let BGColor_input = localStorage["BGColor"];
        let LinksWidth_input = localStorage["LinksWidth"];
        set_BG(BGUrl_input, BGColor_input, LinksWidth_input);

        $('.btn-save-conf').on('click', function () {
            let BGUrl_input = $('#BGUrl').val();
            let BGColor_input = $('#BGColor').val();
            let LinksWidth_input = $('#LinksWidth').val();
            localStorage["BGUrl"] = BGUrl_input;
            localStorage["BGColor"] = BGColor_input;
            localStorage["LinksWidth"] = LinksWidth_input;
            set_BG(BGUrl_input, BGColor_input, LinksWidth_input);
        });

        function set_BG(BGUrl_input, BGColor_input, LinksWidth_input) {
            console.log(BGUrl_input, BGColor_input, LinksWidth_input)
            $('body').css('background-image', 'url(' + BGUrl_input + ')');
            $('body').css('background-color', BGColor_input );
            $('#BGUrl').val(BGUrl_input);
            $('#BGColor').val(BGColor_input);
            $('#LinksWidth').val(LinksWidth_input);
            $('.el').css('width', LinksWidth_input);
        };
    }, 500)
});
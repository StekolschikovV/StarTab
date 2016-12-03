
var  App = {
    lastUpdatedImg: 0,
    lastTab: 0,

    // картинка загрузка//
    loadImg: function () {
        setTimeout(function() {
            checkUrl( $(".tab-content a").length, 0);
        }, 500);
    },
    // картинка загрузка//

    // последняя вкладака
    loadLastTab: function () {
        if (this.lastTab == undefined){
            $('.nav-link:first').click();
        } else {
            $('*[data-id="' + this.lastTab + '"]').addClass('active');
            $('#t' + this.lastTab ).addClass('active');
        }
        $('.nav-item').on('click', function () {
            App.setLastTab($(this).attr('data-id'));
        });
    },
    setLastTab: function (e) {
        console.log(e)
        this.lastTab = e;
        localStorage["lastTab"] = e;

    },
    // последняя вкладака//

    // проверка
    checkLocalStorage: function () {
        let timeNow = new Date();
        timeNow = timeNow.getTime();
        let timeLS = parseInt( localStorage["lastUpdatedImg"] );
        if(timeLS == undefined || isNaN(timeLS) ){
            localStorage["lastUpdatedImg"] = timeNow;
        } else if( ( timeNow - timeLS ) > ( (1000*10) * 5 ) ){
            localStorage["lastUpdatedImg"] = timeNow;
            this.loadImg();
        }

        // последняя вкладака
        this.lastTab = localStorage["lastTab"];
        this.loadLastTab();
        // последняя вкладака//
    }
    // проверка//
};
$(document).ready(function () {
    setTimeout(function() {
        App.checkLocalStorage();
    }, 500);
});


// картинка загрузка
let timer;
let countLoadImg = 0;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkUrl(lenght, i) {
    if(lenght > i){
        console.log('------------------------');
        let parser = document.createElement('a');
        parser.href = $(".tab-content a").eq(i).attr( 'href' );
        let host = parser.hostname;
        let imageUrl = `http://stekolschikov.info/extensions/StarTab/screens/${host}.jpg`;
        let imageUrlGet = `http://stekolschikov.info/extensions/StarTab/getScreenshot.php?url=${host}`;
        $.ajax ({
            type: "HEAD",
            url: imageUrl,
            success: function (message, text, response) {
                if (response.getResponseHeader('Content-Type').indexOf("image") != -1) {

                } else {
                    $.get( imageUrlGet, function() {});
                    countLoadImg++;
                    console.log(imageUrl)
                }
            },
            complete: function () {
                if(lenght > i + 1){
                    window.clearTimeout(timer);
                    timer = window.setTimeout(function(){ checkUrl(lenght, i+1) }, 5);
                } else{
                    if(countLoadImg > 0) {
                        console.log('nead reload')
                    }
                }
            }
        })
    }
}
// картинка загрузка//


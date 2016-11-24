

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.greeting.indexOf('tag:') + 1) {
            var str = request.greeting.substr(5);
            $(str).toggleClass('selectTag');
        } else if(request.greeting.indexOf('id:') + 1){
            var str = request.greeting.substr(4);
            $('#'+str).toggleClass('selectTag');
        } else if(request.greeting.indexOf('class:') + 1){
            var str = request.greeting.substr(7);
            $('.'+str).toggleClass('selectTag');
        } else if(request.greeting.indexOf('removeMark:') + 1){
            var str = request.greeting.substr(12);
            $('*').removeClass('selectTag');
        }
    }
);



$(document).ready(function () {
    function reload_functions() {
        edit();
    }
    function seve_new_posions_el() {
        $('.el').each(function( index ) {
            let text = $( this ).text().trim();
            let a = $( this ).find('a').attr('href');
            let id = $( this ).attr('data-id');
            if (a == undefined)
                a = '';
            chrome.bookmarks.update(''+id, {title: text, url: ''+a});
        });

    }
    setTimeout(function() {
        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        }
        function handleDragEnter(e) {
            this.classList.add('over');
        }
        function handleDragLeave(e) {
            this.classList.remove('over');  // this / e.target is previous target element.
        }
        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }
            if (dragSrcEl != this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }
            $('.el').css('opacity', 1);
            seve_new_posions_el();
            reload_functions();
            return false;
        }
        function handleDragEnd(e) {
            [].forEach.call(cols, function (col) {
                col.classList.remove('over');
            });
        }
        var dragSrcEl = null;
        function handleDragStart(e) {
            this.style.opacity = '0.4';
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }
        var cols = $('.el');
        [].forEach.call(cols, function(col) {
            col.addEventListener('dragstart', handleDragStart, false);
            col.addEventListener('dragenter', handleDragEnter, false)
            col.addEventListener('dragover', handleDragOver, false);
            col.addEventListener('dragleave', handleDragLeave, false);
            col.addEventListener('drop', handleDrop, false);
            col.addEventListener('dragend', handleDragEnd, false);
        });
    }, 500);
});

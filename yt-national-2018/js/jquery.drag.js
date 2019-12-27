var _drag = {};//拖动的位置
_drag.top = 0;//拖动过的位置距离上边
_drag.left = 0;//拖动过的位置距离左边
_drag.maxLeft;//距离左边最大的距离
_drag.maxTop;//距离上边最大的距离
_drag.dragging = false; //是否拖动标志

function bindDragEvent(el) {
    var winWidth = $(window).width(),
        winHeight = $(window).height(),
        $el = $(el),
        objWidth = $el.outerWidth(),
        objHeight = $el.outerHeight();
    _drag.maxLeft = winWidth - objWidth,
    _drag.maxTop = winHeight - objHeight;
    var els = el.style, x = 0, y = 0;
    $el.mousedown(function (e) {
        _drag.dragging = true;
        x = e.clientX - el.offsetLeft;
        y = e.clientY - el.offsetTop;
        el.setCapture && el.setCapture();
        $(document).bind('mousemove', mouseMove).bind('mouseup',mouseUp);
        return false;
    })
    function mouseMove(e) {
        e = e || window.event;
        if (_drag.dragging) {
            _drag.top = e.clientY - y;
            _drag.left = e.clientX - x;
            //处理右侧和底部超出部分
            _drag.top = _drag.top > _drag.maxTop ? _drag.maxTop : _drag.top;
            _drag.left = _drag.left > _drag.maxLeft ? _drag.maxLeft : _drag.left;
            //处理左侧和顶部超出部分
            _drag.top = _drag.top < 0 ? 0 : _drag.top;
            _drag.left = _drag.left < 0 ? 0 : _drag.left;
            els.top = _drag.top + 'px';
            els.left = _drag.left + 'px';
            return false;
        }
    }
    function mouseUp(e) {
        e = e || window.event;
        _drag.dragging = false;
        e.cancelBubble = true;
        el.releaseCapture && el.releaseCapture();
        $(document).unbind('mouseMove', mouseMove).unbind('mouseUp',mouseUp);
    }
}
bindDragEvent(document.getElementById('drag'));
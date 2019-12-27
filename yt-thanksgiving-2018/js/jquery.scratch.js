var scratch = (function (window, undefined) {
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        start = 'mousedown',
        move = 'mousemove',
        end = 'mouseup',
        param, x, y, oLeft, oTop, oWidth, oHeight,
        defaults = {
            maskImg: '',
            maskColor: '#bbb',
            limit: 80,
            size: 25,
            once: 1,
            callback: function () {
            }
        };
    canvas.setAttribute('class', 'scratch-canvas');
    document.createTouch && (function () {
        start = 'touchstart';
        move = 'touchmove';
        end = 'touchend';
    })();
    return function (maskId, params) {
        param = extend({}, params, defaults), target = document.getElementById(maskId);
        oLeft = target.offsetLeft;
        oTop = target.offsetTop;
        oWidth = target.offsetWidth;
        oHeight = target.offsetHeight;
        setStyle(canvas, {
            position: "absolute",
            top: oTop + 'px',
            left: oLeft + 'px'
        });
        canvas.width = oWidth;
        canvas.height = oHeight;
        generateMask();
        target.parentNode.appendChild(canvas);
        addListeners();
    }

    function generateMask() {
        if (param.maskImg) {
            var im = new Image();
            im.src = param.maskImg;
            im.onload = function () {
                console.log(im);
                ctx.drawImage(im, 0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-out';
            }
        } else {
            ctx.fillStyle = param.maskColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'destination-out';
        }
        ctx.lineJoin = 'round';
        ctx.lineWidth = param.size;
        ctx.strokeStyle = param.maskColor;
    }

    function onStart(e) {
        e.preventDefault();
        x = e.pageX - oLeft;
        y = e.pageY - oTop;
        ctx.beginPath();
        ctx.arc(x, y, param.size / 2, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        canvas.addEventListener(move, onMove, false);
        $(".card-wrapper .card").removeClass('reverse');
    }

    function onMove(e) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(e.pageX - oLeft, e.pageY - oTop);
        x = e.pageX - oLeft;
        y = e.pageY - oTop;
        ctx.closePath();
        ctx.stroke();
        check();
    }

    function onEnd() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener(move, onMove);
    }

    function check() {
        var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data, k = 0;
        for (var i = 0, len = data.length; i < len; i += 4) {
            data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0 && data[i + 3] === 0 && k++;
        }
        var f = 100 * k / (canvas.width * canvas.height);
        if (f >= param.limit) {
            param.callback && (function () {
                param.callback();
                onEnd();
            })();
            param.callback = param.once && null;
        }
    }

    function addListeners() {
        canvas.addEventListener(start, onStart, false);
        canvas.addEventListener(end, onEnd, false);
    }

    function extend(res, ex, orig) {
        for (var key in orig) {
            res[key] = ex[key] ? ex[key] : orig[key];
        }
        return res;
    }

    function setStyle(target, setting) {
        for (var key in setting) {
            target.style[key] = setting[key];
        }
    }
})(window);
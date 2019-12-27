(function ($) {
    $.fn.scratch = function (options) {
        $.fn.scratch.init(this, $.extend({}, options));
        return this;
    };
    $.fn.scratch.options = {

        limit : 80,
        callback: function () {

        }
    }
    $.fn.scratch.init = function (obj) {
        obj.each(function () {
            myCanvas = this;
            var myCanvas, cxt, width, height, oImg;
            var device, startEvtName, moveEvtName, endEvtName;
            var scratchLeft, scratchRightLeft, canvasLeft, sumLeft;
            var canvasTop, sumTop;
            scratchLeft = document.getElementsByClassName('thanksgiving-scratch')[0].offsetLeft;
            scratchRightLeft = document.getElementsByClassName('thanksgiving-scratch__right')[0].offsetLeft;
            canvasLeft = myCanvas.offsetLeft;
            canvasTop = myCanvas.offsetTop;
            sumLeft = scratchLeft + scratchRightLeft + canvasLeft;
            sumTop = canvasTop;

            cxt = myCanvas.getContext("2d");
            width = myCanvas.width;
            height = myCanvas.height;
            oImg = new Image();
            oImg.src = "images/bg-scratch-reverse.png";
            oImg.onload = function () {
                cxt.beginPath();
                cxt.drawImage(oImg, 0, 0, width, height);
                cxt.closePath();
            };
            device = /android|iphone|ipad|ipod|webos|iemobile|opear mini|linux/i.test(navigator.userAgent.toLowerCase());
            startEvtName = device ? "touchstart" : "mousedown";
            moveEvtName = device ? "touchmove" : "mousemove";
            endEvtName = device ? "touchend" : "mouseup";

            function draw(event) {
                var x, y;
                //疑惑：为什么要减去left和top值，难道是跟定位有关？
                x = device ? event.touches[0].clientX : event.clientX - sumLeft;
                y = device ? event.touches[0].clientY : event.clientY - sumTop;
                cxt.beginPath();
                cxt.globalCompositeOperation = "destination-out";
                cxt.arc(x, y, 20, 0, Math.PI * 2, false);
                cxt.fill();
                cxt.closePath();
            }
            //true  捕获 false  冒泡
            myCanvas.addEventListener(startEvtName, function () {
                myCanvas.addEventListener(moveEvtName, draw, false);
            }, false);
            myCanvas.addEventListener(endEvtName, function () {
                myCanvas.removeEventListener(moveEvtName, draw, false);
            }, false);
        })
    };
}(jQuery));



$(".btn-draw-normal").on('click', function () {
   $(this).parent().hide();
    $(".card-wrapper .card").removeClass('reverse');
   $("#myCanvas").scratch();
});
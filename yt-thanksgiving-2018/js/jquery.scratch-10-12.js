(function (window, document, undefined) {
    function Scratch(settings, callback) {
        this.canvas = null;
        this.ctx = null;
        this.cardWrapper = null;
        this.width = 0;
        this.height = 0;
        this.supportTouch = false;
        this.events = [];
        this.startEventHandler = null;
        this.moveEventHandler = null;
        this.endEventHandler = null;
        this.options = {
            ratio:'',
            maskColor: '',
            maskImage: 'images/bg-scratch-reverse.png',
            callback: null
        };
        this.init(settings, callback);
    };

    function _calcArea(ctx, callback, ratio) {
        var pixels = ctx.getImageData(0, 0, this.width, this.height);
        var transPixels = [];
        _forEach(pixels.data, function(item, i) {
            var pixel = pixels.data[i + 3];
            if (pixel === 0) {
                transPixels.push(pixel);
            }
        });

        if (transPixels.length / pixels.data.length > ratio) {
            callback && typeof callback === 'function' && callback();
        }
    };

    function _forEach(items, callback) {
        return Array.prototype.forEach.call(items, function(item, idx) {
            callback(item, idx);
        });
    };

    function _isCanvasSupported(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    /**
     * touchstart/mousedown event handler
     */
    function _startEventHandler(event) {
        event.preventDefault();
        this.moveEventHandler = _moveEventHandler.bind(this);
        this.canvas.addEventListener(this.events[1], this.moveEventHandler, false);
        this.endEventHandler = _endEventHandler.bind(this);
        document.addEventListener(this.events[2], this.endEventHandler, false);
    }

    /**
     * touchmove/mousemove event handler
     */
    function _moveEventHandler(event) {
        // debugger
        event.preventDefault();
        let evt = this.supportTouch ? event.touches[0] : event;
        let canvasPos = this.canvas.getBoundingClientRect();
        let pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        let mouseX = evt.pageX - canvasPos.left - pageScrollLeft;
        let mouseY = evt.pageY - canvasPos.top - pageScrollTop;

        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.arc(mouseX, mouseY, 0 ,0, 2 * Math.PI);
        this.ctx.fill();
    }

    /**
     * touchend/mouseup event handler
     */
    function _endEventHandler(event) {
        event.preventDefault();
        if (this.options.callback && typeof this.options.callback === 'function') {
            _calcArea.call(this, this.ctx, this.options.callback, this.options.ratio);
        }
        this.canvas.removeEventListener(this.events[1], this.moveEventHandler, false);
        document.removeEventListener(this.events[2], this.endEventHandler, false);
    }

    /**
     * Create Canvas element
     */
    Scratch.prototype.createCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        if (this.options.maskImage) {
            let _this = this;
            let img = new Image();
            img.src = this.options.maskImage;
            img.onload = function () {
                _this.ctx.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height);
            }
        } else {
            this.ctx.fillStyle = this.options.maskColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
        this.cardWrapper.appendChild(this.canvas);
    };

    Scratch.prototype.init = function (settings, callback) {
        if (!_isCanvasSupported()) {
            alert('对不起，当前浏览器不支持Canvas，无法使用本控件！');
            return;
        }
        var _this = this;
        _forEach(arguments, function (item) {
            if (typeof item === 'object') {
                for (let k in item) {
                    if (k === callback && typeof item[k] === 'function') {
                        _this.options.callback = item[k].bind(_this);
                    } else {
                        k in _this.options && _this.options[k] == item[k];
                    }
                }
            } else if (typeof item === 'function') {
                _this.options.callback = item.bind(_this);
            }
        })
        this.cardWrapper = document.getElementById('card-wrapper');
        if (!this.cardWrapper) return;
        this.width = this.cardWrapper.clientWidth;
        this.height = this.cardWrapper.clientHeight;
        this.createCanvas();
        this.eventDetect();
    };


    /**
     * To detect whether support touch events
     */
    Scratch.prototype.eventDetect = function () {
        if ('ontouchstart' in window) this.supportTouch = true;
        this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
        this.addEvent();
    };

    /**
     * Add touchstart/mousedown event listener
     */
    Scratch.prototype.addEvent = function () {
        this.startEventHandler = _startEventHandler.bind(this);
        this.canvas.addEventListener(this.events[0], this.startEventHandler, false);
    };

    /**
     * Clear pixels of canvas
     */
    Scratch.prototype.clearCover = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.removeEventListener(this.events[0], this.startEventHandler);
        this.canvas.removeEventListener(this.events[1], this.moveEventHandler);
        this.canvas.removeEventListener(this.events[2], this.endEventHandler);
    };


    Scratch.plugin = function(settings, callback) {
        return new Scratch(settings, callback);
    };

    //将插件名暴露出去
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function () {
            return Scratch;
        })
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Scratch.plugin;
        module.exports.Scratch = Scratch;
    } else {
        window.Scratch = Scratch;
    }
})(window, document);

$(".btn-draw-normal").on('click', function () {
    $(this).parent().hide();
    $(".card-wrapper .card").removeClass('reverse');
    Scratch.plugin({
        maskImage: 'images/bg-scratch-reverse.png',
        callback: function () {
            this.clearCover();
        }
    })
});
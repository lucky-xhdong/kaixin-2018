/*
 *	total变量时最终统计的点中的年兽数
 *   extra: ".monster-extra",           //辅助标签，用于获取年兽雨中年兽的大小
 *   maxValue: 45,                      //年兽数,应该是所要年兽数
 *   speed: 500,                        //控制年兽的出现速度
 *   fallSpeed: 5                       //控制年兽掉落的速度
 *   maxLength: 10                      //最大年兽数
 */

(function ($, doc) {
    $.fn.snow = function (opts) {
        var $item = $('<div class="monster-item" />'),
            self = $(this),
            height = self.height(),
            width = self.width(),
            defaults = {
                speed: 500,
                maxValue: 45,
                hide: 'fn-hide',
                fallSpeed: 5,
                maxLength: 45,
                poptipsuccess: '',
                poptipfail: '',
                mask: ''
            }, timeout, timeId,
            id = 0, total = 0,
            opts = $.extend({}, defaults, opts);
        //阻止默认跳转事件
        function stopDefault(e) {
            if (e && e.preventDefault)
                e.preventDefault();
            else
                window.event.returnValue = false;
        }
        //取消冒泡
        function stopPropagation(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = false;
            }
        }
        var fallFlag = false;
        timeout = function () {
            clearTimeout(timeId);
            timeId = setTimeout(function () {
                var _width = opts.extra.width(),
                    _height = opts.extra.height(),
                    start = Math.random() * width,
                    marxLeft = width - _width,
                    // end= height,            //使用zepto时用
                    end = height,        //使用jquery时用, - _height
                    dur = height * opts.fallSpeed + Math.random() * 1600,
                    _self;

                if (start >= marxLeft) {
                    start = marxLeft;
                }
                _self = $item.clone();
                _self._id = id;
                opts.mask.show().unbind('click').bind('click', function (e) {
                    stopDefault(e);
                    stopPropagation(e);
                    return false;
                });

                _self.css({ left: start }).appendTo(self);
                $(".monster-item").animate({ top: end }, dur, 'linear', function () {
                    $(this).remove();
                    fallFlag = true;
                    //空白处点击提示攻击到幻影
                    $(window).unbind('click').bind('click', function (e) {
                        stopDefault(e);
                        stopPropagation(e);
                        if(fallFlag && fallFlag == true) {
                            opts.poptipfail.show();
                        }
                        setTimeout(function () {
                            opts.poptipfail.hide();
                        }, 500);
                        return false;
                    });
                    if (_self._id && _self._id == opts.maxValue - 1) {
                        self.addClass(opts.hide);
                        opts.mask.hide();
                        fallFlag = false;
                    }
                })
                .unbind('click').bind('click', function (e){
                    stopDefault(e);
                    stopPropagation(e);
//                    攻击到年兽提示攻击成功
                    opts.poptipsuccess.show();
                    setTimeout(function () {
                        opts.poptipsuccess.hide();
                    }, 500);
                    $(this).remove();
                    if(total < opts.maxLength){
                        total++;
                    }
                    return false;
                });
                id++;
                if (id < opts.maxValue) {
                    timeout();
                    return;
                }
            }, opts.speed);
        };
        timeout();
    };
})(jQuery, document);
/**
 * Created by xhdong on 15/10/31.
 */
(function($){
    $.fn.lottery = function(options){
        var defaults = {
            index: -1,
            count: 0,
            speed: 20,
            timer: 0,
            times: 0,
            cycle: 50,
            prize: -1,
            myprize: 0,
            flag: false
        }
        var settings = $.extend({}, defaults, options);
        var _this = $(this);
        return _this.each(function(){
            var methods = {
                init: function(){
                    if(_this.find('li').length > 0) {
                        var units = _this.find('.lottery-unit');
                        settings.count = units.length;
                        _this.find('.lottery-unit-'+ settings.index).addClass('active');
                    }
                },
                roll: function(){
                    var index = settings.index;
                    var count = _this.find('li').length;
                    //var count = settings.count;
                    _this.find('.lottery-unit-'+ index).removeClass('active');
                    index++;
                    if(index > count-1) {
                        index = 0;
                    }
                    _this.find('.lottery-unit-'+ index).addClass('active');
                    settings.index = index;
                    return false;
                },
                rotate: function(){
                    settings.times++;
                    methods.roll();
                    if(settings.times > settings.cycle && settings.prize == settings.index) {
                        clearTimeout(settings.timer);
                        settings.prize = -1;
                        settings.times = 0;
                        settings.flag = false;
                    }else {
                        if(settings.times < settings.cycle){
                            settings.speed -= 10;
                        }else if(settings.times == settings.cycle){
                            var index = Math.random() * (settings.count) | 0;
                            settings.prize = settings.myprize;
                            //settings.prize = index;
                        }else {
                            if(settings.times > settings.cycle + 10 && (settings.prize == 0 && settings.index == 7) || settings.prize == settings.index + 1) {
                                settings.speed += 100;
                            }else {
                                settings.speed += 20;
                            }
                        }
                        if(settings.speed < 40) {
                            settings.speed = 40;
                        }
                        settings.timer = setTimeout(methods.rotate, settings.speed);
                    }
                    return false;
                }
            }
            if(settings.flag){
                return false;
            }else {
                settings.speed = 100;
                methods.rotate();
                settings.flag = true;
                return false;
            }
        })
    }
})(jQuery)

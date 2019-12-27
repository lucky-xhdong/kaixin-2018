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
            callback: null,
            flag: false
        };
        var settings = $.extend({}, defaults, options);
        var _this = $(this);
        return $(this).each(function(){
            var methods = {
                init: function(){
                    if(_this.find('li').length > 0) {
                        settings.count = _this.find('li').length;
                        _this.find('.lottery-unit-'+ settings.index).addClass('active');
                    }
                },
                roll: function(){
                    var index = settings.index;
                    var count = settings.count;
                    _this.find('.lottery-unit-'+ index).removeClass('active');
                    index++;
                    if(index > count-1) {
                        index = 0;
                    }
                    _this.find('.lottery-unit-'+ index).addClass('active');
                    settings.index = index;
                    return false;
                }
            }
            methods.init();
            function rotate(){
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
                        // var index = Math.random() * (settings.count) | 0;
                        //settings.prize = index;
                        settings.prize = Math.ceil(Math.random() * 6);
                        // settings.prize = settings.myprize;
                        // console.log(settings.prize)
                        if (settings.callback && typeof settings.callback == 'function') {
                            settings.callback();
                        }
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
                    settings.timer = setTimeout(rotate, settings.speed);
                }
                return false;
            }
            if(settings.flag){
                return false;
            }else {
                settings.speed = 100;
                rotate();
                settings.flag = true;
                return false;
            }
        })
    }
})(jQuery)

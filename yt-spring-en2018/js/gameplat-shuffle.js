function Shuffle(obj, opt) {
    var option = {
        during: "50",//间隔运动时间
        speed: "50",//运动时间
        conuntW: "",//整体内容宽度
        countH: "",//整体内容高度
        w1: "",//大图宽度
        w2: ""//小图宽度
    };

    //参数初始化,看是否有新的参数传入，传入则更新初始化设置
    var opts = $.extend(option, opt || {});
    var ul = obj.find('ul');
    var li = ul.children('li');
    var length = li.length;
    var half = parseInt(length / 2);
    var number;
    var timeInterval = null;
    var during = opts.during;
    var speed = opts.speed;
    var count = 0;
    //大图left
    var left1 = (opts.conuntW - opts.w1) / 2;
    //大图top
    var left2 = (opts.conuntW - opts.w2) / 1.5;//小图left

    if (length % 2 == 0) {
        half = half - 1;
    }
    //移动端跟PC端单位不一样
    var uint = $(window).width() > 1000 ? unit = 'px' : unit = 'rem';

    //默认轮播
    clearInterval(timeInterval)
    number = parseInt(currentShow(li));
    $(".spring-thinking .btn-start").on('click', function () {
        $('.spring-thinking').addClass('spring-thinking-mask');
        timeInterval = setInterval(function () {
            number++;
            position(number)
            if (number == length) {
                number = 0;
                clearInterval(timeInterval);
                li.each(function(index, element){
                    if($(window).width() > 1000) {
                        $(element).animate({
                            left: (parseInt(opts.w1) + 10) * index + uint
                        })
                    }else {
                        $(element).animate({
                            left: (parseInt(opts.w1) + 1.04) * index + uint
                        })
                    }
                });
                setTimeout(function(){
                    $('.spring-thinking').removeClass('spring-thinking-mask');
                },1500)
            }
        }, during)
    });

    //重新定位
    function position(N) {
        var zIndex = li.length;
        li.eq(N).attr("class", "on");
        for (i = 1; i <= half; i++) {
            //right
            var next = N + i;
            zIndex = zIndex - i;
            if (next == length) next = 0;
            li.eq(next).css("z-index", zIndex).attr("class", "right").animate({"left": left2 + uint}, speed);
            //left
            var pre = N - i;
            if (pre == -1) pre = length - 1;
            li.eq(pre).attr("class", "left").css("z-index", zIndex).animate({"left": opts.w2 / 1.5 + uint}, speed);
        }
        //mid
        if (length % 2 == 0) {
            li.eq(next + 1).attr("class", "mid").css("z-index", zIndex - 2).animate({"left": left2 + uint}, speed);
        }
        li.eq(N).css("z-index", parseInt(length) + 3).animate({"left": left1 + uint}, speed);
    }

    //当前显示的是第几个图片
    function currentShow(item) {
        var now = 0;
        for (i = 0; i < item.length; i++) {
            var li = item[i];
            if ($(li).hasClass("on")) {
                now = i;
            }
        }
        return now;
    }
}
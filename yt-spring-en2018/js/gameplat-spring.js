//show mask and popover
function showpopover() {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
        arr[i].css({
            "display": "block"
        })
    }
    return arr;
}
//hide mask and popover
function hidepopover() {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
        arr[i].css({
            "display": "none"
        }).removeAttr('style');
    }
    return arr;
}

var cardFlag = false;

var popover = function () {
    var $mask, $close,
        $icongift,
        $cardlist,
        $popgiftbox,
        $popgiftcode,
        $popquestions,
        $popshuffle,
        $popfail,
        $popattack,
        $popsuccess,
        $btnstartsnow;
    var bindEvent = function () {

        //礼品箱
        $icongift.on('click', function () {
            showpopover($mask, $popgiftbox);
        });

        //点扑克牌列表显示答题弹窗
        $cardlist.each(function (index, element) {
            $(element).on('click', function () {
                if(cardFlag == false) {
                    showpopover($mask, $popshuffle);
                }else {
                    showpopover($mask, $popquestions);
                }
            })
        });

        //祝福语滚动
        $(".wish-lists-marquee").AutoScroll();

        //年兽列表模块start按钮点击开始下年兽雨
        $btnstartsnow.on('click', function () {
            $('.monster-snow').removeClass('fn-hide').snow({
                maxValue: 100,//年兽数,应该是所要年兽数
                speed: 300,//控制年兽的出现速度
                fallSpeed: 2,//控制年兽掉落的速度
                mask: $('.mask'),
                extra: $(".monster-extra"),//辅助标签，用于获取年兽雨中年兽的大小
                poptipsuccess: $('.pop-tip-success'),
                poptipfail: $('.pop-tip-fail')
            });
        });

        //click close button hide popover and popovers
        $close.on('click', function () {
            hidepopover($mask, $popgiftbox, $popgiftcode, $popquestions, $popshuffle, $popfail, $popsuccess);
        })

    };
    return {
        init: function () {
            $mask = $(".mask");
            $close = $(".close");//关闭按钮
            $cardlist = $(".quick-thinking li");//扑克牌列表
            $icongift = $(".btn-gift-box");//礼品箱按钮
            $popgiftbox = $(".pop-giftbox");//礼品箱弹窗
            $popgiftcode = $(".pop-giftcode");//礼品码弹窗
            $popquestions = $(".pop-questions");//答题弹窗
            $popshuffle = $(".pop-shuffle");//直接点击卡牌提示框
            $popfail = $(".pop-fail");//失败弹窗
            $popsuccess = $(".pop-success");//成功弹窗
            $popattack = $(".pop-attack");//攻击年兽弹窗
            $btnstartsnow = $(".spring-monster .btn-start");//年兽雨start按钮
            bindEvent();
        }
    }
}();

$(document).ready(function () {
    //弹窗
    popover.init();
    //页面滚动到模块的动画效果
    if ($(window).width() > 1000) {
        $('.smoove').smoove({offset: '40%'});
    }
    //PC
    if($(window).width() > 1000) {
        Shuffle($(".quick-thinking"), {
            conuntW: "935",//整体内容宽度
            countH: "272",//整体内容高度
            w1: "305",//大图宽度
            w2: "305"//小图宽度
        });
    }
    //移动端
    else {
        Shuffle($(".quick-thinking"), {
            conuntW: "14.96",//整体内容宽度
            countH: "4.352",//整体内容高度
            w1: "4.88",//大图宽度
            w2: "4.88"//小图宽度
        });
    }
    $(".gototop").on('click', function(){
        $("html, body").animate({
            scrollTop: 0
        })
    })
});
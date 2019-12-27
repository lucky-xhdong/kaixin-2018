/**
 * Created by dongxiaohong on 2016/12/16.
 */

//show mask and popover
function showpopover(){
    var arr = [];
    for( var i = 0; i < arguments.length; i++){
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
    for( var i = 0; i < arguments.length; i++){
        arr.push(arguments[i]);
        arr[i].css({
            "display": "none"
        }).removeAttr('style');
    }
    return arr;
}


var popover = function(){
    var $mask, $close,
        $icongift, $popgiftbox,
        $btnstartsource, $btnstartlucky,
        $sourcelottery, $luckylottery,
        $popsignin, $popquestions,
        $popwrong, $popright,
        $popsteps, $popturntablelucky,
        $popturntablesource,
        $popprize, $popgoods,
        $popsuccess, $btntop,
        $btnsignin, $btnroll,
        $btnstartdice,
        $tbnanswer, $btncompeleted;
    var bindEvent = function(){

        //礼品箱
        $icongift.on('click', function(){
            showpopover($mask, $popgiftbox);
        });

        //返回顶部
        $btntop.on('click', function(){
            $("body, html").animate({
                scrollTop: 0
            }, 600)
        });

        //签到成功开始掷骰
        //$btnsignin.on('click', function () {
        //    showpopover($mask, $popsignin);
        //});

        // var mysourceprize = 2,//资源奖
        var mysourceprize = Math.floor(Math.random() * 6 + 1),//资源奖
            myluckyprize = 2,//幸运奖

            sUserAgent = navigator.userAgent.toLowerCase();
        if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {
            $(window).scroll(function () {
                var top = $('html').css('fontSize').split('px')[0] * 11;
                $(window).scrollTop() > top ?
                    $btntop.fadeIn(300).css({display: "block"}) :
                    $btntop.fadeOut(300).css({display: "none"})
                $(window).scrollTop() > top ?
                    $nav.css({"position": "fixed", "top": 0}) :
                    $nav.css({"position": "absolute", "top": "11rem"});
            });
        }

        //资源转盘点击事件 start
        $btnstartsource.click(function(){
            $sourcelottery.lottery({
                myprize: mysourceprize
            });
        });

        //幸运转盘点击事件 start
        $btnstartlucky.click(function(){
            $luckylottery.lottery({
                myprize: myluckyprize
            });
        });

        //click close button hide popover and popovers
        $close.on('click', function(){
            hidepopover($mask, $popgiftbox, $popsignin, $popquestions, $popwrong, $popright, $popsteps, $popturntablelucky, $popturntablesource, $popprize, $popgoods, $popsuccess);
        })

    };
    return {
        init: function(){
            $mask = $(".mask");
            $close = $(".close");//关闭按钮
            $icongift = $(".icon-gift");//礼品箱按钮
            $btnstartsource = $(".btn-start-source");//资源转盘开始按钮
            $btnstartlucky = $(".btn-start-lucky");//资源转盘开始按钮
            $popsignin = $(".pop-signin");//签到弹窗
            $popquestions = $(".pop-questions");//答题弹窗
            $popwrong = $(".pop-wrong");//答题错误弹窗
            $popright = $(".pop-right");//答题正确弹窗
            $popsteps = $(".pop-steps");//选择步数弹窗
            $popturntablelucky= $(".pop-turntable-lucky");//获得幸运转盘弹窗
            $popturntablesource = $(".pop-turntable-source");//获得资源转盘弹窗
            $popprize = $(".pop-prize");//领取奖励弹窗
            $popgoods = $(".pop-goods");//实物奖弹窗
            $popsuccess = $(".pop-success");//信息提交成功弹窗
            $popgiftbox = $(".pop-giftbox");//礼品箱弹窗
            $sourcelottery = $(".source-lottery");//资源转盘
            $luckylottery = $(".lucky-lottery");//幸运转盘
            $btntop = $(".btn-top");
            $btnsignin = $(".btn-signin");//签到按钮
            $btnstartdice = $(".pop-signin .btn-start");//弹窗中开始掷骰按钮
            $btnroll = $(".btn-roll");//掷骰按钮
            $tbnanswer = $(".btn-answer");//答题按钮
            $btncompeleted = $(".btn-compeleted");//已完成
            bindEvent();
        }
    }
}()


$(document).ready(function(){
    popover.init();
    if($(window).width() > 1000) {
        $('.smoove').smoove({offset:'40%'});
    }
})
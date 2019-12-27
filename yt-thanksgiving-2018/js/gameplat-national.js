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
    var $gameplatmask,//遮罩
        $btnclose,//关闭按钮
        $btngiftbox,//礼品箱按钮
        $btnsignin,//签到按钮
        $btnstart,//转盘开始按钮
        $nclottery,//转盘

        $popsignin,//签到弹窗
        $popturntable,//激活转盘弹窗
        $popquestions,//答题弹窗
        $popreward,//获得奖励弹窗
        $poppoker,//答题正确，获得抽牌机会弹窗
        $poppokersuccess,//抽牌成功弹窗
        $popquestion,//答题弹窗
        $popwrong,//答题错误弹窗
        $poprepeat,//获得重复能量宝石弹窗
        $popluckypoints,//是否消耗8个幸运点开启聚宝盆弹窗
        $popsuccess,//信息提交成功弹窗
        $popgoods,//实物奖弹窗
        $popgiftbox;//礼品箱弹窗

    var bindEvent = function(){

        //礼品箱
        $btngiftbox.on('click', function(){
            showpopover($gameplatmask, $popgiftbox);
        });

        // var sUserAgent = navigator.userAgent.toLowerCase();
        // if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {
        //     $(window).scroll(function () {
        //         var top = $('html').css('fontSize').split('px')[0] * 11;
        //         $(window).scrollTop() > top ?
        //             $btntop.fadeIn(300).css({display: "block"}) :
        //             $btntop.fadeOut(300).css({display: "none"})
        //         $(window).scrollTop() > top ?
        //             $nav.css({"position": "fixed", "top": 0}) :
        //             $nav.css({"position": "absolute", "top": "11rem"});
        //     });
        // }

        //click close button hide popover and popovers
        $btnclose.on('click', function(){
            hidepopover($gameplatmask, $popgiftbox, $popsignin, $popturntable, $popquestions, $popreward, $poppoker, $poppokersuccess, $popquestion, $popwrong, $poprepeat, $popluckypoints, $popsuccess, $popgoods, $popgiftbox);
        });

        //卡牌添加选中状态
        $(".nc-cards__left, .nc-cards__right").undelegate('li', 'click').delegate('li', 'click', function () {
            $(this).addClass('selected').siblings().removeClass('selected');
        });

        //宝石切换
       $(".swap-left li").each(function (index, item) {
            $(item).on('click', function () {
                //给当前选中元素添加selected样式
                var _left = $(this);
                _left.addClass('selected').siblings().removeClass('selected');
                $(".swap-right li").each(function (index1, item1) {
                    if ($(item1).hasClass('selected') && _left.data('attr') == $(item1).add('selected').data('attr')) {
                        _left.removeClass('reverse');
                        $(item1).removeClass('selected').addClass('reverse');
                        if ($(item1).add('selected').hasClass('reverse')) {
                            $(item1).removeClass('reverse')
                        }
                    }
                })
            })
        });
        $(".swap-right li").each(function (index, item) {
            $(item).on('click', function () {
                //给当前选中元素添加selected样式
                var _right = $(this);
                _right.addClass('selected').siblings().removeClass('selected');
                $(".swap-left li").each(function (index1, item1) {
                    if ($(item1).hasClass('selected') && _right.data('attr') == $(item1).add('selected').data('attr')) {
                        _right.addClass('reverse');
                        $(item1).addClass('reverse');
                    }
                })
            })
        });

        //转盘
        var myluckyprize = 2;//幸运奖
        //幸运转盘点击事件 start
        $btnstart.click(function(){
            $nclottery.lottery({
                myprize: myluckyprize
            });
        });

    };
    return {
        init: function(){
            //遮罩，按钮
            $gameplatmask = $(".gameplat-mask");//遮罩
            $btnclose = $(".btn-close");//关闭按钮
            $btngiftbox = $(".btn-giftbox");//礼品箱按钮
            $btnsignin = $(".btn-signin");//签到按钮
            $btnstart = $(".btn-start");//转盘开始按钮
            $nclottery = $(".nc-lottery");//转盘

            //弹层
            $popsignin = $(".pop-signin");//签到弹窗
            $popturntable = $(".pop-turntable");//激活转盘弹窗
            $popquestions = $(".pop-questions");//答题弹窗
            $popreward = $(".pop-reward");//获得奖励弹窗
            $poppoker = $(".pop-poker");//答题正确，获得抽牌机会弹窗
            $poppokersuccess = $(".pop-poker-success");//抽牌成功弹窗
            $popquestion = $(".pop-question");//答题弹窗
            $popwrong = $(".pop-wrong");//答题错误弹窗
            $poprepeat = $(".pop-repeat");//获得重复能量宝石弹窗
            $popluckypoints = $(".pop-lucky-points");//是否消耗8个幸运点开启聚宝盆弹窗
            $popsuccess = $(".pop-success");//信息提交成功弹窗
            $popgoods = $(".pop-goods");//实物奖弹窗
            $popgiftbox = $(".pop-giftbox");//礼品箱弹窗
            bindEvent();
        }
    }
}();


$(document).ready(function(){
    popover.init();
    if($(window).width() > 1000) {
        $('.smoove').smoove({offset:'40%'});
    }
});
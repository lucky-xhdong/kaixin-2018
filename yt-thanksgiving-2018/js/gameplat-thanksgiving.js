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
        $btnlogin,//登录按钮
        $btnstart,//转盘开始按钮
        $lottery,//转盘
        $anchor,//锚点

        $popsignin,//签到弹窗
        $popaccumulatesignin,//累积签到弹窗
        $popscratchcard,//刮奖成功弹窗
        $poplottery,//集火鸡转转盘弹窗
        $popaccumulatelottery,//累积转盘弹窗
        $popprizelists,//奖励列表弹窗
        $popgiftbox,//礼品箱弹窗
        $poplogin,//登录弹窗
        $popcorns;//获得玉米弹窗

    var bindEvent = function(){
        // debugger

        //礼品箱
        $btngiftbox.on('click', function(){
            showpopover($gameplatmask, $popgiftbox);
        });

        //登录
        $btnlogin.on('click', function(){
            showpopover($gameplatmask, $poplogin);
        });

        //锚点事件
        //height:移动端和PC的高度差
        function anchorEvent(height) {
            $anchor.on('click', function(){
                var href = $(this).attr('href');
                var pos = $(href).offset().top - height;
                $(this).parents('li').addClass("active").siblings().removeClass("active");
                $("body, html").animate({
                    scrollTop: pos
                }, 800)
            })
        }
        $(".btn-draw-normal").on('click', function () {
            $(this).parent().hide();

            new scratch("card", {
                maskImg: 'images/bg-scratch-reverse.png',
                callback: function () {
                    alert("已经涂刮完80%区域");
                }
            });
        });

        var sUserAgent = navigator.userAgent.toLowerCase();
        if ((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))) {
            anchorEvent(80);
        } else {
            anchorEvent(260)
        }


        //click close button hide popover and popovers
        $btnclose.on('click', function(){
            hidepopover($gameplatmask, $popsignin, $popaccumulatesignin, $popscratchcard, $poplottery, $popaccumulatelottery, $popprizelists, $popgiftbox, $poplogin, $popcorns);
        });

        function showPopoverEvent(parent, child) {
            $(parent).hover(function () {
                $(this).find(child).show();
            }, function () {
                $(this).find(child).hide();
            });
        }
        showPopoverEvent(".package-lists .package", '.pop-prize-lists');
        showPopoverEvent(".red-heart-lists .heart", '.pop-prize-lists');
        showPopoverEvent(".blue-heart-lists .heart", '.pop-prize-lists');

        //转盘
        var myluckyprize = 2;//幸运奖
        //幸运转盘点击事件 start
        $btnstart.click(function(){
            var _this = $(this);
            $(this).parents().addClass('mask');
            $lottery.lottery({
                myprize: myluckyprize,
                callback: function () {
                    _this.parents().removeClass('mask');
                }
            });
        });

    };
    return {
        init: function(){
            //遮罩，按钮
            $gameplatmask = $(".gameplat-mask");//遮罩
            $btnclose = $(".btn-close");//关闭按钮
            $btngiftbox = $(".btn-giftbox");//礼品箱按钮
            $btnlogin = $(".btn-login");//登录按钮
            $btnstart = $(".btn-start");//转盘开始按钮
            $lottery = $(".lottery");//转盘
            $anchor = $(".anchor");//转盘

            //弹层
            $popsignin = $(".pop-signin");//签到弹窗
            $popaccumulatesignin = $(".pop-accumulate-signin");//累积签到弹窗
            $popscratchcard = $(".pop-scratch-card");//刮奖成功弹窗
            $poplottery = $(".pop-lottery");//集火鸡转转盘弹窗
            $popaccumulatelottery = $(".pop-accumulate-lottery");//累积转盘弹窗
            $popprizelists = $(".pop-prize-lists");//奖励列表弹窗
            $popgiftbox = $(".pop-giftbox");//礼品箱弹窗
            $poplogin = $(".pop-login");//登录弹窗
            $popcorns = $(".pop-corns");//获得玉米弹窗
            bindEvent();
        }
    }
}();


$(document).ready(function(){
    popover.init();
    if($(window).width() > 1000) {
        // $('.smoove').smoove({offset:'40%'});
    }
});
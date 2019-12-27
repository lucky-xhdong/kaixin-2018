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
    var $mask, $close,$icongift, $btnstart, $luckylottery, $popgiftbox, $btntop;
    var puzzle = function() {
        var personItem,//单个人物图
            personIndex,//单个人物的索引
            personDataSrc,//单个人物的大图地址
            personDataIndex,//对联元素的data-index值
            cardItem,//单个卡片
            cardIndex,//单个卡片索引
            cardDataSrc,//单个卡片的大图地址
            cardDataIndex;//单个卡片的data-index
        $(".puzzle-person").delegate('li.card', 'click', function () {
            //选中的人物添加高亮状态，再次点击取消选中
            $(this).hasClass('select') ? $(this).removeClass('select') : $(this).addClass('select');
            //去掉相邻元素选中状态
            $(this).siblings().removeClass('select');
        }).delegate('li.person', 'click', function () {
            //选中人物添加高亮状态，再次点击取消选中
            $(this).hasClass('person select') ? $(this).removeClass('person select') : $(this).addClass('person select');
            //去掉相邻元素选中状态
            $(this).siblings().removeClass('select');
            //单个人物元素
            personItem = $(".puzzle-person li");
            //单个卡片元素
            cardItem = $(".puzzle-cards li");
            //单个人物索引
            personIndex = personItem.index(this);
            //当前点击元素的dataindex
            personDataIndex = $(personItem[personIndex]).attr('data-index');
            //单个人物的小图地址
            personDataSrc = $(personItem[personDataIndex]).attr('data-card-large');
            //判断人物中的元素是否被选中
            if (personItem.hasClass('select')) {
                //那么还原卡片中被选中的元素
                $(cardItem[personDataIndex]).removeClass('select');
                ////当前元素变回卡片，去掉data-index属性，修改class名称
                $(".puzzle-person li.select")
                    .removeClass('person select')
                    .removeAttr('data-index')
                    .addClass('card')
                    .find('img').attr('src', personDataSrc);
            }
        });
        //选择左侧的卡片对右边进行拼图
        $(".puzzle-cards").delegate('li', 'click', function () {
            //单个卡片
            cardItem = $(".puzzle-cards li");
            //单个人物图
            personItem = $(".puzzle-person li");
            //单个卡片索引
            cardIndex = cardItem.index(this);
            //单个卡片的大图地址
            cardDataSrc = $(cardItem[cardIndex]).attr('data-person-large');
            //单个卡片的data-index
            cardDataIndex = $(cardItem[cardIndex]).attr('data-index');
            //用人物替换右侧卡片需要满足以下条件
            //1.右侧卡片被选中
            //2.左侧人物没有选中
            if (personItem.hasClass('select') && !$(this).hasClass('select')) {
                //将左侧人物替换到卡片对应被选中的位置
                $(".puzzle-person li.select")
                    .removeClass('card select')
                    .addClass('person')
                    .attr('data-index', cardDataIndex)
                    .find('img').attr('src', cardDataSrc);
                //当前元素不可再点击
                $(this).addClass('select');
            }
        });
    }
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


        var mysourceprize = 2,//资源奖
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

        //幸运转盘点击事件 start
        $btnstart.click(function(){
            $luckylottery.lottery({
                myprize: myluckyprize
            });
        });

        //click close button hide popover and popovers
        $close.on('click', function(){
            hidepopover($mask, $popgiftbox);
        })

    };
    return {
        init: function(){
            $mask = $(".mask");
            $close = $(".close");//关闭按钮
            $icongift = $(".icon-gift");//礼品箱按钮
            $btnstart = $(".btn-start");//转盘开始按钮
            $popgiftbox = $(".pop-giftbox");//礼品箱弹窗

            $luckylottery = $(".lucky-lottery");//幸运转盘
            $btntop = $(".btn-top");
            bindEvent();
            puzzle();
        }
    }
}()


$(document).ready(function(){
    popover.init();
    if($(window).width() > 1000) {
        $('.smoove').smoove({offset:'40%'});
    }
})
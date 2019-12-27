/**
 * Created by xhdong on 15/11/15.
 */

var myprize = 6;

//显示遮罩层和弹出框
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
//隐藏遮罩层和弹出框
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
    var $giftcode, $codelists, $losing, $invite, $mask,
        $btngiftcode, $btnstart, $lottery, $close,
        $flag = false, $timer;
    var bindEvent = function(){

        //我的礼品码
        $btngiftcode.on('click', function(){
            showpopover($mask, $codelists);
        })

        //抽奖开始
        $btnstart.click(function(){
            $lottery.lottery({
                myprize: myprize
            });
            if($flag){
                return false;
            }
            else {
                clearTimeout($timer);
                $timer = setTimeout(function(){
                    if(myprize == 2) {
                        showpopover($mask, $giftcode);
                    }else if(myprize == 6){
                        showpopover($mask, $losing);
                    }
                }, 4000)
                $flag = true;
                return false;
            }
        })

        //关闭弹出框
        $close.on('click', function(){
            hidepopover($mask, $giftcode, $codelists, $losing, $invite);
        })

    }
    return {
        init: function(){
            $mask = $(".thanksgiving-mask");
            $giftcode = $(".thanksgiving-popover-giftcode");
            $codelists = $(".thanksgiving-popover-codelists");
            $losing = $(".thanksgiving-popover-losing");
            $invite = $(".thanksgiving-popover-invite");
            $btngiftcode = $(".mygiftcode");
            $btnstart = $(".btn-start");
            $lottery = $(".thanksgiving-lottery");
            $close = $(".thanksgiving-popover-close");
            bindEvent();
        }
    }
}()


$(document).ready(function(){
    popover.init();
    $(".ac-wall-lists").kxbdMarquee({
        direction: 'up',
        scrollDelay: 50,
        isEqual: false
    });
})

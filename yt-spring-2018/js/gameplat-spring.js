//show mask and popover
function showpopover () {
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
function hidepopover () {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
        arr[i].css({
            "display": "none"
        }).removeAttr('style');
    }
    return arr;
}


var popover = function () {
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
    var bindEvent = function () {

        //礼品箱
        $icongift.on('click', function () {
            showpopover($mask, $popgiftbox);
        });

        //返回顶部
        $btntop.on('click', function () {
            $("body, html").animate({
                scrollTop: 0
            }, 600)
        });

        //签到成功开始掷骰
        $btnsignin.on('click', function () {
            showpopover($mask, $popsignin);
        });

        // var mysourceprize = 2,//资源奖
        var mysourceprize = Math.floor(Math.random() * 6 + 1),//资源奖
            myluckyprize = 2;//幸运奖
        //资源转盘点击事件 start
        $btnstartsource.click(function () {
            $sourcelottery.lottery({
                myprize: mysourceprize
            });
        });

        //幸运转盘点击事件 start
        $btnstartlucky.click(function () {
            $luckylottery.lottery({
                myprize: myluckyprize
            });
        });

        //click close button hide popover and popovers
        $close.on('click', function () {
            hidepopover($mask, $popgiftbox, $popsignin, $popquestions, $popwrong, $popright, $popsteps, $popturntablelucky, $popturntablesource, $popprize, $popgoods, $popsuccess);
        })

    };
    return {
        init: function () {
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
            $popturntablelucky = $(".pop-turntable-lucky");//获得幸运转盘弹窗
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
}();

var gameplatSpring = function () {
};
gameplatSpring.prototype = {
    init: function () {
        this.openGage();
        this.showTips();
    },
    getCurrentDate: function () {
        var nowDate = new Date();
        var str = "" + nowDate.getFullYear() + "-";
        str += (nowDate.getMonth() + 1) + "-";
        str += nowDate.getDate();
        return str;
    },
    openGage: function () {
        $(".btn-open-gate").on('click', function () {
            var leftGate = $(".gate-wrapper .left"),
                rightGate = $(".gate-wrapper .right");
            //判断两块大门是否处于动画状态，如果没有则执行动画打开大门
            (leftGate && !leftGate.is(':animated')) && leftGate.stop().animate({
                'margin-left': -leftGate.width()
            }, 2000);
            (rightGate && !rightGate.is(':animated')) && rightGate.stop().animate({
                'margin-right': -rightGate.width()
            }, 2000);
        })
    },
    showTips: function () {
        var targetDate = '2018-01-01';
        //var targetDate = '2018-02-20';
        var _this = this;
        //鼠标悬浮显示提示信息，判断是否到了2月20日
        //如果没有到2月20日，提示用户敬请期待
        //如果到了日期，提示用户在下文的锦囊中选文字填对联
        if (parseInt(targetDate) - parseInt(_this.getCurrentDate()) > 0) {
            $(".couplet-wrapper li.symbol").hover(function () {
                if ($(this).find('.pop-tips').length == 0) {
                    $(this).append('<div class="pop-tips"><span class="text">对联填写活动将于2月20日开启，敬请期待!</span></div>');
                }
            });
        } else if (parseInt(_this.getCurrentDate()) - parseInt(targetDate) == 0) {
            $(".couplet-wrapper li.symbol").hover(function () {
                if ($(this).find('.pop-tips').length == 0) {
                    $(this).append('<div class="pop-tips"><span class="text">请在下方的锦囊中选中需要输入的文字!</span></div>');
                }
            });
            this.chooseWords();
        }
    },
    chooseWords: function () {
        var coupletItem,//单个对联元素
            coupletHtml,//对联元素的html
            coupletDataIndex,//对联元素的data-index值
            wordItem,//单个锦囊元素
            wordIndex,//锦囊元素索引
            wordHtml,//锦囊元素的html
            wordDataIndex,//锦囊元素的data-index值
            reg;//匹配汉字或者符号所用的正则
        $(".couplet-wrapper").delegate('.left li', 'click', function () {
            //点左边的时候清除右边的选中状态
            if ($(this).parents('.couplet-wrapper').find('.right li').hasClass('select')) {
                $('.couplet-wrapper .right li').removeClass('select');
            }
        }).delegate('.right li', 'click', function () {
            //点右边的时候清除左边的选中状态
            if ($(this).parents('.couplet-wrapper').find('.left li').hasClass('select')) {
                $('.couplet-wrapper .left li').removeClass('select');
            }
        }).delegate('li.symbol', 'click', function () {
            //选中文字添加高亮状态，再次点击取消选中
            $(this).hasClass('select') ? $(this).removeClass('select') : $(this).addClass('select');
            //去掉相邻元素选中状态
            $(this).siblings().removeClass('select');
        }).delegate('li.word', 'click', function () {
            //选中文字添加高亮状态，再次点击取消选中
            $(this).hasClass('select') ? $(this).removeClass('select') : $(this).addClass('select');
            //去掉相邻元素选中状态
            $(this).siblings().removeClass('select');
            //单个对联元素
            coupletItem = $(".couplet-wrapper li");
            //单个锦囊元素
            wordItem = $(".words-wrapper li");
            //当前点击元素的dataindex
            coupletDataIndex = $(this).attr('data-index');
            //单个对联元素的内容值
            coupletHtml = '<a class="text">?</a>';
            //匹配中文
            reg = /[\u4e00-\u9fa5]+/g;
            //判断对联中的元素是否被选中，并且选中元素的内容是中文
            if (coupletItem.hasClass('select') && reg.test($(".couplet-wrapper li.select").html())) {
                //那么还原锦囊中被选中的元素
                $(wordItem[coupletDataIndex]).removeClass('select');
                //当前元素变回？，去掉data-index属性，修改class名称
                $(".couplet-wrapper li.select")
                .removeClass('word select')
                .removeAttr('data-index')
                .addClass('symbol')
                .html(coupletHtml);
            }
        });
        //选择锦囊里的字放入到对联中
        $(".words-wrapper").delegate('li', 'click', function () {
            //锦囊中的单个元素
            wordItem = $(".words-wrapper li");
            //对联中的单个元素
            coupletItem = $(".couplet-wrapper li");
            //锦囊中单个元素的索引
            wordIndex = wordItem.index(this);
            //锦囊中单个元素的内容
            wordHtml = $(wordItem[wordIndex]).html();
            //锦囊中单个元素的索引
            wordDataIndex = $(wordItem[wordIndex]).attr('data-index');
            //匹配?/？符号
            reg = /[\uff1f|?]/;
            //用锦囊中的字替换对联上的？需要满足以下条件
            //1.对联上的格子被选中
            //2.格子中的内容是？
            //3.锦囊中的字没有选中
            if (coupletItem.hasClass('select') && !$(this).hasClass('select') && reg.test($(".couplet-wrapper li.select").html())) {
                //将锦囊中的字替换到对联对应被选中的位置
                $(".couplet-wrapper li.select")
                .html(wordHtml)
                .removeClass('symbol select')
                .addClass('word')
                .attr('data-index', wordDataIndex);
                //当前元素不可再点击
                $(this).addClass('select');
            }
        });
    }
};
$(document).ready(function () {
    //弹窗
    popover.init();

    //对联
    var gs = new gameplatSpring();
    gs.init();

    //页面滚动到模块的动画效果
    if ($(window).width() > 1000) {
        $('.smoove').smoove({offset: '40%'});
    }
});
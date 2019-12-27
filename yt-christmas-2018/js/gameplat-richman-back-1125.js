/**
 1、转盘可以循环转
 ---1)、骰子落子的目标位置大于所有棋子的总长度
 ---2)、骰子落子的目标位置刚好是开始位置
 2、前进5步
 ---在指定位置停顿1秒，向前走5步到格子10，下一次从格子10作为起点
 3、前进到10
 ---在指定位置停顿1秒，向前走4步到格子10，下一次从格子10作为起点
 4、选择步数
 ---1)、打开选择步数弹窗，选择一个数字n，关闭弹窗，向前走n步
 ---2)、如果打开了弹窗但未做选择，关闭弹窗，下一次摇骰子从‘选择步数’作为起点
 5、后退到6
 ---1)、从‘后退到6’作为起点，向后倒退6步，到格子6也就是‘前进到10’
 ---2)、因为‘前进到10’是后退的终点位置，所以在此处停顿1秒，再向前走4步到格子10
 ---3)、下一次摇骰子从格子10作为起点
 6、后退2步
 ---后退2步到‘后退到6’为终点，在此处停顿1秒，执行‘后退到6’
 7、答题惩罚
 ---显示答题弹窗，执行答题任务，下一次从‘答题惩罚’也就是格子17作为起点
 8、随机奖励
 ---显示奖励弹窗，领取获得的奖励，下一次从‘随机奖励’也就是格子19作为起点
 **/
var RichmanOpitons = {
    index: 0,//默认棋子所在位置
    number: 0,//骰子显示点数
    randomIndex: 0,//随机奖励
    questionFlag: true
};
(function ($) {
    var Richman = function (o, options) {
        this.o = o;
        this.options = $.extend({}, Richman.options, options);
        this.dice = this.options.dice;
        this.btnRoll = this.options.btnRoll;
        this.mask = this.options.mask;                                  //遮罩
        this.popsteps = this.options.popsteps;                          //选择步数弹窗
        this.popquestions = this.options.popquestions;                  //答题惩罚弹窗
        this.popprize = this.options.popprize;                          //随机奖励弹窗
        this.popkey = this.options.popkey;                              //获得钥匙弹窗
        this.forwardIndex = this.options.forwardIndex;                  //前进几步索引值
        this.forwardNum = this.options.forwardNum;                      //前进几步
        this.forwardToIndex = this.options.forwardToIndex;              //前进到几步索引值
        this.forwardTargetIndex = this.options.forwardTargetIndex;      //前进到目标位置的索引值
        this.forwardToNum = this.options.forwardToNum;                  //前进到几步
        this.keyIndex = this.options.keyIndex;                          //钥匙索引值
        this.stepIndex = this.options.stepIndex;                        //选择步数
        this.backToIndex = this.options.backToIndex;                    //后退到几步索引值
        this.backToNum = this.options.backToNum;                        //后退到几步
        this.backIndex = this.options.backIndex;                        //后退步数索引值
        this.backFromQuestionNum = this.options.backFromQuestionNum;    //如果答题错误，从答题位置向后退3格
        this.backNum = this.options.backNum;                            //后退几步
        this.questionIndex = this.options.questionIndex;                //答题惩罚
        this.prizeIndex = this.options.prizeIndex;                      //随机奖励
        this.index = this.options.index;                                //初始转动值
        this.backIndex = this.options.backIndex;                        //后退索引值
        this.choosesteps = 0;                                           //记住选择的步数
        this.length = $(this.o).find(".nr-gird").length;                //棋子长度
        this.direction = this.options.direction;                        //棋子走动方向
        this.targetIndex = 0;                                           //骰子落子位置
        this.overTimeFlag = false;                                      //是否超过1次转圈
        this.overTime = 0;                                              //如果超过一次，存放超过部分的差值
        this.timeInterval = null;                                       //棋子走动定时器
        this.timeOut = null;                                            //随机奖励定时器
        this.step = -1;                                                 //随机奖励转动的步数，控制转速和停止
        this.speed = 0;                                                 //随机奖励转动速度
        this.backFlag = false;
        this.isStop = false;
        this.init();
    };
    Richman.prototype = {
        init: function () {
            /**
             * 如果前进的步数，前进到目标位置的步数，后退的步数，后退后目标位置的步数以及答题惩罚向后退的步数都等0或者为负数，插件不予执行
             */
            if(this.forwardNum <= 0 || this.forwardToNum <= 0 || this.backToNum <= 0 || this.backNum <= 0 || this.backFromQuestionNum <= 0) {
                return false;
            }
            this.gridRoll(RichmanOpitons.number);
        },
        gridRoll: function () {
            var _this = this,
                newBackToIndex = this.backToIndex,//记住要后退到的步数
                newBackIndex = this.backIndex,//记住要后退的步数
                newQuestionIndex = this.questionIndex;//记住答题惩罚
            this.targetIndex = RichmanOpitons.index + RichmanOpitons.number;//骰子落子的目标位置
            //如果骰子落子的目标位置大于棋子总长度，求出他超出的数字，标识一轮结束，并将超出的数字赋值给目标值，继续向前走
            if (this.targetIndex > this.length) {
                this.overTime = RichmanOpitons.number - (this.length - RichmanOpitons.index);
                this.overTimeFlag = true;
                this.targetIndex = this.overTime;
            }
            //如果骰子落子的目标位置刚好等于棋子总长度，将超过的值赋值为0,也就是相当于重新从第一次开始循环执行
            else if (this.targetIndex == this.length) {
                this.overTime = 0;
                this.overTimeFlag = true;
                this.targetIndex = this.overTime;
            }
            //如果目标值是后退索引或者后退到索引或者是答题惩罚的索引，direction方向为back，否则为forwards
            ((RichmanOpitons.index == this.backIndex && this.targetIndex == this.backIndex) || RichmanOpitons.questionFlag == false)
                ? this.direction = 'back' :this.direction = 'forwards';

            function rotate() {
                switch (_this.direction) {
                    //前进
                    case 'forwards':
                        RichmanOpitons.index++;
                        $(".nr-gird-" + RichmanOpitons.index).addClass('current').siblings().removeClass('current');
                        //如果RichmanOpitons.index的累加值大于棋子总长度，用RichmanOpitons.index减去棋子总长度
                        if (RichmanOpitons.index > _this.length - 1) {
                            RichmanOpitons.index -= _this.length;
                            $(".nr-gird-" + RichmanOpitons.index).addClass('current').siblings().removeClass('current');
                        }
                        //如果棋子索引值正好等于目标位置，停止走动
                        if (RichmanOpitons.index == _this.targetIndex) {
                            clearInterval(_this.timeInterval);
                            RichmanOpitons.questionFlag = true;
                        }
                        break;
                    //后退
                    case 'back' :
                        //后退到第backToNum步
                        // if (RichmanOpitons.index == _this.backToIndex) {
                        //     newBackToIndex--;
                        //     $(".nr-gird-" + newBackToIndex).addClass('current').siblings().removeClass('current');
                        //     if (newBackToIndex == _this.backToNum) {
                        //         RichmanOpitons.index = newBackToIndex;
                        //     }
                        // }
                        //后退backNum步
                        if (RichmanOpitons.index == _this.backIndex) {
                            newBackIndex--;
                            $(".nr-gird-" + newBackIndex).addClass('current').siblings().removeClass('current');
                            if (newBackIndex == _this.backNum) {
                                RichmanOpitons.index = newBackIndex;
                            }
                        }
                        //如果答题错误，向后退3步到格子14的位置
                        if (RichmanOpitons.index == _this.questionIndex && RichmanOpitons.questionFlag == false) {
                            newQuestionIndex--;
                            $(".nr-gird-" + newQuestionIndex).addClass('current').siblings().removeClass('current');
                            if (newQuestionIndex == _this.backFromQuestionNum) {
                                RichmanOpitons.index = newQuestionIndex;
                                _this.targetIndex = RichmanOpitons.index;
                            }
                        }
                        break;
                }
                switch (true) {
                    //前进5步：当小人走到’前进5步‘(也就是图中格子4)，在格子4停顿1秒再向前走6步，到格子10
                    case RichmanOpitons.index == _this.forwardIndex && _this.targetIndex == _this.forwardIndex:
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = RichmanOpitons.index + _this.forwardNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.forwardFlag = true;
                        break;
                    //前进到10：当小人走到’前进到10‘(也就是图中格子6)，在格子6停顿1秒走到格子10
                    // case RichmanOpitons.index == _this.forwardToIndex && _this.targetIndex == _this.forwardToIndex:
                    //     _this.backToFlag = false;
                    //     _this.direction = 'forwards';
                    //     clearInterval(_this.timeInterval);
                    //     _this.targetIndex = RichmanOpitons.index + _this.forwardToNum;
                    //     setTimeout(function () {
                    //         _this.timeInterval = setInterval(rotate, 500);
                    //     }, 1000);
                    //     _this.forwardToFlag = true;
                    //     break;
                    //选择步数：当小人走到’选择步数‘(也就是格子8)，就执行选择步数的任务--显示’选择步数‘弹窗
                    case RichmanOpitons.index == _this.stepIndex && _this.targetIndex == _this.stepIndex:
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = _this.stepIndex;
                        var selfStep = _this, newStepDiceNumber = 0;
                        $(_this.mask).add(_this.popsteps).show();
                        //点击li，也就是说他选了步数，将开始按钮放开，并记住他选择的步数值
                        $(".pop-steps li").off('click').on('click', function () {
                            $(this).addClass('active').siblings().removeClass();
                            $(".pop-steps .btn-group").removeClass('btn-mask');
                            newStepDiceNumber = $(this).index() + 1;
                        });
                        $(".pop-steps .btn-start, .pop-steps .close").off('click').on('click', function () {
                            $(_this.mask).add(_this.popsteps).hide().removeAttr('style');
                            //如果self.choosesteps为0，也就是说没有选择步数，那么弹窗关闭之后掷骰按钮得恢复成可点击状态
                            //反之，如果选了步数，就按选择的步数向前走
                            if (newStepDiceNumber == 0) {
                                $(_this.btn).parent().removeClass('btn-mask');
                            } else {
                                _this.targetIndex += newStepDiceNumber;
                                selfStep.choosesteps = newStepDiceNumber;
                                _this.timeInterval = setInterval(rotate, 500);
                                $(".pop-steps li").removeClass('active');
                                $(".pop-steps .btn-group").addClass('btn-mask');
                            }
                        });
                        _this.stepFlag = true;
                        _this.overTimeFlag = false;
                        _this.forwardFlag = false;
                        _this.forwardToFlag = false;
                        _this.choosesteps = 0;
                        _this.backToFlag = false;
                        _this.backFlag = false;
                        _this.questionFlag = false;
                        _this.prizeFlag = false;
                        break;
                    //后退到6：如果走到’后退到6‘，回到’前进到10‘的位置，中间经过‘选择步数’继续后退不做处理
                    // case RichmanOpitons.index == _this.backToIndex && _this.targetIndex == _this.backToIndex:
                    //     _this.direction = 'back';
                    //     clearInterval(_this.timeInterval);
                    //     _this.targetIndex = _this.backToNum;
                    //     setTimeout(function () {
                    //         _this.timeInterval = setInterval(rotate, 500);
                    //     }, 1000);
                    //     _this.backToFlag = true;
                    //     break;
                    //获得钥匙：如果走到’获得钥匙‘,打开获得钥匙提示框，关闭弹窗继续往前走
                    case RichmanOpitons.index == _this.keyIndex && _this.targetIndex == _this.keyIndex:
                        clearInterval(_this.timeInterval);
                        $(_this.mask).add(_this.popkey).show();
                        $(".pop-key .btn-ok, .pop-key .close").off('click').on('click', function () {
                            $(_this.mask).add(_this.popkey).hide();
                        });
                        break;
                    //后退3步：当选完步数走到’后退3步‘，向后退两步，再次回到’后退到6‘，执行(2)
                    case RichmanOpitons.index == _this.backIndex && _this.targetIndex == _this.backIndex:
                        _this.direction = 'back';
                        clearInterval(_this.timeInterval);
                        _this.targetIndex = _this.backNum;
                        setTimeout(function () {
                            _this.timeInterval = setInterval(rotate, 500);
                        }, 1000);
                        _this.backFlag = true;
                        break;
                    //当小人后退到指定位置，继续向前走
                    case RichmanOpitons.index == _this.backNum && _this.targetIndex == _this.backNum:
                        _this.direction = 'forwards';
                        clearInterval(_this.timeInterval);
                        RichmanOpitons.index = _this.backNum;
                        break;
                    //答题惩罚：显示答题惩罚弹窗
                    case RichmanOpitons.index == _this.questionIndex && _this.targetIndex == _this.questionIndex:
                        _this.targetIndex = _this.questionIndex;
                        clearInterval(_this.timeInterval);
                        $(_this.mask).add(_this.popquestions).show();
                        $(_this.btn).parent().removeClass('btn-mask');
                        if(RichmanOpitons.questionFlag == false) {
                            _this.direction = 'back';
                            _this.targetIndex = _this.backFromQuestionNum;
                            setTimeout(function () {
                                _this.timeInterval = setInterval(rotate, 500);
                            }, 1000);
                        }
                        break;
                    //答题惩罚：显示答题惩罚弹窗
                    case RichmanOpitons.index == _this.backFromQuestionNum && _this.targetIndex == _this.backFromQuestionNum:
                        _this.direction = 'forwards';
                        clearInterval(_this.timeInterval);
                        RichmanOpitons.index = _this.backFromQuestionNum;
                        break;
                    //随机奖励：显示随机奖励弹窗
                    case RichmanOpitons.index == _this.prizeIndex && _this.targetIndex == _this.prizeIndex:
                        _this.targetIndex = _this.prizeIndex;
                        clearInterval(_this.timeInterval);
                        $(_this.mask).add(_this.popprize).show();
                        $(_this.btn).parent().removeClass('btn-mask');
                        _this.prizeFlag = true;
                        var self = _this, newPrizeDiceNumber = 0;//这个是选择随机奖励的索引值
                        $(".pop-prize .btn-start").off('click').on('click', function () {
                            //如果没有选择奖励，那么弹窗关闭之后掷骰按钮得恢复成可点击状态
                            //反之，执行选择奖励动作，并弹出提示框提示获得的奖励
                            newPrizeDiceNumber = Math.floor(Math.random() * 4 + 1);
//                            self.timeout = setTimeout(self.randomPrize(newPrizeDiceNumber), 100);
                            _this.randomPrize(newPrizeDiceNumber);
//                            randomRotate(newPrizeDiceNumber);
                        });
                        $(".pop-prize .close").off('click').on('click', function () {
                            $(_this.mask).add(_this.popprize).hide().removeAttr('style');
                            $(".pop-prize li").removeClass('active');
                            $(".pop-prize .btn-group").addClass('btn-mask');
                            //如果没有选择随机奖
                            if(newPrizeDiceNumber == 0) {
                                return false;
                            }else {
//                                //如果要继续往前走，就用当前棋子所在位置的索引值加上选的随机奖励的索引值，作为目标值
//                                _this.targetIndex = _this.prizeIndex + newPrizeDiceNumber;
//                                //和开始同样的判断方法，如果这个时候目标值比棋子总数大，那么重新赋值目标值
//                                if(_this.targetIndex > _this.length) {
//                                    //_this.overTime表示他超过了几个，用他选的随机奖励数减去  棋子总数和棋子当前所在位置的差  就是他超过的格子数，再将这个值赋值给目标值
//                                    _this.overTime = newPrizeDiceNumber - (_this.length - _this.prizeIndex);
//                                    _this.overTimeFlag = true;
//                                    _this.targetIndex = _this.overTime;
//                                    //如果目标值和棋子总数相等将目标值赋为0  也就是从0开始走
//                                }else if(_this.targetIndex == _this.length) {
//                                    _this.overTime = 0;
//                                    _this.overTimeFlag = true;
//                                    _this.targetIndex = _this.overTime;
//                                }
                                //处理完边界值再次执行rotate函数，让棋子继续向前走
//                                _this.timeInterval = setInterval(rotate, 500);
                            }
                        });
                        break;
                }
            }
            if(RichmanOpitons.number == 0 || RichmanOpitons.number == '') {
                $(".nr-gird-" + RichmanOpitons.index).addClass('current').siblings().removeClass('current');
            }else {
                clearInterval(this.timeInterval);
                this.timeInterval = setInterval(rotate, 500);
            }
        },
        /**
         * 随机奖励
         *
        */
        randomPrize: function (prizeIndex) {
            //设置转动多少圈
            var _this = this, prizeLength = $(".pop-prize .lottery-unit").length;
            if(this.step >= (32 + prizeIndex)) {
                $(".pop-prize .lottery-unit-" + (this.step % prizeLength)).addClass('active');
                this.step = prizeIndex;
                alert(this.step)
                clearTimeout(this.timeout);//停止转动
                return false;
            }
            //在即将结束转动前减速
            if(this.step >= (24 + prizeIndex)) {
                this.speed++;
            }else {
                //控制中间转速
                if(this.speed <= 0)
                    this.speed = 0;
                this.speed--;
            }
            this.step++;
            $(".pop-prize .lottery-unit-" + (this.step % prizeLength)).addClass('active').siblings().removeClass('active');
            //clearTimeout(this.timeout);
            this.timeout = setInterval(_this.randomPrize, _this.speed * 50);
        }
    };

    $.fn.Richman = function (options) {
        options = $.extend({}, $.fn.Richman.options, options);
        this.each(function () {
            new Richman($(this), options);
        })
    };
    Richman.options = {
        dice: '.dice',
        btnRoll: '.btn-roll',
        direction: 'forwards',          //行走方向：前进/后退
        mask: '.mask',                  //遮罩
        popsteps: '.pop-steps',         //选择步数弹窗
        popquestions: '.pop-questions', //答题惩罚弹窗
        popprize: '.pop-prize',         //随机奖励弹窗
        popkey: '.pop-key',             //获得钥匙弹窗
        forwardIndex: 4,                //前进几步索引值
        forwardNum: 5,                  //前进步数
        forwardToIndex: 6,              //前进到几步索引值
        forwardTargetIndex: 10,         //前进到目标位置的索引值
        forwardToNum: 4,                //前进到第几步
        stepIndex: 8,                   //选择步数
        keyIndex: 11,                   //钥匙索引值
        backToIndex: 12,                //后退到几步索引值
        backToNum: 6,                   //后退到第几步
        backIndex: 15,                  //后退步数索引值
        backFromQuestionNum: 14,        //如果答题错误，从答题位置向后退3格
        backNum: 12,                    //后退步数
        questionIndex: 17,              //答题惩罚
        prizeIndex: 19,                 //随机奖励
        choosesteps: 0                 //记住选择的步数
    }
})(jQuery);
function step(dice, number){
    dice.attr("class", "dice").animate({opacity: 'fast'}, 100, function () {
        $(".dice").addClass('dice-t');
    }).delay(200).animate({opacity: 'fast'}, 100, function () {
        dice.removeClass('dice-t').addClass('dice-s');
    }).delay(200).animate({opacity: 'show'}, 100, function () {
        dice.removeClass('dice-s').addClass('dice-e');
    }).delay(200).animate({opacity: 'fast'}, 100, function () {
        dice.removeClass('dice-e').addClass('dice-0' + number);
        $('.pop-signin .btn-ok').parent().removeClass('btn-mask');
    });
};
$(document).ready(function () {
    $(".national-richman").Richman();
    var dice = $('.dice');
    //签到成功
    $('.pop-signin .btn-start').on('click', function () {
        $(this).hide();
        $(this).parent().addClass('btn-mask');
        RichmanOpitons.number = 19;
//        RichmanOpitons.number = parseInt(Math.random() * 6 + 1);
        RichmanOpitons.questionFlag = true;
        step(dice, RichmanOpitons.number);
        $(".pop-signin .btn-ok").css('display', 'block');
    });
     $(".pop-signin .btn-ok, .pop-signin .close").on('click', function () {
         $(".mask, .pop-signin, .pop-signin .btn-ok").hide().removeAttr('style');
         dice.attr('class', 'dice');
         $(".pop-signin .btn-start").show();
         RichmanOpitons.questionFlag = true;
         $(".national-richman").Richman()
     });

//    var step = -1,//计算转动的步数，控制转速和停止
//        timeout = null, //转动方法
//        speed = 0; //转动速度
//    function rotate () {
//        //设置转动多少圈
//        if(step >= (32 + RichmanOpitons.randomIndex)) {
//            $(".pop-prize .lottery-unit-" + (step % $(".pop-prize .lottery-unit").length)).addClass('active');
//            step = RichmanOpitons.randomIndex;
//            alert(step)
//            clearTimeout(timeout);//停止转动
//            return false;
//        }
//        //在即将结束转动前减速
//        if(step >= (24 + RichmanOpitons.randomIndex)) {
//            speed++;
//        }else {
//            //控制中间转速
//            if(speed <= 0)
//                speed = 0;
//            speed--;
//        }
//        step++;
//        $(".pop-prize .lottery-unit-" + (step % $(".pop-prize .lottery-unit").length)).addClass('active').siblings().removeClass('active');
//        timeout = setTimeout(rotate, speed * 50);
//    }
//    $(".pop-prize .btn-start").off('click').on('click', function () {
////        RichmanOpitons.randomIndex = Math.floor(Math.random() * 4);
////        rotate();
//    });
})
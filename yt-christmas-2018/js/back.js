
(function ($) {
    var Richman = function (o, options) {
        this.o = o;
        this.options        = $.extend({}, Richman.options, options);
        this.dice           = this.options.dice;
        this.btn            = this.options.btn;
        this.forwardIndex   = this.options.forwardIndex;    //前进几步索引值
        this.forwardNum     = this.options.forwardNum;      //前进几步
        this.forwardToIndex = this.options.forwardToIndex;  //前进到几步索引值
        this.forwardToNum   = this.options.forwardToNum;    //前进到几步
        this.chooseSteps    = this.options.chooseSteps;     //选择步数
        this.backToIndex    = this.options.backToIndex;     //后退到几步索引值
        this.backToNum      = this.options.backToNum;       //后退到几步
        this.backIndex      = this.options.backIndex;       //后退步数索引值
        this.backNum        = this.options.backNum;         //后退几步
        this.answer         = this.options.answer;          //答题惩罚
        this.reward         = this.options.reward;          //随机奖励
        this.index          = this.options.index;           //初始转动值
        this.backIndex      = this.options.backIndex;       //后退索引值
        this.step           = this.options.step;            //初始步数
        this.diceArr        = [];                           //用来存放骰子显示的点
        this.direction      = this.options.direction;
        this.length         = $(".nr-gird").length;
        this.timeout        = null;
        this.init();
    };
    Richman.prototype = {
        init: function () {
            this.role();
        },
        role: function () {
            var _this = this;
            $(this.btn).on('click', function () {
                $(this).parent().addClass('btn-mask');//添加遮罩防止重复点击
                //_this.step = Math.floor(Math.random() * 6 + 1);
                _this.diceRoll($(_this.dice), _this.step);
                _this.gridRole(_this.index, _this.step);
                return false;
            })
        },
        diceRoll: function (dice, num) {
            dice.attr("class", "dice").animate({left: 0}, 100, function () {
                dice.addClass('dice-t');
            }).delay(200).animate({top: 0}, 100, function () {
                dice.removeClass('dice-t').addClass('dice-s');
            }).delay(200).animate({opacity: 'show'}, 100, function () {
                dice.removeClass('dice-s').addClass('dice-e');
            }).delay(200).animate({top: 0}, 100, function () {
                dice.removeClass('dice-e').addClass('dice-0' + num);
            });
        },
        gridRole: function (index, step) {
            var _this = this,
                diceSum = 0,
                newBackToIdex = this.backToIndex,//记住要后退到的步数
                newBackIndex = this.backIndex;//记住要后退到的步数
            this.index = index;//记住当前走到哪一步
            this.diceArr.push(step);//将走过的步数，也就是骰子显示转动结束后的数字存放在数组中
            for (var i =0; i < this.diceArr.length;i++) {
                diceSum += this.diceArr[i];
            }
            function rotate() {
                if(_this.direction && _this.direction == 'forwards') {

                }
                //后退到第backToNum步
                if(_this.index == _this.backToIndex) {
                    newBackToIdex--;
                    _this.index = newBackToIdex;
                    if(_this.index < _this.backToNum) {
                        _this.index = _this.backToNum;
                    }
                    $(".nr-gird-" + _this.index).addClass('current').siblings().removeClass('current');
                }
                //后退backNum步
                if(_this.index == _this.backIndex) {
                    newBackIndex--;
                    _this.index = newBackIndex;
                    if(_this.index < _this.backNum) {
                        _this.index = _this.backNum;
                    }
                    $(".nr-gird-" + _this.index).addClass('current').siblings().removeClass('current');
                }
                else {
                    //前进
                    _this.index++;
                    if (_this.index == _this.length - 1) {
                        _this.index = -1;
                    }
                    $(".nr-gird-" + _this.index).addClass('current').siblings().removeClass('current');
                }
                /*处理中间几个特殊步骤
                 * (1)、
                 * 当小人走到’前进6步‘(也就是图中格子4)，在格子4停顿1秒再向前走6步
                 * 但其实当小人走到’前进到10‘(也就是图中格子6)，就要在格子6停顿1秒再向前走4步
                 * 而当小人走到’选择步数‘(也就是格子8)，就执行选择步数的任务--显示’选择步数‘弹窗
                 * 所以，其实小人从格子4到格子6再到格子8，中间都只走了两步
                 *
                 * (2)、
                 * 选择完步数之后，如果走到’后退到6‘，小人应该向后退6步，也就是走到’前进到10‘的位置
                 * 但其实他走不到那里去，因为当他退到格子8的时候就需要再一次选择步数--显示’选择步数‘弹窗
                 * 所以他最多只能退4步
                 *
                 * (3)、
                 * 他当选完步数走到’后退2步‘，向后退两步，再次回到’后退到6‘，执行(2)

                 * */
                if(_this.index == _this.forwardIndex || _this.index == _this.forwardToIndex ||  _this.index == _this.backToIndex ||  _this.index == _this.backIndex) {
                    clearInterval(_this.timeout)
                    switch (_this.index){
                        case _this.forwardIndex:
                            diceSum += 2;
                            setTimeout(function(){
                                _this.timeout = setInterval(rotate, 500)
                            }, 1000);
                            break;
                        case _this.forwardToIndex:
                            diceSum += 2;
                            setTimeout(function(){
                                _this.timeout = setInterval(rotate, 500)
                            }, 1000);
                            break;
                        case _this.backToIndex:
                            diceSum = _this.backToNum;
                            setTimeout(function(){
                                _this.timeout = setInterval(rotate, 500)
                            }, 1000);
                            break;
                        case _this.backIndex:
                            diceSum = _this.backNum;
                            setTimeout(function(){
                                _this.timeout = setInterval(rotate, 500)
                            }, 1000);
                            break;
                        default :
                            $(_this.btn).parent().removeClass('btn-mask');
                            break;

                    }
                }
                /* 处理最后一个格子和第一个格子的边界
                 *  如果sum值(也就是骰子显示数的总和)大于整个格子的长度 用sum减去整个格子的长度 回到最初的位置从0开始
                 *  如果sum值(也就是骰子显示数的总和)刚好等于格子的长度 将sum值赋为-1
                 * */
                if (diceSum > _this.length - 1) {
                    diceSum = diceSum - _this.length;
                } else if (diceSum == _this.length - 1) {
                    diceSum = -1;//之所以将此处设为-1，是为了跟初始值保持一致
                }
                if(_this.index == _this.backToIndex) {
                    if (newBackToIdex == diceSum) {
                        clearInterval(_this.timeout); //如果到达指定位置则停止
                        $(_this.btn).parent().removeClass('btn-mask');
                    }
                }
                //后退backNum步
                if(_this.index == _this.backIndex) {
                    if (newBackToIdex == diceSum) {
                        clearInterval(_this.timeout); //如果到达指定位置则停止
                        $(_this.btn).parent().removeClass('btn-mask');
                    }
                }
                else {
                    if (_this.index == diceSum) {
                        clearInterval(_this.timeout); //如果到达指定位置则停止
                        $(_this.btn).parent().removeClass('btn-mask');
                    }
                }

            }
            clearInterval(this.timeout);
            this.timeout = setInterval(rotate, 500)
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
        btn: '.btn-signin',
        direction: 'forwards',
        forwardIndex: 4,      //前进几步索引值
        forwardNum: 6,        //前进步数
        forwardToIndex:6,     //前进到几步索引值
        forwardToNum:4,       //前进到第几步
        chooseSteps: 8,       //选择步数
        backToIndex: 12,      //后退到几步索引值
        backToNum: 8,         //后退到第几步
        backIndex: 15,        //后退步数索引值
        backNum: 12,          //后退步数
        answer:17,            //答题惩罚
        reward:19,            //随机奖励
        index: -1,            //初始转动值
        step:0                //初始步数
    }
})(jQuery);
var step = Math.floor(Math.random() * 6 + 1);
$(document).ready(function () {
    $(".national-richman").Richman({
        step: 4
    });

});
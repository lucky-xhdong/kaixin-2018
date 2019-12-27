(function($, doc, win){
    // args参数用于可被调用对象设置的参数(多个对象使用不同值的问题：参数值用数组解决，如speed: [20, 30])
    var args= {
        lst: '.m-lst-jgg',  //初始的礼品class
        start: '.m-lst-start', //开始抽奖按钮
        on: 'on',           //初始的当前活动节点的样式及其标识class
        index: -1,          //初始的当前活动节点
        times: 0,           //初始的转动次数
        speed: 100,         //初始的最初转盘转动速度
        mins: 40,           //初始的最小转速
        before: 60,         //初始的进入抽奖环节钱转盘的转动次数
        prize: -1,          //初始的中奖位置
    };
    $.fn.jgg= function(opts){
        if(opts && Object.prototype.toString.call(opts) != '[object Object]'){
            return;
        };
        args= $.extend({}, args, opts);
        return $(this).each(function(index, elem){
            var self= $(elem),
                lottery= null,
                isFirst= true,      //用于标识是否第一次点击抽奖按钮
                jggFlag= true,      //用于标识是否可抽奖
                timer= 0,           //计时器
                prize= args.prize,  //中间物品的索引
                times= args.times,  //转动次数
                speed= args.speed,  //转速
                index= args.index,  //当前节点
                lstClass= args.lst, //lst的class前缀
                start= args.start,  //当前九宫格的开始抽奖按钮
                lst= self.children(lstClass),     //礼品对象
                length= lst.length;  //礼品数目
            var	i= 0;
            lottery= {
                init: function(){
                    if(length == 0){
                        return;
                    }
                    if(isFirst){
                        lst.filter(lstClass + index).addClass(args.on);
                        isFirst= false;
                    }
                    this.rotate();
                },
                roll: function(){
                    lst.filter(lstClass + index).removeClass(args.on);
                    if(index==length-1){
                        index= 0;
                    }else{
                        index+= 1;
                    }
                    times++;
                    lst.filter(lstClass + index).addClass(args.on);
                },
                rotate: function(){
                    lottery.roll();
                    if (times > args.before+10 && prize==index){

                        clearTimeout(timer);
                        speed= args.speed;
                        prize= -1;
                        times= args.times;
                        jggFlag= true;
                        return;
                    }
                    if(times < args.before){
                        speed -= 10;         //为达到所要求的抽奖前转动次数时，速度递减
                    }
                    if(times > args.before){
                        // 如果奖品索引是当前索引的下一个，因为步长较短，所以快速减速
                        if((prize==0 && index==length-1) || prize==index+1){
                            speed += 100;
                        }else{  //步长较长时，可较慢减速
                            speed += 20;
                        }
                    }
                    // 转动速度不能低于所设最小转速
                    if(speed < args.mins){
                        speed= args.mins
                    }
                    timer= setTimeout(lottery.rotate, speed);
                }
            };
            // 九宫格点击事件
            self.children(start).on('click', function(){
                if(!jggFlag){
                    return;
                }
                jggFlag= false;
                // 点击事件发生后请求后端接口获取中奖物品的索引,并设置prize的值
                // 此处添加代码代替下一行
                prize= Math.random() * (length) | 0;
                lottery.init();
            });
        });

    }
})(jQuery, document, window)
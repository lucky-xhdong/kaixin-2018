/*
*	total变量时最终统计的点中的糖果数
*   extra: ".m-extra",           //辅助标签，用于获取糖果雨中糖果的大小
*   sugar: '.g-sugar',           //糖果放置区域
*   maxValue: 45,                //糖果数,应该是所要糖果数
*   speed: 500,                  //控制糖果的出现速度
*   ssugar: 5                    //控制糖果掉落的速度
*   maxSugar: 10                 //最大糖果数
*/
(function($, doc){
	$.fn.snow = function(opts){
		var $flake= $('<div class="u-icon m-flake" />'),
			self= $(this),
			height= self.height(),
			width= self.width(),
			defaults= {
				speed: 500,
				maxValue: 45,
				hide: 'fn-hide',
				ssugar: 5,
				mask: $('.m-mask-gift'),
				totalMask: $('.m-wrap-gifts2'),
            	txt3: '.u-sugar-txt3'
			}, timeout, timeId,
			id= 0, total=0,
			opts= $.extend({}, defaults, opts);
		timeout= function(){
			clearTimeout(timeId);
			timeId= setTimeout(function() {
				var _width= opts.extra.width(),
					_height= opts.extra.height(),
					start= Math.random() * width,
					marxLeft= width - _width,
					// end= height,            //使用zepto时用
					end= height,        //使用jquery时用, - _height
					dur= height * opts.ssugar + Math.random() * 1600,
					_self;

				if(start >= marxLeft){
					start= marxLeft;
				}
				_self= $flake.clone();
				_self._id= id;

				_self.css({
						left: start
					})
					.appendTo(self)
					.on('click', function(){
						_self.remove();
						if(total < opts.maxSugar){
							total++;
						}
					})
					.animate({
							top: end
							// "translate3d": "0px, " + end + 'px, 0px',    //使用zepto时用
						},
						dur,
						'linear',
						function() {
							_self.remove();

							if(_self._id==opts.maxValue-1){
								setTimeout(function(){
									self.addClass(opts.hide);
									opts.txt3.html("+" + total );
									opts.totalMask.show(600, function(){
										total= 0;
									});
								}, 800);
							}
						}
					)
				id++;
				if(id < opts.maxValue){
					timeout();
					return;
				}
			}, opts.speed);	
		};
		timeout();
	};
})(jQuery, document);
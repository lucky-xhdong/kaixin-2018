(function($, doc, win){
	// $.fn.index= function(opts){
	$.extend({
		index: function(opts){
			var sles= {
				hide: 'fn-hide',
				maxValue: 45,
				speed: 500,
				ssugar: 5,
				// 第一部分南瓜头
				pumpkin: '.m-pumpkin',
				pumtxt: '.m-txt-pumpkin',
				//第三部分的南瓜红包
				red: '.m-lst-red',      
				redtxt:'.m-txt-red',
				// 锚点平滑处理
				maodian: ".u-maodian",
                toTop: 'u-fixed-5',
                toTopW: '.m-lst-top',
                // 小房子导航wap端
                nav: '.m-nav',
                navc1: 'm-nav-1',
                navc2: 'm-nav-2',
                top: 6.8,
                // 小房子导航状态切换
               	lstFixed: '.m-lst-fixed',
               	cur: 'cur',
               	// gift帽子
               	gift: '.u-gift',
               	giftCode: '.m-wrap-gifts1'
			}, elems={}, top,
			_win= $(win),
			initialTop= $('html').css('fontSize').split('px')[0] * sles.top;
			if(opts && Object.prototype.toString.call(opts)!='[object Object]'){
				return;
			}
			sles= $.extend({}, sles, opts);
			elems.close1= $(sles.close1);
			elems.mask= $(sles.mask);
			elems.start= $(sles.start);
			elems.sugar= $(sles.sugar);
			elems.pumpkin= $(sles.pumpkin);
			elems.red= $(sles.red);
			elems.maodian= $(sles.maodian);
			elems.nav= $(sles.nav);
			elems.toTopW= $(sles.toTopW);
			elems.lstFixed= $(sles.lstFixed);
			elems.gift= $(sles.gift);
			elems.giftCode= $(sles.giftCode);

			elems.start.on('click', function(){
				elems.mask.removeClass(sles.hide);
				elems.sugar.removeClass(sles.hide);
				elems.sugar.snow({
					mask: elems.mask,
					maxValue: sles.maxValue,
					speed: sles.speed,
					ssugar: sles.ssugar,
					extra: $(sles.extra),
					totalMask: $(sles.totalMask),
                	txt3: $(sles.txt3)
				});
			});
			elems.close1.on('click', function(){
				$(this).parents(sles.par).hide();
				elems.mask.addClass(sles.hide);
			});
			// elems.red.on('mouseover', function(){
			// 	var _self= $(this);
			// 	_self.find(sles.redtxt).show(2000).delay(2000).hide(2000);
			// });
			// elems.pumpkin.on('mouseover', function(){
			// 	var _self= $(this);
			// 	_self.find(sles.pumtxt).show(2000).delay(2000).hide(2000);
			// });
			// 锚点的平滑跳转
			elems.maodian.on('click', function(){
				var _self= $(this),
					href = null,
					pos = 0;
				if(!_self.hasClass(sles.toTop)){
					href = _self.attr('href');
					pos= $(href).offset().top;
				}
				$("body, html").animate({
					scrollTop: pos
				}, 800);
			});
			// wap端导航class切换
			if(!elems.nav.is(":hidden")){
				_win
				.on('resize', function(){
					initialTop= $('html').css('fontSize').split('px')[0] * sles.top;
				})
				.scroll(function(){
					var top= $(this).scrollTop();
					if(top>initialTop){
						elems.nav.addClass(sles.navc2);
						elems.toTopW.show(300);
					}else{
						elems.nav.removeClass(sles.navc2);
						elems.toTopW.hide(300);
					}
				});
			}
			// wap和pc的导航选中处理
			elems.lstFixed.on('click', function(){
				$(this).addClass(sles.cur).siblings().removeClass(sles.cur);
			});
			// gift小帽子点击事件
			elems.gift.on('click', function(){
				elems.giftCode.show(600);
			});
			document.body.addEventListener('touchstart', function () { });
		}
	}) 
})(jQuery, document, window)
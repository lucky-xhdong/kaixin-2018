/**
 * Created by xhdong on 15/11/13.
 */
var tab = function(){
    var nav, con, index;
    var bindEvent = function(){
        if(isNaN(index) || index == '') {
            index = 0;
        }
        nav.find("li").eq(index).addClass('active');
        con.find(' > div').eq(index).show();
        nav.find("li").on('click', function(){
            var _this = $(this);
            _this.addClass('active').siblings().removeClass('active');
            index = _this.index();
            console.log(index)
            con.find(' > div').eq(index).show().siblings().hide();
            return false;
        })
    }
    return {
        init: function(n, c, i){
            nav = n,
            con = c,
            index = i,
            bindEvent();
        }
    }
}()

var tab01 = function(){
    var nav;
    var bindEvent = function(){
        nav.find('li').on('mouseover', function(){
            $(this).addClass('active').siblings().removeClass('active');
            return false;
        })
    }
    return {
        init: function(n){
            nav = n;
            bindEvent();
        }
    }
}()
$(document).ready(function(){
    tab.init($(".thanksgiving-nav"), $(".thanksgiving-con"));
    tab01.init($(".thanksgiving-events-nav"));
})

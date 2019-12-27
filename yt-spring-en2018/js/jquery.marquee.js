;(function($){
    $.fn.AutoScroll = function(options) {
        var timer = null;
        var $this = $(this);
        function AutoScroll() {
            if($this.find("ul").height() > $this.height() && !$this.find("ul").is(":animated")) {
                var height = $this.find('li:first').height();
                $this.find("ul:first").animate({
                    marginTop: -height + 'px'
                }, 500, function() {
                    $(this).css({ marginTop: 0 }).find("li:first").appendTo(this);
                });
            }
        }
        clearInterval(timer);
        timer = setInterval(AutoScroll, 5000);
        $this.hover(function () {
            clearInterval(timer);
        }, function(){
            timer = setInterval(AutoScroll, 5000);
        })
    }
})(jQuery);

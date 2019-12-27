(function(e) {
    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        if((sUserAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|playbook)/i))){
            function t() {
                var t = n.getBoundingClientRect().width;
                t / o > 1000 && (t = 1000 * o), e.rem = t / 16, n.style.fontSize = e.rem + "px"
            }
            var o, i, s, a = e.document,
                n = a.documentElement,
                l = a.querySelector('meta[name="viewport"]');
            if (l) {
                var d = l.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
                d && (i = parseFloat(d[2]), o = parseInt(1 / i))
            } else l = a.createElement("meta"), l.setAttribute("name", "viewport"), l.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no, minimal-ui"), n.firstElementChild.appendChild(l);
            e.addEventListener("resize", function() {
                clearTimeout(s), s = setTimeout(t, 300)
            }, !1), e.addEventListener("pageshow", function(e) {
                e.persisted && (clearTimeout(s), s = setTimeout(t, 300))
            }, !1), "complete" === a.readyState ? a.body.style.fontSize = 12 * o + "px" : a.addEventListener("DOMContentLoaded", function() {
                a.body.style.fontSize = 12 * o + "px"
            }, !1), t();
        }
    }
    browserRedirect();

})(window);
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
function pegasus(t, e) {
    return (e = new XMLHttpRequest).open("GET", t),
    t = [],
    e.onreadystatechange = e.then = function(i, n, r, o) {
        if (i && i.call && (t = [, i, n]),
        4 == e.readyState && (r = t[0 | e.status / 200])) {
            try {
                o = JSON.parse(e.responseText)
            } catch (t) {
                o = null
            }
            r(o, e)
        }
    }
    ,
    e.send(),
    e
}
function getNewUser() {
    var t = "";
    function e(t, e) {
        Array.prototype.slice.call(document.getElementsByTagName("li")).find((function(e) {
            return e.getAttribute("data-label") === t
        }
        )).setAttribute("data-value", e)
    }
    document.body.classList.contains("lego") && (t = "&lego"),
    pegasus("https://randomuser.me/api/?nat=us&randomapi" + t).then((function(t) {
        if (!t.error) {
            var i = t.results[0];
            document.getElementById("user_photo").getElementsByTagName("img")[0].src = i.picture.large,
            e("name", i.name.first + " " + i.name.last),
            document.getElementById("user_value").innerHTML = i.name.first + " " + i.name.last,
            e("email", i.email);
            var n = new Date(i.dob.date);
            e("birthday", n.getMonth() + 1 + "/" + (n.getDay() + 1) + "/19" + n.getYear()),
            e("location", i.location.street.number + " " + i.location.street.name),
            e("phone", i.cell),
            e("pass", i.login.password)
        }
    }
    ))
}
!function(t, e) {
    "undefined" != typeof module ? module.exports = e() : "function" == typeof define && "object" == typeof define.amd ? define(e) : this.domready = e()
}(0, (function() {
    var t, e = [], i = document, n = i.documentElement.doScroll, r = "DOMContentLoaded", o = (n ? /^loaded|^c/ : /^loaded|^i|^c/).test(i.readyState);
    return o || i.addEventListener(r, t = function() {
        for (i.removeEventListener(r, t),
        o = 1; t = e.shift(); )
            t()
    }
    ),
    function(t) {
        o ? setTimeout(t, 0) : e.push(t)
    }
}
)),
function() {
    if (-1 !== document.title.indexOf("home")) {
        pegasus("https://randomuser.me/api/?randomapi").then((function(e) {
            t(e)
        }
        ), (function(e) {
            t(e)
        }
        ));
        var t = function(t) {
            if (t.error) {
                var e = document.createElement("div");
                e.className = "alert",
                e.innerHTML = 'API Status: OFFLINE. Please tweet us <a href="https://twitter.com/randomapi">@randomapi</a> if you are seeing this message.';
                var i = document.getElementsByTagName("body")[0];
                i.insertBefore(e, i.firstChild)
            }
        }
    }
}(),
domready((function() {
    -1 !== window.location.href.indexOf("stats") && pegasus("getStats").then((function(t) {
        var e = t.map((function(t) {
            return t.date
        }
        ))
          , i = t.map((function(t) {
            return Number(t.total)
        }
        ))
          , n = t.map((function(t) {
            return Math.round(t.bandwidth / 1024 / 1024 * 100) / 100
        }
        ));
        Highcharts.setOptions({
            lang: {
                thousandsSep: ","
            }
        }),
        new Highcharts.Chart({
            chart: {
                renderTo: document.getElementById("charts")
            },
            title: {
                text: ""
            },
            xAxis: {
                title: {
                    text: "Date"
                },
                categories: e
            },
            yAxis: [{
                minPadding: .2,
                maxPadding: .2,
                labels: {
                    style: {
                        color: "#93B1C6"
                    }
                },
                title: {
                    text: "Users"
                },
                opposite: !0
            }, {
                labels: {
                    format: "{value} MB",
                    style: {
                        color: "#FF7148"
                    }
                },
                title: {
                    text: "Bandwidth"
                }
            }],
            series: [{
                name: "Bandwidth",
                yAxis: 1,
                color: "#FF7148",
                data: n
            }, {
                name: "Users",
                data: i,
                color: "#93B1C6"
            }],
            tooltip: {
                shared: !0
            }
        })
    }
    ))
}
)),
domready((function() {
    if (-1 !== document.title.indexOf("Home")) {
        getNewUser();
        var t = Array.prototype.slice.call(document.getElementById("values_list").getElementsByTagName("li"));
        t.forEach((function(e) {
            e.addEventListener("mouseover", (function() {
                t.forEach((function(t) {
                    t.className = t.className.replace(/\bactive\b/, "")
                }
                ));
                var e = this;
                e.className += " active",
                document.getElementById("user_title").innerHTML = e.getAttribute("data-title"),
                document.getElementById("user_value").innerHTML = e.getAttribute("data-value"),
                e.getAttribute("data-caps") ? document.getElementById("user_value").style.textTransform = "lowercase" : document.getElementById("user_value").style.textTransform = "capitalize"
            }
            ))
        }
        ))
    }
}
)),
function(t, e) {
    "object" == typeof module && module.exports ? module.exports = t.document ? e(t) : e : t.Highcharts = e(t)
}("undefined" != typeof window ? window : this, (function(t) {
    function e(e, i) {
        var n = "Highcharts error #" + e + ": www.highcharts.com/errors/" + e;
        if (i)
            throw Error(n);
        t.console && console.log(n)
    }
    function i(t, e, i) {
        this.options = e,
        this.elem = t,
        this.prop = i
    }
    function n() {
        var t, e, i = arguments, n = {}, r = function(t, e) {
            var i, n;
            for (n in "object" != typeof t && (t = {}),
            e)
                e.hasOwnProperty(n) && ((i = e[n]) && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== n && "number" != typeof i.nodeType ? t[n] = r(t[n] || {}, i) : t[n] = e[n]);
            return t
        };
        for (!0 === i[0] && (n = i[1],
        i = Array.prototype.slice.call(i, 2)),
        e = i.length,
        t = 0; t < e; t++)
            n = r(n, i[t]);
        return n
    }
    function r(t, e) {
        return parseInt(t, e || 10)
    }
    function o(t) {
        return "string" == typeof t
    }
    function s(t) {
        return t && "object" == typeof t
    }
    function a(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function h(t) {
        return "number" == typeof t
    }
    function c(t) {
        return Z.log(t) / Z.LN10
    }
    function l(t) {
        return Z.pow(10, t)
    }
    function u(t, e) {
        for (var i = t.length; i--; )
            if (t[i] === e) {
                t.splice(i, 1);
                break
            }
    }
    function p(t) {
        return t !== M && null !== t
    }
    function d(t, e, i) {
        var n, r;
        if (o(e))
            p(i) ? t.setAttribute(e, i) : t && t.getAttribute && (r = t.getAttribute(e));
        else if (p(e) && s(e))
            for (n in e)
                t.setAttribute(n, e[n]);
        return r
    }
    function f(t) {
        return a(t) ? t : [t]
    }
    function g(t, e, i) {
        if (e)
            return setTimeout(t, e, i);
        t.call(0, i)
    }
    function m(t, e) {
        ct && !dt && e && e.opacity !== M && (e.filter = "alpha(opacity=" + 100 * e.opacity + ")"),
        Rt(t.style, e)
    }
    function y(t, e, i, n, r) {
        return t = $.createElement(t),
        e && Rt(t, e),
        r && m(t, {
            padding: 0,
            border: "none",
            margin: 0
        }),
        i && m(t, i),
        n && n.appendChild(t),
        t
    }
    function v(t, e) {
        var i = function() {};
        return i.prototype = new t,
        Rt(i.prototype, e),
        i
    }
    function x(t, e) {
        return Array((e || 2) + 1 - String(t).length).join(0) + t
    }
    function b(t, e) {
        for (var i, n, r, o, s, a = "{", h = !1, c = []; -1 !== (a = t.indexOf(a)); ) {
            if (i = t.slice(0, a),
            h) {
                for (s = (r = (n = i.split(":")).shift().split(".")).length,
                i = e,
                o = 0; o < s; o++)
                    i = i[r[o]];
                n.length && (n = n.join(":"),
                r = /\.([0-9])/,
                o = I.lang,
                s = void 0,
                /f$/.test(n) ? (s = (s = n.match(r)) ? s[1] : -1,
                null !== i && (i = V.numberFormat(i, s, o.decimalPoint, -1 < n.indexOf(",") ? o.thousandsSep : ""))) : i = R(n, i))
            }
            c.push(i),
            t = t.slice(a + 1),
            a = (h = !h) ? "}" : "{"
        }
        return c.push(t),
        c.join("")
    }
    function w(t, e) {
        var i, n, r = t.length;
        for (n = 0; n < r; n++)
            t[n].safeI = n;
        for (t.sort((function(t, n) {
            return 0 === (i = e(t, n)) ? t.safeI - n.safeI : i
        }
        )),
        n = 0; n < r; n++)
            delete t[n].safeI
    }
    function k(t) {
        for (var e = t.length, i = t[0]; e--; )
            t[e] < i && (i = t[e]);
        return i
    }
    function C(t) {
        for (var e = t.length, i = t[0]; e--; )
            t[e] > i && (i = t[e]);
        return i
    }
    function A(t, e) {
        for (var i in t)
            t[i] && t[i] !== e && t[i].destroy && t[i].destroy(),
            delete t[i]
    }
    function T(t) {
        O || (O = y("div")),
        t && O.appendChild(t),
        O.innerHTML = ""
    }
    function S(t, e) {
        return parseFloat(t.toPrecision(e || 14))
    }
    function P() {
        var e = I.global
          , i = e.useUTC
          , n = i ? "getUTC" : "get"
          , r = i ? "setUTC" : "set";
        D = e.Date || t.Date,
        z = i && e.timezoneOffset,
        H = i && e.getTimezoneOffset,
        j = n + "Minutes",
        W = n + "Hours",
        X = n + "Day",
        _ = n + "Date",
        G = n + "Month",
        Y = n + "FullYear",
        U = r + "Month",
        q = r + "FullYear"
    }
    function E(t) {
        if (!(this instanceof E))
            return new E(t);
        this.init(t)
    }
    function B() {}
    function L(t, e, i, n) {
        this.axis = t,
        this.pos = e,
        this.type = i || "",
        this.isNew = !0,
        i || n || this.addLabel()
    }
    var M, F, O, I, R, N, D, z, H, j, W, X, _, G, Y, U, q, V, $ = t.document, Z = Math, K = Z.round, J = Z.floor, Q = Z.ceil, tt = Z.max, et = Z.min, it = Z.abs, nt = Z.cos, rt = Z.sin, ot = Z.PI, st = 2 * ot / 360, at = t.navigator && t.navigator.userAgent || "", ht = t.opera, ct = /(msie|trident|edge)/i.test(at) && !ht, lt = !ct && /AppleWebKit/.test(at), ut = /Firefox/.test(at), pt = /(Mobile|Android|Windows Phone)/.test(at), dt = $ && $.createElementNS && !!$.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, ft = ut && 4 > parseInt(at.split("Firefox/")[1], 10), gt = $ && !dt && !ct && !!$.createElement("canvas").getContext, mt = {}, yt = 0, vt = [], xt = 0, bt = /^[0-9]+$/, wt = ["plotTop", "marginRight", "marginBottom", "plotLeft"], kt = {};
    (V = t.Highcharts ? e(16, !0) : {
        win: t
    }).seriesTypes = kt;
    var Ct, At, Tt, St, Pt, Et, Bt, Lt, Mt, Ft, Ot, It = [];
    i.prototype = {
        dSetter: function() {
            var t, e = this.paths[0], i = this.paths[1], n = [], r = this.now, o = e.length;
            if (1 === r)
                n = this.toD;
            else if (o === i.length && 1 > r)
                for (; o--; )
                    t = parseFloat(e[o]),
                    n[o] = isNaN(t) ? e[o] : r * parseFloat(i[o] - t) + t;
            else
                n = i;
            this.elem.attr("d", n)
        },
        update: function() {
            var t = this.elem
              , e = this.prop
              , i = this.now
              , n = this.options.step;
            this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i) : t.style[e] = i + this.unit,
            n && n.call(t, i, this)
        },
        run: function(t, e, i) {
            var n, r = this, o = function(t) {
                return !o.stopped && r.step(t)
            };
            this.startTime = +new D,
            this.start = t,
            this.end = e,
            this.unit = i,
            this.now = this.start,
            this.pos = 0,
            o.elem = this.elem,
            o() && 1 === It.push(o) && (o.timerId = setInterval((function() {
                for (n = 0; n < It.length; n++)
                    It[n]() || It.splice(n--, 1);
                It.length || clearInterval(o.timerId)
            }
            ), 13))
        },
        step: function(t) {
            var e, i = +new D, n = this.options;
            e = this.elem;
            var r, o = n.complete, s = n.duration, a = n.curAnim;
            if (e.attr && !e.element)
                e = !1;
            else if (t || i >= s + this.startTime) {
                for (r in this.now = this.end,
                this.pos = 1,
                this.update(),
                t = a[this.prop] = !0,
                a)
                    !0 !== a[r] && (t = !1);
                t && o && o.call(e),
                e = !1
            } else
                this.pos = n.easing((i - this.startTime) / s),
                this.now = this.start + (this.end - this.start) * this.pos,
                this.update(),
                e = !0;
            return e
        },
        initPath: function(t, e, i) {
            e = e || "";
            var n, r = t.shift, o = -1 < e.indexOf("C"), s = o ? 7 : 3;
            e = e.split(" "),
            i = [].concat(i);
            var a = t.isArea
              , h = a ? 2 : 1
              , c = function(t) {
                for (n = t.length; n--; )
                    "M" !== t[n] && "L" !== t[n] || t.splice(n + 1, 0, t[n + 1], t[n + 2], t[n + 1], t[n + 2])
            };
            if (o && (c(e),
            c(i)),
            r <= i.length / s && e.length === i.length)
                for (; r--; )
                    i = i.slice(0, s).concat(i),
                    a && (i = i.concat(i.slice(i.length - s)));
            if (t.shift = 0,
            e.length)
                for (t = i.length; e.length < t; )
                    r = e.slice().splice(e.length / h - s, s * h),
                    o && (r[s - 6] = r[s - 2],
                    r[s - 5] = r[s - 1]),
                    [].splice.apply(e, [e.length / h, 0].concat(r));
            return [e, i]
        }
    };
    var Rt = V.extend = function(t, e) {
        var i;
        for (i in t || (t = {}),
        e)
            t[i] = e[i];
        return t
    }
      , Nt = V.pick = function() {
        var t, e, i = arguments, n = i.length;
        for (t = 0; t < n; t++)
            if ((e = i[t]) !== M && null !== e)
                return e
    }
      , Dt = V.wrap = function(t, e, i) {
        var n = t[e];
        t[e] = function() {
            var t = Array.prototype.slice.call(arguments);
            return t.unshift(n),
            i.apply(this, t)
        }
    }
    ;
    R = function(t, e, i) {
        if (!p(e) || isNaN(e))
            return I.lang.invalidDate || "";
        t = Nt(t, "%Y-%m-%d %H:%M:%S");
        var n, r = (u = new D(e - 6e4 * (H && H(e) || z || 0)))[W](), o = u[X](), s = u[_](), a = u[G](), h = u[Y](), c = I.lang, l = c.weekdays, u = Rt({
            a: l[o].substr(0, 3),
            A: l[o],
            d: x(s),
            e: s,
            w: o,
            b: c.shortMonths[a],
            B: c.months[a],
            m: x(a + 1),
            y: h.toString().substr(2, 2),
            Y: h,
            H: x(r),
            k: r,
            I: x(r % 12 || 12),
            l: r % 12 || 12,
            M: x(u[j]()),
            p: 12 > r ? "AM" : "PM",
            P: 12 > r ? "am" : "pm",
            S: x(u.getSeconds()),
            L: x(K(e % 1e3), 3)
        }, V.dateFormats);
        for (n in u)
            for (; -1 !== t.indexOf("%" + n); )
                t = t.replace("%" + n, "function" == typeof u[n] ? u[n](e) : u[n]);
        return i ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
    }
    ,
    N = {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5
    },
    V.numberFormat = function(t, e, i, n) {
        t = +t || 0;
        var o, s, a = I.lang, h = (t.toString().split(".")[1] || "").length, c = Math.abs(t);
        return -1 === e ? e = Math.min(h, 20) : isNaN(e) && (e = 2),
        s = 3 < (o = String(r(c.toFixed(e)))).length ? o.length % 3 : 0,
        i = Nt(i, a.decimalPoint),
        n = Nt(n, a.thousandsSep),
        t = (0 > t ? "-" : "") + (s ? o.substr(0, s) + n : ""),
        t += o.substr(s).replace(/(\d{3})(?=\d)/g, "$1" + n),
        +e && (t += i + (n = Math.abs(c - o + Math.pow(10, -Math.max(e, h) - 1))).toFixed(e).slice(2)),
        t
    }
    ,
    Math.easeInOutSine = function(t) {
        return -.5 * (Math.cos(Math.PI * t) - 1)
    }
    ,
    Ct = function(e, i) {
        var n;
        return "width" === i ? Math.min(e.offsetWidth, e.scrollWidth) - Ct(e, "padding-left") - Ct(e, "padding-right") : "height" === i ? Math.min(e.offsetHeight, e.scrollHeight) - Ct(e, "padding-top") - Ct(e, "padding-bottom") : (n = t.getComputedStyle(e, void 0)) && r(n.getPropertyValue(i))
    }
    ,
    At = function(t, e) {
        return e.indexOf ? e.indexOf(t) : [].indexOf.call(e, t)
    }
    ,
    St = function(t, e) {
        return [].filter.call(t, e)
    }
    ,
    Et = function(t, e) {
        for (var i = [], n = 0, r = t.length; n < r; n++)
            i[n] = e.call(t[n], t[n], n, t);
        return i
    }
    ,
    Pt = function(e) {
        var i = $.documentElement;
        return {
            top: (e = e.getBoundingClientRect()).top + (t.pageYOffset || i.scrollTop) - (i.clientTop || 0),
            left: e.left + (t.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
        }
    }
    ,
    Ot = function(t) {
        for (var e = It.length; e--; )
            It[e].elem === t && (It[e].stopped = !0)
    }
    ,
    Tt = function(t, e) {
        return Array.prototype.forEach.call(t, e)
    }
    ,
    Bt = function(e, i, n) {
        function r(i) {
            i.target = i.srcElement || t,
            n.call(e, i)
        }
        var o = e.hcEvents = e.hcEvents || {};
        e.addEventListener ? e.addEventListener(i, n, !1) : e.attachEvent && (e.hcEventsIE || (e.hcEventsIE = {}),
        e.hcEventsIE[n.toString()] = r,
        e.attachEvent("on" + i, r)),
        o[i] || (o[i] = []),
        o[i].push(n)
    }
    ,
    Lt = function(t, e, i) {
        function n(e, i) {
            t.removeEventListener ? t.removeEventListener(e, i, !1) : t.attachEvent && (i = t.hcEventsIE[i.toString()],
            t.detachEvent("on" + e, i))
        }
        function r() {
            var i, r;
            if (t.nodeName)
                for (r in e ? (i = {})[e] = !0 : i = a,
                i)
                    if (a[r])
                        for (i = a[r].length; i--; )
                            n(r, a[r][i])
        }
        var o, s, a = t.hcEvents;
        a && (e ? (o = a[e] || [],
        i ? (-1 < (s = At(i, o)) && (o.splice(s, 1),
        a[e] = o),
        n(e, i)) : (r(),
        a[e] = [])) : (r(),
        t.hcEvents = {}))
    }
    ,
    Mt = function(t, e, i, n) {
        var r, o, s, a, h;
        if (r = t.hcEvents,
        i = i || {},
        $.createEvent && (t.dispatchEvent || t.fireEvent))
            (r = $.createEvent("Events")).initEvent(e, !0, !0),
            r.target = t,
            Rt(r, i),
            t.dispatchEvent ? t.dispatchEvent(r) : t.fireEvent(e, r);
        else if (r)
            for (o = (r = r[e] || []).length,
            a = function() {
                i.defaultPrevented = !0
            }
            ,
            s = 0; s < o; s++) {
                if (h = r[s],
                i.stopped)
                    return;
                i.preventDefault = a,
                i.target = t,
                i.type || (i.type = e),
                !1 === h.call(t, i) && i.preventDefault()
            }
        n && !i.defaultPrevented && n(i)
    }
    ,
    Ft = function(t, e, r) {
        var o, a, c, l, u = "";
        for (l in s(r) || (r = {
            duration: (o = arguments)[2],
            easing: o[3],
            complete: o[4]
        }),
        h(r.duration) || (r.duration = 400),
        r.easing = Math[r.easing] || Math.easeInOutSine,
        r.curAnim = n(e),
        e)
            c = new i(t,r,l),
            a = null,
            "d" === l ? (c.paths = c.initPath(t, t.d, e.d),
            c.toD = e.d,
            o = 0,
            a = 1) : t.attr ? o = t.attr(l) : (o = parseFloat(Ct(t, l)) || 0,
            "opacity" !== l && (u = "px")),
            a || (a = e[l]),
            a.match && a.match("px") && (a = a.replace(/px/g, "")),
            c.run(o, a, u)
    }
    ,
    t.jQuery && (t.jQuery.fn.highcharts = function() {
        var t = [].slice.call(arguments);
        if (this[0])
            return t[0] ? (new (V[o(t[0]) ? t.shift() : "Chart"])(this[0],t[0],t[1]),
            this) : vt[d(this[0], "data-highcharts-chart")]
    }
    ),
    $ && !$.defaultView && (Ct = function(t, e) {
        var i;
        return i = {
            width: "clientWidth",
            height: "clientHeight"
        }[e],
        t.style[e] ? r(t.style[e]) : ("opacity" === e && (e = "filter"),
        i ? (t.style.zoom = 1,
        t[i] - 2 * Ct(t, "padding")) : (i = t.currentStyle[e.replace(/\-(\w)/g, (function(t, e) {
            return e.toUpperCase()
        }
        ))],
        "filter" === e && (i = i.replace(/alpha\(opacity=([0-9]+)\)/, (function(t, e) {
            return e / 100
        }
        ))),
        "" === i ? 1 : r(i)))
    }
    ),
    Array.prototype.forEach || (Tt = function(t, e) {
        for (var i = 0, n = t.length; i < n; i++)
            if (!1 === e.call(t[i], t[i], i, t))
                return i
    }
    ),
    Array.prototype.indexOf || (At = function(t, e) {
        var i, n = 0;
        if (e)
            for (i = e.length; n < i; n++)
                if (e[n] === t)
                    return n;
        return -1
    }
    ),
    Array.prototype.filter || (St = function(t, e) {
        for (var i = [], n = 0, r = t.length; n < r; n++)
            e(t[n], n) && i.push(t[n]);
        return i
    }
    ),
    V.Fx = i,
    V.inArray = At,
    V.each = Tt,
    V.grep = St,
    V.offset = Pt,
    V.map = Et,
    V.addEvent = Bt,
    V.removeEvent = Lt,
    V.fireEvent = Mt,
    V.animate = Ft,
    V.stop = Ot;
    var zt = (I = {
        colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " "
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com@product.cdnpath@//Highstock 4.2.3/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@//Highstock 4.2.3/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#333333",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidthPlus: 1,
                            radiusPlus: 2
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    align: "center",
                    formatter: function() {
                        return null === this.y ? "" : V.numberFormat(this.y, -1)
                    },
                    style: {
                        color: "contrast",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textShadow: "0 0 6px contrast, 0 0 3px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#333333",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "45%"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: .5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: dt,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            footerFormat: "",
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: pt ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                pointerEvents: "none",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    }).plotOptions;
    P(),
    E.prototype = {
        parsers: [{
            regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function(t) {
                return [r(t[1]), r(t[2]), r(t[3]), parseFloat(t[4], 10)]
            }
        }, {
            regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            parse: function(t) {
                return [r(t[1], 16), r(t[2], 16), r(t[3], 16), 1]
            }
        }, {
            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function(t) {
                return [r(t[1]), r(t[2]), r(t[3]), 1]
            }
        }],
        init: function(t) {
            var e, i, n, r;
            if ((this.input = t) && t.stops)
                this.stops = Et(t.stops, (function(t) {
                    return new E(t[1])
                }
                ));
            else
                for (n = this.parsers.length; n-- && !i; )
                    (e = (r = this.parsers[n]).regex.exec(t)) && (i = r.parse(e));
            this.rgba = i || []
        },
        get: function(t) {
            var e, i = this.input, r = this.rgba;
            return this.stops ? ((e = n(i)).stops = [].concat(e.stops),
            Tt(this.stops, (function(i, n) {
                e.stops[n] = [e.stops[n][0], i.get(t)]
            }
            ))) : e = r && !isNaN(r[0]) ? "rgb" === t || !t && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === t ? r[3] : "rgba(" + r.join(",") + ")" : i,
            e
        },
        brighten: function(t) {
            var e, i = this.rgba;
            if (this.stops)
                Tt(this.stops, (function(e) {
                    e.brighten(t)
                }
                ));
            else if (h(t) && 0 !== t)
                for (e = 0; 3 > e; e++)
                    i[e] += r(255 * t),
                    0 > i[e] && (i[e] = 0),
                    255 < i[e] && (i[e] = 255);
            return this
        },
        setOpacity: function(t) {
            return this.rgba[3] = t,
            this
        }
    },
    B.prototype = {
        opacity: 1,
        textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
        init: function(t, e) {
            this.element = "span" === e ? y(e) : $.createElementNS("http://www.w3.org/2000/svg", e),
            this.renderer = t
        },
        animate: function(t, e, i) {
            return e = Nt(e, this.renderer.globalAnimation, !0),
            Ot(this),
            e ? (e = n(e, {}),
            i && (e.complete = i),
            Ft(this, t, e)) : this.attr(t, null, i),
            this
        },
        colorGradient: function(t, e, i) {
            var r, o, s, h, c, l, u, d, f, g, m, y, v = this.renderer, x = [];
            if (t.linearGradient ? o = "linearGradient" : t.radialGradient && (o = "radialGradient"),
            o) {
                for (m in s = t[o],
                c = v.gradients,
                u = t.stops,
                g = i.radialReference,
                a(s) && (t[o] = s = {
                    x1: s[0],
                    y1: s[1],
                    x2: s[2],
                    y2: s[3],
                    gradientUnits: "userSpaceOnUse"
                }),
                "radialGradient" === o && g && !p(s.gradientUnits) && (h = s,
                s = n(s, v.getRadialAttr(g, h), {
                    gradientUnits: "userSpaceOnUse"
                })),
                s)
                    "id" !== m && x.push(m, s[m]);
                for (m in u)
                    x.push(u[m]);
                c[x = x.join(",")] ? g = c[x].attr("id") : (s.id = g = "highcharts-" + yt++,
                c[x] = l = v.createElement(o).attr(s).add(v.defs),
                l.radAttr = h,
                l.stops = [],
                Tt(u, (function(t) {
                    0 === t[1].indexOf("rgba") ? (r = E(t[1]),
                    d = r.get("rgb"),
                    f = r.get("a")) : (d = t[1],
                    f = 1),
                    t = v.createElement("stop").attr({
                        offset: t[0],
                        "stop-color": d,
                        "stop-opacity": f
                    }).add(l),
                    l.stops.push(t)
                }
                ))),
                y = "url(" + v.url + "#" + g + ")",
                i.setAttribute(e, y),
                i.gradient = x,
                t.toString = function() {
                    return y
                }
            }
        },
        applyTextShadow: function(t) {
            var e, i = this.element, n = -1 !== t.indexOf("contrast"), o = {}, s = this.renderer.forExport, a = s || i.style.textShadow !== M && !ct;
            n && (o.textShadow = t = t.replace(/contrast/g, this.renderer.getContrast(i.style.fill))),
            (lt || s) && (o.textRendering = "geometricPrecision"),
            a ? this.css(o) : (this.fakeTS = !0,
            this.ySetter = this.xSetter,
            e = [].slice.call(i.getElementsByTagName("tspan")),
            Tt(t.split(/\s?,\s?/g), (function(t) {
                var n, o, s = i.firstChild;
                t = t.split(" "),
                n = t[t.length - 1],
                (o = t[t.length - 2]) && Tt(e, (function(t, e) {
                    var a;
                    0 === e && (t.setAttribute("x", i.getAttribute("x")),
                    e = i.getAttribute("y"),
                    t.setAttribute("y", e || 0),
                    null === e && i.setAttribute("y", 0)),
                    d(a = t.cloneNode(1), {
                        class: "highcharts-text-shadow",
                        fill: n,
                        stroke: n,
                        "stroke-opacity": 1 / tt(r(o), 3),
                        "stroke-width": o,
                        "stroke-linejoin": "round"
                    }),
                    i.insertBefore(a, s)
                }
                ))
            }
            )))
        },
        attr: function(t, e, i) {
            var n, r, o, s = this.element, a = this;
            if ("string" == typeof t && e !== M && (n = t,
            (t = {})[n] = e),
            "string" == typeof t)
                a = (this[t + "Getter"] || this._defaultGetter).call(this, t, s);
            else {
                for (n in t)
                    e = t[n],
                    o = !1,
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(n) && (r || (this.symbolAttr(t),
                    r = !0),
                    o = !0),
                    !this.rotation || "x" !== n && "y" !== n || (this.doTransform = !0),
                    o || ((o = this[n + "Setter"] || this._defaultSetter).call(this, e, n, s),
                    this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(n) && this.updateShadows(n, e, o));
                this.doTransform && (this.updateTransform(),
                this.doTransform = !1)
            }
            return i && i(),
            a
        },
        updateShadows: function(t, e, i) {
            for (var n = this.shadows, r = n.length; r--; )
                i.call(null, "height" === t ? Math.max(e - (n[r].cutHeight || 0), 0) : "d" === t ? this.d : e, t, n[r])
        },
        addClass: function(t) {
            var e = this.element
              , i = d(e, "class") || "";
            return -1 === i.indexOf(t) && d(e, "class", i + " " + t),
            this
        },
        symbolAttr: function(t) {
            var e = this;
            Tt("x y r start end width height innerR anchorX anchorY".split(" "), (function(i) {
                e[i] = Nt(t[i], e[i])
            }
            )),
            e.attr({
                d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
            })
        },
        clip: function(t) {
            return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : "none")
        },
        crisp: function(t) {
            var e, i, n = {}, r = this.strokeWidth || 0;
            for (e in i = K(r) % 2 / 2,
            t.x = J(t.x || this.x || 0) + i,
            t.y = J(t.y || this.y || 0) + i,
            t.width = J((t.width || this.width || 0) - 2 * i),
            t.height = J((t.height || this.height || 0) - 2 * i),
            t.strokeWidth = r,
            t)
                this[e] !== t[e] && (this[e] = n[e] = t[e]);
            return n
        },
        css: function(t) {
            var e, i, n = this.styles, o = {}, s = this.element, a = "";
            if (e = !n,
            t && t.color && (t.fill = t.color),
            n)
                for (i in t)
                    t[i] !== n[i] && (o[i] = t[i],
                    e = !0);
            if (e) {
                if (e = this.textWidth = t && t.width && "text" === s.nodeName.toLowerCase() && r(t.width) || this.textWidth,
                n && (t = Rt(n, o)),
                this.styles = t,
                e && (gt || !dt && this.renderer.forExport) && delete t.width,
                ct && !dt)
                    m(this.element, t);
                else {
                    for (i in n = function(t, e) {
                        return "-" + e.toLowerCase()
                    }
                    ,
                    t)
                        a += i.replace(/([A-Z])/g, n) + ":" + t[i] + ";";
                    d(s, "style", a)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function(t, e) {
            var i = this
              , n = i.element;
            return F && "click" === t ? (n.ontouchstart = function(t) {
                i.touchEventFired = D.now(),
                t.preventDefault(),
                e.call(n, t)
            }
            ,
            n.onclick = function(t) {
                (-1 === at.indexOf("Android") || 1100 < D.now() - (i.touchEventFired || 0)) && e.call(n, t)
            }
            ) : n["on" + t] = e,
            this
        },
        setRadialReference: function(t) {
            var e = this.renderer.gradients[this.element.gradient];
            return this.element.radialReference = t,
            e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)),
            this
        },
        translate: function(t, e) {
            return this.attr({
                translateX: t,
                translateY: e
            })
        },
        invert: function() {
            return this.inverted = !0,
            this.updateTransform(),
            this
        },
        updateTransform: function() {
            var t = this.translateX || 0
              , e = this.translateY || 0
              , i = this.scaleX
              , n = this.scaleY
              , r = this.inverted
              , o = this.rotation
              , s = this.element;
            r && (t += this.attr("width"),
            e += this.attr("height")),
            t = ["translate(" + t + "," + e + ")"],
            r ? t.push("rotate(90) scale(-1,1)") : o && t.push("rotate(" + o + " " + (s.getAttribute("x") || 0) + " " + (s.getAttribute("y") || 0) + ")"),
            (p(i) || p(n)) && t.push("scale(" + Nt(i, 1) + " " + Nt(n, 1) + ")"),
            t.length && s.setAttribute("transform", t.join(" "))
        },
        toFront: function() {
            var t = this.element;
            return t.parentNode.appendChild(t),
            this
        },
        align: function(t, e, i) {
            var n, r, s, a, h = {};
            return s = (r = this.renderer).alignedObjects,
            t ? (this.alignOptions = t,
            this.alignByTranslate = e,
            (!i || o(i)) && (this.alignTo = n = i || "renderer",
            u(s, this),
            s.push(this),
            i = null)) : (t = this.alignOptions,
            e = this.alignByTranslate,
            n = this.alignTo),
            i = Nt(i, r[n], r),
            n = t.align,
            r = t.verticalAlign,
            s = (i.x || 0) + (t.x || 0),
            a = (i.y || 0) + (t.y || 0),
            "right" !== n && "center" !== n || (s += (i.width - (t.width || 0)) / {
                right: 1,
                center: 2
            }[n]),
            h[e ? "translateX" : "x"] = K(s),
            "bottom" !== r && "middle" !== r || (a += (i.height - (t.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[r] || 1)),
            h[e ? "translateY" : "y"] = K(a),
            this[this.placed ? "animate" : "attr"](h),
            this.placed = !0,
            this.alignAttr = h,
            this
        },
        getBBox: function(t, e) {
            var i, n, r, o, s = this.renderer, a = this.element, h = this.styles;
            n = this.textStr;
            var c, l, u, p = a.style, d = s.cache, f = s.cacheKeys;
            if (o = (r = Nt(e, this.rotation)) * st,
            n !== M && (u = ["", r || 0, h && h.fontSize, a.style.width].join(),
            u = "" === n || bt.test(n) ? "num:" + n.toString().length + u : n + u),
            u && !t && (i = d[u]),
            !i) {
                if ("http://www.w3.org/2000/svg" === a.namespaceURI || s.forExport) {
                    try {
                        l = this.fakeTS && function(t) {
                            Tt(a.querySelectorAll(".highcharts-text-shadow"), (function(e) {
                                e.style.display = t
                            }
                            ))
                        }
                        ,
                        ut && p.textShadow ? (c = p.textShadow,
                        p.textShadow = "") : l && l("none"),
                        i = a.getBBox ? Rt({}, a.getBBox()) : {
                            width: a.offsetWidth,
                            height: a.offsetHeight
                        },
                        c ? p.textShadow = c : l && l("")
                    } catch (t) {}
                    (!i || 0 > i.width) && (i = {
                        width: 0,
                        height: 0
                    })
                } else
                    i = this.htmlGetBBox();
                if (s.isSVG && (s = i.width,
                n = i.height,
                ct && h && "11px" === h.fontSize && "16.9" === n.toPrecision(3) && (i.height = n = 14),
                r && (i.width = it(n * rt(o)) + it(s * nt(o)),
                i.height = it(n * nt(o)) + it(s * rt(o)))),
                u) {
                    for (; 250 < f.length; )
                        delete d[f.shift()];
                    d[u] || f.push(u),
                    d[u] = i
                }
            }
            return i
        },
        show: function(t) {
            return this.attr({
                visibility: t ? "inherit" : "visible"
            })
        },
        hide: function() {
            return this.attr({
                visibility: "hidden"
            })
        },
        fadeOut: function(t) {
            var e = this;
            e.animate({
                opacity: 0
            }, {
                duration: t || 150,
                complete: function() {
                    e.attr({
                        y: -9999
                    })
                }
            })
        },
        add: function(t) {
            var e, i = this.renderer, n = this.element;
            return t && (this.parentGroup = t),
            this.parentInverted = t && t.inverted,
            void 0 !== this.textStr && i.buildText(this),
            this.added = !0,
            (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()),
            e || (t ? t.element : i.box).appendChild(n),
            this.onAdd && this.onAdd(),
            this
        },
        safeRemoveChild: function(t) {
            var e = t.parentNode;
            e && e.removeChild(t)
        },
        destroy: function() {
            var t, e, i = this, n = i.element || {}, r = i.shadows, o = i.renderer.isSVG && "SPAN" === n.nodeName && i.parentGroup;
            if (n.onclick = n.onmouseout = n.onmouseover = n.onmousemove = n.point = null,
            Ot(i),
            i.clipPath && (i.clipPath = i.clipPath.destroy()),
            i.stops) {
                for (e = 0; e < i.stops.length; e++)
                    i.stops[e] = i.stops[e].destroy();
                i.stops = null
            }
            for (i.safeRemoveChild(n),
            r && Tt(r, (function(t) {
                i.safeRemoveChild(t)
            }
            )); o && o.div && 0 === o.div.childNodes.length; )
                n = o.parentGroup,
                i.safeRemoveChild(o.div),
                delete o.div,
                o = n;
            for (t in i.alignTo && u(i.renderer.alignedObjects, i),
            i)
                delete i[t];
            return null
        },
        shadow: function(t, e, i) {
            var n, r, o, s, a, h, c = [], l = this.element;
            if (t) {
                for (s = Nt(t.width, 3),
                a = (t.opacity || .15) / s,
                h = this.parentInverted ? "(-1,-1)" : "(" + Nt(t.offsetX, 1) + ", " + Nt(t.offsetY, 1) + ")",
                n = 1; n <= s; n++)
                    o = 2 * s + 1 - 2 * n,
                    d(r = l.cloneNode(0), {
                        isShadow: "true",
                        stroke: t.color || "black",
                        "stroke-opacity": a * n,
                        "stroke-width": o,
                        transform: "translate" + h,
                        fill: "none"
                    }),
                    i && (d(r, "height", tt(d(r, "height") - o, 0)),
                    r.cutHeight = o),
                    e ? e.element.appendChild(r) : l.parentNode.insertBefore(r, l),
                    c.push(r);
                this.shadows = c
            }
            return this
        },
        xGetter: function(t) {
            return "circle" === this.element.nodeName && (t = {
                x: "cx",
                y: "cy"
            }[t] || t),
            this._defaultGetter(t)
        },
        _defaultGetter: function(t) {
            return t = Nt(this[t], this.element ? this.element.getAttribute(t) : null, 0),
            /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)),
            t
        },
        dSetter: function(t, e, i) {
            t && t.join && (t = t.join(" ")),
            /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"),
            i.setAttribute(e, t),
            this[e] = t
        },
        dashstyleSetter: function(t) {
            var e;
            if (t = t && t.toLowerCase()) {
                for (e = (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",")).length; e--; )
                    t[e] = r(t[e]) * this["stroke-width"];
                t = t.join(",").replace("NaN", "none"),
                this.element.setAttribute("stroke-dasharray", t)
            }
        },
        alignSetter: function(t) {
            this.element.setAttribute("text-anchor", {
                left: "start",
                center: "middle",
                right: "end"
            }[t])
        },
        opacitySetter: function(t, e, i) {
            this[e] = t,
            i.setAttribute(e, t)
        },
        titleSetter: function(t) {
            var e = this.element.getElementsByTagName("title")[0];
            e || (e = $.createElementNS("http://www.w3.org/2000/svg", "title"),
            this.element.appendChild(e)),
            e.appendChild($.createTextNode(String(Nt(t), "").replace(/<[^>]*>/g, "")))
        },
        textSetter: function(t) {
            t !== this.textStr && (delete this.bBox,
            this.textStr = t,
            this.added && this.renderer.buildText(this))
        },
        fillSetter: function(t, e, i) {
            "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
        },
        visibilitySetter: function(t, e, i) {
            "inherit" === t ? i.removeAttribute(e) : i.setAttribute(e, t)
        },
        zIndexSetter: function(t, e) {
            var i, n, o, s, a = this.renderer, h = this.parentGroup, c = (a = (h || a).element || a.box,
            this.element);
            if (i = this.added,
            p(t) && (c.setAttribute(e, t),
            t = +t,
            this[e] === t && (i = !1),
            this[e] = t),
            i) {
                for ((t = this.zIndex) && h && (h.handleZ = !0),
                h = a.childNodes,
                s = 0; s < h.length && !o; s++)
                    n = d(i = h[s], "zIndex"),
                    i !== c && (r(n) > t || !p(t) && p(n)) && (a.insertBefore(c, i),
                    o = !0);
                o || a.appendChild(c)
            }
            return o
        },
        _defaultSetter: function(t, e, i) {
            i.setAttribute(e, t)
        }
    },
    B.prototype.yGetter = B.prototype.xGetter,
    B.prototype.translateXSetter = B.prototype.translateYSetter = B.prototype.rotationSetter = B.prototype.verticalAlignSetter = B.prototype.scaleXSetter = B.prototype.scaleYSetter = function(t, e) {
        this[e] = t,
        this.doTransform = !0
    }
    ,
    B.prototype["stroke-widthSetter"] = B.prototype.strokeSetter = function(t, e, i) {
        this[e] = t,
        this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"],
        B.prototype.fillSetter.call(this, this.stroke, "stroke", i),
        i.setAttribute("stroke-width", this["stroke-width"]),
        this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke && (i.removeAttribute("stroke"),
        this.hasStroke = !1)
    }
    ;
    var Ht = function() {
        this.init.apply(this, arguments)
    };
    Ht.prototype = {
        Element: B,
        init: function(e, i, n, r, o, s) {
            var a, h;
            a = (r = this.createElement("svg").attr({
                version: "1.1"
            }).css(this.getStyle(r))).element,
            e.appendChild(a),
            -1 === e.innerHTML.indexOf("xmlns") && d(a, "xmlns", "http://www.w3.org/2000/svg"),
            this.isSVG = !0,
            this.box = a,
            this.boxWrapper = r,
            this.alignedObjects = [],
            this.url = (ut || lt) && $.getElementsByTagName("base").length ? t.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "",
            this.createElement("desc").add().element.appendChild($.createTextNode("Created with Highcharts 4.2.3 /Highstock 4.2.3")),
            this.defs = this.createElement("defs").add(),
            this.allowHTML = s,
            this.forExport = o,
            this.gradients = {},
            this.cache = {},
            this.cacheKeys = [],
            this.imgCount = 0,
            this.setSize(i, n, !1),
            ut && e.getBoundingClientRect && (this.subPixelFix = i = function() {
                m(e, {
                    left: 0,
                    top: 0
                }),
                h = e.getBoundingClientRect(),
                m(e, {
                    left: Q(h.left) - h.left + "px",
                    top: Q(h.top) - h.top + "px"
                })
            }
            ,
            i(),
            Bt(t, "resize", i))
        },
        getStyle: function(t) {
            return this.style = Rt({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, t)
        },
        isHidden: function() {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function() {
            var e = this.defs;
            return this.box = null,
            this.boxWrapper = this.boxWrapper.destroy(),
            A(this.gradients || {}),
            this.gradients = null,
            e && (this.defs = e.destroy()),
            this.subPixelFix && Lt(t, "resize", this.subPixelFix),
            this.alignedObjects = null
        },
        createElement: function(t) {
            var e = new this.Element;
            return e.init(this, t),
            e
        },
        draw: function() {},
        getRadialAttr: function(t, e) {
            return {
                cx: t[0] - t[2] / 2 + e.cx * t[2],
                cy: t[1] - t[2] / 2 + e.cy * t[2],
                r: e.r * t[2]
            }
        },
        buildText: function(t) {
            for (var e, i, n = t.element, o = this, s = o.forExport, a = Nt(t.textStr, "").toString(), h = -1 !== a.indexOf("<"), c = n.childNodes, l = d(n, "x"), u = t.styles, p = t.textWidth, f = u && u.lineHeight, g = u && u.textShadow, y = u && "ellipsis" === u.textOverflow, v = c.length, x = p && !t.added && this.box, b = function(t) {
                return f ? r(f) : o.fontMetrics(/(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : u && u.fontSize || o.style.fontSize || 12, t).h
            }; v--; )
                n.removeChild(c[v]);
            h || g || y || -1 !== a.indexOf(" ") ? (e = /<.*style="([^"]+)".*>/,
            i = /<.*href="(http[^"]+)".*>/,
            x && x.appendChild(n),
            "" === (a = h ? a.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [a])[a.length - 1] && a.pop(),
            Tt(a, (function(r, a) {
                var h, c = 0;
                r = r.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"),
                h = r.split("|||"),
                Tt(h, (function(r) {
                    if ("" !== r || 1 === h.length) {
                        var f, g = {}, v = $.createElementNS("http://www.w3.org/2000/svg", "tspan");
                        if (e.test(r) && d(v, "style", f = r.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2")),
                        i.test(r) && !s && (d(v, "onclick", 'location.href="' + r.match(i)[1] + '"'),
                        m(v, {
                            cursor: "pointer"
                        })),
                        " " !== (r = (r.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"))) {
                            if (v.appendChild($.createTextNode(r)),
                            c ? g.dx = 0 : a && null !== l && (g.x = l),
                            d(v, g),
                            n.appendChild(v),
                            !c && a && (!dt && s && m(v, {
                                display: "block"
                            }),
                            d(v, "dy", b(v))),
                            p) {
                                g = r.replace(/([^\^])-/g, "$1- ").split(" ");
                                for (var x, w, k, C = 1 < h.length || a || 1 < g.length && "nowrap" !== u.whiteSpace, A = [], T = b(v), S = t.rotation, P = r, E = P.length; (C || y) && (g.length || A.length); )
                                    t.rotation = 0,
                                    k = (x = t.getBBox(!0)).width,
                                    !dt && o.forExport && (k = o.measureSpanWidth(v.firstChild.data, t.styles)),
                                    x = k > p,
                                    void 0 === w && (w = x),
                                    y && w ? (E /= 2,
                                    "" === P || !x && .5 > E ? g = [] : (x && (w = !0),
                                    g = [(P = r.substring(0, P.length + (x ? -1 : 1) * Q(E))) + (3 < p ? "…" : "")],
                                    v.removeChild(v.firstChild))) : x && 1 !== g.length ? (v.removeChild(v.firstChild),
                                    A.unshift(g.pop())) : (g = A,
                                    A = [],
                                    g.length && (d(v = $.createElementNS("http://www.w3.org/2000/svg", "tspan"), {
                                        dy: T,
                                        x: l
                                    }),
                                    f && d(v, "style", f),
                                    n.appendChild(v)),
                                    k > p && (p = k)),
                                    g.length && v.appendChild($.createTextNode(g.join(" ").replace(/- /g, "-")));
                                w && t.attr("title", t.textStr),
                                t.rotation = S
                            }
                            c++
                        }
                    }
                }
                ))
            }
            )),
            x && x.removeChild(n),
            g && t.applyTextShadow && t.applyTextShadow(g)) : n.appendChild($.createTextNode(a.replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
        },
        getContrast: function(t) {
            return 384 < (t = E(t).rgba)[0] + t[1] + t[2] ? "#000000" : "#FFFFFF"
        },
        button: function(t, e, i, r, o, s, a, h, c) {
            var l, u, p, d, f, g, m = this.label(t, e, i, c, null, null, null, null, "button"), y = 0;
            return o = n({
                "stroke-width": 1,
                stroke: "#CCCCCC",
                fill: {
                    linearGradient: t = {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]
                },
                r: 2,
                padding: 5,
                style: {
                    color: "black"
                }
            }, o),
            p = o.style,
            delete o.style,
            s = n(o, {
                stroke: "#68A",
                fill: {
                    linearGradient: t,
                    stops: [[0, "#FFF"], [1, "#ACF"]]
                }
            }, s),
            d = s.style,
            delete s.style,
            a = n(o, {
                stroke: "#68A",
                fill: {
                    linearGradient: t,
                    stops: [[0, "#9BD"], [1, "#CDF"]]
                }
            }, a),
            f = a.style,
            delete a.style,
            h = n(o, {
                style: {
                    color: "#CCC"
                }
            }, h),
            g = h.style,
            delete h.style,
            Bt(m.element, ct ? "mouseover" : "mouseenter", (function() {
                3 !== y && m.attr(s).css(d)
            }
            )),
            Bt(m.element, ct ? "mouseout" : "mouseleave", (function() {
                3 !== y && (l = [o, s, a][y],
                u = [p, d, f][y],
                m.attr(l).css(u))
            }
            )),
            m.setState = function(t) {
                (m.state = y = t) ? 2 === t ? m.attr(a).css(f) : 3 === t && m.attr(h).css(g) : m.attr(o).css(p)
            }
            ,
            m.on("click", (function(t) {
                3 !== y && r.call(m, t)
            }
            )).attr(o).css(Rt({
                cursor: "default"
            }, p))
        },
        crispLine: function(t, e) {
            return t[1] === t[4] && (t[1] = t[4] = K(t[1]) - e % 2 / 2),
            t[2] === t[5] && (t[2] = t[5] = K(t[2]) + e % 2 / 2),
            t
        },
        path: function(t) {
            var e = {
                fill: "none"
            };
            return a(t) ? e.d = t : s(t) && Rt(e, t),
            this.createElement("path").attr(e)
        },
        circle: function(t, e, i) {
            return t = s(t) ? t : {
                x: t,
                y: e,
                r: i
            },
            (e = this.createElement("circle")).xSetter = e.ySetter = function(t, e, i) {
                i.setAttribute("c" + e, t)
            }
            ,
            e.attr(t)
        },
        arc: function(t, e, i, n, r, o) {
            return s(t) && (e = t.y,
            i = t.r,
            n = t.innerR,
            r = t.start,
            o = t.end,
            t = t.x),
            (t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                innerR: n || 0,
                start: r || 0,
                end: o || 0
            })).r = i,
            t
        },
        rect: function(t, e, i, n, r, o) {
            r = s(t) ? t.r : r;
            var a = this.createElement("rect");
            return t = s(t) ? t : t === M ? {} : {
                x: t,
                y: e,
                width: tt(i, 0),
                height: tt(n, 0)
            },
            o !== M && (a.strokeWidth = o,
            t = a.crisp(t)),
            r && (t.r = r),
            a.rSetter = function(t, e, i) {
                d(i, {
                    rx: t,
                    ry: t
                })
            }
            ,
            a.attr(t)
        },
        setSize: function(t, e, i) {
            var n = this.alignedObjects
              , r = n.length;
            for (this.width = t,
            this.height = e,
            this.boxWrapper[Nt(i, !0) ? "animate" : "attr"]({
                width: t,
                height: e
            }); r--; )
                n[r].align()
        },
        g: function(t) {
            var e = this.createElement("g");
            return p(t) ? e.attr({
                class: "highcharts-" + t
            }) : e
        },
        image: function(t, e, i, n, r) {
            var o = {
                preserveAspectRatio: "none"
            };
            return 1 < arguments.length && Rt(o, {
                x: e,
                y: i,
                width: n,
                height: r
            }),
            (o = this.createElement("image").attr(o)).element.setAttributeNS ? o.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", t) : o.element.setAttribute("hc-svg-href", t),
            o
        },
        symbol: function(t, e, i, n, r, o) {
            var s, a, h, c, l = this, u = /^url\((.*?)\)$/;
            return (a = (a = this.symbols[t]) && a(K(e), K(i), n, r, o)) ? (s = this.path(a),
            Rt(s, {
                symbolName: t,
                x: e,
                y: i,
                width: n,
                height: r
            }),
            o && Rt(s, o)) : u.test(t) && (c = function(t, e) {
                t.element && (t.attr({
                    width: e[0],
                    height: e[1]
                }),
                t.alignByTranslate || t.translate(K((n - e[0]) / 2), K((r - e[1]) / 2)))
            }
            ,
            h = t.match(u)[1],
            t = mt[h] || o && o.width && o.height && [o.width, o.height],
            (s = this.image(h).attr({
                x: e,
                y: i
            })).isImg = !0,
            t ? c(s, t) : (s.attr({
                width: 0,
                height: 0
            }),
            y("img", {
                onload: function() {
                    0 === this.width && (m(this, {
                        position: "absolute",
                        top: "-999em"
                    }),
                    $.body.appendChild(this)),
                    c(s, mt[h] = [this.width, this.height]),
                    this.parentNode && this.parentNode.removeChild(this),
                    l.imgCount--,
                    l.imgCount || vt[l.chartIndex].onload()
                },
                src: h
            })),
            this.imgCount++),
            s
        },
        symbols: {
            circle: function(t, e, i, n) {
                var r = .166 * i;
                return ["M", t + i / 2, e, "C", t + i + r, e, t + i + r, e + n, t + i / 2, e + n, "C", t - r, e + n, t - r, e, t + i / 2, e, "Z"]
            },
            square: function(t, e, i, n) {
                return ["M", t, e, "L", t + i, e, t + i, e + n, t, e + n, "Z"]
            },
            triangle: function(t, e, i, n) {
                return ["M", t + i / 2, e, "L", t + i, e + n, t, e + n, "Z"]
            },
            "triangle-down": function(t, e, i, n) {
                return ["M", t, e, "L", t + i, e, t + i / 2, e + n, "Z"]
            },
            diamond: function(t, e, i, n) {
                return ["M", t + i / 2, e, "L", t + i, e + n / 2, t + i / 2, e + n, t, e + n / 2, "Z"]
            },
            arc: function(t, e, i, n, r) {
                var o = r.start;
                i = r.r || i || n;
                var s = r.end - .001;
                n = r.innerR;
                var a = r.open
                  , h = nt(o)
                  , c = rt(o)
                  , l = nt(s);
                s = rt(s);
                return ["M", t + i * h, e + i * c, "A", i, i, 0, r = r.end - o < ot ? 0 : 1, 1, t + i * l, e + i * s, a ? "M" : "L", t + n * l, e + n * s, "A", n, n, 0, r, 0, t + n * h, e + n * c, a ? "" : "Z"]
            },
            callout: function(t, e, i, n, r) {
                var o, s = et(r && r.r || 0, i, n), a = s + 6, h = r && r.anchorX;
                return r = r && r.anchorY,
                o = ["M", t + s, e, "L", t + i - s, e, "C", t + i, e, t + i, e, t + i, e + s, "L", t + i, e + n - s, "C", t + i, e + n, t + i, e + n, t + i - s, e + n, "L", t + s, e + n, "C", t, e + n, t, e + n, t, e + n - s, "L", t, e + s, "C", t, e, t, e, t + s, e],
                h && h > i && r > e + a && r < e + n - a ? o.splice(13, 3, "L", t + i, r - 6, t + i + 6, r, t + i, r + 6, t + i, e + n - s) : h && 0 > h && r > e + a && r < e + n - a ? o.splice(33, 3, "L", t, r + 6, t - 6, r, t, r - 6, t, e + s) : r && r > n && h > t + a && h < t + i - a ? o.splice(23, 3, "L", h + 6, e + n, h, e + n + 6, h - 6, e + n, t + s, e + n) : r && 0 > r && h > t + a && h < t + i - a && o.splice(3, 3, "L", h - 6, e, h, e - 6, h + 6, e, i - s, e),
                o
            }
        },
        clipRect: function(t, e, i, n) {
            var r = "highcharts-" + yt++
              , o = this.createElement("clipPath").attr({
                id: r
            }).add(this.defs);
            return (t = this.rect(t, e, i, n, 0).add(o)).id = r,
            t.clipPath = o,
            t.count = 0,
            t
        },
        text: function(t, e, i, n) {
            var r = gt || !dt && this.forExport
              , o = {};
            return !n || !this.allowHTML && this.forExport ? (o.x = Math.round(e || 0),
            i && (o.y = Math.round(i)),
            (t || 0 === t) && (o.text = t),
            t = this.createElement("text").attr(o),
            r && t.css({
                position: "absolute"
            }),
            n || (t.xSetter = function(t, e, i) {
                var n, r, o = i.getElementsByTagName("tspan"), s = i.getAttribute(e);
                for (r = 0; r < o.length; r++)
                    (n = o[r]).getAttribute(e) === s && n.setAttribute(e, t);
                i.setAttribute(e, t)
            }
            ),
            t) : this.html(t, e, i)
        },
        fontMetrics: function(e, i) {
            var n;
            return !(e = e || this.style.fontSize) && i && t.getComputedStyle && (i = i.element || i,
            e = (n = t.getComputedStyle(i, "")) && n.fontSize),
            {
                h: n = 24 > (e = /px/.test(e) ? r(e) : /em/.test(e) ? 12 * parseFloat(e) : 12) ? e + 3 : K(1.2 * e),
                b: K(.8 * n),
                f: e
            }
        },
        rotCorr: function(t, e, i) {
            var n = t;
            return e && i && (n = tt(n * nt(e * st), 4)),
            {
                x: -t / 3 * rt(e * st),
                y: n
            }
        },
        label: function(t, e, i, r, o, s, a, h, c) {
            var l, u, d, f, g, m, y, v, x, b, w, k = this, C = k.g(c), A = k.text("", 0, 0, a).attr({
                zIndex: 1
            }), T = 0, S = 3, P = 0, E = 0, L = {};
            x = function() {
                var t, e;
                t = A.element.style,
                u = (void 0 === d || void 0 === f || C.styles.textAlign) && p(A.textStr) && A.getBBox(),
                C.width = (d || u.width || 0) + 2 * S + P,
                C.height = (f || u.height || 0) + 2 * S,
                y = S + k.fontMetrics(t && t.fontSize, A).b,
                v && (l || (t = E,
                e = (h ? -y : 0) + E,
                C.box = l = r ? k.symbol(r, t, e, C.width, C.height, L) : k.rect(t, e, C.width, C.height, 0, L["stroke-width"]),
                l.isImg || l.attr("fill", "none"),
                l.add(C)),
                l.isImg || l.attr(Rt({
                    width: K(C.width),
                    height: K(C.height)
                }, L)),
                L = null)
            }
            ,
            b = function() {
                var t, e = (e = C.styles) && e.textAlign, i = P + S;
                t = h ? 0 : y,
                p(d) && u && ("center" === e || "right" === e) && (i += {
                    center: .5,
                    right: 1
                }[e] * (d - u.width)),
                i === A.x && t === A.y || (A.attr("x", i),
                t !== M && A.attr("y", t)),
                A.x = i,
                A.y = t
            }
            ,
            w = function(t, e) {
                l ? l.attr(t, e) : L[t] = e
            }
            ,
            C.onAdd = function() {
                A.add(C),
                C.attr({
                    text: t || 0 === t ? t : "",
                    x: e,
                    y: i
                }),
                l && p(o) && C.attr({
                    anchorX: o,
                    anchorY: s
                })
            }
            ,
            C.widthSetter = function(t) {
                d = t
            }
            ,
            C.heightSetter = function(t) {
                f = t
            }
            ,
            C.paddingSetter = function(t) {
                p(t) && t !== S && (S = C.padding = t,
                b())
            }
            ,
            C.paddingLeftSetter = function(t) {
                p(t) && t !== P && (P = t,
                b())
            }
            ,
            C.alignSetter = function(t) {
                (t = {
                    left: 0,
                    center: .5,
                    right: 1
                }[t]) !== T && (T = t,
                u && C.attr({
                    x: e
                }))
            }
            ,
            C.textSetter = function(t) {
                t !== M && A.textSetter(t),
                x(),
                b()
            }
            ,
            C["stroke-widthSetter"] = function(t, e) {
                t && (v = !0),
                E = t % 2 / 2,
                w(e, t)
            }
            ,
            C.strokeSetter = C.fillSetter = C.rSetter = function(t, e) {
                "fill" === e && t && (v = !0),
                w(e, t)
            }
            ,
            C.anchorXSetter = function(t, e) {
                o = t,
                w(e, K(t) - E - g)
            }
            ,
            C.anchorYSetter = function(t, e) {
                s = t,
                w(e, t - m)
            }
            ,
            C.xSetter = function(t) {
                C.x = t,
                T && (t -= T * ((d || u.width) + 2 * S)),
                g = K(t),
                C.attr("translateX", g)
            }
            ,
            C.ySetter = function(t) {
                m = C.y = K(t),
                C.attr("translateY", m)
            }
            ;
            var F = C.css;
            return Rt(C, {
                css: function(t) {
                    if (t) {
                        var e = {};
                        t = n(t),
                        Tt(C.textProps, (function(i) {
                            t[i] !== M && (e[i] = t[i],
                            delete t[i])
                        }
                        )),
                        A.css(e)
                    }
                    return F.call(C, t)
                },
                getBBox: function() {
                    return {
                        width: u.width + 2 * S,
                        height: u.height + 2 * S,
                        x: u.x - S,
                        y: u.y - S
                    }
                },
                shadow: function(t) {
                    return l && l.shadow(t),
                    C
                },
                destroy: function() {
                    Lt(C.element, "mouseenter"),
                    Lt(C.element, "mouseleave"),
                    A && (A = A.destroy()),
                    l && (l = l.destroy()),
                    B.prototype.destroy.call(C),
                    C = k = x = b = w = null
                }
            })
        }
    },
    L.prototype = {
        addLabel: function() {
            var t, e = this.axis, i = e.options, r = e.chart, o = e.categories, s = e.names, a = this.pos, h = i.labels, c = a === (d = e.tickPositions)[0], u = a === d[d.length - 1], d = (s = o ? Nt(o[a], s[a], a) : a,
            o = this.label,
            d.info);
            e.isDatetimeAxis && d && (t = i.dateTimeLabelFormats[d.higherRanks[a] || d.unitName]),
            this.isFirst = c,
            this.isLast = u,
            i = e.labelFormatter.call({
                axis: e,
                chart: r,
                isFirst: c,
                isLast: u,
                dateTimeLabelFormat: t,
                value: e.isLog ? S(l(s)) : s
            }),
            p(o) ? o && o.attr({
                text: i
            }) : (this.labelLength = (this.label = o = p(i) && h.enabled ? r.renderer.text(i, 0, 0, h.useHTML).css(n(h.style)).add(e.labelGroup) : null) && o.getBBox().width,
            this.rotation = 0)
        },
        getLabelSize: function() {
            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
        },
        handleOverflow: function(t) {
            var e, i = this.axis, n = t.x, r = i.chart.chartWidth, o = i.chart.spacing, s = Nt(i.labelLeft, et(i.pos, o[3])), a = (o = Nt(i.labelRight, tt(i.pos + i.len, r - o[1])),
            this.label), h = this.rotation, c = {
                left: 0,
                center: .5,
                right: 1
            }[i.labelAlign], l = a.getBBox().width, u = i.slotWidth, p = 1, d = {};
            h ? 0 > h && n - c * l < s ? e = K(n / nt(h * st) - s) : 0 < h && n + c * l > o && (e = K((r - n) / nt(h * st))) : (r = n + (1 - c) * l,
            n - c * l < s ? u = t.x + u * (1 - c) - s : r > o && (u = o - t.x + u * c,
            p = -1),
            (u = et(i.slotWidth, u)) < i.slotWidth && "center" === i.labelAlign && (t.x += p * (i.slotWidth - u - c * (i.slotWidth - et(l, u)))),
            (l > u || i.autoRotation && a.styles.width) && (e = u)),
            e && (d.width = e,
            i.options.labels.style.textOverflow || (d.textOverflow = "ellipsis"),
            a.css(d))
        },
        getPosition: function(t, e, i, n) {
            var r = this.axis
              , o = r.chart
              , s = n && o.oldChartHeight || o.chartHeight;
            return {
                x: t ? r.translate(e + i, null, null, n) + r.transB : r.left + r.offset + (r.opposite ? (n && o.oldChartWidth || o.chartWidth) - r.right - r.left : 0),
                y: t ? s - r.bottom + r.offset - (r.opposite ? r.height : 0) : s - r.translate(e + i, null, null, n) - r.transB
            }
        },
        getLabelPosition: function(t, e, i, n, r, o, s, a) {
            var h = this.axis
              , c = h.transA
              , l = h.reversed
              , u = h.staggerLines
              , d = h.tickRotCorr || {
                x: 0,
                y: 0
            }
              , f = r.y;
            return p(f) || (f = 2 === h.side ? d.y + 8 : f = nt(i.rotation * st) * (d.y - i.getBBox(!1, 0).height / 2)),
            t = t + r.x + d.x - (o && n ? o * c * (l ? -1 : 1) : 0),
            e = e + f - (o && !n ? o * c * (l ? 1 : -1) : 0),
            u && (i = s / (a || 1) % u,
            h.opposite && (i = u - i - 1),
            e += h.labelOffset / u * i),
            {
                x: t,
                y: K(e)
            }
        },
        getMarkPath: function(t, e, i, n, r, o) {
            return o.crispLine(["M", t, e, "L", t + (r ? 0 : -i), e + (r ? i : 0)], n)
        },
        render: function(t, e, i) {
            var n = this.axis
              , r = n.options
              , o = n.chart.renderer
              , s = n.horiz
              , a = this.type
              , h = this.label
              , c = this.pos
              , l = r.labels
              , u = this.gridLine
              , p = a ? a + "Tick" : "tick"
              , d = r[(y = a ? a + "Grid" : "grid") + "LineWidth"]
              , f = r[y + "LineColor"]
              , g = r[y + "LineDashStyle"]
              , m = r[p + "Length"]
              , y = Nt(r[p + "Width"], !a && n.isXAxis ? 1 : 0)
              , v = r[p + "Color"]
              , x = r[p + "Position"]
              , b = (p = this.mark,
            l.step)
              , w = !0
              , k = n.tickmarkOffset
              , C = (A = this.getPosition(s, c, k, e)).x
              , A = A.y
              , T = s && C === n.pos + n.len || !s && A === n.pos ? -1 : 1;
            i = Nt(i, 1),
            this.isActive = !0,
            d && (c = n.getPlotLinePath(c + k, d * T, e, !0),
            u === M && (u = {
                stroke: f,
                "stroke-width": d
            },
            g && (u.dashstyle = g),
            a || (u.zIndex = 1),
            e && (u.opacity = 0),
            this.gridLine = u = d ? o.path(c).attr(u).add(n.gridGroup) : null),
            !e && u && c) && u[this.isNew ? "attr" : "animate"]({
                d: c,
                opacity: i
            }),
            y && m && ("inside" === x && (m = -m),
            n.opposite && (m = -m),
            a = this.getMarkPath(C, A, m, y * T, s, o),
            p ? p.animate({
                d: a,
                opacity: i
            }) : this.mark = o.path(a).attr({
                stroke: v,
                "stroke-width": y,
                opacity: i
            }).add(n.axisGroup)),
            h && !isNaN(C) && (h.xy = A = this.getLabelPosition(C, A, h, s, l, k, t, b),
            this.isFirst && !this.isLast && !Nt(r.showFirstLabel, 1) || this.isLast && !this.isFirst && !Nt(r.showLastLabel, 1) ? w = !1 : !s || n.isRadial || l.step || l.rotation || e || 0 === i || this.handleOverflow(A),
            b && t % b && (w = !1),
            w && !isNaN(A.y) ? (A.opacity = i,
            h[this.isNew ? "attr" : "animate"](A),
            this.isNew = !1) : h.attr("y", -9999))
        },
        destroy: function() {
            A(this, this.axis)
        }
    },
    V.PlotLineOrBand = function(t, e) {
        this.axis = t,
        e && (this.options = e,
        this.id = e.id)
    }
    ,
    V.PlotLineOrBand.prototype = {
        render: function() {
            var t, e = this, i = e.axis, r = i.horiz, o = e.options, s = o.label, a = e.label, h = o.width, l = o.to, u = o.from, d = p(u) && p(l), f = o.value, g = o.dashStyle, m = e.svgElem, y = [], v = o.color, x = Nt(o.zIndex, 0), b = o.events, w = {}, k = i.chart.renderer;
            if (i.isLog && (u = c(u),
            l = c(l),
            f = c(f)),
            h)
                y = i.getPlotLinePath(f, h),
                w = {
                    stroke: v,
                    "stroke-width": h
                },
                g && (w.dashstyle = g);
            else {
                if (!d)
                    return;
                y = i.getPlotBandPath(u, l, o),
                v && (w.fill = v),
                o.borderWidth && (w.stroke = o.borderColor,
                w["stroke-width"] = o.borderWidth)
            }
            if (w.zIndex = x,
            m)
                y ? (m.show(),
                m.animate({
                    d: y
                })) : (m.hide(),
                a && (e.label = a = a.destroy()));
            else if (y && y.length && (e.svgElem = m = k.path(y).attr(w).add(),
            b))
                for (t in o = function(t) {
                    m.on(t, (function(i) {
                        b[t].apply(e, [i])
                    }
                    ))
                }
                ,
                b)
                    o(t);
            return s && p(s.text) && y && y.length && 0 < i.width && 0 < i.height && !y.flat ? (s = n({
                align: r && d && "center",
                x: r ? !d && 4 : 10,
                verticalAlign: !r && d && "middle",
                y: r ? d ? 16 : 10 : d ? 6 : -4,
                rotation: r && !d && 90
            }, s),
            this.renderLabel(s, y, d, x)) : a && a.hide(),
            e
        },
        renderLabel: function(t, e, i, n) {
            var r = this.label
              , o = this.axis.chart.renderer;
            r || ((r = {
                align: t.textAlign || t.align,
                rotation: t.rotation
            }).zIndex = n,
            this.label = r = o.text(t.text, 0, 0, t.useHTML).attr(r).css(t.style).add()),
            n = [e[1], e[4], i ? e[6] : e[1]],
            e = [e[2], e[5], i ? e[7] : e[2]],
            i = k(n),
            o = k(e),
            r.align(t, !1, {
                x: i,
                y: o,
                width: C(n) - i,
                height: C(e) - o
            }),
            r.show()
        },
        destroy: function() {
            u(this.axis.plotLinesAndBands, this),
            delete this.axis,
            A(this)
        }
    };
    var jt = V.Axis = function() {
        this.init.apply(this, arguments)
    }
    ;
    jt.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#D8D8D8",
            labels: {
                enabled: !0,
                style: {
                    color: "#606060",
                    cursor: "default",
                    fontSize: "11px"
                },
                x: 0,
                y: 15
            },
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            title: {
                align: "middle",
                style: {
                    color: "#707070"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function() {
                    return V.numberFormat(this.total, -1)
                },
                style: n(zt.line.dataLabels.style, {
                    color: "#000000"
                })
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -15,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 15,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                autoRotation: [-45],
                x: 0,
                y: null
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                autoRotation: [-45],
                x: 0,
                y: -15
            },
            title: {
                rotation: 0
            }
        },
        init: function(t, e) {
            var i = e.isX;
            this.chart = t,
            this.horiz = t.inverted ? !i : i,
            this.coll = (this.isXAxis = i) ? "xAxis" : "yAxis",
            this.opposite = e.opposite,
            this.side = e.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3),
            this.setOptions(e);
            var n = (o = this.options).type;
            this.labelFormatter = o.labels.formatter || this.defaultLabelFormatter,
            this.userOptions = e,
            this.minPixelPadding = 0,
            this.reversed = o.reversed,
            this.visible = !1 !== o.visible,
            this.zoomEnabled = !1 !== o.zoomEnabled,
            this.categories = o.categories || "category" === n,
            this.names = this.names || [],
            this.isLog = "logarithmic" === n,
            this.isDatetimeAxis = "datetime" === n,
            this.isLinked = p(o.linkedTo),
            this.ticks = {},
            this.labelEdge = [],
            this.minorTicks = {},
            this.plotLinesAndBands = [],
            this.alternateBands = {},
            this.len = 0,
            this.minRange = this.userMinRange = o.minRange || o.maxZoom,
            this.range = o.range,
            this.offset = o.offset || 0,
            this.stacks = {},
            this.oldStacks = {},
            this.stacksTouched = 0,
            this.min = this.max = null,
            this.crosshair = Nt(o.crosshair, f(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
            var r, o = this.options.events;
            for (r in -1 === At(this, t.axes) && (i && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this),
            t[this.coll].push(this)),
            this.series = this.series || [],
            t.inverted && i && this.reversed === M && (this.reversed = !0),
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine,
            o)
                Bt(this, r, o[r]);
            this.isLog && (this.val2lin = c,
            this.lin2val = l)
        },
        setOptions: function(t) {
            this.options = n(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], n(I[this.coll], t))
        },
        defaultLabelFormatter: function() {
            var t, e = this.axis, i = this.value, n = e.categories, r = this.dateTimeLabelFormat, o = I.lang.numericSymbols, s = o && o.length, a = e.options.labels.format;
            e = e.isLog ? i : e.tickInterval;
            if (a)
                t = b(a, this);
            else if (n)
                t = i;
            else if (r)
                t = R(r, i);
            else if (s && 1e3 <= e)
                for (; s-- && t === M; )
                    e >= (n = Math.pow(1e3, s + 1)) && 0 == 10 * i % n && null !== o[s] && (t = V.numberFormat(i / n, -1) + o[s]);
            return t === M && (t = 1e4 <= it(i) ? V.numberFormat(i, -1) : V.numberFormat(i, -1, M, "")),
            t
        },
        getSeriesExtremes: function() {
            var t = this
              , e = t.chart;
            t.hasVisibleSeries = !1,
            t.dataMin = t.dataMax = t.threshold = null,
            t.softThreshold = !t.isXAxis,
            t.buildStacks && t.buildStacks(),
            Tt(t.series, (function(i) {
                if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                    var n, r = i.options, o = r.threshold;
                    t.hasVisibleSeries = !0,
                    t.isLog && 0 >= o && (o = null),
                    t.isXAxis ? (r = i.xData).length && (t.dataMin = et(Nt(t.dataMin, r[0]), k(r)),
                    t.dataMax = tt(Nt(t.dataMax, r[0]), C(r))) : (i.getExtremes(),
                    n = i.dataMax,
                    p(i = i.dataMin) && p(n) && (t.dataMin = et(Nt(t.dataMin, i), i),
                    t.dataMax = tt(Nt(t.dataMax, n), n)),
                    p(o) && (t.threshold = o),
                    (!r.softThreshold || t.isLog) && (t.softThreshold = !1))
                }
            }
            ))
        },
        translate: function(t, e, i, n, r, o) {
            var s = this.linkedParent || this
              , a = 1
              , c = 0
              , l = n ? s.oldTransA : s.transA;
            n = n ? s.oldMin : s.min;
            var u = s.minPixelPadding;
            return r = (s.isOrdinal || s.isBroken || s.isLog && r) && s.lin2val,
            l || (l = s.transA),
            i && (a *= -1,
            c = s.len),
            s.reversed && (c -= (a *= -1) * (s.sector || s.len)),
            e ? (t = (t = t * a + c - u) / l + n,
            r && (t = s.lin2val(t))) : (r && (t = s.val2lin(t)),
            "between" === o && (o = .5),
            t = a * (t - n) * l + c + a * u + (h(o) ? l * o * s.pointRange : 0)),
            t
        },
        toPixels: function(t, e) {
            return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
        },
        toValue: function(t, e) {
            return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function(t, e, i, n, r) {
            var o, s, a, h = this.chart, c = this.left, l = this.top, u = i && h.oldChartHeight || h.chartHeight, p = i && h.oldChartWidth || h.chartWidth;
            o = this.transB;
            var d = function(t, e, i) {
                return (t < e || t > i) && (n ? t = et(tt(e, t), i) : a = !0),
                t
            };
            return r = Nt(r, this.translate(t, null, null, i)),
            t = i = K(r + o),
            o = s = K(u - r - o),
            isNaN(r) ? a = !0 : this.horiz ? (o = l,
            s = u - this.bottom,
            t = i = d(t, c, c + this.width)) : (t = c,
            i = p - this.right,
            o = s = d(o, l, l + this.height)),
            a && !n ? null : h.renderer.crispLine(["M", t, o, "L", i, s], e || 1)
        },
        getLinearTickPositions: function(t, e, i) {
            var n, r = S(J(e / t) * t), o = S(Q(i / t) * t), s = [];
            if (e === i && h(e))
                return [e];
            for (e = r; e <= o && (s.push(e),
            (e = S(e + t)) !== n); )
                n = e;
            return s
        },
        getMinorTickPositions: function() {
            var t, e = this.options, i = this.tickPositions, n = this.minorTickInterval, r = [], o = this.pointRangePadding || 0;
            t = this.min - o;
            var s = (o = this.max + o) - t;
            if (s && s / n < this.len / 3)
                if (this.isLog)
                    for (o = i.length,
                    t = 1; t < o; t++)
                        r = r.concat(this.getLogTickPositions(n, i[t - 1], i[t], !0));
                else if (this.isDatetimeAxis && "auto" === e.minorTickInterval)
                    r = r.concat(this.getTimeTicks(this.normalizeTimeTickInterval(n), t, o, e.startOfWeek));
                else
                    for (i = t + (i[0] - t) % n; i <= o; i += n)
                        r.push(i);
            return 0 !== r.length && this.trimTicks(r, e.startOnTick, e.endOnTick),
            r
        },
        adjustForMinRange: function() {
            var t, e, i, n, r, o, s = this.options, a = this.min, h = this.max, c = this.dataMax - this.dataMin >= this.minRange;
            this.isXAxis && this.minRange === M && !this.isLog && (p(s.min) || p(s.max) ? this.minRange = null : (Tt(this.series, (function(t) {
                for (r = t.xData,
                i = t.xIncrement ? 1 : r.length - 1; 0 < i; i--)
                    n = r[i] - r[i - 1],
                    (e === M || n < e) && (e = n)
            }
            )),
            this.minRange = et(5 * e, this.dataMax - this.dataMin))),
            h - a < this.minRange && (t = [a - (t = ((o = this.minRange) - h + a) / 2), Nt(s.min, a - t)],
            c && (t[2] = this.dataMin),
            h = [(a = C(t)) + o, Nt(s.max, a + o)],
            c && (h[2] = this.dataMax),
            (h = k(h)) - a < o && (t[0] = h - o,
            t[1] = Nt(s.min, h - o),
            a = C(t))),
            this.min = a,
            this.max = h
        },
        setAxisTranslation: function(t) {
            var e, i = this, n = i.max - i.min, r = i.axisPointRange || 0, s = 0, a = 0, h = i.linkedParent, c = !!i.categories, l = i.transA, u = i.isXAxis;
            (u || c || r) && (h ? (s = h.minPointOffset,
            a = h.pointRangePadding) : (Tt(i.series, (function(t) {
                var i = t.closestPointRange;
                !t.noSharedTooltip && p(i) && (e = p(e) ? et(e, i) : i)
            }
            )),
            Tt(i.series, (function(t) {
                var n = c ? 1 : u ? Nt(t.options.pointRange, e, 0) : i.axisPointRange || 0;
                t = t.options.pointPlacement,
                r = tt(r, n),
                i.single || (s = tt(s, o(t) ? 0 : n / 2),
                a = tt(a, "on" === t ? 0 : n))
            }
            ))),
            h = i.ordinalSlope && e ? i.ordinalSlope / e : 1,
            i.minPointOffset = s *= h,
            i.pointRangePadding = a *= h,
            i.pointRange = et(r, n),
            u && (i.closestPointRange = e)),
            t && (i.oldTransA = l),
            i.translationSlope = i.transA = l = i.len / (n + a || 1),
            i.transB = i.horiz ? i.left : i.bottom,
            i.minPixelPadding = l * s
        },
        minFromRange: function() {
            return this.max - this.range
        },
        setTickInterval: function(t) {
            var i, n, r, o, s = this, a = s.chart, l = s.options, u = s.isLog, d = s.isDatetimeAxis, f = s.isXAxis, g = s.isLinked, m = l.maxPadding, y = l.minPadding, v = l.tickInterval, x = l.tickPixelInterval, b = s.categories, w = s.threshold, k = s.softThreshold;
            d || b || g || this.getTickAmount(),
            r = Nt(s.userMin, l.min),
            o = Nt(s.userMax, l.max),
            g ? (s.linkedParent = a[s.coll][l.linkedTo],
            a = s.linkedParent.getExtremes(),
            s.min = Nt(a.min, a.dataMin),
            s.max = Nt(a.max, a.dataMax),
            l.type !== s.linkedParent.options.type && e(11, 1)) : (!k && p(w) && (s.dataMin >= w ? (i = w,
            y = 0) : s.dataMax <= w && (n = w,
            m = 0)),
            s.min = Nt(r, i, s.dataMin),
            s.max = Nt(o, n, s.dataMax)),
            u && (!t && 0 >= et(s.min, Nt(s.dataMin, s.min)) && e(10, 1),
            s.min = S(c(s.min), 15),
            s.max = S(c(s.max), 15)),
            s.range && p(s.max) && (s.userMin = s.min = r = tt(s.min, s.minFromRange()),
            s.userMax = o = s.max,
            s.range = null),
            s.beforePadding && s.beforePadding(),
            s.adjustForMinRange(),
            !(b || s.axisPointRange || s.usePercentage || g) && p(s.min) && p(s.max) && (a = s.max - s.min) && (!p(r) && y && (s.min -= a * y),
            !p(o) && m && (s.max += a * m)),
            h(l.floor) && (s.min = tt(s.min, l.floor)),
            h(l.ceiling) && (s.max = et(s.max, l.ceiling)),
            k && p(s.dataMin) && (w = w || 0,
            !p(r) && s.min < w && s.dataMin >= w ? s.min = w : !p(o) && s.max > w && s.dataMax <= w && (s.max = w)),
            s.tickInterval = s.min === s.max || void 0 === s.min || void 0 === s.max ? 1 : g && !v && x === s.linkedParent.options.tickPixelInterval ? v = s.linkedParent.tickInterval : Nt(v, this.tickAmount ? (s.max - s.min) / tt(this.tickAmount - 1, 1) : void 0, b ? 1 : (s.max - s.min) * x / tt(s.len, x)),
            f && !t && Tt(s.series, (function(t) {
                t.processData(s.min !== s.oldMin || s.max !== s.oldMax)
            }
            )),
            s.setAxisTranslation(!0),
            s.beforeSetTickPositions && s.beforeSetTickPositions(),
            s.postProcessTickInterval && (s.tickInterval = s.postProcessTickInterval(s.tickInterval)),
            s.pointRange && !v && (s.tickInterval = tt(s.pointRange, s.tickInterval)),
            t = Nt(l.minTickInterval, s.isDatetimeAxis && s.closestPointRange),
            !v && s.tickInterval < t && (s.tickInterval = t),
            d || u || v || (s.tickInterval = function(t, e, i, n, r) {
                var o, s = t;
                for (o = t / (i = Nt(i, 1)),
                e || (e = [1, 2, 2.5, 5, 10],
                !1 === n && (1 === i ? e = [1, 2, 5, 10] : .1 >= i && (e = [1 / i]))),
                n = 0; n < e.length && (s = e[n],
                !(r && s * i >= t || !r && o <= (e[n] + (e[n + 1] || e[n])) / 2)); n++)
                    ;
                return s * i
            }(s.tickInterval, null, Z.pow(10, J(Z.log(s.tickInterval) / Z.LN10)), Nt(l.allowDecimals, !(.5 < s.tickInterval && 5 > s.tickInterval && 1e3 < s.max && 9999 > s.max)), !!this.tickAmount)),
            !this.tickAmount && this.len && (s.tickInterval = s.unsquish()),
            this.setTickPositions()
        },
        setTickPositions: function() {
            var t, e, i = this.options, n = i.tickPositions, r = i.tickPositioner, o = i.startOnTick, s = i.endOnTick;
            this.tickmarkOffset = this.categories && "between" === i.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0,
            this.minorTickInterval = "auto" === i.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : i.minorTickInterval,
            this.tickPositions = t = n && n.slice(),
            !t && ((t = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, i.units), this.min, this.max, i.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max)).length > this.len && (t = [t[0], t.pop()]),
            this.tickPositions = t,
            r && (r = r.apply(this, [this.min, this.max]))) && (this.tickPositions = t = r),
            this.isLinked || (this.trimTicks(t, o, s),
            this.min === this.max && p(this.min) && !this.tickAmount && (e = !0,
            this.min -= .5,
            this.max += .5),
            this.single = e,
            n || r || this.adjustTickAmount())
        },
        trimTicks: function(t, e, i) {
            var n = t[0]
              , r = t[t.length - 1]
              , o = this.minPointOffset || 0;
            if (e)
                this.min = n;
            else
                for (; this.min - o > t[0]; )
                    t.shift();
            if (i)
                this.max = r;
            else
                for (; this.max + o < t[t.length - 1]; )
                    t.pop();
            0 === t.length && p(n) && t.push((r + n) / 2)
        },
        alignToOthers: function() {
            var t, e = {}, i = this.options;
            return !1 !== this.chart.options.chart.alignTicks && !1 !== i.alignTicks && Tt(this.chart[this.coll], (function(i) {
                var n = i.options;
                n = [i.horiz ? n.left : n.top, n.width, n.height, n.pane].join();
                i.series.length && (e[n] ? t = !0 : e[n] = 1)
            }
            )),
            t
        },
        getTickAmount: function() {
            var t = this.options
              , e = t.tickAmount
              , i = t.tickPixelInterval;
            !p(t.tickInterval) && this.len < i && !this.isRadial && !this.isLog && t.startOnTick && t.endOnTick && (e = 2),
            !e && this.alignToOthers() && (e = Q(this.len / i) + 1),
            4 > e && (this.finalTickAmt = e,
            e = 5),
            this.tickAmount = e
        },
        adjustTickAmount: function() {
            var t = this.tickInterval
              , e = this.tickPositions
              , i = this.tickAmount
              , n = this.finalTickAmt
              , r = e && e.length;
            if (r < i) {
                for (; e.length < i; )
                    e.push(S(e[e.length - 1] + t));
                this.transA *= (r - 1) / (i - 1),
                this.max = e[e.length - 1]
            } else
                r > i && (this.tickInterval *= 2,
                this.setTickPositions());
            if (p(n)) {
                for (t = i = e.length; t--; )
                    (3 === n && 1 == t % 2 || 2 >= n && 0 < t && t < i - 1) && e.splice(t, 1);
                this.finalTickAmt = M
            }
        },
        setScale: function() {
            var t, e;
            this.oldMin = this.min,
            this.oldMax = this.max,
            this.oldAxisLength = this.len,
            this.setAxisSize(),
            e = this.len !== this.oldAxisLength,
            Tt(this.series, (function(e) {
                (e.isDirtyData || e.isDirty || e.xAxis.isDirty) && (t = !0)
            }
            )),
            e || t || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(),
            this.forceRedraw = !1,
            this.getSeriesExtremes(),
            this.setTickInterval(),
            this.oldUserMin = this.userMin,
            this.oldUserMax = this.userMax,
            this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
        },
        setExtremes: function(t, e, i, n, r) {
            var o = this
              , s = o.chart;
            i = Nt(i, !0),
            Tt(o.series, (function(t) {
                delete t.kdTree
            }
            )),
            r = Rt(r, {
                min: t,
                max: e
            }),
            Mt(o, "setExtremes", r, (function() {
                o.userMin = t,
                o.userMax = e,
                o.eventArgs = r,
                i && s.redraw(n)
            }
            ))
        },
        zoom: function(t, e) {
            var i = this.dataMin
              , n = this.dataMax
              , r = this.options
              , o = et(i, Nt(r.min, i));
            r = tt(n, Nt(r.max, n));
            return this.allowZoomOutside || (p(i) && t <= o && (t = o),
            p(n) && e >= r && (e = r)),
            this.displayBtn = t !== M || e !== M,
            this.setExtremes(t, e, !1, M, {
                trigger: "zoom"
            }),
            !0
        },
        setAxisSize: function() {
            var t = this.chart
              , e = (s = this.options).offsetLeft || 0
              , i = this.horiz
              , n = Nt(s.width, t.plotWidth - e + (s.offsetRight || 0))
              , r = Nt(s.height, t.plotHeight)
              , o = Nt(s.top, t.plotTop)
              , s = Nt(s.left, t.plotLeft + e);
            (e = /%$/).test(r) && (r = Math.round(parseFloat(r) / 100 * t.plotHeight)),
            e.test(o) && (o = Math.round(parseFloat(o) / 100 * t.plotHeight + t.plotTop)),
            this.left = s,
            this.top = o,
            this.width = n,
            this.height = r,
            this.bottom = t.chartHeight - r - o,
            this.right = t.chartWidth - n - s,
            this.len = tt(i ? n : r, 0),
            this.pos = i ? s : o
        },
        getExtremes: function() {
            var t = this.isLog;
            return {
                min: t ? S(l(this.min)) : this.min,
                max: t ? S(l(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function(t) {
            var e = (i = this.isLog) ? l(this.min) : this.min
              , i = i ? l(this.max) : this.max;
            return null === t ? t = 0 > i ? i : e : e > t ? t = e : i < t && (t = i),
            this.translate(t, 0, 1, 0, 1)
        },
        autoLabelAlign: function(t) {
            return 15 < (t = (Nt(t, 0) - 90 * this.side + 720) % 360) && 165 > t ? "right" : 195 < t && 345 > t ? "left" : "center"
        },
        unsquish: function() {
            var t, e, i, n = this.ticks, r = this.options.labels, o = this.horiz, s = this.tickInterval, a = s, h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / s), c = r.rotation, l = this.chart.renderer.fontMetrics(r.style.fontSize, n[0] && n[0].label), u = Number.MAX_VALUE, d = function(t) {
                return (t = 1 < (t /= h || 1) ? Q(t) : 1) * s
            };
            return o ? (i = !r.staggerLines && !r.step && (p(c) ? [c] : h < Nt(r.autoRotationLimit, 80) && r.autoRotation)) && Tt(i, (function(i) {
                var n;
                (i === c || i && -90 <= i && 90 >= i) && ((n = (e = d(it(l.h / rt(st * i)))) + it(i / 360)) < u && (u = n,
                t = i,
                a = e))
            }
            )) : r.step || (a = d(l.h)),
            this.autoRotation = i,
            this.labelRotation = Nt(t, c),
            a
        },
        renderUnsquish: function() {
            var t, e, i, r = this.chart, s = r.renderer, a = this.tickPositions, h = this.ticks, c = this.options.labels, l = this.horiz, u = r.margin, p = this.categories ? a.length : a.length - 1, d = (u = this.slotWidth = l && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * r.plotWidth / p || !l && (u[3] && u[3] - r.spacing[3] || .33 * r.chartWidth),
            tt(1, K(u - 2 * (c.padding || 5)))), f = {}, g = (p = s.fontMetrics(c.style.fontSize, h[0] && h[0].label),
            c.style.textOverflow), m = 0;
            if (o(c.rotation) || (f.rotation = c.rotation || 0),
            this.autoRotation)
                Tt(a, (function(t) {
                    (t = h[t]) && t.labelLength > m && (m = t.labelLength)
                }
                )),
                m > d && m > p.h ? f.rotation = this.labelRotation : this.labelRotation = 0;
            else if (u && (t = {
                width: d + "px"
            },
            !g))
                for (t.textOverflow = "clip",
                e = a.length; !l && e--; )
                    i = a[e],
                    (d = h[i].label) && ("ellipsis" === d.styles.textOverflow && d.css({
                        textOverflow: "clip"
                    }),
                    (d.getBBox().height > this.len / a.length - (p.h - p.f) || h[i].labelLength > u) && (d.specCss = {
                        textOverflow: "ellipsis"
                    }));
            f.rotation && (t = {
                width: (m > .5 * r.chartHeight ? .33 * r.chartHeight : r.chartHeight) + "px"
            },
            g || (t.textOverflow = "ellipsis")),
            (this.labelAlign = c.align || this.autoLabelAlign(this.labelRotation)) && (f.align = this.labelAlign),
            Tt(a, (function(e) {
                var i = (e = h[e]) && e.label;
                i && (i.attr(f),
                t && i.css(n(t, i.specCss)),
                delete i.specCss,
                e.rotation = f.rotation)
            }
            )),
            this.tickRotCorr = s.rotCorr(p.b, this.labelRotation || 0, 0 !== this.side)
        },
        hasData: function() {
            return this.hasVisibleSeries || p(this.min) && p(this.max) && !!this.tickPositions
        },
        getOffset: function() {
            var t, e, i, n, r = this, o = (b = r.chart).renderer, s = r.options, a = r.tickPositions, h = r.ticks, c = r.horiz, l = r.side, u = b.inverted ? [1, 0, 3, 2][l] : l, d = 0, f = 0, g = s.title, m = s.labels, y = 0, v = r.opposite, x = b.axisOffset, b = b.clipOffset, w = [-1, 1, 1, -1][l], k = r.axisParent;
            if (t = r.hasData(),
            r.showAxis = e = t || Nt(s.showEmpty, !0),
            r.staggerLines = r.horiz && m.staggerLines,
            r.axisGroup || (r.gridGroup = o.g("grid").attr({
                zIndex: s.gridZIndex || 1
            }).add(k),
            r.axisGroup = o.g("axis").attr({
                zIndex: s.zIndex || 2
            }).add(k),
            r.labelGroup = o.g("axis-labels").attr({
                zIndex: m.zIndex || 7
            }).addClass("highcharts-" + r.coll.toLowerCase() + "-labels").add(k)),
            t || r.isLinked)
                Tt(a, (function(t) {
                    h[t] ? h[t].addLabel() : h[t] = new L(r,t)
                }
                )),
                r.renderUnsquish(),
                !1 === m.reserveSpace || 0 !== l && 2 !== l && {
                    1: "left",
                    3: "right"
                }[l] !== r.labelAlign && "center" !== r.labelAlign || Tt(a, (function(t) {
                    y = tt(h[t].getLabelSize(), y)
                }
                )),
                r.staggerLines && (y *= r.staggerLines,
                r.labelOffset = y * (r.opposite ? -1 : 1));
            else
                for (n in h)
                    h[n].destroy(),
                    delete h[n];
            g && g.text && !1 !== g.enabled && (r.axisTitle || (r.axisTitle = o.text(g.text, 0, 0, g.useHTML).attr({
                zIndex: 7,
                rotation: g.rotation || 0,
                align: g.textAlign || {
                    low: v ? "right" : "left",
                    middle: "center",
                    high: v ? "left" : "right"
                }[g.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(g.style).add(r.axisGroup),
            r.axisTitle.isNew = !0),
            e && (d = r.axisTitle.getBBox()[c ? "height" : "width"],
            f = p(i = g.offset) ? 0 : Nt(g.margin, c ? 5 : 10)),
            r.axisTitle[e ? "show" : "hide"](!0)),
            r.offset = w * Nt(s.offset, x[l]),
            r.tickRotCorr = r.tickRotCorr || {
                x: 0,
                y: 0
            },
            o = 2 === l ? r.tickRotCorr.y : 0,
            c = Math.abs(y) + f + (y && w * (c ? Nt(m.y, r.tickRotCorr.y + 8) : m.x) - o),
            r.axisTitleMargin = Nt(i, c),
            x[l] = tt(x[l], r.axisTitleMargin + d + w * r.offset, c),
            s = s.offset ? 0 : 2 * J(s.lineWidth / 2),
            b[u] = tt(b[u], s)
        },
        getLinePath: function(t) {
            var e = this.chart
              , i = this.opposite
              , n = this.offset
              , r = this.horiz
              , o = this.left + (i ? this.width : 0) + n;
            n = e.chartHeight - this.bottom - (i ? this.height : 0) + n;
            return i && (t *= -1),
            e.renderer.crispLine(["M", r ? this.left : o, r ? n : this.top, "L", r ? e.chartWidth - this.right : o, r ? n : e.chartHeight - this.bottom], t)
        },
        getTitlePosition: function() {
            var t = this.horiz
              , e = this.left
              , i = this.top
              , n = this.len
              , o = this.options.title
              , s = t ? e : i
              , a = this.opposite
              , h = this.offset
              , c = o.x || 0
              , l = o.y || 0
              , u = r(o.style.fontSize || 12);
            n = {
                low: s + (t ? 0 : n),
                middle: s + n / 2,
                high: s + (t ? n : 0)
            }[o.align],
            e = (t ? i + this.height : e) + (t ? 1 : -1) * (a ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? u : 0);
            return {
                x: t ? n + c : e + (a ? this.width : 0) + h + c,
                y: t ? e + l - (a ? this.height : 0) + h : n + l
            }
        },
        render: function() {
            var t, e, i, n = this, r = n.chart, o = r.renderer, s = n.options, a = n.isLog, h = n.isLinked, c = n.tickPositions, u = n.axisTitle, d = n.ticks, f = n.minorTicks, m = n.alternateBands, y = s.stackLabels, v = s.alternateGridColor, x = n.tickmarkOffset, b = s.lineWidth, w = r.hasRendered && p(n.oldMin) && !isNaN(n.oldMin), k = n.showAxis, C = o.globalAnimation;
            n.labelEdge.length = 0,
            n.overlap = !1,
            Tt([d, f, m], (function(t) {
                for (var e in t)
                    t[e].isActive = !1
            }
            )),
            (n.hasData() || h) && (n.minorTickInterval && !n.categories && Tt(n.getMinorTickPositions(), (function(t) {
                f[t] || (f[t] = new L(n,t,"minor")),
                w && f[t].isNew && f[t].render(null, !0),
                f[t].render(null, !1, 1)
            }
            )),
            c.length && (Tt(c, (function(t, e) {
                (!h || t >= n.min && t <= n.max) && (d[t] || (d[t] = new L(n,t)),
                w && d[t].isNew && d[t].render(e, !0, .1),
                d[t].render(e))
            }
            )),
            x && (0 === n.min || n.single) && (d[-1] || (d[-1] = new L(n,-1,null,!0)),
            d[-1].render(-1))),
            v && Tt(c, (function(t, o) {
                i = c[o + 1] !== M ? c[o + 1] + x : n.max - x,
                0 == o % 2 && t < n.max && i <= n.max + (r.polar ? -x : x) && (m[t] || (m[t] = new V.PlotLineOrBand(n)),
                e = t + x,
                m[t].options = {
                    from: a ? l(e) : e,
                    to: a ? l(i) : i,
                    color: v
                },
                m[t].render(),
                m[t].isActive = !0)
            }
            )),
            n._addedPlotLB || (Tt((s.plotLines || []).concat(s.plotBands || []), (function(t) {
                n.addPlotBandOrLine(t)
            }
            )),
            n._addedPlotLB = !0)),
            Tt([d, f, m], (function(t) {
                var e, i, n = [], o = C ? C.duration || 500 : 0;
                for (e in t)
                    t[e].isActive || (t[e].render(e, !1, 0),
                    t[e].isActive = !1,
                    n.push(e));
                g((function() {
                    for (i = n.length; i--; )
                        t[n[i]] && !t[n[i]].isActive && (t[n[i]].destroy(),
                        delete t[n[i]])
                }
                ), t !== m && r.hasRendered && o ? o : 0)
            }
            )),
            b && (t = n.getLinePath(b),
            n.axisLine ? n.axisLine.animate({
                d: t
            }) : n.axisLine = o.path(t).attr({
                stroke: s.lineColor,
                "stroke-width": b,
                zIndex: 7
            }).add(n.axisGroup),
            n.axisLine[k ? "show" : "hide"](!0)),
            u && k && (u[u.isNew ? "attr" : "animate"](n.getTitlePosition()),
            u.isNew = !1),
            y && y.enabled && n.renderStackTotals(),
            n.isDirty = !1
        },
        redraw: function() {
            this.visible && (this.render(),
            Tt(this.plotLinesAndBands, (function(t) {
                t.render()
            }
            ))),
            Tt(this.series, (function(t) {
                t.isDirty = !0
            }
            ))
        },
        destroy: function(t) {
            var e, i = this, n = i.stacks, r = i.plotLinesAndBands;
            for (e in t || Lt(i),
            n)
                A(n[e]),
                n[e] = null;
            for (Tt([i.ticks, i.minorTicks, i.alternateBands], (function(t) {
                A(t)
            }
            )),
            t = r.length; t--; )
                r[t].destroy();
            Tt("stackTotalGroup axisLine axisTitle axisGroup cross gridGroup labelGroup".split(" "), (function(t) {
                i[t] && (i[t] = i[t].destroy())
            }
            )),
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function(t, e) {
            var i, n, r, o = this.crosshair;
            this.crosshair && !1 !== (p(e) || !Nt(o.snap, !0)) ? (Nt(o.snap, !0) ? p(e) && (i = this.isXAxis ? e.plotX : this.len - e.plotY) : i = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos,
            null === (i = this.isRadial ? this.getPlotLinePath(this.isXAxis ? e.x : Nt(e.stackY, e.y)) || null : this.getPlotLinePath(null, null, null, null, i) || null) ? this.hideCrosshair() : (n = this.categories && !this.isRadial,
            r = Nt(o.width, n ? this.transA : 1),
            this.cross ? this.cross.attr({
                d: i,
                visibility: "visible",
                "stroke-width": r
            }) : (n = {
                "stroke-width": r,
                stroke: o.color || (n ? "rgba(155,200,255,0.2)" : "#C0C0C0"),
                zIndex: Nt(o.zIndex, 2)
            },
            o.dashStyle && (n.dashstyle = o.dashStyle),
            this.cross = this.chart.renderer.path(i).attr(n).add()))) : this.hideCrosshair()
        },
        hideCrosshair: function() {
            this.cross && this.cross.hide()
        }
    },
    Rt(jt.prototype, {
        getPlotBandPath: function(t, e) {
            var i = this.getPlotLinePath(e, null, null, !0)
              , n = this.getPlotLinePath(t, null, null, !0);
            return n && i ? (n.flat = n.toString() === i.toString(),
            n.push(i[4], i[5], i[1], i[2])) : n = null,
            n
        },
        addPlotBand: function(t) {
            return this.addPlotBandOrLine(t, "plotBands")
        },
        addPlotLine: function(t) {
            return this.addPlotBandOrLine(t, "plotLines")
        },
        addPlotBandOrLine: function(t, e) {
            var i = new V.PlotLineOrBand(this,t).render()
              , n = this.userOptions;
            return i && (e && (n[e] = n[e] || [],
            n[e].push(t)),
            this.plotLinesAndBands.push(i)),
            i
        },
        removePlotBandOrLine: function(t) {
            for (var e = this.plotLinesAndBands, i = this.options, n = this.userOptions, r = e.length; r--; )
                e[r].id === t && e[r].destroy();
            Tt([i.plotLines || [], n.plotLines || [], i.plotBands || [], n.plotBands || []], (function(e) {
                for (r = e.length; r--; )
                    e[r].id === t && u(e, e[r])
            }
            ))
        }
    });
    var Wt, Xt = V.Tooltip = function() {
        this.init.apply(this, arguments)
    }
    ;
    Xt.prototype = {
        init: function(t, e) {
            var i = e.borderWidth
              , n = e.style
              , o = r(n.padding);
            this.chart = t,
            this.options = e,
            this.crosshairs = [],
            this.now = {
                x: 0,
                y: 0
            },
            this.isHidden = !0,
            this.label = t.renderer.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                padding: o,
                fill: e.backgroundColor,
                "stroke-width": i,
                r: e.borderRadius,
                zIndex: 8
            }).css(n).css({
                padding: 0
            }).add().attr({
                y: -9999
            }),
            gt || this.label.shadow(e.shadow),
            this.shared = e.shared
        },
        destroy: function() {
            this.label && (this.label = this.label.destroy()),
            clearTimeout(this.hideTimer),
            clearTimeout(this.tooltipTimeout)
        },
        move: function(t, e, i, n) {
            var r = this
              , o = r.now
              , s = !1 !== r.options.animation && !r.isHidden && (1 < it(t - o.x) || 1 < it(e - o.y))
              , a = r.followPointer || 1 < r.len;
            Rt(o, {
                x: s ? (2 * o.x + t) / 3 : t,
                y: s ? (o.y + e) / 2 : e,
                anchorX: a ? M : s ? (2 * o.anchorX + i) / 3 : i,
                anchorY: a ? M : s ? (o.anchorY + n) / 2 : n
            }),
            r.label.attr(o),
            s && (clearTimeout(this.tooltipTimeout),
            this.tooltipTimeout = setTimeout((function() {
                r && r.move(t, e, i, n)
            }
            ), 32))
        },
        hide: function(t) {
            var e = this;
            clearTimeout(this.hideTimer),
            t = Nt(t, this.options.hideDelay, 500),
            this.isHidden || (this.hideTimer = g((function() {
                e.label[t ? "fadeOut" : "hide"](),
                e.isHidden = !0
            }
            ), t))
        },
        getAnchor: function(t, e) {
            var i, n, r, o = this.chart, s = o.inverted, a = o.plotTop, h = o.plotLeft, c = 0, l = 0;
            return i = (t = f(t))[0].tooltipPos,
            this.followPointer && e && (e.chartX === M && (e = o.pointer.normalize(e)),
            i = [e.chartX - o.plotLeft, e.chartY - a]),
            i || (Tt(t, (function(t) {
                n = t.series.yAxis,
                r = t.series.xAxis,
                c += t.plotX + (!s && r ? r.left - h : 0),
                l += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!s && n ? n.top - a : 0)
            }
            )),
            c /= t.length,
            l /= t.length,
            i = [s ? o.plotWidth - l : c, this.shared && !s && 1 < t.length && e ? e.chartY - a : s ? o.plotHeight - c : l]),
            Et(i, K)
        },
        getPosition: function(t, e, i) {
            var n, r = this.chart, o = this.distance, s = {}, a = i.h || 0, h = ["y", r.chartHeight, e, i.plotY + r.plotTop, r.plotTop, r.plotTop + r.plotHeight], c = ["x", r.chartWidth, t, i.plotX + r.plotLeft, r.plotLeft, r.plotLeft + r.plotWidth], l = Nt(i.ttBelow, r.inverted && !i.negative || !r.inverted && i.negative), u = function(t, e, i, n, r, h) {
                var c = i < n - o
                  , u = n + o + i < e
                  , p = n - o - i;
                if (n += o,
                l && u)
                    s[t] = n;
                else if (!l && c)
                    s[t] = p;
                else if (c)
                    s[t] = et(h - i, 0 > p - a ? p : p - a);
                else {
                    if (!u)
                        return !1;
                    s[t] = tt(r, n + a + i > e ? n : n + a)
                }
            }, p = function(t, e, i, n) {
                var r;
                return n < o || n > e - o ? r = !1 : s[t] = n < i / 2 ? 1 : n > e - i / 2 ? e - i - 2 : n - i / 2,
                r
            }, d = function(t) {
                var e = h;
                h = c,
                c = e,
                n = t
            }, f = function() {
                !1 !== u.apply(0, h) ? !1 !== p.apply(0, c) || n || (d(!0),
                f()) : n ? s.x = s.y = 0 : (d(!0),
                f())
            };
            return (r.inverted || 1 < this.len) && d(),
            f(),
            s
        },
        defaultFormatter: function(t) {
            var e, i = this.points || f(this);
            return (e = (e = [t.tooltipFooterHeaderFormatter(i[0])]).concat(t.bodyFormatter(i))).push(t.tooltipFooterHeaderFormatter(i[0], !0)),
            e.join("")
        },
        refresh: function(t, e) {
            var i, n, r, o, s = this.chart, a = this.label, h = this.options, c = {}, l = [];
            o = h.formatter || this.defaultFormatter;
            c = s.hoverPoints;
            var u, p = this.shared;
            clearTimeout(this.hideTimer),
            this.followPointer = f(t)[0].series.tooltipOptions.followPointer,
            i = (r = this.getAnchor(t, e))[0],
            n = r[1],
            !p || t.series && t.series.noSharedTooltip ? c = t.getLabelConfig() : (s.hoverPoints = t,
            c && Tt(c, (function(t) {
                t.setState()
            }
            )),
            Tt(t, (function(t) {
                t.setState("hover"),
                l.push(t.getLabelConfig())
            }
            )),
            (c = {
                x: t[0].category,
                y: t[0].y
            }).points = l,
            this.len = l.length,
            t = t[0]),
            o = o.call(c, this),
            c = t.series,
            this.distance = Nt(c.tooltipOptions.distance, 16),
            !1 === o ? this.hide() : (this.isHidden && (Ot(a),
            a.attr("opacity", 1).show()),
            a.attr({
                text: o
            }),
            u = h.borderColor || t.color || c.color || "#606060",
            a.attr({
                stroke: u
            }),
            this.updatePosition({
                plotX: i,
                plotY: n,
                negative: t.negative,
                ttBelow: t.ttBelow,
                h: r[2] || 0
            }),
            this.isHidden = !1),
            Mt(s, "tooltipRefresh", {
                text: o,
                x: i + s.plotLeft,
                y: n + s.plotTop,
                borderColor: u
            })
        },
        updatePosition: function(t) {
            var e = this.chart
              , i = this.label;
            i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
            this.move(K(i.x), K(i.y || 0), t.plotX + e.plotLeft, t.plotY + e.plotTop)
        },
        getXDateFormat: function(t, e, i) {
            var n;
            e = e.dateTimeLabelFormats;
            var r, o, s = i && i.closestPointRange, a = {
                millisecond: 15,
                second: 12,
                minute: 9,
                hour: 6,
                day: 3
            }, h = "millisecond";
            if (s) {
                for (r in o = R("%m-%d %H:%M:%S.%L", t.x),
                N) {
                    if (s === N.week && +R("%w", t.x) === i.options.startOfWeek && "00:00:00.000" === o.substr(6)) {
                        r = "week";
                        break
                    }
                    if (N[r] > s) {
                        r = h;
                        break
                    }
                    if (a[r] && o.substr(a[r]) !== "01-01 00:00:00.000".substr(a[r]))
                        break;
                    "week" !== r && (h = r)
                }
                r && (n = e[r])
            } else
                n = e.day;
            return n || e.year
        },
        tooltipFooterHeaderFormatter: function(t, e) {
            var i = e ? "footer" : "header"
              , n = t.series
              , r = n.tooltipOptions
              , o = r.xDateFormat
              , s = n.xAxis
              , a = s && "datetime" === s.options.type && h(t.key);
            i = r[i + "Format"];
            return a && !o && (o = this.getXDateFormat(t, r, s)),
            a && o && (i = i.replace("{point.key}", "{point.key:" + o + "}")),
            b(i, {
                point: t,
                series: n
            })
        },
        bodyFormatter: function(t) {
            return Et(t, (function(t) {
                var e = t.series.tooltipOptions;
                return (e.pointFormatter || t.point.tooltipFormatter).call(t.point, e.pointFormat)
            }
            ))
        }
    },
    F = $ && $.documentElement.ontouchstart !== M;
    var _t = V.Pointer = function(t, e) {
        this.init(t, e)
    }
    ;
    _t.prototype = {
        init: function(t, e) {
            var i, n = (o = e.chart).events, r = gt ? "" : o.zoomType, o = t.inverted;
            this.options = e,
            this.chart = t,
            this.zoomX = i = /x/.test(r),
            this.zoomY = r = /y/.test(r),
            this.zoomHor = i && !o || r && o,
            this.zoomVert = r && !o || i && o,
            this.hasZoom = i || r,
            this.runChartClick = n && !!n.click,
            this.pinchDown = [],
            this.lastValidTouch = {},
            V.Tooltip && e.tooltip.enabled && (t.tooltip = new Xt(t,e.tooltip),
            this.followTouchMove = Nt(e.tooltip.followTouchMove, !0)),
            this.setDOMEvents()
        },
        normalize: function(e, i) {
            var n, r;
            return (e = e || t.event).target || (e.target = e.srcElement),
            r = e.touches ? e.touches.length ? e.touches.item(0) : e.changedTouches[0] : e,
            i || (this.chartPosition = i = Pt(this.chart.container)),
            r.pageX === M ? (n = tt(e.x, e.clientX - i.left),
            r = e.y) : (n = r.pageX - i.left,
            r = r.pageY - i.top),
            Rt(e, {
                chartX: K(n),
                chartY: K(r)
            })
        },
        getCoordinates: function(t) {
            var e = {
                xAxis: [],
                yAxis: []
            };
            return Tt(this.chart.axes, (function(i) {
                e[i.isXAxis ? "xAxis" : "yAxis"].push({
                    axis: i,
                    value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                })
            }
            )),
            e
        },
        runPointActions: function(t) {
            var e, i, n, r = this.chart, o = r.series, s = r.tooltip, a = !!s && s.shared, h = r.hoverPoint, c = r.hoverSeries, l = [Number.MAX_VALUE, Number.MAX_VALUE], u = [], p = [];
            if (!a && !c)
                for (r = 0; r < o.length; r++)
                    !o[r].directTouch && o[r].options.stickyTracking || (o = []);
            if (c && (a ? c.noSharedTooltip : c.directTouch) && h ? p = [h] : (Tt(o, (function(r) {
                e = r.noSharedTooltip && a,
                i = !a && r.directTouch,
                r.visible && !e && !i && Nt(r.options.enableMouseTracking, !0) && (n = r.searchPoint(t, !e && 1 === r.kdDimensions)) && u.push(n)
            }
            )),
            Tt(u, (function(t) {
                t && Tt(["dist", "distX"], (function(e, i) {
                    "number" == typeof t[e] && t[e] < l[i] && (l[i] = t[e],
                    p[i] = t)
                }
                ))
            }
            ))),
            a)
                for (r = u.length; r--; )
                    (u[r].clientX !== p[1].clientX || u[r].series.noSharedTooltip) && u.splice(r, 1);
            p[0] && (p[0] !== this.prevKDPoint || s && s.isHidden) ? a && !p[0].series.noSharedTooltip ? (u.length && s && s.refresh(u, t),
            Tt(u, (function(e) {
                e.onMouseOver(t, e !== (c && c.directTouch && h || p[0]))
            }
            )),
            this.prevKDPoint = p[1]) : (s && s.refresh(p[0], t),
            c && c.directTouch || p[0].onMouseOver(t),
            this.prevKDPoint = p[0]) : (o = c && c.tooltipOptions.followPointer,
            s && o && !s.isHidden && (o = s.getAnchor([{}], t),
            s.updatePosition({
                plotX: o[0],
                plotY: o[1]
            }))),
            this._onDocumentMouseMove || (this._onDocumentMouseMove = function(t) {
                vt[Wt] && vt[Wt].pointer.onDocumentMouseMove(t)
            }
            ,
            Bt($, "mousemove", this._onDocumentMouseMove)),
            Tt(a ? u : [Nt(p[1], h)], (function(e) {
                var i = e && e.series;
                i && Tt(["xAxis", "yAxis", "colorAxis"], (function(n) {
                    i[n] && i[n].drawCrosshair(t, e)
                }
                ))
            }
            ))
        },
        reset: function(t, e) {
            var i = this.chart
              , n = i.hoverSeries
              , r = i.hoverPoint
              , o = i.hoverPoints
              , s = i.tooltip
              , a = s && s.shared ? o : r;
            (t = t && s && a) && Tt(f(a), (function(e) {
                void 0 === e.plotX && (t = !1)
            }
            )),
            t ? (s.refresh(a),
            r && (r.setState(r.state, !0),
            Tt(i.axes, (function(t) {
                Nt(t.options.crosshair && t.options.crosshair.snap, !0) ? t.drawCrosshair(null, r) : t.hideCrosshair()
            }
            )))) : (r && r.onMouseOut(),
            o && Tt(o, (function(t) {
                t.setState()
            }
            )),
            n && n.onMouseOut(),
            s && s.hide(e),
            this._onDocumentMouseMove && (Lt($, "mousemove", this._onDocumentMouseMove),
            this._onDocumentMouseMove = null),
            Tt(i.axes, (function(t) {
                t.hideCrosshair()
            }
            )),
            this.hoverX = i.hoverPoints = i.hoverPoint = null)
        },
        scaleGroups: function(t, e) {
            var i, n = this.chart;
            Tt(n.series, (function(r) {
                i = t || r.getPlotBox(),
                r.xAxis && r.xAxis.zoomEnabled && (r.group.attr(i),
                r.markerGroup && (r.markerGroup.attr(i),
                r.markerGroup.clip(e ? n.clipRect : null)),
                r.dataLabelsGroup && r.dataLabelsGroup.attr(i))
            }
            )),
            n.clipRect.attr(e || n.clipBox)
        },
        dragStart: function(t) {
            var e = this.chart;
            e.mouseIsDown = t.type,
            e.cancelClick = !1,
            e.mouseDownX = this.mouseDownX = t.chartX,
            e.mouseDownY = this.mouseDownY = t.chartY
        },
        drag: function(t) {
            var e, i = this.chart, n = i.options.chart, r = t.chartX, o = t.chartY, s = this.zoomHor, a = this.zoomVert, h = i.plotLeft, c = i.plotTop, l = i.plotWidth, u = i.plotHeight, p = this.selectionMarker, d = this.mouseDownX, f = this.mouseDownY, g = n.panKey && t[n.panKey + "Key"];
            p && p.touch || (r < h ? r = h : r > h + l && (r = h + l),
            o < c ? o = c : o > c + u && (o = c + u),
            this.hasDragged = Math.sqrt(Math.pow(d - r, 2) + Math.pow(f - o, 2)),
            10 < this.hasDragged && (e = i.isInsidePlot(d - h, f - c),
            i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !g && !p && (this.selectionMarker = p = i.renderer.rect(h, c, s ? 1 : l, a ? 1 : u, 0).attr({
                fill: n.selectionMarkerFill || "rgba(69,114,167,0.25)",
                zIndex: 7
            }).add()),
            p && s && (r -= d,
            p.attr({
                width: it(r),
                x: (0 < r ? 0 : r) + d
            })),
            p && a && (r = o - f,
            p.attr({
                height: it(r),
                y: (0 < r ? 0 : r) + f
            })),
            e && !p && n.panning && i.pan(t, n.panning)))
        },
        drop: function(t) {
            var e = this
              , i = this.chart
              , n = this.hasPinched;
            if (this.selectionMarker) {
                var r, o = {
                    originalEvent: t,
                    xAxis: [],
                    yAxis: []
                }, s = this.selectionMarker, a = s.attr ? s.attr("x") : s.x, h = s.attr ? s.attr("y") : s.y, c = s.attr ? s.attr("width") : s.width, l = s.attr ? s.attr("height") : s.height;
                (this.hasDragged || n) && (Tt(i.axes, (function(i) {
                    if (i.zoomEnabled && p(i.min) && (n || e[{
                        xAxis: "zoomX",
                        yAxis: "zoomY"
                    }[i.coll]])) {
                        var s = i.horiz
                          , u = "touchend" === t.type ? i.minPixelPadding : 0
                          , d = i.toValue((s ? a : h) + u);
                        s = i.toValue((s ? a + c : h + l) - u);
                        o[i.coll].push({
                            axis: i,
                            min: et(d, s),
                            max: tt(d, s)
                        }),
                        r = !0
                    }
                }
                )),
                r && Mt(i, "selection", o, (function(t) {
                    i.zoom(Rt(t, n ? {
                        animation: !1
                    } : null))
                }
                ))),
                this.selectionMarker = this.selectionMarker.destroy(),
                n && this.scaleGroups()
            }
            i && (m(i.container, {
                cursor: i._cursor
            }),
            i.cancelClick = 10 < this.hasDragged,
            i.mouseIsDown = this.hasDragged = this.hasPinched = !1,
            this.pinchDown = [])
        },
        onContainerMouseDown: function(t) {
            (t = this.normalize(t)).preventDefault && t.preventDefault(),
            this.dragStart(t)
        },
        onDocumentMouseUp: function(t) {
            vt[Wt] && vt[Wt].pointer.drop(t)
        },
        onDocumentMouseMove: function(t) {
            var e = this.chart
              , i = this.chartPosition;
            t = this.normalize(t, i),
            !i || this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) || this.reset()
        },
        onContainerMouseLeave: function(t) {
            var e = vt[Wt];
            e && (t.relatedTarget || t.toElement) && (e.pointer.reset(),
            e.pointer.chartPosition = null)
        },
        onContainerMouseMove: function(t) {
            var e = this.chart;
            p(Wt) && vt[Wt] && vt[Wt].mouseIsDown || (Wt = e.index),
            (t = this.normalize(t)).returnValue = !1,
            "mousedown" === e.mouseIsDown && this.drag(t),
            !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) || e.openMenu || this.runPointActions(t)
        },
        inClass: function(t, e) {
            for (var i; t; ) {
                if (i = d(t, "class")) {
                    if (-1 !== i.indexOf(e))
                        return !0;
                    if (-1 !== i.indexOf("highcharts-container"))
                        return !1
                }
                t = t.parentNode
            }
        },
        onTrackerMouseOut: function(t) {
            var e = this.chart.hoverSeries;
            t = t.relatedTarget || t.toElement,
            !e || !t || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || this.inClass(t, "highcharts-series-" + e.index) || e.onMouseOut()
        },
        onContainerClick: function(t) {
            var e = this.chart
              , i = e.hoverPoint
              , n = e.plotLeft
              , r = e.plotTop;
            t = this.normalize(t),
            e.cancelClick || (i && this.inClass(t.target, "highcharts-tracker") ? (Mt(i.series, "click", Rt(t, {
                point: i
            })),
            e.hoverPoint && i.firePointEvent("click", t)) : (Rt(t, this.getCoordinates(t)),
            e.isInsidePlot(t.chartX - n, t.chartY - r) && Mt(e, "click", t)))
        },
        setDOMEvents: function() {
            var t = this
              , e = t.chart.container;
            e.onmousedown = function(e) {
                t.onContainerMouseDown(e)
            }
            ,
            e.onmousemove = function(e) {
                t.onContainerMouseMove(e)
            }
            ,
            e.onclick = function(e) {
                t.onContainerClick(e)
            }
            ,
            Bt(e, "mouseleave", t.onContainerMouseLeave),
            1 === xt && Bt($, "mouseup", t.onDocumentMouseUp),
            F && (e.ontouchstart = function(e) {
                t.onContainerTouchStart(e)
            }
            ,
            e.ontouchmove = function(e) {
                t.onContainerTouchMove(e)
            }
            ,
            1 === xt && Bt($, "touchend", t.onDocumentTouchEnd))
        },
        destroy: function() {
            var t;
            for (t in Lt(this.chart.container, "mouseleave", this.onContainerMouseLeave),
            xt || (Lt($, "mouseup", this.onDocumentMouseUp),
            Lt($, "touchend", this.onDocumentTouchEnd)),
            clearInterval(this.tooltipTimeout),
            this)
                this[t] = null
        }
    };
    var Gt = V.Legend = function(t, e) {
        this.init(t, e)
    }
    ;
    Gt.prototype = {
        init: function(t, e) {
            var i = this
              , r = e.itemStyle
              , o = e.itemMarginTop || 0;
            this.options = e,
            e.enabled && (i.itemStyle = r,
            i.itemHiddenStyle = n(r, e.itemHiddenStyle),
            i.itemMarginTop = o,
            i.padding = r = Nt(e.padding, 8),
            i.initialItemX = r,
            i.initialItemY = r - 5,
            i.maxItemWidth = 0,
            i.chart = t,
            i.itemHeight = 0,
            i.symbolWidth = Nt(e.symbolWidth, 16),
            i.pages = [],
            i.render(),
            Bt(i.chart, "endResize", (function() {
                i.positionCheckboxes()
            }
            )))
        },
        colorizeItem: function(t, e) {
            var i, n = this.options, r = t.legendItem, o = t.legendLine, s = t.legendSymbol, a = this.itemHiddenStyle.color, h = (n = e ? n.itemStyle.color : a,
            e ? t.legendColor || t.color || "#CCC" : a), c = (a = t.options && t.options.marker,
            {
                fill: h
            });
            if (r && r.css({
                fill: n,
                color: n
            }),
            o && o.attr({
                stroke: h
            }),
            s) {
                if (a && s.isMarker)
                    for (i in c.stroke = h,
                    a = t.convertAttribs(a))
                        (r = a[i]) !== M && (c[i] = r);
                s.attr(c)
            }
        },
        positionItem: function(t) {
            var e = (i = this.options).symbolPadding
              , i = !i.rtl
              , n = (r = t._legendItemPos)[0]
              , r = r[1]
              , o = t.checkbox;
            (t = t.legendGroup) && t.element && t.translate(i ? n : this.legendWidth - n - 2 * e - 4, r),
            o && (o.x = n,
            o.y = r)
        },
        destroyItem: function(t) {
            var e = t.checkbox;
            Tt(["legendItem", "legendLine", "legendSymbol", "legendGroup"], (function(e) {
                t[e] && (t[e] = t[e].destroy())
            }
            )),
            e && T(t.checkbox)
        },
        destroy: function() {
            var t = this.group
              , e = this.box;
            e && (this.box = e.destroy()),
            t && (this.group = t.destroy())
        },
        positionCheckboxes: function(t) {
            var e, i = this.group.alignAttr, n = this.clipHeight || this.legendHeight, r = this.titleHeight;
            i && (e = i.translateY,
            Tt(this.allItems, (function(o) {
                var s, a = o.checkbox;
                a && (s = e + r + a.y + (t || 0) + 3,
                m(a, {
                    left: i.translateX + o.checkboxOffset + a.x - 20 + "px",
                    top: s + "px",
                    display: s > e - 6 && s < e + n - 6 ? "" : "none"
                }))
            }
            )))
        },
        renderTitle: function() {
            var t = this.padding
              , e = this.options.title
              , i = 0;
            e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                zIndex: 1
            }).css(e.style).add(this.group)),
            i = (t = this.title.getBBox()).height,
            this.offsetWidth = t.width,
            this.contentGroup.attr({
                translateY: i
            })),
            this.titleHeight = i
        },
        setText: function(t) {
            var e = this.options;
            t.legendItem.attr({
                text: e.labelFormat ? b(e.labelFormat, t) : e.labelFormatter.call(t)
            })
        },
        renderItem: function(t) {
            var e = this.chart
              , i = e.renderer
              , r = this.options
              , o = "horizontal" === r.layout
              , s = this.symbolWidth
              , a = r.symbolPadding
              , h = this.itemStyle
              , c = this.itemHiddenStyle
              , l = this.padding
              , u = o ? Nt(r.itemDistance, 20) : 0
              , p = !r.rtl
              , d = r.width
              , f = r.itemMarginBottom || 0
              , g = this.itemMarginTop
              , m = this.initialItemX
              , y = t.legendItem
              , v = t.series && t.series.drawLegendSymbol ? t.series : t
              , x = v.options
              , b = (x = this.createCheckboxForItem && x && x.showCheckbox,
            r.useHTML);
            y || (t.legendGroup = i.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup),
            t.legendItem = y = i.text("", p ? s + a : -a, this.baseline || 0, b).css(n(t.visible ? h : c)).attr({
                align: p ? "left" : "right",
                zIndex: 2
            }).add(t.legendGroup),
            this.baseline || (this.fontMetrics = i.fontMetrics(h.fontSize, y),
            this.baseline = this.fontMetrics.f + 3 + g,
            y.attr("y", this.baseline)),
            v.drawLegendSymbol(this, t),
            this.setItemEvents && this.setItemEvents(t, y, b, h, c),
            x && this.createCheckboxForItem(t)),
            this.colorizeItem(t, t.visible),
            this.setText(t),
            i = y.getBBox(),
            s = t.checkboxOffset = r.itemWidth || t.legendItemWidth || s + a + i.width + u + (x ? 20 : 0),
            this.itemHeight = a = K(t.legendItemHeight || i.height),
            o && this.itemX - m + s > (d || e.chartWidth - 2 * l - m - r.x) && (this.itemX = m,
            this.itemY += g + this.lastLineHeight + f,
            this.lastLineHeight = 0),
            this.maxItemWidth = tt(this.maxItemWidth, s),
            this.lastItemY = g + this.itemY + f,
            this.lastLineHeight = tt(a, this.lastLineHeight),
            t._legendItemPos = [this.itemX, this.itemY],
            o ? this.itemX += s : (this.itemY += g + a + f,
            this.lastLineHeight = a),
            this.offsetWidth = d || tt((o ? this.itemX - m - u : s) + l, this.offsetWidth)
        },
        getAllItems: function() {
            var t = [];
            return Tt(this.chart.series, (function(e) {
                var i = e.options;
                Nt(i.showInLegend, !p(i.linkedTo) && M, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
            }
            )),
            t
        },
        adjustMargins: function(t, e) {
            var i = this.chart
              , n = this.options
              , r = n.align.charAt(0) + n.verticalAlign.charAt(0) + n.layout.charAt(0);
            this.display && !n.floating && Tt([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], (function(o, s) {
                o.test(r) && !p(t[s]) && (i[wt[s]] = tt(i[wt[s]], i.legend[(s + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][s] * n[s % 2 ? "x" : "y"] + Nt(n.margin, 12) + e[s]))
            }
            ))
        },
        render: function() {
            var t, e, i, n, r = this, o = r.chart, s = o.renderer, a = r.group, h = r.box, c = r.options, l = r.padding, u = c.borderWidth, p = c.backgroundColor;
            r.itemX = r.initialItemX,
            r.itemY = r.initialItemY,
            r.offsetWidth = 0,
            r.lastItemY = 0,
            a || (r.group = a = s.g("legend").attr({
                zIndex: 7
            }).add(),
            r.contentGroup = s.g().attr({
                zIndex: 1
            }).add(a),
            r.scrollGroup = s.g().add(r.contentGroup)),
            r.renderTitle(),
            w(t = r.getAllItems(), (function(t, e) {
                return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
            }
            )),
            c.reversed && t.reverse(),
            r.allItems = t,
            r.display = e = !!t.length,
            r.lastLineHeight = 0,
            Tt(t, (function(t) {
                r.renderItem(t)
            }
            )),
            i = (c.width || r.offsetWidth) + l,
            n = r.lastItemY + r.lastLineHeight + r.titleHeight,
            n = r.handleOverflow(n),
            n += l,
            (u || p) && (h ? 0 < i && 0 < n && (h[h.isNew ? "attr" : "animate"](h.crisp({
                width: i,
                height: n
            })),
            h.isNew = !1) : (r.box = h = s.rect(0, 0, i, n, c.borderRadius, u || 0).attr({
                stroke: c.borderColor,
                "stroke-width": u || 0,
                fill: p || "none"
            }).add(a).shadow(c.shadow),
            h.isNew = !0),
            h[e ? "show" : "hide"]()),
            r.legendWidth = i,
            r.legendHeight = n,
            Tt(t, (function(t) {
                r.positionItem(t)
            }
            )),
            e && a.align(Rt({
                width: i,
                height: n
            }, c), !0, "spacingBox"),
            o.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function(t) {
            var e, i, n = this, r = this.chart, o = r.renderer, s = this.options, a = s.y, h = (a = r.spacingBox.height + ("top" === s.verticalAlign ? -a : a) - this.padding,
            s.maxHeight), c = this.clipRect, l = s.navigation, u = Nt(l.animation, !0), p = l.arrowSize || 12, d = this.nav, f = this.pages, g = this.padding, m = this.allItems, y = function(t) {
                c.attr({
                    height: t
                }),
                n.contentGroup.div && (n.contentGroup.div.style.clip = "rect(" + g + "px,9999px," + (g + t) + "px,0)")
            };
            return "horizontal" === s.layout && (a /= 2),
            h && (a = et(a, h)),
            f.length = 0,
            t > a ? (this.clipHeight = e = tt(a - 20 - this.titleHeight - g, 0),
            this.currentPage = Nt(this.currentPage, 1),
            this.fullHeight = t,
            Tt(m, (function(t, n) {
                var r = t._legendItemPos[1]
                  , o = K(t.legendItem.getBBox().height)
                  , s = f.length;
                (!s || r - f[s - 1] > e && (i || r) !== f[s - 1]) && (f.push(i || r),
                s++),
                n === m.length - 1 && r + o - f[s - 1] > e && f.push(r),
                r !== i && (i = r)
            }
            )),
            c || (c = n.clipRect = o.clipRect(0, g, 9999, 0),
            n.contentGroup.clip(c)),
            y(e),
            d || (this.nav = d = o.g().attr({
                zIndex: 1
            }).add(this.group),
            this.up = o.symbol("triangle", 0, 0, p, p).on("click", (function() {
                n.scroll(-1, u)
            }
            )).add(d),
            this.pager = o.text("", 15, 10).css(l.style).add(d),
            this.down = o.symbol("triangle-down", 0, 0, p, p).on("click", (function() {
                n.scroll(1, u)
            }
            )).add(d)),
            n.scroll(0),
            t = a) : d && (y(r.chartHeight),
            d.hide(),
            this.scrollGroup.attr({
                translateY: 1
            }),
            this.clipHeight = 0),
            t
        },
        scroll: function(t, e) {
            var i = this.pages
              , n = i.length
              , r = this.currentPage + t
              , o = this.clipHeight
              , s = (a = this.options.navigation).activeColor
              , a = a.inactiveColor
              , h = this.pager
              , c = this.padding;
            if (r > n && (r = n),
            0 < r) {
                if (e !== M) {
                    var l = this.chart;
                    l.renderer.globalAnimation = Nt(e, l.animation)
                }
                this.nav.attr({
                    translateX: c,
                    translateY: o + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }),
                this.up.attr({
                    fill: 1 === r ? a : s
                }).css({
                    cursor: 1 === r ? "default" : "pointer"
                }),
                h.attr({
                    text: r + "/" + n
                }),
                this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    fill: r === n ? a : s
                }).css({
                    cursor: r === n ? "default" : "pointer"
                }),
                i = -i[r - 1] + this.initialItemY,
                this.scrollGroup.animate({
                    translateY: i
                }),
                this.currentPage = r,
                this.positionCheckboxes(i)
            }
        }
    };
    var Yt = V.LegendSymbolMixin = {
        drawRectangle: function(t, e) {
            var i = t.options.symbolHeight || t.fontMetrics.f;
            e.legendSymbol = this.chart.renderer.rect(0, t.baseline - i + 1, t.symbolWidth, i, t.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(e.legendGroup)
        },
        drawLineMarker: function(t) {
            var e, i = this.options, n = i.marker, r = t.symbolWidth, o = this.chart.renderer, s = this.legendGroup;
            t = t.baseline - K(.3 * t.fontMetrics.b),
            i.lineWidth && (e = {
                "stroke-width": i.lineWidth
            },
            i.dashStyle && (e.dashstyle = i.dashStyle),
            this.legendLine = o.path(["M", 0, t, "L", r, t]).attr(e).add(s)),
            n && !1 !== n.enabled && (i = n.radius,
            this.legendSymbol = n = o.symbol(this.symbol, r / 2 - i, t - i, 2 * i, 2 * i, n).add(s),
            n.isMarker = !0)
        }
    };
    (/Trident\/7\.0/.test(at) || ut) && Dt(Gt.prototype, "positionItem", (function(t, e) {
        var i = this
          , n = function() {
            e._legendItemPos && t.call(i, e)
        };
        n(),
        setTimeout(n)
    }
    ));
    var Ut = V.Chart = function() {
        this.getArgs.apply(this, arguments)
    }
    ;
    V.chart = function(t, e, i) {
        return new Ut(t,e,i)
    }
    ,
    Ut.prototype = {
        callbacks: [],
        getArgs: function() {
            var t = [].slice.call(arguments);
            (o(t[0]) || t[0].nodeName) && (this.renderTo = t.shift()),
            this.init(t[0], t[1])
        },
        init: function(t, e) {
            var i, r = t.series;
            t.series = null,
            (i = n(I, t)).series = t.series = r,
            this.userOptions = t,
            r = i.chart,
            this.margin = this.splashArray("margin", r),
            this.spacing = this.splashArray("spacing", r);
            var o = r.events;
            this.bounds = {
                h: {},
                v: {}
            },
            this.callback = e,
            this.isResizing = 0,
            this.options = i,
            this.axes = [],
            this.series = [],
            this.hasCartesianSeries = r.showAxes;
            var s, a = this;
            if (a.index = vt.length,
            vt.push(a),
            xt++,
            !1 !== r.reflow && Bt(a, "load", (function() {
                a.initReflow()
            }
            )),
            o)
                for (s in o)
                    Bt(a, s, o[s]);
            a.xAxis = [],
            a.yAxis = [],
            a.animation = !gt && Nt(r.animation, !0),
            a.pointCount = a.colorCounter = a.symbolCounter = 0,
            a.firstRender()
        },
        initSeries: function(t) {
            var i = this.options.chart;
            return (i = kt[t.type || i.type || i.defaultSeriesType]) || e(17, !0),
            (i = new i).init(this, t),
            i
        },
        isInsidePlot: function(t, e, i) {
            var n = i ? e : t;
            return t = i ? t : e,
            0 <= n && n <= this.plotWidth && 0 <= t && t <= this.plotHeight
        },
        redraw: function(t) {
            var e, i, n = this.axes, r = this.series, o = this.pointer, s = this.legend, a = this.isDirtyLegend, h = this.hasCartesianSeries, c = this.isDirtyBox, l = r.length, u = l, p = this.renderer, d = p.isHidden(), f = [];
            for (this.renderer.globalAnimation = Nt(t, this.animation),
            d && this.cloneRenderTo(),
            this.layOutTitles(); u--; )
                if ((t = r[u]).options.stacking && (e = !0,
                t.isDirty)) {
                    i = !0;
                    break
                }
            if (i)
                for (u = l; u--; )
                    (t = r[u]).options.stacking && (t.isDirty = !0);
            Tt(r, (function(t) {
                t.isDirty && "point" === t.options.legendType && (t.updateTotals && t.updateTotals(),
                a = !0)
            }
            )),
            a && s.options.enabled && (s.render(),
            this.isDirtyLegend = !1),
            e && this.getStacks(),
            h && !this.isResizing && (this.maxTicks = null,
            Tt(n, (function(t) {
                t.setScale()
            }
            ))),
            this.getMargins(),
            h && (Tt(n, (function(t) {
                t.isDirty && (c = !0)
            }
            )),
            Tt(n, (function(t) {
                var i = t.min + "," + t.max;
                t.extKey !== i && (t.extKey = i,
                f.push((function() {
                    Mt(t, "afterSetExtremes", Rt(t.eventArgs, t.getExtremes())),
                    delete t.eventArgs
                }
                ))),
                (c || e) && t.redraw()
            }
            ))),
            c && this.drawChartBox(),
            Tt(r, (function(t) {
                t.isDirty && t.visible && (!t.isCartesian || t.xAxis) && t.redraw()
            }
            )),
            o && o.reset(!0),
            p.draw(),
            Mt(this, "redraw"),
            d && this.cloneRenderTo(!0),
            Tt(f, (function(t) {
                t.call()
            }
            ))
        },
        get: function(t) {
            var e, i, n = this.axes, r = this.series;
            for (e = 0; e < n.length; e++)
                if (n[e].options.id === t)
                    return n[e];
            for (e = 0; e < r.length; e++)
                if (r[e].options.id === t)
                    return r[e];
            for (e = 0; e < r.length; e++)
                for (i = r[e].points || [],
                n = 0; n < i.length; n++)
                    if (i[n].id === t)
                        return i[n];
            return null
        },
        getAxes: function() {
            var t = this
              , e = (i = this.options).xAxis = f(i.xAxis || {})
              , i = i.yAxis = f(i.yAxis || {});
            Tt(e, (function(t, e) {
                t.index = e,
                t.isX = !0
            }
            )),
            Tt(i, (function(t, e) {
                t.index = e
            }
            )),
            e = e.concat(i),
            Tt(e, (function(e) {
                new jt(t,e)
            }
            ))
        },
        getSelectedPoints: function() {
            var t = [];
            return Tt(this.series, (function(e) {
                t = t.concat(St(e.points || [], (function(t) {
                    return t.selected
                }
                )))
            }
            )),
            t
        },
        getSelectedSeries: function() {
            return St(this.series, (function(t) {
                return t.selected
            }
            ))
        },
        setTitle: function(t, e, i) {
            var r, o = this, s = o.options;
            r = s.title = n(s.title, t),
            s = s.subtitle = n(s.subtitle, e),
            Tt([["title", t, r], ["subtitle", e, s]], (function(t) {
                var e = t[0]
                  , i = o[e]
                  , n = t[1];
                t = t[2],
                i && n && (o[e] = i = i.destroy()),
                t && t.text && !i && (o[e] = o.renderer.text(t.text, 0, 0, t.useHTML).attr({
                    align: t.align,
                    class: "highcharts-" + e,
                    zIndex: t.zIndex || 4
                }).css(t.style).add())
            }
            )),
            o.layOutTitles(i)
        },
        layOutTitles: function(t) {
            var e = 0
              , i = this.title
              , n = this.subtitle
              , r = (o = this.options).title
              , o = o.subtitle
              , s = this.renderer
              , a = this.spacingBox.width - 44;
            i && (i.css({
                width: (r.width || a) + "px"
            }).align(Rt({
                y: s.fontMetrics(r.style.fontSize, i).b - 3
            }, r), !1, "spacingBox"),
            r.floating || r.verticalAlign || (e = i.getBBox().height)),
            n && (n.css({
                width: (o.width || a) + "px"
            }).align(Rt({
                y: e + (r.margin - 13) + s.fontMetrics(o.style.fontSize, i).b
            }, o), !1, "spacingBox"),
            o.floating || o.verticalAlign || (e = Q(e + n.getBBox().height))),
            i = this.titleOffset !== e,
            this.titleOffset = e,
            !this.isDirtyBox && i && (this.isDirtyBox = i,
            this.hasRendered && Nt(t, !0) && this.isDirtyBox && this.redraw())
        },
        getChartSize: function() {
            var t = (e = this.options.chart).width
              , e = e.height
              , i = this.renderToClone || this.renderTo;
            p(t) || (this.containerWidth = Ct(i, "width")),
            p(e) || (this.containerHeight = Ct(i, "height")),
            this.chartWidth = tt(0, t || this.containerWidth || 600),
            this.chartHeight = tt(0, Nt(e, 19 < this.containerHeight ? this.containerHeight : 400))
        },
        cloneRenderTo: function(t) {
            var e = this.renderToClone
              , i = this.container;
            t ? e && (this.renderTo.appendChild(i),
            T(e),
            delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i),
            this.renderToClone = e = this.renderTo.cloneNode(0),
            m(e, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }),
            e.style.setProperty && e.style.setProperty("display", "block", "important"),
            $.body.appendChild(e),
            i && e.appendChild(i))
        },
        getContainer: function() {
            var t, i, n, s = this.options, a = s.chart;
            t = this.renderTo;
            var h = "highcharts-" + yt++;
            t || (this.renderTo = t = a.renderTo),
            o(t) && (this.renderTo = t = $.getElementById(t)),
            t || e(13, !0),
            i = r(d(t, "data-highcharts-chart")),
            !isNaN(i) && vt[i] && vt[i].hasRendered && vt[i].destroy(),
            d(t, "data-highcharts-chart", this.index),
            t.innerHTML = "",
            a.skipClone || t.offsetWidth || this.cloneRenderTo(),
            this.getChartSize(),
            i = this.chartWidth,
            n = this.chartHeight,
            this.container = t = y("div", {
                className: "highcharts-container" + (a.className ? " " + a.className : ""),
                id: h
            }, Rt({
                position: "relative",
                overflow: "hidden",
                width: i + "px",
                height: n + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, a.style), this.renderToClone || t),
            this._cursor = t.style.cursor,
            this.renderer = new (V[a.renderer] || Ht)(t,i,n,a.style,a.forExport,s.exporting && s.exporting.allowHTML),
            gt && this.renderer.create(this, t, i, n),
            this.renderer.chartIndex = this.index
        },
        getMargins: function(t) {
            var e = this.spacing
              , i = this.margin
              , n = this.titleOffset;
            this.resetMargins(),
            n && !p(i[0]) && (this.plotTop = tt(this.plotTop, n + this.options.title.margin + e[0])),
            this.legend.adjustMargins(i, e),
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin),
            this.extraTopMargin && (this.plotTop += this.extraTopMargin),
            t || this.getAxisMargins()
        },
        getAxisMargins: function() {
            var t = this
              , e = t.axisOffset = [0, 0, 0, 0]
              , i = t.margin;
            t.hasCartesianSeries && Tt(t.axes, (function(t) {
                t.visible && t.getOffset()
            }
            )),
            Tt(wt, (function(n, r) {
                p(i[r]) || (t[n] += e[r])
            }
            )),
            t.setChartSize()
        },
        reflow: function(e) {
            var i = this
              , n = i.options.chart
              , r = i.renderTo
              , o = n.width || Ct(r, "width")
              , s = n.height || Ct(r, "height");
            n = e ? e.target : t;
            i.hasUserSize || i.isPrinting || !o || !s || n !== t && n !== $ || (o === i.containerWidth && s === i.containerHeight || (clearTimeout(i.reflowTimeout),
            i.reflowTimeout = g((function() {
                i.container && (i.setSize(o, s, !1),
                i.hasUserSize = null)
            }
            ), e ? 100 : 0)),
            i.containerWidth = o,
            i.containerHeight = s)
        },
        initReflow: function() {
            var e = this
              , i = function(t) {
                e.reflow(t)
            };
            Bt(t, "resize", i),
            Bt(e, "destroy", (function() {
                Lt(t, "resize", i)
            }
            ))
        },
        setSize: function(t, e, i) {
            var n, r, o = this, s = o.renderer;
            o.isResizing += 1,
            o.renderer.globalAnimation = Nt(i, o.animation),
            o.oldChartHeight = o.chartHeight,
            o.oldChartWidth = o.chartWidth,
            p(t) && (o.chartWidth = n = tt(0, K(t)),
            o.hasUserSize = !!n),
            p(e) && (o.chartHeight = r = tt(0, K(e))),
            ((t = s.globalAnimation) ? Ft : m)(o.container, {
                width: n + "px",
                height: r + "px"
            }, t),
            o.setChartSize(!0),
            s.setSize(n, r, i),
            o.maxTicks = null,
            Tt(o.axes, (function(t) {
                t.isDirty = !0,
                t.setScale()
            }
            )),
            Tt(o.series, (function(t) {
                t.isDirty = !0
            }
            )),
            o.isDirtyLegend = !0,
            o.isDirtyBox = !0,
            o.layOutTitles(),
            o.getMargins(),
            o.redraw(i),
            o.oldChartHeight = null,
            Mt(o, "resize"),
            g((function() {
                o && Mt(o, "endResize", null, (function() {
                    --o.isResizing
                }
                ))
            }
            ), !1 === (t = s.globalAnimation) ? 0 : t && t.duration || 500)
        },
        setChartSize: function(t) {
            var e, i, n, r, o = this.inverted, s = this.renderer, a = this.chartWidth, h = this.chartHeight, c = this.options.chart, l = this.spacing, u = this.clipOffset;
            this.plotLeft = e = K(this.plotLeft),
            this.plotTop = i = K(this.plotTop),
            this.plotWidth = n = tt(0, K(a - e - this.marginRight)),
            this.plotHeight = r = tt(0, K(h - i - this.marginBottom)),
            this.plotSizeX = o ? r : n,
            this.plotSizeY = o ? n : r,
            this.plotBorderWidth = c.plotBorderWidth || 0,
            this.spacingBox = s.spacingBox = {
                x: l[3],
                y: l[0],
                width: a - l[3] - l[1],
                height: h - l[0] - l[2]
            },
            this.plotBox = s.plotBox = {
                x: e,
                y: i,
                width: n,
                height: r
            },
            a = 2 * J(this.plotBorderWidth / 2),
            o = Q(tt(a, u[3]) / 2),
            s = Q(tt(a, u[0]) / 2),
            this.clipBox = {
                x: o,
                y: s,
                width: J(this.plotSizeX - tt(a, u[1]) / 2 - o),
                height: tt(0, J(this.plotSizeY - tt(a, u[2]) / 2 - s))
            },
            t || Tt(this.axes, (function(t) {
                t.setAxisSize(),
                t.setAxisTranslation()
            }
            ))
        },
        resetMargins: function() {
            var t = this;
            Tt(wt, (function(e, i) {
                t[e] = Nt(t.margin[i], t.spacing[i])
            }
            )),
            t.axisOffset = [0, 0, 0, 0],
            t.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function() {
            var t, e = this.options.chart, i = this.renderer, n = this.chartWidth, r = this.chartHeight, o = this.chartBackground, s = this.plotBackground, a = this.plotBorder, h = this.plotBGImage, c = e.borderWidth || 0, l = e.backgroundColor, u = e.plotBackgroundColor, p = e.plotBackgroundImage, d = e.plotBorderWidth || 0, f = this.plotLeft, g = this.plotTop, m = this.plotWidth, y = this.plotHeight, v = this.plotBox, x = this.clipRect, b = this.clipBox;
            t = c + (e.shadow ? 8 : 0),
            (c || l) && (o ? o.animate(o.crisp({
                width: n - t,
                height: r - t
            })) : (o = {
                fill: l || "none"
            },
            c && (o.stroke = e.borderColor,
            o["stroke-width"] = c),
            this.chartBackground = i.rect(t / 2, t / 2, n - t, r - t, e.borderRadius, c).attr(o).addClass("highcharts-background").add().shadow(e.shadow))),
            u && (s ? s.animate(v) : this.plotBackground = i.rect(f, g, m, y, 0).attr({
                fill: u
            }).add().shadow(e.plotShadow)),
            p && (h ? h.animate(v) : this.plotBGImage = i.image(p, f, g, m, y).add()),
            x ? x.animate({
                width: b.width,
                height: b.height
            }) : this.clipRect = i.clipRect(b),
            d && (a ? (a.strokeWidth = -d,
            a.animate(a.crisp({
                x: f,
                y: g,
                width: m,
                height: y
            }))) : this.plotBorder = i.rect(f, g, m, y, 0, -d).attr({
                stroke: e.plotBorderColor,
                "stroke-width": d,
                fill: "none",
                zIndex: 1
            }).add()),
            this.isDirtyBox = !1
        },
        propFromSeries: function() {
            var t, e, i, n = this, r = n.options.chart, o = n.options.series;
            Tt(["inverted", "angular", "polar"], (function(s) {
                for (t = kt[r.type || r.defaultSeriesType],
                i = n[s] || r[s] || t && t.prototype[s],
                e = o && o.length; !i && e--; )
                    (t = kt[o[e].type]) && t.prototype[s] && (i = !0);
                n[s] = i
            }
            ))
        },
        linkSeries: function() {
            var t = this
              , e = t.series;
            Tt(e, (function(t) {
                t.linkedSeries.length = 0
            }
            )),
            Tt(e, (function(e) {
                var i = e.options.linkedTo;
                o(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && (i.linkedSeries.push(e),
                e.linkedParent = i,
                e.visible = Nt(e.options.visible, i.options.visible, e.visible))
            }
            ))
        },
        renderSeries: function() {
            Tt(this.series, (function(t) {
                t.translate(),
                t.render()
            }
            ))
        },
        renderLabels: function() {
            var t = this
              , e = t.options.labels;
            e.items && Tt(e.items, (function(i) {
                var n = Rt(e.style, i.style)
                  , o = r(n.left) + t.plotLeft
                  , s = r(n.top) + t.plotTop + 12;
                delete n.left,
                delete n.top,
                t.renderer.text(i.html, o, s).attr({
                    zIndex: 2
                }).css(n).add()
            }
            ))
        },
        render: function() {
            var t, e, i, n, r = this.axes, o = this.renderer, s = this.options;
            this.setTitle(),
            this.legend = new Gt(this,s.legend),
            this.getStacks && this.getStacks(),
            this.getMargins(!0),
            this.setChartSize(),
            t = this.plotWidth,
            e = this.plotHeight -= 21,
            Tt(r, (function(t) {
                t.setScale()
            }
            )),
            this.getAxisMargins(),
            i = 1.1 < t / this.plotWidth,
            n = 1.05 < e / this.plotHeight,
            (i || n) && (this.maxTicks = null,
            Tt(r, (function(t) {
                (t.horiz && i || !t.horiz && n) && t.setTickInterval(!0)
            }
            )),
            this.getMargins()),
            this.drawChartBox(),
            this.hasCartesianSeries && Tt(r, (function(t) {
                t.visible && t.render()
            }
            )),
            this.seriesGroup || (this.seriesGroup = o.g("series-group").attr({
                zIndex: 3
            }).add()),
            this.renderSeries(),
            this.renderLabels(),
            this.showCredits(s.credits),
            this.hasRendered = !0
        },
        showCredits: function(e) {
            e.enabled && !this.credits && (this.credits = this.renderer.text(e.text, 0, 0).on("click", (function() {
                e.href && (t.location.href = e.href)
            }
            )).attr({
                align: e.position.align,
                zIndex: 8
            }).css(e.style).add().align(e.position))
        },
        destroy: function() {
            var t, e = this, i = e.axes, n = e.series, r = e.container, o = r && r.parentNode;
            for (Mt(e, "destroy"),
            vt[e.index] = M,
            xt--,
            e.renderTo.removeAttribute("data-highcharts-chart"),
            Lt(e),
            t = i.length; t--; )
                i[t] = i[t].destroy();
            for (t = n.length; t--; )
                n[t] = n[t].destroy();
            for (t in Tt("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "), (function(t) {
                var i = e[t];
                i && i.destroy && (e[t] = i.destroy())
            }
            )),
            r && (r.innerHTML = "",
            Lt(r),
            o && T(r)),
            e)
                delete e[t]
        },
        isReadyToRender: function() {
            var e = this;
            return !(!dt && t == t.top && "complete" !== $.readyState || gt && !t.canvg) || (gt ? CanVGController.push((function() {
                e.firstRender()
            }
            ), e.options.global.canvasToolsURL) : $.attachEvent("onreadystatechange", (function() {
                $.detachEvent("onreadystatechange", e.firstRender),
                "complete" === $.readyState && e.firstRender()
            }
            )),
            !1)
        },
        firstRender: function() {
            var t = this
              , e = t.options;
            t.isReadyToRender() && (t.getContainer(),
            Mt(t, "init"),
            t.resetMargins(),
            t.setChartSize(),
            t.propFromSeries(),
            t.getAxes(),
            Tt(e.series || [], (function(e) {
                t.initSeries(e)
            }
            )),
            t.linkSeries(),
            Mt(t, "beforeRender"),
            V.Pointer && (t.pointer = new _t(t,e)),
            t.render(),
            t.renderer.draw(),
            t.renderer.imgCount || t.onload(),
            t.cloneRenderTo(!0))
        },
        onload: function() {
            var t = this;
            Tt([this.callback].concat(this.callbacks), (function(e) {
                e && void 0 !== t.index && e.apply(t, [t])
            }
            )),
            t.renderer.imgCount || Mt(t, "load")
        },
        splashArray: function(t, e) {
            var i = s(i = e[t]) ? i : [i, i, i, i];
            return [Nt(e[t + "Top"], i[0]), Nt(e[t + "Right"], i[1]), Nt(e[t + "Bottom"], i[2]), Nt(e[t + "Left"], i[3])]
        }
    };
    var qt = function() {};
    qt.prototype = {
        init: function(t, e, i) {
            return this.series = t,
            this.color = t.color,
            this.applyOptions(e, i),
            this.pointAttr = {},
            t.options.colorByPoint && (e = t.options.colors || t.chart.options.colors,
            this.color = this.color || e[t.colorCounter++],
            t.colorCounter === e.length && (t.colorCounter = 0)),
            t.chart.pointCount++,
            this
        },
        applyOptions: function(t, e) {
            var i = this.series
              , n = i.options.pointValKey || i.pointValKey;
            return t = qt.prototype.optionsToObject.call(this, t),
            Rt(this, t),
            this.options = this.options ? Rt(this.options, t) : t,
            n && (this.y = this[n]),
            this.isNull = null === this.y,
            "number" != typeof this.x && i && (this.x = void 0 === e ? i.autoIncrement() : e),
            this
        },
        optionsToObject: function(t) {
            var e = {}
              , i = this.series
              , n = i.options.keys
              , r = n || i.pointArrayMap || ["y"]
              , o = r.length
              , s = 0
              , h = 0;
            if ("number" == typeof t || null === t)
                e[r[0]] = t;
            else if (a(t))
                for (!n && t.length > o && ("string" === (i = typeof t[0]) ? e.name = t[0] : "number" === i && (e.x = t[0]),
                s++); h < o; )
                    n && void 0 === t[s] || (e[r[h]] = t[s]),
                    s++,
                    h++;
            else
                "object" == typeof t && (e = t,
                t.dataLabels && (i._hasPointLabels = !0),
                t.marker && (i._hasPointMarkers = !0));
            return e
        },
        destroy: function() {
            var t, e = this.series.chart, i = e.hoverPoints;
            for (t in e.pointCount--,
            i && (this.setState(),
            u(i, this),
            i.length || (e.hoverPoints = null)),
            this === e.hoverPoint && this.onMouseOut(),
            (this.graphic || this.dataLabel) && (Lt(this),
            this.destroyElements()),
            this.legendItem && e.legend.destroyItem(this),
            this)
                this[t] = null
        },
        destroyElements: function() {
            for (var t, e = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], i = 6; i--; )
                this[t = e[i]] && (this[t] = this[t].destroy())
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                color: this.color,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function(t) {
            var e = this.series
              , i = e.tooltipOptions
              , n = Nt(i.valueDecimals, "")
              , r = i.valuePrefix || ""
              , o = i.valueSuffix || "";
            return Tt(e.pointArrayMap || ["y"], (function(e) {
                e = "{point." + e,
                (r || o) && (t = t.replace(e + "}", r + e + "}" + o)),
                t = t.replace(e + "}", e + ":,." + n + "f}")
            }
            )),
            b(t, {
                point: this,
                series: this.series
            })
        },
        firePointEvent: function(t, e, i) {
            var n = this
              , r = this.series.options;
            (r.point.events[t] || n.options && n.options.events && n.options.events[t]) && this.importEvents(),
            "click" === t && r.allowPointSelect && (i = function(t) {
                n.select && n.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
            }
            ),
            Mt(this, t, e, i)
        },
        visible: !0
    };
    var Vt = V.Series = function() {}
    ;
    Vt.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: qt,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        directTouch: !1,
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function(t, e) {
            var i, n, r = this, o = t.series, s = function(t, e) {
                return Nt(t.options.index, t._i) - Nt(e.options.index, e._i)
            };
            for (i in r.chart = t,
            r.options = e = r.setOptions(e),
            r.linkedSeries = [],
            r.bindAxes(),
            Rt(r, {
                name: e.name,
                state: "",
                pointAttr: {},
                visible: !1 !== e.visible,
                selected: !0 === e.selected
            }),
            gt && (e.animation = !1),
            n = e.events)
                Bt(r, i, n[i]);
            (n && n.click || e.point && e.point.events && e.point.events.click || e.allowPointSelect) && (t.runTrackerClick = !0),
            r.getColor(),
            r.getSymbol(),
            Tt(r.parallelArrays, (function(t) {
                r[t + "Data"] = []
            }
            )),
            r.setData(e.data, !1),
            r.isCartesian && (t.hasCartesianSeries = !0),
            o.push(r),
            r._i = o.length - 1,
            w(o, s),
            this.yAxis && w(this.yAxis.series, s),
            Tt(o, (function(t, e) {
                t.index = e,
                t.name = t.name || "Series " + (e + 1)
            }
            ))
        },
        bindAxes: function() {
            var t, i = this, n = i.options, r = i.chart;
            Tt(i.axisTypes || [], (function(o) {
                Tt(r[o], (function(e) {
                    t = e.options,
                    (n[o] === t.index || n[o] !== M && n[o] === t.id || n[o] === M && 0 === t.index) && (e.series.push(i),
                    i[o] = e,
                    e.isDirty = !0)
                }
                )),
                i[o] || i.optionalAxis === o || e(18, !0)
            }
            ))
        },
        updateParallelArrays: function(t, e) {
            var i = t.series
              , n = arguments;
            Tt(i.parallelArrays, "number" == typeof e ? function(n) {
                var r = "y" === n && i.toYData ? i.toYData(t) : t[n];
                i[n + "Data"][e] = r
            }
            : function(t) {
                Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(n, 2))
            }
            )
        },
        autoIncrement: function() {
            var t, e = this.options, i = this.xIncrement, n = e.pointIntervalUnit;
            i = Nt(i, e.pointStart, 0);
            return this.pointInterval = t = Nt(this.pointInterval, e.pointInterval, 1),
            "month" !== n && "year" !== n || (e = new D(i),
            t = (e = "month" === n ? +e[U](e[G]() + t) : +e[q](e[Y]() + t)) - i),
            this.xIncrement = i + t,
            i
        },
        setOptions: function(t) {
            var e, i = (e = this.chart).options.plotOptions, r = (e = e.userOptions || {}).plotOptions || {}, o = i[this.type];
            return this.userOptions = t,
            i = n(o, i.series, t),
            this.tooltipOptions = n(I.tooltip, I.plotOptions[this.type].tooltip, e.tooltip, r.series && r.series.tooltip, r[this.type] && r[this.type].tooltip, t.tooltip),
            null === o.marker && delete i.marker,
            this.zoneAxis = i.zoneAxis,
            t = this.zones = (i.zones || []).slice(),
            !i.negativeColor && !i.negativeFillColor || i.zones || t.push({
                value: i[this.zoneAxis + "Threshold"] || i.threshold || 0,
                color: i.negativeColor,
                fillColor: i.negativeFillColor
            }),
            t.length && p(t[t.length - 1].value) && t.push({
                color: this.color,
                fillColor: this.fillColor
            }),
            i
        },
        getCyclic: function(t, e, i) {
            var n = this.userOptions
              , r = "_" + t + "Index"
              , o = t + "Counter";
            e || (p(n[r]) ? e = n[r] : (n[r] = e = this.chart[o] % i.length,
            this.chart[o] += 1),
            e = i[e]),
            this[t] = e
        },
        getColor: function() {
            this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || zt[this.type].color, this.chart.options.colors)
        },
        getSymbol: function() {
            var t = this.options.marker;
            this.getCyclic("symbol", t.symbol, this.chart.options.symbols),
            /^url/.test(this.symbol) && (t.radius = 0)
        },
        drawLegendSymbol: Yt.drawLineMarker,
        setData: function(t, i, n, r) {
            var s, c = this, l = c.points, u = l && l.length || 0, d = c.options, f = c.chart, g = null, m = c.xAxis, y = m && !!m.categories, v = d.turboThreshold, x = this.xData, b = this.yData, w = (s = c.pointArrayMap) && s.length;
            if (s = (t = t || []).length,
            i = Nt(i, !0),
            !1 !== r && s && u === s && !c.cropped && !c.hasGroupedData && c.visible)
                Tt(t, (function(t, e) {
                    l[e].update && t !== d.data[e] && l[e].update(t, !1, null, !1)
                }
                ));
            else {
                if (c.xIncrement = null,
                c.colorCounter = 0,
                Tt(this.parallelArrays, (function(t) {
                    c[t + "Data"].length = 0
                }
                )),
                v && s > v) {
                    for (n = 0; null === g && n < s; )
                        g = t[n],
                        n++;
                    if (h(g)) {
                        for (y = Nt(d.pointStart, 0),
                        g = Nt(d.pointInterval, 1),
                        n = 0; n < s; n++)
                            x[n] = y,
                            b[n] = t[n],
                            y += g;
                        c.xIncrement = y
                    } else if (a(g))
                        if (w)
                            for (n = 0; n < s; n++)
                                g = t[n],
                                x[n] = g[0],
                                b[n] = g.slice(1, w + 1);
                        else
                            for (n = 0; n < s; n++)
                                g = t[n],
                                x[n] = g[0],
                                b[n] = g[1];
                    else
                        e(12)
                } else
                    for (n = 0; n < s; n++)
                        t[n] !== M && (g = {
                            series: c
                        },
                        c.pointClass.prototype.applyOptions.apply(g, [t[n]]),
                        c.updateParallelArrays(g, n),
                        y && p(g.name) && (m.names[g.x] = g.name));
                for (o(b[0]) && e(14, !0),
                c.data = [],
                c.options.data = c.userOptions.data = t,
                n = u; n--; )
                    l[n] && l[n].destroy && l[n].destroy();
                m && (m.minRange = m.userMinRange),
                c.isDirty = c.isDirtyData = f.isDirtyBox = !0,
                n = !1
            }
            "point" === d.legendType && (this.processData(),
            this.generatePoints()),
            i && f.redraw(n)
        },
        processData: function(t) {
            var i, n = this.xData, r = this.yData, o = n.length;
            i = 0;
            var s, a, h, c = this.xAxis;
            h = (f = this.options).cropThreshold;
            var l, u, p = this.getExtremesFromAll || f.getExtremesFromAll, d = this.isCartesian, f = c && c.val2lin, g = c && c.isLog;
            if (d && !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !t)
                return !1;
            for (c && (l = (t = c.getExtremes()).min,
            u = t.max),
            d && this.sorted && !p && (!h || o > h || this.forceCrop) && (n[o - 1] < l || n[0] > u ? (n = [],
            r = []) : (n[0] < l || n[o - 1] > u) && (n = (i = this.cropData(this.xData, this.yData, l, u)).xData,
            r = i.yData,
            i = i.start,
            s = !0)),
            h = n.length || 1; --h; )
                0 < (o = g ? f(n[h]) - f(n[h - 1]) : n[h] - n[h - 1]) && (a === M || o < a) ? a = o : 0 > o && this.requireSorting && e(15);
            this.cropped = s,
            this.cropStart = i,
            this.processedXData = n,
            this.processedYData = r,
            this.closestPointRange = a
        },
        cropData: function(t, e, i, n) {
            var r, o = t.length, s = 0, a = o, h = Nt(this.cropShoulder, 1);
            for (r = 0; r < o; r++)
                if (t[r] >= i) {
                    s = tt(0, r - h);
                    break
                }
            for (i = r; i < o; i++)
                if (t[i] > n) {
                    a = i + h;
                    break
                }
            return {
                xData: t.slice(s, a),
                yData: e.slice(s, a),
                start: s,
                end: a
            }
        },
        generatePoints: function() {
            var t, e, i, n, r = this.options.data, o = this.data, s = this.processedXData, a = this.processedYData, h = this.pointClass, c = s.length, l = this.cropStart || 0, u = this.hasGroupedData, p = [];
            for (o || u || ((o = []).length = r.length,
            o = this.data = o),
            n = 0; n < c; n++)
                e = l + n,
                u ? p[n] = (new h).init(this, [s[n]].concat(f(a[n]))) : (o[e] ? i = o[e] : r[e] !== M && (o[e] = i = (new h).init(this, r[e], s[n])),
                p[n] = i),
                p[n].index = e;
            if (o && (c !== (t = o.length) || u))
                for (n = 0; n < t; n++)
                    n !== l || u || (n += c),
                    o[n] && (o[n].destroyElements(),
                    o[n].plotX = M);
            this.data = o,
            this.points = p
        },
        getExtremes: function(t) {
            var e, i, n, r, o, s = this.yAxis, a = this.processedXData, h = [], c = 0, l = (e = this.xAxis.getExtremes()).min, u = e.max;
            for (e = (t = t || this.stackedYData || this.processedYData).length,
            o = 0; o < e; o++)
                if (n = a[o],
                i = null !== (r = t[o]) && r !== M && (!s.isLog || r.length || 0 < r),
                n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (a[o + 1] || n) >= l && (a[o - 1] || n) <= u,
                i && n)
                    if (i = r.length)
                        for (; i--; )
                            null !== r[i] && (h[c++] = r[i]);
                    else
                        h[c++] = r;
            this.dataMin = k(h),
            this.dataMax = C(h)
        },
        translate: function() {
            this.processedXData || this.processData(),
            this.generatePoints();
            for (var t, i, n, r, o = (x = this.options).stacking, s = this.xAxis, a = s.categories, c = this.yAxis, l = this.points, u = l.length, d = !!this.modifyValue, f = x.pointPlacement, g = "between" === f || h(f), m = x.threshold, y = x.startFromThreshold ? m : 0, v = Number.MAX_VALUE, x = 0; x < u; x++) {
                var b = l[x]
                  , w = b.x
                  , k = b.y;
                i = b.low;
                var C = o && c.stacks[(this.negStacks && k < (y ? 0 : m) ? "-" : "") + this.stackKey];
                c.isLog && null !== k && 0 >= k && (b.y = k = null,
                e(10)),
                b.plotX = t = et(tt(-1e5, s.translate(w, 0, 0, 0, 1, f, "flags" === this.type)), 1e5),
                o && this.visible && !b.isNull && C && C[w] && (r = this.getStackIndicator(r, w, this.index),
                i = (k = (C = C[w]).points[r.key])[0],
                k = k[1],
                i === y && (i = Nt(m, c.min)),
                c.isLog && 0 >= i && (i = null),
                b.total = b.stackTotal = C.total,
                b.percentage = C.total && b.y / C.total * 100,
                b.stackY = k,
                C.setOffset(this.pointXOffset || 0, this.barW || 0)),
                b.yBottom = p(i) ? c.translate(i, 0, 1, 0, 1) : null,
                d && (k = this.modifyValue(k, b)),
                b.plotY = i = "number" == typeof k && 1 / 0 !== k ? et(tt(-1e5, c.translate(k, 0, 1, 0, 1)), 1e5) : M,
                b.isInside = i !== M && 0 <= i && i <= c.len && 0 <= t && t <= s.len,
                b.clientX = g ? s.translate(w, 0, 0, 0, 1) : t,
                b.negative = b.y < (m || 0),
                b.category = a && a[b.x] !== M ? a[b.x] : b.x,
                x && (v = et(v, it(t - n))),
                n = t
            }
            this.closestPointRangePx = v
        },
        getValidPoints: function(t) {
            return St(t || this.points, (function(t) {
                return !t.isNull
            }
            ))
        },
        setClip: function(t) {
            var e = this.chart
              , i = this.options
              , n = e.renderer
              , r = e.inverted
              , o = this.clipBox
              , s = o || e.clipBox
              , a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, s.height, i.xAxis, i.yAxis].join()
              , h = e[a]
              , c = e[a + "m"];
            h || (t && (s.width = 0,
            e[a + "m"] = c = n.clipRect(-99, r ? -e.plotLeft : -e.plotTop, 99, r ? e.chartWidth : e.chartHeight)),
            e[a] = h = n.clipRect(s)),
            t && (h.count += 1),
            !1 !== i.clip && (this.group.clip(t || o ? h : e.clipRect),
            this.markerGroup.clip(c),
            this.sharedClipKey = a),
            t || (--h.count,
            0 >= h.count && a && e[a] && (o || (e[a] = e[a].destroy()),
            e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
        },
        animate: function(t) {
            var e, i = this.chart, n = this.options.animation;
            n && !s(n) && (n = zt[this.type].animation),
            t ? this.setClip(n) : ((t = i[e = this.sharedClipKey]) && t.animate({
                width: i.plotSizeX
            }, n),
            i[e + "m"] && i[e + "m"].animate({
                width: i.plotSizeX + 99
            }, n),
            this.animate = null)
        },
        afterAnimate: function() {
            this.setClip(),
            Mt(this, "afterAnimate")
        },
        drawPoints: function() {
            var t, e, i, n, r, o, s, a, h, c, l, u, p = this.points, d = this.chart, f = this.options.marker, g = this.pointAttr[""], m = this.markerGroup, y = Nt(f.enabled, this.xAxis.isRadial, this.closestPointRangePx > 2 * f.radius);
            if (!1 !== f.enabled || this._hasPointMarkers)
                for (n = p.length; n--; )
                    r = p[n],
                    e = J(r.plotX),
                    i = r.plotY,
                    h = r.graphic,
                    c = r.marker || {},
                    l = !!r.marker,
                    t = y && c.enabled === M || c.enabled,
                    u = r.isInside,
                    t && i !== M && !isNaN(i) && null !== r.y ? (o = (t = r.pointAttr[r.selected ? "select" : ""] || g).r,
                    a = 0 === (s = Nt(c.symbol, this.symbol)).indexOf("url"),
                    h ? h[u ? "show" : "hide"](!0).attr(t).animate(Rt({
                        x: e - o,
                        y: i - o
                    }, h.symbolName ? {
                        width: 2 * o,
                        height: 2 * o
                    } : {})) : u && (0 < o || a) && (r.graphic = d.renderer.symbol(s, e - o, i - o, 2 * o, 2 * o, l ? c : f).attr(t).add(m))) : h && (r.graphic = h.destroy())
        },
        convertAttribs: function(t, e, i, n) {
            var r, o, s = this.pointAttrToOptions, a = {};
            for (r in t = t || {},
            e = e || {},
            i = i || {},
            n = n || {},
            s)
                o = s[r],
                a[r] = Nt(t[o], e[r], i[r], n[r]);
            return a
        },
        getAttribs: function() {
            var t, e = this, i = e.options, n = zt[e.type].marker ? i.marker : i, r = n.states, o = r.hover, s = e.color, a = e.options.negativeColor;
            t = {
                stroke: s,
                fill: s
            };
            var h, c, l = e.points || [], u = [], d = e.pointAttrToOptions;
            h = e.hasPointSpecificOptions;
            var f = n.lineColor
              , g = n.fillColor;
            c = i.turboThreshold;
            var m, y = e.zones, v = e.zoneAxis || "y";
            if (i.marker ? (o.radius = o.radius || n.radius + o.radiusPlus,
            o.lineWidth = o.lineWidth || n.lineWidth + o.lineWidthPlus) : (o.color = o.color || E(o.color || s).brighten(o.brightness).get(),
            o.negativeColor = o.negativeColor || E(o.negativeColor || a).brighten(o.brightness).get()),
            u[""] = e.convertAttribs(n, t),
            Tt(["hover", "select"], (function(t) {
                u[t] = e.convertAttribs(r[t], u[""])
            }
            )),
            e.pointAttr = u,
            s = l.length,
            !c || s < c || h)
                for (; s--; ) {
                    if ((n = (c = l[s]).options && c.options.marker || c.options) && !1 === n.enabled && (n.radius = 0),
                    y.length) {
                        for (t = y[h = 0]; c[v] >= t.value; )
                            t = y[++h];
                        c.color = c.fillColor = Nt(t.color, e.color)
                    }
                    if (h = i.colorByPoint || c.color,
                    c.options)
                        for (m in d)
                            p(n[d[m]]) && (h = !0);
                    h ? (h = [],
                    t = (r = (n = n || {}).states || {}).hover = r.hover || {},
                    i.marker && (!c.negative || t.fillColor || o.fillColor) || (t[e.pointAttrToOptions.fill] = t.color || !c.options.color && o[c.negative && a ? "negativeColor" : "color"] || E(c.color).brighten(t.brightness || o.brightness).get()),
                    t = {
                        color: c.color
                    },
                    g || (t.fillColor = c.color),
                    f || (t.lineColor = c.color),
                    n.hasOwnProperty("color") && !n.color && delete n.color,
                    h[""] = e.convertAttribs(Rt(t, n), u[""]),
                    h.hover = e.convertAttribs(r.hover, u.hover, h[""]),
                    h.select = e.convertAttribs(r.select, u.select, h[""])) : h = u,
                    c.pointAttr = h
                }
        },
        destroy: function() {
            var t, e, i, n, r = this, o = r.chart, s = /AppleWebKit\/533/.test(at), a = r.data || [];
            for (Mt(r, "destroy"),
            Lt(r),
            Tt(r.axisTypes || [], (function(t) {
                (n = r[t]) && (u(n.series, r),
                n.isDirty = n.forceRedraw = !0)
            }
            )),
            r.legendItem && r.chart.legend.destroyItem(r),
            t = a.length; t--; )
                (e = a[t]) && e.destroy && e.destroy();
            for (i in r.points = null,
            clearTimeout(r.animationTimeout),
            r)
                r[i]instanceof B && !r[i].survive && (t = s && "group" === i ? "hide" : "destroy",
                r[i][t]());
            for (i in o.hoverSeries === r && (o.hoverSeries = null),
            u(o.series, r),
            r)
                delete r[i]
        },
        getGraphPath: function(t, e, i) {
            var n, r, o = this, s = o.options, a = s.step, h = [];
            return (n = (t = t || o.points).reversed) && t.reverse(),
            (a = {
                right: 1,
                center: 2
            }[a] || a && 3) && n && (a = 4 - a),
            !s.connectNulls || e || i || (t = this.getValidPoints(t)),
            Tt(t, (function(n, c) {
                var l = n.plotX
                  , u = n.plotY
                  , d = t[c - 1];
                (n.leftCliff || d && d.rightCliff) && !i && (r = !0),
                n.isNull && !p(e) && 0 < c ? r = !s.connectNulls : n.isNull && !e ? r = !0 : (0 === c || r ? d = ["M", n.plotX, n.plotY] : o.getPointSpline ? d = o.getPointSpline(t, n, c) : a ? (d = 1 === a ? ["L", d.plotX, u] : 2 === a ? ["L", (d.plotX + l) / 2, d.plotY, "L", (d.plotX + l) / 2, u] : ["L", l, d.plotY]).push("L", l, u) : d = ["L", l, u],
                h.push.apply(h, d),
                r = !1)
            }
            )),
            o.graphPath = h
        },
        drawGraph: function() {
            var t = this
              , e = this.options
              , i = [["graph", e.lineColor || this.color, e.dashStyle]]
              , n = e.lineWidth
              , r = "square" !== e.linecap
              , o = (this.gappedPath || this.getGraphPath).call(this)
              , s = this.fillGraph && this.color || "none";
            Tt(this.zones, (function(n, r) {
                i.push(["zoneGraph" + r, n.color || t.color, n.dashStyle || e.dashStyle])
            }
            )),
            Tt(i, (function(i, a) {
                var h = i[0]
                  , c = t[h];
                c ? c.animate({
                    d: o
                }) : (n || s) && o.length && (c = {
                    stroke: i[1],
                    "stroke-width": n,
                    fill: s,
                    zIndex: 1
                },
                i[2] ? c.dashstyle = i[2] : r && (c["stroke-linecap"] = c["stroke-linejoin"] = "round"),
                t[h] = t.chart.renderer.path(o).attr(c).add(t.group).shadow(2 > a && e.shadow))
            }
            ))
        },
        applyZones: function() {
            var t, e, i, n, r, o, s, a = this, h = this.chart, c = h.renderer, l = this.zones, u = this.clips || [], p = this.graph, d = this.area, f = tt(h.chartWidth, h.chartHeight), g = this[(this.zoneAxis || "y") + "Axis"], m = g.reversed, y = h.inverted, v = g.horiz, x = !1;
            l.length && (p || d) && g.min !== M && (p && p.hide(),
            d && d.hide(),
            n = g.getExtremes(),
            Tt(l, (function(l, b) {
                t = m ? v ? h.plotWidth : 0 : v ? 0 : g.toPixels(n.min),
                t = et(tt(Nt(e, t), 0), f),
                e = et(tt(K(g.toPixels(Nt(l.value, n.max), !0)), 0), f),
                x && (t = e = g.toPixels(n.max)),
                r = Math.abs(t - e),
                o = et(t, e),
                s = tt(t, e),
                g.isXAxis ? (i = {
                    x: y ? s : o,
                    y: 0,
                    width: r,
                    height: f
                },
                v || (i.x = h.plotHeight - i.x)) : (i = {
                    x: 0,
                    y: y ? s : o,
                    width: f,
                    height: r
                },
                v && (i.y = h.plotWidth - i.y)),
                h.inverted && c.isVML && (i = g.isXAxis ? {
                    x: 0,
                    y: m ? o : s,
                    height: i.width,
                    width: h.chartWidth
                } : {
                    x: i.y - h.plotLeft - h.spacingBox.x,
                    y: 0,
                    width: i.height,
                    height: h.chartHeight
                }),
                u[b] ? u[b].animate(i) : (u[b] = c.clipRect(i),
                p && a["zoneGraph" + b].clip(u[b]),
                d && a["zoneArea" + b].clip(u[b])),
                x = l.value > n.max
            }
            )),
            this.clips = u)
        },
        invertGroups: function() {
            function t() {
                var t = {
                    width: e.yAxis.len,
                    height: e.xAxis.len
                };
                Tt(["group", "markerGroup"], (function(i) {
                    e[i] && e[i].attr(t).invert()
                }
                ))
            }
            var e = this
              , i = e.chart;
            e.xAxis && (Bt(i, "resize", t),
            Bt(e, "destroy", (function() {
                Lt(i, "resize", t)
            }
            )),
            t(),
            e.invertGroups = t)
        },
        plotGroup: function(t, e, i, n, r) {
            var o = this[t]
              , s = !o;
            return s && (this[t] = o = this.chart.renderer.g(e).attr({
                zIndex: n || .1
            }).add(r),
            o.addClass("highcharts-series-" + this.index)),
            o.attr({
                visibility: i
            })[s ? "attr" : "animate"](this.getPlotBox()),
            o
        },
        getPlotBox: function() {
            var t = this.chart
              , e = this.xAxis
              , i = this.yAxis;
            return t.inverted && (e = i,
            i = this.xAxis),
            {
                translateX: e ? e.left : t.plotLeft,
                translateY: i ? i.top : t.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function() {
            var t, e = this, i = e.chart, n = e.options, r = (t = n.animation) && !!e.animate && i.renderer.isSVG && Nt(t.duration, 500) || 0, o = e.visible ? "inherit" : "hidden", s = n.zIndex, a = e.hasRendered, h = i.seriesGroup;
            t = e.plotGroup("group", "series", o, s, h),
            e.markerGroup = e.plotGroup("markerGroup", "markers", o, s, h),
            r && e.animate(!0),
            e.getAttribs(),
            t.inverted = !!e.isCartesian && i.inverted,
            e.drawGraph && (e.drawGraph(),
            e.applyZones()),
            Tt(e.points, (function(t) {
                t.redraw && t.redraw()
            }
            )),
            e.drawDataLabels && e.drawDataLabels(),
            e.visible && e.drawPoints(),
            e.drawTracker && !1 !== e.options.enableMouseTracking && e.drawTracker(),
            i.inverted && e.invertGroups(),
            !1 === n.clip || e.sharedClipKey || a || t.clip(i.clipRect),
            r && e.animate(),
            a || (e.animationTimeout = g((function() {
                e.afterAnimate()
            }
            ), r)),
            e.isDirty = e.isDirtyData = !1,
            e.hasRendered = !0
        },
        redraw: function() {
            var t = this.chart
              , e = this.isDirtyData
              , i = this.isDirty
              , n = this.group
              , r = this.xAxis
              , o = this.yAxis;
            n && (t.inverted && n.attr({
                width: t.plotWidth,
                height: t.plotHeight
            }),
            n.animate({
                translateX: Nt(r && r.left, t.plotLeft),
                translateY: Nt(o && o.top, t.plotTop)
            })),
            this.translate(),
            this.render(),
            e && Mt(this, "updatedData"),
            (i || e) && delete this.kdTree
        },
        kdDimensions: 1,
        kdAxisArray: ["clientX", "plotY"],
        searchPoint: function(t, e) {
            var i = this.xAxis
              , n = this.yAxis
              , r = this.chart.inverted;
            return this.searchKDTree({
                clientX: r ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                plotY: r ? n.len - t.chartX + n.pos : t.chartY - n.pos
            }, e)
        },
        buildKDTree: function() {
            function t(i, n, r) {
                var o, s;
                if (s = i && i.length)
                    return o = e.kdAxisArray[n % r],
                    i.sort((function(t, e) {
                        return t[o] - e[o]
                    }
                    )),
                    {
                        point: i[s = Math.floor(s / 2)],
                        left: t(i.slice(0, s), n + 1, r),
                        right: t(i.slice(s + 1), n + 1, r)
                    }
            }
            var e = this
              , i = e.kdDimensions;
            delete e.kdTree,
            g((function() {
                e.kdTree = t(e.getValidPoints(), i, i)
            }
            ), e.options.kdNow ? 0 : 1)
        },
        searchKDTree: function(t, e) {
            var i = this
              , n = this.kdAxisArray[0]
              , r = this.kdAxisArray[1]
              , o = e ? "distX" : "dist";
            if (this.kdTree || this.buildKDTree(),
            this.kdTree)
                return function t(e, s, a, h) {
                    var c, l, u = s.point, d = i.kdAxisArray[a % h], f = u;
                    return c = ((l = p(e[n]) && p(u[n]) ? Math.pow(e[n] - u[n], 2) : null) || 0) + ((c = p(e[r]) && p(u[r]) ? Math.pow(e[r] - u[r], 2) : null) || 0),
                    u.dist = p(c) ? Math.sqrt(c) : Number.MAX_VALUE,
                    u.distX = p(l) ? Math.sqrt(l) : Number.MAX_VALUE,
                    l = 0 > (d = e[d] - u[d]) ? "right" : "left",
                    s[c = 0 > d ? "left" : "right"] && (f = (c = t(e, s[c], a + 1, h))[o] < f[o] ? c : u),
                    s[l] && Math.sqrt(d * d) < f[o] && (f = (e = t(e, s[l], a + 1, h))[o] < f[o] ? e : f),
                    f
                }(t, this.kdTree, this.kdDimensions, this.kdDimensions)
        }
    };
    var $t = v(Vt);
    kt.line = $t;
    var Zt = V.TrackerMixin = {
        drawTrackerPoint: function() {
            var t = this
              , e = t.chart
              , i = e.pointer
              , n = t.options.cursor
              , r = n && {
                cursor: n
            }
              , o = function(t) {
                for (var i, n = t.target; n && !i; )
                    i = n.point,
                    n = n.parentNode;
                i !== M && i !== e.hoverPoint && i.onMouseOver(t)
            };
            Tt(t.points, (function(t) {
                t.graphic && (t.graphic.element.point = t),
                t.dataLabel && (t.dataLabel.element.point = t)
            }
            )),
            t._hasTracking || (Tt(t.trackerGroups, (function(e) {
                t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", (function(t) {
                    i.onTrackerMouseOut(t)
                }
                )).css(r),
                F) && t[e].on("touchstart", o)
            }
            )),
            t._hasTracking = !0)
        },
        drawTrackerGraph: function() {
            var t = this
              , e = t.options
              , i = e.trackByArea
              , n = [].concat(i ? t.areaPath : t.graphPath)
              , r = n.length
              , o = t.chart
              , s = o.pointer
              , a = o.renderer
              , h = o.options.tooltip.snap
              , c = t.tracker
              , l = e.cursor
              , u = l && {
                cursor: l
            }
              , p = function() {
                o.hoverSeries !== t && t.onMouseOver()
            }
              , d = "rgba(192,192,192," + (dt ? 1e-4 : .002) + ")";
            if (r && !i)
                for (l = r + 1; l--; )
                    "M" === n[l] && n.splice(l + 1, 0, n[l + 1] - h, n[l + 2], "L"),
                    (l && "M" === n[l] || l === r) && n.splice(l, 0, "L", n[l - 2] + h, n[l - 1]);
            c ? c.attr({
                d: n
            }) : (t.tracker = a.path(n).attr({
                "stroke-linejoin": "round",
                visibility: t.visible ? "visible" : "hidden",
                stroke: d,
                fill: i ? d : "none",
                "stroke-width": e.lineWidth + (i ? 0 : 2 * h),
                zIndex: 2
            }).add(t.group),
            Tt([t.tracker, t.markerGroup], (function(t) {
                t.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", (function(t) {
                    s.onTrackerMouseOut(t)
                }
                )).css(u),
                F && t.on("touchstart", p)
            }
            )))
        }
    };
    return kt.column && (ColumnSeries.prototype.drawTracker = Zt.drawTrackerPoint),
    kt.pie && (kt.pie.prototype.drawTracker = Zt.drawTrackerPoint),
    kt.scatter && (ScatterSeries.prototype.drawTracker = Zt.drawTrackerPoint),
    Rt(Gt.prototype, {
        setItemEvents: function(t, e, i, n, r) {
            var o = this;
            (i ? e : t.legendGroup).on("mouseover", (function() {
                t.setState("hover"),
                e.css(o.options.itemHoverStyle)
            }
            )).on("mouseout", (function() {
                e.css(t.visible ? n : r),
                t.setState()
            }
            )).on("click", (function(e) {
                var i = function() {
                    t.setVisible && t.setVisible()
                };
                e = {
                    browserEvent: e
                },
                t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : Mt(t, "legendItemClick", e, i)
            }
            ))
        },
        createCheckboxForItem: function(t) {
            t.checkbox = y("input", {
                type: "checkbox",
                checked: t.selected,
                defaultChecked: t.selected
            }, this.options.itemCheckboxStyle, this.chart.container),
            Bt(t.checkbox, "click", (function(e) {
                Mt(t.series || t, "checkboxClick", {
                    checked: e.target.checked,
                    item: t
                }, (function() {
                    t.select()
                }
                ))
            }
            ))
        }
    }),
    I.legend.itemStyle.cursor = "pointer",
    Rt(Ut.prototype, {
        showResetZoom: function() {
            var t = this
              , e = I.lang
              , i = t.options.chart.resetZoomButton
              , n = i.theme
              , r = n.states
              , o = "chart" === i.relativeTo ? null : "plotBox";
            this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, (function() {
                t.zoomOut()
            }
            ), n, r && r.hover).attr({
                align: i.position.align,
                title: e.resetZoomTitle
            }).add().align(i.position, !1, o)
        },
        zoomOut: function() {
            var t = this;
            Mt(t, "selection", {
                resetSelection: !0
            }, (function() {
                t.zoom()
            }
            ))
        },
        zoom: function(t) {
            var e, i, n = this.pointer, r = !1;
            !t || t.resetSelection ? Tt(this.axes, (function(t) {
                e = t.zoom()
            }
            )) : Tt(t.xAxis.concat(t.yAxis), (function(t) {
                var i = t.axis
                  , o = i.isXAxis;
                (n[o ? "zoomX" : "zoomY"] || n[o ? "pinchX" : "pinchY"]) && (e = i.zoom(t.min, t.max),
                i.displayBtn && (r = !0))
            }
            )),
            i = this.resetZoomButton,
            r && !i ? this.showResetZoom() : !r && s(i) && (this.resetZoomButton = i.destroy()),
            e && this.redraw(Nt(this.options.chart.animation, t && t.animation, 100 > this.pointCount))
        },
        pan: function(t, e) {
            var i, n = this, r = n.hoverPoints;
            r && Tt(r, (function(t) {
                t.setState()
            }
            )),
            Tt("xy" === e ? [1, 0] : [1], (function(e) {
                var r = (e = n[e ? "xAxis" : "yAxis"][0]).horiz
                  , o = t[r ? "chartX" : "chartY"]
                  , s = n[r = r ? "mouseDownX" : "mouseDownY"]
                  , a = (e.pointRange || 0) / 2
                  , h = e.getExtremes()
                  , c = e.toValue(s - o, !0) + a;
                a = e.toValue(s + e.len - o, !0) - a,
                s = s > o;
                e.series.length && (s || c > et(h.dataMin, h.min)) && (!s || a < tt(h.dataMax, h.max)) && (e.setExtremes(c, a, !1, !1, {
                    trigger: "pan"
                }),
                i = !0),
                n[r] = o
            }
            )),
            i && n.redraw(!1),
            m(n.container, {
                cursor: "move"
            })
        }
    }),
    Rt(qt.prototype, {
        select: function(t, e) {
            var i = this
              , n = i.series
              , r = n.chart;
            t = Nt(t, !i.selected),
            i.firePointEvent(t ? "select" : "unselect", {
                accumulate: e
            }, (function() {
                i.selected = i.options.selected = t,
                n.options.data[At(i, n.data)] = i.options,
                i.setState(t && "select"),
                e || Tt(r.getSelectedPoints(), (function(t) {
                    t.selected && t !== i && (t.selected = t.options.selected = !1,
                    n.options.data[At(t, n.data)] = t.options,
                    t.setState(""),
                    t.firePointEvent("unselect"))
                }
                ))
            }
            ))
        },
        onMouseOver: function(t, e) {
            var i = this.series
              , n = i.chart
              , r = n.tooltip
              , o = n.hoverPoint;
            n.hoverSeries !== i && i.onMouseOver(),
            o && o !== this && o.onMouseOut(),
            this.series && (this.firePointEvent("mouseOver"),
            !r || r.shared && !i.noSharedTooltip || r.refresh(this, t),
            this.setState("hover"),
            e || (n.hoverPoint = this))
        },
        onMouseOut: function() {
            var t = this.series.chart
              , e = t.hoverPoints;
            this.firePointEvent("mouseOut"),
            e && -1 !== At(this, e) || (this.setState(),
            t.hoverPoint = null)
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var t, e = n(this.series.options.point, this.options).events;
                for (t in this.events = e,
                e)
                    Bt(this, t, e[t]);
                this.hasImportedEvents = !0
            }
        },
        setState: function(t, e) {
            var i, r = J(this.plotX), o = this.plotY, s = this.series, a = s.options.states, h = zt[s.type].marker && s.options.marker, c = h && !h.enabled, l = h && h.states[t], u = l && !1 === l.enabled, p = s.stateMarkerGraphic, d = this.marker || {}, f = s.chart, g = s.halo;
            t = t || "",
            i = this.pointAttr[t] || s.pointAttr[t],
            t === this.state && !e || this.selected && "select" !== t || a[t] && !1 === a[t].enabled || t && (u || c && !1 === l.enabled) || t && d.states && d.states[t] && !1 === d.states[t].enabled || (this.graphic ? (h = h && this.graphic.symbolName && i.r,
            this.graphic.attr(n(i, h ? {
                x: r - h,
                y: o - h,
                width: 2 * h,
                height: 2 * h
            } : {})),
            p && p.hide()) : (t && l && (h = l.radius,
            d = d.symbol || s.symbol,
            p && p.currentSymbol !== d && (p = p.destroy()),
            p ? p[e ? "animate" : "attr"]({
                x: r - h,
                y: o - h
            }) : d && (s.stateMarkerGraphic = p = f.renderer.symbol(d, r - h, o - h, 2 * h, 2 * h).attr(i).add(s.markerGroup),
            p.currentSymbol = d)),
            p && (p[t && f.isInsidePlot(r, o, f.inverted) ? "show" : "hide"](),
            p.element.point = this)),
            (r = a[t] && a[t].halo) && r.size ? (g || (s.halo = g = f.renderer.path().add(f.seriesGroup)),
            g.attr(Rt({
                fill: this.color || s.color,
                "fill-opacity": r.opacity,
                zIndex: -1
            }, r.attributes))[e ? "animate" : "attr"]({
                d: this.haloPath(r.size)
            })) : g && g.attr({
                d: []
            }),
            this.state = t)
        },
        haloPath: function(t) {
            var e = this.series
              , i = e.chart
              , n = e.getPlotBox()
              , r = i.inverted
              , o = Math.floor(this.plotX);
            return i.renderer.symbols.circle(n.translateX + (r ? e.yAxis.len - this.plotY : o) - t, n.translateY + (r ? e.xAxis.len - o : this.plotY) - t, 2 * t, 2 * t)
        }
    }),
    Rt(Vt.prototype, {
        onMouseOver: function() {
            var t = this.chart
              , e = t.hoverSeries;
            e && e !== this && e.onMouseOut(),
            this.options.events.mouseOver && Mt(this, "mouseOver"),
            this.setState("hover"),
            t.hoverSeries = this
        },
        onMouseOut: function() {
            var t = this.options
              , e = this.chart
              , i = e.tooltip
              , n = e.hoverPoint;
            e.hoverSeries = null,
            n && n.onMouseOut(),
            this && t.events.mouseOut && Mt(this, "mouseOut"),
            !i || t.stickyTracking || i.shared && !this.noSharedTooltip || i.hide(),
            this.setState()
        },
        setState: function(t) {
            var e = this.options
              , i = this.graph
              , n = e.states
              , r = e.lineWidth;
            e = 0;
            if (t = t || "",
            this.state !== t && (this.state = t,
            !n[t] || !1 !== n[t].enabled) && (t && (r = n[t].lineWidth || r + (n[t].lineWidthPlus || 0)),
            i && !i.dashstyle))
                for (t = {
                    "stroke-width": r
                },
                i.attr(t); this["zoneGraph" + e]; )
                    this["zoneGraph" + e].attr(t),
                    e += 1
        },
        setVisible: function(t, e) {
            var i, n = this, r = n.chart, o = n.legendItem, s = r.options.chart.ignoreHiddenSeries, a = n.visible;
            i = (n.visible = t = n.userOptions.visible = t === M ? !a : t) ? "show" : "hide",
            Tt(["group", "dataLabelsGroup", "markerGroup", "tracker"], (function(t) {
                n[t] && n[t][i]()
            }
            )),
            r.hoverSeries !== n && (r.hoverPoint && r.hoverPoint.series) !== n || n.onMouseOut(),
            o && r.legend.colorizeItem(n, t),
            n.isDirty = !0,
            n.options.stacking && Tt(r.series, (function(t) {
                t.options.stacking && t.visible && (t.isDirty = !0)
            }
            )),
            Tt(n.linkedSeries, (function(e) {
                e.setVisible(t, !1)
            }
            )),
            s && (r.isDirtyBox = !0),
            !1 !== e && r.redraw(),
            Mt(n, i)
        },
        show: function() {
            this.setVisible(!0)
        },
        hide: function() {
            this.setVisible(!1)
        },
        select: function(t) {
            this.selected = t = t === M ? !this.selected : t,
            this.checkbox && (this.checkbox.checked = t),
            Mt(this, t ? "select" : "unselect")
        },
        drawTracker: Zt.drawTrackerGraph
    }),
    Rt(V, {
        Color: E,
        Point: qt,
        Tick: L,
        Renderer: Ht,
        SVGElement: B,
        SVGRenderer: Ht,
        arrayMin: k,
        arrayMax: C,
        charts: vt,
        dateFormat: R,
        error: e,
        format: b,
        pathAnim: void 0,
        getOptions: function() {
            return I
        },
        hasBidiBug: ft,
        isTouchDevice: pt,
        setOptions: function(t) {
            return I = n(!0, I, t),
            P(),
            I
        },
        addEvent: Bt,
        removeEvent: Lt,
        createElement: y,
        discardElement: T,
        css: m,
        each: Tt,
        map: Et,
        merge: n,
        splat: f,
        stableSort: w,
        extendClass: v,
        pInt: r,
        svg: dt,
        canvas: gt,
        vml: !dt && !gt,
        product: "Highcharts 4.2.3",
        version: "/Highstock 4.2.3"
    }),
    V
}
)),
function() {
    if (-1 !== document.title.indexOf("Home")) {
        var t = [];
        document.addEventListener("keydown", (function(e) {
            t.push(e.keyCode),
            t.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0 && (t = [],
            document.getElementsByTagName("header")[0].getElementsByTagName("h1")[0].innerHTML = "Random Lego Generator",
            document.getElementsByTagName("body")[0].className += " lego",
            window.scrollTo(0, 0),
            getNewUser())
        }
        ))
    }
}(),
domready((function() {
    !function(t, e, i) {
        for (var n = e.split(" "), r = 0, o = n.length; r < o; r++)
            t.addEventListener(n[r], i, !1)
    }(document.getElementsByClassName("nav_toggle")[0], "touchstart click", (function() {
        document.getElementsByTagName("body")[0].classList.toggle("active")
    }
    )),
    window.addEventListener("resize", (function() {
        document.body.clientWidth > 1145 && (document.getElementsByTagName("body")[0].className = document.getElementsByTagName("body")[0].className.replace(/\bactive\b/, ""))
    }
    ))
}
)),
function() {
    function t(t) {
        return function(t) {
            for (var e, i, n = t.length; n; )
                i = Math.floor(Math.random() * n--),
                e = t[n],
                t[n] = t[i],
                t[i] = e;
            return t
        }(new Array(t).fill(0).map((function(t, e) {
            return e
        }
        )))
    }
    window.location.href.match(/photos$/) && domready((function() {
        for (var e = function(t, e) {
            var i = document.createElement("img");
            i.src = "https://randomuser.me/api/portraits/" + e + "/" + t + ".jpg",
            i.setAttribute("data-int", t),
            i.setAttribute("data-gender", e),
            document.getElementById("photos_" + e).appendChild(i)
        }, i = t(95), n = t(95), r = t(9), o = 0; o <= 99; o++)
            e(i[o], "men");
        for (o = 0; o <= 95; o++)
            e(n[o], "women");
        for (o = 0; o <= 9; o++)
            e(r[o], "lego");
        Array.prototype.slice.call(document.getElementsByTagName("img")).forEach((function(t) {
            t.addEventListener("load", (function() {
                this.className += " come_in",
                t.removeEventListener("load", (function() {}
                ))
            }
            )),
            t.addEventListener("click", (function() {
                document.getElementById("large_img").setAttribute("src", "https://randomuser.me/api/portraits/" + this.getAttribute("data-gender") + "/" + this.getAttribute("data-int") + ".jpg"),
                function(t, e) {
                    t.style.opacity = 0,
                    t.style.display = e || "block",
                    function e() {
                        var i = parseFloat(t.style.opacity);
                        (i += .1) > 1 || (t.style.opacity = i,
                        requestAnimationFrame(e))
                    }()
                }(document.getElementsByClassName("modal_mask")[0])
            }
            ))
        }
        )),
        document.getElementsByClassName("modal_mask")[0].addEventListener("click", (function() {
            var t;
            document.getElementsByClassName("modal_mask")[0],
            (t = document.getElementsByClassName("modal_mask")[0]).style.opacity = 1,
            function e() {
                (t.style.opacity -= .1) < 0 ? t.style.display = "none" : requestAnimationFrame(e)
            }()
        }
        ))
    }
    ))
}(),
function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.io = e() : t.io = e()
}(this, (function() {
    return function(t) {
        function e(n) {
            if (i[n])
                return i[n].exports;
            var r = i[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return t[n].call(r.exports, r, r.exports, e),
            r.loaded = !0,
            r.exports
        }
        var i = {};
        return e.m = t,
        e.c = i,
        e.p = "",
        e(0)
    }([function(t, e, i) {
        function n(t, e) {
            "object" == typeof t && (e = t,
            t = void 0),
            e = e || {};
            var i, n = r(t), o = n.source, c = n.id, l = n.path, u = h[c] && l in h[c].nsps;
            return e.forceNew || e["force new connection"] || !1 === e.multiplex || u ? (a("ignoring socket cache for %s", o),
            i = s(o, e)) : (h[c] || (a("new io instance for %s", o),
            h[c] = s(o, e)),
            i = h[c]),
            n.query && !e.query && (e.query = n.query),
            i.socket(n.path, e)
        }
        var r = i(1)
          , o = i(7)
          , s = i(15)
          , a = i(3)("socket.io-client");
        t.exports = e = n;
        var h = e.managers = {};
        e.protocol = o.protocol,
        e.connect = n,
        e.Manager = i(15),
        e.Socket = i(39)
    }
    , function(t, e, i) {
        var n = i(2)
          , r = i(3)("socket.io-client:url");
        t.exports = function(t, e) {
            var i = t;
            e = e || "undefined" != typeof location && location,
            null == t && (t = e.protocol + "//" + e.host),
            "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t),
            /^(https?|wss?):\/\//.test(t) || (r("protocol-less url %s", t),
            t = void 0 !== e ? e.protocol + "//" + t : "https://" + t),
            r("parse %s", t),
            i = n(t)),
            i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")),
            i.path = i.path || "/";
            var o = -1 !== i.host.indexOf(":") ? "[" + i.host + "]" : i.host;
            return i.id = i.protocol + "://" + o + ":" + i.port,
            i.href = i.protocol + "://" + o + (e && e.port === i.port ? "" : ":" + i.port),
            i
        }
    }
    , function(t, e) {
        var i = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
          , n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        t.exports = function(t) {
            var e = t
              , r = t.indexOf("[")
              , o = t.indexOf("]");
            -1 != r && -1 != o && (t = t.substring(0, r) + t.substring(r, o).replace(/:/g, ";") + t.substring(o, t.length));
            for (var s = i.exec(t || ""), a = {}, h = 14; h--; )
                a[n[h]] = s[h] || "";
            return -1 != r && -1 != o && (a.source = e,
            a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"),
            a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
            a.ipv6uri = !0),
            a
        }
    }
    , function(t, e, i) {
        (function(n) {
            "use strict";
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ;
            e.log = function() {
                var t;
                return "object" === ("undefined" == typeof console ? "undefined" : r(console)) && console.log && (t = console).log.apply(t, arguments)
            }
            ,
            e.formatArgs = function(e) {
                if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff),
                this.useColors) {
                    var i = "color: " + this.color;
                    e.splice(1, 0, i, "color: inherit");
                    var n = 0
                      , r = 0;
                    e[0].replace(/%[a-zA-Z%]/g, (function(t) {
                        "%%" !== t && (n++,
                        "%c" === t && (r = n))
                    }
                    )),
                    e.splice(r, 0, i)
                }
            }
            ,
            e.save = function(t) {
                try {
                    t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug")
                } catch (t) {}
            }
            ,
            e.load = function() {
                var t = void 0;
                try {
                    t = e.storage.getItem("debug")
                } catch (t) {}
                return !t && void 0 !== n && "env"in n && (t = n.env.DEBUG),
                t
            }
            ,
            e.useColors = function() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type && !window.process.__nwjs) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }
            ,
            e.storage = function() {
                try {
                    return localStorage
                } catch (t) {}
            }(),
            e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
            t.exports = i(5)(e),
            t.exports.formatters.j = function(t) {
                try {
                    return JSON.stringify(t)
                } catch (t) {
                    return "[UnexpectedJSONParseError]: " + t.message
                }
            }
        }
        ).call(e, i(4))
    }
    , function(t, e) {
        function i() {
            throw new Error("setTimeout has not been defined")
        }
        function n() {
            throw new Error("clearTimeout has not been defined")
        }
        function r(t) {
            if (c === setTimeout)
                return setTimeout(t, 0);
            if ((c === i || !c) && setTimeout)
                return c = setTimeout,
                setTimeout(t, 0);
            try {
                return c(t, 0)
            } catch (e) {
                try {
                    return c.call(null, t, 0)
                } catch (e) {
                    return c.call(this, t, 0)
                }
            }
        }
        function o() {
            f && p && (f = !1,
            p.length ? d = p.concat(d) : g = -1,
            d.length && s())
        }
        function s() {
            if (!f) {
                var t = r(o);
                f = !0;
                for (var e = d.length; e; ) {
                    for (p = d,
                    d = []; ++g < e; )
                        p && p[g].run();
                    g = -1,
                    e = d.length
                }
                p = null,
                f = !1,
                function(t) {
                    if (l === clearTimeout)
                        return clearTimeout(t);
                    if ((l === n || !l) && clearTimeout)
                        return l = clearTimeout,
                        clearTimeout(t);
                    try {
                        l(t)
                    } catch (e) {
                        try {
                            return l.call(null, t)
                        } catch (e) {
                            return l.call(this, t)
                        }
                    }
                }(t)
            }
        }
        function a(t, e) {
            this.fun = t,
            this.array = e
        }
        function h() {}
        var c, l, u = t.exports = {};
        !function() {
            try {
                c = "function" == typeof setTimeout ? setTimeout : i
            } catch (t) {
                c = i
            }
            try {
                l = "function" == typeof clearTimeout ? clearTimeout : n
            } catch (t) {
                l = n
            }
        }();
        var p, d = [], f = !1, g = -1;
        u.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++)
                    e[i - 1] = arguments[i];
            d.push(new a(t,e)),
            1 !== d.length || f || r(s)
        }
        ,
        a.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        u.title = "browser",
        u.browser = !0,
        u.env = {},
        u.argv = [],
        u.version = "",
        u.versions = {},
        u.on = h,
        u.addListener = h,
        u.once = h,
        u.off = h,
        u.removeListener = h,
        u.removeAllListeners = h,
        u.emit = h,
        u.prependListener = h,
        u.prependOnceListener = h,
        u.listeners = function(t) {
            return []
        }
        ,
        u.binding = function(t) {
            throw new Error("process.binding is not supported")
        }
        ,
        u.cwd = function() {
            return "/"
        }
        ,
        u.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }
        ,
        u.umask = function() {
            return 0
        }
    }
    , function(t, e, i) {
        "use strict";
        function n(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++)
                    i[e] = t[e];
                return i
            }
            return Array.from(t)
        }
        t.exports = function(t) {
            function e(t) {
                for (var e = 0, i = 0; i < t.length; i++)
                    e = (e << 5) - e + t.charCodeAt(i),
                    e |= 0;
                return r.colors[Math.abs(e) % r.colors.length]
            }
            function r(t) {
                function i() {
                    for (var t = arguments.length, e = Array(t), o = 0; o < t; o++)
                        e[o] = arguments[o];
                    if (i.enabled) {
                        var s = i
                          , a = Number(new Date)
                          , h = a - (n || a);
                        s.diff = h,
                        s.prev = n,
                        s.curr = a,
                        n = a,
                        e[0] = r.coerce(e[0]),
                        "string" != typeof e[0] && e.unshift("%O");
                        var c = 0;
                        e[0] = e[0].replace(/%([a-zA-Z%])/g, (function(t, i) {
                            if ("%%" === t)
                                return t;
                            c++;
                            var n = r.formatters[i];
                            if ("function" == typeof n) {
                                var o = e[c];
                                t = n.call(s, o),
                                e.splice(c, 1),
                                c--
                            }
                            return t
                        }
                        )),
                        r.formatArgs.call(s, e);
                        var l = s.log || r.log;
                        l.apply(s, e)
                    }
                }
                var n = void 0;
                return i.namespace = t,
                i.enabled = r.enabled(t),
                i.useColors = r.useColors(),
                i.color = e(t),
                i.destroy = o,
                i.extend = s,
                "function" == typeof r.init && r.init(i),
                r.instances.push(i),
                i
            }
            function o() {
                var t = r.instances.indexOf(this);
                return -1 !== t && (r.instances.splice(t, 1),
                !0)
            }
            function s(t, e) {
                var i = r(this.namespace + (void 0 === e ? ":" : e) + t);
                return i.log = this.log,
                i
            }
            function a(t) {
                return t.toString().substring(2, t.toString().length - 2).replace(/\.\*\?$/, "*")
            }
            return r.debug = r,
            r.default = r,
            r.coerce = function(t) {
                return t instanceof Error ? t.stack || t.message : t
            }
            ,
            r.disable = function() {
                var t = [].concat(n(r.names.map(a)), n(r.skips.map(a).map((function(t) {
                    return "-" + t
                }
                )))).join(",");
                return r.enable(""),
                t
            }
            ,
            r.enable = function(t) {
                r.save(t),
                r.names = [],
                r.skips = [];
                var e = void 0
                  , i = ("string" == typeof t ? t : "").split(/[\s,]+/)
                  , n = i.length;
                for (e = 0; e < n; e++)
                    i[e] && ("-" === (t = i[e].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" + t.substr(1) + "$")) : r.names.push(new RegExp("^" + t + "$")));
                for (e = 0; e < r.instances.length; e++) {
                    var o = r.instances[e];
                    o.enabled = r.enabled(o.namespace)
                }
            }
            ,
            r.enabled = function(t) {
                if ("*" === t[t.length - 1])
                    return !0;
                var e = void 0
                  , i = void 0;
                for (e = 0,
                i = r.skips.length; e < i; e++)
                    if (r.skips[e].test(t))
                        return !1;
                for (e = 0,
                i = r.names.length; e < i; e++)
                    if (r.names[e].test(t))
                        return !0;
                return !1
            }
            ,
            r.humanize = i(6),
            Object.keys(t).forEach((function(e) {
                r[e] = t[e]
            }
            )),
            r.instances = [],
            r.names = [],
            r.skips = [],
            r.formatters = {},
            r.selectColor = e,
            r.enable(r.load()),
            r
        }
    }
    , function(t, e) {
        function i(t) {
            var e = Math.abs(t);
            return e >= a ? n(t, e, a, "day") : e >= s ? n(t, e, s, "hour") : e >= o ? n(t, e, o, "minute") : e >= r ? n(t, e, r, "second") : t + " ms"
        }
        function n(t, e, i, n) {
            var r = e >= 1.5 * i;
            return Math.round(t / i) + " " + n + (r ? "s" : "")
        }
        var r = 1e3
          , o = 60 * r
          , s = 60 * o
          , a = 24 * s
          , h = 7 * a
          , c = 365.25 * a;
        t.exports = function(t, e) {
            e = e || {};
            var n = typeof t;
            if ("string" === n && t.length > 0)
                return function(t) {
                    if (!((t = String(t)).length > 100)) {
                        var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);
                        if (e) {
                            var i = parseFloat(e[1]);
                            switch ((e[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return i * c;
                            case "weeks":
                            case "week":
                            case "w":
                                return i * h;
                            case "days":
                            case "day":
                            case "d":
                                return i * a;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return i * s;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return i * o;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return i * r;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return i;
                            default:
                                return
                            }
                        }
                    }
                }(t);
            if ("number" === n && isFinite(t))
                return e.long ? i(t) : function(t) {
                    var e = Math.abs(t);
                    return e >= a ? Math.round(t / a) + "d" : e >= s ? Math.round(t / s) + "h" : e >= o ? Math.round(t / o) + "m" : e >= r ? Math.round(t / r) + "s" : t + "ms"
                }(t);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
        }
    }
    , function(t, e, i) {
        function n() {}
        function r(t) {
            var i = "" + t.type;
            if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (i += t.attachments + "-"),
            t.nsp && "/" !== t.nsp && (i += t.nsp + ","),
            null != t.id && (i += t.id),
            null != t.data) {
                var n = function(t) {
                    try {
                        return JSON.stringify(t)
                    } catch (t) {
                        return !1
                    }
                }(t.data);
                if (!1 === n)
                    return f;
                i += n
            }
            return c("encoded %j as %s", t, i),
            i
        }
        function o() {
            this.reconstructor = null
        }
        function s(t) {
            var i = 0
              , n = {
                type: Number(t.charAt(0))
            };
            if (null == e.types[n.type])
                return h("unknown packet type " + n.type);
            if (e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type) {
                for (var r = ""; "-" !== t.charAt(++i) && (r += t.charAt(i),
                i != t.length); )
                    ;
                if (r != Number(r) || "-" !== t.charAt(i))
                    throw new Error("Illegal attachments");
                n.attachments = Number(r)
            }
            if ("/" === t.charAt(i + 1))
                for (n.nsp = ""; ++i; ) {
                    if ("," === (s = t.charAt(i)))
                        break;
                    if (n.nsp += s,
                    i === t.length)
                        break
                }
            else
                n.nsp = "/";
            var o = t.charAt(i + 1);
            if ("" !== o && Number(o) == o) {
                for (n.id = ""; ++i; ) {
                    var s;
                    if (null == (s = t.charAt(i)) || Number(s) != s) {
                        --i;
                        break
                    }
                    if (n.id += t.charAt(i),
                    i === t.length)
                        break
                }
                n.id = Number(n.id)
            }
            if (t.charAt(++i)) {
                var a = function(t) {
                    try {
                        return JSON.parse(t)
                    } catch (t) {
                        return !1
                    }
                }(t.substr(i));
                if (!(!1 !== a && (n.type === e.ERROR || p(a))))
                    return h("invalid payload");
                n.data = a
            }
            return c("decoded %s as %j", t, n),
            n
        }
        function a(t) {
            this.reconPack = t,
            this.buffers = []
        }
        function h(t) {
            return {
                type: e.ERROR,
                data: "parser error: " + t
            }
        }
        var c = i(8)("socket.io-parser")
          , l = i(11)
          , u = i(12)
          , p = i(13)
          , d = i(14);
        e.protocol = 4,
        e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
        e.CONNECT = 0,
        e.DISCONNECT = 1,
        e.EVENT = 2,
        e.ACK = 3,
        e.ERROR = 4,
        e.BINARY_EVENT = 5,
        e.BINARY_ACK = 6,
        e.Encoder = n,
        e.Decoder = o;
        var f = e.ERROR + '"encode error"';
        n.prototype.encode = function(t, i) {
            (c("encoding packet %j", t),
            e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type) ? function(t, e) {
                u.removeBlobs(t, (function(t) {
                    var i = u.deconstructPacket(t)
                      , n = r(i.packet)
                      , o = i.buffers;
                    o.unshift(n),
                    e(o)
                }
                ))
            }(t, i) : i([r(t)])
        }
        ,
        l(o.prototype),
        o.prototype.add = function(t) {
            var i;
            if ("string" == typeof t)
                i = s(t),
                e.BINARY_EVENT === i.type || e.BINARY_ACK === i.type ? (this.reconstructor = new a(i),
                0 === this.reconstructor.reconPack.attachments && this.emit("decoded", i)) : this.emit("decoded", i);
            else {
                if (!d(t) && !t.base64)
                    throw new Error("Unknown type: " + t);
                if (!this.reconstructor)
                    throw new Error("got binary data when not reconstructing a packet");
                (i = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null,
                this.emit("decoded", i))
            }
        }
        ,
        o.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction()
        }
        ,
        a.prototype.takeBinaryData = function(t) {
            if (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments) {
                var e = u.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(),
                e
            }
            return null
        }
        ,
        a.prototype.finishedReconstruction = function() {
            this.reconPack = null,
            this.buffers = []
        }
    }
    , function(t, e, i) {
        (function(n) {
            "use strict";
            function r() {
                var t;
                try {
                    t = e.storage.debug
                } catch (t) {}
                return !t && void 0 !== n && "env"in n && (t = n.env.DEBUG),
                t
            }
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ;
            (e = t.exports = i(9)).log = function() {
                return "object" === ("undefined" == typeof console ? "undefined" : o(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }
            ,
            e.formatArgs = function(t) {
                var i = this.useColors;
                if (t[0] = (i ? "%c" : "") + this.namespace + (i ? " %c" : " ") + t[0] + (i ? "%c " : " ") + "+" + e.humanize(this.diff),
                i) {
                    var n = "color: " + this.color;
                    t.splice(1, 0, n, "color: inherit");
                    var r = 0
                      , o = 0;
                    t[0].replace(/%[a-zA-Z%]/g, (function(t) {
                        "%%" !== t && (r++,
                        "%c" === t && (o = r))
                    }
                    )),
                    t.splice(o, 0, n)
                }
            }
            ,
            e.save = function(t) {
                try {
                    null == t ? e.storage.removeItem("debug") : e.storage.debug = t
                } catch (t) {}
            }
            ,
            e.load = r,
            e.useColors = function() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }
            ,
            e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
                try {
                    return window.localStorage
                } catch (t) {}
            }(),
            e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
            e.formatters.j = function(t) {
                try {
                    return JSON.stringify(t)
                } catch (t) {
                    return "[UnexpectedJSONParseError]: " + t.message
                }
            }
            ,
            e.enable(r())
        }
        ).call(e, i(4))
    }
    , function(t, e, i) {
        "use strict";
        function n(t) {
            function i() {
                if (i.enabled) {
                    var t = i
                      , r = +new Date
                      , o = r - (n || r);
                    t.diff = o,
                    t.prev = n,
                    t.curr = r,
                    n = r;
                    for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
                        s[a] = arguments[a];
                    s[0] = e.coerce(s[0]),
                    "string" != typeof s[0] && s.unshift("%O");
                    var h = 0;
                    s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(i, n) {
                        if ("%%" === i)
                            return i;
                        h++;
                        var r = e.formatters[n];
                        if ("function" == typeof r) {
                            var o = s[h];
                            i = r.call(t, o),
                            s.splice(h, 1),
                            h--
                        }
                        return i
                    }
                    )),
                    e.formatArgs.call(t, s);
                    var c = i.log || e.log || console.log.bind(console);
                    c.apply(t, s)
                }
            }
            var n;
            return i.namespace = t,
            i.enabled = e.enabled(t),
            i.useColors = e.useColors(),
            i.color = function(t) {
                var i, n = 0;
                for (i in t)
                    n = (n << 5) - n + t.charCodeAt(i),
                    n |= 0;
                return e.colors[Math.abs(n) % e.colors.length]
            }(t),
            i.destroy = r,
            "function" == typeof e.init && e.init(i),
            e.instances.push(i),
            i
        }
        function r() {
            var t = e.instances.indexOf(this);
            return -1 !== t && (e.instances.splice(t, 1),
            !0)
        }
        (e = t.exports = n.debug = n.default = n).coerce = function(t) {
            return t instanceof Error ? t.stack || t.message : t
        }
        ,
        e.disable = function() {
            e.enable("")
        }
        ,
        e.enable = function(t) {
            e.save(t),
            e.names = [],
            e.skips = [];
            var i, n = ("string" == typeof t ? t : "").split(/[\s,]+/), r = n.length;
            for (i = 0; i < r; i++)
                n[i] && ("-" === (t = n[i].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
            for (i = 0; i < e.instances.length; i++) {
                var o = e.instances[i];
                o.enabled = e.enabled(o.namespace)
            }
        }
        ,
        e.enabled = function(t) {
            if ("*" === t[t.length - 1])
                return !0;
            var i, n;
            for (i = 0,
            n = e.skips.length; i < n; i++)
                if (e.skips[i].test(t))
                    return !1;
            for (i = 0,
            n = e.names.length; i < n; i++)
                if (e.names[i].test(t))
                    return !0;
            return !1
        }
        ,
        e.humanize = i(10),
        e.instances = [],
        e.names = [],
        e.skips = [],
        e.formatters = {}
    }
    , function(t, e) {
        function i(t) {
            return n(t, a, "day") || n(t, s, "hour") || n(t, o, "minute") || n(t, r, "second") || t + " ms"
        }
        function n(t, e, i) {
            if (!(t < e))
                return t < 1.5 * e ? Math.floor(t / e) + " " + i : Math.ceil(t / e) + " " + i + "s"
        }
        var r = 1e3
          , o = 60 * r
          , s = 60 * o
          , a = 24 * s
          , h = 365.25 * a;
        t.exports = function(t, e) {
            e = e || {};
            var n = typeof t;
            if ("string" === n && t.length > 0)
                return function(t) {
                    if (!((t = String(t)).length > 100)) {
                        var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                        if (e) {
                            var i = parseFloat(e[1]);
                            switch ((e[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return i * h;
                            case "days":
                            case "day":
                            case "d":
                                return i * a;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return i * s;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return i * o;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return i * r;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return i;
                            default:
                                return
                            }
                        }
                    }
                }(t);
            if ("number" === n && !1 === isNaN(t))
                return e.long ? i(t) : function(t) {
                    return t >= a ? Math.round(t / a) + "d" : t >= s ? Math.round(t / s) + "h" : t >= o ? Math.round(t / o) + "m" : t >= r ? Math.round(t / r) + "s" : t + "ms"
                }(t);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
        }
    }
    , function(t, e, i) {
        function n(t) {
            if (t)
                return function(t) {
                    for (var e in n.prototype)
                        t[e] = n.prototype[e];
                    return t
                }(t)
        }
        t.exports = n,
        n.prototype.on = n.prototype.addEventListener = function(t, e) {
            return this._callbacks = this._callbacks || {},
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
        }
        ,
        n.prototype.once = function(t, e) {
            function i() {
                this.off(t, i),
                e.apply(this, arguments)
            }
            return i.fn = e,
            this.on(t, i),
            this
        }
        ,
        n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
            if (this._callbacks = this._callbacks || {},
            0 == arguments.length)
                return this._callbacks = {},
                this;
            var i = this._callbacks["$" + t];
            if (!i)
                return this;
            if (1 == arguments.length)
                return delete this._callbacks["$" + t],
                this;
            for (var n, r = 0; r < i.length; r++)
                if ((n = i[r]) === e || n.fn === e) {
                    i.splice(r, 1);
                    break
                }
            return this
        }
        ,
        n.prototype.emit = function(t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1)
              , i = this._callbacks["$" + t];
            if (i)
                for (var n = 0, r = (i = i.slice(0)).length; n < r; ++n)
                    i[n].apply(this, e);
            return this
        }
        ,
        n.prototype.listeners = function(t) {
            return this._callbacks = this._callbacks || {},
            this._callbacks["$" + t] || []
        }
        ,
        n.prototype.hasListeners = function(t) {
            return !!this.listeners(t).length
        }
    }
    , function(t, e, i) {
        function n(t, e) {
            if (!t)
                return t;
            if (s(t)) {
                var i = {
                    _placeholder: !0,
                    num: e.length
                };
                return e.push(t),
                i
            }
            if (o(t)) {
                for (var r = new Array(t.length), a = 0; a < t.length; a++)
                    r[a] = n(t[a], e);
                return r
            }
            if ("object" == typeof t && !(t instanceof Date)) {
                r = {};
                for (var h in t)
                    r[h] = n(t[h], e);
                return r
            }
            return t
        }
        function r(t, e) {
            if (!t)
                return t;
            if (t && t._placeholder)
                return e[t.num];
            if (o(t))
                for (var i = 0; i < t.length; i++)
                    t[i] = r(t[i], e);
            else if ("object" == typeof t)
                for (var n in t)
                    t[n] = r(t[n], e);
            return t
        }
        var o = i(13)
          , s = i(14)
          , a = Object.prototype.toString
          , h = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === a.call(Blob)
          , c = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === a.call(File);
        e.deconstructPacket = function(t) {
            var e = []
              , i = t.data
              , r = t;
            return r.data = n(i, e),
            r.attachments = e.length,
            {
                packet: r,
                buffers: e
            }
        }
        ,
        e.reconstructPacket = function(t, e) {
            return t.data = r(t.data, e),
            t.attachments = void 0,
            t
        }
        ,
        e.removeBlobs = function(t, e) {
            var i = 0
              , n = t;
            (function t(r, a, l) {
                if (!r)
                    return r;
                if (h && r instanceof Blob || c && r instanceof File) {
                    i++;
                    var u = new FileReader;
                    u.onload = function() {
                        l ? l[a] = this.result : n = this.result,
                        --i || e(n)
                    }
                    ,
                    u.readAsArrayBuffer(r)
                } else if (o(r))
                    for (var p = 0; p < r.length; p++)
                        t(r[p], p, r);
                else if ("object" == typeof r && !s(r))
                    for (var d in r)
                        t(r[d], d, r)
            }
            )(n),
            i || e(n)
        }
    }
    , function(t, e) {
        var i = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == i.call(t)
        }
    }
    , function(t, e) {
        t.exports = function(t) {
            return i && Buffer.isBuffer(t) || n && (t instanceof ArrayBuffer || r(t))
        }
        ;
        var i = "function" == typeof Buffer && "function" == typeof Buffer.isBuffer
          , n = "function" == typeof ArrayBuffer
          , r = function(t) {
            return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer
        }
    }
    , function(t, e, i) {
        function n(t, e) {
            if (!(this instanceof n))
                return new n(t,e);
            t && "object" == typeof t && (e = t,
            t = void 0),
            (e = e || {}).path = e.path || "/socket.io",
            this.nsps = {},
            this.subs = [],
            this.opts = e,
            this.reconnection(!1 !== e.reconnection),
            this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(e.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
            this.randomizationFactor(e.randomizationFactor || .5),
            this.backoff = new p({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }),
            this.timeout(null == e.timeout ? 2e4 : e.timeout),
            this.readyState = "closed",
            this.uri = t,
            this.connecting = [],
            this.lastPing = null,
            this.encoding = !1,
            this.packetBuffer = [];
            var i = e.parser || a;
            this.encoder = new i.Encoder,
            this.decoder = new i.Decoder,
            this.autoConnect = !1 !== e.autoConnect,
            this.autoConnect && this.open()
        }
        var r = i(16)
          , o = i(39)
          , s = i(11)
          , a = i(7)
          , h = i(41)
          , c = i(42)
          , l = i(3)("socket.io-client:manager")
          , u = i(38)
          , p = i(43)
          , d = Object.prototype.hasOwnProperty;
        t.exports = n,
        n.prototype.emitAll = function() {
            for (var t in this.emit.apply(this, arguments),
            this.nsps)
                d.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
        }
        ,
        n.prototype.updateSocketIds = function() {
            for (var t in this.nsps)
                d.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t))
        }
        ,
        n.prototype.generateId = function(t) {
            return ("/" === t ? "" : t + "#") + this.engine.id
        }
        ,
        s(n.prototype),
        n.prototype.reconnection = function(t) {
            return arguments.length ? (this._reconnection = !!t,
            this) : this._reconnection
        }
        ,
        n.prototype.reconnectionAttempts = function(t) {
            return arguments.length ? (this._reconnectionAttempts = t,
            this) : this._reconnectionAttempts
        }
        ,
        n.prototype.reconnectionDelay = function(t) {
            return arguments.length ? (this._reconnectionDelay = t,
            this.backoff && this.backoff.setMin(t),
            this) : this._reconnectionDelay
        }
        ,
        n.prototype.randomizationFactor = function(t) {
            return arguments.length ? (this._randomizationFactor = t,
            this.backoff && this.backoff.setJitter(t),
            this) : this._randomizationFactor
        }
        ,
        n.prototype.reconnectionDelayMax = function(t) {
            return arguments.length ? (this._reconnectionDelayMax = t,
            this.backoff && this.backoff.setMax(t),
            this) : this._reconnectionDelayMax
        }
        ,
        n.prototype.timeout = function(t) {
            return arguments.length ? (this._timeout = t,
            this) : this._timeout
        }
        ,
        n.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
        }
        ,
        n.prototype.open = n.prototype.connect = function(t, e) {
            if (l("readyState %s", this.readyState),
            ~this.readyState.indexOf("open"))
                return this;
            l("opening %s", this.uri),
            this.engine = r(this.uri, this.opts);
            var i = this.engine
              , n = this;
            this.readyState = "opening",
            this.skipReconnect = !1;
            var o = h(i, "open", (function() {
                n.onopen(),
                t && t()
            }
            ))
              , s = h(i, "error", (function(e) {
                if (l("connect_error"),
                n.cleanup(),
                n.readyState = "closed",
                n.emitAll("connect_error", e),
                t) {
                    var i = new Error("Connection error");
                    i.data = e,
                    t(i)
                } else
                    n.maybeReconnectOnOpen()
            }
            ));
            if (!1 !== this._timeout) {
                var a = this._timeout;
                l("connect attempt will timeout after %d", a);
                var c = setTimeout((function() {
                    l("connect attempt timed out after %d", a),
                    o.destroy(),
                    i.close(),
                    i.emit("error", "timeout"),
                    n.emitAll("connect_timeout", a)
                }
                ), a);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(c)
                    }
                })
            }
            return this.subs.push(o),
            this.subs.push(s),
            this
        }
        ,
        n.prototype.onopen = function() {
            l("open"),
            this.cleanup(),
            this.readyState = "open",
            this.emit("open");
            var t = this.engine;
            this.subs.push(h(t, "data", c(this, "ondata"))),
            this.subs.push(h(t, "ping", c(this, "onping"))),
            this.subs.push(h(t, "pong", c(this, "onpong"))),
            this.subs.push(h(t, "error", c(this, "onerror"))),
            this.subs.push(h(t, "close", c(this, "onclose"))),
            this.subs.push(h(this.decoder, "decoded", c(this, "ondecoded")))
        }
        ,
        n.prototype.onping = function() {
            this.lastPing = new Date,
            this.emitAll("ping")
        }
        ,
        n.prototype.onpong = function() {
            this.emitAll("pong", new Date - this.lastPing)
        }
        ,
        n.prototype.ondata = function(t) {
            this.decoder.add(t)
        }
        ,
        n.prototype.ondecoded = function(t) {
            this.emit("packet", t)
        }
        ,
        n.prototype.onerror = function(t) {
            l("error", t),
            this.emitAll("error", t)
        }
        ,
        n.prototype.socket = function(t, e) {
            function i() {
                ~u(r.connecting, n) || r.connecting.push(n)
            }
            var n = this.nsps[t];
            if (!n) {
                n = new o(this,t,e),
                this.nsps[t] = n;
                var r = this;
                n.on("connecting", i),
                n.on("connect", (function() {
                    n.id = r.generateId(t)
                }
                )),
                this.autoConnect && i()
            }
            return n
        }
        ,
        n.prototype.destroy = function(t) {
            var e = u(this.connecting, t);
            ~e && this.connecting.splice(e, 1),
            this.connecting.length || this.close()
        }
        ,
        n.prototype.packet = function(t) {
            l("writing packet %j", t);
            var e = this;
            t.query && 0 === t.type && (t.nsp += "?" + t.query),
            e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0,
            this.encoder.encode(t, (function(i) {
                for (var n = 0; n < i.length; n++)
                    e.engine.write(i[n], t.options);
                e.encoding = !1,
                e.processPacketQueue()
            }
            )))
        }
        ,
        n.prototype.processPacketQueue = function() {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var t = this.packetBuffer.shift();
                this.packet(t)
            }
        }
        ,
        n.prototype.cleanup = function() {
            l("cleanup");
            for (var t = this.subs.length, e = 0; e < t; e++) {
                this.subs.shift().destroy()
            }
            this.packetBuffer = [],
            this.encoding = !1,
            this.lastPing = null,
            this.decoder.destroy()
        }
        ,
        n.prototype.close = n.prototype.disconnect = function() {
            l("disconnect"),
            this.skipReconnect = !0,
            this.reconnecting = !1,
            "opening" === this.readyState && this.cleanup(),
            this.backoff.reset(),
            this.readyState = "closed",
            this.engine && this.engine.close()
        }
        ,
        n.prototype.onclose = function(t) {
            l("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            this.readyState = "closed",
            this.emit("close", t),
            this._reconnection && !this.skipReconnect && this.reconnect()
        }
        ,
        n.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect)
                return this;
            var t = this;
            if (this.backoff.attempts >= this._reconnectionAttempts)
                l("reconnect failed"),
                this.backoff.reset(),
                this.emitAll("reconnect_failed"),
                this.reconnecting = !1;
            else {
                var e = this.backoff.duration();
                l("will wait %dms before reconnect attempt", e),
                this.reconnecting = !0;
                var i = setTimeout((function() {
                    t.skipReconnect || (l("attempting reconnect"),
                    t.emitAll("reconnect_attempt", t.backoff.attempts),
                    t.emitAll("reconnecting", t.backoff.attempts),
                    t.skipReconnect || t.open((function(e) {
                        e ? (l("reconnect attempt error"),
                        t.reconnecting = !1,
                        t.reconnect(),
                        t.emitAll("reconnect_error", e.data)) : (l("reconnect success"),
                        t.onreconnect())
                    }
                    )))
                }
                ), e);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(i)
                    }
                })
            }
        }
        ,
        n.prototype.onreconnect = function() {
            var t = this.backoff.attempts;
            this.reconnecting = !1,
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", t)
        }
    }
    , function(t, e, i) {
        t.exports = i(17),
        t.exports.parser = i(24)
    }
    , function(t, e, i) {
        function n(t, e) {
            return this instanceof n ? (e = e || {},
            t && "object" == typeof t && (e = t,
            t = null),
            t ? (t = c(t),
            e.hostname = t.host,
            e.secure = "https" === t.protocol || "wss" === t.protocol,
            e.port = t.port,
            t.query && (e.query = t.query)) : e.host && (e.hostname = c(e.host).host),
            this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol,
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
            this.agent = e.agent || !1,
            this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"),
            this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80),
            this.query = e.query || {},
            "string" == typeof this.query && (this.query = l.decode(this.query)),
            this.upgrade = !1 !== e.upgrade,
            this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/",
            this.forceJSONP = !!e.forceJSONP,
            this.jsonp = !1 !== e.jsonp,
            this.forceBase64 = !!e.forceBase64,
            this.enablesXDR = !!e.enablesXDR,
            this.withCredentials = !1 !== e.withCredentials,
            this.timestampParam = e.timestampParam || "t",
            this.timestampRequests = e.timestampRequests,
            this.transports = e.transports || ["polling", "websocket"],
            this.transportOptions = e.transportOptions || {},
            this.readyState = "",
            this.writeBuffer = [],
            this.prevBufferLen = 0,
            this.policyPort = e.policyPort || 843,
            this.rememberUpgrade = e.rememberUpgrade || !1,
            this.binaryType = null,
            this.onlyBinaryUpgrades = e.onlyBinaryUpgrades,
            this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}),
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
            this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
            this.pfx = e.pfx || null,
            this.key = e.key || null,
            this.passphrase = e.passphrase || null,
            this.cert = e.cert || null,
            this.ca = e.ca || null,
            this.ciphers = e.ciphers || null,
            this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized,
            this.forceNode = !!e.forceNode,
            this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(),
            ("undefined" == typeof self || this.isReactNative) && (e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders),
            e.localAddress && (this.localAddress = e.localAddress)),
            this.id = null,
            this.upgrades = null,
            this.pingInterval = null,
            this.pingTimeout = null,
            this.pingIntervalTimer = null,
            this.pingTimeoutTimer = null,
            void this.open()) : new n(t,e)
        }
        var r = i(18)
          , o = i(11)
          , s = i(3)("engine.io-client:socket")
          , a = i(38)
          , h = i(24)
          , c = i(2)
          , l = i(32);
        t.exports = n,
        n.priorWebsocketSuccess = !1,
        o(n.prototype),
        n.protocol = h.protocol,
        n.Socket = n,
        n.Transport = i(23),
        n.transports = i(18),
        n.parser = i(24),
        n.prototype.createTransport = function(t) {
            s('creating transport "%s"', t);
            var e = function(t) {
                var e = {};
                for (var i in t)
                    t.hasOwnProperty(i) && (e[i] = t[i]);
                return e
            }(this.query);
            e.EIO = h.protocol,
            e.transport = t;
            var i = this.transportOptions[t] || {};
            return this.id && (e.sid = this.id),
            new r[t]({
                query: e,
                socket: this,
                agent: i.agent || this.agent,
                hostname: i.hostname || this.hostname,
                port: i.port || this.port,
                secure: i.secure || this.secure,
                path: i.path || this.path,
                forceJSONP: i.forceJSONP || this.forceJSONP,
                jsonp: i.jsonp || this.jsonp,
                forceBase64: i.forceBase64 || this.forceBase64,
                enablesXDR: i.enablesXDR || this.enablesXDR,
                withCredentials: i.withCredentials || this.withCredentials,
                timestampRequests: i.timestampRequests || this.timestampRequests,
                timestampParam: i.timestampParam || this.timestampParam,
                policyPort: i.policyPort || this.policyPort,
                pfx: i.pfx || this.pfx,
                key: i.key || this.key,
                passphrase: i.passphrase || this.passphrase,
                cert: i.cert || this.cert,
                ca: i.ca || this.ca,
                ciphers: i.ciphers || this.ciphers,
                rejectUnauthorized: i.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: i.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: i.extraHeaders || this.extraHeaders,
                forceNode: i.forceNode || this.forceNode,
                localAddress: i.localAddress || this.localAddress,
                requestTimeout: i.requestTimeout || this.requestTimeout,
                protocols: i.protocols || void 0,
                isReactNative: this.isReactNative
            })
        }
        ,
        n.prototype.open = function() {
            var t;
            if (this.rememberUpgrade && n.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket"))
                t = "websocket";
            else {
                if (0 === this.transports.length) {
                    var e = this;
                    return void setTimeout((function() {
                        e.emit("error", "No transports available")
                    }
                    ), 0)
                }
                t = this.transports[0]
            }
            this.readyState = "opening";
            try {
                t = this.createTransport(t)
            } catch (t) {
                return this.transports.shift(),
                void this.open()
            }
            t.open(),
            this.setTransport(t)
        }
        ,
        n.prototype.setTransport = function(t) {
            s("setting transport %s", t.name);
            var e = this;
            this.transport && (s("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            this.transport = t,
            t.on("drain", (function() {
                e.onDrain()
            }
            )).on("packet", (function(t) {
                e.onPacket(t)
            }
            )).on("error", (function(t) {
                e.onError(t)
            }
            )).on("close", (function() {
                e.onClose("transport close")
            }
            ))
        }
        ,
        n.prototype.probe = function(t) {
            function e() {
                if (p.onlyBinaryUpgrades) {
                    var e = !this.supportsBinary && p.transport.supportsBinary;
                    u = u || e
                }
                u || (s('probe transport "%s" opened', t),
                l.send([{
                    type: "ping",
                    data: "probe"
                }]),
                l.once("packet", (function(e) {
                    if (!u)
                        if ("pong" === e.type && "probe" === e.data) {
                            if (s('probe transport "%s" pong', t),
                            p.upgrading = !0,
                            p.emit("upgrading", l),
                            !l)
                                return;
                            n.priorWebsocketSuccess = "websocket" === l.name,
                            s('pausing current transport "%s"', p.transport.name),
                            p.transport.pause((function() {
                                u || "closed" !== p.readyState && (s("changing transport and sending upgrade packet"),
                                c(),
                                p.setTransport(l),
                                l.send([{
                                    type: "upgrade"
                                }]),
                                p.emit("upgrade", l),
                                l = null,
                                p.upgrading = !1,
                                p.flush())
                            }
                            ))
                        } else {
                            s('probe transport "%s" failed', t);
                            var i = new Error("probe error");
                            i.transport = l.name,
                            p.emit("upgradeError", i)
                        }
                }
                )))
            }
            function i() {
                u || (u = !0,
                c(),
                l.close(),
                l = null)
            }
            function r(e) {
                var n = new Error("probe error: " + e);
                n.transport = l.name,
                i(),
                s('probe transport "%s" failed because of error: %s', t, e),
                p.emit("upgradeError", n)
            }
            function o() {
                r("transport closed")
            }
            function a() {
                r("socket closed")
            }
            function h(t) {
                l && t.name !== l.name && (s('"%s" works - aborting "%s"', t.name, l.name),
                i())
            }
            function c() {
                l.removeListener("open", e),
                l.removeListener("error", r),
                l.removeListener("close", o),
                p.removeListener("close", a),
                p.removeListener("upgrading", h)
            }
            s('probing transport "%s"', t);
            var l = this.createTransport(t, {
                probe: 1
            })
              , u = !1
              , p = this;
            n.priorWebsocketSuccess = !1,
            l.once("open", e),
            l.once("error", r),
            l.once("close", o),
            this.once("close", a),
            this.once("upgrading", h),
            l.open()
        }
        ,
        n.prototype.onOpen = function() {
            if (s("socket open"),
            this.readyState = "open",
            n.priorWebsocketSuccess = "websocket" === this.transport.name,
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause) {
                s("starting upgrade probes");
                for (var t = 0, e = this.upgrades.length; t < e; t++)
                    this.probe(this.upgrades[t])
            }
        }
        ,
        n.prototype.onPacket = function(t) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                switch (s('socket receive: type "%s", data "%s"', t.type, t.data),
                this.emit("packet", t),
                this.emit("heartbeat"),
                t.type) {
                case "open":
                    this.onHandshake(JSON.parse(t.data));
                    break;
                case "pong":
                    this.setPing(),
                    this.emit("pong");
                    break;
                case "error":
                    var e = new Error("server error");
                    e.code = t.data,
                    this.onError(e);
                    break;
                case "message":
                    this.emit("data", t.data),
                    this.emit("message", t.data)
                }
            else
                s('packet received with socket readyState "%s"', this.readyState)
        }
        ,
        n.prototype.onHandshake = function(t) {
            this.emit("handshake", t),
            this.id = t.sid,
            this.transport.query.sid = t.sid,
            this.upgrades = this.filterUpgrades(t.upgrades),
            this.pingInterval = t.pingInterval,
            this.pingTimeout = t.pingTimeout,
            this.onOpen(),
            "closed" !== this.readyState && (this.setPing(),
            this.removeListener("heartbeat", this.onHeartbeat),
            this.on("heartbeat", this.onHeartbeat))
        }
        ,
        n.prototype.onHeartbeat = function(t) {
            clearTimeout(this.pingTimeoutTimer);
            var e = this;
            e.pingTimeoutTimer = setTimeout((function() {
                "closed" !== e.readyState && e.onClose("ping timeout")
            }
            ), t || e.pingInterval + e.pingTimeout)
        }
        ,
        n.prototype.setPing = function() {
            var t = this;
            clearTimeout(t.pingIntervalTimer),
            t.pingIntervalTimer = setTimeout((function() {
                s("writing ping packet - expecting pong within %sms", t.pingTimeout),
                t.ping(),
                t.onHeartbeat(t.pingTimeout)
            }
            ), t.pingInterval)
        }
        ,
        n.prototype.ping = function() {
            var t = this;
            this.sendPacket("ping", (function() {
                t.emit("ping")
            }
            ))
        }
        ,
        n.prototype.onDrain = function() {
            this.writeBuffer.splice(0, this.prevBufferLen),
            this.prevBufferLen = 0,
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
        }
        ,
        n.prototype.flush = function() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            this.prevBufferLen = this.writeBuffer.length,
            this.emit("flush"))
        }
        ,
        n.prototype.write = n.prototype.send = function(t, e, i) {
            return this.sendPacket("message", t, e, i),
            this
        }
        ,
        n.prototype.sendPacket = function(t, e, i, n) {
            if ("function" == typeof e && (n = e,
            e = void 0),
            "function" == typeof i && (n = i,
            i = null),
            "closing" !== this.readyState && "closed" !== this.readyState) {
                (i = i || {}).compress = !1 !== i.compress;
                var r = {
                    type: t,
                    data: e,
                    options: i
                };
                this.emit("packetCreate", r),
                this.writeBuffer.push(r),
                n && this.once("flush", n),
                this.flush()
            }
        }
        ,
        n.prototype.close = function() {
            function t() {
                n.onClose("forced close"),
                s("socket closing - telling transport to close"),
                n.transport.close()
            }
            function e() {
                n.removeListener("upgrade", e),
                n.removeListener("upgradeError", e),
                t()
            }
            function i() {
                n.once("upgrade", e),
                n.once("upgradeError", e)
            }
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var n = this;
                this.writeBuffer.length ? this.once("drain", (function() {
                    this.upgrading ? i() : t()
                }
                )) : this.upgrading ? i() : t()
            }
            return this
        }
        ,
        n.prototype.onError = function(t) {
            s("socket error %j", t),
            n.priorWebsocketSuccess = !1,
            this.emit("error", t),
            this.onClose("transport error", t)
        }
        ,
        n.prototype.onClose = function(t, e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                s('socket close with reason: "%s"', t);
                clearTimeout(this.pingIntervalTimer),
                clearTimeout(this.pingTimeoutTimer),
                this.transport.removeAllListeners("close"),
                this.transport.close(),
                this.transport.removeAllListeners(),
                this.readyState = "closed",
                this.id = null,
                this.emit("close", t, e),
                this.writeBuffer = [],
                this.prevBufferLen = 0
            }
        }
        ,
        n.prototype.filterUpgrades = function(t) {
            for (var e = [], i = 0, n = t.length; i < n; i++)
                ~a(this.transports, t[i]) && e.push(t[i]);
            return e
        }
    }
    , function(t, e, i) {
        var n = i(19)
          , r = i(21)
          , o = i(35)
          , s = i(36);
        e.polling = function(t) {
            var e = !1
              , i = !1
              , s = !1 !== t.jsonp;
            if ("undefined" != typeof location) {
                var a = "https:" === location.protocol
                  , h = location.port;
                h || (h = a ? 443 : 80),
                e = t.hostname !== location.hostname || h !== t.port,
                i = t.secure !== a
            }
            if (t.xdomain = e,
            t.xscheme = i,
            "open"in new n(t) && !t.forceJSONP)
                return new r(t);
            if (!s)
                throw new Error("JSONP disabled");
            return new o(t)
        }
        ,
        e.websocket = s
    }
    , function(t, e, i) {
        var n = i(20);
        t.exports = function(t) {
            var e = t.xdomain
              , i = t.xscheme
              , r = t.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!e || n))
                    return new XMLHttpRequest
            } catch (t) {}
            try {
                if ("undefined" != typeof XDomainRequest && !i && r)
                    return new XDomainRequest
            } catch (t) {}
            if (!e)
                try {
                    return new (self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (t) {}
        }
    }
    , function(t, e) {
        try {
            t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials"in new XMLHttpRequest
        } catch (e) {
            t.exports = !1
        }
    }
    , function(t, e, i) {
        function n() {}
        function r(t) {
            if (h.call(this, t),
            this.requestTimeout = t.requestTimeout,
            this.extraHeaders = t.extraHeaders,
            "undefined" != typeof location) {
                var e = "https:" === location.protocol
                  , i = location.port;
                i || (i = e ? 443 : 80),
                this.xd = "undefined" != typeof location && t.hostname !== location.hostname || i !== t.port,
                this.xs = t.secure !== e
            }
        }
        function o(t) {
            this.method = t.method || "GET",
            this.uri = t.uri,
            this.xd = !!t.xd,
            this.xs = !!t.xs,
            this.async = !1 !== t.async,
            this.data = void 0 !== t.data ? t.data : null,
            this.agent = t.agent,
            this.isBinary = t.isBinary,
            this.supportsBinary = t.supportsBinary,
            this.enablesXDR = t.enablesXDR,
            this.withCredentials = t.withCredentials,
            this.requestTimeout = t.requestTimeout,
            this.pfx = t.pfx,
            this.key = t.key,
            this.passphrase = t.passphrase,
            this.cert = t.cert,
            this.ca = t.ca,
            this.ciphers = t.ciphers,
            this.rejectUnauthorized = t.rejectUnauthorized,
            this.extraHeaders = t.extraHeaders,
            this.create()
        }
        function s() {
            for (var t in o.requests)
                o.requests.hasOwnProperty(t) && o.requests[t].abort()
        }
        var a = i(19)
          , h = i(22)
          , c = i(11)
          , l = i(33)
          , u = i(3)("engine.io-client:polling-xhr");
        if (t.exports = r,
        t.exports.Request = o,
        l(r, h),
        r.prototype.supportsBinary = !0,
        r.prototype.request = function(t) {
            return (t = t || {}).uri = this.uri(),
            t.xd = this.xd,
            t.xs = this.xs,
            t.agent = this.agent || !1,
            t.supportsBinary = this.supportsBinary,
            t.enablesXDR = this.enablesXDR,
            t.withCredentials = this.withCredentials,
            t.pfx = this.pfx,
            t.key = this.key,
            t.passphrase = this.passphrase,
            t.cert = this.cert,
            t.ca = this.ca,
            t.ciphers = this.ciphers,
            t.rejectUnauthorized = this.rejectUnauthorized,
            t.requestTimeout = this.requestTimeout,
            t.extraHeaders = this.extraHeaders,
            new o(t)
        }
        ,
        r.prototype.doWrite = function(t, e) {
            var i = "string" != typeof t && void 0 !== t
              , n = this.request({
                method: "POST",
                data: t,
                isBinary: i
            })
              , r = this;
            n.on("success", e),
            n.on("error", (function(t) {
                r.onError("xhr post error", t)
            }
            )),
            this.sendXhr = n
        }
        ,
        r.prototype.doPoll = function() {
            u("xhr poll");
            var t = this.request()
              , e = this;
            t.on("data", (function(t) {
                e.onData(t)
            }
            )),
            t.on("error", (function(t) {
                e.onError("xhr poll error", t)
            }
            )),
            this.pollXhr = t
        }
        ,
        c(o.prototype),
        o.prototype.create = function() {
            var t = {
                agent: this.agent,
                xdomain: this.xd,
                xscheme: this.xs,
                enablesXDR: this.enablesXDR
            };
            t.pfx = this.pfx,
            t.key = this.key,
            t.passphrase = this.passphrase,
            t.cert = this.cert,
            t.ca = this.ca,
            t.ciphers = this.ciphers,
            t.rejectUnauthorized = this.rejectUnauthorized;
            var e = this.xhr = new a(t)
              , i = this;
            try {
                u("xhr open %s: %s", this.method, this.uri),
                e.open(this.method, this.uri, this.async);
                try {
                    if (this.extraHeaders)
                        for (var n in e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0),
                        this.extraHeaders)
                            this.extraHeaders.hasOwnProperty(n) && e.setRequestHeader(n, this.extraHeaders[n])
                } catch (t) {}
                if ("POST" === this.method)
                    try {
                        this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                    } catch (t) {}
                try {
                    e.setRequestHeader("Accept", "*/*")
                } catch (t) {}
                "withCredentials"in e && (e.withCredentials = this.withCredentials),
                this.requestTimeout && (e.timeout = this.requestTimeout),
                this.hasXDR() ? (e.onload = function() {
                    i.onLoad()
                }
                ,
                e.onerror = function() {
                    i.onError(e.responseText)
                }
                ) : e.onreadystatechange = function() {
                    if (2 === e.readyState)
                        try {
                            var t = e.getResponseHeader("Content-Type");
                            (i.supportsBinary && "application/octet-stream" === t || "application/octet-stream; charset=UTF-8" === t) && (e.responseType = "arraybuffer")
                        } catch (t) {}
                    4 === e.readyState && (200 === e.status || 1223 === e.status ? i.onLoad() : setTimeout((function() {
                        i.onError("number" == typeof e.status ? e.status : 0)
                    }
                    ), 0))
                }
                ,
                u("xhr data %s", this.data),
                e.send(this.data)
            } catch (t) {
                return void setTimeout((function() {
                    i.onError(t)
                }
                ), 0)
            }
            "undefined" != typeof document && (this.index = o.requestsCount++,
            o.requests[this.index] = this)
        }
        ,
        o.prototype.onSuccess = function() {
            this.emit("success"),
            this.cleanup()
        }
        ,
        o.prototype.onData = function(t) {
            this.emit("data", t),
            this.onSuccess()
        }
        ,
        o.prototype.onError = function(t) {
            this.emit("error", t),
            this.cleanup(!0)
        }
        ,
        o.prototype.cleanup = function(t) {
            if (void 0 !== this.xhr && null !== this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n,
                t)
                    try {
                        this.xhr.abort()
                    } catch (t) {}
                "undefined" != typeof document && delete o.requests[this.index],
                this.xhr = null
            }
        }
        ,
        o.prototype.onLoad = function() {
            var t;
            try {
                var e;
                try {
                    e = this.xhr.getResponseHeader("Content-Type")
                } catch (t) {}
                t = ("application/octet-stream" === e || "application/octet-stream; charset=UTF-8" === e) && this.xhr.response || this.xhr.responseText
            } catch (t) {
                this.onError(t)
            }
            null != t && this.onData(t)
        }
        ,
        o.prototype.hasXDR = function() {
            return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
        }
        ,
        o.prototype.abort = function() {
            this.cleanup()
        }
        ,
        o.requestsCount = 0,
        o.requests = {},
        "undefined" != typeof document)
            if ("function" == typeof attachEvent)
                attachEvent("onunload", s);
            else if ("function" == typeof addEventListener) {
                var p = "onpagehide"in self ? "pagehide" : "unload";
                addEventListener(p, s, !1)
            }
    }
    , function(t, e, i) {
        function n(t) {
            var e = t && t.forceBase64;
            l && !e || (this.supportsBinary = !1),
            r.call(this, t)
        }
        var r = i(23)
          , o = i(32)
          , s = i(24)
          , a = i(33)
          , h = i(34)
          , c = i(3)("engine.io-client:polling");
        t.exports = n;
        var l = null != new (i(19))({
            xdomain: !1
        }).responseType;
        a(n, r),
        n.prototype.name = "polling",
        n.prototype.doOpen = function() {
            this.poll()
        }
        ,
        n.prototype.pause = function(t) {
            function e() {
                c("paused"),
                i.readyState = "paused",
                t()
            }
            var i = this;
            if (this.readyState = "pausing",
            this.polling || !this.writable) {
                var n = 0;
                this.polling && (c("we are currently polling - waiting to pause"),
                n++,
                this.once("pollComplete", (function() {
                    c("pre-pause polling complete"),
                    --n || e()
                }
                ))),
                this.writable || (c("we are currently writing - waiting to pause"),
                n++,
                this.once("drain", (function() {
                    c("pre-pause writing complete"),
                    --n || e()
                }
                )))
            } else
                e()
        }
        ,
        n.prototype.poll = function() {
            c("polling"),
            this.polling = !0,
            this.doPoll(),
            this.emit("poll")
        }
        ,
        n.prototype.onData = function(t) {
            var e = this;
            c("polling got data %s", t);
            s.decodePayload(t, this.socket.binaryType, (function(t, i, n) {
                return "opening" === e.readyState && e.onOpen(),
                "close" === t.type ? (e.onClose(),
                !1) : void e.onPacket(t)
            }
            )),
            "closed" !== this.readyState && (this.polling = !1,
            this.emit("pollComplete"),
            "open" === this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
        }
        ,
        n.prototype.doClose = function() {
            function t() {
                c("writing close packet"),
                e.write([{
                    type: "close"
                }])
            }
            var e = this;
            "open" === this.readyState ? (c("transport open - closing"),
            t()) : (c("transport not open - deferring close"),
            this.once("open", t))
        }
        ,
        n.prototype.write = function(t) {
            var e = this;
            this.writable = !1;
            var i = function() {
                e.writable = !0,
                e.emit("drain")
            };
            s.encodePayload(t, this.supportsBinary, (function(t) {
                e.doWrite(t, i)
            }
            ))
        }
        ,
        n.prototype.uri = function() {
            var t = this.query || {}
              , e = this.secure ? "https" : "http"
              , i = "";
            return !1 !== this.timestampRequests && (t[this.timestampParam] = h()),
            this.supportsBinary || t.sid || (t.b64 = 1),
            t = o.encode(t),
            this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (i = ":" + this.port),
            t.length && (t = "?" + t),
            e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + i + this.path + t
        }
    }
    , function(t, e, i) {
        function n(t) {
            this.path = t.path,
            this.hostname = t.hostname,
            this.port = t.port,
            this.secure = t.secure,
            this.query = t.query,
            this.timestampParam = t.timestampParam,
            this.timestampRequests = t.timestampRequests,
            this.readyState = "",
            this.agent = t.agent || !1,
            this.socket = t.socket,
            this.enablesXDR = t.enablesXDR,
            this.withCredentials = t.withCredentials,
            this.pfx = t.pfx,
            this.key = t.key,
            this.passphrase = t.passphrase,
            this.cert = t.cert,
            this.ca = t.ca,
            this.ciphers = t.ciphers,
            this.rejectUnauthorized = t.rejectUnauthorized,
            this.forceNode = t.forceNode,
            this.isReactNative = t.isReactNative,
            this.extraHeaders = t.extraHeaders,
            this.localAddress = t.localAddress
        }
        var r = i(24)
          , o = i(11);
        t.exports = n,
        o(n.prototype),
        n.prototype.onError = function(t, e) {
            var i = new Error(t);
            return i.type = "TransportError",
            i.description = e,
            this.emit("error", i),
            this
        }
        ,
        n.prototype.open = function() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
            this.doOpen()),
            this
        }
        ,
        n.prototype.close = function() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
            this.onClose()),
            this
        }
        ,
        n.prototype.send = function(t) {
            if ("open" !== this.readyState)
                throw new Error("Transport not open");
            this.write(t)
        }
        ,
        n.prototype.onOpen = function() {
            this.readyState = "open",
            this.writable = !0,
            this.emit("open")
        }
        ,
        n.prototype.onData = function(t) {
            var e = r.decodePacket(t, this.socket.binaryType);
            this.onPacket(e)
        }
        ,
        n.prototype.onPacket = function(t) {
            this.emit("packet", t)
        }
        ,
        n.prototype.onClose = function() {
            this.readyState = "closed",
            this.emit("close")
        }
    }
    , function(t, e, i) {
        function n(t, i) {
            return i("b" + e.packets[t.type] + t.data.data)
        }
        function r(t, i, n) {
            if (!i)
                return e.encodeBase64Packet(t, n);
            var r = t.data
              , o = new Uint8Array(r)
              , s = new Uint8Array(1 + r.byteLength);
            s[0] = m[t.type];
            for (var a = 0; a < o.length; a++)
                s[a + 1] = o[a];
            return n(s.buffer)
        }
        function o(t, i, n) {
            if (!i)
                return e.encodeBase64Packet(t, n);
            if (g)
                return function(t, i, n) {
                    if (!i)
                        return e.encodeBase64Packet(t, n);
                    var r = new FileReader;
                    return r.onload = function() {
                        e.encodePacket({
                            type: t.type,
                            data: r.result
                        }, i, !0, n)
                    }
                    ,
                    r.readAsArrayBuffer(t.data)
                }(t, i, n);
            var r = new Uint8Array(1);
            return r[0] = m[t.type],
            n(new x([r.buffer, t.data]))
        }
        function s(t, e, i) {
            for (var n = new Array(t.length), r = u(t.length, i), o = function(t, i, r) {
                e(i, (function(e, i) {
                    n[t] = i,
                    r(e, n)
                }
                ))
            }, s = 0; s < t.length; s++)
                o(s, t[s], r)
        }
        var a, h = i(25), c = i(26), l = i(27), u = i(28), p = i(29);
        "undefined" != typeof ArrayBuffer && (a = i(30));
        var d = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent)
          , f = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent)
          , g = d || f;
        e.protocol = 3;
        var m = e.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        }
          , y = h(m)
          , v = {
            type: "error",
            data: "parser error"
        }
          , x = i(31);
        e.encodePacket = function(t, e, i, s) {
            "function" == typeof e && (s = e,
            e = !1),
            "function" == typeof i && (s = i,
            i = null);
            var a = void 0 === t.data ? void 0 : t.data.buffer || t.data;
            if ("undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer)
                return r(t, e, s);
            if (void 0 !== x && a instanceof x)
                return o(t, e, s);
            if (a && a.base64)
                return n(t, s);
            var h = m[t.type];
            return void 0 !== t.data && (h += i ? p.encode(String(t.data), {
                strict: !1
            }) : String(t.data)),
            s("" + h)
        }
        ,
        e.encodeBase64Packet = function(t, i) {
            var n, r = "b" + e.packets[t.type];
            if (void 0 !== x && t.data instanceof x) {
                var o = new FileReader;
                return o.onload = function() {
                    var t = o.result.split(",")[1];
                    i(r + t)
                }
                ,
                o.readAsDataURL(t.data)
            }
            try {
                n = String.fromCharCode.apply(null, new Uint8Array(t.data))
            } catch (e) {
                for (var s = new Uint8Array(t.data), a = new Array(s.length), h = 0; h < s.length; h++)
                    a[h] = s[h];
                n = String.fromCharCode.apply(null, a)
            }
            return r += btoa(n),
            i(r)
        }
        ,
        e.decodePacket = function(t, i, n) {
            if (void 0 === t)
                return v;
            if ("string" == typeof t) {
                if ("b" === t.charAt(0))
                    return e.decodeBase64Packet(t.substr(1), i);
                if (n && !1 === (t = function(t) {
                    try {
                        t = p.decode(t, {
                            strict: !1
                        })
                    } catch (t) {
                        return !1
                    }
                    return t
                }(t)))
                    return v;
                var r = t.charAt(0);
                return Number(r) == r && y[r] ? t.length > 1 ? {
                    type: y[r],
                    data: t.substring(1)
                } : {
                    type: y[r]
                } : v
            }
            r = new Uint8Array(t)[0];
            var o = l(t, 1);
            return x && "blob" === i && (o = new x([o])),
            {
                type: y[r],
                data: o
            }
        }
        ,
        e.decodeBase64Packet = function(t, e) {
            var i = y[t.charAt(0)];
            if (!a)
                return {
                    type: i,
                    data: {
                        base64: !0,
                        data: t.substr(1)
                    }
                };
            var n = a.decode(t.substr(1));
            return "blob" === e && x && (n = new x([n])),
            {
                type: i,
                data: n
            }
        }
        ,
        e.encodePayload = function(t, i, n) {
            "function" == typeof i && (n = i,
            i = null);
            var r = c(t);
            return i && r ? x && !g ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n) : t.length ? void s(t, (function(t, n) {
                e.encodePacket(t, !!r && i, !1, (function(t) {
                    n(null, function(t) {
                        return t.length + ":" + t
                    }(t))
                }
                ))
            }
            ), (function(t, e) {
                return n(e.join(""))
            }
            )) : n("0:")
        }
        ,
        e.decodePayload = function(t, i, n) {
            if ("string" != typeof t)
                return e.decodePayloadAsBinary(t, i, n);
            var r;
            if ("function" == typeof i && (n = i,
            i = null),
            "" === t)
                return n(v, 0, 1);
            for (var o, s, a = "", h = 0, c = t.length; h < c; h++) {
                var l = t.charAt(h);
                if (":" === l) {
                    if ("" === a || a != (o = Number(a)))
                        return n(v, 0, 1);
                    if (a != (s = t.substr(h + 1, o)).length)
                        return n(v, 0, 1);
                    if (s.length) {
                        if (r = e.decodePacket(s, i, !1),
                        v.type === r.type && v.data === r.data)
                            return n(v, 0, 1);
                        if (!1 === n(r, h + o, c))
                            return
                    }
                    h += o,
                    a = ""
                } else
                    a += l
            }
            return "" !== a ? n(v, 0, 1) : void 0
        }
        ,
        e.encodePayloadAsArrayBuffer = function(t, i) {
            return t.length ? void s(t, (function(t, i) {
                e.encodePacket(t, !0, !0, (function(t) {
                    return i(null, t)
                }
                ))
            }
            ), (function(t, e) {
                var n = e.reduce((function(t, e) {
                    var i;
                    return t + (i = "string" == typeof e ? e.length : e.byteLength).toString().length + i + 2
                }
                ), 0)
                  , r = new Uint8Array(n)
                  , o = 0;
                return e.forEach((function(t) {
                    var e = "string" == typeof t
                      , i = t;
                    if (e) {
                        for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++)
                            n[s] = t.charCodeAt(s);
                        i = n.buffer
                    }
                    r[o++] = e ? 0 : 1;
                    var a = i.byteLength.toString();
                    for (s = 0; s < a.length; s++)
                        r[o++] = parseInt(a[s]);
                    r[o++] = 255;
                    for (n = new Uint8Array(i),
                    s = 0; s < n.length; s++)
                        r[o++] = n[s]
                }
                )),
                i(r.buffer)
            }
            )) : i(new ArrayBuffer(0))
        }
        ,
        e.encodePayloadAsBlob = function(t, i) {
            s(t, (function(t, i) {
                e.encodePacket(t, !0, !0, (function(t) {
                    var e = new Uint8Array(1);
                    if (e[0] = 1,
                    "string" == typeof t) {
                        for (var n = new Uint8Array(t.length), r = 0; r < t.length; r++)
                            n[r] = t.charCodeAt(r);
                        t = n.buffer,
                        e[0] = 0
                    }
                    var o = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString()
                      , s = new Uint8Array(o.length + 1);
                    for (r = 0; r < o.length; r++)
                        s[r] = parseInt(o[r]);
                    if (s[o.length] = 255,
                    x) {
                        var a = new x([e.buffer, s.buffer, t]);
                        i(null, a)
                    }
                }
                ))
            }
            ), (function(t, e) {
                return i(new x(e))
            }
            ))
        }
        ,
        e.decodePayloadAsBinary = function(t, i, n) {
            "function" == typeof i && (n = i,
            i = null);
            for (var r = t, o = []; r.byteLength > 0; ) {
                for (var s = new Uint8Array(r), a = 0 === s[0], h = "", c = 1; 255 !== s[c]; c++) {
                    if (h.length > 310)
                        return n(v, 0, 1);
                    h += s[c]
                }
                r = l(r, 2 + h.length),
                h = parseInt(h);
                var u = l(r, 0, h);
                if (a)
                    try {
                        u = String.fromCharCode.apply(null, new Uint8Array(u))
                    } catch (t) {
                        var p = new Uint8Array(u);
                        u = "";
                        for (c = 0; c < p.length; c++)
                            u += String.fromCharCode(p[c])
                    }
                o.push(u),
                r = l(r, h)
            }
            var d = o.length;
            o.forEach((function(t, r) {
                n(e.decodePacket(t, i, !0), r, d)
            }
            ))
        }
    }
    , function(t, e) {
        t.exports = Object.keys || function(t) {
            var e = []
              , i = Object.prototype.hasOwnProperty;
            for (var n in t)
                i.call(t, n) && e.push(n);
            return e
        }
    }
    , function(t, e, i) {
        var n = i(13)
          , r = Object.prototype.toString
          , o = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === r.call(Blob)
          , s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === r.call(File);
        t.exports = function t(e) {
            if (!e || "object" != typeof e)
                return !1;
            if (n(e)) {
                for (var i = 0, r = e.length; i < r; i++)
                    if (t(e[i]))
                        return !0;
                return !1
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || o && e instanceof Blob || s && e instanceof File)
                return !0;
            if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length)
                return t(e.toJSON(), !0);
            for (var a in e)
                if (Object.prototype.hasOwnProperty.call(e, a) && t(e[a]))
                    return !0;
            return !1
        }
    }
    , function(t, e) {
        t.exports = function(t, e, i) {
            var n = t.byteLength;
            if (e = e || 0,
            i = i || n,
            t.slice)
                return t.slice(e, i);
            if (e < 0 && (e += n),
            i < 0 && (i += n),
            i > n && (i = n),
            e >= n || e >= i || 0 === n)
                return new ArrayBuffer(0);
            for (var r = new Uint8Array(t), o = new Uint8Array(i - e), s = e, a = 0; s < i; s++,
            a++)
                o[a] = r[s];
            return o.buffer
        }
    }
    , function(t, e) {
        function i() {}
        t.exports = function(t, e, n) {
            function r(t, i) {
                if (r.count <= 0)
                    throw new Error("after called too many times");
                --r.count,
                t ? (o = !0,
                e(t),
                e = n) : 0 !== r.count || o || e(null, i)
            }
            var o = !1;
            return n = n || i,
            r.count = t,
            0 === t ? e() : r
        }
    }
    , function(t, e) {
        function i(t) {
            for (var e, i, n = [], r = 0, o = t.length; r < o; )
                (e = t.charCodeAt(r++)) >= 55296 && e <= 56319 && r < o ? 56320 == (64512 & (i = t.charCodeAt(r++))) ? n.push(((1023 & e) << 10) + (1023 & i) + 65536) : (n.push(e),
                r--) : n.push(e);
            return n
        }
        function n(t, e) {
            if (t >= 55296 && t <= 57343) {
                if (e)
                    throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                return !1
            }
            return !0
        }
        function r(t, e) {
            return u(t >> e & 63 | 128)
        }
        function o(t, e) {
            if (0 == (4294967168 & t))
                return u(t);
            var i = "";
            return 0 == (4294965248 & t) ? i = u(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (n(t, e) || (t = 65533),
            i = u(t >> 12 & 15 | 224),
            i += r(t, 6)) : 0 == (4292870144 & t) && (i = u(t >> 18 & 7 | 240),
            i += r(t, 12),
            i += r(t, 6)),
            i + u(63 & t | 128)
        }
        function s() {
            if (l >= c)
                throw Error("Invalid byte index");
            var t = 255 & h[l];
            if (l++,
            128 == (192 & t))
                return 63 & t;
            throw Error("Invalid continuation byte")
        }
        function a(t) {
            var e, i;
            if (l > c)
                throw Error("Invalid byte index");
            if (l == c)
                return !1;
            if (e = 255 & h[l],
            l++,
            0 == (128 & e))
                return e;
            if (192 == (224 & e)) {
                if ((i = (31 & e) << 6 | s()) >= 128)
                    return i;
                throw Error("Invalid continuation byte")
            }
            if (224 == (240 & e)) {
                if ((i = (15 & e) << 12 | s() << 6 | s()) >= 2048)
                    return n(i, t) ? i : 65533;
                throw Error("Invalid continuation byte")
            }
            if (240 == (248 & e) && ((i = (7 & e) << 18 | s() << 12 | s() << 6 | s()) >= 65536 && i <= 1114111))
                return i;
            throw Error("Invalid UTF-8 detected")
        }
        /*! https://mths.be/utf8js v2.1.2 by @mathias */
        var h, c, l, u = String.fromCharCode;
        t.exports = {
            version: "2.1.2",
            encode: function(t, e) {
                for (var n = !1 !== (e = e || {}).strict, r = i(t), s = r.length, a = -1, h = ""; ++a < s; )
                    h += o(r[a], n);
                return h
            },
            decode: function(t, e) {
                var n = !1 !== (e = e || {}).strict;
                h = i(t),
                c = h.length,
                l = 0;
                for (var r, o = []; !1 !== (r = a(n)); )
                    o.push(r);
                return function(t) {
                    for (var e, i = t.length, n = -1, r = ""; ++n < i; )
                        (e = t[n]) > 65535 && (r += u((e -= 65536) >>> 10 & 1023 | 55296),
                        e = 56320 | 1023 & e),
                        r += u(e);
                    return r
                }(o)
            }
        }
    }
    , function(t, e) {
        !function() {
            "use strict";
            for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = new Uint8Array(256), n = 0; n < t.length; n++)
                i[t.charCodeAt(n)] = n;
            e.encode = function(e) {
                var i, n = new Uint8Array(e), r = n.length, o = "";
                for (i = 0; i < r; i += 3)
                    o += t[n[i] >> 2],
                    o += t[(3 & n[i]) << 4 | n[i + 1] >> 4],
                    o += t[(15 & n[i + 1]) << 2 | n[i + 2] >> 6],
                    o += t[63 & n[i + 2]];
                return r % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="),
                o
            }
            ,
            e.decode = function(t) {
                var e, n, r, o, s, a = .75 * t.length, h = t.length, c = 0;
                "=" === t[t.length - 1] && (a--,
                "=" === t[t.length - 2] && a--);
                var l = new ArrayBuffer(a)
                  , u = new Uint8Array(l);
                for (e = 0; e < h; e += 4)
                    n = i[t.charCodeAt(e)],
                    r = i[t.charCodeAt(e + 1)],
                    o = i[t.charCodeAt(e + 2)],
                    s = i[t.charCodeAt(e + 3)],
                    u[c++] = n << 2 | r >> 4,
                    u[c++] = (15 & r) << 4 | o >> 2,
                    u[c++] = (3 & o) << 6 | 63 & s;
                return l
            }
        }()
    }
    , function(t, e) {
        function i(t) {
            return t.map((function(t) {
                if (t.buffer instanceof ArrayBuffer) {
                    var e = t.buffer;
                    if (t.byteLength !== e.byteLength) {
                        var i = new Uint8Array(t.byteLength);
                        i.set(new Uint8Array(e,t.byteOffset,t.byteLength)),
                        e = i.buffer
                    }
                    return e
                }
                return t
            }
            ))
        }
        function n(t, e) {
            e = e || {};
            var n = new o;
            return i(t).forEach((function(t) {
                n.append(t)
            }
            )),
            e.type ? n.getBlob(e.type) : n.getBlob()
        }
        function r(t, e) {
            return new Blob(i(t),e || {})
        }
        var o = void 0 !== o ? o : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder
          , s = function() {
            try {
                return 2 === new Blob(["hi"]).size
            } catch (t) {
                return !1
            }
        }()
          , a = s && function() {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size
            } catch (t) {
                return !1
            }
        }()
          , h = o && o.prototype.append && o.prototype.getBlob;
        "undefined" != typeof Blob && (n.prototype = Blob.prototype,
        r.prototype = Blob.prototype),
        t.exports = s ? a ? Blob : r : h ? n : void 0
    }
    , function(t, e) {
        e.encode = function(t) {
            var e = "";
            for (var i in t)
                t.hasOwnProperty(i) && (e.length && (e += "&"),
                e += encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
            return e
        }
        ,
        e.decode = function(t) {
            for (var e = {}, i = t.split("&"), n = 0, r = i.length; n < r; n++) {
                var o = i[n].split("=");
                e[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
            }
            return e
        }
    }
    , function(t, e) {
        t.exports = function(t, e) {
            var i = function() {};
            i.prototype = e.prototype,
            t.prototype = new i,
            t.prototype.constructor = t
        }
    }
    , function(t, e) {
        "use strict";
        function i(t) {
            var e = "";
            do {
                e = o[t % s] + e,
                t = Math.floor(t / s)
            } while (t > 0);
            return e
        }
        function n() {
            var t = i(+new Date);
            return t !== r ? (h = 0,
            r = t) : t + "." + i(h++)
        }
        for (var r, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), s = 64, a = {}, h = 0, c = 0; c < s; c++)
            a[o[c]] = c;
        n.encode = i,
        n.decode = function(t) {
            var e = 0;
            for (c = 0; c < t.length; c++)
                e = e * s + a[t.charAt(c)];
            return e
        }
        ,
        t.exports = n
    }
    , function(t, e, i) {
        (function(e) {
            function n() {}
            function r() {
                return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : {}
            }
            function o(t) {
                if (s.call(this, t),
                this.query = this.query || {},
                !h) {
                    var e = r();
                    h = e.___eio = e.___eio || []
                }
                this.index = h.length;
                var i = this;
                h.push((function(t) {
                    i.onData(t)
                }
                )),
                this.query.j = this.index,
                "function" == typeof addEventListener && addEventListener("beforeunload", (function() {
                    i.script && (i.script.onerror = n)
                }
                ), !1)
            }
            var s = i(22)
              , a = i(33);
            t.exports = o;
            var h, c = /\n/g, l = /\\n/g;
            a(o, s),
            o.prototype.supportsBinary = !1,
            o.prototype.doClose = function() {
                this.script && (this.script.parentNode.removeChild(this.script),
                this.script = null),
                this.form && (this.form.parentNode.removeChild(this.form),
                this.form = null,
                this.iframe = null),
                s.prototype.doClose.call(this)
            }
            ,
            o.prototype.doPoll = function() {
                var t = this
                  , e = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script),
                this.script = null),
                e.async = !0,
                e.src = this.uri(),
                e.onerror = function(e) {
                    t.onError("jsonp poll error", e)
                }
                ;
                var i = document.getElementsByTagName("script")[0];
                i ? i.parentNode.insertBefore(e, i) : (document.head || document.body).appendChild(e),
                this.script = e,
                "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function() {
                    var t = document.createElement("iframe");
                    document.body.appendChild(t),
                    document.body.removeChild(t)
                }
                ), 100)
            }
            ,
            o.prototype.doWrite = function(t, e) {
                function i() {
                    n(),
                    e()
                }
                function n() {
                    if (r.iframe)
                        try {
                            r.form.removeChild(r.iframe)
                        } catch (t) {
                            r.onError("jsonp polling iframe removal error", t)
                        }
                    try {
                        var t = '<iframe src="javascript:0" name="' + r.iframeId + '">';
                        o = document.createElement(t)
                    } catch (t) {
                        (o = document.createElement("iframe")).name = r.iframeId,
                        o.src = "javascript:0"
                    }
                    o.id = r.iframeId,
                    r.form.appendChild(o),
                    r.iframe = o
                }
                var r = this;
                if (!this.form) {
                    var o, s = document.createElement("form"), a = document.createElement("textarea"), h = this.iframeId = "eio_iframe_" + this.index;
                    s.className = "socketio",
                    s.style.position = "absolute",
                    s.style.top = "-1000px",
                    s.style.left = "-1000px",
                    s.target = h,
                    s.method = "POST",
                    s.setAttribute("accept-charset", "utf-8"),
                    a.name = "d",
                    s.appendChild(a),
                    document.body.appendChild(s),
                    this.form = s,
                    this.area = a
                }
                this.form.action = this.uri(),
                n(),
                t = t.replace(l, "\\\n"),
                this.area.value = t.replace(c, "\\n");
                try {
                    this.form.submit()
                } catch (t) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                    "complete" === r.iframe.readyState && i()
                }
                : this.iframe.onload = i
            }
        }
        ).call(e, function() {
            return this
        }())
    }
    , function(t, e, i) {
        function n(t) {
            t && t.forceBase64 && (this.supportsBinary = !1),
            this.perMessageDeflate = t.perMessageDeflate,
            this.usingBrowserWebSocket = r && !t.forceNode,
            this.protocols = t.protocols,
            this.usingBrowserWebSocket || (p = o),
            s.call(this, t)
        }
        var r, o, s = i(23), a = i(24), h = i(32), c = i(33), l = i(34), u = i(3)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? r = WebSocket : "undefined" != typeof self && (r = self.WebSocket || self.MozWebSocket),
        "undefined" == typeof window)
            try {
                o = i(37)
            } catch (t) {}
        var p = r || o;
        t.exports = n,
        c(n, s),
        n.prototype.name = "websocket",
        n.prototype.supportsBinary = !0,
        n.prototype.doOpen = function() {
            if (this.check()) {
                var t = this.uri()
                  , e = this.protocols
                  , i = {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                };
                i.pfx = this.pfx,
                i.key = this.key,
                i.passphrase = this.passphrase,
                i.cert = this.cert,
                i.ca = this.ca,
                i.ciphers = this.ciphers,
                i.rejectUnauthorized = this.rejectUnauthorized,
                this.extraHeaders && (i.headers = this.extraHeaders),
                this.localAddress && (i.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e ? new p(t,e) : new p(t) : new p(t,e,i)
                } catch (t) {
                    return this.emit("error", t)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer",
                this.addEventListeners()
            }
        }
        ,
        n.prototype.addEventListeners = function() {
            var t = this;
            this.ws.onopen = function() {
                t.onOpen()
            }
            ,
            this.ws.onclose = function() {
                t.onClose()
            }
            ,
            this.ws.onmessage = function(e) {
                t.onData(e.data)
            }
            ,
            this.ws.onerror = function(e) {
                t.onError("websocket error", e)
            }
        }
        ,
        n.prototype.write = function(t) {
            var e = this;
            this.writable = !1;
            for (var i = t.length, n = 0, r = i; n < r; n++)
                !function(t) {
                    a.encodePacket(t, e.supportsBinary, (function(n) {
                        if (!e.usingBrowserWebSocket) {
                            var r = {};
                            if (t.options && (r.compress = t.options.compress),
                            e.perMessageDeflate)
                                ("string" == typeof n ? Buffer.byteLength(n) : n.length) < e.perMessageDeflate.threshold && (r.compress = !1)
                        }
                        try {
                            e.usingBrowserWebSocket ? e.ws.send(n) : e.ws.send(n, r)
                        } catch (t) {
                            u("websocket closed before onclose event")
                        }
                        --i || (e.emit("flush"),
                        setTimeout((function() {
                            e.writable = !0,
                            e.emit("drain")
                        }
                        ), 0))
                    }
                    ))
                }(t[n])
        }
        ,
        n.prototype.onClose = function() {
            s.prototype.onClose.call(this)
        }
        ,
        n.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close()
        }
        ,
        n.prototype.uri = function() {
            var t = this.query || {}
              , e = this.secure ? "wss" : "ws"
              , i = "";
            return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (i = ":" + this.port),
            this.timestampRequests && (t[this.timestampParam] = l()),
            this.supportsBinary || (t.b64 = 1),
            (t = h.encode(t)).length && (t = "?" + t),
            e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + i + this.path + t
        }
        ,
        n.prototype.check = function() {
            return !(!p || "__initialize"in p && this.name === n.prototype.name)
        }
    }
    , function(t, e) {}
    , function(t, e) {
        var i = [].indexOf;
        t.exports = function(t, e) {
            if (i)
                return t.indexOf(e);
            for (var n = 0; n < t.length; ++n)
                if (t[n] === e)
                    return n;
            return -1
        }
    }
    , function(t, e, i) {
        function n(t, e, i) {
            this.io = t,
            this.nsp = e,
            this.json = this,
            this.ids = 0,
            this.acks = {},
            this.receiveBuffer = [],
            this.sendBuffer = [],
            this.connected = !1,
            this.disconnected = !0,
            this.flags = {},
            i && i.query && (this.query = i.query),
            this.io.autoConnect && this.open()
        }
        var r = i(7)
          , o = i(11)
          , s = i(40)
          , a = i(41)
          , h = i(42)
          , c = i(3)("socket.io-client:socket")
          , l = i(32)
          , u = i(26);
        t.exports = n;
        var p = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }
          , d = o.prototype.emit;
        o(n.prototype),
        n.prototype.subEvents = function() {
            if (!this.subs) {
                var t = this.io;
                this.subs = [a(t, "open", h(this, "onopen")), a(t, "packet", h(this, "onpacket")), a(t, "close", h(this, "onclose"))]
            }
        }
        ,
        n.prototype.open = n.prototype.connect = function() {
            return this.connected || (this.subEvents(),
            this.io.open(),
            "open" === this.io.readyState && this.onopen(),
            this.emit("connecting")),
            this
        }
        ,
        n.prototype.send = function() {
            var t = s(arguments);
            return t.unshift("message"),
            this.emit.apply(this, t),
            this
        }
        ,
        n.prototype.emit = function(t) {
            if (p.hasOwnProperty(t))
                return d.apply(this, arguments),
                this;
            var e = s(arguments)
              , i = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : u(e)) ? r.BINARY_EVENT : r.EVENT,
                data: e,
                options: {}
            };
            return i.options.compress = !this.flags || !1 !== this.flags.compress,
            "function" == typeof e[e.length - 1] && (c("emitting packet with ack id %d", this.ids),
            this.acks[this.ids] = e.pop(),
            i.id = this.ids++),
            this.connected ? this.packet(i) : this.sendBuffer.push(i),
            this.flags = {},
            this
        }
        ,
        n.prototype.packet = function(t) {
            t.nsp = this.nsp,
            this.io.packet(t)
        }
        ,
        n.prototype.onopen = function() {
            if (c("transport is open - connecting"),
            "/" !== this.nsp)
                if (this.query) {
                    var t = "object" == typeof this.query ? l.encode(this.query) : this.query;
                    c("sending connect packet with query %s", t),
                    this.packet({
                        type: r.CONNECT,
                        query: t
                    })
                } else
                    this.packet({
                        type: r.CONNECT
                    })
        }
        ,
        n.prototype.onclose = function(t) {
            c("close (%s)", t),
            this.connected = !1,
            this.disconnected = !0,
            delete this.id,
            this.emit("disconnect", t)
        }
        ,
        n.prototype.onpacket = function(t) {
            var e = t.nsp === this.nsp
              , i = t.type === r.ERROR && "/" === t.nsp;
            if (e || i)
                switch (t.type) {
                case r.CONNECT:
                    this.onconnect();
                    break;
                case r.EVENT:
                case r.BINARY_EVENT:
                    this.onevent(t);
                    break;
                case r.ACK:
                case r.BINARY_ACK:
                    this.onack(t);
                    break;
                case r.DISCONNECT:
                    this.ondisconnect();
                    break;
                case r.ERROR:
                    this.emit("error", t.data)
                }
        }
        ,
        n.prototype.onevent = function(t) {
            var e = t.data || [];
            c("emitting event %j", e),
            null != t.id && (c("attaching ack callback to event"),
            e.push(this.ack(t.id))),
            this.connected ? d.apply(this, e) : this.receiveBuffer.push(e)
        }
        ,
        n.prototype.ack = function(t) {
            var e = this
              , i = !1;
            return function() {
                if (!i) {
                    i = !0;
                    var n = s(arguments);
                    c("sending ack %j", n),
                    e.packet({
                        type: u(n) ? r.BINARY_ACK : r.ACK,
                        id: t,
                        data: n
                    })
                }
            }
        }
        ,
        n.prototype.onack = function(t) {
            var e = this.acks[t.id];
            "function" == typeof e ? (c("calling ack %s with %j", t.id, t.data),
            e.apply(this, t.data),
            delete this.acks[t.id]) : c("bad ack %s", t.id)
        }
        ,
        n.prototype.onconnect = function() {
            this.connected = !0,
            this.disconnected = !1,
            this.emit("connect"),
            this.emitBuffered()
        }
        ,
        n.prototype.emitBuffered = function() {
            var t;
            for (t = 0; t < this.receiveBuffer.length; t++)
                d.apply(this, this.receiveBuffer[t]);
            for (this.receiveBuffer = [],
            t = 0; t < this.sendBuffer.length; t++)
                this.packet(this.sendBuffer[t]);
            this.sendBuffer = []
        }
        ,
        n.prototype.ondisconnect = function() {
            c("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect")
        }
        ,
        n.prototype.destroy = function() {
            if (this.subs) {
                for (var t = 0; t < this.subs.length; t++)
                    this.subs[t].destroy();
                this.subs = null
            }
            this.io.destroy(this)
        }
        ,
        n.prototype.close = n.prototype.disconnect = function() {
            return this.connected && (c("performing disconnect (%s)", this.nsp),
            this.packet({
                type: r.DISCONNECT
            })),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
        }
        ,
        n.prototype.compress = function(t) {
            return this.flags.compress = t,
            this
        }
        ,
        n.prototype.binary = function(t) {
            return this.flags.binary = t,
            this
        }
    }
    , function(t, e) {
        t.exports = function(t, e) {
            for (var i = [], n = (e = e || 0) || 0; n < t.length; n++)
                i[n - e] = t[n];
            return i
        }
    }
    , function(t, e) {
        t.exports = function(t, e, i) {
            return t.on(e, i),
            {
                destroy: function() {
                    t.removeListener(e, i)
                }
            }
        }
    }
    , function(t, e) {
        var i = [].slice;
        t.exports = function(t, e) {
            if ("string" == typeof e && (e = t[e]),
            "function" != typeof e)
                throw new Error("bind() requires a function");
            var n = i.call(arguments, 2);
            return function() {
                return e.apply(t, n.concat(i.call(arguments)))
            }
        }
    }
    , function(t, e) {
        function i(t) {
            t = t || {},
            this.ms = t.min || 100,
            this.max = t.max || 1e4,
            this.factor = t.factor || 2,
            this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0,
            this.attempts = 0
        }
        t.exports = i,
        i.prototype.duration = function() {
            var t = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var e = Math.random()
                  , i = Math.floor(e * this.jitter * t);
                t = 0 == (1 & Math.floor(10 * e)) ? t - i : t + i
            }
            return 0 | Math.min(t, this.max)
        }
        ,
        i.prototype.reset = function() {
            this.attempts = 0
        }
        ,
        i.prototype.setMin = function(t) {
            this.ms = t
        }
        ,
        i.prototype.setMax = function(t) {
            this.max = t
        }
        ,
        i.prototype.setJitter = function(t) {
            this.jitter = t
        }
    }
    ])
}
)),
domready((function() {
    socket = io(),
    socket.on("statsResults", (function(t) {
        document.getElementById("stat_total_users").innerHTML = t.all.total,
        document.getElementById("stat_total_bandwidth").innerHTML = t.all.bandwidth,
        document.getElementById("stat_today").innerHTML = t.today.total,
        document.getElementById("stat_thirty_avg").innerHTML = t[30].total,
        document.getElementById("stat_today_bandwidth").innerHTML = t.today.bandwidth,
        document.getElementById("stat_loadavg").innerHTML = t.load
    }
    )),
    -1 !== window.location.href.indexOf("stats") && (socket.emit("stats"),
    setInterval((function() {
        socket.emit("stats")
    }
    ), 2500))
}
)),
function(t, e) {
    "function" == typeof define && define.amd ? define((function() {
        return e(t)
    }
    )) : e(t)
}(this, (function(t) {
    var e = function() {
        function e(t) {
            return null == t ? String(t) : U[q.call(t)] || "object"
        }
        function i(t) {
            return "function" == e(t)
        }
        function n(t) {
            return null != t && t == t.window
        }
        function r(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }
        function o(t) {
            return "object" == e(t)
        }
        function s(t) {
            return o(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
        }
        function a(t) {
            var e = !!t && "length"in t && t.length
              , i = C.type(t);
            return "function" != i && !n(t) && ("array" == i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }
        function h(t) {
            return t.length > 0 ? C.fn.concat.apply([], t) : t
        }
        function c(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function l(t) {
            return t in O ? O[t] : O[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }
        function u(t, e) {
            return "number" != typeof e || I[c(t)] ? e : e + "px"
        }
        function p(t) {
            return "children"in t ? L.call(t.children) : C.map(t.childNodes, (function(t) {
                return 1 == t.nodeType ? t : void 0
            }
            ))
        }
        function d(t, e) {
            var i, n = t ? t.length : 0;
            for (i = 0; n > i; i++)
                this[i] = t[i];
            this.length = n,
            this.selector = e || ""
        }
        function f(t, e, i) {
            for (k in e)
                i && (s(e[k]) || K(e[k])) ? (s(e[k]) && !s(t[k]) && (t[k] = {}),
                K(e[k]) && !K(t[k]) && (t[k] = []),
                f(t[k], e[k], i)) : e[k] !== w && (t[k] = e[k])
        }
        function g(t, e) {
            return null == e ? C(t) : C(t).filter(e)
        }
        function m(t, e, n, r) {
            return i(e) ? e.call(t, n, r) : e
        }
        function y(t, e, i) {
            null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
        }
        function v(t, e) {
            var i = t.className || ""
              , n = i && i.baseVal !== w;
            return e === w ? n ? i.baseVal : i : void (n ? i.baseVal = e : t.className = e)
        }
        function x(t) {
            try {
                return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? C.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }
        function b(t, e) {
            e(t);
            for (var i = 0, n = t.childNodes.length; n > i; i++)
                b(t.childNodes[i], e)
        }
        var w, k, C, A, T, S, P = [], E = P.concat, B = P.filter, L = P.slice, M = t.document, F = {}, O = {}, I = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, R = /^\s*<(\w+|!)[^>]*>/, N = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, D = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, z = /^(?:body|html)$/i, H = /([A-Z])/g, j = ["val", "css", "html", "text", "data", "width", "height", "offset"], W = M.createElement("table"), X = M.createElement("tr"), _ = {
            tr: M.createElement("tbody"),
            tbody: W,
            thead: W,
            tfoot: W,
            td: X,
            th: X,
            "*": M.createElement("div")
        }, G = /complete|loaded|interactive/, Y = /^[\w-]*$/, U = {}, q = U.toString, V = {}, $ = M.createElement("div"), Z = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, K = Array.isArray || function(t) {
            return t instanceof Array
        }
        ;
        return V.matches = function(t, e) {
            if (!e || !t || 1 !== t.nodeType)
                return !1;
            var i = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (i)
                return i.call(t, e);
            var n, r = t.parentNode, o = !r;
            return o && (r = $).appendChild(t),
            n = ~V.qsa(r, e).indexOf(t),
            o && $.removeChild(t),
            n
        }
        ,
        T = function(t) {
            return t.replace(/-+(.)?/g, (function(t, e) {
                return e ? e.toUpperCase() : ""
            }
            ))
        }
        ,
        S = function(t) {
            return B.call(t, (function(e, i) {
                return t.indexOf(e) == i
            }
            ))
        }
        ,
        V.fragment = function(t, e, i) {
            var n, r, o;
            return N.test(t) && (n = C(M.createElement(RegExp.$1))),
            n || (t.replace && (t = t.replace(D, "<$1></$2>")),
            e === w && (e = R.test(t) && RegExp.$1),
            e in _ || (e = "*"),
            (o = _[e]).innerHTML = "" + t,
            n = C.each(L.call(o.childNodes), (function() {
                o.removeChild(this)
            }
            ))),
            s(i) && (r = C(n),
            C.each(i, (function(t, e) {
                j.indexOf(t) > -1 ? r[t](e) : r.attr(t, e)
            }
            ))),
            n
        }
        ,
        V.Z = function(t, e) {
            return new d(t,e)
        }
        ,
        V.isZ = function(t) {
            return t instanceof V.Z
        }
        ,
        V.init = function(t, e) {
            var n;
            if (!t)
                return V.Z();
            if ("string" == typeof t)
                if ("<" == (t = t.trim())[0] && R.test(t))
                    n = V.fragment(t, RegExp.$1, e),
                    t = null;
                else {
                    if (e !== w)
                        return C(e).find(t);
                    n = V.qsa(M, t)
                }
            else {
                if (i(t))
                    return C(M).ready(t);
                if (V.isZ(t))
                    return t;
                if (K(t))
                    n = function(t) {
                        return B.call(t, (function(t) {
                            return null != t
                        }
                        ))
                    }(t);
                else if (o(t))
                    n = [t],
                    t = null;
                else if (R.test(t))
                    n = V.fragment(t.trim(), RegExp.$1, e),
                    t = null;
                else {
                    if (e !== w)
                        return C(e).find(t);
                    n = V.qsa(M, t)
                }
            }
            return V.Z(n, t)
        }
        ,
        C = function(t, e) {
            return V.init(t, e)
        }
        ,
        C.extend = function(t) {
            var e, i = L.call(arguments, 1);
            return "boolean" == typeof t && (e = t,
            t = i.shift()),
            i.forEach((function(i) {
                f(t, i, e)
            }
            )),
            t
        }
        ,
        V.qsa = function(t, e) {
            var i, n = "#" == e[0], r = !n && "." == e[0], o = n || r ? e.slice(1) : e, s = Y.test(o);
            return t.getElementById && s && n ? (i = t.getElementById(o)) ? [i] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : L.call(s && !n && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }
        ,
        C.contains = M.documentElement.contains ? function(t, e) {
            return t !== e && t.contains(e)
        }
        : function(t, e) {
            for (; e && (e = e.parentNode); )
                if (e === t)
                    return !0;
            return !1
        }
        ,
        C.type = e,
        C.isFunction = i,
        C.isWindow = n,
        C.isArray = K,
        C.isPlainObject = s,
        C.isEmptyObject = function(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        }
        ,
        C.isNumeric = function(t) {
            var e = Number(t)
              , i = typeof t;
            return null != t && "boolean" != i && ("string" != i || t.length) && !isNaN(e) && isFinite(e) || !1
        }
        ,
        C.inArray = function(t, e, i) {
            return P.indexOf.call(e, t, i)
        }
        ,
        C.camelCase = T,
        C.trim = function(t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }
        ,
        C.uuid = 0,
        C.support = {},
        C.expr = {},
        C.noop = function() {}
        ,
        C.map = function(t, e) {
            var i, n, r, o = [];
            if (a(t))
                for (n = 0; n < t.length; n++)
                    null != (i = e(t[n], n)) && o.push(i);
            else
                for (r in t)
                    null != (i = e(t[r], r)) && o.push(i);
            return h(o)
        }
        ,
        C.each = function(t, e) {
            var i, n;
            if (a(t)) {
                for (i = 0; i < t.length; i++)
                    if (!1 === e.call(t[i], i, t[i]))
                        return t
            } else
                for (n in t)
                    if (!1 === e.call(t[n], n, t[n]))
                        return t;
            return t
        }
        ,
        C.grep = function(t, e) {
            return B.call(t, e)
        }
        ,
        t.JSON && (C.parseJSON = JSON.parse),
        C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), (function(t, e) {
            U["[object " + e + "]"] = e.toLowerCase()
        }
        )),
        C.fn = {
            constructor: V.Z,
            length: 0,
            forEach: P.forEach,
            reduce: P.reduce,
            push: P.push,
            sort: P.sort,
            splice: P.splice,
            indexOf: P.indexOf,
            concat: function() {
                var t, e, i = [];
                for (t = 0; t < arguments.length; t++)
                    e = arguments[t],
                    i[t] = V.isZ(e) ? e.toArray() : e;
                return E.apply(V.isZ(this) ? this.toArray() : this, i)
            },
            map: function(t) {
                return C(C.map(this, (function(e, i) {
                    return t.call(e, i, e)
                }
                )))
            },
            slice: function() {
                return C(L.apply(this, arguments))
            },
            ready: function(t) {
                return G.test(M.readyState) && M.body ? t(C) : M.addEventListener("DOMContentLoaded", (function() {
                    t(C)
                }
                ), !1),
                this
            },
            get: function(t) {
                return t === w ? L.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each((function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                }
                ))
            },
            each: function(t) {
                return P.every.call(this, (function(e, i) {
                    return !1 !== t.call(e, i, e)
                }
                )),
                this
            },
            filter: function(t) {
                return i(t) ? this.not(this.not(t)) : C(B.call(this, (function(e) {
                    return V.matches(e, t)
                }
                )))
            },
            add: function(t, e) {
                return C(S(this.concat(C(t, e))))
            },
            is: function(t) {
                return this.length > 0 && V.matches(this[0], t)
            },
            not: function(t) {
                var e = [];
                if (i(t) && t.call !== w)
                    this.each((function(i) {
                        t.call(this, i) || e.push(this)
                    }
                    ));
                else {
                    var n = "string" == typeof t ? this.filter(t) : a(t) && i(t.item) ? L.call(t) : C(t);
                    this.forEach((function(t) {
                        n.indexOf(t) < 0 && e.push(t)
                    }
                    ))
                }
                return C(e)
            },
            has: function(t) {
                return this.filter((function() {
                    return o(t) ? C.contains(this, t) : C(this).find(t).size()
                }
                ))
            },
            eq: function(t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function() {
                var t = this[0];
                return t && !o(t) ? t : C(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !o(t) ? t : C(t)
            },
            find: function(t) {
                var e = this;
                return t ? "object" == typeof t ? C(t).filter((function() {
                    var t = this;
                    return P.some.call(e, (function(e) {
                        return C.contains(e, t)
                    }
                    ))
                }
                )) : 1 == this.length ? C(V.qsa(this[0], t)) : this.map((function() {
                    return V.qsa(this, t)
                }
                )) : C()
            },
            closest: function(t, e) {
                var i = []
                  , n = "object" == typeof t && C(t);
                return this.each((function(o, s) {
                    for (; s && !(n ? n.indexOf(s) >= 0 : V.matches(s, t)); )
                        s = s !== e && !r(s) && s.parentNode;
                    s && i.indexOf(s) < 0 && i.push(s)
                }
                )),
                C(i)
            },
            parents: function(t) {
                for (var e = [], i = this; i.length > 0; )
                    i = C.map(i, (function(t) {
                        return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t),
                        t) : void 0
                    }
                    ));
                return g(e, t)
            },
            parent: function(t) {
                return g(S(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return g(this.map((function() {
                    return p(this)
                }
                )), t)
            },
            contents: function() {
                return this.map((function() {
                    return this.contentDocument || L.call(this.childNodes)
                }
                ))
            },
            siblings: function(t) {
                return g(this.map((function(t, e) {
                    return B.call(p(e.parentNode), (function(t) {
                        return t !== e
                    }
                    ))
                }
                )), t)
            },
            empty: function() {
                return this.each((function() {
                    this.innerHTML = ""
                }
                ))
            },
            pluck: function(t) {
                return C.map(this, (function(e) {
                    return e[t]
                }
                ))
            },
            show: function() {
                return this.each((function() {
                    "none" == this.style.display && (this.style.display = ""),
                    "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = function(t) {
                        var e, i;
                        return F[t] || (e = M.createElement(t),
                        M.body.appendChild(e),
                        i = getComputedStyle(e, "").getPropertyValue("display"),
                        e.parentNode.removeChild(e),
                        "none" == i && (i = "block"),
                        F[t] = i),
                        F[t]
                    }(this.nodeName))
                }
                ))
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var e = i(t);
                if (this[0] && !e)
                    var n = C(t).get(0)
                      , r = n.parentNode || this.length > 1;
                return this.each((function(i) {
                    C(this).wrapAll(e ? t.call(this, i) : r ? n.cloneNode(!0) : n)
                }
                ))
            },
            wrapAll: function(t) {
                if (this[0]) {
                    C(this[0]).before(t = C(t));
                    for (var e; (e = t.children()).length; )
                        t = e.first();
                    C(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var e = i(t);
                return this.each((function(i) {
                    var n = C(this)
                      , r = n.contents()
                      , o = e ? t.call(this, i) : t;
                    r.length ? r.wrapAll(o) : n.append(o)
                }
                ))
            },
            unwrap: function() {
                return this.parent().each((function() {
                    C(this).replaceWith(C(this).children())
                }
                )),
                this
            },
            clone: function() {
                return this.map((function() {
                    return this.cloneNode(!0)
                }
                ))
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each((function() {
                    var e = C(this);
                    (t === w ? "none" == e.css("display") : t) ? e.show() : e.hide()
                }
                ))
            },
            prev: function(t) {
                return C(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return C(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function(t) {
                return 0 in arguments ? this.each((function(e) {
                    var i = this.innerHTML;
                    C(this).empty().append(m(this, t, e, i))
                }
                )) : 0 in this ? this[0].innerHTML : null
            },
            text: function(t) {
                return 0 in arguments ? this.each((function(e) {
                    var i = m(this, t, e, this.textContent);
                    this.textContent = null == i ? "" : "" + i
                }
                )) : 0 in this ? this.pluck("textContent").join("") : null
            },
            attr: function(t, e) {
                var i;
                return "string" != typeof t || 1 in arguments ? this.each((function(i) {
                    if (1 === this.nodeType)
                        if (o(t))
                            for (k in t)
                                y(this, k, t[k]);
                        else
                            y(this, t, m(this, e, i, this.getAttribute(t)))
                }
                )) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(t)) ? i : w
            },
            removeAttr: function(t) {
                return this.each((function() {
                    1 === this.nodeType && t.split(" ").forEach((function(t) {
                        y(this, t)
                    }
                    ), this)
                }
                ))
            },
            prop: function(t, e) {
                return t = Z[t] || t,
                1 in arguments ? this.each((function(i) {
                    this[t] = m(this, e, i, this[t])
                }
                )) : this[0] && this[0][t]
            },
            removeProp: function(t) {
                return t = Z[t] || t,
                this.each((function() {
                    delete this[t]
                }
                ))
            },
            data: function(t, e) {
                var i = "data-" + t.replace(H, "-$1").toLowerCase()
                  , n = 1 in arguments ? this.attr(i, e) : this.attr(i);
                return null !== n ? x(n) : w
            },
            val: function(t) {
                return 0 in arguments ? (null == t && (t = ""),
                this.each((function(e) {
                    this.value = m(this, t, e, this.value)
                }
                ))) : this[0] && (this[0].multiple ? C(this[0]).find("option").filter((function() {
                    return this.selected
                }
                )).pluck("value") : this[0].value)
            },
            offset: function(e) {
                if (e)
                    return this.each((function(t) {
                        var i = C(this)
                          , n = m(this, e, t, i.offset())
                          , r = i.offsetParent().offset()
                          , o = {
                            top: n.top - r.top,
                            left: n.left - r.left
                        };
                        "static" == i.css("position") && (o.position = "relative"),
                        i.css(o)
                    }
                    ));
                if (!this.length)
                    return null;
                if (M.documentElement !== this[0] && !C.contains(M.documentElement, this[0]))
                    return {
                        top: 0,
                        left: 0
                    };
                var i = this[0].getBoundingClientRect();
                return {
                    left: i.left + t.pageXOffset,
                    top: i.top + t.pageYOffset,
                    width: Math.round(i.width),
                    height: Math.round(i.height)
                }
            },
            css: function(t, i) {
                if (arguments.length < 2) {
                    var n = this[0];
                    if ("string" == typeof t) {
                        if (!n)
                            return;
                        return n.style[T(t)] || getComputedStyle(n, "").getPropertyValue(t)
                    }
                    if (K(t)) {
                        if (!n)
                            return;
                        var r = {}
                          , o = getComputedStyle(n, "");
                        return C.each(t, (function(t, e) {
                            r[e] = n.style[T(e)] || o.getPropertyValue(e)
                        }
                        )),
                        r
                    }
                }
                var s = "";
                if ("string" == e(t))
                    i || 0 === i ? s = c(t) + ":" + u(t, i) : this.each((function() {
                        this.style.removeProperty(c(t))
                    }
                    ));
                else
                    for (k in t)
                        t[k] || 0 === t[k] ? s += c(k) + ":" + u(k, t[k]) + ";" : this.each((function() {
                            this.style.removeProperty(c(k))
                        }
                        ));
                return this.each((function() {
                    this.style.cssText += ";" + s
                }
                ))
            },
            index: function(t) {
                return t ? this.indexOf(C(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                return !!t && P.some.call(this, (function(t) {
                    return this.test(v(t))
                }
                ), l(t))
            },
            addClass: function(t) {
                return t ? this.each((function(e) {
                    if ("className"in this) {
                        A = [];
                        var i = v(this);
                        m(this, t, e, i).split(/\s+/g).forEach((function(t) {
                            C(this).hasClass(t) || A.push(t)
                        }
                        ), this),
                        A.length && v(this, i + (i ? " " : "") + A.join(" "))
                    }
                }
                )) : this
            },
            removeClass: function(t) {
                return this.each((function(e) {
                    if ("className"in this) {
                        if (t === w)
                            return v(this, "");
                        A = v(this),
                        m(this, t, e, A).split(/\s+/g).forEach((function(t) {
                            A = A.replace(l(t), " ")
                        }
                        )),
                        v(this, A.trim())
                    }
                }
                ))
            },
            toggleClass: function(t, e) {
                return t ? this.each((function(i) {
                    var n = C(this);
                    m(this, t, i, v(this)).split(/\s+/g).forEach((function(t) {
                        (e === w ? !n.hasClass(t) : e) ? n.addClass(t) : n.removeClass(t)
                    }
                    ))
                }
                )) : this
            },
            scrollTop: function(t) {
                if (this.length) {
                    var e = "scrollTop"in this[0];
                    return t === w ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                        this.scrollTop = t
                    }
                    : function() {
                        this.scrollTo(this.scrollX, t)
                    }
                    )
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var e = "scrollLeft"in this[0];
                    return t === w ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                        this.scrollLeft = t
                    }
                    : function() {
                        this.scrollTo(t, this.scrollY)
                    }
                    )
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0]
                      , e = this.offsetParent()
                      , i = this.offset()
                      , n = z.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                    return i.top -= parseFloat(C(t).css("margin-top")) || 0,
                    i.left -= parseFloat(C(t).css("margin-left")) || 0,
                    n.top += parseFloat(C(e[0]).css("border-top-width")) || 0,
                    n.left += parseFloat(C(e[0]).css("border-left-width")) || 0,
                    {
                        top: i.top - n.top,
                        left: i.left - n.left
                    }
                }
            },
            offsetParent: function() {
                return this.map((function() {
                    for (var t = this.offsetParent || M.body; t && !z.test(t.nodeName) && "static" == C(t).css("position"); )
                        t = t.offsetParent;
                    return t
                }
                ))
            }
        },
        C.fn.detach = C.fn.remove,
        ["width", "height"].forEach((function(t) {
            var e = t.replace(/./, (function(t) {
                return t[0].toUpperCase()
            }
            ));
            C.fn[t] = function(i) {
                var o, s = this[0];
                return i === w ? n(s) ? s["inner" + e] : r(s) ? s.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each((function(e) {
                    (s = C(this)).css(t, m(this, i, e, s[t]()))
                }
                ))
            }
        }
        )),
        ["after", "prepend", "before", "append"].forEach((function(i, n) {
            var r = n % 2;
            C.fn[i] = function() {
                var i, o, s = C.map(arguments, (function(t) {
                    var n = [];
                    return "array" == (i = e(t)) ? (t.forEach((function(t) {
                        return t.nodeType !== w ? n.push(t) : C.zepto.isZ(t) ? n = n.concat(t.get()) : void (n = n.concat(V.fragment(t)))
                    }
                    )),
                    n) : "object" == i || null == t ? t : V.fragment(t)
                }
                )), a = this.length > 1;
                return s.length < 1 ? this : this.each((function(e, i) {
                    o = r ? i : i.parentNode,
                    i = 0 == n ? i.nextSibling : 1 == n ? i.firstChild : 2 == n ? i : null;
                    var h = C.contains(M.documentElement, o);
                    s.forEach((function(e) {
                        if (a)
                            e = e.cloneNode(!0);
                        else if (!o)
                            return C(e).remove();
                        o.insertBefore(e, i),
                        h && b(e, (function(e) {
                            if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) {
                                var i = e.ownerDocument ? e.ownerDocument.defaultView : t;
                                i.eval.call(i, e.innerHTML)
                            }
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            ,
            C.fn[r ? i + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
                return C(t)[i](this),
                this
            }
        }
        )),
        V.Z.prototype = d.prototype = C.fn,
        V.uniq = S,
        V.deserializeValue = x,
        C.zepto = V,
        C
    }();
    return t.Zepto = e,
    void 0 === t.$ && (t.$ = e),
    function(e) {
        function i(t) {
            return t._zid || (t._zid = p++)
        }
        function n(t, e, n, o) {
            if ((e = r(e)).ns)
                var s = function(t) {
                    return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
                }(e.ns);
            return (m[i(t)] || []).filter((function(t) {
                return t && (!e.e || t.e == e.e) && (!e.ns || s.test(t.ns)) && (!n || i(t.fn) === i(n)) && (!o || t.sel == o)
            }
            ))
        }
        function r(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function o(t, e) {
            return t.del && !v && t.e in x || !!e
        }
        function s(t) {
            return b[t] || v && x[t] || t
        }
        function a(t, n, a, h, l, p, d) {
            var f = i(t)
              , g = m[f] || (m[f] = []);
            n.split(/\s/).forEach((function(i) {
                if ("ready" == i)
                    return e(document).ready(a);
                var n = r(i);
                n.fn = a,
                n.sel = l,
                n.e in b && (a = function(t) {
                    var i = t.relatedTarget;
                    return !i || i !== this && !e.contains(this, i) ? n.fn.apply(this, arguments) : void 0
                }
                ),
                n.del = p;
                var f = p || a;
                n.proxy = function(e) {
                    if (!(e = c(e)).isImmediatePropagationStopped()) {
                        e.data = h;
                        var i = f.apply(t, e._args == u ? [e] : [e].concat(e._args));
                        return !1 === i && (e.preventDefault(),
                        e.stopPropagation()),
                        i
                    }
                }
                ,
                n.i = g.length,
                g.push(n),
                "addEventListener"in t && t.addEventListener(s(n.e), n.proxy, o(n, d))
            }
            ))
        }
        function h(t, e, r, a, h) {
            var c = i(t);
            (e || "").split(/\s/).forEach((function(e) {
                n(t, e, r, a).forEach((function(e) {
                    delete m[c][e.i],
                    "removeEventListener"in t && t.removeEventListener(s(e.e), e.proxy, o(e, h))
                }
                ))
            }
            ))
        }
        function c(t, i) {
            return (i || !t.isDefaultPrevented) && (i || (i = t),
            e.each(A, (function(e, n) {
                var r = i[e];
                t[e] = function() {
                    return this[n] = w,
                    r && r.apply(i, arguments)
                }
                ,
                t[n] = k
            }
            )),
            t.timeStamp || (t.timeStamp = Date.now()),
            (i.defaultPrevented !== u ? i.defaultPrevented : "returnValue"in i ? !1 === i.returnValue : i.getPreventDefault && i.getPreventDefault()) && (t.isDefaultPrevented = w)),
            t
        }
        function l(t) {
            var e, i = {
                originalEvent: t
            };
            for (e in t)
                C.test(e) || t[e] === u || (i[e] = t[e]);
            return c(i, t)
        }
        var u, p = 1, d = Array.prototype.slice, f = e.isFunction, g = function(t) {
            return "string" == typeof t
        }, m = {}, y = {}, v = "onfocusin"in t, x = {
            focus: "focusin",
            blur: "focusout"
        }, b = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents",
        e.event = {
            add: a,
            remove: h
        },
        e.proxy = function(t, n) {
            var r = 2 in arguments && d.call(arguments, 2);
            if (f(t)) {
                var o = function() {
                    return t.apply(n, r ? r.concat(d.call(arguments)) : arguments)
                };
                return o._zid = i(t),
                o
            }
            if (g(n))
                return r ? (r.unshift(t[n], t),
                e.proxy.apply(null, r)) : e.proxy(t[n], t);
            throw new TypeError("expected function")
        }
        ,
        e.fn.bind = function(t, e, i) {
            return this.on(t, e, i)
        }
        ,
        e.fn.unbind = function(t, e) {
            return this.off(t, e)
        }
        ,
        e.fn.one = function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        }
        ;
        var w = function() {
            return !0
        }
          , k = function() {
            return !1
        }
          , C = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/
          , A = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        e.fn.delegate = function(t, e, i) {
            return this.on(e, t, i)
        }
        ,
        e.fn.undelegate = function(t, e, i) {
            return this.off(e, t, i)
        }
        ,
        e.fn.live = function(t, i) {
            return e(document.body).delegate(this.selector, t, i),
            this
        }
        ,
        e.fn.die = function(t, i) {
            return e(document.body).undelegate(this.selector, t, i),
            this
        }
        ,
        e.fn.on = function(t, i, n, r, o) {
            var s, c, p = this;
            return t && !g(t) ? (e.each(t, (function(t, e) {
                p.on(t, i, n, e, o)
            }
            )),
            p) : (g(i) || f(r) || !1 === r || (r = n,
            n = i,
            i = u),
            (r === u || !1 === n) && (r = n,
            n = u),
            !1 === r && (r = k),
            p.each((function(u, p) {
                o && (s = function(t) {
                    return h(p, t.type, r),
                    r.apply(this, arguments)
                }
                ),
                i && (c = function(t) {
                    var n, o = e(t.target).closest(i, p).get(0);
                    return o && o !== p ? (n = e.extend(l(t), {
                        currentTarget: o,
                        liveFired: p
                    }),
                    (s || r).apply(o, [n].concat(d.call(arguments, 1)))) : void 0
                }
                ),
                a(p, t, r, n, i, c || s)
            }
            )))
        }
        ,
        e.fn.off = function(t, i, n) {
            var r = this;
            return t && !g(t) ? (e.each(t, (function(t, e) {
                r.off(t, i, e)
            }
            )),
            r) : (g(i) || f(n) || !1 === n || (n = i,
            i = u),
            !1 === n && (n = k),
            r.each((function() {
                h(this, t, n, i)
            }
            )))
        }
        ,
        e.fn.trigger = function(t, i) {
            return (t = g(t) || e.isPlainObject(t) ? e.Event(t) : c(t))._args = i,
            this.each((function() {
                t.type in x && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent"in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, i)
            }
            ))
        }
        ,
        e.fn.triggerHandler = function(t, i) {
            var r, o;
            return this.each((function(s, a) {
                (r = l(g(t) ? e.Event(t) : t))._args = i,
                r.target = a,
                e.each(n(a, t.type || t), (function(t, e) {
                    return o = e.proxy(r),
                    !r.isImmediatePropagationStopped() && void 0
                }
                ))
            }
            )),
            o
        }
        ,
        "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach((function(t) {
            e.fn[t] = function(e) {
                return 0 in arguments ? this.bind(t, e) : this.trigger(t)
            }
        }
        )),
        e.Event = function(t, e) {
            g(t) || (t = (e = t).type);
            var i = document.createEvent(y[t] || "Events")
              , n = !0;
            if (e)
                for (var r in e)
                    "bubbles" == r ? n = !!e[r] : i[r] = e[r];
            return i.initEvent(t, n, !0),
            c(i)
        }
    }(e),
    function(e) {
        function i(t, i, n) {
            var r = e.Event(i);
            return e(t).trigger(r, n),
            !r.isDefaultPrevented()
        }
        function n(t, e, n, r) {
            return t.global ? i(e || v, n, r) : void 0
        }
        function r(t) {
            t.global && 0 == e.active++ && n(t, null, "ajaxStart")
        }
        function o(t) {
            t.global && !--e.active && n(t, null, "ajaxStop")
        }
        function s(t, e) {
            var i = e.context;
            return !1 !== e.beforeSend.call(i, t, e) && !1 !== n(e, i, "ajaxBeforeSend", [t, e]) && void n(e, i, "ajaxSend", [t, e])
        }
        function a(t, e, i, r) {
            var o = i.context
              , s = "success";
            i.success.call(o, t, s, e),
            r && r.resolveWith(o, [t, s, e]),
            n(i, o, "ajaxSuccess", [e, i, t]),
            c(s, e, i)
        }
        function h(t, e, i, r, o) {
            var s = r.context;
            r.error.call(s, i, e, t),
            o && o.rejectWith(s, [i, e, t]),
            n(r, s, "ajaxError", [i, r, t || e]),
            c(e, i, r)
        }
        function c(t, e, i) {
            var r = i.context;
            i.complete.call(r, e, t),
            n(i, r, "ajaxComplete", [e, i]),
            o(i)
        }
        function l() {}
        function u(t) {
            return t && (t = t.split(";", 2)[0]),
            t && (t == C ? "html" : t == k ? "json" : b.test(t) ? "script" : w.test(t) && "xml") || "text"
        }
        function p(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }
        function d(t, i, n, r) {
            return e.isFunction(i) && (r = n,
            n = i,
            i = void 0),
            e.isFunction(n) || (r = n,
            n = void 0),
            {
                url: t,
                data: i,
                success: n,
                dataType: r
            }
        }
        function f(t, i, n, r) {
            var o, s = e.isArray(i), a = e.isPlainObject(i);
            e.each(i, (function(i, h) {
                o = e.type(h),
                r && (i = n ? r : r + "[" + (a || "object" == o || "array" == o ? i : "") + "]"),
                !r && s ? t.add(h.name, h.value) : "array" == o || !n && "object" == o ? f(t, h, n, i) : t.add(i, h)
            }
            ))
        }
        var g, m, y = +new Date, v = t.document, x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, b = /^(?:text|application)\/javascript/i, w = /^(?:text|application)\/xml/i, k = "application/json", C = "text/html", A = /^\s*$/, T = v.createElement("a");
        T.href = t.location.href,
        e.active = 0,
        e.ajaxJSONP = function(i, n) {
            if (!("type"in i))
                return e.ajax(i);
            var r, o, c = i.jsonpCallback, l = (e.isFunction(c) ? c() : c) || "Zepto" + y++, u = v.createElement("script"), p = t[l], d = function(t) {
                e(u).triggerHandler("error", t || "abort")
            }, f = {
                abort: d
            };
            return n && n.promise(f),
            e(u).on("load error", (function(s, c) {
                clearTimeout(o),
                e(u).off().remove(),
                "error" != s.type && r ? a(r[0], f, i, n) : h(null, c || "error", f, i, n),
                t[l] = p,
                r && e.isFunction(p) && p(r[0]),
                p = r = void 0
            }
            )),
            !1 === s(f, i) ? (d("abort"),
            f) : (t[l] = function() {
                r = arguments
            }
            ,
            u.src = i.url.replace(/\?(.+)=\?/, "?$1=" + l),
            v.head.appendChild(u),
            i.timeout > 0 && (o = setTimeout((function() {
                d("timeout")
            }
            ), i.timeout)),
            f)
        }
        ,
        e.ajaxSettings = {
            type: "GET",
            beforeSend: l,
            success: l,
            error: l,
            complete: l,
            context: null,
            global: !0,
            xhr: function() {
                return new t.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: k,
                xml: "application/xml, text/xml",
                html: C,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0,
            dataFilter: l
        },
        e.ajax = function(i) {
            var n, o, c = e.extend({}, i || {}), d = e.Deferred && e.Deferred();
            for (g in e.ajaxSettings)
                void 0 === c[g] && (c[g] = e.ajaxSettings[g]);
            r(c),
            c.crossDomain || ((n = v.createElement("a")).href = c.url,
            n.href = n.href,
            c.crossDomain = T.protocol + "//" + T.host != n.protocol + "//" + n.host),
            c.url || (c.url = t.location.toString()),
            (o = c.url.indexOf("#")) > -1 && (c.url = c.url.slice(0, o)),
            function(t) {
                t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)),
                !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = p(t.url, t.data),
                t.data = void 0)
            }(c);
            var f = c.dataType
              , y = /\?.+=\?/.test(c.url);
            if (y && (f = "jsonp"),
            !1 !== c.cache && (i && !0 === i.cache || "script" != f && "jsonp" != f) || (c.url = p(c.url, "_=" + Date.now())),
            "jsonp" == f)
                return y || (c.url = p(c.url, c.jsonp ? c.jsonp + "=?" : !1 === c.jsonp ? "" : "callback=?")),
                e.ajaxJSONP(c, d);
            var x, b = c.accepts[f], w = {}, k = function(t, e) {
                w[t.toLowerCase()] = [t, e]
            }, C = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : t.location.protocol, S = c.xhr(), P = S.setRequestHeader;
            if (d && d.promise(S),
            c.crossDomain || k("X-Requested-With", "XMLHttpRequest"),
            k("Accept", b || "*/*"),
            (b = c.mimeType || b) && (b.indexOf(",") > -1 && (b = b.split(",", 2)[0]),
            S.overrideMimeType && S.overrideMimeType(b)),
            (c.contentType || !1 !== c.contentType && c.data && "GET" != c.type.toUpperCase()) && k("Content-Type", c.contentType || "application/x-www-form-urlencoded"),
            c.headers)
                for (m in c.headers)
                    k(m, c.headers[m]);
            if (S.setRequestHeader = k,
            S.onreadystatechange = function() {
                if (4 == S.readyState) {
                    S.onreadystatechange = l,
                    clearTimeout(x);
                    var t, i = !1;
                    if (S.status >= 200 && S.status < 300 || 304 == S.status || 0 == S.status && "file:" == C) {
                        if (f = f || u(c.mimeType || S.getResponseHeader("content-type")),
                        "arraybuffer" == S.responseType || "blob" == S.responseType)
                            t = S.response;
                        else {
                            t = S.responseText;
                            try {
                                t = function(t, e, i) {
                                    if (i.dataFilter == l)
                                        return t;
                                    var n = i.context;
                                    return i.dataFilter.call(n, t, e)
                                }(t, f, c),
                                "script" == f ? (0,
                                eval)(t) : "xml" == f ? t = S.responseXML : "json" == f && (t = A.test(t) ? null : e.parseJSON(t))
                            } catch (t) {
                                i = t
                            }
                            if (i)
                                return h(i, "parsererror", S, c, d)
                        }
                        a(t, S, c, d)
                    } else
                        h(S.statusText || null, S.status ? "error" : "abort", S, c, d)
                }
            }
            ,
            !1 === s(S, c))
                return S.abort(),
                h(null, "abort", S, c, d),
                S;
            var E = !("async"in c) || c.async;
            if (S.open(c.type, c.url, E, c.username, c.password),
            c.xhrFields)
                for (m in c.xhrFields)
                    S[m] = c.xhrFields[m];
            for (m in w)
                P.apply(S, w[m]);
            return c.timeout > 0 && (x = setTimeout((function() {
                S.onreadystatechange = l,
                S.abort(),
                h(null, "timeout", S, c, d)
            }
            ), c.timeout)),
            S.send(c.data ? c.data : null),
            S
        }
        ,
        e.get = function() {
            return e.ajax(d.apply(null, arguments))
        }
        ,
        e.post = function() {
            var t = d.apply(null, arguments);
            return t.type = "POST",
            e.ajax(t)
        }
        ,
        e.getJSON = function() {
            var t = d.apply(null, arguments);
            return t.dataType = "json",
            e.ajax(t)
        }
        ,
        e.fn.load = function(t, i, n) {
            if (!this.length)
                return this;
            var r, o = this, s = t.split(/\s/), a = d(t, i, n), h = a.success;
            return s.length > 1 && (a.url = s[0],
            r = s[1]),
            a.success = function(t) {
                o.html(r ? e("<div>").html(t.replace(x, "")).find(r) : t),
                h && h.apply(o, arguments)
            }
            ,
            e.ajax(a),
            this
        }
        ;
        var S = encodeURIComponent;
        e.param = function(t, i) {
            var n = [];
            return n.add = function(t, i) {
                e.isFunction(i) && (i = i()),
                null == i && (i = ""),
                this.push(S(t) + "=" + S(i))
            }
            ,
            f(n, t, i),
            n.join("&").replace(/%20/g, "+")
        }
    }(e),
    function(t) {
        t.fn.serializeArray = function() {
            var e, i, n = [], r = function(t) {
                return t.forEach ? t.forEach(r) : void n.push({
                    name: e,
                    value: t
                })
            };
            return this[0] && t.each(this[0].elements, (function(n, o) {
                i = o.type,
                (e = o.name) && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || o.checked) && r(t(o).val())
            }
            )),
            n
        }
        ,
        t.fn.serialize = function() {
            var t = [];
            return this.serializeArray().forEach((function(e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }
            )),
            t.join("&")
        }
        ,
        t.fn.submit = function(e) {
            if (0 in arguments)
                this.bind("submit", e);
            else if (this.length) {
                var i = t.Event("submit");
                this.eq(0).trigger(i),
                i.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(e),
    function() {
        try {
            getComputedStyle(void 0)
        } catch (i) {
            var e = getComputedStyle;
            t.getComputedStyle = function(t, i) {
                try {
                    return e(t, i)
                } catch (t) {
                    return null
                }
            }
        }
    }(),
    e
}
));

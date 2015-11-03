/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */+function(e) {
  "use strict";
  var t = function(t, n) {
    this.$element = e(t);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = n;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
    this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this));
  };
  t.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0
  };
  t.prototype.cycle = function(t) {
    t || (this.paused = !1);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval));
    return this;
  };
  t.prototype.getActiveIndex = function() {
    this.$active = this.$element.find(".item.active");
    this.$items = this.$active.parent().children();
    return this.$items.index(this.$active);
  };
  t.prototype.to = function(t) {
    var n = this, r = this.getActiveIndex();
    if (t > this.$items.length - 1 || t < 0) return;
    return this.sliding ? this.$element.one("slid", function() {
      n.to(t);
    }) : r == t ? this.pause().cycle() : this.slide(t > r ? "next" : "prev", e(this.$items[t]));
  };
  t.prototype.pause = function(t) {
    t || (this.paused = !0);
    if (this.$element.find(".next, .prev").length && e.support.transition.end) {
      this.$element.trigger(e.support.transition.end);
      this.cycle(!0);
    }
    this.interval = clearInterval(this.interval);
    return this;
  };
  t.prototype.next = function() {
    if (this.sliding) return;
    return this.slide("next");
  };
  t.prototype.prev = function() {
    if (this.sliding) return;
    return this.slide("prev");
  };
  t.prototype.slide = function(t, n) {
    var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left" : "right", u = t == "next" ? "first" : "last", a = this;
    if (!i.length) {
      if (!this.options.wrap) return;
      i = this.$element.find(".item")[u]();
    }
    this.sliding = !0;
    s && this.pause();
    var f = e.Event("slide.bs.carousel", {
      relatedTarget: i[0],
      direction: o
    });
    if (i.hasClass("active")) return;
    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      this.$element.one("slid", function() {
        var t = e(a.$indicators.children()[a.getActiveIndex()]);
        t && t.addClass("active");
      });
    }
    if (e.support.transition && this.$element.hasClass("slide")) {
      this.$element.trigger(f);
      if (f.isDefaultPrevented()) return;
      i.addClass(t);
      i[0].offsetWidth;
      r.addClass(o);
      i.addClass(o);
      r.one(e.support.transition.end, function() {
        i.removeClass([ t, o ].join(" ")).addClass("active");
        r.removeClass([ "active", o ].join(" "));
        a.sliding = !1;
        setTimeout(function() {
          a.$element.trigger("slid");
        }, 0);
      }).emulateTransitionEnd(600);
    } else {
      this.$element.trigger(f);
      if (f.isDefaultPrevented()) return;
      r.removeClass("active");
      i.addClass("active");
      this.sliding = !1;
      this.$element.trigger("slid");
    }
    s && this.cycle();
    return this;
  };
  var n = e.fn.carousel;
  e.fn.carousel = function(n) {
    return this.each(function() {
      var r = e(this), i = r.data("bs.carousel"), s = e.extend({}, t.DEFAULTS, r.data(), typeof n == "object" && n), o = typeof n == "string" ? n : s.slide;
      i || r.data("bs.carousel", i = new t(this, s));
      typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle();
    });
  };
  e.fn.carousel.Constructor = t;
  e.fn.carousel.noConflict = function() {
    e.fn.carousel = n;
    return this;
  };
  e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
    var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = e.extend({}, i.data(), n.data()), o = n.attr("data-slide-to");
    o && (s.interval = !1);
    i.carousel(s);
    (o = n.attr("data-slide-to")) && i.data("bs.carousel").to(o);
    t.preventDefault();
  });
  e(window).on("load", function() {
    e('[data-ride="carousel"]').each(function() {
      var t = e(this);
      t.carousel(t.data());
    });
  });
}(window.jQuery);

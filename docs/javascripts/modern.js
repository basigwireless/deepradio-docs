/* =====================================================================
   BaSig Wireless — interactive layer
   - Animated sinc-pulse "signal" waves in the hero (echoes the logo)
   - Scroll reveal, scroll progress bar, compact header on scroll
   - Cursor glow on product cards
   Works with Material's instant navigation via document$.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cleanups = [];

  document.documentElement.classList.add("bw-js");

  /* ---------- Hero signal waves ---------- */
  function sinc(x) { return x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x); }

  function initWaves(canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return function () {};
    var w = 0, h = 0, dpr = 1, raf = 0, t = 0, visible = true;

    // Each layer: colour, amplitude (fraction of height), carrier, speed, vertical position, pulse width
    var layers = [
      { c: "rgba(255, 63, 164, 0.85)", a: 0.30, k: 2.2, s: 0.18, y: 0.56, wpx: 0.11, lw: 2.2 },
      { c: "rgba(255, 255, 255, 0.55)", a: -0.22, k: 2.2, s: 0.18, y: 0.56, wpx: 0.11, lw: 1.6 },
      { c: "rgba(127, 178, 255, 0.35)", a: 0.16, k: 3.1, s: -0.11, y: 0.70, wpx: 0.16, lw: 1.2 },
      { c: "rgba(255, 255, 255, 0.16)", a: 0.10, k: 4.0, s: 0.07, y: 0.38, wpx: 0.22, lw: 1 }
    ];

    function resize() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // faint grid, like an oscilloscope
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      var step = 48;
      ctx.beginPath();
      for (var gx = (t * 12) % step; gx < w; gx += step) { ctx.moveTo(gx, 0); ctx.lineTo(gx, h); }
      for (var gy = 0; gy < h; gy += step) { ctx.moveTo(0, gy); ctx.lineTo(w, gy); }
      ctx.stroke();

      for (var i = 0; i < layers.length; i++) {
        var L = layers[i];
        // pulse centre drifts across the right half of the hero
        var centre = w * (0.68 + 0.18 * Math.sin(t * L.s * 2 + i));
        var span = Math.max(w * L.wpx, 60);
        ctx.beginPath();
        for (var x = 0; x <= w; x += 3) {
          var u = (x - centre) / span;
          var env = sinc(u * 0.9);
          var carrier = Math.cos(u * L.k - t * 1.4 * (L.s > 0 ? 1 : -1));
          var y = h * L.y - env * carrier * h * L.a * (0.85 + 0.15 * Math.sin(t * 0.8 + i));
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = L.c;
        ctx.lineWidth = L.lw;
        ctx.shadowColor = L.c;
        ctx.shadowBlur = i === 0 ? 14 : 0;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }

    function loop() {
      if (visible && !document.hidden) { t += 0.016; draw(); }
      raf = requestAnimationFrame(loop);
    }

    var ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas); else window.addEventListener("resize", resize);
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
    }) : null;
    if (io) io.observe(canvas);

    resize();
    if (reduceMotion) { t = 1; draw(); } else { loop(); }

    return function () {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
      if (io) io.disconnect();
    };
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal(root) {
    var els = root.querySelectorAll(".bw-reveal");
    if (!els.length) return function () {};
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("bw-in"); });
      return function () {};
    }
    // stagger siblings inside the same grid
    els.forEach(function (el) {
      var p = el.parentElement;
      if (p && p.classList.contains("bw-grid")) {
        var idx = Array.prototype.indexOf.call(p.children, el);
        el.style.setProperty("--bw-delay", Math.min(idx * 0.05, 0.4) + "s");
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("bw-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
    return function () { io.disconnect(); };
  }

  /* ---------- Card cursor glow ---------- */
  function initCardGlow(root) {
    function onMove(e) {
      var card = e.target.closest && e.target.closest(".bw-card");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }
    root.addEventListener("pointermove", onMove);
    return function () { root.removeEventListener("pointermove", onMove); };
  }

  /* ---------- Progress bar + compact header (global, set up once) ---------- */
  var bar = document.createElement("div");
  bar.className = "bw-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = "scaleX(" + p + ")";
      document.body.classList.toggle("bw-scrolled", window.scrollY > 40);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Per-page setup ---------- */
  function setup() {
    while (cleanups.length) { try { cleanups.pop()(); } catch (e) { /* ignore */ } }
    var home = document.querySelector(".bw-home");
    document.body.classList.toggle("bw-home-page", !!home);
    document.querySelectorAll(".bw-hero__waves").forEach(function (c) { cleanups.push(initWaves(c)); });
    cleanups.push(initReveal(document));
    if (home) cleanups.push(initCardGlow(home));
    onScroll();
  }

  var lastContent = null;
  function safeSetup() {
    // Material swaps the content element on instant navigation; set up once per page
    var content = document.querySelector(".md-content") || document.body;
    if (content === lastContent) return;
    lastContent = content;
    try { setup(); } catch (e) { if (window.console) console.error("bw setup", e); }
  }
  if (document.readyState !== "loading") safeSetup();
  else document.addEventListener("DOMContentLoaded", safeSetup);
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(safeSetup);
  }
})();

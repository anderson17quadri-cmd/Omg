/* ============================================================
   OMG · Oh My Grill — Carregal do Sal
   Brasas (canvas), reveal on scroll, carrossel e formulário.
   ============================================================ */

(function () {
  "use strict";

  var WHATSAPP_NUMERO = "351964558043"; // 351 + 964 558 043
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Ano ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header no scroll ---------- */
  var header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        // Escalonar itens irmãos para uma entrada mais orgânica
        var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [el];
        var idx = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = Math.min(idx, 6) * 80 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });

    // Rede de segurança: revela o que já está (quase) visível ao carregar,
    // para nada ficar invisível se o observer não disparar.
    window.addEventListener("load", function () {
      requestAnimationFrame(function () {
        reveals.forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
            el.classList.add("in"); io.unobserve(el);
          }
        });
      });
    });
  }

  /* ---------- Brasas no canvas ---------- */
  function emberField(canvas, opts) {
    if (!canvas || reduce) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var W = 0, H = 0;
    opts = opts || {};
    var density = opts.density || 0.00009;

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.max(24, Math.floor(W * H * density));
      parts = [];
      for (var i = 0; i < target; i++) parts.push(spawn(true));
    }
    function spawn(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + 10,
        r: Math.random() * 2 + 0.6,
        vy: Math.random() * 0.6 + 0.25,
        vx: (Math.random() - 0.5) * 0.35,
        life: Math.random() * 0.5 + 0.5,
        flick: Math.random() * Math.PI * 2
      };
    }
    var colors = ["255,157,47", "255,91,40", "255,207,107"];
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.x += p.vx; p.flick += 0.08;
        p.life -= 0.0016;
        if (p.y < -10 || p.life <= 0) parts[i] = spawn(false);
        var a = Math.max(0, p.life) * (0.55 + Math.sin(p.flick) * 0.35);
        var c = colors[i % colors.length];
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + c + "," + a.toFixed(3) + ")";
        ctx.shadowBlur = 8; ctx.shadowColor = "rgba(255,120,40,.6)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    }
    var raf;
    resize();
    frame();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
  }
  emberField(document.getElementById("embers"), { density: 0.00010 });
  emberField(document.getElementById("embers2"), { density: 0.00016 });

  /* ---------- Hero: rotação dos melhores pratos ---------- */
  var heroFrames = document.querySelectorAll(".hero__frame");
  var heroCap = document.getElementById("heroCap");
  if (heroFrames.length > 1 && !reduce) {
    var hi = 0;
    setInterval(function () {
      heroFrames[hi].classList.remove("is-active");
      hi = (hi + 1) % heroFrames.length;
      heroFrames[hi].classList.add("is-active");
      if (heroCap) heroCap.textContent = heroFrames[hi].getAttribute("data-cap") || "";
    }, 3400);
  }

  /* ---------- Carrossel ---------- */
  var track = document.getElementById("carouselTrack");
  if (track) {
    var TOTAL = 42;
    for (var n = 1; n <= TOTAL; n++) {
      var num = String(n).padStart(2, "0");
      var slide = document.createElement("div");
      slide.className = "slide";
      var img = document.createElement("img");
      img.src = "galeria/foto-" + num + ".jpeg";
      img.alt = "OMG · Oh My Grill — foto " + n;
      img.loading = n <= 2 ? "eager" : "lazy";
      slide.appendChild(img);
      track.appendChild(slide);
    }

    var nowEl = document.getElementById("carNow");
    var bar = document.getElementById("carBar");
    var dotsWrap = document.getElementById("carDots");
    var index = 0, dots = [];
    for (var d = 0; d < TOTAL; d++) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Ir para a foto " + (d + 1));
      (function (i) { dot.addEventListener("click", function () { goTo(i); restart(); }); })(d);
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (nowEl) nowEl.textContent = index + 1;
      if (bar) bar.style.width = ((index + 1) / TOTAL * 100) + "%";
      dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === index); });
    }
    function goTo(i) { index = (i + TOTAL) % TOTAL; render(); }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    var pB = document.getElementById("carPrev"), nB = document.getElementById("carNext");
    if (pB) pB.addEventListener("click", function () { prev(); restart(); });
    if (nB) nB.addEventListener("click", function () { next(); restart(); });

    var timer = null, DELAY = 3800;
    function start() { if (!reduce) timer = setInterval(next, DELAY); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var carousel = document.getElementById("carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      var sx = null;
      carousel.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; stop(); }, { passive: true });
      carousel.addEventListener("touchend", function (e) {
        if (sx === null) return;
        var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        sx = null; start();
      });
    }
    render();
    start();
  }

  /* ---------- Formulário -> WhatsApp ---------- */
  var form = document.getElementById("orderForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = (document.getElementById("nome").value || "").trim();
      var tipo = document.getElementById("tipo").value;
      var detalhe = (document.getElementById("detalhe").value || "").trim();
      if (!nome) { document.getElementById("nome").focus(); return; }
      var msg =
        "Olá, OMG - Oh My Grill! 🍴\n\n" +
        "• Nome: " + nome + "\n" +
        "• Pretendo: " + tipo + "\n" +
        (detalhe ? "• Detalhes: " + detalhe + "\n" : "") +
        "\nPodem confirmar a disponibilidade? Obrigado(a)!";
      window.open("https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }
})();

/* ============================================================
   OMG - Oh My Grill · Carregal do Sal
   Interações: header no scroll, envio do formulário -> WhatsApp.
   ============================================================ */

(function () {
  "use strict";

  // Número oficial (Portugal, formato internacional só com dígitos).
  var WHATSAPP_NUMERO = "351964558043"; // 351 + 964 558 043

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header ganha sombra ao rolar ---------- */
  var header = document.getElementById("header");
  window.addEventListener(
    "scroll",
    function () {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true }
  );

  /* ---------- Galeria: carrossel automático ---------- */
  var track = document.getElementById("carouselTrack");
  if (track) {
    var TOTAL = 42; // fotos em galeria/foto-01.jpeg ... foto-42.jpeg
    var slides = [];
    for (var n = 1; n <= TOTAL; n++) {
      var num = String(n).padStart(2, "0");
      var slide = document.createElement("div");
      slide.className = "slide";
      var img = document.createElement("img");
      img.src = "galeria/foto-" + num + ".jpeg";
      img.alt = "OMG - Oh My Grill · foto " + n;
      img.loading = n <= 2 ? "eager" : "lazy";
      slide.appendChild(img);
      track.appendChild(slide);
      slides.push(slide);
    }

    var counter = document.getElementById("carCounter");
    var dotsWrap = document.getElementById("carDots");
    var index = 0;

    // Pontos (um por foto)
    var dots = [];
    for (var d = 0; d < TOTAL; d++) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Ir para a foto " + (d + 1));
      (function (i) {
        dot.addEventListener("click", function () { goTo(i); restart(); });
      })(d);
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (counter) counter.textContent = (index + 1) + " / " + TOTAL;
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }
    function goTo(i) { index = (i + TOTAL) % TOTAL; render(); }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    var prevBtn = document.getElementById("carPrev");
    var nextBtn = document.getElementById("carNext");
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });

    // Auto-play (pausa ao passar o rato / respeita reduced-motion)
    var DELAY = 3800;
    var timer = null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function start() { if (!reduce) timer = setInterval(next, DELAY); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var carousel = document.getElementById("carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      // Suporte a gesto de arrastar / swipe no telemóvel
      var startX = null;
      carousel.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
      carousel.addEventListener("touchend", function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        startX = null; start();
      });
    }

    render();
    start();
  }

  /* ---------- Envio do formulário -> WhatsApp ---------- */
  var form = document.getElementById("orderForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = (document.getElementById("nome").value || "").trim();
      var tipo = document.getElementById("tipo").value;
      var detalhe = (document.getElementById("detalhe").value || "").trim();

      if (!nome) {
        document.getElementById("nome").focus();
        return;
      }

      var msg =
        "Olá, OMG - Oh My Grill! 🍴\n\n" +
        "• Nome: " + nome + "\n" +
        "• Pretendo: " + tipo + "\n" +
        (detalhe ? "• Detalhes: " + detalhe + "\n" : "") +
        "\nPodem confirmar a disponibilidade? Obrigado(a)!";

      var url =
        "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }
})();

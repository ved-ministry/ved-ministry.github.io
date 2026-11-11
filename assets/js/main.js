// ============================================================
// MAIN — parallax hero, scroll reveal, nav state, contact form
// ============================================================

(function () {
  "use strict";

  /* ---------- Year in footer (copyright line uses a {year} token, see i18n.js) ---------- */
  window.SITE_YEAR = new Date().getFullYear();

  /* ---------- Sheep field parallax (movement + subtle zoom on scroll) ---------- */
  const field = document.getElementById("sheepField");
  const layers = field ? Array.from(field.querySelectorAll(".parallax-layer")) : [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Generic scroll parallax — reused on section-header sheep
     watermarks and story numbers/images, so the pasture motif keeps moving
     as you scroll past the hero, not just inside it ---------- */
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  const windowH = () => window.innerHeight;

  let ticking = false;
  function updateParallax() {
    ticking = false;

    if (field) {
      const rect = field.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      // progress: 0 at top of hero, 1 once hero has fully scrolled past
      const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1.4);

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute("data-depth")) || 0.3;
        const translateY = progress * depth * 140; // px — sheep drift up as you scroll
        const scale = 1 + progress * depth * 0.16; // subtle "approaching" zoom
        layer.style.transform = `translateY(${-translateY}px) scale(${scale})`;
        layer.style.transformOrigin = "50% 100%";
      });
    }

    const vh = windowH();
    parallaxEls.forEach((el) => {
      const depth = parseFloat(el.getAttribute("data-parallax")) || 0.2;
      const extraScale = el.getAttribute("data-parallax-scale");
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const translate = `translateY(${(-centerOffset * depth).toFixed(1)}px)`;
      el.style.transform = extraScale ? `${translate} scale(${extraScale})` : translate;
    });
  }

  function onScroll() {
    if (!ticking && !reduceMotion) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (!reduceMotion) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }

  /* ---------- Slow ambient drift even without scrolling ---------- */
  if (field && !reduceMotion) {
    let t = 0;
    function ambient() {
      t += 0.0022;
      layers.forEach((layer, i) => {
        const depth = parseFloat(layer.getAttribute("data-depth")) || 0.3;
        const driftX = Math.sin(t + i) * depth * 6;
        layer.style.marginLeft = `${driftX}px`;
      });
      requestAnimationFrame(ambient);
    }
    requestAnimationFrame(ambient);
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Updates filter ---------- */
  const chips = document.getElementById("blogFilter");
  if (chips) {
    chips.addEventListener("click", (e) => {
      const kind = e.target.dataset.kind;
      if (kind === undefined) return;
      chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === e.target));
      document.querySelectorAll("#blogGrid .card").forEach((c) => { c.hidden = kind && c.dataset.kind !== kind; });
    });
  }

  /* ---------- Photo lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  document.addEventListener("click", (e) => {
    if (e.target.closest("#lightbox")) return lightbox.close();
    if (!e.target.matches("[data-zoom]")) return;
    lightbox.firstElementChild.src = e.target.dataset.zoom || e.target.src;
    lightbox.lastElementChild.textContent = e.target.dataset.caption || "";
    lightbox.showModal();
  });

  /* ---------- Subscribe + analytics. Both IDs are public by design; the keys stay in the private repo. ---------- */
  const SUBSCRIBE_URL = ""; // form address from the mailing service; while empty, falls back to email
  const ANALYTICS_ID = ""; // Umami website id; while empty, nothing is loaded

  const subForm = document.getElementById("subscribeForm");
  if (subForm) {
    subForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const lang = document.documentElement.lang;
      if (!SUBSCRIBE_URL) {
        window.location.href = `mailto:caleisaiaschuratab@gmail.com?subject=Subscribe&body=${encodeURIComponent("Please add me to the ministry updates: " + subForm.EMAIL.value)}`;
        return;
      }
      const note = document.getElementById("subscribeNote");
      const say = (key) => {
        note.removeAttribute("data-i18n");
        note.textContent = (I18N[lang] || I18N.en)[key];
      };
      const data = new FormData(subForm);
      data.append("locale", lang);
      // shortcut: no-cors hides the service's reply, so only network failures show as errors; the confirmation email is the real receipt
      fetch(SUBSCRIBE_URL, { method: "POST", body: data, mode: "no-cors" }).then(
        () => { say("subscribe.done"); subForm.reset(); window.umami?.track("subscribe"); },
        () => say("subscribe.error")
      );
    });
  }

  if (ANALYTICS_ID) {
    const s = document.createElement("script");
    s.defer = true;
    s.src = "https://cloud.umami.is/script.js";
    s.dataset.websiteId = ANALYTICS_ID;
    s.dataset.doNotTrack = "true";
    document.head.append(s);
    // one event per section reached = how far people scroll
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        window.umami?.track("section", { id: entry.target.id });
        seen.unobserve(entry.target);
      });
    }, { rootMargin: "-50% 0px" });
    document.querySelectorAll("section[id]").forEach((el) => seen.observe(el));
    document.querySelectorAll("video").forEach((v) => v.addEventListener("play", () => window.umami?.track("video", { src: v.src.split("/").pop() }), { once: true }));
  }

  /* ---------- Contact form -> mailto fallback (static site, no backend) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("f_name").value.trim();
      const email = document.getElementById("f_email").value.trim();
      const country = document.getElementById("f_country").value.trim();
      const reason = document.getElementById("f_reason").value;
      const message = document.getElementById("f_msg").value.trim();

      const subject = encodeURIComponent(`[VED/EPYL website] ${reason} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCountry: ${country}\nReason: ${reason}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:caleisaiaschuratab@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();

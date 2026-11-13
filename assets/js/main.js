// ============================================================
// MAIN — updates filter, lightbox, subscribe, analytics, contact form
// ============================================================

(function () {
  "use strict";

  /* ---------- Year in footer (copyright line uses a {year} token, see i18n.js) ---------- */
  window.SITE_YEAR = new Date().getFullYear();

  document.querySelector(".nav__links [aria-current]")?.scrollIntoView({ inline: "center", block: "nearest" });

  /* ---------- "New" pill: one item at a time, changing every few seconds ---------- */
  const pillItems = document.querySelectorAll("#newsPill a");
  if (pillItems.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let on = 0;
    setInterval(() => {
      pillItems[on].classList.remove("is-on");
      on = (on + 1) % pillItems.length;
      pillItems[on].classList.add("is-on");
    }, 5000);
  }

  /* ---------- Impact map: draws itself once it is on screen ---------- */
  document.querySelectorAll(".map").forEach((map) => {
    if (!("IntersectionObserver" in window)) return map.classList.add("is-on");
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); map.classList.add("is-on"); } }, { threshold: 0.35 });
    io.observe(map);
  });

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
    lightbox.lastElementChild.textContent = (document.documentElement.lang === "es" && e.target.dataset.captionEs) || e.target.dataset.caption || "";
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

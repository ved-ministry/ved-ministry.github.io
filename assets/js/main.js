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

  /* ---------- Nav background on scroll (kept transparent w/ mix-blend, no-op placeholder) ---------- */
  const nav = document.getElementById("siteNav");
  function onNavScroll() {
    if (!nav) return;
    nav.style.padding = window.scrollY > 40 ? "14px clamp(20px, 5vw, 48px)" : "20px clamp(20px, 5vw, 48px)";
  }
  window.addEventListener("scroll", onNavScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    function closeMenu() {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function toggleMenu() {
      const open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", toggleMenu);
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
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

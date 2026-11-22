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
    io.observe(map.querySelector("svg")); // .map itself is display:contents, it has no box
  });

  /* ---------- Give questionnaire: bring each new step into view, copy numbers, send the optional note ---------- */
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-7_bQwvm407DKi0c2EkBtoyVnK6eZbVilCd8vu3LpPFIqsLMiaDjwZQEk0cFqRRc/exec"; // Google Apps Script web app (herramientas/apoyo in the private repo); while empty, falls back to email
  const TURNSTILE_KEY = "0x4AAAAAAGBjiXH6-nuFCg-d"; // Cloudflare Turnstile site key (public by design)
  // Cloudflare's check loads only when someone is about to send something, once per page
  const tsQueue = [];
  function captcha(form, slot) {
    if (!TURNSTILE_KEY || form.dataset.ts !== undefined) return;
    form.dataset.ts = "";
    const render = () => { form.dataset.ts = turnstile.render(form.querySelector(slot), { sitekey: TURNSTILE_KEY, appearance: "interaction-only", language: "auto" }); };
    if (window.turnstile) return render();
    tsQueue.push(render);
    if (tsQueue.length > 1) return;
    window.onTurnstile = () => tsQueue.forEach((f) => f());
    const sc = document.createElement("script");
    sc.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstile";
    sc.async = true;
    document.head.append(sc);
  }
  const token = (form) => form.querySelector("[name='cf-turnstile-response']")?.value || "";
  const resetCaptcha = (form) => { if (form.dataset.ts) turnstile.reset(form.dataset.ts); };
  // a plain form post (no custom headers) so Apps Script answers without a CORS preflight
  const send = (fields) => fetch(SCRIPT_URL, { method: "POST", body: new URLSearchParams(fields) })
    .then((r) => r.json()).then((r) => { if (!r.ok) throw r; return r; });
  // receipts: photos shrink to 1600 px JPEG in the browser; PDFs up to 4 MB go as they are
  const asDataURL = (blob) => new Promise((ok, no) => { const fr = new FileReader(); fr.onload = () => ok(fr.result); fr.onerror = no; fr.readAsDataURL(blob); });
  async function receipt(file) {
    if (!file || !file.size) return "";
    if (file.type.startsWith("image/")) {
      try {
        const img = await createImageBitmap(file);
        const k = Math.min(1, 1600 / Math.max(img.width, img.height));
        const c = Object.assign(document.createElement("canvas"), { width: Math.round(img.width * k), height: Math.round(img.height * k) });
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL("image/jpeg", 0.82);
      } catch (e) { /* a format the browser cannot draw (e.g. HEIC): send it as it is */ }
    }
    if (file.size > 4e6) throw "big";
    return asDataURL(file);
  }

  const gf = document.getElementById("giveFlow");
  if (gf) {
    const t = (k) => (I18N[document.documentElement.lang] || I18N.en)[k] || I18N.en[k];
    // trip planner: the answers so far, as one sentence the visitor can read back
    const recap = () => {
      const pick = (n) => [...gf.querySelectorAll(`[name="${n}"]:checked`)].map((i) => i.nextElementSibling.textContent.trim());
      document.getElementById("tripRecap").textContent = [pick("who")[0], pick("what").join(", "), pick("when")[0]].filter(Boolean).join("\n");
    };
    document.addEventListener("langchange", recap);
    // /give/#servir (button on the Church page) opens the trip planner directly
    if (location.hash === "#servir") { const r = gf.querySelector('[name="how"][value="serve"]'); r.checked = true; r.dispatchEvent(new Event("change", { bubbles: true })); }
    gf.addEventListener("change", (e) => {
      recap();
      if (e.target.type !== "radio") return;
      if (e.target.name === "freq" || e.target.name === "who") captcha(gf, "#gfCaptcha"); // only people about to send load Cloudflare
      requestAnimationFrame(() => {
        const next = [...gf.children].find((el) => el.offsetParent && el.compareDocumentPosition(e.target.closest("fieldset")) & Node.DOCUMENT_POSITION_PRECEDING);
        next?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
    gf.addEventListener("click", (e) => {
      const b = e.target.closest("[data-copy]");
      if (!b) return;
      navigator.clipboard?.writeText(b.textContent.trim()).then(() => { b.classList.add("is-copied"); setTimeout(() => b.classList.remove("is-copied"), 1500); });
    });
    const thank = (data, mailed) => {
      const box = gf.querySelector(".gf__thanks");
      const name = (data.get("name") || "").trim().split(" ")[0];
      box.querySelector(".gf__who").textContent = name ? ", " + name : "";
      const amt = data.get("amount");
      box.querySelector(".gf__sum").textContent = amt && amt !== "other" ? `${amt} · ${t(data.get("freq") === "monthly" ? "gf.monthly" : "gf.once")}` : "";
      box.querySelector(".gf__mailed").hidden = !mailed;
      box.querySelector(".gf__to").textContent = data.get("email") || "";
      gf.classList.add("is-thanked");
      box.hidden = false;
      box.focus({ preventScroll: true });
      box.scrollIntoView({ behavior: "smooth", block: "center" });
      window.umami?.track("give-thanks", { from: data.get("from"), freq: data.get("freq") });
    };
    gf.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(gf);
      const trip = data.get("how") === "serve";
      const step = gf.querySelector(trip ? ".gf__trip" : ".gf__tell");
      const btn = step.querySelector("button[type=submit]");
      const err = step.querySelector(".gf__err");
      const fail = (key) => { err.querySelector("span").textContent = t(key); err.hidden = false; btn.disabled = false; };
      err.hidden = true;
      gf.classList.toggle("is-trip", trip);
      if (trip) { // the thank-you screen reads name and email from the same places as a gift
        if (!/^\S+@\S+\.\S+$/.test(data.get("trip_email"))) return fail("trip.need_email");
        data.set("name", data.get("trip_name")); data.set("email", data.get("trip_email")); data.delete("amount");
      }
      const fields = Object.fromEntries([...data].filter(([, v]) => typeof v === "string"));
      fields.lang = document.documentElement.lang;
      fields.type = trip ? "trip" : "give";
      if (trip) { fields.what = data.getAll("what").join(","); fields.note = data.get("trip_note"); }
      if (!SCRIPT_URL) {
        const body = Object.entries(fields).filter(([k]) => !/website|turnstile|trip_/.test(k)).map(([k, v]) => `${k}: ${v}`).join("\n");
        window.location.href = `mailto:iglesiabautistaved@gmail.com?subject=${encodeURIComponent(trip ? "Mission trip to Cusco" : "Ofrenda / compromiso")}&body=${encodeURIComponent(body)}`;
        return thank(data, false);
      }
      btn.disabled = true;
      const sending = gf.querySelector(".gf__sending");
      const showSending = (on) => { gf.dataset.sending = on ? data.get("from") || "world" : ""; gf.classList.toggle("is-sending", on); sending.hidden = !on; sending.querySelector("p").textContent = t(trip ? "gf.sending_trip" : "gf.sending"); };
      try {
        const file = data.get("receipt_file");
        if (!trip) { fields.receipt = await receipt(file); fields.receipt_name = file?.name || ""; }
        showSending(true);
        sending.scrollIntoView({ behavior: "smooth", block: "center" });
        // the plane gets to land in Cusco even when Google answers fast
        const [r] = await Promise.all([send(fields), new Promise((ok) => setTimeout(ok, 3800))]);
        showSending(false);
        thank(data, !!r.mailed);
      } catch (x) {
        showSending(false);
        fail(x === "big" ? "gf.receipt_big" : "gf.error");
        resetCaptcha(gf);
      }
    });
  }

  /* ---------- Calendar: past activities hide from the short lists and fade in the year grid; dates and months follow the visitor's language ---------- */
  const today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll("#agenda .agenda-list [data-end]").forEach((li) => { if (li.dataset.end < today) li.hidden = true; });
  const agenda = document.getElementById("agenda");
  if (agenda && !agenda.querySelector(".agenda-list li:not([hidden])")) agenda.querySelector(".agenda-list").hidden = true;
  document.querySelectorAll(".year-grid .act").forEach((a) => a.classList.toggle("is-past", a.dataset.end < today));
  document.querySelectorAll(".month").forEach((m) => {
    m.classList.toggle("is-now", m.dataset.month === today.slice(0, 7));
    m.classList.toggle("is-past", m.dataset.month < today.slice(0, 7));
  });
  const nextUp = document.getElementById("nextUp");
  const next = nextUp && [...nextUp.querySelectorAll("a[data-end]")].find((a) => a.dataset.end >= today);
  if (next) { next.hidden = false; nextUp.hidden = false; }
  const dateRanges = () => {
    const lang = document.documentElement.lang;
    document.querySelectorAll(".agenda__date").forEach((t) => {
      const d = (s) => new Date(s + "T12:00:00");
      try { t.textContent = new Intl.DateTimeFormat(lang, { day: "numeric", month: "long" }).formatRange(d(t.dataset.start), d(t.dataset.end)); }
      catch (e) { /* older browsers keep the date written at build time */ }
    });
    document.querySelectorAll(".month__name").forEach((h) => {
      const name = new Date(h.dataset.month + "-15T12:00:00").toLocaleDateString(lang, { month: "long" });
      h.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    });
  };
  dateRanges();
  document.addEventListener("langchange", dateRanges);

  /* ---------- Privacy notice: once per browser ---------- */
  const notice = document.getElementById("privacyNotice");
  if (notice) {
    let seen = false;
    try { seen = localStorage.getItem("ved_notice") === "1"; } catch (e) {}
    if (!seen && !location.pathname.startsWith("/privacidad")) notice.hidden = false;
    notice.querySelector("button").addEventListener("click", () => { notice.hidden = true; try { localStorage.setItem("ved_notice", "1"); } catch (e) {} });
  }

  /* ---------- Updates: 12 at a time (long pages froze some phones), filter by kind ---------- */
  const chips = document.getElementById("blogFilter");
  const grid = document.getElementById("blogGrid");
  const more = document.getElementById("blogMore");
  if (grid && more) {
    const cards = [...grid.querySelectorAll(".card")];
    let shown = 12, kind = "";
    const render = () => {
      const match = cards.filter((c) => !kind || c.dataset.kind === kind);
      cards.forEach((c) => { c.hidden = true; });
      match.slice(0, shown).forEach((c) => { c.hidden = false; });
      more.hidden = match.length <= shown;
    };
    more.addEventListener("click", () => { shown += 12; render(); });
    chips?.addEventListener("click", (e) => {
      if (e.target.dataset.kind === undefined) return;
      kind = e.target.dataset.kind; shown = 12;
      chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === e.target));
      render();
    });
    render();
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
  const ANALYTICS_ID = "525c73d1-9c99-4be5-af16-321fc4eefe73"; // Umami website id; while empty, nothing is loaded

  // /baja/?t=… (link in every email): asks the Google script to mark the subscriber as unsubscribed
  const unsub = document.getElementById("unsub");
  if (unsub) {
    const tok = new URLSearchParams(location.search).get("t") || "";
    const show = (ok) => {
      const h = unsub.querySelector("h1");
      h.dataset.i18n = ok ? "unsub.title" : "unsub.title_no";
      h.textContent = (I18N[document.documentElement.lang] || I18N.en)[h.dataset.i18n];
      unsub.querySelector(ok ? ".unsub__ok" : ".unsub__no").hidden = false;
    };
    if (!SCRIPT_URL || !tok) show(false);
    else fetch(`${SCRIPT_URL}?baja=${encodeURIComponent(tok)}`).then((r) => r.json()).then((r) => show(r.ok), () => show(false));
  }

  const subForm = document.getElementById("subscribeForm");
  if (subForm) {
    subForm.EMAIL.addEventListener("focus", () => captcha(subForm, ".subscribe__captcha"), { once: true });
    subForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const lang = document.documentElement.lang;
      if (!SCRIPT_URL) {
        window.location.href = `mailto:iglesiabautistaved@gmail.com?subject=Subscribe&body=${encodeURIComponent("Please add me to the ministry updates: " + subForm.EMAIL.value)}`;
        return;
      }
      const note = document.getElementById("subscribeNote");
      const say = (key) => { note.removeAttribute("data-i18n"); note.textContent = (I18N[lang] || I18N.en)[key]; };
      const btn = subForm.querySelector("button[type=submit]");
      btn.disabled = true;
      send({ type: "subscribe", email: subForm.EMAIL.value, website: subForm.website.value, lang, "cf-turnstile-response": token(subForm) })
        .then(() => { say("subscribe.done"); subForm.reset(); window.umami?.track("subscribe"); })
        .catch(() => { say("subscribe.error"); btn.disabled = false; resetCaptcha(subForm); });
    });
  }

  if (ANALYTICS_ID) {
    const s = document.createElement("script");
    s.defer = true;
    s.src = "https://cloud.umami.is/script.js";
    s.dataset.websiteId = ANALYTICS_ID;
    s.dataset.doNotTrack = "true";
    s.dataset.domains = "ved-ministry.github.io"; // visits from local copies or previews are not counted
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
      window.location.href = `mailto:iglesiabautistaved@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();

// ============================================================
// WEEKLY BULLETIN — how to add a new post
// ------------------------------------------------------------
// Copy the object below and add it to the TOP of the POSTS array
// (newest first). "image" is optional — point it to a file inside
// assets/img/fotos/ (or a new folder like assets/img/blog/).
//
// {
//   date: "2027-01-10",
//   label: "Cusco",
//   title: "Short punchy title",
//   excerpt: "One or two sentences, max ~140 characters.",
//   image: "assets/img/fotos/foto-05.jpg" // or null
// }
// ============================================================

const POSTS = [
  {
    date: "2026-08-31",
    label: "Cusco",
    title: "Opening weekend at VED",
    excerpt: "Pastor Julio Jaramillo joined us to preach as we opened the doors of our new meeting place.",
    image: "assets/img/fotos/foto-01.jpg",
  },
  {
    date: "2026-08-24",
    label: "Cusco",
    title: "Provision for the new meeting place",
    excerpt: "32 chairs, a 70-inch TV for hymns, and a pulpit donated by brother Fernando W. — everything in place before opening day.",
    image: "assets/img/fotos/foto-08.jpg",
  },
  {
    date: "2026-07-15",
    label: "Desaguadero",
    title: "First EPYL graduating class",
    excerpt: "After years of training visits, the first group of pastors is set to graduate in Puno.",
    image: "assets/img/fotos/foto-11.jpg",
  },
  {
    date: "2026-06-02",
    label: "Curahuasi",
    title: "Five days in the Word",
    excerpt: "A week studying how to prepare a biblical outline with pastors Reynaldo, Santiago, and Rolando.",
    image: "assets/img/fotos/foto-14.jpg",
  },
];

function formatDate(iso, lang) {
  const d = new Date(iso + "T00:00:00");
  const locale = { en: "en-US", de: "de-DE", fr: "fr-FR" }[lang] || "en-US";
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

function renderBlog(lang) {
  const grid = document.getElementById("blogGrid");
  if (!grid) return;
  const currentLang = lang || document.documentElement.lang || "en";
  grid.innerHTML = POSTS.map(
    (p) => `
    <article class="blog-card">
      ${p.image ? `<figure style="margin:0 0 8px; aspect-ratio:16/10; overflow:hidden;"><img src="${p.image}" alt="${p.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(.95);"></figure>` : ""}
      <span class="date">${formatDate(p.date, currentLang)}</span>
      <span class="label">${p.label}</span>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
    </article>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => renderBlog());
document.addEventListener("langchange", (e) => renderBlog(e.detail.lang));

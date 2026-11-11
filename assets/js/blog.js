// Bulletin: posts live in assets/data/posts.json (newest first).
// Each card opens the full post (text + all photos) at #post-<id>.

let POSTS = [];
let filter = "";

const blogGrid = document.getElementById("blogGrid");
const blogFilter = document.getElementById("blogFilter");
const postDialog = document.getElementById("postDialog");

function postMeta(p) {
  const lang = document.documentElement.lang || "en";
  const date = new Date(p.date + "T00:00:00").toLocaleDateString(lang, { year: "numeric", month: "short", day: "numeric" });
  return `<span class="date">${date} · ${p.place}</span><span class="label">${p.type}</span>`;
}

function renderBlog() {
  const all = (I18N[document.documentElement.lang] || I18N.en)["blog.all"];
  blogFilter.innerHTML = ["", ...new Set(POSTS.map((p) => p.type))]
    .map((t) => `<button class="chip" data-type="${t}" aria-pressed="${t === filter}">${t || all}</button>`)
    .join("");
  blogGrid.innerHTML = POSTS.filter((p) => !filter || p.type === filter)
    .map(
      (p) => `
    <a class="blog-card" href="#post-${p.id}">
      ${p.photos[0] ? `<img src="${p.photos[0].src}" alt="" loading="lazy">` : ""}
      ${postMeta(p)}
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      ${p.photos.length > 1 ? `<span class="date">${p.photos.length} photos${p.videos ? " + video" : ""} →</span>` : ""}
    </a>`
    )
    .join("");
}

function openPost() {
  const p = POSTS.find((p) => location.hash === "#post-" + p.id);
  if (!p) return;
  document.getElementById("postBody").innerHTML =
    postMeta(p) +
    `<h3 id="postTitle">${p.title}</h3>` +
    (p.body || p.excerpt).split("\n\n").map((t) => `<p>${t}</p>`).join("") +
    `<div class="post__photos">` +
    p.photos.map((f) => `<figure${f.wide ? ' class="wide"' : ""}><a href="${f.src}" target="_blank"><img src="${f.src}" alt="${f.caption || p.title}" loading="lazy"></a>${f.caption ? `<figcaption>${f.caption}</figcaption>` : ""}</figure>`).join("") +
    `</div>` +
    (p.videos || []).map((v) => `<video src="${v.src}" poster="${v.poster}" controls playsinline preload="none"></video>`).join("");
  postDialog.showModal();
  window.umami?.track("post", { id: p.id });
}

blogFilter.addEventListener("click", (e) => {
  if (e.target.dataset.type === undefined) return;
  filter = e.target.dataset.type;
  renderBlog();
});
postDialog.addEventListener("click", (e) => { if (e.target === postDialog) postDialog.close(); }); // backdrop
postDialog.addEventListener("close", () => postDialog.querySelectorAll("video").forEach((v) => v.pause()));
postDialog.addEventListener("close", () => history.replaceState(null, "", "#blog"));
window.addEventListener("hashchange", openPost);
document.addEventListener("langchange", renderBlog);

fetch("assets/data/posts.json")
  .then((r) => r.json())
  .then((posts) => { POSTS = posts; renderBlog(); openPost(); });

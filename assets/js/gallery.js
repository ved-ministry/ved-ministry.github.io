// Renders the "growth of the church" photo carousel from assets/img/fotos.
// To add more photos later: drop optimized .jpg files into assets/img/fotos/
// and add their filenames to PHOTO_FILES below. The track is duplicated once
// so the CSS scroll animation (layout.css, .carousel__track) loops seamlessly.

const PHOTO_FILES = Array.from({ length: 20 }, (_, i) =>
  `foto-${String(i + 1).padStart(2, "0")}.jpg`
);

function renderGallery() {
  const track = document.getElementById("churchCarouselTrack");
  if (!track) return;
  const items = PHOTO_FILES.map(
    (file) => `
      <figure class="carousel__item">
        <img src="assets/img/fotos/${file}" alt="VED church community, Cusco" loading="lazy">
      </figure>`
  ).join("");
  track.innerHTML = items + items; // duplicate for the infinite loop
}

document.addEventListener("DOMContentLoaded", renderGallery);

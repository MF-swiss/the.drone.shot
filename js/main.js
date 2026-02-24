// Header laden
fetch("components/header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header").innerHTML = data);

// Footer laden
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

// Dynamisches Laden der Portfolio-Bilder
fetch('assets/images/portfolio/portfolio.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.querySelector('.grid');

    data.images.forEach((img, index) => {
      const el = document.createElement('img');
      el.src = `assets/images/portfolio/${img}`;
      el.classList.add('fade-in');
      gallery.appendChild(el);

      // Für Lightbox speichern
      galleryImages.push(el);

      // Klick-Event
      el.addEventListener('click', () => openLightbox(index));
    });
  });

  // LIGHTBOX SETUP
let lightbox;
let currentIndex = 0;
let galleryImages = [];

// Lightbox HTML erzeugen
function createLightbox() {
  lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = `
    <span class="lightbox-close">✕</span>
    <span class="lightbox-prev">‹</span>
    <span class="lightbox-next">›</span>
    <img src="" alt="Lightbox Image">
  `;
  document.body.appendChild(lightbox);

  lightbox.querySelector('.lightbox-close').onclick = () => closeLightbox();
  lightbox.querySelector('.lightbox-prev').onclick = () => showPrev();
  lightbox.querySelector('.lightbox-next').onclick = () => showNext();
}

// Bild anzeigen
function openLightbox(index) {
  currentIndex = index;
  const img = lightbox.querySelector('img');
  img.src = galleryImages[index].src;
  lightbox.classList.add('active');
}

// Lightbox schließen
function closeLightbox() {
  lightbox.classList.remove('active');
}

// Navigation
function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openLightbox(currentIndex);
}

// Lightbox initialisieren
createLightbox();
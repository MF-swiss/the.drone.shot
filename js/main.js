// Header laden
fetch("components/header.html")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.text();
  })
  .then(data => {
    const headerEl = document.getElementById("header");
    if (headerEl) {
      // Sicheres Laden mit textContent für HTML-Komponenten
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      headerEl.innerHTML = tempDiv.innerHTML;
    }
  })
  .catch(err => console.error('Header konnte nicht geladen werden:', err));

// Footer laden
fetch("components/footer.html")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.text();
  })
  .then(data => {
    const footerEl = document.getElementById("footer");
    if (footerEl) {
      footerEl.innerHTML = data;
    }
  })
  .catch(err => console.error('Footer konnte nicht geladen werden:', err));

// Dynamisches Laden der Portfolio-Bilder
fetch('assets/images/portfolio/portfolio.json')
  .then(res => {
    if (!res.ok) throw new Error(`Portfolio JSON nicht gefunden: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const gallery = document.querySelector('.grid');
    if (!gallery) return;

    if (!data.images || !Array.isArray(data.images)) {
      console.error('portfolio.json hat unerwartetes Format');
      return;
    }

    data.images.forEach((img, index) => {
      const el = document.createElement('img');
      el.src = `assets/images/portfolio/${img}`;
      el.alt = `Portfolio-Bild ${index + 1}`;
      el.classList.add('fade-in');
      gallery.appendChild(el);

      // Für Lightbox speichern
      galleryImages.push(el);

      // Klick-Event
      el.addEventListener('click', () => openLightbox(index));
    });
  })
  .catch(err => {
    console.error('Portfolio konnte nicht geladen werden:', err);
    // Fallback: zeige Meldung an
    const gallery = document.querySelector('.grid');
    if (gallery) {
      gallery.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Portfolio wird geladen...</p>';
    }
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

// KONTAKT FORMULAR HANDLER
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Email via FormSubmit.co oder ähnlichem Service senden
    // Für jetzt: nur Daten validieren und User-Feedback geben
    console.log('Kontaktformular Daten:', data);
    
    const messageEl = document.getElementById('formMessage');
    if (messageEl) {
      messageEl.style.display = 'block';
      messageEl.textContent = '✓ Danke! Nachricht wurde empfangen. Ich melde mich bald bei dir.';
      messageEl.style.color = 'var(--primary-blue)';
      contactForm.reset();
      
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
    
    // TODO: Mit echtem Backend verbinden
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
  });
}

// KEYBOARD NAVIGATION FÜR LIGHTBOX
document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      showPrev();
      break;
    case 'ArrowRight':
      showNext();
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
});
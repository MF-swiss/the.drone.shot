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

// Dynamisches Laden der Portfolio-Bilder und Videos
fetch('assets/images/portfolio/portfolio.json')
  .then(res => {
    if (!res.ok) throw new Error(`Portfolio JSON nicht gefunden: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const gallery = document.querySelector('.grid');
    if (!gallery) return;

    // Support für verschiedene Formate: direktes Array, .items Property, oder .images
    let items = Array.isArray(data) ? data : (data.items || data.images?.map((img, i) => ({
      type: 'image',
      src: `assets/images/portfolio/${img}`,
      alt: `Portfolio-Bild ${i + 1}`
    })) || []);

    if (!Array.isArray(items) || items.length === 0) {
      console.error('portfolio.json hat unerwartetes Format');
      return;
    }

    items.forEach((item, index) => {
      let el;
      const galleryIndex = galleryImages.length; // Speichere die aktuelle Länge als Index

      if (item.type === 'video') {
        // Video-Container erstellen
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('portfolio-video-container', 'fade-in');
        videoContainer.setAttribute('data-video', item.src);
        videoContainer.setAttribute('data-poster', item.poster);
        
        // Poster Image initial anzeigen
        const posterImg = document.createElement('img');
        posterImg.src = item.poster;
        posterImg.alt = item.title;
        posterImg.classList.add('portfolio-video-poster');
        posterImg.loading = 'lazy';
        
        // Play-Button Overlay
        const playButton = document.createElement('div');
        playButton.classList.add('play-button');
        playButton.innerHTML = '▶';
        
        videoContainer.appendChild(posterImg);
        videoContainer.appendChild(playButton);
        
        el = videoContainer;
        gallery.appendChild(el);

        // Klick zum Öffnen in Lightbox
        videoContainer.addEventListener('click', () => openLightboxVideo(item.src, galleryIndex));

        // Für Lightbox speichern
        galleryImages.push({
          type: 'video',
          src: item.src,
          alt: item.alt || item.title
        });
      } else {
        // Bild-Element
        el = document.createElement('img');
        el.src = item.src || item.thumbnail; // Unterstütze src oder thumbnail
        el.alt = item.alt || item.title;
        el.classList.add('fade-in');
        gallery.appendChild(el);

        // Für Lightbox speichern
        galleryImages.push({
          type: 'image',
          src: item.src || item.thumbnail,
          alt: item.alt || item.title
        });

        // Klick-Event
        el.addEventListener('click', () => openLightbox(galleryIndex));
      }
    });

    // INTERSECTION OBSERVER FÜR VIDEO LAZY-LOADING
    const videoContainers = document.querySelectorAll('.portfolio-video-container');
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const container = entry.target;
        const videoSrc = container.getAttribute('data-video');
        const poster = container.getAttribute('data-poster');

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!container.classList.contains('loaded')) {
            container.classList.add('loaded');
            
            // Leere Container
            container.innerHTML = '';
            
            // Video-Element erstellen
            const video = document.createElement('video');
            video.src = videoSrc;
            video.poster = poster;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsinline = true;
            video.classList.add('portfolio-video');
            
            container.appendChild(video);
            
            // Play-Button Overlay
            const playButton = document.createElement('div');
            playButton.classList.add('play-button');
            playButton.innerHTML = '▶';
            container.appendChild(playButton);
          }
        }
      });
    }, {
      threshold: 0.5
    });

    videoContainers.forEach(container => videoObserver.observe(container));
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
    <div class="lightbox-media">
      <img src="" alt="Lightbox Image" class="lightbox-image" style="display: none;">
      <video class="lightbox-video" style="display: none;" controls></video>
    </div>
  `;
  document.body.appendChild(lightbox);

  lightbox.querySelector('.lightbox-close').onclick = () => closeLightbox();
  lightbox.querySelector('.lightbox-prev').onclick = () => showPrev();
  lightbox.querySelector('.lightbox-next').onclick = () => showNext();
}

// Bild anzeigen
function openLightbox(index) {
  currentIndex = index;
  const item = galleryImages[index];
  
  if (item.type === 'video') {
    openLightboxVideo(item.src, index);
  } else {
    const img = lightbox.querySelector('.lightbox-image');
    const video = lightbox.querySelector('.lightbox-video');
    
    img.style.display = 'block';
    video.style.display = 'none';
    img.src = item.src || item;
    lightbox.classList.add('active');
  }
}

// Video in Lightbox öffnen
function openLightboxVideo(videoSrc, index) {
  currentIndex = index;
  const img = lightbox.querySelector('.lightbox-image');
  const video = lightbox.querySelector('.lightbox-video');
  
  img.style.display = 'none';
  video.style.display = 'block';
  video.src = videoSrc;
  video.play();
  lightbox.classList.add('active');
}

// Lightbox schließen
function closeLightbox() {
  const video = lightbox.querySelector('.lightbox-video');
  if (video) {
    video.pause();
  }
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
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const messageEl = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Button während des Sendens deaktivieren
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';
    }
    
    try {
      const formData = new FormData(contactForm);
      
      // An Formspree senden
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Erfolg
        if (messageEl) {
          messageEl.style.display = 'block';
          messageEl.textContent = '✓ Danke! Deine Nachricht wurde erfolgreich gesendet.';
          messageEl.style.color = 'var(--primary-blue)';
        }
        contactForm.reset();
        
        setTimeout(() => {
          if (messageEl) messageEl.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Formular konnte nicht gesendet werden');
      }
    } catch (error) {
      // Fehler
      console.error('Formular Fehler:', error);
      if (messageEl) {
        messageEl.style.display = 'block';
        messageEl.textContent = '⚠ Es gab ein Problem beim Senden. Bitte versuche es erneut.';
        messageEl.style.color = '#ff4444';
      }
    } finally {
      // Button wieder aktivieren
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Nachricht senden';
      }
    }
  });
}

// Mache die Funktion global verfügbar
window.initContactForm = initContactForm;

// Versuche auch beim Laden zu initialisieren (falls Formular bereits da ist)
document.addEventListener('DOMContentLoaded', initContactForm);

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
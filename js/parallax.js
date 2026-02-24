// Parallax mit requestAnimationFrame für bessere Performance
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      document.querySelectorAll('.parallax').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.3');
        const yPos = lastScrollY * speed;
        el.style.backgroundPosition = `center calc(50% + ${yPos}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
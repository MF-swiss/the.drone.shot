window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = el.getAttribute('data-speed');
    const yPos = window.scrollY * speed;
    el.style.backgroundPosition = `center calc(50% + ${yPos}px)`;
  });
});
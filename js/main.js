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

    data.images.forEach(img => {
      const el = document.createElement('img');
      el.src = `assets/images/portfolio/${img}`;
      el.classList.add('fade-in');
      gallery.appendChild(el);
    });
  });
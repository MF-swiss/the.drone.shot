fetch("assets/images/portfolio/portfolio.json")
  .then(res => res.json())
  .then(items => {
    const grid = document.querySelector(".portfolio-grid");

    items.forEach(item => {
      const html = `
        <div class="portfolio-item" data-category="${item.category}">
          <img src="${item.thumbnail}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank">Zum Reel</a>
        </div>
      `;
      grid.insertAdjacentHTML("beforeend", html);
    });
  })
  .catch(err => console.error("Portfolio konnte nicht geladen werden:", err));
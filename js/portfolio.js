fetch("assets/images/portfolio/portfolio.json")
  .then(res => res.json())
  .then(items => {
    const grid = document.querySelector(".portfolio-grid");

    items.forEach(item => {
      let html = "";

      // IMAGE ITEM
      if (item.type === "image") {
        html = `
          <div class="portfolio-item" data-category="${item.category}">
            <img 
              src="${item.thumbnail}" 
              alt="${item.title}" 
              loading="lazy"
            >
            <div class="portfolio-info">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <a href="${item.link}" target="_blank" class="portfolio-link">Zum Reel</a>
            </div>
          </div>
        `;
      }

      // VIDEO ITEM
      if (item.type === "video") {
        html = `
          <div class="portfolio-item" data-category="${item.category}">
            <div 
              class="portfolio-video-container"
              data-video="${item.src}"
              data-poster="${item.poster}"
            >
              <img 
                src="${item.poster}" 
                alt="${item.title}" 
                class="portfolio-video-poster"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              >
              <div class="play-button">▶</div>
            </div>

            <div class="portfolio-info">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        `;
      }

      grid.insertAdjacentHTML("beforeend", html);
    });

    // INTERSECTION OBSERVER FOR VIDEOS
    const videoContainers = document.querySelectorAll(".portfolio-video-container");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const container = entry.target;
        const videoSrc = container.getAttribute("data-video");
        const poster = container.getAttribute("data-poster");
        const posterImg = container.querySelector(".portfolio-video-poster");
        const playButton = container.querySelector(".play-button");
        let videoEl = container.querySelector(".portfolio-video");

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!container.classList.contains("loaded")) {
            container.classList.add("loaded");

            if (!videoEl) {
              videoEl = document.createElement("video");
              videoEl.classList.add("portfolio-video");
              videoEl.autoplay = true;
              videoEl.muted = true;
              videoEl.loop = true;
              videoEl.playsInline = true;
              videoEl.preload = "metadata";
              videoEl.poster = poster;
              videoEl.style.opacity = "0";
              videoEl.style.transition = "opacity 0.4s ease";

              const source = document.createElement("source");
              source.src = videoSrc;
              source.type = "video/mp4";
              videoEl.appendChild(source);

              if (playButton) {
                container.insertBefore(videoEl, playButton);
              } else {
                container.appendChild(videoEl);
              }

              if (posterImg) {
                posterImg.style.transition = "opacity 0.4s ease";
              }

              videoEl.addEventListener("loadeddata", () => {
                videoEl.style.opacity = "1";
                if (posterImg) {
                  posterImg.style.opacity = "0";
                  posterImg.style.pointerEvents = "none";
                }
              }, { once: true });
            }
          }
        } else {
          if (container.classList.contains("loaded")) {
            container.classList.remove("loaded");
            if (videoEl) {
              videoEl.pause();
              videoEl.remove();
            }
            if (posterImg) {
              posterImg.style.opacity = "1";
              posterImg.style.pointerEvents = "auto";
            }
          }
        }
      });
    }, {
      threshold: 0.5
    });

    videoContainers.forEach(container => observer.observe(container));

     /* ============================
       FADE-IN OBSERVER FOR ITEMS
       ============================ */
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target); // nur einmal animieren
        }
      });
    }, {
      threshold: 0.2
    });

    portfolioItems.forEach(item => fadeObserver.observe(item));
  })
  .catch(err => console.error("Portfolio konnte nicht geladen werden:", err));

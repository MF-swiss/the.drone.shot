// ==================== INSTAGRAM FEED ====================
// Modus: "manual" (Standard) oder "api" (Instagram Basic Display)
const INSTAGRAM_MODE = "manual";

// Optional: Instagram Basic Display API
// Werte setzen, um den API-Mode zu nutzen
const INSTAGRAM_ACCESS_TOKEN = "";
const INSTAGRAM_USER_ID = "";

// Manuelle Posts (lokale Bilder + Profil-Link)
const manualPosts = [
  {
    media_type: "IMAGE",
    media_url: "assets/images/portfolio/saentis.jpg",
    permalink: "https://www.instagram.com/the.drone.shot/"
  },
  {
    media_type: "IMAGE",
    media_url: "assets/images/portfolio/auto.jpg",
    permalink: "https://www.instagram.com/the.drone.shot/"
  },
  {
    media_type: "IMAGE",
    media_url: "assets/images/portfolio/pilatus.jpg",
    permalink: "https://www.instagram.com/the.drone.shot/"
  },
  {
    media_type: "IMAGE",
    media_url: "assets/images/portfolio/kybun.jpg",
    permalink: "https://www.instagram.com/the.drone.shot/"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  loadInstagramFeed();
});

function loadInstagramFeed() {
  if (INSTAGRAM_MODE === "api" && INSTAGRAM_ACCESS_TOKEN && INSTAGRAM_USER_ID) {
    const apiUrl = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error("Instagram API konnte nicht geladen werden");
        return res.json();
      })
      .then(data => {
        displayInstagramPosts(data.data || []);
      })
      .catch(err => {
        console.error("Instagram Fehler:", err);
        displayInstagramFallback();
      });
  } else if (manualPosts.length > 0) {
    displayInstagramPosts(manualPosts);
  } else {
    displayInstagramFallback();
  }
}

function displayInstagramPosts(posts) {
  const container = document.querySelector(".instagram-feed");
  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const isVideo = post.media_type === "VIDEO";

    const html = `
      <a href="${post.permalink}" target="_blank" class="instagram-post fade-in">
        <img 
          src="${isVideo ? post.thumbnail_url : post.media_url}" 
          class="instagram-photo" 
          loading="lazy"
        >
        ${isVideo ? '<div class="video-badge">▶ VIDEO</div>' : ""}
      </a>
    `;

    container.insertAdjacentHTML("beforeend", html);
  });
}

function displayInstagramFallback() {
  const container = document.querySelector(".instagram-feed");
  if (!container) return;

  container.innerHTML = `
    <div class="instagram-fallback">
      <h3>Instagram Feed nicht verfügbar</h3>
      <p>Besuche unser Profil für die neuesten FPV‑Aufnahmen.</p>
      <a href="https://www.instagram.com/the.drone.shot/" target="_blank" class="btn-primary">
        @the.drone.shot auf Instagram
      </a>
    </div>
  `;
}
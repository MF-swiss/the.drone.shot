// Instagram Feed Integration
// Hinweis: Instagram Basic Display API benötigt Access Token

const INSTAGRAM_CONFIG = {
  // Für Live-Integration füge hier deinen Access Token ein
  // Siehe: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
  accessToken: '',
  userId: '',
  feedLimit: 6,
  // Fallback: Direkte Profile URL wenn kein Token
  profileUrl: 'https://www.instagram.com/the.drone.shot/'
};

// Instagram Feed laden
function loadInstagramFeed() {
  // Wenn kein Token vorhanden, zeige Fallback mit Embed
  if (!INSTAGRAM_CONFIG.accessToken) {
    console.info('Instagram API Token nicht konfiguriert. Zeige Fallback.');
    displayInstagramFallback();
    return;
  }

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${INSTAGRAM_CONFIG.accessToken}&limit=${INSTAGRAM_CONFIG.feedLimit}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Instagram API Error');
      return res.json();
    })
    .then(data => {
      console.log('Instagram Feed geladen:', data);
      displayInstagramFeed(data.data);
    })
    .catch(err => {
      console.error('Instagram Feed konnte nicht geladen werden:', err);
      displayInstagramFallback();
    });
}

// Fallback: Zeige Instagram-Embed und CTAssistance
function displayInstagramFallback() {
  const container = document.getElementById('instagram-feed');
  if (!container) return;

  container.innerHTML = `
    <div class="instagram-fallback">
      <h3>Folge uns auf Instagram</h3>
      <p>Entdecke unsere neuesten Drone-Aufnahmen und FPV-Videos</p>
      <a href="https://www.instagram.com/the.drone.shot/" target="_blank" rel="noopener noreferrer" class="btn-primary">
        Besuche Instagram
      </a>
      <p style="margin-top: 20px; font-size: 0.9rem; color: var(--text-muted);">
        oder folge uns direkt auf Instagram: <strong>@the.drone.shot</strong>
      </p>
    </div>
  `;
}

// Instagram Feed anzeigen (wenn API Daten vorhanden)
function displayInstagramFeed(posts) {
  const container = document.getElementById('instagram-feed');
  if (!container) return;

  container.innerHTML = '';

  posts.forEach(post => {
    const postEl = document.createElement('a');
    postEl.href = post.permalink;
    postEl.target = '_blank';
    postEl.rel = 'noopener noreferrer';
    postEl.classList.add('instagram-post');
    
    // Video-Icon für Videos hinzufügen
    const img = document.createElement('img');
    img.src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    img.alt = post.caption || 'Instagram Bild';
    img.classList.add('instagram-photo');
    
    postEl.appendChild(img);
    
    // Video-Badge
    if (post.media_type === 'VIDEO') {
      const videoBadge = document.createElement('div');
      videoBadge.classList.add('video-badge');
      videoBadge.innerHTML = '▶ VIDEO';
      postEl.appendChild(videoBadge);
    }
    
    container.appendChild(postEl);
  });
}

// Lade Instagram Feed beim Seitenstart
document.addEventListener('DOMContentLoaded', () => {
  loadInstagramFeed();
});

// Exportiere Funktionen falls benötigt
export { loadInstagramFeed, displayInstagramFallback };

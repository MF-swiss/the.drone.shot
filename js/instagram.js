// Instagram Feed Integration
// Zwei Optionen: 
// 1. Mit API Token: Automatisch Profil-Feed laden
// 2. Ohne Token: Manuelle Instagram-Post-URLs einbinden

const INSTAGRAM_CONFIG = {
  // Option 1: Für Live-Integration füge hier deinen Access Token ein
  accessToken: '',
  userId: '',
  feedLimit: 6,
  
  // Option 2: Manuelle Post-URLs (ohne API Token nötig)
  manualPosts: [
    // Beispiel: 'https://www.instagram.com/p/POSTID/'
   https://www.instagram.com/p/DUQkAG6AlKb/
    
    <script async src="//www.instagram.com/embed.js"></script>
  ],
  
  // Fallback: Direkte Profile URL
  profileUrl: 'https://www.instagram.com/the.drone.shot/'
};

// Instagram Feed laden
function loadInstagramFeed() {
  // Wenn API Token vorhanden, nutze API
  if (INSTAGRAM_CONFIG.accessToken) {
    loadInstagramAPI();
    return;
  }
  
  // Wenn manuelle Posts vorhanden, zeige diese
  if (INSTAGRAM_CONFIG.manualPosts && INSTAGRAM_CONFIG.manualPosts.length > 0) {
    displayInstagramEmbeds(INSTAGRAM_CONFIG.manualPosts);
    return;
  }
  
  // Ansonsten: Fallback
  console.info('Keine Instagram-Daten konfiguriert. Zeige Fallback.');
  displayInstagramFallback();
}

// Instagram API laden (mit Token)
function loadInstagramAPI() {
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
      console.error('Instagram API Fehler:', err);
      displayInstagramFallback();
    });
}

// Instagram Embeds anzeigen (ohne API)
function displayInstagramEmbeds(postUrls) {
  const container = document.getElementById('instagram-feed');
  if (!container) return;

  container.innerHTML = '';
  
  postUrls.forEach(url => {
    const iframeContainer = document.createElement('div');
    iframeContainer.classList.add('instagram-embed-container', 'fade-in');
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.instagram.com/p/${extractPostId(url)}/embed/`;
    iframe.width = '100%';
    iframe.height = '600';
    iframe.frameborder = '0';
    iframe.scrolling = 'no';
    iframe.allowtransparency = 'true';
    iframe.allow = 'encrypted-media';
    iframe.style.cssText = 'border-radius: var(--radius);';
    iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox';
    
    iframeContainer.appendChild(iframe);
    container.appendChild(iframeContainer);
  });

  // Instagram Embed Script laden
  loadInstagramScript();
}

// Post-ID aus URL extrahieren
function extractPostId(url) {
  const match = url.match(/\/p\/([a-zA-Z0-9_-]+)\//);
  return match ? match[1] : '';
}

// Instagram Embed Script laden
function loadInstagramScript() {
  if (window.instgrm) {
    window.instgrm.Embed.process();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
}

// Instagram Feed anzeigen (API Version)
function displayInstagramFeed(posts) {
  const container = document.getElementById('instagram-feed');
  if (!container) return;

  container.innerHTML = '';

  posts.forEach(post => {
    const postEl = document.createElement('a');
    postEl.href = post.permalink;
    postEl.target = '_blank';
    postEl.rel = 'noopener noreferrer';
    postEl.classList.add('instagram-post', 'fade-in');
    
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

// Fallback: Zeige Instagram-Button und Anweisungen
function displayInstagramFallback() {
  const container = document.getElementById('instagram-feed');
  if (!container) return;

  container.innerHTML = `
    <div class="instagram-fallback">
      <h3>Folge uns auf Instagram</h3>
      <p>Entdecke unsere neuesten Drone-Aufnahmen und FPV-Videos</p>
      <a href="https://www.instagram.com/the.drone.shot/" target="_blank" rel="noopener noreferrer" class="btn-primary">
        Besuche Instagram @the.drone.shot
      </a>
      <p style="margin-top: 30px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
        <strong>💡 Um Videos hier einzubinden:</strong><br>
        1. Öffne deine Instagram Posts und kopiere die URL<br>
        2. Füge sie in js/instagram.js im Array <code>manualPosts:</code> ein<br>
        3. Oder konfiguriere einen API-Token für automatisches Laden
      </p>
    </div>
  `;
}

// Lade Instagram Feed beim Seitenstart
document.addEventListener('DOMContentLoaded', () => {
  loadInstagramFeed();
});

// Exportiere Funktionen falls benötigt
export { loadInstagramFeed, displayInstagramFallback };

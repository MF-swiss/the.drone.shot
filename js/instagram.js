// Instagram Feed Integration
// Hinweis: Instagram Basic Display API benötigt Access Token

const INSTAGRAM_CONFIG = {
  // Für Live-Integration füge hier deinen Access Token ein
  // Siehe: https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
  accessToken: '',
  userId: '',
  feedLimit: 6
};

// Instagram Feed laden (optional)
function loadInstagramFeed() {
  // Wenn kein Token vorhanden, zeige Fallback
  if (!INSTAGRAM_CONFIG.accessToken) {
    console.info('Instagram API Token nicht konfiguriert. Verwende direkten Instagram-Link.');
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
      // Hier kannst du die Bilder in die Seite einbinden
      displayInstagramFeed(data.data);
    })
    .catch(err => {
      console.error('Instagram Feed konnte nicht geladen werden:', err);
    });
}

// Instagram Feed anzeigen (optional)
function displayInstagramFeed(posts) {
  const container = document.getElementById('instagram-feed');
  if (!container) return;

  posts.forEach(post => {
    const postEl = document.createElement('a');
    postEl.href = post.permalink;
    postEl.target = '_blank';
    postEl.rel = 'noopener noreferrer';
    
    const img = document.createElement('img');
    img.src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    img.alt = post.caption || 'Instagram Bild';
    img.classList.add('instagram-photo');
    
    postEl.appendChild(img);
    container.appendChild(postEl);
  });
}

// Exportiere Funktionen falls benötigt
export { loadInstagramFeed };

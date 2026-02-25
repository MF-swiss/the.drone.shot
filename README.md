<div align="center">

# 🚁 THE DRONE SHOT
### Cinematic FPV • Aerial Photography • Creative Vision
**by Marco Fritsche**

</div>

---

# The Drone Shot – Portfolio Website

Dies ist die offizielle Portfolio‑Website von **The Drone Shot**.  
Sie zeigt Cinematic‑FPV‑Videos, Drohnenfotografie, Projekte und Kontaktmöglichkeiten in einem modernen, dunklen UI mit subtilen Animationen.

---

## ✨ Highlights

### 🎥 Hero Section
- Fullscreen‑Hintergrundvideo
- Cinematic Overlay + 3D‑Titel
- Scroll‑Indicator

### 🖼 Portfolio
- Dynamisch aus `assets/images/portfolio/portfolio.json`
- Bilder **und** Videos (Poster + Lazy‑Load per IntersectionObserver)
- Hover‑Effekte und animierte Cards

### 🔍 Lightbox
- Bilder & Videos im Overlay
- Keyboard‑Navigation (←/→/Esc)

### 📷 Instagram Feed
- Manuelle Embeds **oder** API‑Integration
- Fallback‑Block mit Anleitung

### 📩 Kontakt
- Mail‑Link + einfaches Formular (mailto)
- Klarer Kontakttext

### 🧩 Modulare Komponenten
- Header/Footer via `fetch()` aus `/components`

---

## 🛠 Technologien

- **HTML5**
- **CSS3** (Custom Animations, Gradients, Responsive)
- **JavaScript** (Fetch, IntersectionObserver, Lightbox)
- **Modulare Komponentenstruktur** (`/components/`)

---

## 📁 Projektstruktur

assets/
  images/
    icons/
    portfolio/
      portfolio.json
  videos/
    hero.mp4
    auto.mp4
    kybun.mp4
    pilatus.mp4
    saentis.mp4
    portfolio-video-1.mp4
    portfolio-video-2.mp4
    portfolio-video-3.mp4

components/
  header.html
  footer.html
  portfolio.html
  contact.html

css/
  style.css
  variables.css
  animations.css

js/
  main.js
  portfolio.js
  instagram.js
  parallax.js

index.html
about.html
contact.html

---

## ⚙️ Installation & Nutzung

1. Repository klonen oder herunterladen
2. Projekt lokal öffnen
3. `index.html` im Browser starten

---

## 🔧 Konfiguration

### Instagram Feed
In `js/instagram.js` kannst du wählen:
- **API**: `accessToken`, `userId` setzen
- **Manuell**: URLs in `manualPosts` eintragen

### Portfolio
- Inhalte in `assets/images/portfolio/portfolio.json` pflegen
- Unterstützt `image` und `video` Einträge (inkl. `poster` bei Videos)
 - Aktuelle Portfolio‑Videos: `saentis.mp4`, `auto.mp4`, `pilatus.mp4`, `kybun.mp4`

### Kontakt
- Standard ist `mailto:the.drone.shot@outlook.com`
- Bei Bedarf auf echten Backend‑Service umstellen

---

## ✉️ Kontakt

**📧 the.drone.shot@outlook.com**

---

## 📄 Lizenz

Dieses Projekt steht unter **CC BY‑NC 4.0**.  
Medieninhalte (Bilder, Videos, Logos) sind urheberrechtlich geschützt und dürfen nicht ohne Erlaubnis verwendet werden.  
Siehe `LICENSE` für Details.

---

## 📸 Credits

Alle Bilder und Videos stammen von **The Drone Shot**  
© 2026 – Alle Rechte vorbehalten.

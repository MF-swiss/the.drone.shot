<div align="center">

# 🚁 THE DRONE SHOT

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Formspree-E14C47?style=for-the-badge&logo=minutemailer&logoColor=white" alt="Formspree">

### 🎬 Cinematic FPV • 📸 Aerial Photography • 🎨 Creative Vision

**Professional drone cinematography portfolio showcasing breathtaking aerial perspectives**

[🌐 Live Demo](https://mf-swiss.github.io/the.drone.shot/) • [📧 Contact](mailto:the.drone.shot@outlook.com) • [📱 Instagram](#)

---

</div>

## 🌟 About

**The Drone Shot** is a cutting-edge portfolio website showcasing professional FPV drone cinematography and aerial photography. Built with modern web technologies, it delivers an immersive, cinematic experience with smooth animations, dynamic content loading, and responsive design.

> *"Elevated Perspective – Capturing the world from above"*

---

## ✨ Key Features

### 🎥 **Cinematic Hero Experience**
- Full-screen video background with custom overlay effects
- 3D-animated title with FPV reveal animations
- Smooth scroll indicator guiding user journey

### 🖼️ **Dynamic Portfolio Gallery**
- **JSON-driven content management** for easy updates
- **Mixed media support**: Images and videos with lazy loading
- **IntersectionObserver API** for performance optimization
- Hover effects with smooth transitions
- Professional lightbox with keyboard navigation

### 🔍 **Advanced Lightbox**
- Full-screen image and video viewing
- Keyboard controls (← → Esc)
- Smooth transitions between media
- Touch/swipe support for mobile devices

### 📱 **Social Media Integration**
- Instagram feed with API or manual embed support
- Fallback mechanisms for reliable display
- Responsive grid layout

### 📩 **Smart Contact Form**
- **Formspree** integration for reliable email delivery
- Client-side validation
- Loading states and user feedback
- Professional error handling
- No backend required

### 🎨 **Modern UI/UX**
- Dark theme with gradient accents
- Custom CSS animations and transitions
- Fully responsive (mobile-first approach)
- Modular component architecture
- Optimized performance and loading times

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Animations** | Custom CSS animations, IntersectionObserver API |
| **Architecture** | Component-based, Dynamic content loading |
| **Forms** | Formspree API integration |
| **Media** | Lazy loading, Responsive images/videos |
| **Deployment** | GitHub Pages |

---

## 📁 Project Structure

```
the.drone.shot/
├── 📄 index.html              # Main landing page
├── 📄 about.html              # About page
├── 📄 contact.html            # Standalone contact page
├── 📄 README.md               # Project documentation
├── 📄 LICENSE                 # Copyright & license
│
├── 📁 assets/
│   ├── 📁 images/
│   │   ├── 📁 icons/          # UI icons and logos
│   │   └── 📁 portfolio/      # Portfolio images
│   │       └── portfolio.json # Portfolio content configuration
│   └── 📁 videos/             # Video assets (hero, portfolio)
│
├── 📁 components/             # Reusable HTML components
│   ├── header.html            # Navigation header
│   ├── footer.html            # Footer with links
│   ├── portfolio.html         # Portfolio section
│   └── contact.html           # Contact form component
│
├── 📁 css/
│   ├── style.css              # Main styles
│   ├── variables.css          # CSS custom properties
│   └── animations.css         # Animation definitions
│
└── 📁 js/
    ├── main.js                # Core functionality & components loader
    ├── portfolio.js           # Portfolio gallery logic
    ├── instagram.js           # Instagram feed integration
    ├── parallax.js            # Parallax scroll effects
    └── animations.js          # Animation controllers
```

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for best experience)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MF-swiss/the.drone.shot.git
   cd the.drone.shot
   ```

2. **Open with a local server** (recommended)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

3. **Or simply open in browser**
   ```bash
   # Open index.html directly in your browser
   open index.html  # macOS
   start index.html # Windows
   ```

4. **Visit** `http://localhost:8000` in your browser

---

## ⚙️ Configuration

### 📸 Portfolio Content

Edit `assets/images/portfolio/portfolio.json` to manage your portfolio:

```json
[
  {
    "type": "image",
    "src": "assets/images/portfolio/image1.jpg",
    "alt": "Aerial view description",
    "title": "Project Title"
  },
  {
    "type": "video",
    "src": "assets/videos/portfolio-video-1.mp4",
    "poster": "assets/images/portfolio/video-poster.jpg",
    "title": "Video Project Title"
  }
]
```

### 📧 Contact Form (Formspree)

The contact form uses Formspree for email delivery. To configure:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint ID
3. Update the form action in `components/contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 📱 Instagram Feed

Configure in `js/instagram.js`:

**Option 1: API Integration**
```javascript
const config = {
  accessToken: 'YOUR_ACCESS_TOKEN',
  userId: 'YOUR_USER_ID'
};
```

**Option 2: Manual Posts**
```javascript
const manualPosts = [
  { url: 'https://instagram.com/p/POST_ID/', image: 'path/to/image.jpg' },
  // Add more posts...
];
```

### 🎨 Styling & Branding

Customize colors and branding in `css/variables.css`:

```css
:root {
  --primary-blue: #00d4ff;
  --text-primary: #ffffff;
  --bg-dark: #0a0a0a;
  /* ... more variables */
}
```

---

## 🌐 Deployment

### GitHub Pages

This site is deployed using GitHub Pages. To deploy your own version:

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select `main` branch as source
   - Save

2. **Access your site**
   - URL: `https://YOUR_USERNAME.github.io/the.drone.shot/`

3. **Custom Domain** (optional)
   - Add a `CNAME` file with your domain
   - Configure DNS settings at your domain provider

### Alternative Deployment Options

- **Netlify**: Drag & drop deployment with automatic builds
- **Vercel**: Zero-config deployment with preview URLs
- **AWS S3 + CloudFront**: Scalable cloud hosting
- **Traditional Hosting**: Upload via FTP/SFTP

---

## 🎯 Performance Optimizations

- ✅ **Lazy Loading**: Videos and images load on-demand using IntersectionObserver
- ✅ **Component-Based Architecture**: Dynamic loading reduces initial payload
- ✅ **Optimized Assets**: Compressed images and videos
- ✅ **Minimal Dependencies**: Vanilla JavaScript (no frameworks)
- ✅ **CSS Custom Properties**: Efficient styling and theming
- ✅ **Async Operations**: Non-blocking content loading

---

## 🔮 Future Enhancements

- [ ] Add CMS integration for easier content management
- [ ] Implement progressive web app (PWA) features
- [ ] Add blog section for project stories
- [ ] Integrate analytics dashboard
- [ ] Add multi-language support (EN/DE)
- [ ] Create video showcase with categories/filters
- [ ] Implement dark/light theme toggle
- [ ] Add customer testimonials section

---

## 🐛 Troubleshooting

### Contact form not working
- Verify Formspree endpoint is correct
- Check browser console for errors
- Ensure JavaScript is enabled
- Confirm network connectivity

### Videos not loading
- Check video file paths in `portfolio.json`
- Ensure video formats are web-compatible (MP4/H.264)
- Verify file sizes aren't too large (compress if needed)

### Components not loading
- Check browser console for fetch errors
- Ensure correct file paths in component loader
- Verify local server is running (avoid `file://` protocol)

---

## 📝 Best Practices

### Adding New Content

1. **Images**: Place in `assets/images/portfolio/`
   - Recommended size: 1920x1080px
   - Format: JPG or WebP
   - Optimize for web (< 500KB)

2. **Videos**: Place in `assets/videos/`
   - Format: MP4 (H.264 codec)
   - Recommended bitrate: 5-10 Mbps
   - Include poster image for thumbnails

3. **Update JSON**: Add entries to `portfolio.json`

### Code Style

- Use consistent indentation (2 spaces)
- Comment complex logic
- Follow semantic HTML5 structure
- Use CSS custom properties for theming
- Keep JavaScript modular and maintainable

---

## 📄 License

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

- ✅ You can view and share this code for learning purposes
- ✅ Attribution required
- ❌ Commercial use prohibited
- ❌ Media content (images, videos) are protected by copyright

**Media Content**: All photographs, videos, and visual assets are © 2026 The Drone Shot. Unauthorized use is prohibited.

See [LICENSE](LICENSE) file for full details.

---

## 👤 About the Creator

**Marco Fritsche** – Professional FPV drone pilot and aerial cinematographer based in Switzerland.

### 📞 Contact & Connect

- 📧 **Email**: [the.drone.shot@outlook.com](mailto:the.drone.shot@outlook.com)
- 📸 **Instagram**: [@the.drone.shot](#)
- 🌐 **Website**: [mf-swiss.github.io/the.drone.shot](https://mf-swiss.github.io/the.drone.shot/)
- 💼 **GitHub**: [@MF-swiss](https://github.com/MF-swiss)

---

## 🙏 Acknowledgments

- Built with passion for aerial cinematography
- Inspired by the Swiss landscape and FPV community
- Thanks to all clients who trusted The Drone Shot with their projects

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/MF-swiss/the.drone.shot?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/MF-swiss/the.drone.shot?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/MF-swiss/the.drone.shot?style=flat-square)

---

<div align="center">

### ⭐ If you like this project, please give it a star!

**Made with ❤️ and 🚁 in Switzerland**

[Back to Top ↑](#-the-drone-shot)

</div>

# Shivam Parab — Professional Portfolio

A high-performance, cinematic, dark-themed personal site for Shivam Parab — Software Engineer, Game Developer, and Educator based in the UK. 

This portfolio is engineered with a modern WebGL and GSAP architecture to deliver a cutting-edge, visually rich 60FPS immersive experience. It maintains strict accessibility and responsive design standards while providing an optimal developer experience.

## Technical Architecture & Key Features

### Cinematic Micro-Interactions
- **GSAP & ScrollTrigger** — Fluid, hardware-accelerated stagger reveals for all sections, completely replacing legacy CSS animation libraries.
- **Lenis Smooth Scroll** — Perfectly synced scroll momentum tied directly to the GSAP Ticker for jitter-free navigation.
- **SplitType Reveals** — Character-by-character cascading text effects mapping precise CSS gradients to the geometry of the text.
- **Magnetic Physics** — UI buttons, navigational links, and social icons utilize `requestAnimationFrame` spring physics to magnetically track the user's cursor.
- **Dynamic Spotlights** — Project and skill cards feature a radial gradient tracking system that illuminates borders and surfaces based on cursor proximity, avoiding expensive DOM reflows.

### 3D WebGL Environments
- **Vanta.js / Three.js** — Interactive, neural-network-inspired particle canvases rendered in real-time.
- **IntersectionObserver Engine** — Multiple WebGL instances (Hero, Contact, and Case Studies) are orchestrated by a custom `IntersectionObserver` that automatically mounts and destroys canvas rendering contexts when exiting the viewport. This preserves GPU cycles and battery life.

### Robust Dependency Management
- **Zero CDN Dependency** — All CSS and JS libraries (GSAP, Three, Vanta, Typed, SplitType, Lenis) are shipped locally in the `/vendor` directory. This guarantees 100% uptime, offline availability during development, and blazing fast Time-to-Interactive (TTI).
- **Modular CSS Components** — Styling is aggressively scoped into the `/components` directory, adhering to a strict BEM-styled naming convention. Global tokens are managed via CSS Custom Properties (Variables).

## Repository Structure

```text
SP-Portfolio/
├── index.html                  Main portfolio interface
├── secure-banking.html         Case study: Secure Banking Auth
├── portfolio-case-study.html   Case study: Personal Portfolio
├── css/
│   ├── style.css               Main stylesheet orchestrator
│   ├── base/                   Global resets, typography, and variable tokens
│   ├── components/             Modular CSS layouts (Hero, About, Projects, etc)
│   └── vendor/                 Local CSS dependencies (Lenis, FontAwesome)
└── js/
    ├── main.js                 Core interaction engine (GSAP, Vanta, Physics)
    └── vendor/                 Local JS dependencies (GSAP, Three, Vanta, Typed)
```

## Development & Deployment Guide

### Local Development
Work from the repository root. Because the site utilizes local module structures and vendor files, it requires an HTTP server to resolve relative paths and prevent CORS violations when fetching local assets.

For the most accurate development experience, serve the directory via Python:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080`.

### Customization & Styling
All global thematic variables (colors, fonts, sizing, transitions) are defined in `css/base`. 
- To alter the site's primary neon accent colors, modify the custom properties within `css/base/typography.css` or `css/base/section-base.css` as appropriate.
- Content modifications should be handled directly within the HTML templates.

### Deployment
This portfolio is a purely static site consisting of HTML, CSS, and JS. It requires no build step, transpilation, or server-side rendering.
It can be deployed seamlessly to any static hosting provider natively:
- **Vercel**: Deploy via the Vercel CLI or GitHub integration. Set the framework preset to "Other".
- **Netlify**: Deploy by linking the repository. No build command is required. Publish directory is the root (`/`).
- **GitHub Pages**: Go to repository settings > Pages > Deploy from branch (main).

## Tech Stack

- **Structure**: HTML5, Semantic HTML
- **Styling**: Vanilla CSS3 (Custom Properties, Grid, Flexbox, hardware-accelerated transforms, mix-blend-modes)
- **Logic**: Vanilla JavaScript (ES6+), custom `IntersectionObserver` & `requestAnimationFrame` engines
- **Animation**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **Text Engines**: [SplitType](https://github.com/lukePeavey/SplitType) & [Typed.js](https://github.com/mattboldt/typed.js/)
- **WebGL Rendering**: [Three.js](https://threejs.org/) + [Vanta.js](https://www.vantajs.com/)
- **Typography/Iconography**: Google Fonts (Space Grotesk, JetBrains Mono) & Font Awesome 6.4

## Links

- **Portfolio:** [sp-portfolio-nine.vercel.app](https://sp-portfolio-nine.vercel.app)
- **GitHub:** [github.com/Shivam361](https://github.com/Shivam361)
- **LinkedIn:** [linkedin.com/in/shivam-parab-3b747b150](https://www.linkedin.com/in/shivam-parab-3b747b150/)

## Notes

- The **contact form** operates entirely client-side and simulates visual submission feedback. Hook the form action to Formspree, Netlify Forms, EmailJS, or similar endpoints if you require active email delivery.
- External assets (Google Fonts, Font Awesome) still require an active web connection when viewing locally unless you download and self-host the font files and SVGs.

## Future Work & Maintenance

- Integrate **Open Graph** (`og:image`, `og:title`) and Twitter meta tags for enhanced social media sharing once the final production domain is secured.
- Configure a canonical URL within the `<head>` to prevent SEO duplication penalties.
- Replace the About section profile placeholder with a high-resolution portrait photograph.
- Expand the `portfolio-case-study.html` template to support additional projects as your career progresses.

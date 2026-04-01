# Shivam Parab — Professional Portfolio (SPA)

A high-performance, cinematic **Single Page Application (SPA)**, dark-themed personal site for Shivam Parab — Software Engineer, Game Developer, and Educator based in the UK.

This portfolio is engineered with a modern **Swup.js + WebGL + GSAP** architecture to deliver a cutting-edge, visually rich 60FPS immersive experience. It features seamless page transitions, persistent UI elements, and robust memory management for a flawlessly smooth user journey.

## Technical Architecture & Key Features

### Cinematic Single Page Application (SPA)

- **Swup.js Core** — Powering a true SPA experience where only the content swaps, leaving the 3D backgrounds, smooth scroll, and custom cursors running uninterrupted.
- **GSAP & ScrollTrigger** — Fluid, hardware-accelerated stagger reveals for all sections, perfectly re-indexed on every page view.
- **Lenis Smooth Scroll** — Persistent scroll momentum across navigations, synced directly to the GSAP Ticker for jitter-free movement.
- **Cinematic Fade Transitions** — High-performance opacity crossfades that eliminate "page blink" and harsh reloads.
- **Magnetic Physics & Spotlights** — UI elements utilize spring physics and radial tracking to follow the user's cursor across all pages.

### Intelligent Resource & Memory Management

- **Vanta.js / Three.js** — Interactive, neural-network-inspired particle canvases rendered in real-time.
- **Smart Lifecycle Hooks** — Manual destruction and cleanup of WebGL contexts and Typed.js instances during transitions to prevent memory leaks and ensure peak performance.
- **Global Hash Router** — A custom navigation interceptor that intelligently routes between local smooth-scrolls (on Home) and SPA navigations (from project pages).
- **Zero CDN Dependency** — All assets are shipped locally in `/vendor` for 100% uptime and blazing fast Time-to-Interactive (TTI).
- **UI Singleton Architecture** — Persistent elements like the Navbar and Cursor are cached as singletons, reducing DOM overhead and ensuring zero layout shift during page swaps.

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

- **Routing**: [Swup.js](https://swup.js.org/) (Custom SPA Lifecycle)
- **Animation**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **WebGL Rendering**: [Three.js](https://threejs.org/) + [Vanta.js](https://www.vantajs.com/)
- **Text Engines**: [SplitType](https://github.com/lukePeavey/SplitType) & [Typed.js](https://github.com/mattboldt/typed.js/)
- **Styling**: Vanilla CSS3 (Modular Architecture, Hardware-Accelerated Transforms)
- **Typography/Iconography**: Google Fonts & Font Awesome 6.4 (Self-Hosted Vendor)

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

## 📋 Upcoming Action Items (To-Do)

Based on a holistic review of the portfolio against standard hiring requirements, the following tasks still remain:

1. **My Role & Contributions**:
   - Explicitly list my individual engineering contributions in the "Theatre Booking" and "Secure Banking" case studies to clarify team impact to recruiters.

2. **Visual Proof (Case Study Media)**:
   - Add high-quality screenshots, device mockups, or short GIFs to the case study pages to provide visual evidence of the complex CSS grids and checkout flows discussed in the text.

3. **Remaining Case Studies**:
   - Build out dedicated `.html` pages for Project 4 (**DevQuest**) and Project 5 (**Monster Slayer**), which are currently unlinked on the `index.html`.

4. **Functional Gaps in `index.html`**:
   - Integrate the **Contact Form** with a backend email service (like EmailJS or Formspree) so it actually sends messages.
   - Point the **Download CV** button to the actual PDF file of my resume.
   - Add **SEO / Open Graph `<meta>` Tags** for polished link previews on LinkedIn, Twitter, and Slack.

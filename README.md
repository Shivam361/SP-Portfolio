# Shivam Parab — Portfolio

A static, dark-themed personal site for **Shivam Parab** — **Software Engineer**, **Game Developer**, and **Educator** based in the UK. It highlights backend and .NET work, secure systems projects, game industry experience, and teaching roles.

## Features

- **Hero** — Particle canvas background, typed rotating roles, tags, CTAs, social links  
- **About** — Bio, stat cards (experience, projects, MSc, teaching), highlight list  
- **Skills** — Grouped categories (game engines, programming, backend & .NET, design, tools) with animated bars and a tech pill row  
- **Projects** — Six cards including secure banking auth, theatre reservation system, MSc dissertation (DevQuest / ML-Agents), and game work (Monster Slayer, Samsara, game jam)  
- **Experience** — Timeline with roles, dates, bullets, and tags  
- **Education** — Qualification cards with status badges (MSc and BSc graduated)  
- **Languages** — English, Hindi, Marathi  
- **Contact** — Email, phone, GitHub, LinkedIn, and a client-side contact form (demo UX only)  
- **UI polish** — Page loader with gradient bar, custom cursor (desktop), project card tilt and media sheen on hover, glassy nav when scrolled, mesh background on `body`, gradient buttons, gradient section dividers, `:focus-visible` outlines, `prefers-reduced-motion` support for loader and hero micro-animations, back-to-top, smooth anchor scrolling  
- **Nav** — Sticky header, scroll state, active section, mobile hamburger  
- **Responsive** — Layout tuned for mobile through desktop  
- **AOS** — Scroll-triggered section animations (CDN)

## File structure

```
index.html       Main page (all sections)
css/style.css    Stylesheet
js/main.js       Loader, nav, cursor, hero canvas, skill bars, form demo, AOS init
README.md        This file
```

## Run locally

Work from **`SP-Portfolio`** (this repo root): open `index.html` in a browser from here so `css/` and `js/` paths resolve. Or serve the directory:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Section anchors

| Section   | Hash       |
|----------|------------|
| Hero     | `#home`    |
| About    | `#about`   |
| Skills   | `#skills`  |
| Projects | `#projects`|
| Experience | `#experience` |
| Education  | `#education`  |
| Contact    | `#contact`    |

## Tech stack

- HTML5, CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript (Canvas, `IntersectionObserver`, scroll handlers)
- [AOS 2.3.4](https://michalsnik.github.io/aos/) (jsDelivr)
- [Font Awesome 6.4](https://fontawesome.com/) (jsDelivr)
- [Google Fonts](https://fonts.google.com/) — Space Grotesk, JetBrains Mono

## Links (live site)

Update these if your deployment URL changes.

- **GitHub:** [github.com/Shivam361](https://github.com/Shivam361)  
- **LinkedIn:** [linkedin.com/in/shivam-parab-3b747b150](https://www.linkedin.com/in/shivam-parab-3b747b150/)

## Notes

- The **contact form** does not send email; it simulates submit feedback. Hook it to Formspree, Netlify Forms, EmailJS, or similar if you need real delivery.
- External assets (fonts, icons, AOS) require an **internet connection** when viewing locally unless you self-host those files.

## Possible improvements

- Add **Open Graph** / Twitter meta and a **canonical** URL once you know your production domain  
- Replace the About **placeholder** with a photo if you want a face on the page  
- Add **screenshots, demos, or GitHub links** per project  
- Offer a **downloadable CV** (PDF) from the hero or nav  
- Optionally **disable AOS and the custom cursor in JS** when `prefers-reduced-motion: reduce` for fuller accessibility (CSS already tones down several animations)  

# Project Overview: SP-Portfolio 🏛️

> Last updated: 2026-05-03 | Status: 🟠 Live — Redesign Planned

---

## Summary

A high-performance, cinematic **Single Page Application (SPA)** — a dark-themed personal portfolio for Shivam Parab. Built to showcase projects, engineering depth, and professional experience to recruiters and collaborators — particularly for the **European job market**.

---

## 🌐 Deployment

| Field | Value |
|---|---|
| **Status** | 🟢 Live |
| **Live URL** | [sp-portfolio-nine.vercel.app](https://sp-portfolio-nine.vercel.app) |
| **Target Domain** | `shivamparab.dev` (to be secured) |
| **Hosting** | Vercel (Hobby plan) |
| **Repository** | `D:\Masters\Github\Portfolio\SP-Portfolio` |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **SPA Transitions** | Swup.js |
| **Animations** | GSAP & ScrollTrigger |
| **Smooth Scroll** | Lenis |
| **WebGL / Particles** | Three.js + Vanta.js |
| **Styling** | Vanilla CSS3 (Modular Architecture) |
| **Typography** | Google Fonts (Inter) |
| **Forms** | FormSubmit.co (AJAX) |
| **Analytics** | Plausible / Vercel Analytics (planned) |

---

## 📂 Repository Structure

```
SP-Portfolio/
├── index.html              — Main portfolio interface
├── resume.html             — Digital resume
├── Shivam_Parab_Resume.md  — Source of truth CV
├── css/
│   ├── base/               — Resets, variables, typography
│   ├── components/         — Hero, Navbar, Projects, Timeline
│   └── vendor/             — Lenis, FontAwesome (local)
├── js/                     — Core interaction engine + vendor deps
├── img/                    — Visual assets (WebP migration pending)
├── docs/                   — Documentation
└── sitemap.xml / robots.txt
```

---

## 🏗️ Technical Architecture

- **Swup.js Core**: True SPA experience — seamless content swapping, no full page reloads.
- **GSAP & ScrollTrigger**: Hardware-accelerated scroll-linked reveals.
- **Lenis Smooth Scroll**: Persistent momentum scroll across all navigation events.
- **Smart Lifecycle Hooks**: Manual destruction of WebGL (Vanta.js) contexts on route change to prevent memory leaks.
- **Zero CDN Dependency**: All assets shipped locally in `/vendor` for maximum reliability and performance.

---

## 🔄 Redesign Plan

The current version is live but the visual language and case study depth need a significant upgrade — particularly for a European engineering audience that expects technical rigour.

Key redesign priorities:
- Sharper, more opinionated visual identity
- Deeper case studies with architecture diagrams, test coverage, and decision logs
- Better mobile experience
- WebP image optimization throughout
- Custom domain `shivamparab.dev`

See [[01 Projects/Project Plan|Project Plan]] for full task breakdown.

---

## ⚠️ Known Issues / Limitations

- Images not yet converted to WebP — performance impact on slow connections.
- Custom domain not yet secured.
- No analytics currently active.
- Case studies lack media (screenshots, mockups, GIFs).

---

## 🔗 Links

- [[01 Projects/Project Plan|Project Plan]] — Roadmap & tasks
- [[03 Resources/Design System|Design System]] — CSS tokens, components, visual language
- [[02 Areas/SEO Optimization|SEO Optimization]] — Search visibility strategy
- [[Home|← Second Brain Dashboard]]

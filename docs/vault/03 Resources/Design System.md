# Design System: SP-Portfolio 🎨

## Visual Aesthetic
- **Theme**: Dark, cinematic, high-contrast.
- **Accents**: Neon gradients and radial spotlights.
- **Transitions**: High-performance opacity crossfades.
- **Philosophy**: [[Resources/Design/Design Principles|Design Principles]]

---

## 🎨 Color Tokens

Defined in `css/base/variables.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-surface` | `#111111` | Cards, panels |
| `--color-surface-raised` | `#1a1a1a` | Elevated elements |
| `--color-border` | `#2a2a2a` | Subtle dividers |
| `--color-accent` | `#7b5ea7` | Primary accent (purple) |
| `--color-accent-glow` | `rgba(123,94,167,0.3)` | Glow/spotlight effect |
| `--color-text-primary` | `#f0f0f0` | Body text |
| `--color-text-muted` | `#888888` | Secondary/helper text |
| `--color-text-faint` | `#444444` | Disabled / placeholder |

---

## ✏️ Typography

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | `'Inter', sans-serif` | Body, UI |
| `--font-display` | `'Inter', sans-serif` | Hero headings |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, labels |
| `--text-xs` | `0.75rem` | Captions, badges |
| `--text-sm` | `0.875rem` | Secondary text |
| `--text-base` | `1rem` | Body |
| `--text-lg` | `1.25rem` | Subheadings |
| `--text-xl` | `1.5rem` | Section titles |
| `--text-2xl` | `2rem` | Page titles |
| `--text-hero` | `clamp(2.5rem, 6vw, 5rem)` | Hero headline |

---

## 📐 Spacing Scale

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-24` | `96px` |

---

## ⏱️ Animation Tokens

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances |
| `--ease-in` | `cubic-bezier(0.64, 0, 0.78, 0)` | Exits |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | State changes |
| `--duration-fast` | `150ms` | Micro-interactions |
| `--duration-base` | `300ms` | Standard transitions |
| `--duration-slow` | `600ms` | Page-level reveals |
| `--duration-hero` | `1200ms` | Hero entrance animation |

---

## 🧩 Components

### Navbar
- Persistent UI singleton — cached on load, never re-queried.
- Backdrop blur on scroll: `backdrop-filter: blur(12px)`.

### Hero
- Vanta.js interactive particle canvas as background layer.
- Headline uses `--text-hero` with GSAP stagger entrance.
- Destroyed and re-initialized on Swup page transitions.

### Project Cards
- **Featured**: Full-width, media left, description right.
- **Standard**: Grid tile with hover magnetic physics effect.
- Hover lifts card with `translateY(-4px)` + accent glow shadow.

### Timeline
- Sequential work experience mapping with vertical connector line.
- Items reveal via ScrollTrigger as user scrolls into view.

---

## 🛠️ CSS Architecture

```
css/
├── base/
│   ├── reset.css        — Normalize & box-sizing
│   ├── variables.css    — All custom property tokens
│   └── typography.css   — Font stack & scale
├── components/
│   ├── hero.css
│   ├── navbar.css
│   ├── projects.css
│   └── timeline.css
└── vendor/
    ├── lenis.css
    └── fontawesome/
```

---

## 🛠️ UI Singletons

Persistent elements cached to reduce DOM overhead:

```javascript
const UI = {
  navbar: document.querySelector('#navbar'),
  cursor: document.querySelector('#cursor'),
  canvas: document.querySelector('#bg-canvas'),
};
```

---

*Linked from: [[Resources/Design/Design Principles|Design Principles]] · [[Projects/SP-Portfolio/SP-Portfolio|SP-Portfolio MOC]]*

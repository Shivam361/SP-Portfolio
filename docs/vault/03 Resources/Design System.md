# Design System: SP-Portfolio 🎨

## Visual Aesthetic
- **Theme**: Dark, cinematic, high-contrast.
- **Accents**: Neon gradients and radial spotlights.
- **Transitions**: High-performance opacity crossfades.

## 🧩 Components
- **Navbar**: Persistent UI singleton.
- **Hero**: Vanta.js interactive particle canvas.
- **Project Cards**: Featured vs. Standard layouts with magnetic physics.
- **Timeline**: Sequential work experience mapping.

## 🎨 CSS Architecture
Defined in `css/`:
- `base/`: Global resets, typography, and variable tokens.
- `components/`: Modular layouts (Hero, About, Projects).
- `vendor/`: Local dependencies (Lenis, FontAwesome).

## 🛠️ UI Singletons
Persistent elements cached to reduce DOM overhead:
- Navbar
- Custom Cursor
- Background Canvas

---
title: Case Study — Theatre Seat Reservation System
tags: [project, case-study, firebase, javascript, testing]
status: ✅ Complete
---

# 🎭 Theatre Seat Reservation System

**Type:** Team project (4-person)  
**My Role:** Core engineer — testing infrastructure + e-commerce state management + dynamic pricing  
**Tech:** JavaScript (ES6+), Firebase (Auth, Firestore, Cloud Functions), Webpack, Selenium, Jest, k6  
**Repo:** [github.com/Shivam361/theatre-booking](https://github.com/Shivam361/theatre-booking)  
**Live case study:** [sp-portfolio-nine.vercel.app/theatre-booking.html](https://sp-portfolio-nine.vercel.app/theatre-booking.html)

---

## 🎯 What It Is

A full-stack **event management and e-commerce platform** for theatre seat reservations. Handles concurrent ticket reservations, tiered subscription models, and a multi-page checkout flow with stateful cart management.

---

## 🏗️ Architecture

**Multi-Page Application (MPA)** — each page has its own isolated Webpack entry point.

### My Specific Contributions

- **Automated Testing Pipeline:** Configured k6 load tests for concurrent traffic simulation + Jest unit tests for checkout pricing logic
- **Dynamic Pricing Engine:** Algorithmic backend for ticket pricing, Firebase Auth integration for tiered loyalty discounts
- **UI & Asset Management:** Promotional DOM slideshows, CSS layout fixes within Webpack asset pipeline

---

## ⚡ Key Engineering Decisions

### Procedural Seat Matrix
Theatre layout is asymmetrical — DOM generated procedurally via multi-dimensional array algorithms. Each seat gets a unique `data-seatValue` ID cross-referenced against Firebase collision maps before rendering. Prevents double-booking at the UI level before the transaction even fires.

### MPA Asset Pipeline
Custom `webpack.config.js` with 13 entry points. `HtmlWebpackPlugin` + `MiniCssExtractPlugin` injects precisely scoped JS/CSS per page. Users never download scripts for pages they haven't navigated to — minimises TTI significantly.

### Cross-Page Cart State
MPAs destroy JS state on navigation. Solution: `localStorage` used to serialize and pass cart data between independent pages. A deliberate tradeoff — simpler than a backend session for a prototype, but documented as a limitation for production.

---

## 🧪 QA Pipeline

| Method | Tool | Coverage |
|---|---|---|
| End-to-End blackbox | Selenium WebDriver + ChromeDriver | Full booking funnel |
| Unit & integration | Jest + Babel | Pricing calculator, booking summaries |
| Load / stress | k6 | Concurrent users, Firebase latency |

Firebase Emulators used to isolate tests from production data.

---

## 💡 What I Learned

- Firebase Firestore concurrency control for race-condition prevention
- Webpack code splitting for performance at MPA scale
- k6 for realistic load simulation — more useful than Jest alone for transactional systems

---

## 🔗 Related

- [[Resources/Programming/Frontend Patterns|Frontend Patterns]] — Webpack patterns extracted from this project
- [[Areas/Career|Career]] — Featured as primary full-stack + testing example
- [[Projects/SP-Portfolio/SP-Portfolio|SP-Portfolio]]

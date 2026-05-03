---
title: Case Study — Secure Banking Authentication System
tags: [project, case-study, dotnet, csharp, security]
status: ✅ Complete
---

# 🏦 Secure Banking Authentication System

**Type:** Solo academic project  
**Tech:** C#, .NET MAUI, MVVM, SQLite, XAML  
**Repo:** [github.com/Shivam361/secure-banking-authentication-system](https://github.com/Shivam361/secure-banking-authentication-system)  
**Live case study:** [sp-portfolio-nine.vercel.app/secure-banking.html](https://sp-portfolio-nine.vercel.app/secure-banking.html)

---

## 🎯 What It Is

A deliberately scoped **educational prototype** simulating how layered security controls fit together in a maintainable .NET codebase. Not production software — designed to demonstrate architectural thinking and security awareness.

---

## 🏗️ Architecture

Service-oriented with clean separation of concerns:

| Layer | Responsibility |
|---|---|
| **MAUI UI** | Presentation — pages, shell, XAML |
| **AuthService** | Credential verification, OTP generation/validation |
| **FraudDetectionService** | Rule-based login and transaction scoring |
| **Data Layer** | SQLite models, ERD-aligned schemas |
| **Docs** | UML (use case, sequence), threat model, engineering rationale |

---

## 🔐 Key Features

- OTP-based Multi-Factor Authentication (MFA)
- Hashed credential storage — no plain-text passwords
- Rule-based fraud detection: location-aware login checks, failed-attempt monitoring, suspicious transaction alerts
- Login location comparison against stored "home" context
- Fraud-alert logging and monitoring hooks

---

## ⚔️ Threat Model (Summary)

| Threat | Mitigation |
|---|---|
| Brute force | Login attempt tracking + lockout behaviour |
| Credential theft | MFA (OTP second factor) |
| Session abuse | Controlled post-MFA session flow |
| Fraudulent geography | Location-aware login comparison |
| Suspicious transfers | Rule-based transaction checks |

---

## 💡 Key Decisions

- **SOLID principles** enforced throughout — full separation of AuthService, FraudDetectionService, TransactionService
- **Dependency injection** used for all service wiring
- **Prototype scope** explicitly documented — avoids false claims of production readiness
- Documentation shipped alongside code in repo (UML, ERD, threat model)

---

## 🔗 Related

- [[Areas/Career|Career]] — Featured on portfolio as primary .NET/security example
- [[Projects/SP-Portfolio/SP-Portfolio|SP-Portfolio]]

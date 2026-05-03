---
title: Case Study — DevQuest: Adaptive Gamification (MSc Dissertation)
tags: [project, case-study, unity, ml, dissertation, csharp]
status: ⚠️ Case study page has placeholder content — needs completing
---

# 🧠 DevQuest: Adaptive Gamification

**Type:** MSc Dissertation (Solo)  
**Institution:** Staffordshire University  
**Tech:** Unity (C#), ML-Agents (PyTorch), Python, Data Analysis  
**Live case study:** [sp-portfolio-nine.vercel.app/devquest.html](https://sp-portfolio-nine.vercel.app/devquest.html)

> ⚠️ **Action Required:** The live case study page still contains `[Placeholder]` text in the Overview and Conclusions sections. This is a recruiter-facing problem — needs to be filled in before the portfolio redesign.

---

## 🎯 What It Is

MSc Computer Science dissertation researching **adaptive difficulty scaling** using Reinforcement Learning (ML-Agents) in Unity. The hypothesis: AI-driven difficulty adjustment can significantly improve player retention and educational outcomes in serious gamification contexts.

---

## 🏗️ Architecture

| Component | Detail |
|---|---|
| **Unity Environment** | Game runtime with configurable difficulty parameters |
| **ML-Agents (PyTorch)** | Reinforcement learning agents trained to observe player performance and adjust game state |
| **Observer Pattern** | C# implementation for real-time player telemetry collection |
| **Python Pipeline** | Data analysis, training visualization, performance metrics |

---

## 🔬 Research Focus

- **Agent Training:** ML-Agents trained in dedicated Unity environments with reward signals tied to player engagement metrics
- **Adaptive System:** Runtime monitors player struggle signals and adjusts enemy spawn rates, health pools, or puzzle complexity dynamically
- **Evaluation:** Statistical comparison between adaptive difficulty group and static control group

---

## 💡 Key Decisions

- Observer pattern chosen for telemetry — decouples data collection from game logic cleanly
- PyTorch backend (via ML-Agents) over manual RL implementation — faster iteration on reward function design
- Kept scope to a single game type to produce statistically meaningful results within dissertation timeline

---

## ⚠️ Outstanding: Content to Write for Live Page

The live `devquest.html` page needs these sections filled in:

- [ ] **Overview paragraph** — explain static difficulty curve problem and why adaptive learning bridges the gap
- [ ] **Agent training detail** — neural network training environments and reward signals
- [ ] **Adaptive system detail** — how the runtime monitored player struggle and what it adjusted
- [ ] **Quantitative data** — statistical improvement in player testing groups vs control group
- [ ] **Key takeaways** — future viability of small-scale ML models for AAA accessibility/learning
- [ ] **PDF link** — add actual dissertation paper link once uploaded

---

## 🔗 Related

- [[Areas/Learning|Learning]] — ML/AI remains an active interest area
- [[Areas/Career|Career]] — Key differentiator for European engineering roles
- [[Projects/SP-Portfolio/SP-Portfolio|SP-Portfolio]]

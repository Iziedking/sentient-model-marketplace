# Sentient Model Marketplace (Simulation)  

**A sandbox marketplace to explore model monetization, credits, and simulated usage calls without real billing.**  

---

## Table of Contents

- [Overview](#overview)  
- [How It Works](#how-it-works)  
  - [1. Authentication](#1-authentication)  
  - [2. Marketplace](#2-marketplace)  
  - [3. Model Detail](#3-model-detail)  
  - [4. Profile & My Models](#4-profile--my-models)  
  - [5. Credits](#5-credits)  
- [Simulate Monetization](#simulate-monetization)  
- [Getting Started](#getting-started)  
- [Why It Matters](#why-it-matters)  
- [Future Roadmap](#future-roadmap)  
- [License & Contribution](#license--contribution)  

---

## Overview  

The **Sentient Model Marketplace** is a simulation of how AI model marketplaces might work in practice:  

- Browse models in a **marketplace UI**  
- “Buy” (unlock) models with demo credits  
- Run usage calls that **simulate cost-per-1K tokens**  
- Track ownership, usage stats, and credits without real billing  

This is a safe, educational sandbox for exploring **monetization flows** in AI ecosystems.  

---

## How It Works  

### 1. Authentication  
- Sign in with **Google** or email **magic link**  
- Demo profile is created with **$25.00 credits** for free experimentation  

### 2. Marketplace  
- Browse models with filters: **Category, Rating, Price band, Tags**  
- Sort by **Trending, Most purchased, Most used, Top rated, New**  
- Model cards show: **owner, tags, rating, price per 1K tokens, usage stats**  

### 3. Model Detail  
- Each model page allows:  
  - **Buy / Unlock** (free in this simulation)  
  - **Use** (simulates 1,000 token call)  
- Simulated usage deducts credits and logs success / errors  

### 4. Profile & My Models  
- Profile shows:  
  - Credits balance  
  - Total calls / spend  
  - Recent usage  
  - Models you own  
- **My Models** tab = view of all models you’ve unlocked  

### 5. Credits  
- Credits are **demo currency**  
- Unlocks are **free**, but usage **deducts credits**  
- If credits run out, actions are blocked with warnings  

---

## Simulate Monetization  

The **simulation sandbox** lets you test different pricing and usage scenarios:  

- Adjust **Price per 1K tokens**  
- Set **Tokens to Use** per call  
- Track remaining credits in real time  

Preview shows:  
- **Call cost**  
- **Credits after call**  
- **Revenue impact** (simulated for model owners)  

This mirrors real-world flow:  
- Every call increments model usage stats  
- User credits decrement accordingly  

---


## Getting Started  

1. Clone the repo:  
   ```bash
   git clone https://github.com/Iziedking/sentient-model-marketplace.git
   cd sentient-model-marketplace

Sign in (Google or email) and explore the simulation:

Start with $25.00 demo credits

Unlock models and run usage calls

Track spending in your profile

---

**Why It Matters**

-Safe experimentation with AI monetization flows

-Understand how credits, usage, and ownership might work in real AI marketplaces

-Build intuition around cost-per-token economics

-Provide inspiration for future AI economy infrastructure

---
**Future Roadmap**

✅ Demo marketplace & credits simulation

🔜 Upload your own models (“Builders mode”)

🔜 Advanced billing simulation (subscriptions, bundles, loyalty)

🔜 Multi-user marketplace with shared stats

🔜 API integration for external model hosting

---
**License & Contribution**
License: MIT

Contributions: PRs welcome! Feel free to open issues for bugs, feature requests, or feedback.

Acknowledgments: Inspired by the vision of open, community-aligned AI marketplaces.

_contributing to sentientAGI_

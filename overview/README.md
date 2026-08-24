# CyberWallah — Project Overview

A plain-English tour of **what CyberWallah is** and **what has been built so far**.
This is the high-level picture — for developer setup see the root
[`README.md`](../README.md), for the data-layer architecture see
[`backend/README.md`](../backend/README.md), and for the money/growth plan see
[`cyberwallah.md`](../cyberwallah.md).

---

## What it is

**CyberWallah** is a free cybersecurity-education website for India. It explains
online scams and security terms in plain English (and Hinglish), lets people test
themselves with a quiz, and gives members a free "founding member" digital ID card.

It's a single-page web app (React) with a hosted database (Supabase) behind it —
**there is no separate server to run or maintain**.

---

## Recently implemented (latest round of work)

| Area | What changed |
|---|---|
| **Homepage redesign** | Rebuilt the home page into 10 focused sections (see below) — a real content-and-conversion flow instead of just a hero + stats. |
| **Google sign-in** | Configured and tested end-to-end Google login (Google Cloud OAuth → Supabase → app). Email/password login was already in place. |
| **UI fix** | Fixed cramped icon spacing on buttons (icon + label now have proper spacing everywhere). |

---

## The feature set

### 1. Public site — works for anyone, no login needed

| Page | What it does |
|---|---|
| **Home** | Landing page. Animated intro, "how it works", popular terms, featured guide, member-ID teaser, newsletter sign-up. |
| **Dictionary** | Searchable glossary of **39 cybersecurity terms** explained simply, with India context (UPI fraud, digital arrest, Aadhaar fraud, etc.). Each term has its own detail page. |
| **Quiz** | A 10-question interactive quiz. Captures name/email/etc. and score to a Google Sheet (lead capture). |
| **Blog** | Bilingual (English + Hinglish) article system. **1 published guide** so far (“Digital Arrest”), built to scale to many. |
| **Resources** | A curated list of security tools and learning platforms. |
| **YouTube** | A video-listing page (currently **1 placeholder video** — ready for real content). |
| **Newsletter** | Email sign-up (saved via Google Apps Script). |
| **About / Contact** | Standard info pages. |
| **404 / redirects** | Friendly not-found page; old links (case-studies, security-explained, join) redirect to the right place. |

### 2. Member system — powered by Supabase (login required)

| Feature | What it does |
|---|---|
| **Sign up / Log in** | Email + password **and** "Continue with Google". Email sign-ups confirm via email. |
| **Password reset** | Full "forgot password → email link → set new password" flow. |
| **Dashboard** | A private members-only area (protected route). |
| **Digital ID card** | Each member gets a **"CW-101" style founding-member ID card** with their name, a membership number, a tier, and a QR code. |
| **Public card page** | A shareable/verifiable public link for a member card (`/id/<number>`). |

### 3. The redesigned homepage (10 sections, in order)

Hero → Trust strip → Stats bar → How it works → Learn topics →
Popular terms → Featured guide → **ID-card showcase** → Quiz CTA → Newsletter sign-up.

Every section is built from the existing design system — nothing off-brand.

---

## Content inventory (what's actually filled in today)

| Content | Count | Notes |
|---|---|---|
| Dictionary terms | **39** | Real, India-focused, the strongest content asset. |
| Blog posts | **1** | “Digital Arrest”, in English + Hinglish. |
| YouTube videos | **1** | Placeholder — replace with a real video. |
| Resources | **a few** | Structure ready for real (and affiliate) links. |

> Some homepage stat numbers are currently **illustrative/aspirational** rather than
> live counts — flagged in the roadmap for reconciliation.

---

## Look & feel

- A dark, "cyber/terminal" theme built around an **electric-green** palette.
- Smooth, tasteful animations that automatically **respect reduced-motion** settings.
- **Fully responsive** — mobile, tablet, desktop.
- Consistent building blocks (buttons, cards, badges, inputs) so everything matches.

---

## How the project is organized

```
cyberwallah.in/
├── frontend/     # the website (what users see) — React + Vite
├── backend/      # the data layer — all Supabase access in one clean place
├── supabase/     # the database schema, security rules, and triggers
├── overview/     # ← you are here (this document)
└── roadmap/      # future improvements + the Cloudflare deployment guide
```

- **Nothing to host yourself except the static site** — Supabase (a hosted service)
  is the entire backend (database, login, security).
- Data safety is enforced by database-level **Row Level Security**, not by hiding keys.

---

## Status at a glance

| Thing | Status |
|---|---|
| Public site (dictionary, quiz, blog, resources, etc.) | ✅ Live and working |
| Email + Google login, dashboard, ID cards | ✅ Working (Supabase connected) |
| Homepage redesign | ✅ Done |
| Deployed for external users on the internet | ⏳ Not yet — see [`roadmap/DEPLOY-CLOUDFLARE.md`](../roadmap/DEPLOY-CLOUDFLARE.md) |
| Login screen shows "CyberWallah" (not the Supabase URL) | ⏳ Planned — see roadmap |

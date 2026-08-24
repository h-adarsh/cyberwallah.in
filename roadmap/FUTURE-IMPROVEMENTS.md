# Future Improvements — specific & prioritized

Concrete things that can still be built, grouped by priority, with the **exact files**
each one touches. Nothing here is required for the site to work today — it already does.

Legend: 🔴 do before/at public launch · 🟡 high value soon after · 🟢 growth / nice-to-have

---

## 🔴 Priority 1 — needed for a real public launch

### 1.1 Deploy the site so external users can reach it
Right now it only runs on your machine (`localhost:5173`). Follow
[DEPLOY-CLOUDFLARE.md](./DEPLOY-CLOUDFLARE.md) to publish it on Cloudflare Pages.

### 1.2 Let *any* external user sign in with Google (not just test users)
The Google OAuth app is in **Testing** mode, so **only email addresses you add as test
users can use "Continue with Google."** External visitors will be blocked until you
**publish** the OAuth app.
- Where: Google Cloud Console → **Google Auth Platform → Audience → Publish app**.
- For the basic scopes used here (email, profile, openid) **no Google verification review
  is required**, though an "unverified app" notice may appear until verified.
- Email/password sign-up already works for everyone — this only affects Google login.
- Full context in [DEPLOY-CLOUDFLARE.md → step 9](./DEPLOY-CLOUDFLARE.md).

### 1.3 Add the legal pages
Needed for India's **DPDP Act**, for Google OAuth (a Privacy Policy URL is expected once
published), and for any affiliate income later.
- **Privacy Policy**, **Terms of Service**, **Affiliate Disclosure**.
- How: add pages under `frontend/src/pages/` (e.g. `Privacy.tsx`, `Terms.tsx`), register
  routes in `frontend/src/App.tsx`, and link them from `frontend/src/components/layout/Footer.tsx`.

### 1.4 Rotate the Google OAuth client secret
The client secret was shown on screen during setup, so treat it as exposed and replace it.
- Google Cloud Console → **Credentials** → your OAuth client → **Client secrets → Add secret**
  → paste the new secret into **Supabase → Authentication → Providers → Google** → then
  **delete the old secret**. (The secret lives only in the Supabase dashboard, never in the app.)

---

## 🟡 Priority 2 — the site is content-thin; fill it in

### 2.1 Publish more blog guides
Only **one** post exists (`digital-arrest`, EN + Hinglish).
- Add MDX files under `frontend/src/content/blog/en/` and `frontend/src/content/blog/hi/`,
  then register them in `frontend/src/data/blog-meta.ts`.
- Good next topics (you already explain them in the dictionary): UPI fraud, OTP fraud,
  phishing, SIM-swap, QR-code scams, deepfakes.

### 2.2 Replace the placeholder YouTube video
`frontend/src/data/videos.ts` currently holds a **placeholder video ID**. Swap in your real
video IDs (and the channel URL) so the YouTube page and homepage "Featured" CTA point to real content.

### 2.3 Turn resources into real (and monetizable) links
`frontend/src/data/resources.ts` has only a few entries. Expand it, and where appropriate
use **affiliate links** (VPNs, password managers, courses) — this is the first revenue lever
in [`../cyberwallah.md`](../cyberwallah.md). Pair each affiliate link with the disclosure page (1.3).

### 2.4 Grow the dictionary past 39 terms
`frontend/src/data/dictionary.json` is your strongest SEO asset. Every new term is a new page
that can rank. Keep the same India-context, plain-English style.

### 2.5 Make the homepage stats honest
`frontend/src/components/sections/StatsBar.tsx` shows some **aspirational** numbers (e.g.
"50+ Free Resources" while only a few are listed). Either wire these to real counts or
relabel them clearly as goals so the site stays trustworthy.

---

## 🟡 Priority 3 — auth polish & member experience

### 3.1 Show "CyberWallah" on the Google sign-in screen (not the Supabase URL)
The consent screen currently reads *"Sign in to …supabase.co"* because Google shows the
**redirect domain**. Two fixes:
- **Option A (paid, zero code):** add a **Supabase Custom Domain** (e.g. `auth.cyberwallah.in`).
- **Option B (free, code):** switch to Google's in-page sign-in with
  `supabase.auth.signInWithIdToken(...)`. Touches
  `frontend/src/components/auth/GoogleButton.tsx` and `backend/services/auth.service.ts`,
  and adds a `VITE_GOOGLE_CLIENT_ID` env var. (You deferred this — steps were already outlined.)

### 3.2 Build out the member dashboard
`frontend/src/pages/Dashboard.tsx` is a members-only shell. Add real value:
- Show **quiz history / best score** (data via `backend/services/quiz.service.ts`,
  `frontend/src/hooks/useQuiz.ts`).
- Add streaks / badges / progress (TryHackMe-style gamification).

### 3.3 Finish the digital ID card loop
- Confirm the public verify page `frontend/src/pages/IdCardPublic.tsx` (`/id/:cardNumber`)
  works for real members, and that the QR code on the card points to that live URL.
- Polish the PNG "download card" export (uses `html-to-image` via `frontend/src/lib/idcard.ts`).

---

## 🟢 Priority 4 — growth & technical hardening

### 4.1 SEO
- Generate a **`sitemap.xml`** (list every dictionary term, blog post, and static page).
- Add **structured data (JSON-LD)**: `DefinedTerm` for dictionary entries, `Article` for blog
  posts, `FAQPage` where relevant. The building blocks are in `frontend/src/components/seo/`
  and `react-helmet-async` is already installed.
- Add **`hreflang`** tags linking each English post to its Hinglish version.
- Add **Open Graph / Twitter preview images** so shared links look good.

### 4.2 Analytics
Add **Cloudflare Web Analytics** (free, privacy-friendly, no cookie banner needed) or Plausible,
so you can see traffic once deployed.

### 4.3 A real newsletter/lead backend
Sign-ups currently POST to a **Google Apps Script → Google Sheet** (`VITE_GOOGLE_SCRIPT_URL`).
For scale, move to a Supabase `subscribers` table and/or a proper email service — optionally
front it with a small **Cloudflare Pages Function** so the endpoint URL isn't exposed in the
client bundle (see [DEPLOY-CLOUDFLARE.md → "Do you need a Worker?"](./DEPLOY-CLOUDFLARE.md)).

### 4.4 Performance & accessibility
- Run Lighthouse; aim for green.
- Address the Vite **chunk-size warning** with route-based code-splitting (lazy-load heavy
  pages like the dashboard/blog).
- Optimize/compress images.

### 4.5 Tests & CI
- Add a few unit tests (quiz scoring, ID-card number formatting, utils).
- Add a **GitHub Actions** workflow to run `npm run build` + `npm run lint` on every PR.
  (Cloudflare Pages already gives you a preview URL per PR automatically.)

---

## Monetization
The full revenue plan (affiliate, newsletter sponsorships, digital products, memberships,
B2B training, 90-day plan, projections) already lives in **[`../cyberwallah.md`](../cyberwallah.md)**.
Items 1.3, 2.3, and 4.3 above are the technical prerequisites for it.

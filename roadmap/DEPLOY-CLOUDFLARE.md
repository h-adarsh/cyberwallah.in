# Deploy CyberWallah to Cloudflare (Pages) — step by step

Goal: put the site on the public internet at a real URL (and then `cyberwallah.in`) so
**anyone** can use it — the dictionary, quiz, blog, login, and member ID cards.

**Time:** ~30–45 min the first time. **Cost:** ₹0 (Cloudflare Pages free tier + your existing
free Supabase project).

---

## TL;DR — do you need Cloudflare *Workers*?

**No.** This is a **static single-page app** (React compiled to plain HTML/CSS/JS) whose entire
backend is **Supabase** (a hosted service). So you only need **Cloudflare Pages**.

A Cloudflare **Worker** (or "Pages Function") is server-side code. You don't have any today and
don't need one to launch. You'd add one *later* only for things like hiding the newsletter
endpoint or building a custom API — see [the last section](#do-you-need-a-worker-later).

```
Visitor ──> Cloudflare Pages (your static site) ──> Supabase (database + login)
                    ▲
             cyberwallah.in
```

---

## What gets built

Cloudflare will run your build and publish the result:

| Thing | Value (verified in this repo) |
|---|---|
| Build command | `npm run build`  → runs `tsc -b && vite build` |
| Output folder | `frontend/dist` |
| Node version | `22.12.0` (pinned in `.node-version` at the repo root) |
| SPA routing file | `frontend/public/_redirects` → `/*  /index.html  200` (already present) |

---

## Step 0 — Prerequisites

- A **GitHub account** (Cloudflare Pages deploys from a Git repo — this is the easiest path).
- A **Cloudflare account** (free) — https://dash.cloudflare.com/sign-up.
- Your **domain** `cyberwallah.in` (optional for first deploy; you can launch on the free
  `*.pages.dev` URL and add the domain after).

---

## Step 1 — Push the code to GitHub  ⚠️ biggest blocker

Cloudflare builds from Git, so **all the code must be committed and pushed.** A lot of files
are currently untracked (the whole `backend/` folder, new homepage sections, `overview/`,
`roadmap/`, the root lockfile, etc.). Until they're pushed, Cloudflare can't build them.

Your secrets are safe: `frontend/.env` is git-ignored, so keys will **not** be pushed.
The old `vercel.json` and the stale `frontend/package-lock.json` were already removed.

From the repo root:

```bash
git status
```

Review the list, then stage and commit everything:

```bash
git add -A
```

```bash
git commit -m "Add backend, homepage redesign, docs; prep for Cloudflare deploy"
```

> `.DS_Store` is already ignored. `.claude/` (editor/tooling config) will be included by
> `git add -A`; that's harmless — but if you'd rather not track it, add `.claude/` to
> `.gitignore` before committing.

If this repo isn't connected to GitHub yet, create an **empty** repo on GitHub (no README),
then point this repo at it (replace the URL with yours):

```bash
git remote add origin https://github.com/<your-username>/cyberwallah.in.git
```

Push:

```bash
git push -u origin main
```

If a remote already exists, just `git push` is enough.

---

## Step 2 — Create the Cloudflare Pages project

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** tab →
   **Connect to Git**.
2. Authorize GitHub and pick the **`cyberwallah.in`** repository.
3. Production branch: **`main`**.

---

## Step 3 — Build settings

On the "Set up builds and deployments" screen, enter exactly:

| Field | Value |
|---|---|
| **Framework preset** | `None`  (or `Vite` if offered — either works) |
| **Root directory** | *(leave blank — it's the repo root; this is a monorepo)* |
| **Build command** | `npm run build` |
| **Build output directory** | `frontend/dist` |

Cloudflare auto-detects Node **22.12.0** from the committed `.node-version` file. (If a build
ever complains about the Node version, add an env var `NODE_VERSION` = `22.12.0` in Step 4.)

> Why root, not `frontend/`? This repo uses npm **workspaces**. Installing from the root lets
> npm wire up the workspace correctly, and the root `npm run build` script forwards to the
> frontend app.

---

## Step 4 — Environment variables (important!)

Vite **bakes these into the build**, so they must exist in Cloudflare *before* the build runs.
Add each one under **Settings → Environment variables**, and add them to **both**
**Production** *and* **Preview** environments.

| Variable | Where to get the value |
|---|---|
| `VITE_SUPABASE_URL` | copy from your local `frontend/.env` |
| `VITE_SUPABASE_ANON_KEY` | copy from your local `frontend/.env` (this key is public by design — safe) |
| `VITE_GOOGLE_SCRIPT_URL` | copy from your local `frontend/.env` (newsletter/quiz capture) |

> Later, if you implement the in-page Google sign-in ("Option B"), also add
> `VITE_GOOGLE_CLIENT_ID`.

> These are build-time values — if you change one, you must **re-deploy** for it to take effect.
> Never put the Supabase `service_role`/secret key or the Google **client secret** here; they
> don't belong in the browser bundle.

---

## Step 5 — Deploy

Click **Save and Deploy**. Cloudflare will `npm install`, run the build, and publish. When it
finishes you'll get a live URL like:

```
https://cyberwallah-in.pages.dev
```

Open it — the site should load. 🎉 (Login won't fully work until Step 8/9.)

---

## Step 6 — Confirm SPA routing works

Visit a deep link directly, e.g. `https://<your-site>.pages.dev/dictionary`, and **refresh**.
It should load the page, not a 404. This works because `frontend/public/_redirects` sends all
paths to `index.html` so React Router can take over. (Already in the repo — nothing to do,
just verify.)

---

## Step 7 — Add your custom domain `cyberwallah.in`

1. In your Pages project → **Custom domains** → **Set up a custom domain** → enter
   `cyberwallah.in` (and repeat for `www.cyberwallah.in` if you want it).
2. If the domain's DNS is **already on Cloudflare**, the record is added automatically.
   If it's registered elsewhere, Cloudflare shows you the DNS record (or nameservers) to add
   at your registrar.
3. Wait for the SSL certificate to go "Active" (usually minutes).

---

## Step 8 — Point Supabase at the live site

Login/signup redirects must know your real domain, or auth links will bounce to `localhost`.

In the **Supabase dashboard → Authentication → URL Configuration**:

- **Site URL:** `https://cyberwallah.in`
- **Redirect URLs** — add all of these:
  - `https://cyberwallah.in/**`
  - `https://www.cyberwallah.in/**` (if you use www)
  - `https://*.pages.dev/**` (so preview deploys and the `.pages.dev` URL work too)

Keep `http://localhost:5173/**` in the list so local development still works.

---

## Step 9 — Google sign-in for the live site + let external users in

Two parts:

**(a) Allow the production domain.**
Google Cloud Console → **APIs & Services → Credentials** → your OAuth client → under
**Authorized JavaScript origins** add:
- `https://cyberwallah.in`
- `https://www.cyberwallah.in` (if used)

*(The redirect URI stays the Supabase callback URL — it doesn't change with your domain.)*

**(b) Publish the OAuth app so ANY user can sign in — not just you.**
This is the step that actually lets **external users** use "Continue with Google":
- Google Cloud Console → **Google Auth Platform → Audience** → **Publish app**.
- The scopes used here (email, profile, openid) are non-sensitive, so **no verification review
  is required**. Users may briefly see an "unverified app" screen until you (optionally) verify.
- While the app stays in **Testing**, only email addresses added as *test users* can log in
  with Google. Email/password signup works for everyone regardless.

---

## Step 10 — Verify the live site (do this after Steps 8–9)

Open `https://cyberwallah.in` and check:

- [ ] Home page loads with all sections and images.
- [ ] Deep links refresh without 404 (e.g. `/dictionary`, `/quiz`, a blog post).
- [ ] Dictionary search works; a term detail page opens.
- [ ] Quiz runs and submits (check your Google Sheet receives the row).
- [ ] Newsletter form submits without error.
- [ ] **Sign up with email** → confirmation email arrives → can log in.
- [ ] **Continue with Google** works from the live domain (after publishing, Step 9b).
- [ ] Dashboard loads after login; the member **ID card** renders.

If something fails, see Troubleshooting below.

---

## Redeploys & preview URLs (automatic from here on)

- **Every push to `main`** → Cloudflare rebuilds and updates production automatically.
- **Every pull request / other branch** → Cloudflare publishes a **preview URL** you can test
  before merging (this is why we added `*.pages.dev` to Supabase in Step 8).

No manual steps after the first setup — just `git push`.

---

## Troubleshooting

| Symptom | Likely cause & fix |
|---|---|
| Build fails on Node version | Add env var `NODE_VERSION` = `22.12.0` (Step 4), re-deploy. |
| Build fails installing deps | Make sure the **root** `package-lock.json` was committed (Step 1); root directory is blank/repo-root (Step 3). |
| Site loads but blank / console errors about Supabase | The `VITE_` env vars are missing or misspelled in Cloudflare. They must be set **before** the build. Fix and **re-deploy**. |
| Refreshing a deep link 404s | `_redirects` didn't ship — confirm it's at `frontend/public/_redirects` and committed. |
| Google login redirects to localhost or errors | Redirect URLs / Site URL not set in Supabase (Step 8), or origin not added in Google (Step 9a). |
| Only you can Google-login, others can't | OAuth app still in **Testing** — publish it (Step 9b). |
| A build warning about large chunks | Non-fatal (the build still succeeds). Optional to fix later via code-splitting. |

---

## Do you need a Worker later?

Not for launch. Consider adding a **Cloudflare Pages Function** (the Pages-integrated form of a
Worker) only when you want **server-side** logic, for example:

- **Hide the newsletter/quiz endpoint** — right now `VITE_GOOGLE_SCRIPT_URL` is visible in the
  browser bundle. A Function could receive the form and forward it server-side, keeping the URL
  private and letting you add spam protection / rate limiting.
- **A custom API** — anything needing a secret key that must never reach the browser
  (e.g. calling a paid email service, payments, server-side data processing).
- **Server-side auth niceties** — advanced flows beyond what Supabase's client library covers.

How you'd add one (for later reference): create a `functions/` directory at the project root
(e.g. `functions/api/subscribe.ts`). Cloudflare Pages automatically deploys files in
`functions/` as serverless endpoints alongside your static site — **no separate project, no
config change** to what you set up above. Until you need that, Pages alone is the right,
simplest choice.

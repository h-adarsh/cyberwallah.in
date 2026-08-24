# CyberWallah

Free cybersecurity-education platform for India — a React + Vite single-page app
backed by **Supabase** (auth, member profiles, digital ID cards, quiz history).

---

## Repo layout

```
cyberwallah.in/
├── package.json     # npm-workspace root — install & run from HERE
├── frontend/        # the Vite + React app (UI)
├── backend/         # browser-side data layer (Supabase client, models, services)
└── supabase/        # database schema, RLS policies, triggers (the real server side)
```

> **There is no separate backend server to run.** Supabase (a hosted service) *is*
> the backend. The `backend/` folder is TypeScript that Vite bundles **into** the
> frontend — it just keeps all Supabase access in one clearly-separated layer.
> So "running the project" means starting **one** dev server (the frontend).

---

## Prerequisites

- **Node.js** 20.19+ or 22.12+ (required by Vite 8)
- **npm** 10+ (this repo uses npm workspaces)
- A free **Supabase** project — only needed for login / dashboard / ID-card features

---

## Quick start

Run everything **from the repo root** (`cyberwallah.in/`) — npm workspaces hoist
dependencies so the root-level `backend/` can resolve them.

```bash
# 1. Install all dependencies (once)
npm install

# 2. Start the dev server
npm run dev
```

Open **http://localhost:5173**.

The public site (Home, Blog, Dictionary, Quiz, Resources, About, Contact) works
immediately. **Auth, the dashboard, and ID cards stay disabled** until you connect
Supabase (next section) — you'll see a one-line `[supabase] Missing …` notice in
the browser console, which is expected.

---

## Enabling auth & data (Supabase setup)

These steps happen in the Supabase & Google dashboards — do them once.

1. **Create a Supabase project** (free tier). From **Project Settings → API**, copy
   the **Project URL** and the **anon public key**.
2. **SQL Editor** → paste and run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   This creates the `profiles` + `quiz_results` tables, the `CW-101` membership-number
   sequence, the new-user trigger, Row Level Security policies, and the public-card
   lookup function.
3. **Authentication → Providers**
   - **Email**: enabled, with **"Confirm email" ON**.
   - **Google**: enabled — paste your Google OAuth **Client ID + Secret**.
4. **Google Cloud Console** → create an **OAuth 2.0 Web** client. Authorized redirect URI:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
5. **Authentication → URL Configuration**
   - Site URL: `https://cyberwallah.in`
   - Additional Redirect URLs: `http://localhost:5173/auth/callback` and
     `https://cyberwallah.in/auth/callback`
6. **Fill `frontend/.env`** (see [`frontend/.env.example`](frontend/.env.example)):
   ```
   VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
   VITE_GOOGLE_SCRIPT_URL=<existing Apps Script URL for the quiz/newsletter forms>
   ```
7. **Restart the dev server** (`Ctrl+C`, then `npm run dev`) so Vite picks up the env.

> The anon key is **public by design** — it ships in the browser bundle. Data safety
> is enforced by **Row Level Security** in the database, not by hiding the key.

---

## Scripts (run from the repo root)

| Command | What it does |
|---|---|
| `npm install` | Install all workspace dependencies |
| `npm run dev` | Start the Vite dev server (http://localhost:5173) |
| `npm run build` | Type-check (`tsc -b`) and build for production → `frontend/dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the frontend |

Each delegates to the `frontend` workspace, so you never need to `cd frontend`.

---

## Environment variables (`frontend/.env`)

| Variable | Required for | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | Auth / dashboard / ID card | From Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Auth / dashboard / ID card | Public anon key (safe to ship) |
| `VITE_GOOGLE_SCRIPT_URL` | Quiz / newsletter form submission | Existing Google Apps Script endpoint |

Without the two Supabase vars the app still runs — auth just fails gracefully.

---

## Troubleshooting

- **Blank page + `supabaseUrl is required` in the console** — you're on an old build;
  the client now falls back to a placeholder so the site renders. Pull latest and
  hard-reload.
- **`Failed to resolve import "react" from "…/qrcode.react/…"` during build** —
  an npm-workspace hoisting split (React in `frontend/node_modules`, other deps at
  the root). It's handled by `resolve.dedupe: ['react','react-dom']` in
  [`frontend/vite.config.ts`](frontend/vite.config.ts). If it resurfaces after a
  messy install, do a clean reinstall:
  ```bash
  rm -rf node_modules frontend/node_modules frontend/package-lock.json && npm install
  ```
- **Port 5173 in use** — Vite auto-picks the next free port; check the terminal for
  the actual URL.
- **Login/signup does nothing** — Supabase isn't configured yet (see setup above).

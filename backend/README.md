# `backend/` — data & backend logic (MVC-style layering)

Everything that talks to the backend (Supabase) lives here, in one place, split
into clear layers so there's no guesswork about where a query belongs.

CyberWallah has **no server of its own** — Supabase _is_ the backend (Postgres +
Auth + auto-generated REST/RPC). So this folder is browser code that talks to
that backend, organised the MVC way:

```
backend/
├── client.ts            # the single Supabase connection (the "DB handle")
├── models/              # M — the data shapes (TypeScript types)
│   ├── profile.model.ts #     Profile, Tier, ProfilePatch
│   ├── quiz.model.ts    #     QuizResult, QuizResultInput
│   ├── card.model.ts    #     PublicCard (public verify page)
│   └── index.ts         #     barrel → import from "@backend/models"
├── services/            # C — all data operations, grouped by domain
│   ├── auth.service.ts  #     sign up / in / out, OAuth, password reset
│   ├── profile.service.ts #   read/update profile, public-card lookup
│   ├── quiz.service.ts  #     save + list quiz results
│   └── index.ts         #     barrel → import from "@backend/services"
└── index.ts             # convenience barrel
```

## How the layers map to MVC

| Layer | Where | Responsibility |
|------|-------|----------------|
| **Model** | `backend/models/*` + the SQL in `supabase/migrations/` | The shape of the data and the tables/RLS that store it. |
| **Controller / Service** | `backend/services/*` | The only code allowed to call `supabase.*`. Each method is one intent (e.g. `quizService.saveResult`). Returns plain data or `{ error }`. |
| **View** | `src/pages/*`, `src/components/*` | React UI. Calls services (often via `useAuth`), renders the result. Never imports the client. |

`src/context/AuthProvider.tsx` sits between View and Service — it holds session
state and delegates every actual call to `authService` / `profileService`.

## The one rule

**UI never imports `backend/client`.** If a component needs data, it calls a
service. If a needed operation doesn't exist yet, add a method to the relevant
service rather than reaching for `supabase` inline. That's what keeps queries
discoverable and the client swappable.

## Where things are NOT

- **Display helpers** (formatting `CW-101`, PNG export, share links) are view
  concerns and live in `src/lib/idcard.ts`, not here.
- **The actual schema, RLS policies and triggers** live in
  `supabase/migrations/0001_init.sql` at the repo root — that's the real
  server-side layer, run inside Postgres.

## How it's wired (repo layout)

This folder sits at the **repo root**, a sibling of `frontend/`:

```
cyberwallah.in/
├── package.json        # npm-workspace root (workspaces: ["frontend"])
├── frontend/           # the Vite app
└── backend/            # ← you are here
```

It is still **browser code** that Vite bundles into the frontend — it is not a
standalone server. Two pieces of config make importing across the folder
boundary work:

- **npm workspaces** (root `package.json`) hoist the frontend's dependencies —
  including `@supabase/supabase-js` — into a single `node_modules` at the repo
  root, so bare imports here resolve. Install with `npm install` **from the repo
  root** (not `npm --prefix frontend install`).
- **Path alias `@backend`** → `../backend`, declared in both
  `frontend/vite.config.ts` (bundler) and `frontend/tsconfig.app.json`
  (types + `include`). The frontend imports from `@backend/services` /
  `@backend/models`; `frontend/vite.config.ts` also sets `server.fs.allow` so the
  dev server may read this folder.


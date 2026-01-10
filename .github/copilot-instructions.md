<!--
Guidance for AI coding agents working on this repository.
Keep this file concise and focused on discoverable, actionable patterns.
-->

# Copilot instructions — apple-music-hi-res-albums-database

Purpose: help an AI agent get productive quickly by describing architecture, key flows, conventions, and exact examples found in the codebase.

- **Big picture**

  - This is a Next.js application (Next 15) that uses the App Router for UI (`src/app`) and keeps several legacy/pages-router API endpoints in `src/pages/api` (Auth0 and database handlers). Serverless app-router API routes live under `src/app/api`.
  - Core features: fetch album metadata from Apple Music, persist album records to a Postgres DB (Neon), and provide a searchable datatable UI.

- **Major components / boundaries**

  - UI: `src/app` (app router). The datatable and register modal are under `src/app/datatable`.
  - App-router API: `src/app/api/apple-music/*` proxies Apple Music API calls and `src/app/api/likes/*` handles like counts/state. Example: `/api/apple-music/get-storefronts` and `/api/apple-music/us/{albumId}`.
  - Pages-router API: `src/pages/api/database/*` contains DB operations (`add-album`, `get-albums`, `delete-album`, `search-elements`). Auth endpoints use `src/pages/api/auth/[auth0].js`.
  - DB layer: all DB access uses `@neondatabase/serverless` (Neon). Environment variable: `DATABASE_URL`.

- **Data flow (common patterns)**

  - Album registration: UI -> `src/app/api/apple-music/...` (fetch Apple Music) -> client extracts album info (`src/app/datatable/extract-album-info.ts`) -> POST to `POST /api/database/add-album` (pages API) -> Neon inserts into `albums` table.
  - Likes: client calls `/api/likes` (app-router endpoint) and `/api/likes/state` to toggle/query like state; these handlers call Neon directly.

- **Important environment variables** (check hosting/secret store)

  - `DATABASE_URL` — Neon/Postgres connection string (required).
  - `APPLE_MUSIC_API_KEY` — used by `src/app/api/apple-music/*` to call Apple Music API.
  - `NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID` — developer user id for local dev bypass in register UI.
  - Auth0 config (typical): set Auth0-related env vars for `@auth0/nextjs-auth0` (client id/secret, base URL, secret). See `src/pages/api/auth/[auth0].js`.

- **Developer workflows / commands**

  - Install: `npm install`
  - Dev server: `npm run dev` (runs `next dev`).
  - Build: `npm run build`, Serve: `npm run start`.
  - Lint: `npm run lint`.

- **Project-specific conventions & gotchas**

  - Mixed routers: both App Router (`src/app`) and Pages Router (`src/pages/api`) are present. Use the appropriate pattern when adding endpoints (App Router when you need server components or streaming; Pages Router kept for Auth0 and DB handlers).
  - DB result shapes: Neon calls sometimes return an array or an object with `rows`. Many handlers defensively accept both forms — follow that pattern when adding new queries (see `src/pages/api/database/get-albums.ts`).
  - Postgres array literals: UI code writes arrays as Postgres array string literals (e.g. `{"a","b"}`) via `convertArrayToDatabaseColumnString` in `src/app/datatable/register.tsx` — keep that encoding when inserting genres/composers.
  - Product ID validation: `productId` is numeric-only (validated in `src/pages/api/database/add-album.ts`). Allowed `sampleRate` values are explicitly checked: `"88.2","96","176.4","192"`.
  - Retry logic: Apple Music proxy calls are wrapped with retry logic (`makeApiRequestWithRetry` in `src/app/datatable/api-request.ts`) that retries on 429.
  - Developer fallback: when no authenticated user, the UI may use `NEXT_PUBLIC_AUTH0_DEVELOPER_USER_ID` to emulate a registrant ID for dev flows.

- **Integration points / external deps**

  - Apple Music REST API via `APPLE_MUSIC_API_KEY` — proxied in `src/app/api/apple-music`.
  - Auth0 via `@auth0/nextjs-auth0` — see `src/pages/api/auth/[auth0].js` and client usage via `useUser()` in UI components.
  - Neon (`@neondatabase/serverless`) for Postgres access.
  - Optional X/Twitter posting via `src/pages/api/twitter/tweet.ts` (used when enabled in dev only).

- **Concrete examples**

  - Fetch storefronts (server-route): `GET /api/apple-music/get-storefronts` implemented at `src/app/api/apple-music/get-storefronts/route.ts`.
  - Fetch album metadata (server-route): `GET /api/apple-music/us/{albumId}?extend=audioVariants` implemented at `src/app/api/apple-music/[...storefrontAndAlbum]/route.ts`.
  - Add album (pages API): `POST /api/database/add-album` implemented at `src/pages/api/database/add-album.ts` — JSON body must include `artist,title,genre,composer,productId,sampleRate,registrantId,storefront`.

- **Where to look for more context**
  - UI and registration flow: `src/app/datatable/*` (register.tsx, api-request.ts, extract-album-info.ts)
  - DB handlers: `src/pages/api/database/*.ts`
  - Apple Music proxy + likes: `src/app/api/apple-music/*`, `src/app/api/likes/*`
  - Auth: `src/pages/api/auth/[auth0].js`

If anything above is unclear or you want this tailored (language, more examples, additional file links), tell me which sections to expand and I will iterate.

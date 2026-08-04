# Málaga AI — Web

Vite + React + TypeScript site for Málaga AI.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `EVENTBRITE_PRIVATE_TOKEN` in `.env` to pull live events from Eventbrite. Without it, the app falls back to static mock event data (`src/features/events/fallbackEvents.ts`), so this step is optional for most frontend work.

## Development

```bash
npm run dev
```

Starts the Vite dev server on `0.0.0.0` (reachable from other devices on your network). A dev-only middleware serves `/api/eventbrite/events`, mirroring the production API route in `api/eventbrite/events.ts`.

## Scripts

| Command           | Description                                    |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the dev server                            |
| `npm run build`    | Typecheck (`tsc -b`) and build for production    |
| `npm run preview`  | Serve the production build locally               |
| `npm run test`     | Run the Vitest test suite                        |
| `npm run lint`     | Run ESLint                                       |

## Project structure

```
api/                Serverless API routes (Eventbrite proxy)
src/
  components/        Shared UI components
  features/          Feature modules (e.g. events)
  data/              Static content/data
  lib/               Utilities
  test/              Test setup
public/              Static assets served as-is
```

## Environment variables

| Variable                    | Description                          |
| ---------------------------- | ------------------------------------- |
| `EVENTBRITE_PRIVATE_TOKEN`   | Eventbrite API token                  |
| `EVENTBRITE_ORGANIZATION_ID` | Eventbrite organization ID            |
| `EVENTBRITE_ORGANIZER_ID`    | Eventbrite organizer ID               |
| `EVENTBRITE_CACHE_SECONDS`   | How long to cache Eventbrite responses |

import path from 'node:path'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import { fetchEventbriteEvents, jsonResponse } from './api/eventbrite/events'
import { sortEventsForDisplay } from './src/features/events/eventHelpers'
import { fallbackEvents } from './src/features/events/fallbackEvents'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env.EVENTBRITE_PRIVATE_TOKEN ??= env.EVENTBRITE_PRIVATE_TOKEN
  process.env.EVENTBRITE_ORGANIZATION_ID ??= env.EVENTBRITE_ORGANIZATION_ID
  process.env.EVENTBRITE_ORGANIZER_ID ??= env.EVENTBRITE_ORGANIZER_ID
  process.env.EVENTBRITE_CACHE_SECONDS ??= env.EVENTBRITE_CACHE_SECONDS

  return {
    plugins: [
      react(),
      {
        name: 'malaga-ai-eventbrite-api',
        configureServer(server) {
          server.middlewares.use('/api/eventbrite/events', async (request, response) => {
            if (request.method !== 'GET') {
              response.statusCode = 405
              response.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            response.setHeader('Content-Type', 'application/json')
            response.setHeader('Cache-Control', 'no-store')

            try {
              const events = await fetchEventbriteEvents()
              response.end(JSON.stringify(jsonResponse(events, 'eventbrite')))
            } catch {
              response.end(JSON.stringify(jsonResponse(sortEventsForDisplay(fallbackEvents), 'fallback')))
            }
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      // `.ola/worktrees/` holds checkouts of this same repo, so the default
      // glob picks up a second copy of every test file and runs it against a
      // half-finished tree.
      exclude: ['**/node_modules/**', '**/dist/**', '**/.ola/**'],
    },
  }
})

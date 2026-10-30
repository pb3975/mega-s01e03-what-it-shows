# Local rendering

The export already uses Svelte 5 runes, mdsvex pages, and Vite globs. The minimal added build uses SvelteKit 2 with its static adapter so those original components execute, rather than approximating them in a Markdown renderer. Original pages, data, and the accepted decision record are unchanged. No PRD was supplied; README conventions and the accepted record are the source requirements.

Use Node 24 or newer and npm. Exact dependency versions are recorded in package-lock.json. TypeScript stays on major 6 because svelte-check requires an explicit experimental mode for major 7.

```sh
cd support-kb
npm ci
npx playwright install chromium
npm test
npm run preview -- --port 4173
```

Open http://127.0.0.1:4173/kb/. For authoring, use `npm run dev`. No cloud credentials, paid services, or deployment are involved.

`npm test` checks Svelte/TypeScript, builds actual static HTML, validates duplicate-ID and tenant-aware classification against the supplied exports, and loads the generated site in Chromium. It checks the table, timeline, one-day-move footnote, signed investigation, and the interactive dedupe explorer. It writes desktop screenshots for every page and a mobile investigation screenshot to `verification/`. If a system Chromium is preferred, set `CHROMIUM_PATH=/usr/bin/chromium npm test`.

Generated HTML is in `build/kb/`, including `build/kb/incidents/4471-review/index.html`. Serve the complete build directory because HTML refers to CSS and JavaScript assets there. The generated screenshots are evidence, not replacements for the original components.

Review ages are intentionally calculated from the actual build date by the supplied layout. The five `oneDayMove` IDs remain in the parser group according to the supplied tenant classifier; their wording is a caveat, not proof of a third diagnosed cause. The exports are a snapshot, not live ticket or production telemetry.

Sources: [SvelteKit static adapter](https://svelte.dev/docs/kit/adapter-static), [mdsvex](https://mdsvex.com/docs).

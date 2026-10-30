# MEGA.dev S01E03: what it shows

Investigation of synthetic support ticket #4471 from the course's 4 October 2026 knowledge-base export.

The new [signed investigation](support-kb/src/routes/kb/incidents/4471-review/+page.svx) executes the supplied components. Its [rendered HTML](support-kb/build/kb/incidents/4471-review/index.html), [desktop screenshot](support-kb/verification/investigation.png), and [mobile screenshot](support-kb/verification/investigation-mobile.png) are checked in. Original pages, data, and accepted decision 0001 are preserved.

[Report-ID evidence](support-kb/verification/evidence.json) records the two tenant-aware cause groups. [Issue drafts](review/) describe the failures, counts, and proposed acceptance checks. This investigation does not implement product fixes or change the support desk's policy.

## Run locally

See [development instructions](support-kb/DEVELOPMENT.md). From this repository:

```sh
cd support-kb
npm ci
npx playwright install chromium
npm test
npm run preview -- --port 4173
```

Open http://127.0.0.1:4173/kb/incidents/4471-review/. Serve the complete `support-kb/build` directory as the site root; its HTML uses the generated assets. GitHub's file viewer shows source rather than running the site. No production access or credentials are needed.

CI repeats type checking, static rendering, report-count verification, and Chromium interaction checks. Generated evidence and screenshots are also available as CI artifacts.

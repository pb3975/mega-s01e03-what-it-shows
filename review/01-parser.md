# Shared parser interprets day-first tenant dates as month-first (379 reports)

**Reports covered: 379 unique reports** from ticket #4471, across 11 tenants, received 2026-04-01 through 2026-10-04 in the synthetic MEGA.dev export.

The shared parser reads every date month first. The affected tenants write day first. An ambiguous input such as 07/04/2026 intended as 7 April can become 4 July. R-41200 (harbour.dental, app, en-GB tenant, booking-v2) describes that exact month/day reversal.

## Evidence and counting

Use src/lib/kb/causes.ts and src/lib/kb/locales.ts against src/lib/data/reports-4471.json and the tenant directory. Deduplicate by report ID before filtering mergedInto === 4471: 427 raw rows represent 412 reports; 15 rows repeat IDs. For day-first tenants, app/email reports and forms other than booking-v3 belong to the parser group. The separate booking-v3 form group contains the remaining 33 reports.

Intake is unreliable: this group has 356 parser tags and 23 hint tags. Browser locale is not the tenant's date contract. No reports have missing tenants in this export.

Five reports in desk-notes.json are included in the 379 and need follow-up: R-41202, R-41209, R-41236, R-41344, R-41620. Their one-day/chronology descriptions do not independently confirm a month/day reversal. Preserve them; collect timestamps, input/expected/actual dates, and timezone before asserting another root cause or reclassifying them. This count follows the supplied classifier, not a claim that every report has been reproduced.

## Expected behavior and proposed acceptance

Respect the explicit date input contract for the tenant on all shared-parser paths. Reproduce ambiguous day/month inputs through app, email, and booking-v2 forms; include dates whose day exceeds 12, invalid dates, and month-first locales. Fixing the booking-v3 hint alone must not close this issue. Product fixes are proposed, not implemented by this investigation.

## Desk follow-through

Reports arrived April through October; 184 were merged on 2 July. Merge time is not incident onset. Keep this ticket separate from the booking-v3 hint problem. The original kb prose saying one issue contradicts its computed CauseTable. See the signed investigation page at src/routes/kb/incidents/4471-review/+page.svx and its rendered HTML in this repo.

## Review artifacts

- [Signed source](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/src/routes/kb/incidents/4471-review/+page.svx)
- [Actual rendered HTML](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/build/kb/incidents/4471-review/index.html)
- [Rendered page screenshot](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/verification/investigation.png)
- [Reproducible verification](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/DEVELOPMENT.md)

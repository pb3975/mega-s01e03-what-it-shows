# Booking-v3 date hint contradicts day-first tenant form parsing (33 reports)

**Reports covered: 33 unique reports** from ticket #4471, across alder.physio, copper.studio, and pale.harbour, received 2026-04-17 through 2026-09-22 in the synthetic MEGA.dev export.

Booking-v3 displays MM/DD/YYYY, but the form interprets the date using its day-first tenant locale. A person following the hint enters month first and gets a day/month reversal. This is distinct from the shared parser assuming month-first input.

Example: R-41241 (alder.physio, form, de-DE tenant, booking-v3) reports 6 August becoming 8 June. Its browser locale is en-US, which is not the tenant's locale. R-41230 (copper.studio, form, es-ES tenant) was tagged parser at intake but belongs to this form-hint group.

## Evidence and counting

Reuse uniqueById, groupByCause, causeOf, dayFirst and tenantOf from the supplied kb. Count report IDs once, filter mergedInto === 4471, join each tenant directory record, and select form reports with a day-first tenant and booking-v3's MM/DD/YYYY hint. There are 33; intake labelled 18 hint and 15 parser. Counting hint tags instead yields the wrong answer because 23 hint-tagged reports belong to the parser group.

The two classified groups partition all 412 unique reports: 379 parser plus 33 hint. The 15 repeated export rows are not new reports. All tenants are on file.

## Expected behavior and proposed acceptance

The hint and form parser must agree on the date input contract. Reproduce an ambiguous date in booking-v3 under de-DE, es-ES and pt-PT; verify a person following the hint receives the intended date. Check booking-v2 and month-first tenants as controls. A shared-parser fix alone must not close this issue. No product fix is implemented by this investigation.

## Desk follow-through

Keep a separate ticket even if subjects match existing parser reports. The accepted subject-only dedupe rule can merge distinct failures; the live DedupeExplorer distinguishes them by tenant and channel. See the signed investigation at src/routes/kb/incidents/4471-review/+page.svx and its rendered HTML. The accepted decision record remains intact; the investigation proposes a replacement rather than rewriting history.

## Review artifacts

- [Signed source](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/src/routes/kb/incidents/4471-review/+page.svx)
- [Actual rendered HTML](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/build/kb/incidents/4471-review/index.html)
- [Rendered page screenshot](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/verification/investigation.png)
- [Reproducible verification](https://github.com/pb3975/mega-s01e03-what-it-shows/blob/main/support-kb/DEVELOPMENT.md)

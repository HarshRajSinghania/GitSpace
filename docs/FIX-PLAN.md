# Fix plan: audit of 2026-11-08

All 15 audit findings, smallest fix each, in order of risk. One branch (`fix/for-you-instant`, PR 18).
Every fix keeps behaviour the same except the bug. Risky logic gets one test.

| # | Fix | Files | Test |
|---|-----|-------|------|
| 1 | Validate owner/name in Review (reject `.`/`..`, GitHub name rules) | routes/api.js | yes |
| 2 | Stress seeder refuses to wipe unless `--yes-wipe` and DB name has "test" | scripts/seed_stress.js | no (script) |
| 3 | Refresh: a failed repo page saves nothing and keeps the old ETag | refresh.js | yes |
| 4 | Dev mode only when `NODE_ENV=development` (limits, mock login, mock review data, falling back to the sandbox when Postgres is down) | server.js, routes/auth.js, routes/api.js, database.js | no |
| 5 | Startup: table creation failure stops the server (Render restarts it) | database.js, server.js | no |
| 6 | Search ignores answers to an older query | web/.../SearchBox.jsx | build |
| 7 | Pinned repos remembered at sign-in, used by the 6-hour refresh | database.js, routes/api.js, refresh.js | yes |
| 8 | Preview remembers "not found" for an hour | routes/api.js | no |
| 9 | Game loop schedules the next frame first | public/js/engine.js | no |
| 10 | Clicks before the UI loads do nothing instead of erroring | public/js/input.js, engine.js | no |
| 11 | One error boundary around the React app | web/src/main.jsx | build |
| 12 | Island spot pick + save in one locked transaction | database.js | Postgres run |
| 13 | GitHub cache keeps only used fields and drops expired entries | routes/api.js | no |
| 14 | Project-issue lookup failure remembered 5 minutes | routes/missions.js | no |
| 15 | Delete dead code (trie, attract mode, guest flags, write-only globals, unused param, duplicate session helpers) | several | full test run |

## Prompt used

> Fix every finding in docs/FIX-PLAN.md on branch fix/for-you-instant of GitSpace. Smallest change per finding;
> delete rather than add; keep each file's existing style and structure. Before deleting anything, grep the whole
> tree (including public/, web/, test/, index.html) for every reference. Add a test only where the table says yes.
> After all fixes: `npm test` green, `npm run build:web` green, the app boots in sandbox mode and the map, search,
> profile card and First PR drawer work in the browser. Commit with plain messages and no AI attribution lines,
> push to the branch, and leave the merge of PR 18 to the owner.

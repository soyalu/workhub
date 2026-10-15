# WorkHub · Engineering Roadmap

## M1: Foundation and design system
- [x] Product requirements, GitHub repository, Go API skeleton.
- [x] React Router navigation and M1 page skeletons on feature/m1-ui-foundation.
- [x] Shared adventure design tokens and reusable parchment/status/progress components.
- [x] Responsive sidebar and distinct page layouts for home, projects, calendar, journal, capture, inbox and growth.
- [x] GitHub Actions checks for frontend and Go.
- [x] Commit a reproducible frontend package-lock.json and switch CI to npm ci.
- [x] Add Playwright smoke tests and desktop/mobile screenshot capture to CI.
- [ ] Review captured screenshots against the approved homepage; run real-device responsive acceptance.
- [x] Separate the homepage scenic layer into an independent SVG illustration, retaining semantic React navigation.
- [x] Prepare independently loadable WebP scene/portrait asset slots and a local preview/art package.
- [x] Commit three WebP raster assets on the feature branch and validate their hashes in CI; SVG remains fallback only for loading failures.
- [x] Use user-approved original fantasy art to prepare a clean map without embedded interface text, a transparent traveler cutout and a sidebar night illustration.
- [ ] Polish traveler edge mask, refine map node placement and reach screenshot parity with the user-approved homepage.
- [ ] Upgrade calendar to full month/week/day views and journal to editable drafts after domain APIs exist.

## M2: Context-aware input and persistence
- SQLite migrations and private data storage.
- Project, Capture, WorkEvent, Task, CalendarEvent and Artifact.
- Minimal-validity checking, targeted follow-up questions, pending/confirmed record lifecycle.
- Verified work-event linkage to project and journal.

## M3: Daily work completion loop
- Editable daily journal, past-date timeline and cross-module navigation.
- Monthly consultation summaries from confirmed work sources.

## M4: Time and outcomes
- Workday check-in/out and independently attributed effort.
- Reminders, material outcomes and personal analytics.

## M5: Desktop and multiple devices
- macOS Tauri shell, system notifications and global quick capture.
- Authenticated NAS/mobile usage and optional AI assistance.

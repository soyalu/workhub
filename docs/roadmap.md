# WorkHub · Engineering Roadmap

## M1: Foundation (Go migration)
- [x] Product principles, README, .gitignore and frontend/backend split.
- [x] React + Vite frontend placeholder.
- [x] Replace Fastify/TypeScript backend with Go 1.23+ standard-library HTTP server.
- [x] Preserve GET /api/health contract, add Go unit tests and clean shutdown.
- [x] Root scripts run React (npm) + Go separately.
- [ ] Verify npm dependency installation and frontend build; create package-lock.json.
- [ ] Add CI for frontend build and Go tests.
- [ ] Implement approved fantasy adventure UI as accessible, reusable React components.

## M2: Contextual input and data model
- Project, Capture, WorkEvent, Task, CalendarEvent and Artifact.
- SQLite migrations, backup and privacy-safe tests.
- One-line input, context lookup, minimal-validity checks and targeted follow-up.
- Recoverable pending information lifecycle and retention policies.

## M3: Workday closed loop
- Calendar month/week/day and historical journal timeline.
- Editable, confirmed daily journal with source traceability.
- Monthly consulting report and evidence-based aggregation.

## M4: Productivity
- Clock-in/out, work effort allocation and reminders.
- Materials, achievements and useful self-analysis.

## M5: Desktop and multi-device
- macOS Tauri shell, global quick capture and system notifications.
- Mobile-friendly capture and authenticated NAS sync.
- Optional AI assistance without fabricated work records.

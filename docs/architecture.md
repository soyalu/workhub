# WorkHub · Architecture Baseline

## Scope

Personal market consulting and office support, not a corporate CRM, OA or authoritative attendance system. New project opportunities and existing projects share consultation work, meetings, material writing and bid-related events.

## Major layers

- frontend/: React + Vite for browser UI; later reusable in Tauri for macOS.
- backend/: Fastify API; SQLite, scheduling and input recognition are future milestones.
- docs/: architecture decisions, milestones and domain contracts.

Development Vite proxy: /api -> 127.0.0.1:3001. Backend binds localhost by default; CORS is configured with explicit origins.

## Planned domain objects

| Entity | Meaning |
| --- | --- |
| Project | Project opportunity or existing project, including sales progress snapshots |
| Capture | Original input, extracted facts, follow-up questions and lifecycle |
| WorkEvent | Verified activity with occurrence date and source links |
| Task | Plan and pending action, not proof of completion |
| CalendarEvent | Scheduled event, not proof of attendance |
| Artifact | Documents, versions, deliverables and file references |
| TimeRecord | Clock-in/out and independently confirmed actual effort |
| WorkReport | Editable journal or monthly consulting report, with revisions |

Incomplete captures move between pending_details, pending_confirmation and accepted/archived/recycle_bin; important source-linked content must be protected from destructive cleanup. Never infer a meeting occurred solely from a calendar item, or count attendance span as project effort.

## Initial API

GET /api/health returns JSON with status=ok and service=workhub-api. M1 intentionally implements no database, business endpoints or AI integration. All example pages are explicitly placeholders.

## Security

Never commit customer names, internal presentations, bid files, personal logs, real databases or credentials to this public repository. Persistent operation later requires authentication, authorization, encrypted transport, backups and documented retention.

# WorkHub · Architecture Baseline

## Product boundaries

WorkHub is a personal consulting and productivity application, **not** an enterprise CRM, OA, or authoritative attendance system. Opportunities originate mostly from sales and are periodically updated; ongoing project consulting also creates meetings, documents, bids, tasks, and work-event records.

- A **CalendarEvent** is a planned appointment, not evidence it happened.
- A **Task** describes work to do, not proof of its completion.
- A **WorkEvent** describes confirmed actual work and must retain the occurrence date and source evidence.
- A clock-in/out span is not automatically attributable work effort.
- Generated journals and consulting reports must be editable, confirmed, and traceable to source records.

## Technical baseline (Go migration)

```text
React + TypeScript + Vite (frontend/)
          |
          | /api (development proxy; same-origin in production)
          v
Go 1.23+ net/http (backend/)
  cmd/server         application entrypoint, graceful shutdown
  internal/config    env and bind address
  internal/httpapi   handlers and route tests
          |
          v
SQLite + files (planned M2)
```

Node/npm only manages the **frontend** workspace; Go Modules independently manages the backend. Root npm scripts orchestrate builds and local startup. For the initial single health endpoint, Go 1.23 standard `http.ServeMux` avoids third-party routing dependencies; Chi can be introduced if routing complexity later warrants it.

The backend listens on `127.0.0.1:3001` by default. For production, use a reverse proxy or equivalent same-origin deployment, authentication, TLS and private data storage. Do **not** bind to public interfaces without security controls.

## Planned domain objects (M2 onwards)

| Entity | Meaning |
| --- | --- |
| Project | New opportunity or existing project; sales progress snapshots |
| Capture | Original input, extracted facts, questions and lifecycle |
| WorkEvent | Verified work with occurrence time and evidence |
| Task | Pending or completed action, deadlines and project links |
| CalendarEvent | Meeting / schedule, separate from actual work |
| Artifact | PPT, Word, PDF, file references, versions and deliverables |
| TimeRecord | Clock-in/out and separately sourced actual effort |
| WorkReport | Editable daily journal and monthly consulting report with history |

Pending captures are retained without being counted as official events. State flow: pending_details -> pending_confirmation -> accepted; optional archived and recycle_bin with recoverable cleanup. Important or connected source information must be protected against silent deletion.

## Initial API contract

`GET /api/health` returns `{"status":"ok","service":"workhub-api"}`. The frontend keeps requesting the same relative URL; moving from Fastify to Go does not change the API contract.

M1 deliberately has no business handlers, database, migration system or AI model integration. Unit tests cover API response, unsupported method and environment configuration.

## Future considerations

SQLite initially, with migrations and explicit backup / restore. Develop project, capture, workevent, calendar, journal, timing and scheduler packages only when real use cases are being built. Consider OpenAPI for typed frontend clients once domain APIs are defined.

Fantasy visual style is a design system, not a page-layout template. Homepage remains an exploration map; business pages use appropriate list/grid/calendar/editor arrangements.

## Public repository security

No company documents, customer/bid records, user logs, credentials, database content or secrets in source control. Mobile and NAS access will require proper authentication, authorization and encryption, not merely configurable CORS.

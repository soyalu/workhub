# WorkHub · Adventure UI Design System (M1.2)

## Source of visual direction

The user-approved visual reference is the adventure-map **homepage**: midnight-blue left navigation, luminous gold ornament, open fantasy landscapes, parchment content cards, badges, and personal progression. **It is not a shared page-layout template.** Internal pages should prioritize work readability and use their own structures.

The scenic vector used in M1.2 is an original *engineering placeholder*. It is neither the reference artwork nor the final layered production illustration. Never use a fully rendered reference screenshot as a background with transparent click targets; that creates inaccessible text, impossible responsive layouts, and inflexible data binding.

## Design tokens

- \`--wh-navy-950/900/800\`: shell and dark panels.
- \`--wh-gold-500/400/300\`: ornaments, navigation focus and achievement emphasis.
- \`--wh-parchment-50/100/200/300\`: readable content surfaces.
- \`--wh-blue\`, \`--wh-green\`, \`--wh-amber\`, \`--wh-red\`: interaction or work states, **never decorative status labels without semantic meaning**.
- Typography: system Chinese UI fonts; Songti fallback for decorative headings. No third-party licensed font binaries committed.
- Spacing, radius and shadows are shared CSS tokens in \`frontend/src/styles/tokens.css\`.

## Reusable building blocks

| Component | Purpose |
| --- | --- |
| AppShell | Unified dark sidebar and topbar, responsive navigation, API health indicator |
| PageBanner | Short fantasy scenic masthead for each inner page |
| FantasyCard | Parchment surface containing readable real UI content |
| StatusBadge | Semantically colored status indicator |
| ProgressMeter | Accessible quantified progress value with aria labels |
| EmptyState | Explicit blank and not-yet-implemented presentation |

## Distinct page structures

| Page | Main layout |
| --- | --- |
| Home | Scenic overview map + personal companion + summary cards |
| Projects | Filters + project cards; future details and timeline |
| Calendar | Month grid + selected day details; later week/day views |
| Journal | Historical date rail + day journal; later editable report |
| Inbox | Pending information list and context pane in M2 |
| Growth | Analytics and achievement panels, values based on verified records |

## Interaction and privacy rules

1. Real text, controls, and status are **HTML components**, not pixels baked into backgrounds.
2. Every route is navigable and all actual buttons perform an explicit action.
3. M1 visuals and examples are designated demo data, not official events or time records.
4. Respect reduced-motion preferences; provide keyboard focus and labels for interactive components.
5. Mobile layout is a functional adaptation, not a squeezed desktop map.
6. Smart capture validity, persistence, background reminders, file reading and AI recognition are **not implemented in M1.2**.

import type { ReactNode } from 'react';

type StatusTone = 'blue' | 'green' | 'amber' | 'red' | 'muted';

export function StatusBadge({ children, tone = 'muted' }: { children: ReactNode; tone?: StatusTone }) {
  return <span className={'status-badge tone-' + tone}>{children}</span>;
}

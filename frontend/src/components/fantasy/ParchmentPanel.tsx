import type { ReactNode } from 'react';
import { OrnateFrame } from './OrnateFrame';

export function ParchmentPanel({ className = '', children }: { className?: string; children: ReactNode }) {
  return <section className={'fantasy-card ornate-parchment ' + className}>
    {children}
    <OrnateFrame variant="parchment" />
  </section>;
}

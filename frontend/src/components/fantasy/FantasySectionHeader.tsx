import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { GoldDivider } from './GoldDivider';

export function FantasySectionHeader({
  title, icon: Icon, action,
}: { title?: string; icon?: LucideIcon; action?: ReactNode }) {
  return <div className="fantasy-card-header ornate-section-heading">
    {title && <h2>{Icon && <span className="ornate-heading-crest"><Icon size={17} aria-hidden="true"/></span>}{title}</h2>}
    <GoldDivider />
    {action}
  </div>;
}

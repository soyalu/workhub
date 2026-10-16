import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FantasyCardProps {
  title?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FantasyCard({ title, icon: Icon, action, children, className = '' }: FantasyCardProps) {
  return (
    <section className={'fantasy-card ' + className}>
      {(title || action) && (
        <div className="fantasy-card-header">
          {title && <h2>{Icon && <Icon size={19} aria-hidden="true"/>}{title}</h2>}
          {action}
        </div>
      )}
      <div className="fantasy-card-body">{children}</div>
    </section>
  );
}

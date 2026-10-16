import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { FantasySectionHeader } from './FantasySectionHeader';
import { ParchmentPanel } from './ParchmentPanel';

interface FantasyCardProps {
  title?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  ornamented?: boolean;
}

export function FantasyCard({ title, icon: Icon, action, children, className = '', ornamented = false }: FantasyCardProps) {
  const content = <>
    {(title || action) && (ornamented
      ? <FantasySectionHeader title={title} icon={Icon} action={action}/>
      : <div className="fantasy-card-header">
          {title && <h2>{Icon && <Icon size={19} aria-hidden="true" />}{title}</h2>}
          {action}
        </div>)}
    <div className="fantasy-card-body">{children}</div>
  </>;
  return ornamented
    ? <ParchmentPanel className={className}>{content}</ParchmentPanel>
    : <section className={'fantasy-card ' + className}>{content}</section>;
}

import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageBanner({ eyebrow = 'ADVENTURE JOURNAL', title, description, action }: PageBannerProps) {
  return (
    <header className="page-banner">
      <div className="page-banner-copy">
        <div className="eyebrow"><Sparkles size={14} />{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="page-banner-action">{action}</div>}
      <div className="banner-illustration" aria-hidden="true">
        <div className="banner-sun" /><div className="banner-ridge ridge-back" /><div className="banner-ridge ridge-front" />
        <div className="banner-tower">♜</div>
      </div>
    </header>
  );
}

import { ScrollText } from 'lucide-react';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><ScrollText size={26}/><strong>{title}</strong><p>{description}</p></div>;
}

import { Clock3 } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { EmptyState } from '../../components/fantasy/EmptyState';

export function TimeTrackingPage() {
  return <>
    <PageBanner eyebrow="JOURNEY TIME" title="打卡与工时" description="上下班打卡、提醒、工时归集和工作效率回顾；有效工作投入需另行确认。"/>
    <FantasyCard title="工作时间记录" icon={Clock3}>
      <EmptyState title="尚未启用工时存储" description="此版本不提供虚假的打卡按钮；后续接入 Go 数据服务后才启用真实上下班记录。" />
    </FantasyCard>
  </>;
}

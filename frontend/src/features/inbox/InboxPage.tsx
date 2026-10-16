import { Inbox, ShieldAlert } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { EmptyState } from '../../components/fantasy/EmptyState';

export function InboxPage() {
  return (
    <>
      <PageBanner eyebrow="MESSENGER STATION" title="信息收件箱" description="把碎片输入、待追问的信息与上下文候选集中处理；不轻易丢弃，也不任其成为长期垃圾。"/>
      <FantasyCard title="待处理信息" icon={Inbox}>
        <EmptyState title="暂未接入真实信息" description="未来这里统一管理待补充、待确认、重要保护、已归档和可恢复回收站。"/>
        <div className="inbox-policy"><ShieldAlert size={18}/><span>尚未完善必要事实的输入不能进入正式日志；默认保留并按照可配置期限进行提醒与清理。</span></div>
      </FantasyCard>
    </>
  );
}

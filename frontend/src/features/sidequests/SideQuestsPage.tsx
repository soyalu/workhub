import { Link } from 'react-router-dom';
import { BookOpen, ScrollText } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { EmptyState } from '../../components/fantasy/EmptyState';

export function SideQuestsPage() {
  return <>
    <PageBanner eyebrow="SIDE QUESTS" title="支线任务" description="百日冲刺、战鼓会、每日读书打卡与临时专项的独立任务入口。"/>
    <FantasyCard title="专项与日常修行" icon={ScrollText}>
      <EmptyState title="尚未建立支线任务" description="这里暂不虚构打卡天数或任务进度；M2 接入真实工作记录后再生成。" />
      <Link to="/capture?kind=task" className="outline-link"><BookOpen size={16}/> 记录一次专项活动（预览）</Link>
    </FantasyCard>
  </>;
}

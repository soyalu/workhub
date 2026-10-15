import { BarChart3, BookOpenText, Clock3, Trophy } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { EmptyState } from '../../components/fantasy/EmptyState';

export function GrowthPage() {
  return (
    <>
      <PageBanner eyebrow="ADVENTURER'S PROGRESS" title="成长与分析" description="从工作事实形成可信的投入、产出与成就；游戏化反馈不等于虚构工作贡献。"/>
      <div className="growth-grid">
        <FantasyCard title="工作时间" icon={Clock3}><EmptyState title="暂无工时数据" description="上下班打卡跨度和有效工作投入分别统计。"/></FantasyCard>
        <FantasyCard title="工作成果" icon={BookOpenText}><EmptyState title="暂无成果数据" description="材料、交流、咨询与投标成果将基于有效事件汇总。"/></FantasyCard>
        <FantasyCard title="成长徽章" icon={Trophy}><EmptyState title="等待第一项真实成就" description="连续记录与成就来自真实完成事实。"/></FantasyCard>
        <FantasyCard title="趋势分析" icon={BarChart3}><EmptyState title="尚未形成趋势" description="后续支持按月比较项目投入、工作类型和完成成果。"/></FantasyCard>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { Feather, ListChecks } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { previewTasks, mockDataNotice } from '../../mocks/preview';

export function TasksPage() {
  return (
    <>
      <PageBanner eyebrow="QUEST BOARD" title="今日主线任务" description="把最重要的事项排在前面，不把任务计划误认为已经完成的工作。" action={<Link to="/capture" className="primary-link"><Feather size={16}/> 快速记录</Link>}/>
      <FantasyCard title="任务清单" icon={ListChecks}>
        <div className="work-list">
          {previewTasks.map((task, index) => (
            <div className="work-list-row" key={task.id}><span className="row-index">{String(index+1).padStart(2,'0')}</span>
              <div><strong>{task.title}</strong><p>{task.note}</p></div><StatusBadge tone={task.tone}>待处理</StatusBadge>
            </div>
          ))}
        </div>
        <p className="mock-notice">{mockDataNotice} 任务状态变更将于业务 API 阶段实现。</p>
      </FantasyCard>
    </>
  );
}

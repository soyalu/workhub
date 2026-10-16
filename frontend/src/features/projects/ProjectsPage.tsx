import { Link } from 'react-router-dom';
import { FolderKanban, Plus } from 'lucide-react';
import { useState } from 'react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { ProgressMeter } from '../../components/fantasy/ProgressMeter';
import { previewProjects, mockDataNotice } from '../../mocks/preview';

type ProjectFilter = 'all' | '新项目机会' | '存量项目';

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const filtered = previewProjects.filter(p=>filter === 'all' || p.kind === filter);
  return (
    <>
      <PageBanner eyebrow="EXPEDITION ARCHIVE" title="项目中心" description="新项目机会与存量项目的咨询支持档案，关联交流、材料与招投标工作。"
        action={<Link to="/capture" className="primary-link"><Plus size={16}/> 记录项目动态</Link>}/>
      <FantasyCard title="远征档案" icon={FolderKanban}>
        <div className="filter-row" role="group" aria-label="筛选项目类型">
          {([['all','全部项目'],['新项目机会','新项目机会'],['存量项目','存量项目']] as const).map(([key,label])=>(
            <button className={'filter-button ' + (filter===key?'is-selected':'')} onClick={()=>setFilter(key)} key={key} type="button" aria-pressed={filter===key}>{label}</button>
          ))}
        </div>
        <div className="project-grid">{filtered.map((project,index)=>(
          <article key={project.id} className="project-card">
            <div className={'project-card-art project-art-' + (index+1)} aria-hidden="true"><span>♜</span></div>
            <div className="project-card-info">
              <StatusBadge tone={project.kind==='存量项目'?'green':'blue'}>{project.kind}</StatusBadge>
              <h3>{project.title}</h3><p>{project.stage} · 演示进度 {project.progress}%</p>
              <ProgressMeter label={project.title + '演示进度'} value={project.progress}/>
            </div>
          </article>
        ))}</div>
        <p className="mock-notice">{mockDataNotice} 项目详情与时间线将在后续业务版本实现。</p>
      </FantasyCard>
    </>
  );
}

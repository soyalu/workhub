import { Link } from 'react-router-dom';
import {
  BookOpenText, CalendarDays, Compass, Feather, FolderKanban, Inbox,
  ListChecks, Sparkles, Trophy, Zap, ChartNoAxesCombined,
  type LucideIcon,
} from 'lucide-react';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { ProgressMeter } from '../../components/fantasy/ProgressMeter';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { previewTasks, mockDataNotice } from '../../mocks/preview';

const points: { label: string; description: string; to: string; icon: LucideIcon; position: string }[] = [
  { label: '主线任务', description: '今日待办', to: '/tasks', icon: ListChecks, position: 'point-tasks' },
  { label: '项目中心', description: '机会与存量项目', to: '/projects', icon: FolderKanban, position: 'point-projects' },
  { label: '工作日历', description: '计划与实际', to: '/calendar', icon: CalendarDays, position: 'point-calendar' },
  { label: '快速录入', description: '记录与补全', to: '/capture', icon: Feather, position: 'point-capture' },
  { label: '日志手札', description: '回顾工作', to: '/journal', icon: BookOpenText, position: 'point-journal' },
  { label: '成长分析', description: '投入与成果', to: '/growth', icon: ChartNoAxesCombined, position: 'point-growth' },
];


export function HomePage() {
  return (
    <div className="home-layout">
      <section className="map-stage map-stage-v2" aria-label="冒险地图导航">
        <img src="/art/adventure-world.svg" className="adventure-scene" alt="浮岛城堡与云海的奇幻冒险地图插画" draggable={false} />
        <div className="map-heading"><div className="eyebrow"><Sparkles size={15}/> YOUR ADVENTURE AWAITS</div><h1>今日 · 主线任务</h1><p>把每一次认真工作，都变成前进的旅程。</p></div>
        <div className="map-nodes">
          {points.map(({ label, description, to, icon: Icon, position }) => (
            <Link className={'map-node ' + position} key={to} to={to}>
              <span className="map-node-icon"><Icon size={20}/></span>
              <span className="map-node-copy"><strong>{label}</strong><small>{description}</small></span>
            </Link>
          ))}
        </div>
        <div className="map-caption">独立 SVG 场景层 · M1.3 美术迭代（模拟数据）</div>
      </section>
      <aside className="hero-summary hero-summary-v2">
        <div className="hero-identity">
          <span className="eyebrow">YOUR JOURNEY</span>
          <div className="hero-avatar" aria-hidden="true"><Compass size={42}/></div>
          <h2>你好，旅行者</h2>
          <p>工作是通往更大世界的修行。</p>
          <div className="hero-level"><strong>Lv. 1</strong><small>成长体系 · 待接入真实数据</small></div>
          <ProgressMeter value={0} label="成长经验" tone="gold"/>
        </div>
        <div className="hero-stat-grid">
          <div><Zap size={22}/><strong>—</strong><span>今日能量</span></div>
          <div><Trophy size={22}/><strong>—</strong><span>连续记录</span></div>
        </div>
        <FantasyCard title="今日任务链" icon={ListChecks}>
          <div className="quest-steps"><span className="quest-step is-current">规划</span><span className="quest-step">执行</span><span className="quest-step">复盘</span><span className="quest-step">成长</span></div>
          <p className="muted-small">记录真实的工作活动后，这里将呈现可追溯的任务进度。</p>
        </FantasyCard>
      </aside>
      <section className="home-bottom">
        <FantasyCard title="今日待办" icon={ListChecks} action={<Link to="/tasks" className="text-link">查看全部 →</Link>}>
          <div className="compact-list">{previewTasks.map(task=>(
            <div key={task.id} className="compact-item"><span className={'quest-dot tone-' + task.tone}/><div><strong>{task.title}</strong><small>{task.note}</small></div></div>
          ))}</div>
        </FantasyCard>
        <FantasyCard title="日程入口" icon={CalendarDays} action={<Link to="/calendar" className="text-link">打开日历 →</Link>}>
          <p className="muted-small">月 / 周 / 日工作安排、历史补录与日志跳转。</p>
          <Link to="/calendar" className="outline-link"><CalendarDays size={16}/> 查看工作日历</Link>
        </FantasyCard>
        <FantasyCard title="快速记录" icon={Feather} action={<Link to="/capture" className="text-link">去记录 →</Link>}>
          <p className="muted-small">一句话记录工作信息，信息不足时由系统精准追问。</p>
          <Link to="/capture" className="outline-link"><Feather size={16}/> 打开录入面板</Link>
        </FantasyCard>
        <FantasyCard title="信息收件箱" icon={Inbox} action={<Link to="/inbox" className="text-link">查看全部 →</Link>}>
          <div className="inbox-placeholder"><StatusBadge tone="amber">设计中</StatusBadge><span>待补充、待确认、已归档信息的统一入口。</span></div>
        </FantasyCard>
      </section>
      <p className="mock-notice">{mockDataNotice}</p>
    </div>
  );
}

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

function Landscape() {
  return (
    <svg className="adventure-landscape" viewBox="0 0 1000 560" role="img" aria-label="奇幻浮岛、城堡与山谷构成的冒险世界插画（工程绘制占位）" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="adventureSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#76b7f2"/><stop offset=".55" stopColor="#d2e7f4"/><stop offset="1" stopColor="#f8e9bb"/></linearGradient>
        <linearGradient id="farMount" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7cafd3"/><stop offset="1" stopColor="#bfd7d4"/></linearGradient>
        <linearGradient id="islandRock" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8290a1"/><stop offset="1" stopColor="#395978"/></linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#91bd72"/><stop offset="1" stopColor="#3b887b"/></linearGradient>
      </defs>
      <rect width="1000" height="560" fill="url(#adventureSky)"/>
      <circle cx="785" cy="95" r="61" fill="#fff5c7" opacity=".75"/>
      <path d="M0 235 L125 104 L217 221 L332 119 L473 251 L612 93 L784 258 L891 170 L1000 263 V560 H0Z" fill="url(#farMount)" opacity=".75"/>
      <path d="M0 282 L175 173 L289 292 L401 188 L526 282 L740 162 L885 291 L1000 226 V560 H0Z" fill="#aacbd5" opacity=".63"/>
      <path d="M0 385 Q200 320 362 375 T710 354 T1000 390 V560 H0Z" fill="#4f9d99" opacity=".53"/>
      <g opacity=".82" fill="#f8fbf5"><ellipse cx="180" cy="118" rx="96" ry="15"/><ellipse cx="290" cy="144" rx="76" ry="13"/><ellipse cx="795" cy="229" rx="132" ry="18"/><ellipse cx="570" cy="395" rx="220" ry="24"/></g>
      <g transform="translate(400 154)">
        <path d="M-177 130 Q-148 92 -72 98 L115 84 Q184 88 202 124 L133 174 L72 240 L19 309 L-56 218 L-128 181Z" fill="url(#islandRock)"/>
        <path d="M-177 131 Q-138 91 -58 90 L117 81 Q176 89 202 121 Q135 152 22 144 Q-91 159 -177 131Z" fill="url(#grass)"/>
        <path d="M-48 93 V-8 H35 V95Z" fill="#f4e6bd" stroke="#b88f60" strokeWidth="7"/>
        <path d="M-65 -12 L-9 -87 L52 -12Z" fill="#426b8e" stroke="#dfbd76" strokeWidth="6"/>
        <path d="M-120 110 V17 H-81 V110Z" fill="#e7d4a7" stroke="#ae8054" strokeWidth="6"/>
        <path d="M-133 21 L-102 -34 L-69 21Z" fill="#507f9a"/>
        <path d="M70 109 V13 H118 V109Z" fill="#e7d4a7" stroke="#ae8054" strokeWidth="6"/>
        <path d="M57 19 L94 -47 L131 19Z" fill="#507f9a"/>
        <rect x="-25" y="34" width="29" height="62" rx="14" fill="#3f6378"/>
        <path d="M-8 -89 L-8 -118" stroke="#694f3f" strokeWidth="5"/><path d="M-4 -116 L42 -104 L-4 -92Z" fill="#d1a14f"/>
      </g>
      <g transform="translate(175 305) scale(.75)">
        <path d="M-135 72 L91 49 L135 74 L94 159 L32 212 L-33 156Z" fill="url(#islandRock)"/>
        <path d="M-135 72 Q-40 16 88 50 L135 74 Q5 113 -135 72Z" fill="url(#grass)"/>
        <path d="M-40 62 V-6 H40 V63Z" fill="#f3d8a5"/><path d="M-53 -6 L0 -71 L53 -6Z" fill="#b97756"/>
      </g>
      <g transform="translate(800 302) scale(.68)">
        <path d="M-147 58 L121 54 L153 75 L69 208 L-8 249 L-78 182Z" fill="url(#islandRock)"/>
        <path d="M-147 58 Q-40 4 121 54 L153 75 Q15 103 -147 58Z" fill="url(#grass)"/>
        <path d="M-55 64 V-20 H56 V64Z" fill="#ecd4ac"/><path d="M-72 -20 L0 -100 L75 -20Z" fill="#6484a2"/>
      </g>
      <path d="M285 350 Q380 305 455 323" fill="none" stroke="#dec38a" strokeWidth="13" strokeDasharray="16 8" opacity=".9"/>
      <path d="M570 328 Q670 306 733 349" fill="none" stroke="#dec38a" strokeWidth="13" strokeDasharray="16 8" opacity=".9"/>
      <g fill="#fff7d3" opacity=".75"><circle cx="260" cy="162" r="6"/><circle cx="692" cy="270" r="7"/><circle cx="590" cy="115" r="4"/><circle cx="900" cy="150" r="5"/></g>
    </svg>
  );
}

export function HomePage() {
  return (
    <div className="home-layout">
      <section className="map-stage" aria-label="冒险地图导航">
        <Landscape />
        <div className="map-heading"><div className="eyebrow"><Sparkles size={15}/> WORK AS AN ADVENTURE</div><h1>今日 · 主线任务</h1><p>把每一次认真工作，都变成前进的旅程。</p></div>
        <div className="map-nodes">
          {points.map(({ label, description, to, icon: Icon, position }) => (
            <Link className={'map-node ' + position} key={to} to={to}>
              <span className="map-node-icon"><Icon size={20}/></span>
              <span className="map-node-copy"><strong>{label}</strong><small>{description}</small></span>
            </Link>
          ))}
        </div>
        <div className="map-caption">奇幻场景为可替换的矢量工程占位，后续将使用正式分层美术资源。</div>
      </section>
      <aside className="hero-summary">
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

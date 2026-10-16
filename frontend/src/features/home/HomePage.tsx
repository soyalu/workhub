import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  BookOpenText, CalendarDays, ChevronRight, Feather, FolderKanban, Inbox,
  ListChecks, Trophy, Zap, ChartNoAxesCombined, Compass,
  Flame, Mountain, Crown, Gift, Lightbulb, CircleHelp, FileText, Bell,
  ScrollText, Check, Sun, type LucideIcon,
} from 'lucide-react';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { ProgressMeter } from '../../components/fantasy/ProgressMeter';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { previewInbox, previewAgenda, mockDataNotice } from '../../mocks/preview';

type Landmark = {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
  location: string;
  theme: 'quest' | 'project' | 'message' | 'calendar' | 'capture' | 'side' | 'growth';
};

const landmarks: Landmark[] = [
  { label: '今日主线任务', description: '待完成的冒险', to: '/tasks', icon: ListChecks, location: 'point-tasks', theme: 'quest' },
  { label: '项目中心', description: '新机会与存量项目', to: '/projects', icon: FolderKanban, location: 'point-projects', theme: 'project' },
  { label: '信息收件箱', description: '消息与待确认', to: '/inbox', icon: Inbox, location: 'point-inbox', theme: 'message' },
  { label: '快速录入', description: '随手记录见闻', to: '/capture', icon: Feather, location: 'point-capture', theme: 'capture' },
  { label: '工作日历', description: '今日行程', to: '/calendar', icon: CalendarDays, location: 'point-calendar', theme: 'calendar' },
  { label: '支线任务', description: '专项与每日打卡', to: '/side-quests', icon: ScrollText, location: 'point-side', theme: 'side' },
  { label: '成长分析', description: '探索与积累', to: '/growth', icon: ChartNoAxesCombined, location: 'point-growth', theme: 'growth' },
];

const achievements = [
  { title: '连续记录', icon: Compass },
  { title: '高效执行', icon: Mountain },
  { title: '知识收藏', icon: BookOpenText },
  { title: '项目推进', icon: Crown },
];

export function HomePage() {
  const [sceneStatus, setSceneStatus] = useState<'loading' | 'ready' | 'missing'>('loading');
  return (
    <div className="home-layout adventure-dashboard">
      <section className={'map-stage map-stage-v2 is-raster-art adventure-map' + (sceneStatus === 'missing' ? ' art-missing' : '')} aria-label="冒险地图导航">
        <img src="/art/home-map.webp" className="adventure-scene"
          alt="浮岛、城堡、瀑布与云海构成的奇幻冒险地图" draggable={false} fetchPriority="high"
          hidden={sceneStatus === 'missing'}
          onLoad={() => setSceneStatus('ready')}
          onError={() => setSceneStatus('missing')}
        />
        {sceneStatus === 'missing' && <div className="map-art-error" role="alert">地图美术资源加载失败，请检查 /art/home-map.webp。任务入口仍可使用。</div>}
        <div className="map-heading">
          <div className="eyebrow"><Sun size={15}/> THE ADVENTURE BEGINS</div>
          <h1>今日 · 主线任务</h1>
          <p>把工作，变成一场值得期待的冒险。</p>
        </div>
        <div className="map-motto" aria-hidden="true">每一份认真工作的你，<br/>都在书写属于自己的传奇。</div>
        <svg className="adventure-route" viewBox="0 0 1000 570" preserveAspectRatio="none" aria-hidden="true">
          <path d="M210 273 C280 240 330 210 472 156 S667 157 808 169" />
          <path d="M210 285 C160 365 158 403 200 462 S347 499 465 446 S591 334 640 328 S782 382 818 456" />
        </svg>
        <div className="map-nodes">
          {landmarks.map(({ label, description, to, icon: Icon, location, theme }) => (
            <Link className={'map-node landmark landmark-' + theme + ' ' + location} key={to} to={to}
              aria-label={label + '：' + description}>
              <span className="landmark-emblem" aria-hidden="true"><Icon size={22} strokeWidth={1.8}/></span>
              <span className="landmark-scroll"><strong>{label}</strong><small>{description}</small></span>
              <ChevronRight className="landmark-chevron" size={15} aria-hidden="true"/>
            </Link>
          ))}
        </div>
      </section>

      <aside className="hero-summary hero-summary-v2 adventure-hero" aria-label="旅行者成长面板">
        <div className="hero-identity hero-identity-art">
          <div className="character-stage">
            <div className="character-title"><span className="character-sun" aria-hidden="true">✺</span><div><strong>你好，旅行者</strong><small>踏上今天的冒险旅程</small></div></div>
            <img className="traveler-portrait" src="/art/traveler.webp" alt="蓝色斗篷的奇幻旅行者立绘" onError={event => { event.currentTarget.hidden = true; }}/>
            <div className="character-quote">工作是通往更大世界的修行。</div>
          </div>
          <div className="hero-level"><strong>Lv. —</strong><small>经验值待接入 · 未计算</small></div>
          <ProgressMeter value={0} label="尚未启用的成长经验" tone="blue"/>
        </div>
        <div className="hero-stat-grid" aria-label="成长指标尚未接入真实数据">
          <div><Zap size={22}/><strong>—</strong><span>今日能量</span></div>
          <div><Flame size={22}/><strong>—</strong><span>连续记录</span></div>
          <div><ChartNoAxesCombined size={22}/><strong>—</strong><span>本周进度</span></div>
          <div><Trophy size={22}/><strong>—</strong><span>成就徽章</span></div>
        </div>
        <div className="quest-chain">
          <div className="quest-chain-heading"><ListChecks size={16}/><strong>今日任务链</strong><Link to="/tasks">查看全部 <ChevronRight size={13}/></Link></div>
          <div className="quest-chain-rail" aria-label="阶段示意，不代表实际完成">
            {['规划','执行','复盘','成长'].map((step,i)=><div key={step} className="quest-chain-step">
              <span className={i===0?'quest-chain-orb is-start':'quest-chain-orb'}>{i===0?<Check size={14}/>:i+1}</span>
              <small>{step}</small>
            </div>)}
            <Link className="quest-chain-reward" to="/growth" aria-label="查看尚未解锁的成长奖励"><Gift size={32}/><small>奖励</small></Link>
          </div>
          <p className="quest-chain-note">演示阶段图，未关联实际任务完成记录</p>
        </div>
      </aside>

      <section className="home-bottom" aria-label="首页工作摘要">
        <FantasyCard title="信息收件箱" icon={Inbox} action={<Link to="/inbox" className="text-link">查看全部 →</Link>}>
          <div className="home-inbox-list">
            {previewInbox.map(item=><div className="home-inbox-row" key={item.id}>
              <span className={'inbox-row-icon inbox-' + item.tone} aria-hidden="true"><Bell size={15}/></span>
              <div><strong>{item.title}</strong><small>{item.summary}</small></div><span className="inbox-row-time">示例</span>
            </div>)}
          </div>
        </FantasyCard>
        <FantasyCard title="工作日历" icon={CalendarDays} action={<Link to="/calendar" className="text-link">查看日历 →</Link>}>
          <div className="home-calendar-heading"><strong>{new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(new Date())}</strong><StatusBadge tone="muted">演示日程</StatusBadge></div>
          <div className="home-agenda">{previewAgenda.map(item=><div className="home-agenda-row" key={item.id}>
            <span>{item.time}</span><i className={'agenda-dot agenda-' + item.tone} aria-hidden="true"/>
            <div><strong>{item.title}</strong><small>示例安排 · 未核实</small></div>
          </div>)}</div>
        </FantasyCard>
        <FantasyCard title="每日工作日志" icon={BookOpenText} action={<Link to="/journal" className="text-link">去记录 →</Link>}>
          <div className="journal-preview-placeholder">记录今天的工作、收获与待解决的问题……<small>自动生成与确认将在 M3 实现</small></div>
          <div className="home-quick-heading"><Feather size={14}/> 快速录入</div>
          <div className="home-quick-grid">
            <Link to="/capture?kind=task"><ListChecks size={14}/> 记任务</Link>
            <Link to="/capture?kind=idea"><Lightbulb size={14}/> 记灵感</Link>
            <Link to="/capture?kind=question"><CircleHelp size={14}/> 记问题</Link>
            <Link to="/capture?kind=meeting"><CalendarDays size={14}/> 记会议</Link>
            <Link to="/capture?kind=todo"><Feather size={14}/> 记待办</Link>
            <Link to="/capture?kind=material"><FileText size={14}/> 记材料</Link>
          </div>
        </FantasyCard>
        <FantasyCard title="近期成就与奖励" icon={Trophy} action={<Link to="/growth" className="text-link">查看全部 →</Link>}>
          <div className="home-achievement-grid">{achievements.map(({icon: Icon,title})=><div className="home-achievement" key={title}>
            <span aria-hidden="true"><Icon size={22}/></span><strong>{title}</strong><small>待解锁</small>
          </div>)}</div>
          <div className="home-reward-preview"><Gift size={25} aria-hidden="true"/><div><strong>冒险奖励待解锁</strong><small>工作信息确认后再计入成就</small></div></div>
        </FantasyCard>
      </section>
      <p className="mock-notice">{mockDataNotice}</p>
    </div>
  );
}

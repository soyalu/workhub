import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  BookOpenText, CalendarDays, ChevronRight, Feather, FolderKanban, Inbox,
  ListChecks, Sparkles, Trophy, Zap, ChartNoAxesCombined,
  Compass, Flame, Mountain, Crown, Gift, Lightbulb, CircleHelp, FileText, Bell,
  type LucideIcon,
} from 'lucide-react';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { ProgressMeter } from '../../components/fantasy/ProgressMeter';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { previewInbox, previewAgenda, mockDataNotice } from '../../mocks/preview';

const points: { label: string; description: string; to: string; icon: LucideIcon; position: string }[] = [
  { label: '主线任务', description: '今日待办', to: '/tasks', icon: ListChecks, position: 'point-tasks' },
  { label: '项目中心', description: '机会与存量项目', to: '/projects', icon: FolderKanban, position: 'point-projects' },
  { label: '工作日历', description: '计划与实际', to: '/calendar', icon: CalendarDays, position: 'point-calendar' },
  { label: '快速录入', description: '记录与补全', to: '/capture', icon: Feather, position: 'point-capture' },
  { label: '日志手札', description: '回顾工作', to: '/journal', icon: BookOpenText, position: 'point-journal' },
  { label: '成长分析', description: '投入与成果', to: '/growth', icon: ChartNoAxesCombined, position: 'point-growth' },
];


export function HomePage() {
  const [sceneStatus, setSceneStatus] = useState<'loading' | 'ready' | 'missing'>('loading');
  return (
    <div className="home-layout">
      <section className={"map-stage map-stage-v2 is-raster-art" + (sceneStatus === 'missing' ? ' art-missing' : '')} aria-label="冒险地图导航">
        <img
          src="/art/home-map.webp"
          className="adventure-scene"
          alt="浮岛城堡与云海的奇幻冒险美术场景"
          draggable={false}
          fetchPriority="high"
          hidden={sceneStatus === 'missing'}
          onLoad={() => setSceneStatus('ready')}
          onError={() => setSceneStatus('missing')}
        />
        {sceneStatus === 'missing' && (
          <div className="map-art-error" role="alert">
            地图美术资源加载失败，请检查 /art/home-map.webp。任务入口仍可使用。
          </div>
        )}
        <div className="map-heading"><div className="eyebrow"><Sparkles size={15}/> YOUR ADVENTURE AWAITS</div><h1>今日 · 主线任务</h1><p>把每一次认真工作，都变成前进的旅程。</p></div>
        <div className="map-nodes">
          {points.map(({ label, description, to, icon: Icon, position }) => (
            <Link className={'map-node ' + position} key={to} to={to}>
              <span className="map-node-medallion" aria-hidden="true"><Icon size={21} strokeWidth={2}/></span>
              <span className="map-node-copy"><strong>{label}</strong><small>{description}</small></span>
              <ChevronRight className="map-node-arrow" size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <aside className="hero-summary hero-summary-v2">
        <div className="hero-identity hero-identity-art">
          <div className="character-stage">
            <div className="character-title"><span className="character-sun" aria-hidden="true">✺</span><div><strong>你好，旅行者</strong><small>每一天，都是崭新的旅程</small></div></div>
            <img className="traveler-portrait" src="/art/traveler.webp" alt="蓝色斗篷的奇幻旅行者立绘" onError={(e) => { e.currentTarget.hidden = true; }} />
            <div className="character-quote">工作是通往更大世界的修行。</div>
          </div>
          <div className="hero-level"><strong>Lv. 1</strong><small>成长体系 · 待接入真实数据</small></div>
          <ProgressMeter value={0} label="成长经验" tone="gold"/>
        </div>
        <div className="hero-stat-grid" aria-label="个人成长统计尚未接入真实数据">
          <div><Zap size={22}/><strong>—</strong><span>今日能量</span></div>
          <div><Flame size={22}/><strong>—</strong><span>连续记录</span></div>
          <div><ChartNoAxesCombined size={22}/><strong>—</strong><span>本周进度</span></div>
          <div><Trophy size={22}/><strong>—</strong><span>成就徽章</span></div>
        </div>
        <FantasyCard title="今日任务链" icon={ListChecks}>
          <div className="quest-steps"><span className="quest-step is-current">规划</span><span className="quest-step">执行</span><span className="quest-step">复盘</span><span className="quest-step">成长</span></div>
          <p className="muted-small">记录真实的工作活动后，这里将呈现可追溯的任务进度。</p>
        </FantasyCard>
      </aside>
      <section className="home-bottom" aria-label="首页工作摘要">
        <FantasyCard title="信息收件箱" icon={Inbox} action={<Link to="/inbox" className="text-link">查看全部 →</Link>}>
          <div className="home-inbox-list">
            {previewInbox.map((item) => (
              <div className="home-inbox-row" key={item.id}>
                <span className={'inbox-row-icon inbox-' + item.tone} aria-hidden="true"><Bell size={15}/></span>
                <div><strong>{item.title}</strong><small>{item.summary}</small></div>
                <span className="inbox-row-time">示例</span>
              </div>
            ))}
          </div>
        </FantasyCard>
        <FantasyCard title="工作日历" icon={CalendarDays} action={<Link to="/calendar" className="text-link">+ 查看日历 →</Link>}>
          <div className="home-calendar-heading">
            <strong>{new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date())}</strong>
            <StatusBadge tone="muted">演示日程</StatusBadge>
          </div>
          <div className="home-agenda">
            {previewAgenda.map((item) => (
              <div className="home-agenda-row" key={item.id}>
                <span>{item.time}</span><i className={'agenda-dot agenda-' + item.tone} aria-hidden="true"/>
                <div><strong>{item.title}</strong><small>示例安排 · 非实际工作记录</small></div>
              </div>
            ))}
          </div>
        </FantasyCard>
        <FantasyCard title="每日工作日志" icon={BookOpenText} action={<Link to="/journal" className="text-link">去记录 →</Link>}>
          <div className="journal-preview-placeholder">记录今天的工作、收获与待解决的问题……<small>日志自动生成与确认将在 M3 接入</small></div>
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
          <div className="home-achievement-grid">
            {[
              { icon: Compass, title: '连续记录' },
              { icon: Mountain, title: '高效行动' },
              { icon: BookOpenText, title: '知识收集' },
              { icon: Crown, title: '项目推进' },
            ].map(({ icon: Icon, title }) => (
              <div className="home-achievement" key={title}>
                <span aria-hidden="true"><Icon size={22}/></span><strong>{title}</strong><small>待解锁</small>
              </div>
            ))}
          </div>
          <div className="home-reward-preview">
            <Gift size={25} aria-hidden="true"/>
            <div><strong>冒险奖励待解锁</strong><small>完成真实工作后再计算成长与奖励</small></div>
          </div>
        </FantasyCard>
      </section>
      <p className="mock-notice">{mockDataNotice}</p>
    </div>
  );
}

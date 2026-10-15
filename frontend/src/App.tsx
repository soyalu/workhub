import { useEffect, useState } from 'react';
import { checkHealth } from './lib/api';

type ApiStatus = 'checking' | 'online' | 'offline';
const modules = [
  { icon: '✦', title: '智能录入', detail: '一句话记录 · 上下文追问' },
  { icon: '⚑', title: '项目中心', detail: '项目机会 · 咨询支持' },
  { icon: '◷', title: '工作日历', detail: '计划与实际 · 日期联动' },
  { icon: '▤', title: '每日工作日志', detail: '历史时间轴 · 人工确认' },
  { icon: '✉', title: '信息收件箱', detail: '待补充信息 · 生命周期' },
  { icon: '◇', title: '成长与分析', detail: '工时统计 · 工作成果' },
];

export default function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking');
  useEffect(() => {
    let active = true;
    checkHealth().then(() => { if (active) setApiStatus('online'); })
      .catch(() => { if (active) setApiStatus('offline'); });
    return () => { active = false; };
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✧</span><div><strong>WorkHub</strong><small>个人冒险工作台</small></div></div>
        <div className="nav-label">冒险日志 · 工程起点</div>
        <div className="nav-active">⌂　工作台首页</div>
        <p className="nav-hint">后续功能仍待开发；此页用于验证前后端工程。</p>
      </aside>
      <main className="main-content">
        <header className="header">
          <span>WorkHub / M1 初始化</span>
          <span className={'api-status ' + apiStatus} role="status"><span className="status-dot" />API {apiStatus === 'online' ? '已连接' : apiStatus === 'offline' ? '未连接' : '检测中'}</span>
        </header>
        <section className="hero">
          <span className="eyebrow">A NEW ADVENTURE BEGINS</span>
          <h1>把工作，变成一场值得期待的冒险。</h1>
          <p>从每一次有依据的记录开始，逐步建立属于自己的项目、日志与成长轨迹。</p>
        </section>
        <section className="content-panel" aria-labelledby="module-title">
          <div className="section-heading"><div><span className="eyebrow">COMING NEXT</span><h2 id="module-title">冒险功能模块</h2></div><span className="phase-tag">M1 · 工程基础</span></div>
          <div className="module-grid">{modules.map((item) => (
            <article className="module-card" key={item.title}>
              <span className="module-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3><p>{item.detail}</p><span className="module-status">待开发</span>
            </article>
          ))}</div>
        </section>
        <footer>WorkHub · 工程占位界面，不含真实业务数据。</footer>
      </main>
    </div>
  );
}

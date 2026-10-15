import { useEffect, useState } from 'react';
import { Bell, Feather, Menu, Search, ShieldCheck, X } from 'lucide-react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { navigation } from '../../app/navigation';
import { checkHealth } from '../../lib/api';

type ConnectionStatus = 'checking' | 'online' | 'offline';

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [connection, setConnection] = useState<ConnectionStatus>('checking');
  useEffect(() => {
    let alive = true;
    checkHealth()
      .then(() => { if (alive) setConnection('online'); })
      .catch(() => { if (alive) setConnection('offline'); });
    return () => { alive = false; };
  }, []);

  const dateLabel = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  }).format(new Date());

  return (
    <div className="app-layout">
      {menuOpen && <button type="button" className="sidebar-scrim" aria-label="关闭导航" onClick={() => setMenuOpen(false)} />}
      <aside className={'app-sidebar ' + (menuOpen ? 'is-open' : '')} aria-label="主导航">
        <div className="brand-lockup">
          <span className="brand-emblem" aria-hidden="true">✥</span>
          <div><strong>WorkHub</strong><span>个人办公工作台</span></div>
          <button type="button" className="sidebar-close" aria-label="关闭导航" onClick={() => setMenuOpen(false)}><X size={18} /></button>
        </div>
        <div className="sidebar-chapter">THE ADVENTURE · 工作旅程</div>
        <nav className="sidebar-navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenuOpen(false)}
              className={({ isActive }) => 'sidebar-link ' + (isActive ? 'is-active' : '')}>
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-scenery" aria-hidden="true"><span className="sidebar-moon" /><span className="sidebar-castle">♜</span></div>
          <p>把每一份工作<br />都当作一场值得探索的冒险。</p>
          <span>ONE DAY AT A TIME</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <button type="button" className="icon-button menu-toggle" onClick={() => setMenuOpen(true)} aria-label="打开导航"><Menu size={21}/></button>
          <span className="topbar-date">{dateLabel}</span>
          <div className="topbar-right">
            <Link to="/capture" className="topbar-capture"><Feather size={15}/> 快速记录</Link>
            <span className={'connection-status connection-' + connection} title="Go API 连接状态" aria-label={'Go API ' + (connection === 'online' ? '已连接' : connection === 'offline' ? '未连接' : '检测中')}>
              <ShieldCheck size={15} />{connection === 'online' ? 'API 在线' : connection === 'offline' ? 'API 离线' : '检测中'}
            </span>
            <span className="topbar-icon" aria-hidden="true"><Search size={17}/></span>
            <Link className="topbar-icon" to="/inbox" aria-label="信息收件箱"><Bell size={17}/></Link>
            <span className="preview-chip">M1 视觉基础</span>
          </div>
        </header>
        <main id="main-content" className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}

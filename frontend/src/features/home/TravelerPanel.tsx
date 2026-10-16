import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, BookOpenCheck, ChartNoAxesCombined, ChevronRight,
  Flame, Gift, ShieldCheck, Sparkles, Sun, Trophy, Zap,
  type LucideIcon,
} from 'lucide-react';
import { ProgressMeter } from '../../components/fantasy/ProgressMeter';
import { OrnateFrame } from '../../components/fantasy/OrnateFrame';

const stageLabels = ['规划', '执行', '复盘', '成长'] as const;

type Stat = { label: string; icon: LucideIcon; className: string };
const stats: Stat[] = [
  { label: '今日能量', icon: Zap, className: 'energy' },
  { label: '连续记录', icon: Flame, className: 'streak' },
  { label: '本周进度', icon: ChartNoAxesCombined, className: 'weekly' },
  { label: '成就徽章', icon: Trophy, className: 'achievement' },
];

/**
 * The character scene is ONE opaque RGB WebP derived from the user's original fantasy picture including its original background.
 * Never place an alpha-cutout traveler over a CSS illustration background.
 * No synthetic progress or experience values are represented as actual work.
 */
export function TravelerPanel() {
  const [artFailed, setArtFailed] = useState(false);
  return (
    <aside className="hero-summary hero-summary-v2 adventure-hero m16-traveler-panel" aria-label="旅行者成长面板">
      <div className="hero-identity hero-identity-art m16-hero-identity">
        <div className={'character-stage m16-character-scene' + (artFailed ? ' m16-scene-missing' : '')}>
          <div className="m16-scene-image-clip">
            {!artFailed && <img
              src="/art/backgrounds/traveler-original.webp"
              className="traveler-scene-image"
              alt="蓝色斗篷的旅行者与天空、魔法城堡组成的完整场景插画"
              draggable={false}
              onError={() => setArtFailed(true)}
            />}
          </div>
          <div className="m16-scene-heading">
            <Sun size={25} aria-hidden="true"/>
            <span><strong>你好，旅行者</strong><small>踏上今天的冒险旅程</small></span>
          </div>
          <div className="m16-scene-quote">工作是通往更大世界的修行。</div>
          {artFailed && <div className="m16-scene-error" role="alert">人物场景素材加载失败：traveler-original.webp</div>}
          <div className="m16-scene-corner top-left" aria-hidden="true"/>
          <div className="m16-scene-corner top-right" aria-hidden="true"/>
          <div className="m16-scene-corner bottom-left" aria-hidden="true"/>
          <div className="m16-scene-corner bottom-right" aria-hidden="true"/>
        </div>
        <div className="m16-level-row">
          <span className="m16-level-number">Lv. —</span>
          <span className="m16-level-meta">经验值尚未计算</span>
        </div>
        <ProgressMeter value={0} label="经验尚未计入，当前没有可计算进度" tone="blue"/>
      </div>

      <div className="hero-stat-grid m16-stat-grid" aria-label="成长指标暂未接入真实工作数据">
        {stats.map(({ label, icon: Icon, className }) =>
          <div key={label} className={'m16-stat m16-stat-' + className}>
            <span className="m16-stat-ring"><Icon size={23} strokeWidth={2.2} aria-hidden="true"/></span>
            <strong>—</strong>
            <span>{label}</span>
          </div>
        )}
      </div>

      <section className="quest-chain m16-quest-chain" aria-label="今日任务链示意">
        <div className="quest-chain-heading m16-chain-heading">
          <ShieldCheck size={17} aria-hidden="true"/>
          <strong>今日任务链 <small className="quest-demo-flag">演示流程</small></strong>
          <Link to="/tasks">查看全部 <ChevronRight size={13} aria-hidden="true"/></Link>
        </div>
        <div className="quest-chain-rail m16-chain-rail" aria-label="规划、执行、复盘、成长，均未计算状态">
          {stageLabels.map((step, index) =>
            <div key={step} className="quest-chain-step m16-chain-step">
              <span className="quest-chain-orb m16-chain-orb">{index + 1}</span>
              <small>{step}</small>
            </div>
          )}
          <Link className="quest-chain-reward m16-chain-reward" to="/growth" aria-label="查看成长奖励（尚未解锁）">
            <span className="m16-reward-chest"><Gift size={27} strokeWidth={1.8} aria-hidden="true"/></span>
            <small>奖励</small>
          </Link>
        </div>
        <div className="m16-chain-footnote"><Sparkles size={12} aria-hidden="true"/>真实记录确认后开启成长任务链</div>
      </section>
      <Link className="m16-companion-link" to="/growth"><BookOpenCheck size={14}/> 查看成长档案 <ArrowUpRight size={13}/></Link>
      <OrnateFrame variant="companion" />
    </aside>
  );
}

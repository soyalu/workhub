import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ListChecks } from 'lucide-react';
import { motion } from 'motion/react';
import { QuestParticleAura } from './QuestParticleAura';

/** Existing seven-landmark navigation is preserved, animated content only. */
export function AnimatedQuestLandmark({ enabled }: { enabled: boolean }) {
  const [active, setActive] = useState(false);
  return <Link to="/tasks"
    className={'map-node landmark landmark-quest point-tasks animated-quest-landmark' + (enabled ? ' effect-enabled' : '')}
    aria-label="今日主线任务：待完成的冒险"
    data-animation-enabled={String(enabled)}
    onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
    onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
    {enabled && <QuestParticleAura active={active}/>}
    <motion.span className="landmark-emblem" aria-hidden="true"
      animate={{ y: enabled && active ? -4 : 0, scale: enabled && active ? 1.09 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
      <ListChecks size={22} strokeWidth={1.8}/>
    </motion.span>
    <motion.span className="landmark-scroll"
      animate={{ x: enabled && active ? 4 : 0 }}
      transition={{ duration: .18 }}>
      <strong>今日主线任务</strong><small>待完成的冒险</small>
    </motion.span>
    <ChevronRight className="landmark-chevron" size={15} aria-hidden="true"/>
  </Link>;
}

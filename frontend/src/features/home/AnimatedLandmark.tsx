import { Link } from 'react-router-dom';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { OptionalArt } from './OptionalArt';

const ART_FILE = {
  quest:'main-quest-gold.webp',
  project:'project-blue.webp',
  message:'inbox-red.webp',
  capture:'capture-purple.webp',
  calendar:'calendar-orange.webp',
  side:'side-quest-amber.webp',
  growth:'growth-cyan.webp',
} as const;

export type LandmarkTheme = 'quest' | 'project' | 'message' | 'calendar' | 'capture' | 'side' | 'growth';

export interface AnimatedLandmarkProps {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
  location: string;
  theme: LandmarkTheme;
  enabled: boolean;
  active: boolean;
  onActivate: (theme: LandmarkTheme) => void;
  onDeactivate: (theme: LandmarkTheme) => void;
}

/** Semantic React link; the Pixi overlay never performs navigation or hit-testing. */
export function AnimatedLandmark({
  label, description, to, icon: Icon, location, theme,
  enabled, active, onActivate, onDeactivate,
}: AnimatedLandmarkProps) {
  return (
    <Link to={to}
      className={
        'map-node landmark landmark-' + theme + ' ' + location +
        ' animated-landmark' + (theme === 'quest' ? ' animated-quest-landmark' : '') +
        (enabled ? ' effect-enabled' : '')
      }
      aria-label={label + '：' + description}
      data-theme={theme}
      data-animation-enabled={String(enabled)}
      onMouseEnter={() => onActivate(theme)}
      onMouseLeave={() => onDeactivate(theme)}
      onFocus={() => onActivate(theme)}
      onBlur={() => onDeactivate(theme)}
    >
      {enabled && active && <motion.span className="landmark-aura-art" aria-hidden="true"
        initial={{opacity:0,scale:.92}}
        animate={{opacity:.5,scale:1.03,rotate:1}}
        exit={{opacity:0}}
        transition={{duration:.42}}>
        <OptionalArt src={'/art/effects/'+ART_FILE[theme]} fallback={null}/>
      </motion.span>}
      <motion.span className="landmark-emblem" aria-hidden="true"
        animate={{ y: enabled && active ? -4 : 0, scale: enabled && active ? 1.09 : 1 }}
        transition={enabled ? { type: 'spring', stiffness: 280, damping: 22 } : { duration: 0 }}>
        <Icon size={22} strokeWidth={1.8}/>
      </motion.span>
      <motion.span className="landmark-scroll"
        animate={{ x: enabled && active ? 4 : 0 }}
        transition={{ duration: enabled ? .18 : 0 }}>
        <strong>{label}</strong><small>{description}</small>
      </motion.span>
      <ChevronRight className="landmark-chevron" size={15} aria-hidden="true"/>
    </Link>
  );
}

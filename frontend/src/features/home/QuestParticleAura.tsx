import type { LandmarkTheme } from './AnimatedLandmark';
import { useEffect, useRef, useState } from 'react';

const TONE_COLORS = {
  quest: [0xfff4c9, 0xffca67],
  project: [0xe8f7ff, 0x4bafff],
  message: [0xffe6cc, 0xfa6478],
  calendar: [0xffebcd, 0xf39a5a],
  capture: [0xf4ddff, 0xb881fb],
  side: [0xfff0d3, 0xd1a16e],
  growth: [0xd7f7ff, 0x4ed8ee],
} as const;

/** PixiJS is loaded lazily and never controls navigation or hit testing. */
export function QuestParticleAura({ active, tone }: { active: boolean; tone: LandmarkTheme }) {
  const host = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(active);
  const [fallback, setFallback] = useState(false);
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let cancelled = false;
    let app: import('pixi.js').Application | undefined;
    let intersection: IntersectionObserver | undefined;
    let disposeVisibility: (() => void) | undefined;

    const init = async () => {
      let initializing: import('pixi.js').Application | undefined;
      try {
        const { Application, Graphics } = await import('pixi.js');
        if (cancelled) return;
        const instance = new Application();
        initializing = instance;
        await instance.init({
          preference: 'webgl', width: 190, height: 116,
          backgroundAlpha: 0, antialias: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2), autoDensity: true,
        });
        if (cancelled) {
          instance.destroy(true, { children: true });
          return;
        }
        app = instance;
        const canvas = instance.canvas;
        canvas.dataset.renderer = 'pixi';
        canvas.setAttribute('aria-hidden', 'true');
        container.appendChild(canvas);
        const mobile = matchMedia('(max-width: 900px)').matches;
        const count = mobile ? 8 : 16;
        const glints = Array.from({ length: count }, (_, index) => {
          const radius = 1.1 + (index % 4) * .48;
          const shape = new Graphics().circle(0, 0, radius).fill({
            color: index % 4 === 0 ? TONE_COLORS[tone][0] : TONE_COLORS[tone][1],
          });
          instance.stage.addChild(shape);
          return { shape, radius: 20 + (index % 6) * 5, angle: index * 2.39996, speed: .22 + (index % 5) * .04 };
        });
        let time = 0;
        const tick = (ticker: { deltaMS: number }) => {
          time += Math.min(ticker.deltaMS, 50) * .001;
          const boost = activeRef.current ? 1.8 : 1;
          for (const glint of glints) {
            const theta = glint.angle + time * glint.speed * boost;
            glint.shape.x = 48 + Math.cos(theta) * glint.radius;
            glint.shape.y = 59 + Math.sin(theta) * glint.radius * .7;
            glint.shape.alpha = (activeRef.current ? .68 : .35) + .18 * Math.sin(theta * 3);
            glint.shape.scale.set(activeRef.current ? 1.2 : 1);
          }
        };
        instance.ticker.add(tick);
        let visible = true;
        const sync = () => {
          if (!app || cancelled) return;
          if (!visible || document.hidden) app.stop();
          else app.start();
        };
        document.addEventListener('visibilitychange', sync);
        disposeVisibility = () => document.removeEventListener('visibilitychange', sync);
        intersection = new IntersectionObserver((entries) => {
          visible = Boolean(entries[0]?.isIntersecting);
          sync();
        }, { threshold: .01 });
        intersection.observe(container);
      } catch {
        if (!cancelled) setFallback(true);
        if (initializing && !app) {
          try { initializing.destroy(true, { children: true }); } catch { /* partial init */ }
        }
      }
    };
    void init();
    return () => {
      cancelled = true;
      disposeVisibility?.();
      intersection?.disconnect();
      if (app) app.destroy(true, { children: true });
    };
  }, []);

  return <span ref={host}
    className={'quest-particle-aura' + (fallback ? ' is-canvas-fallback' : '')}
    data-tone={tone}
    data-effect-state={fallback ? 'fallback' : 'enabled'}
    aria-hidden="true"/>;
}

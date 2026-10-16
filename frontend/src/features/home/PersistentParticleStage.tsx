import { useEffect, useRef, useState } from 'react';
import type { LandmarkTheme } from './AnimatedLandmark';

const COLORS: Record<LandmarkTheme, readonly [number, number]> = {
  quest: [0xfff6c9,0xffc768],
  project: [0xe1f5ff,0x4cafff],
  message: [0xffe6ce,0xfc6b7a],
  calendar: [0xffe8cc,0xff9c68],
  capture: [0xf5deff,0xb98bff],
  side: [0xfff0d9,0xdca865],
  growth: [0xd8faff,0x52d9f1],
};

/**
 * A single, persistent Pixi Application per mounted map.
 * Changing the landmark only changes the tint and particle origin.
 * React owns every real clickable landmark, this Canvas is decoration only.
 */
export function PersistentParticleStage({ tone, boosted }: {
  tone: LandmarkTheme; boosted: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const config = useRef({ tone, boosted });
  const [failed, setFailed] = useState(false);

  useEffect(() => { config.current = { tone, boosted }; }, [tone, boosted]);

  useEffect(() => {
    const element = host.current;
    const map = element?.closest('.adventure-map');
    if (!element || !map) return;
    let disposed = false;
    let app: import('pixi.js').Application | undefined;
    let resize: ResizeObserver | undefined;
    let intersection: IntersectionObserver | undefined;
    let clearVisibility: (() => void) | undefined;

    void (async () => {
      let initializing: import('pixi.js').Application | undefined;
      try {
        const { Application, Graphics } = await import('pixi.js');
        if (disposed) return;
        const instance = new Application();
        initializing = instance;
        await instance.init({
          preference: 'webgl',
          width: Math.max(1, Math.round(map.clientWidth)),
          height: Math.max(1, Math.round(map.clientHeight)),
          backgroundAlpha: 0,
          antialias: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
        });
        if (disposed) { instance.destroy(true,{children:true}); return; }
        app = instance;
        instance.canvas.setAttribute('aria-hidden','true');
        instance.canvas.dataset.renderer = 'pixi';
        instance.canvas.dataset.persistent = 'true';
        element.appendChild(instance.canvas);

        const count = window.matchMedia('(max-width: 900px)').matches ? 8 : 16;
        const particles = Array.from({length: count}, (_,i) => {
          const graphic = new Graphics().circle(0,0,1.2+(i%4)*0.48).fill(0xffffff);
          graphic.tint = COLORS[config.current.tone][i%4===0 ? 0 : 1];
          instance.stage.addChild(graphic);
          return { graphic, phase:(i*2.3999632)%(2*Math.PI), radius:20+(i%7)*5, speed:.19+(i%4)*.035 };
        });
        let time = 0;
        let visible = true;
        const update = (ticker:{deltaMS:number}) => {
          time += Math.min(ticker.deltaMS,50)*.001;
          const current = config.current;
          const active = map.querySelector<HTMLElement>('.animated-landmark[data-theme="' + current.tone + '"]');
          const rect = active?.getBoundingClientRect();
          const mapRect = map.getBoundingClientRect();
          const x = rect ? rect.left-mapRect.left+Math.min(rect.width*.25,50) : mapRect.width*.2;
          const y = rect ? rect.top-mapRect.top+rect.height/2 : mapRect.height*.4;
          for (let i=0;i<particles.length;i++) {
            const {graphic,phase,radius,speed} = particles[i];
            const angle = phase+time*speed*(current.boosted?1.8:1);
            graphic.x=x+Math.cos(angle)*radius;
            graphic.y=y+Math.sin(angle)*radius*.72;
            graphic.alpha=(current.boosted?.66:.32)+.16*(.5+.5*Math.sin(angle*3));
            graphic.tint=COLORS[current.tone][i%4===0?0:1];
            graphic.scale.set(current.boosted?1.17:1);
          }
        };
        instance.ticker.add(update);
        const sync=()=>{
          if (!app || disposed) return;
          if (!visible || document.hidden) app.stop();
          else app.start();
        };
        document.addEventListener('visibilitychange',sync);
        clearVisibility=()=>document.removeEventListener('visibilitychange',sync);
        intersection=new IntersectionObserver(entries=>{
          visible=entries[0]?.isIntersecting??false; sync();
        },{threshold:.01});
        intersection.observe(map);
        resize=new ResizeObserver(()=>{
          if (!app || disposed) return;
          app.renderer.resize(Math.max(1,Math.round(map.clientWidth)),
            Math.max(1,Math.round(map.clientHeight)));
        });
        resize.observe(map);
      } catch {
        if (!disposed) setFailed(true);
        if (initializing && !app) {
          try { initializing.destroy(true,{children:true}); } catch { /* initialization aborted */ }
        }
      }
    })();

    return ()=>{
      disposed=true;
      clearVisibility?.();
      intersection?.disconnect();
      resize?.disconnect();
      if (app) app.destroy(true,{children:true});
    };
  }, []);

  return <div ref={host}
    className={'quest-particle-aura persistent-particle-stage' + (failed?' is-canvas-fallback':'')}
    aria-hidden="true" data-tone={tone}
    data-effect-state={failed?'fallback':'enabled'}
    data-stage-lifecycle="persistent"/>;
}

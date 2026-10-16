import type { CSSProperties } from 'react';
import type { LandmarkTheme } from './AnimatedLandmark';

/**
 * M1.7 calibrated against the supplied full-map reference (1686 x 895).
 * Map coordinates are percentages of the scene, NOT absolute desktop pixels.
 * Sprite/text bounds use the visual dark banner of 510 x 325 combined WebPs:
 * transparent particle halos are intentionally excluded from the text safe zone.
 *
 * The art layer is a SINGLE combined picture so crest/banner never drift apart.
 * Per-landmark geometry is separated from shared motion/navigation behavior.
 */
export interface LandmarkGeometry {
  x: number; y: number; // map anchor in scene percentages
  artWidth: number; artHeight: number;
  artLeft: number; artTop: number;
  textLeft: number; textTop: number; textWidth: number; textHeight: number;
}
export const LANDMARK_GEOMETRY: Record<LandmarkTheme, LandmarkGeometry> = {
  quest:   {x:21.1,y:46.8,artWidth:218,artHeight:140,artLeft:-9,artTop:-33,textLeft:111,textTop:22,textWidth:84,textHeight:40},
  project: {x:52.8,y:29.7,artWidth:219,artHeight:140,artLeft:-9,artTop:-33,textLeft:112,textTop:22,textWidth:83,textHeight:40},
  message: {x:83.0,y:32.0,artWidth:218,artHeight:140,artLeft:-9,artTop:-33,textLeft:112,textTop:22,textWidth:83,textHeight:40},
  capture: {x:65.1,y:57.2,artWidth:219,artHeight:140,artLeft:-9,artTop:-33,textLeft:113,textTop:22,textWidth:83,textHeight:40},
  calendar:{x:46.6,y:78.7,artWidth:217,artHeight:140,artLeft:-9,artTop:-33,textLeft:110,textTop:22,textWidth:85,textHeight:40},
  side:    {x:21.1,y:79.4,artWidth:218,artHeight:140,artLeft:-9,artTop:-33,textLeft:113,textTop:22,textWidth:83,textHeight:40},
  growth:  {x:83.4,y:78.9,artWidth:219,artHeight:140,artLeft:-9,artTop:-33,textLeft:113,textTop:22,textWidth:84,textHeight:40},
};

type LandmarkStyle = CSSProperties & {
  '--lm-x': string; '--lm-y': string;
  '--lm-art-width': string; '--lm-art-height': string;
  '--lm-art-left': string; '--lm-art-top': string;
  '--lm-text-left': string; '--lm-text-top': string;
  '--lm-text-width': string; '--lm-text-height': string;
};

export function landmarkStyle(theme: LandmarkTheme): LandmarkStyle {
  const p = LANDMARK_GEOMETRY[theme];
  return {
    '--lm-x': p.x + '%', '--lm-y': p.y + '%',
    '--lm-art-width': p.artWidth + 'px', '--lm-art-height': p.artHeight + 'px',
    '--lm-art-left': p.artLeft + 'px', '--lm-art-top': p.artTop + 'px',
    '--lm-text-left': p.textLeft + 'px', '--lm-text-top': p.textTop + 'px',
    '--lm-text-width': p.textWidth + 'px', '--lm-text-height': p.textHeight + 'px',
  };
}

import { useReducedMotion } from 'framer-motion';
import Sky from './layers/Sky';
import Mountains from './layers/Mountains';
import Clouds from './layers/Clouds';
import GroundScene from './layers/GroundScene';
import { getCameraPosition } from '../utils/cameraPath';
import { getTimeOfDayStyles, getTimeOfDayLabel } from '../utils/timeOfDay';

// Full-bleed garden viewport. `progress` (0–1, from useScrollProgress)
// drives two things:
//  1. a virtual "camera" that pans across the 1440x820 scene (Phase 04)
//  2. the full time-of-day look — sky, sun/moon, stars, fireflies, and a
//     single cinematic color-grade overlay that tints the whole scene
//     (Phase 05), instead of manually recoloring every ground/mountain
//     element by hand.
//
// Phase 11: when the visitor has prefers-reduced-motion set, the camera
// pan is switched off entirely (offsets pinned to 0) — the layers hold
// still. The time-of-day color grading keeps working, since a gradual
// color shift isn't the kind of motion that rule is meant to suppress,
// and losing the whole signature feature would be a worse trade-off.
export default function GardenScene({ progress = 0 }) {
  const reduceMotion = useReducedMotion();
  const camera = getCameraPosition(progress);
  const tod = getTimeOfDayStyles(progress);
  const centerX = 720;
  const centerY = 500;
  const offsetX = reduceMotion ? 0 : camera.x - centerX;
  const offsetY = reduceMotion ? 0 : camera.y - centerY;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={`Illustrated garden scene representing the developer's journey — currently ${getTimeOfDayLabel(progress)}`}
      >
        <g style={{ transform: `translate(${offsetX * 0.05}px, ${offsetY * 0.05}px)` }}>
          <Sky tod={tod} />
        </g>
        <g style={{ transform: `translate(${offsetX * 0.15}px, ${offsetY * 0.1}px)` }}>
          <Mountains />
        </g>
        <g style={{ transform: `translate(${offsetX * 0.25}px, ${offsetY * 0.15}px)` }}>
          <Clouds opacity={tod.clouds.opacity} />
        </g>
        <g style={{ transform: `translate(${-offsetX * 0.6}px, ${-offsetY * 0.6}px)` }}>
          <GroundScene tod={tod} />
        </g>

        {/* Cinematic color-grade overlay — this single full-scene layer is
            what actually "recolors" the mountains/ground/trees for each
            time of day, instead of hand-tuning every element's palette
            individually. mix-blend-mode: overlay keeps midtones/contrast
            intact instead of just washing everything with flat color. */}
        <rect
          x="0"
          y="0"
          width="1440"
          height="820"
          fill={tod.ambient.color}
          opacity={tod.ambient.opacity}
          style={{ mixBlendMode: 'overlay' }}
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Sky from './layers/Sky';
import Mountains from './layers/Mountains';
import Clouds from './layers/Clouds';
import GroundScene from './layers/GroundScene';
import { getCameraPosition } from '../utils/cameraPath';
import { getTimeOfDayStyles, getTimeOfDayLabel, getSunSafeApexY } from '../utils/timeOfDay';

const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 820;
const VIEWBOX_ASPECT = VIEWBOX_WIDTH / VIEWBOX_HEIGHT;

// Tracks the browser window's own size so two things can react to the
// actual device shape instead of a guessed constant:
//  1. the sun's arc apex — kept inside whatever the current
//     preserveAspectRatio crop is, so it's never clipped.
//  2. preserveAspectRatio itself (see below) — on a portrait phone this
//     whole 1440x820 landscape scene is far wider than the screen, so we
//     switch modes rather than crop away the sun and most of the
//     mountains.
// Recomputes on resize (debounced via rAF) so rotating a device or
// resizing a window doesn't leave a stale layout.
function useViewportSize() {
  const [size, setSize] = useState(() =>
    typeof window === 'undefined'
      ? { width: 0, height: 0 }
      : { width: window.innerWidth, height: window.innerHeight }
  );

  useEffect(() => {
    let frame = null;
    const recompute = () => {
      frame = null;
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const onResize = () => {
      if (frame === null) frame = requestAnimationFrame(recompute);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return size;
}

// Full-bleed garden viewport. `progress` (0–1, from useScrollProgress)
// drives two things:
//  1. a virtual "camera" that pans across the 1440x820 scene (Phase 04)
//  2. the full time-of-day look — sky, sun/moon, stars, fireflies, and a
//     single cinematic color-grade overlay that tints the whole scene
//     (Phase 05), instead of manually recoloring every ground/mountain
//     element by hand.
//
// Phase 11 (responsive): the scene is authored as one wide 1440x820
// landscape. On a normal wide window that's cropped top/bottom to fill
// the screen ("slice") — the horizontal composition (sun's rise-to-set
// arc, both mountain ridges) always survives that. On a portrait phone,
// though, the window is far *narrower* than 1440x820's own shape, and
// "slice" would crop the width instead — losing the sun and most of the
// mountains off one side or both, not just trimming empty margin. So on
// narrower-than-the-scene windows we switch to "meet": the full width
// (and everything on it) stays visible, letterboxed top/bottom instead —
// which reads as an intentional cinematic frame rather than a broken
// crop, and fits the site's own "developer's journey" visual language.
//
// Also: when the visitor has prefers-reduced-motion set, the camera pan
// is switched off entirely (offsets pinned to 0) — the layers hold still.
// The time-of-day color grading keeps working, since a gradual color
// shift isn't the kind of motion that rule is meant to suppress, and
// losing the whole signature feature would be a worse trade-off.
export default function GardenScene({ progress = 0 }) {
  const reduceMotion = useReducedMotion();
  const { width, height } = useViewportSize();
  const isPortraitShape = width > 0 && height > 0 && width / height < VIEWBOX_ASPECT;
  const sunApexY = getSunSafeApexY(width, height);
  const camera = getCameraPosition(progress);
  const tod = getTimeOfDayStyles(progress, { sunApexY });
  const centerX = 720;
  const centerY = 500;
  const offsetX = reduceMotion ? 0 : camera.x - centerX;
  const offsetY = reduceMotion ? 0 : camera.y - centerY;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio={isPortraitShape ? 'xMidYMid meet' : 'xMidYMid slice'}
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
            intact instead of just washing everything with flat color.
            Sized to the same extended bounds as Sky/Mountains' fills (not
            just the nominal 1440x820 viewBox) so the tint still reaches
            the letterbox-fill area on a portrait phone — otherwise that
            strip would sit at its untinted daytime color through sunset
            and night, a visible seam right where the "meet" gap begins. */}
        <rect
          x="-200"
          y="-1200"
          width="1840"
          height="3400"
          fill={tod.ambient.color}
          opacity={tod.ambient.opacity}
          style={{ mixBlendMode: 'overlay' }}
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}
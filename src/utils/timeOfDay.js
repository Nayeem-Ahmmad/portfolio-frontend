// Time-of-day interpolation engine — Phase 05.
//
// getTimeOfDayStyles(progress) takes the same 0–1 scroll journey value
// used for camera panning (see useScrollProgress + cameraPath) and returns
// every visual value the garden needs for that instant: sky gradient, sun
// and moon position/opacity, star and firefly visibility, cloud opacity,
// a single ambient color-grade tint, window-glow strength, and a rough
// "shadow length" factor.
//
// Design note: rather than hand-authoring a palette for every ground/tree/
// mountain color at every time of day, the ground layers keep their base
// (Phase 03) colors and get recolored by one shared `ambient` overlay tint
// — the same trick film uses for day/night color grading. Only the sky
// layer (which actually contains the sun/moon) is fully recomputed.
//
// The five named periods below are anchored at the ranges' midpoints, with
// flat "hold" points at 0 (start of morning) and 1 (deepest night) so nothing
// snaps at the 20/45/65/80% boundaries — the crossfade between two periods
// happens smoothly around each boundary instead of exactly on it.

export const TIME_OF_DAY_RANGES = {
  morning: [0, 0.2],
  day: [0.2, 0.45],
  afternoon: [0.45, 0.65],
  sunset: [0.65, 0.8],
  night: [0.8, 1],
};

const MORNING = {
  skyTop: '#2b3a67',
  skyMid: '#7d6b9e',
  skyBottom: '#f3b990',
  sunColor: '#ffe3ac',
  sunGlow: 'rgba(255,227,172,0.35)',
  sunCx: 1080,
  sunCy: 460,
  sunR: 58,
  sunOpacity: 1,
  moonCx: 200,
  moonCy: 700,
  moonR: 44,
  moonOpacity: 0,
  moonColor: '#f4f1e6',
  starsOpacity: 0,
  firefliesOpacity: 0,
  cloudOpacity: 0.9,
  ambientColor: '#ffd9b3',
  ambientOpacity: 0.1,
  windowGlowOpacity: 0.3,
  shadowLength: 0.7,
};

const DAY = {
  skyTop: '#3f7fd9',
  skyMid: '#7fc4ef',
  skyBottom: '#eaf6ff',
  sunColor: '#fff6d8',
  sunGlow: 'rgba(255,246,216,0.4)',
  sunCx: 760,
  sunCy: 140,
  sunR: 62,
  sunOpacity: 1,
  moonCx: 200,
  moonCy: 700,
  moonR: 44,
  moonOpacity: 0,
  moonColor: '#f4f1e6',
  starsOpacity: 0,
  firefliesOpacity: 0,
  cloudOpacity: 1,
  ambientColor: '#ffffff',
  ambientOpacity: 0,
  windowGlowOpacity: 0,
  shadowLength: 0.15,
};

const AFTERNOON = {
  skyTop: '#5f8fc9',
  skyMid: '#e3b787',
  skyBottom: '#ffd9a0',
  sunColor: '#ffdca0',
  sunGlow: 'rgba(255,220,160,0.45)',
  sunCx: 480,
  sunCy: 260,
  sunR: 66,
  sunOpacity: 1,
  moonCx: 220,
  moonCy: 680,
  moonR: 44,
  moonOpacity: 0,
  moonColor: '#f4f1e6',
  starsOpacity: 0,
  firefliesOpacity: 0,
  cloudOpacity: 0.85,
  ambientColor: '#ffbf7a',
  ambientOpacity: 0.14,
  windowGlowOpacity: 0.15,
  shadowLength: 0.45,
};

const SUNSET = {
  skyTop: '#3c2f5e',
  skyMid: '#c9536b',
  skyBottom: '#ffab6b',
  sunColor: '#ff9d5c',
  sunGlow: 'rgba(255,157,92,0.5)',
  sunCx: 260,
  sunCy: 470,
  sunR: 72,
  sunOpacity: 1,
  moonCx: 300,
  moonCy: 160,
  moonR: 40,
  moonOpacity: 0.15,
  moonColor: '#f4f1e6',
  starsOpacity: 0.15,
  firefliesOpacity: 0.2,
  cloudOpacity: 0.6,
  ambientColor: '#ff7a45',
  ambientOpacity: 0.22,
  windowGlowOpacity: 0.6,
  shadowLength: 0.9,
};

const NIGHT = {
  skyTop: '#050a1a',
  skyMid: '#0d1830',
  skyBottom: '#16233f',
  sunColor: '#ff9d5c',
  sunGlow: 'rgba(255,157,92,0)',
  sunCx: 80,
  sunCy: 600,
  sunR: 60,
  sunOpacity: 0,
  moonCx: 220,
  moonCy: 130,
  moonR: 46,
  moonOpacity: 0.95,
  moonColor: '#f4f1e6',
  starsOpacity: 0.9,
  firefliesOpacity: 0.85,
  cloudOpacity: 0.25,
  ambientColor: '#0b1330',
  ambientOpacity: 0.35,
  windowGlowOpacity: 1,
  shadowLength: 0.3,
};

const NIGHT_DEEP = {
  skyTop: '#03060f',
  skyMid: '#0a1226',
  skyBottom: '#111d38',
  sunColor: '#ff9d5c',
  sunGlow: 'rgba(255,157,92,0)',
  sunCx: 60,
  sunCy: 610,
  sunR: 60,
  sunOpacity: 0,
  moonCx: 200,
  moonCy: 110,
  moonR: 46,
  moonOpacity: 1,
  moonColor: '#f4f1e6',
  starsOpacity: 1,
  firefliesOpacity: 1,
  cloudOpacity: 0.15,
  ambientColor: '#080f24',
  ambientOpacity: 0.4,
  windowGlowOpacity: 1,
  shadowLength: 0.2,
};

// t = 0.1 / 0.325 / 0.55 / 0.725 / 0.9 are the midpoints of the morning/
// day/afternoon/sunset/night ranges above; t = 0 and t = 1 are flat holds
// at the very start and very end of the journey.
const KEYFRAMES = [
  { t: 0, v: MORNING },
  { t: 0.1, v: MORNING },
  { t: 0.325, v: DAY },
  { t: 0.55, v: AFTERNOON },
  { t: 0.725, v: SUNSET },
  { t: 0.9, v: NIGHT },
  { t: 1, v: NIGHT_DEEP },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Accepts '#rrggbb' or 'rgba(r,g,b,a)' / 'rgb(r,g,b)'.
function parseColor(str) {
  if (str[0] === '#') {
    const hex = str.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }
  const nums = str
    .slice(str.indexOf('(') + 1, str.indexOf(')'))
    .split(',')
    .map((n) => parseFloat(n.trim()));
  const [r, g, b, a = 1] = nums;
  return { r, g, b, a };
}

function lerpColor(c1, c2, t) {
  const a = parseColor(c1);
  const b = parseColor(c2);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));
  const al = +lerp(a.a, b.a, t).toFixed(3);
  return `rgba(${r}, ${g}, ${bl}, ${al})`;
}

/**
 * Returns every time-of-day-dependent visual value for a given scroll
 * progress (0–1). Shape:
 * {
 *   sky: { top, mid, bottom },
 *   sun: { cx, cy, r, opacity, color, glow },
 *   moon: { cx, cy, r, opacity, color },
 *   stars: { opacity },
 *   fireflies: { opacity },
 *   clouds: { opacity },
 *   ambient: { color, opacity },   // scene-wide color-grade tint
 *   windowGlow: { opacity },       // house window brightness
 *   shadow: { length },            // 0–1 factor for shadow elongation
 * }
 */
export function getTimeOfDayStyles(progress) {
  const p = Math.min(Math.max(progress, 0), 1);

  let lo = KEYFRAMES[0];
  let hi = KEYFRAMES[KEYFRAMES.length - 1];
  for (let i = 0; i < KEYFRAMES.length - 1; i += 1) {
    if (p >= KEYFRAMES[i].t && p <= KEYFRAMES[i + 1].t) {
      lo = KEYFRAMES[i];
      hi = KEYFRAMES[i + 1];
      break;
    }
  }

  const span = hi.t - lo.t || 1;
  const t = (p - lo.t) / span;
  const a = lo.v;
  const b = hi.v;

  return {
    sky: {
      top: lerpColor(a.skyTop, b.skyTop, t),
      mid: lerpColor(a.skyMid, b.skyMid, t),
      bottom: lerpColor(a.skyBottom, b.skyBottom, t),
    },
    sun: {
      cx: lerp(a.sunCx, b.sunCx, t),
      cy: lerp(a.sunCy, b.sunCy, t),
      r: lerp(a.sunR, b.sunR, t),
      opacity: lerp(a.sunOpacity, b.sunOpacity, t),
      color: lerpColor(a.sunColor, b.sunColor, t),
      glow: lerpColor(a.sunGlow, b.sunGlow, t),
    },
    moon: {
      cx: lerp(a.moonCx, b.moonCx, t),
      cy: lerp(a.moonCy, b.moonCy, t),
      r: lerp(a.moonR, b.moonR, t),
      opacity: lerp(a.moonOpacity, b.moonOpacity, t),
      color: lerpColor(a.moonColor, b.moonColor, t),
    },
    stars: { opacity: lerp(a.starsOpacity, b.starsOpacity, t) },
    fireflies: { opacity: lerp(a.firefliesOpacity, b.firefliesOpacity, t) },
    clouds: { opacity: lerp(a.cloudOpacity, b.cloudOpacity, t) },
    ambient: {
      color: lerpColor(a.ambientColor, b.ambientColor, t),
      opacity: lerp(a.ambientOpacity, b.ambientOpacity, t),
    },
    windowGlow: { opacity: lerp(a.windowGlowOpacity, b.windowGlowOpacity, t) },
    shadow: { length: lerp(a.shadowLength, b.shadowLength, t) },
  };
}

// Human-readable current period, e.g. for the SVG's aria-label so screen
// reader users get the "morning → night" journey too, not just sighted
// visitors. (The on-screen "DAY 02 — LEARNING" style indicator from the
// brief is a Phase 06 content concern, not built here.)
export function getTimeOfDayLabel(progress) {
  const p = Math.min(Math.max(progress, 0), 1);
  const entry = Object.entries(TIME_OF_DAY_RANGES).find(
    ([, [start, end]]) => p >= start && p <= end
  );
  const key = entry ? entry[0] : 'night';
  return key.charAt(0).toUpperCase() + key.slice(1);
}
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

// Note: each period below still carries its own sunCx/sunCy, but those are
// no longer used for the sun's position — getSunArcPosition() drives cx/cy
// continuously now (see below). Left in place because sunR/sunOpacity/
// sunColor/sunGlow on these same objects are still read per-period as before.

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
  // Nudged right from the original 300 so the moon's rightward drift
  // through sunset → night → deep night stays smooth (300 → 420 → 460)
  // instead of holding here then jumping at the night keyframes below.
  moonCx: 380,
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
  // Moved from 220 to clear the top-left corner: from Experience through
  // Contact the navbar/dots flip to that same corner (see App.jsx's
  // FLIPPED_LAYOUT_IDS), and this is one of the two keyframes actually
  // visible while that's on screen — the old value sat right underneath
  // the navbar text/button.
  moonCx: 420,
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
  // Same fix as NIGHT above, and the more important of the two — this is
  // the state actually on screen once scrolled all the way to Contact,
  // where the flipped navbar/dots corner overlap was reported.
  moonCx: 460,
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

// Sun arc — Phase 05 revision.
//
// The sun used to just teleport between five hand-placed (cx, cy) points,
// one per time-of-day period. That made it pop in already high in the sky
// the instant the page loaded, instead of actually rising.
//
// This instead drives the sun along one continuous half-circle: it comes
// up barely visible at the right edge, arcs smoothly up to its highest
// point overhead, then comes back down and tucks out of sight past the
// left edge — like a real sunrise-to-sunset sweep, driven by scroll.
//
// theta runs 0 → π over SUN_ARC_START..SUN_ARC_END of the scroll journey:
//   theta = 0   → sunrise, right edge, low (near the mountain line)
//   theta = π/2 → solar noon, dead center, near the top of the sky
//   theta = π   → sunset, left edge, low again, then fades into night
// cos(theta) drives left↔right, sin(theta) drives the up-arch.
const SUN_ARC_START = 0;
const SUN_ARC_END = 0.85; // matches the sunset → night fade window below
const SUN_RIGHT_X = 1460; // mostly off the right edge — only a sliver shows at t=0
const SUN_LEFT_X = -60; // mostly off the left edge — matches the "hides at the left corner" ask
const SUN_HORIZON_Y = 380; // just above the mountain ridge line, not behind it

// The apex (top of the arc) can't be a single fixed number — how high the
// sun can safely go depends on the actual browser window's shape, because
// the SVG uses preserveAspectRatio="xMidYMid slice": on a short/wide
// window the slice crops some viewBox units off the very top before the
// visitor ever sees them, and any apex sitting inside that crop band rides
// off-screen. A static guess either clips on some windows (too high) or
// looks flat/unrealistic on the rest (too conservative) — which is exactly
// the back-and-forth this went through. So instead GardenScene measures
// the real crop for the current window (getSunSafeApexY, below) and passes
// that in every render; these two constants are just the bounds:
const SUN_APEX_Y_DEEPEST = 120; // best case (little/no crop): a proper, full arc
const SUN_APEX_Y_FALLBACK = 320; // used only before the real window size is known

// Given the current viewport size, returns the lowest (safest) apex y that
// still guarantees the sun's full disc stays inside the visible slice —
// clamped so it never goes deeper than SUN_APEX_Y_DEEPEST even when the
// window is tall enough to afford more, and never shallower than
// SUN_APEX_Y_FALLBACK's general neighborhood on extreme windows.
export function getSunSafeApexY(viewportWidth, viewportHeight) {
  if (!viewportWidth || !viewportHeight) return SUN_APEX_Y_FALLBACK;
  const viewBoxAspect = 1440 / 820;
  const windowAspect = viewportWidth / viewportHeight;

  let cropTop = 0;
  if (windowAspect > viewBoxAspect) {
    // Window is wider (relative to height) than the viewBox — "slice"
    // scales to cover width, which makes the viewBox taller than the
    // window, and crops the overflow evenly off the top and bottom.
    const scale = viewportWidth / 1440;
    const visibleViewBoxHeight = viewportHeight / scale;
    cropTop = Math.max(0, (820 - visibleViewBoxHeight) / 2);
  }

  const MAX_SUN_RADIUS = 72; // largest sunR used across the time-of-day keyframes
  const SAFE_MARGIN = 24; // a little breathing room past the sun's own edge
  const safeApex = cropTop + MAX_SUN_RADIUS + SAFE_MARGIN;

  return Math.min(Math.max(safeApex, SUN_APEX_Y_DEEPEST), SUN_APEX_Y_FALLBACK);
}

function getSunArcPosition(progress, apexY = SUN_APEX_Y_FALLBACK) {
  const span = SUN_ARC_END - SUN_ARC_START;
  const clamped = Math.min(Math.max(progress, SUN_ARC_START), SUN_ARC_END);
  const theta = ((clamped - SUN_ARC_START) / span) * Math.PI;

  const midX = (SUN_RIGHT_X + SUN_LEFT_X) / 2;
  const ampX = (SUN_RIGHT_X - SUN_LEFT_X) / 2;
  const ampY = SUN_HORIZON_Y - apexY;

  return {
    cx: midX + ampX * Math.cos(theta),
    cy: SUN_HORIZON_Y - ampY * Math.sin(theta),
  };
}

// Extra fade-in so the very start of the journey reads as "barely
// visible, emerging" rather than snapping straight to full brightness —
// on top of the sun already being mostly clipped off the right edge at
// that point.
function getSunRiseFade(progress) {
  const FADE_END = 0.06;
  if (progress >= FADE_END) return 1;
  return lerp(0.35, 1, Math.max(progress, 0) / FADE_END);
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
export function getTimeOfDayStyles(progress, options = {}) {
  const p = Math.min(Math.max(progress, 0), 1);
  const sunApexY = options.sunApexY ?? SUN_APEX_Y_FALLBACK;

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

  const sunArc = getSunArcPosition(p, sunApexY);

  return {
    sky: {
      top: lerpColor(a.skyTop, b.skyTop, t),
      mid: lerpColor(a.skyMid, b.skyMid, t),
      bottom: lerpColor(a.skyBottom, b.skyBottom, t),
    },
    sun: {
      cx: sunArc.cx,
      cy: sunArc.cy,
      r: lerp(a.sunR, b.sunR, t),
      opacity: lerp(a.sunOpacity, b.sunOpacity, t) * getSunRiseFade(p),
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
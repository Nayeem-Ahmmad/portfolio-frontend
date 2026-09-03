// Deepest garden layer: sky gradient, sun, moon, and stars.
// All values here are pre-interpolated by utils/timeOfDay.js from scroll
// progress and passed in as `tod` (see GardenScene) — this component just
// renders them, it does no time-of-day math itself.
const STAR_POSITIONS = [
  { x: 120, y: 80, r: 1.6 },
  { x: 260, y: 150, r: 1.2 },
  { x: 340, y: 60, r: 1.8 },
  { x: 480, y: 110, r: 1.3 },
  { x: 600, y: 40, r: 1.5 },
  { x: 700, y: 180, r: 1.1 },
  { x: 850, y: 70, r: 1.7 },
  { x: 950, y: 130, r: 1.2 },
  { x: 1080, y: 50, r: 1.4 },
  { x: 1200, y: 100, r: 1.6 },
  { x: 1320, y: 60, r: 1.2 },
  { x: 60, y: 200, r: 1.3 },
  { x: 400, y: 220, r: 1.1 },
  { x: 780, y: 230, r: 1.3 },
  { x: 1150, y: 210, r: 1.2 },
];

export default function Sky({ tod }) {
  return (
    <g>
      <defs>
        {/* userSpaceOnUse + a fixed y1/y2 keeps the color transition
            anchored to the original y=0..820 composition regardless of
            how far the rect itself gets extended below (see the rect
            below) — with the default "pad" spread, anything drawn above
            y=0 or below y=820 just holds the nearest stop's flat color
            instead of the whole gradient re-stretching across the larger
            box, which is what objectBoundingBox units would otherwise do. */}
        <linearGradient id="skyGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="820">
          <stop offset="0%" stopColor={tod.sky.top} />
          <stop offset="55%" stopColor={tod.sky.mid} />
          <stop offset="100%" stopColor={tod.sky.bottom} />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={tod.sun.glow} />
          <stop offset="100%" stopColor={tod.sun.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(244,241,230,0.3)" />
          <stop offset="100%" stopColor="rgba(244,241,230,0)" />
        </radialGradient>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Extended well past the 0–1440 x 0–820 viewBox on every side
          (same idea as Mountains' margin, just bigger). This one isn't
          only about the parallax shift anymore — on a portrait phone
          GardenScene switches to preserveAspectRatio="meet" so the sun
          and mountains don't get cropped off sideways, and "meet" leaves
          a gap above/below the artwork instead. Without this extension
          that gap rendered as flat black (the page background showing
          through); with it, the sky gradient just keeps going, so the
          whole screen reads as one continuous sky edge-to-edge. */}
      <rect x="-200" y="-1200" width="1840" height="3400" fill="url(#skyGradient)" />

      {/* Stars — only visible once the sky has darkened toward dusk/night.
          Each gets a soft glow halo behind it (same trick as the sun/moon)
          so they read as genuinely bright points of light. */}
      <g opacity={tod.stars.opacity}>
        {STAR_POSITIONS.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={s.r * 4} fill="url(#starGlow)" />
            <circle
              cx={s.x}
              cy={s.y}
              r={s.r * 1.3}
              fill="#ffffff"
              className="star-twinkle"
              style={{ animationDelay: `${(i % 5) * 0.6}s` }}
            />
          </g>
        ))}
      </g>

      {/* Moon, with two faint craters for a touch of texture */}
      <g opacity={tod.moon.opacity}>
        <circle cx={tod.moon.cx} cy={tod.moon.cy} r={tod.moon.r * 1.8} fill="url(#moonGlow)" />
        <circle cx={tod.moon.cx} cy={tod.moon.cy} r={tod.moon.r} fill={tod.moon.color} />
        <circle
          cx={tod.moon.cx - tod.moon.r * 0.3}
          cy={tod.moon.cy - tod.moon.r * 0.2}
          r={tod.moon.r * 0.18}
          fill="rgba(0,0,0,0.06)"
        />
        <circle
          cx={tod.moon.cx + tod.moon.r * 0.25}
          cy={tod.moon.cy + tod.moon.r * 0.3}
          r={tod.moon.r * 0.12}
          fill="rgba(0,0,0,0.06)"
        />
      </g>

      {/* Sun + soft glow halo */}
      <g opacity={tod.sun.opacity}>
        <circle cx={tod.sun.cx} cy={tod.sun.cy} r={tod.sun.r * 3.1} fill="url(#sunGlow)" />
        <circle cx={tod.sun.cx} cy={tod.sun.cy} r={tod.sun.r} fill={tod.sun.color} />
      </g>
    </g>
  );
}
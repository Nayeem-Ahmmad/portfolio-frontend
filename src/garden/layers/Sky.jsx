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
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
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
      </defs>

      <rect x="0" y="0" width="1440" height="820" fill="url(#skyGradient)" />

      {/* Stars — only visible once the sky has darkened toward dusk/night */}
      <g opacity={tod.stars.opacity}>
        {STAR_POSITIONS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#f5f3e8"
            className="star-twinkle"
            style={{ animationDelay: `${(i % 5) * 0.6}s` }}
          />
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
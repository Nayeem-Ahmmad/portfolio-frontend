import Fireflies from './Fireflies';

// Everything that used to sit "on the ground" — the grass/hills fill,
// path, house, treeline, pond, and flowers — has been removed by
// request. What's left is birds and fireflies (which fade in at night
// regardless of what else is on screen). The mountains layer above this
// one, and the sky below the -z-10 page background, fill the space
// where the ground used to be.
//
// Birds continuously fly left-to-right across the whole scene and loop
// (see .bird-flypath in index.css) — the shape itself is drawn once at
// local (0,0); the CSS animation is what actually moves it from just
// off-screen-left to just off-screen-right, with a gentle vertical wave
// along the way. Each bird's vertical lane (--bird-y) and flight
// duration/delay are set inline so they don't all move in lockstep.
// Neutralized automatically by the site-wide prefers-reduced-motion rule.
function Bird({ y, delay = 0, duration = 18 }) {
  return (
    <path
      d="M0,0 q6,-8 12,0 q6,-8 12,0"
      stroke="var(--house-color)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.55"
      className="bird-flypath"
      style={{
        '--bird-y': `${y}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

const BIRDS = [
  { y: 220, delay: 0, duration: 29 },
  { y: 260, delay: -6, duration: 24 },
  { y: 160, delay: -11, duration: 32 },
  { y: 195, delay: -3, duration: 26 },
  { y: 140, delay: -14, duration: 30 },
  { y: 90, delay: -8, duration: 28 },
  { y: 310, delay: -2, duration: 33 },
];

export default function GroundScene({ tod }) {
  return (
    <g>
      {BIRDS.map((b, i) => (
        <Bird key={i} y={b.y} delay={b.delay} duration={b.duration} />
      ))}

      {/* Fireflies fade in as the garden moves into dusk/night */}
      <Fireflies opacity={tod.fireflies.opacity} />
    </g>
  );
}
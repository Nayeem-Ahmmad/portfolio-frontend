// A handful of soft glowing fireflies for the night garden. Positions sit
// near the treeline/pond so they read as part of the scene rather than
// random screen noise. Visibility is driven by time-of-day (see
// utils/timeOfDay's `fireflies.opacity`); the gentle drift/flicker is pure
// CSS (see index.css) so it automatically respects the site-wide
// prefers-reduced-motion rule already in place.
const FIREFLY_SPOTS = [
  { x: 190, y: 700, delay: '0s' },
  { x: 260, y: 730, delay: '0.9s' },
  { x: 520, y: 620, delay: '1.6s' },
  { x: 900, y: 640, delay: '0.4s' },
  { x: 1020, y: 600, delay: '1.2s' },
  { x: 1200, y: 660, delay: '2s' },
];

export default function Fireflies({ opacity = 0 }) {
  // Skip rendering entirely while invisible (morning/day/afternoon) —
  // no point animating six elements nobody can see.
  if (opacity <= 0.01) return null;

  return (
    <g opacity={opacity}>
      {FIREFLY_SPOTS.map((f, i) => (
        <circle
          key={i}
          cx={f.x}
          cy={f.y}
          r="3"
          fill="#d9f99d"
          className="firefly-flicker"
          style={{ animationDelay: f.delay }}
        />
      ))}
    </g>
  );
}
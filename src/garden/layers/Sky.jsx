// Deepest garden layer: sky gradient + sun.
// Fixed "morning" values for now — Phase 05 will drive these gradient
// stops and the sun's cy position from scroll progress instead.
export default function Sky() {
  return (
    <g>
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky-top)" />
          <stop offset="55%" stopColor="var(--sky-mid)" />
          <stop offset="100%" stopColor="var(--sky-bottom)" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sun-glow)" />
          <stop offset="100%" stopColor="var(--sun-glow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="1440" height="820" fill="url(#skyGradient)" />

      {/* Sun + soft glow halo. cy is the value Phase 05 will animate. */}
      <circle cx="1080" cy="360" r="180" fill="url(#sunGlow)" />
      <circle cx="1080" cy="360" r="58" fill="var(--sun-color)" />
    </g>
  );
}
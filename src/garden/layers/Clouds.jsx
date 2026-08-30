// A handful of soft clouds. Kept sparse per the brief's "don't overcrowd"
// rule. `opacity` is the time-of-day cloud multiplier from
// utils/timeOfDay — clouds fade thin toward sunset/night, same as a real
// sky, while each cloud keeps its own relative opacity for depth.
function Cloud({ x, y, scale = 1, opacity = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <ellipse cx="0" cy="0" rx="70" ry="22" fill="var(--cloud-color)" />
      <ellipse cx="40" cy="-10" rx="45" ry="18" fill="var(--cloud-color)" />
      <ellipse cx="-45" cy="6" rx="40" ry="16" fill="var(--cloud-color)" />
    </g>
  );
}

export default function Clouds({ opacity = 1 }) {
  return (
    <g opacity={opacity} filter="url(#cloudBlur)">
      <defs>
        <filter id="cloudBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <Cloud x={220} y={140} scale={1.1} opacity={0.9} />
      <Cloud x={620} y={90} scale={0.8} opacity={0.7} />
      <Cloud x={980} y={170} scale={0.9} opacity={0.6} />
    </g>
  );
}
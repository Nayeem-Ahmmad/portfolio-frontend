import { pathPoints } from '../pathPoints';

// Foreground: rolling ground, the winding garden path, a small house,
// a treeline, a pond, and a few flower clusters. Journey stop positions
// come from ../pathPoints.js so this scene, the camera math, and the
// nav dots all agree on where each section physically sits.
function Tree({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-4" y="0" width="8" height="26" fill="var(--house-color)" />
      <ellipse cx="0" cy="-14" rx="26" ry="30" fill="var(--tree-color)" />
    </g>
  );
}

function FlowerCluster({ x, y }) {
  const petals = ['#f3b990', '#ffffff', 'var(--sun-color)'];
  return (
    <g transform={`translate(${x} ${y})`}>
      {petals.map((c, i) => (
        <circle key={i} cx={i * 10 - 10} cy={i % 2 === 0 ? 0 : -4} r="4" fill={c} opacity="0.85" />
      ))}
    </g>
  );
}

function House({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-38" y="-4" width="76" height="46" fill="var(--house-color)" rx="2" />
      <polygon points="-46,-4 0,-40 46,-4" fill="var(--house-roof)" />
      <rect x="-8" y="16" width="16" height="26" fill="#0e0c0b" />
      <rect x="14" y="6" width="12" height="12" fill="var(--window-glow)" opacity="0.9" />
    </g>
  );
}

function Bird({ x, y }) {
  return (
    <path
      d={`M${x},${y} q6,-8 12,0 q6,-8 12,0`}
      stroke="var(--house-color)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.5"
    />
  );
}

export default function GroundScene() {
  return (
    <g>
      {/* Rolling hills / grass base */}
      <path
        d="M0,600 L200,560 L420,610 L680,570 L900,620 L1140,580 L1440,610 L1440,820 L0,820 Z"
        fill="var(--hill-color)"
      />
      <path
        d="M0,660 L240,630 L520,670 L760,630 L1000,675 L1280,640 L1440,660 L1440,820 L0,820 Z"
        fill="var(--ground-color)"
      />

      {/* Winding stone path connecting every section location */}
      <path
        d={`M${pathPoints[0].x},${pathPoints[0].y}
            C ${pathPoints[1].x + 80},${pathPoints[1].y - 40}
              ${pathPoints[1].x + 40},${pathPoints[1].y + 30}
              ${pathPoints[1].x},${pathPoints[1].y}
            C ${pathPoints[2].x + 100},${pathPoints[2].y - 50}
              ${pathPoints[2].x + 40},${pathPoints[2].y + 20}
              ${pathPoints[2].x},${pathPoints[2].y}
            C ${pathPoints[3].x + 90},${pathPoints[3].y - 40}
              ${pathPoints[3].x + 30},${pathPoints[3].y + 30}
              ${pathPoints[3].x},${pathPoints[3].y}
            C ${pathPoints[4].x + 90},${pathPoints[4].y - 40}
              ${pathPoints[4].x + 30},${pathPoints[4].y + 20}
              ${pathPoints[4].x},${pathPoints[4].y}
            C ${pathPoints[5].x + 70},${pathPoints[5].y - 40}
              ${pathPoints[5].x + 20},${pathPoints[5].y + 20}
              ${pathPoints[5].x},${pathPoints[5].y}
            C ${pathPoints[6].x + 50},${pathPoints[6].y - 30}
              ${pathPoints[6].x + 10},${pathPoints[6].y + 10}
              ${pathPoints[6].x},${pathPoints[6].y}`}
        fill="none"
        stroke="var(--path-color)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="2 18"
        opacity="0.8"
      />

      {/* Small pond near the Achievements location */}
      <ellipse cx="200" cy="740" rx="70" ry="24" fill="var(--water-color)" opacity="0.85" />
      <ellipse cx="200" cy="740" rx="70" ry="24" fill="none" stroke="var(--cloud-color)" strokeWidth="1" opacity="0.3" />

      {/* House marks the Home location */}
      <House x={pathPoints[0].x + 90} y={pathPoints[0].y - 20} />

      {/* Treeline, sparse by design */}
      <Tree x={pathPoints[1].x - 60} y={pathPoints[1].y + 10} scale={1.1} />
      <Tree x={pathPoints[3].x + 70} y={pathPoints[3].y + 5} scale={0.9} />
      <Tree x={pathPoints[4].x - 80} y={pathPoints[4].y + 15} scale={1.2} />
      <Tree x={pathPoints[6].x + 40} y={pathPoints[6].y - 10} scale={0.8} />

      {/* A few flower clusters, never crowding the path */}
      <FlowerCluster x={pathPoints[2].x - 70} y={pathPoints[2].y + 20} />
      <FlowerCluster x={pathPoints[5].x + 60} y={pathPoints[5].y + 25} />

      {/* Two birds for quiet atmosphere */}
      <Bird x={860} y={220} />
      <Bird x={920} y={260} />
    </g>
  );
}
import Fireflies from './Fireflies';

// Everything that used to sit "on the ground" — the grass/hills fill,
// path, house, treeline, pond, and flowers — has been removed by
// request. What's left is just the birds and the fireflies (which fade
// in at night regardless of what else is on screen). The mountains
// layer above this one, and the sky below the -z-10 page background,
// are what now fill the space where the ground used to be.
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

export default function GroundScene({ tod }) {
  return (
    <g>
      {/* Two birds for quiet atmosphere */}
      <Bird x={860} y={220} />
      <Bird x={920} y={260} />

      {/* Fireflies fade in as the garden moves into dusk/night */}
      <Fireflies opacity={tod.fireflies.opacity} />
    </g>
  );
}
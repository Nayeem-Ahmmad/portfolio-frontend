// Two ridgelines behind the garden proper, with different parallax speeds
// (far ridge slower) applied by the parent <g> transform in GardenScene to
// sell depth as the camera "travels" on scroll.
//
// Both paths are drawn ~200px wider than the 0–1440 viewBox on each side.
// Without that margin, the parallax translate (up to roughly ±95px for
// this layer, more for faster layers) would slide the ridge past the
// viewBox edge and expose empty sky where a mountain should still be —
// exactly the gap that showed up at the far left/right during scroll.
// The extra margin is comfortably bigger than the max possible shift, so
// the ridge always fully covers the screen no matter where the camera is.
export default function Mountains() {
  return (
    <g>
      <path
        d="M-200,480 L120,410 L260,460 L400,380 L560,450 L720,400
           L900,470 L1080,400 L1260,460 L1440,420 L1640,480
           L1640,820 L-200,820 Z"
        fill="var(--mountain-far)"
        opacity="0.55"
      />
      <path
        d="M-200,540 L160,480 L320,530 L480,470 L660,540 L840,490
           L1020,550 L1200,500 L1440,540 L1640,540
           L1640,820 L-200,820 Z"
        fill="var(--mountain-near)"
        opacity="0.75"
      />

      {/* Ground extension, same color as the near ridge's own flat base
          so it continues seamlessly with no visible seam at y=820. This
          is only ever seen in the letterbox gap that preserveAspectRatio
          ="meet" leaves below the artwork on a portrait phone — see the
          matching note on Sky's rect for why that gap needs filling at
          all instead of being left transparent. */}
      <rect x="-200" y="820" width="1840" height="1600" fill="var(--mountain-near)" opacity="0.75" />
    </g>
  );
}
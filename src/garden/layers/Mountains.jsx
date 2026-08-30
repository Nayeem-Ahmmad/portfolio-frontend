    // Two ridgelines behind the garden proper. In Phase 04 these two <path>s
// will get slightly different parallax speeds (far ridge slower) to sell
// depth as the camera "travels" on scroll.
export default function Mountains() {
  return (
    <g>
      <path
        d="M0,480 L120,410 L260,460 L400,380 L560,450 L720,400
           L900,470 L1080,400 L1260,460 L1440,420 L1440,820 L0,820 Z"
        fill="var(--mountain-far)"
        opacity="0.55"
      />
      <path
        d="M0,540 L160,480 L320,530 L480,470 L660,540 L840,490
           L1020,550 L1200,500 L1440,540 L1440,820 L0,820 Z"
        fill="var(--mountain-near)"
        opacity="0.75"
      />
    </g>
  );
}
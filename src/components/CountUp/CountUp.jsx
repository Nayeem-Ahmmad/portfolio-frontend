import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Animates a number counting up from 0 to `value` once it scrolls into
// view, then stays put (never re-triggers on re-scroll). Reusable
// anywhere a headline stat is shown — not just Achievements.
//
// Reduced-motion visitors get the final number immediately, no counting
// animation — consistent with how the rest of the app treats that
// preference (content arrives instantly, only the motion is removed).
export default function CountUp({ value, duration = 1.2, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic — fast start, gentle settle, matches the rest of
      // the site's easing rather than a linear tick-up.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
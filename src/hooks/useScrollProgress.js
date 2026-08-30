import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tracks the whole page's scroll as a smooth 0–1 "journey progress" value,
// using GSAP ScrollTrigger's scrub instead of a raw scroll listener so the
// number updates in sync with the browser's own scroll/rAF timing (no
// jank, and it keeps working correctly if smooth-scroll libraries are
// added later). This does NOT hijack scrolling — the user's native wheel,
// trackpad, keyboard and touch scrolling all keep working exactly as
// before; ScrollTrigger is only reading position, never taking control of it.
export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return progress;
}
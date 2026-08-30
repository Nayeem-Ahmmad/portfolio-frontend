import { useEffect, useState } from 'react';

// Tracks overall page scroll as a 0–1 "journey progress" value.
// GSAP ScrollTrigger will drive this fully in Phase 04 — for now this
// is a plain scroll-based version so the rest of the app has something
// to consume while the garden/navigation is being built.
export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

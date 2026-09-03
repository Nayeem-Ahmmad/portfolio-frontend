import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { pathPoints, FLIPPED_LAYOUT_IDS } from '../../garden/pathPoints';

gsap.registerPlugin(ScrollToPlugin);

// A minimal fixed dot-list, one per journey stop (Home, About, Skills...).
// The active dot is whichever one matches the current scroll progress;
// clicking a dot smooth-scrolls the page to that stop's position.
// ArrowUp/ArrowDown do the same, moving one stop at a time — skipped
// while the visitor is typing in the contact form so arrow keys still
// work normally inside a text field.
export default function NavDots({ activeId }) {
  const segmentCount = pathPoints.length - 1;
  // Desktop-only (see Navbar's matching `flipped` prop): from Experience
  // onward the content card moves to the right edge and *stays* there
  // through Projects, Achievements and Contact — so this rail moves to
  // the left for that whole stretch too, instead of flipping back per
  // section. Mobile's bottom bar is unaffected — already full-width/
  // centered, nothing to mirror there.
  const isFlipped = FLIPPED_LAYOUT_IDS.includes(activeId);

  const scrollToIndex = (index) => {
    const clamped = Math.min(Math.max(index, 0), segmentCount);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (clamped / segmentCount) * docHeight;
    gsap.to(window, { duration: 1, scrollTo: { y: targetY }, ease: 'power2.inOut' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      e.preventDefault();
      const currentIndex = pathPoints.findIndex((p) => p.id === activeId);
      const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
      scrollToIndex(nextIndex);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId]);

  return (
    <>
      {/* Desktop/tablet: vertical dot rail, right edge. Hidden below sm —
          at phone widths it sat right on top of the content card's edge,
          which is the overlap this split fixes. */}
      <nav
        aria-label="Garden journey navigation"
        className={`hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4 ${
          isFlipped ? 'md:left-6 md:right-auto' : ''
        }`}
      >
        {pathPoints.map((point, index) => {
          const isActive = point.id === activeId;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={point.label}
              // justify-end stays constant in both states — only
              // flex-row-reverse toggles. That's deliberate, not a
              // leftover: flex-direction: row-reverse also flips which
              // edge "start"/"end" mean, so justify-end + row-reverse is
              // what actually packs the dot+label group against the LEFT
              // edge (justify-start would have packed it against the
              // right instead, which is what caused the previous bug —
              // each row's dot landed at a different x depending on that
              // row's own label length, instead of a straight column).
              className={`group flex items-center gap-3 justify-end p-2 -m-2 ${
                isFlipped ? 'md:flex-row-reverse' : ''
              }`}
            >
              <span
                className={`hidden md:inline text-xs uppercase tracking-wide transition-opacity ${
                  isActive ? 'opacity-100 text-paper' : 'opacity-0 group-hover:opacity-70 text-fog'
                }`}
              >
                {point.label}
              </span>
              <span
                className={`block rounded-full transition-all ${
                  isActive ? 'w-3 h-3 bg-moss' : 'w-2.5 h-2.5 bg-fog/50 group-hover:bg-fog'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Phone: same stops, laid out as a horizontal bar pinned to the
          bottom edge instead — a vertical rail down the right side has
          nowhere to go on a narrow screen without sitting on top of the
          content, so this is a different layout for the same nav, not
          just a shrunk copy of the desktop one. */}
      <nav
        aria-label="Garden journey navigation"
        className="sm:hidden fixed bottom-4 inset-x-0 z-20 flex items-center justify-center gap-3"
      >
        <div className="flex items-center gap-3 bg-panel/70 backdrop-blur-sm rounded-full px-4 py-2.5">
          {pathPoints.map((point, index) => {
            const isActive = point.id === activeId;
            return (
              <button
                key={point.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={point.label}
                className="p-1.5 -m-1.5"
              >
                <span
                  className={`block rounded-full transition-all ${
                    isActive ? 'w-2.5 h-2.5 bg-moss' : 'w-2 h-2 bg-fog/50'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
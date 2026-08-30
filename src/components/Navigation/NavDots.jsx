import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { pathPoints } from '../../garden/pathPoints';

gsap.registerPlugin(ScrollToPlugin);

// A minimal fixed dot-list, one per journey stop (Home, About, Skills...).
// The active dot is whichever one matches the current scroll progress;
// clicking a dot smooth-scrolls the page to that stop's position.
export default function NavDots({ activeId }) {
  const segmentCount = pathPoints.length - 1;

  const handleClick = (index) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / segmentCount) * docHeight;
    gsap.to(window, { duration: 1, scrollTo: { y: targetY }, ease: 'power2.inOut' });
  };

  return (
    <nav
      aria-label="Garden journey navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4"
    >
      {pathPoints.map((point, index) => {
        const isActive = point.id === activeId;
        return (
          <button
            key={point.id}
            type="button"
            onClick={() => handleClick(index)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={point.label}
            className="group flex items-center gap-3 justify-end p-2 -m-2"
          >
            <span
              className={`hidden sm:inline text-xs uppercase tracking-wide transition-opacity ${
                isActive ? 'opacity-100 text-paper' : 'opacity-0 group-hover:opacity-70 text-fog'
              }`}
            >
              {point.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                isActive
                  ? 'w-3 h-3 bg-moss'
                  : 'w-2.5 h-2.5 bg-fog/50 group-hover:bg-fog'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
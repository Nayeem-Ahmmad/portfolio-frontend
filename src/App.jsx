import GardenScene from './garden/GardenScene';
import NavDots from './components/Navigation/NavDots';
import useScrollProgress from './hooks/useScrollProgress';
import { getActiveSectionId } from './utils/cameraPath';
import { pathPoints } from './garden/pathPoints';

// Phase 04: the garden becomes the navigation. Content sections are still
// placeholders (real copy lands in Phase 06) — this phase proves the
// mechanics: native scroll drives a smooth 0–1 progress value, that value
// pans the fixed garden background, and both the nav dots and the visible
// section highlight agree on which stop is "active" at any given moment.
function App() {
  const progress = useScrollProgress();
  const activeId = getActiveSectionId(progress);
  const showScrollHint = progress < 0.03;

  return (
    <>
      <GardenScene progress={progress} />
      <NavDots activeId={activeId} />

      {showScrollHint && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-xs uppercase tracking-[0.2em] text-fog animate-bounce">
          Scroll to explore ↓
        </div>
      )}

      <main className="relative z-10">
        {pathPoints.map((point) => (
          <section
            key={point.id}
            id={point.id}
            className="h-screen flex items-center justify-start px-10 md:px-20"
          >
            <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-8 py-6 max-w-md">
              <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2">
                {point.label}
              </p>
              <h2 className="text-2xl md:text-3xl font-display text-paper">
                {point.label} section placeholder
              </h2>
              <p className="text-fog mt-2 text-sm">
                Real content for this section arrives in Phase 06.
              </p>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default App;
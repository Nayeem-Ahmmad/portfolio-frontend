import GardenScene from './garden/GardenScene';
import Navbar from './components/Navbar/Navbar';
import NavDots from './components/Navigation/NavDots';
import useScrollProgress from './hooks/useScrollProgress';
import { getActiveSectionId } from './utils/cameraPath';
import { pathPoints } from './garden/pathPoints';

import Home from './sections/Home/Home';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Achievements from './sections/Achievements/Achievements';
import Contact from './sections/Contact/Contact';

// Phase 06: the garden's journey stops now hold real portfolio content
// instead of placeholders. Layout/positioning (ids, section spacing,
// horizontal padding) stays here in App.jsx; each section owns its own
// inner content and panel width, since Skills/Projects need far more room
// than Home/About/Contact do. Sections use min-h-screen (not a fixed
// h-screen) so content that runs long — the Skills grid, the Projects
// list — can grow instead of clipping.
const SECTION_COMPONENTS = {
  home: Home,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  achievements: Achievements,
  contact: Contact,
};

function App() {
  const progress = useScrollProgress();
  const activeId = getActiveSectionId(progress);
  const showScrollHint = progress < 0.03;

  return (
    <>
      <GardenScene progress={progress} />
      <Navbar />
      <NavDots activeId={activeId} />

      {showScrollHint && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-xs uppercase tracking-[0.2em] text-fog animate-bounce">
          Scroll to explore ↓
        </div>
      )}

      <main className="relative z-10">
        {pathPoints.map((point) => {
          const Section = SECTION_COMPONENTS[point.id];
          return (
            <section
              key={point.id}
              id={point.id}
              className="min-h-screen flex items-center justify-start px-6 md:px-20 py-28"
            >
              <Section />
            </section>
          );
        })}
      </main>
    </>
  );
}

export default App;
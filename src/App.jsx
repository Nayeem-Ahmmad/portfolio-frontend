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

const SECTION_COMPONENTS = {
  home: Home,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  achievements: Achievements,
  contact: Contact,
};

// Home/About/Skills keep the original left-aligned panel (over the
// garden path). Experience onward moves to the right side instead —
// left-aligned panels there sat directly over the sun/sky, so this keeps
// that part of the scene visible while scrolling through the back half
// of the journey.
const RIGHT_ALIGNED_SECTIONS = new Set(['experience', 'projects', 'achievements', 'contact']);

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
          const alignClass = RIGHT_ALIGNED_SECTIONS.has(point.id)
            ? 'justify-end'
            : 'justify-start';
          return (
            <section
              key={point.id}
              id={point.id}
              className={`min-h-screen flex items-center ${alignClass} px-6 md:px-20 py-28`}
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
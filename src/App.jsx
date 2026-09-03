import GardenScene from './garden/GardenScene';
import Navbar from './components/Navbar/Navbar';
import NavDots from './components/Navigation/NavDots';
import useScrollProgress from './hooks/useScrollProgress';
import { getActiveSectionId } from './utils/cameraPath';
import { pathPoints, FLIPPED_LAYOUT_IDS } from './garden/pathPoints';

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

function App() {
  const progress = useScrollProgress();
  const activeId = getActiveSectionId(progress);
  const showScrollHint = progress < 0.03;

  return (
    <>
      <GardenScene progress={progress} />
      <Navbar flipped={FLIPPED_LAYOUT_IDS.includes(activeId)} />
      <NavDots activeId={activeId} />

      {showScrollHint && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 text-xs uppercase tracking-[0.2em] text-fog animate-bounce">
          Scroll to explore ↓
        </div>
      )}

      <main className="relative z-10">
        {/* min-h-[100svh] (small viewport height), not 100dvh: dvh tracks
            the mobile browser chrome live, so section height — and with
            it the whole document's scroll height — kept shifting as the
            address bar hid/showed mid-scroll. useScrollProgress caches
            document.body's start/end via GSAP ScrollTrigger, and a
            purely-chrome-driven viewport change like that doesn't
            reliably fire a resize event for it to recalculate against —
            so its cached "bottom" fell out of sync with the real one,
            and progress topped out before you actually reached the
            Contact section: the sun never finished setting because the
            scroll journey never reported reaching 100%. svh is sized to
            the smallest the viewport ever gets, so the document's total
            height stays constant through the whole scroll and
            ScrollTrigger's bounds stay correct end to end. */}
        {pathPoints.map((point) => {
          const Section = SECTION_COMPONENTS[point.id];
          // From Experience onward the card moves to the right edge on
          // desktop, and it *stays* there through Projects, Achievements
          // and Contact — see the matching `flipped`/`isFlipped` props on
          // Navbar and NavDots, which move to the left for the same
          // stretch instead of flipping back and forth per section.
          // Mobile keeps justify-start regardless: the card is already
          // full-width there, so left vs. right isn't meaningful.
          const justifyClass = FLIPPED_LAYOUT_IDS.includes(point.id)
            ? 'justify-start md:justify-end'
            : 'justify-start';
          return (
            <section
              key={point.id}
              id={point.id}
              className={`min-h-[100svh] flex items-center ${justifyClass} px-5 sm:px-6 md:px-20 pt-20 sm:pt-24 md:pt-28 pb-24 sm:pb-20 md:pb-28`}
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
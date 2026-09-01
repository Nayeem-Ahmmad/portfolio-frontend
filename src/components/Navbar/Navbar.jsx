import { RESUME_URL } from '../../utils/socialLinks';

// Minimal fixed top bar. The left corner is deliberately left empty now —
// the "Nayeem" mark moved to the right, stacked above the Resume button
// as a small journey label, so the top-right corner reads as one unit
// instead of two disconnected pieces of text.
export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-20 flex items-center justify-end px-6 md:px-10 py-5">
      <div className="flex flex-col items-end gap-2">
        <span className="font-display text-xs md:text-sm tracking-[0.2em] uppercase text-paper/90">
          Nayeem&apos;s Development Journey
        </span>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs uppercase tracking-[0.2em] text-ink bg-moss font-medium rounded-full px-5 py-2.5 shadow-lg shadow-moss/20 hover:bg-moss/90 transition-colors"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
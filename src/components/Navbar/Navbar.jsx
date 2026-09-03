import { RESUME_URL } from '../../utils/socialLinks';

// Minimal fixed top bar. The left corner is deliberately left empty by
// default — the "Nayeem" mark moved to the right, stacked above the
// Resume button as a small journey label, so the top-right corner reads
// as one unit instead of two disconnected pieces of text.
//
// `flipped` (desktop/md+ only — see App.jsx) moves this whole block to
// the top-left instead, for the one section (Experience) whose content
// card itself moves to the right: keeping this on the right in that case
// would sit it right on top of the card. Mobile always keeps the normal
// right-side layout regardless of `flipped` — the card there is already
// full-width, so there's no swap to mirror.
export default function Navbar({ flipped = false }) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-20 flex items-center px-4 sm:px-6 md:px-10 py-4 sm:py-5 justify-end ${
        flipped ? 'md:justify-start' : ''
      }`}
    >
      <div
        className={`flex flex-col items-end gap-1.5 sm:gap-2 ${flipped ? 'md:items-start' : ''}`}
      >
        {/* The label wraps below the button on very narrow phones (< sm)
            instead of staying hidden — cutting it there felt like losing
            the point of the redesign rather than a real space constraint,
            and it still reads fine at this size stacked over a phone's
            full width. */}
        <span
          className={`font-display text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-paper/90 text-right max-w-[60vw] sm:max-w-none ${
            flipped ? 'md:text-left' : ''
          }`}
        >
          Nayeem&apos;s Development Journey
        </span>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-ink bg-moss font-medium rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-lg shadow-moss/20 hover:bg-moss/90 transition-colors"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
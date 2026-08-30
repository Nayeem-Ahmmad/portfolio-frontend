import { RESUME_URL } from '../../utils/socialLinks';

// Minimal fixed top bar: name/mark on the left, resume link on the right.
// Deliberately small and translucent so it never competes with the garden.
export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
      <a href="#home" className="font-display text-sm tracking-[0.25em] uppercase text-paper">
        Nayeem
      </a>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noreferrer"
        className="text-xs uppercase tracking-[0.2em] text-fog hover:text-moss transition-colors border border-fog/30 hover:border-moss/60 rounded-full px-4 py-2"
      >
        Resume
      </a>
    </header>
  );
}
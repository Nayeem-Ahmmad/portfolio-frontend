import { FiGithub, FiLinkedin, FiDownload, FiFacebook } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { SOCIAL_LINKS, RESUME_URL } from '../../utils/socialLinks';

const ICONS = { github: FiGithub, linkedin: FiLinkedin, facebook: FiFacebook, whatsapp: BsWhatsapp };

export default function Home() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-8 py-8 max-w-lg">
      <p className="uppercase tracking-[0.3em] text-xs text-moss mb-3">
        Backend & Full-Stack Developer
      </p>
      <h1 className="text-3xl md:text-5xl font-display text-paper leading-tight">
        Hi, I&apos;m Nayeem.
      </h1>
      <p className="text-fog mt-4 text-sm md:text-base leading-relaxed max-w-md">
        I build modern web applications using Python, Django and React.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-8">
        <button
          type="button"
          onClick={scrollToAbout}
          className="text-xs uppercase tracking-[0.2em] bg-moss text-ink font-medium rounded-full px-6 py-3 hover:bg-moss/90 transition-colors"
        >
          Explore My Journey
        </button>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper border border-fog/30 rounded-full px-6 py-3 hover:border-moss/60 transition-colors"
        >
          <FiDownload aria-hidden="true" /> Download Resume
        </a>
      </div>

      <div className="flex items-center gap-4 mt-6">
        {SOCIAL_LINKS.map((link) => {
          const Icon = ICONS[link.id];
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="text-fog hover:text-moss transition-colors text-lg"
            >
              {Icon ? <Icon aria-hidden="true" /> : link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
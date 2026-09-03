import { FiGithub, FiLinkedin, FiMail, FiFacebook } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import ContactForm from '../../components/ContactForm/ContactForm';
import { EMAIL, SOCIAL_LINKS } from '../../utils/socialLinks';

const ICONS = { github: FiGithub, linkedin: FiLinkedin, facebook: FiFacebook, whatsapp: BsWhatsapp };

export default function Contact() {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 max-w-lg w-full">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2">Contact</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-3">
        Let&apos;s Build Something Together.
      </h2>
      <p className="text-fog text-sm mb-6">Have a project idea or want to work together?</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-5 mb-8">
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email"
          className="flex items-center gap-2 text-fog hover:text-moss transition-colors text-xs sm:text-sm"
        >
          <FiMail aria-hidden="true" /> {EMAIL}
        </a>
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

      <ContactForm />
    </div>
  );
}
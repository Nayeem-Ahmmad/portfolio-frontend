import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// One project "location" in the garden. Both Wearify and Job Portal BD use
// separate backend/frontend repos, so this card links each one individually
// (matching the "Backend — Frontend — Live Demo" pattern on the resume)
// instead of a single generic "Code" link. Any link that isn't provided is
// just skipped — never a dead link or broken image.
//
// Phase 07 polish: the card fades/lifts into place the first time it
// scrolls into view, lifts slightly and gains a soft moss ring on hover,
// and its screenshot (if any) zooms gently on hover. All three respect
// prefers-reduced-motion — useReducedMotion() disables the motion props
// entirely rather than just speeding them up, so reduced-motion users get
// the content instantly with no movement at all.
export default function ProjectCard({
  title,
  description,
  tech,
  features,
  backendUrl,
  frontendUrl,
  liveUrl,
  screenshot,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="bg-panel/60 backdrop-blur-sm rounded-2xl overflow-hidden max-w-xl transition-shadow duration-300 hover:ring-1 hover:ring-moss/30"
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      {screenshot && (
        <div className="overflow-hidden">
          <motion.img
            src={screenshot}
            alt={`${title} screenshot`}
            className="w-full h-44 object-cover"
            loading="lazy"
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      )}
      <div className="px-6 py-6">
        <h3 className="text-xl font-display text-paper">{title}</h3>
        <p className="text-fog text-sm mt-2 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[11px] uppercase tracking-wide text-moss bg-moss-dim/60 border border-moss/20 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {features?.length > 0 && (
          <ul className="mt-4 text-fog text-sm space-y-1 list-disc list-inside">
            {features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
          {backendUrl && (
            <a
              href={backendUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper hover:text-moss transition-colors"
            >
              <FiGithub aria-hidden="true" /> Backend
            </a>
          )}
          {frontendUrl && (
            <a
              href={frontendUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper hover:text-moss transition-colors"
            >
              <FiGithub aria-hidden="true" /> Frontend
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper hover:text-moss transition-colors"
            >
              <FiExternalLink aria-hidden="true" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
// Tree-growth metaphor timeline, per the brief. Milestones are the exact
// wording/dates given — nothing here is invented.
const MILESTONES = [
  {
    icon: '🌱',
    period: '2025',
    title: 'Beginning',
    description: 'Started focusing on Python and problem solving.',
  },
  {
    icon: '🌿',
    period: '2025–2026',
    title: 'Learning',
    description: 'Learned Django and REST API development.',
  },
  {
    icon: '🌳',
    period: '2026',
    title: 'Building',
    description: 'Built full-stack applications using Django + React.',
  },
  {
    icon: '🌲',
    period: 'Present',
    title: 'Growing',
    description: 'Building real-world projects and improving backend development.',
  },
];

// Real roles from Nayeem's resume — kept as a separate block rather than
// folded into the growth-timeline metaphor above, since the two tell
// different stories (personal learning arc vs. actual employment).
const ROLES = [
  {
    company: 'Kahf Bangladesh',
    title: 'Software Support · Moderation Specialist',
    period: 'Jun 2025 – Jun 2026',
    bullets: [
      'Moderated content and supported community quality on the Hikma platform.',
      'Provided technical support for the Kahf Guard product.',
      'Collaborated with the dev team to identify and reproduce bugs.',
    ],
  },
  {
    company: 'Shohoj Coding / International Standard University',
    title: 'Programming Mentor (C++)',
    period: 'Jul 2025 – Present',
    bullets: [
      'Mentoring junior students in C/C++, data structures, and algorithms.',
      'Official programming mentor at ISU, running contest-prep sessions.',
      'Helping students build strong OOP, memory management, and STL foundations.',
    ],
  },
];

export default function Experience() {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 max-w-lg w-full sm:w-auto">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2">My Development Journey</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-6">
        From first script to shipped product.
      </h2>

      <ol className="relative border-l border-moss/30 pl-6 space-y-6">
        {MILESTONES.map((m) => (
          <li key={m.period} className="relative">
            <span
              className="absolute -left-[34px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-ink border border-moss/40 text-sm"
              aria-hidden="true"
            >
              {m.icon}
            </span>
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{m.period}</p>
            <p className="text-paper font-display text-lg">{m.title}</p>
            <p className="text-fog text-sm mt-1">{m.description}</p>
          </li>
        ))}
      </ol>

      {/* Real professional experience — separate from the growth metaphor above */}
      <div className="mt-8 pt-6 border-t border-fog/10">
        <p className="uppercase tracking-[0.2em] text-xs text-moss mb-4">Professional Experience</p>
        <div className="space-y-5">
          {ROLES.map((role) => (
            <div key={role.company}>
              <p className="text-paper font-display text-base">{role.title}</p>
              <p className="text-xs text-fog/80">
                {role.company} · {role.period}
              </p>
              <ul className="mt-2 text-fog text-sm space-y-1 list-disc list-inside">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
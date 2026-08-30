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

export default function Experience() {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-8 py-8 max-w-lg">
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
    </div>
  );
}
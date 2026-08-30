import SkillCard from '../../components/SkillCard/SkillCard';

const SKILL_CATEGORIES = [
  { title: 'Languages', skills: ['Python', 'C++', 'JavaScript'] },
  {
    title: 'Backend',
    skills: ['Django', 'Django REST Framework', 'REST API', 'JWT', 'Celery', 'Redis'],
  },
  { title: 'Frontend', skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Database', skills: ['PostgreSQL', 'SQLite'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Postman', 'Linux', 'VS Code'] },
];

export default function Skills() {
  return (
    <div className="max-w-2xl">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2 px-2">Skills</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-6 px-2">
        Technologies I actually build with.
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {SKILL_CATEGORIES.map((category) => (
          <SkillCard key={category.title} title={category.title} skills={category.skills} />
        ))}
      </div>
    </div>
  );
}
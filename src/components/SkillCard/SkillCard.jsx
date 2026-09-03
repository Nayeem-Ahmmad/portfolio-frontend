// A single skill category "signpost" in the garden — a title plus its
// technology list. Plain text only, no fake percentage bars, per the brief.
export default function SkillCard({ title, skills }) {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-5 sm:px-6 py-4 sm:py-5">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-3">{title}</p>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="text-xs md:text-sm text-paper bg-moss-dim/60 border border-moss/20 rounded-full px-3 py-1"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
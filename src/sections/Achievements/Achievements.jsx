// TODO: if/when real competitive-programming stats or profile links
// (Codeforces, LeetCode, etc.) are available, add them here. The brief is
// explicit about never inventing fake statistics, so this stays as a
// focus-area list until real numbers exist.
const FOCUS_AREAS = [
  'Competitive Programming',
  'C++',
  'Data Structures',
  'Algorithms',
  'Problem Solving',
];

export default function Achievements() {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-8 py-8 max-w-lg">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2">Problem Solving</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-4">
        Sharpening the fundamentals.
      </h2>
      <p className="text-fog text-sm leading-relaxed mb-5">
        Alongside application development, I practice competitive programming to stay sharp on
        data structures and algorithms.
      </p>
      <ul className="flex flex-wrap gap-2">
        {FOCUS_AREAS.map((area) => (
          <li
            key={area}
            className="text-xs md:text-sm text-paper bg-moss-dim/60 border border-moss/20 rounded-full px-3 py-1"
          >
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
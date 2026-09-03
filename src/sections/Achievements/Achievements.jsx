import { SiCodeforces, SiCodechef, SiLeetcode } from 'react-icons/si';
import CountUp from '../../components/CountUp/CountUp';

// Every number here comes straight from Nayeem's resume — nothing
// estimated or invented, per the brief's "never fake statistics" rule.
const CP_PROFILES = [
  {
    id: 'codeforces',
    label: 'Codeforces',
    handle: 'nayeem17',
    rating: 'Max rating 1140',
    url: 'https://codeforces.com/profile/nayeem17',
    Icon: SiCodeforces,
  },
  {
    id: 'codechef',
    label: 'CodeChef',
    handle: 'runtime17',
    rating: 'Max rating 1454',
    url: 'https://www.codechef.com/users/runtime17',
    Icon: SiCodechef,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    handle: 'nayeem17',
    rating: 'Contest rating 1470',
    url: 'https://leetcode.com/u/nayeem17/',
    Icon: SiLeetcode,
  },
];

const STATS = [
  { value: 1500, suffix: '+', label: 'Problems solved' },
  { value: 100, suffix: '+', label: 'Contests entered' },
];

const FOCUS_AREAS = ['Competitive Programming', 'C++', 'Data Structures', 'Algorithms', 'Problem Solving'];

export default function Achievements() {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 max-w-lg w-full sm:w-auto">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2">Problem Solving</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-3">
        Sharpening the fundamentals.
      </h2>
      <p className="text-fog text-sm leading-relaxed mb-6">
        Alongside application development, I practice competitive programming to stay sharp on
        data structures and algorithms.
      </p>

      {/* Headline numbers — count up once scrolled into view */}
      <div className="flex gap-8 mb-6">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-display text-paper">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-xs text-fog uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      <ul className="flex flex-wrap gap-2 mb-6">
        {FOCUS_AREAS.map((area) => (
          <li
            key={area}
            className="text-xs md:text-sm text-paper bg-moss-dim/60 border border-moss/20 rounded-full px-3 py-1"
          >
            {area}
          </li>
        ))}
      </ul>

      {/* Platform ratings, each linking to the real profile. flex-wrap +
          the rating dropping to its own line below ~360px keeps the
          handle from getting crushed next to a long rating string. */}
      <div className="flex flex-col gap-3 mb-6">
        {CP_PROFILES.map(({ id, label, handle, rating, url, Icon }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm text-fog hover:text-moss transition-colors"
          >
            <span className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Icon aria-hidden="true" className="text-lg shrink-0" />
              <span className="text-paper truncate">{label}</span>
              <span className="text-fog/70 truncate">@{handle}</span>
            </span>
            <span className="text-xs text-moss whitespace-nowrap ml-auto sm:ml-0">{rating}</span>
          </a>
        ))}
      </div>

      {/* Contest award */}
      <p className="text-xs text-fog border-t border-fog/10 pt-4">
        🏆 2nd Runner-Up — ISU Intra-University Programming Contest
      </p>
    </div>
  );
}
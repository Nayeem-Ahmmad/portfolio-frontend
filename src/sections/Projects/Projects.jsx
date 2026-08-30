import ProjectCard from '../../components/ProjectCard/ProjectCard';
import wearifyShot from '../../assets/images/wearify.png';
import jobPortalShot from '../../assets/images/job-portal-bd.png';

// TODO: fill in githubUrl / liveUrl for each project once they're ready —
// left blank so ProjectCard just omits whatever isn't provided instead of
// showing a dead link. Add more projects here later (Phase 08+ can move
// this list to the Django API instead of hardcoding it).
const PROJECTS = [
  {
    title: 'Wearify',
    description: 'A full-stack e-commerce platform.',
    tech: ['Django', 'Django REST Framework', 'React', 'PostgreSQL', 'Celery', 'Redis'],
    features: [
      'Authentication',
      'Product management',
      'Cart & orders',
      'Notifications',
      'Flash sale',
      'Email system',
    ],
    githubUrl: '',
    liveUrl: '',
    screenshot: wearifyShot,
  },
  {
    title: 'Job Portal BD',
    description: 'A role-based job portal connecting job seekers and recruiters.',
    tech: ['Django', 'DRF', 'React', 'JWT', 'PostgreSQL'],
    features: [
      'Role-based authentication',
      'Job search & application',
      'Recruiter functionality',
      'Notifications',
      'Admin functionality',
    ],
    githubUrl: '',
    liveUrl: '',
    screenshot: jobPortalShot,
  },
];

export default function Projects() {
  return (
    <div className="max-w-4xl">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2 px-2">Projects</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-6 px-2">
        A few things I&apos;ve built.
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
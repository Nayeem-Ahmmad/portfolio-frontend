import ProjectCard from '../../components/ProjectCard/ProjectCard';
import wearifyShot from '../../assets/images/wearify.png';
import jobPortalShot from '../../assets/images/job-portal-bd.png';

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
    backendUrl: 'https://github.com/Nayeem-Ahmmad/wearify-backend',
    frontendUrl: 'https://github.com/Nayeem-Ahmmad/wearify-frontend',
    liveUrl: 'https://wearifysells.vercel.app/',
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
    backendUrl: 'https://github.com/Nayeem-Ahmmad/job_portal',
    frontendUrl: 'https://github.com/Nayeem-Ahmmad/job-portal-frontend',
    liveUrl: 'https://job-portal-frontend-plum-rho.vercel.app/',
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
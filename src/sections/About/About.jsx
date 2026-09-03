export default function About() {
  return (
    <div className="bg-panel/60 backdrop-blur-sm rounded-2xl px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 max-w-lg w-full sm:w-auto">
      <p className="uppercase tracking-[0.2em] text-xs text-moss mb-2">About</p>
      <h2 className="text-2xl md:text-3xl font-display text-paper mb-4">
        A backend-leaning full-stack developer.
      </h2>
      <p className="text-fog text-sm md:text-base leading-relaxed">
        I&apos;m Nayeem, a backend &amp; full-stack developer focused on building reliable web
        applications with Python and Django, paired with React on the frontend. I care most about
        clean API design, data modeling, and making the frontend and backend feel like one
        coherent product rather than two separate projects.
      </p>
      <p className="text-fog text-sm md:text-base leading-relaxed mt-3">
        Right now I&apos;m deepening my grasp of REST API architecture, background task processing
        with Celery and Redis, and writing more production-ready Django applications end to end.
      </p>
    </div>
  );
}
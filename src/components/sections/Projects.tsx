import { ProjectCard } from '@/components/community/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Projects</p>
          <h2 id="projects-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">Demos and experiments from the community</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}

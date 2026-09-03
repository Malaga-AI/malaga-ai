import { ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types/community'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-border bg-card/80 p-6">
      <h3 className="font-safiro text-2xl text-foreground">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
      <p className="mt-5 text-sm text-muted-foreground">By {project.authors.join(', ')}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => <Badge key={item} className="bg-primary/10 text-brand-ink">{item}</Badge>)}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-brand-ink">
        {project.repoUrl ? <a className="inline-flex items-center gap-2 hover:text-foreground" href={project.repoUrl}><Github className="h-4 w-4" />Repository</a> : null}
        {project.demoUrl ? <a className="inline-flex items-center gap-2 hover:text-foreground" href={project.demoUrl}><ExternalLink className="h-4 w-4" />Demo</a> : null}
      </div>
    </article>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Resource } from '@/types/community'

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a className="group block rounded-2xl border border-white/10 bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:border-teal-300/40" href={resource.url}>
      <div className="flex items-center justify-between gap-4">
        <Badge>{resource.type}</Badge>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-teal-200" />
      </div>
      <h3 className="mt-5 font-safiro text-xl text-white">{resource.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{resource.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {resource.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>
    </a>
  )
}

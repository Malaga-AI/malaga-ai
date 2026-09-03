import { ResourceCard } from '@/components/community/ResourceCard'
import { resources } from '@/data/resources'

export function Resources() {
  return (
    <section id="resources" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="resources-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">Resources</p>
          <h2 id="resources-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">Useful material for builders</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      </div>
    </section>
  )
}

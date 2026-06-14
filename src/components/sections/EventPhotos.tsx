import { useEffect, useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import type { EventItem } from '@/features/events/types'

type EventPhotosProps = {
  events: EventItem[]
}

type GalleryPhoto = {
  title: string
  description: string
  imageUrl?: string
}

const fallbackPhotos = [
  {
    title: 'Technical talks',
    description: 'Meetups with demos, panels, and conversations about applied AI.',
  },
  {
    title: 'Local networking',
    description: 'Moments that connect talent, companies, students, and builders in Malaga.',
  },
  {
    title: 'Workshops and sessions',
    description: 'Practical spaces to learn by doing alongside the community.',
  },
]

export function EventPhotos({ events }: EventPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  const photos = events
    .filter((event) => event.imageUrl)
    .slice(0, 6)
    .map((event) => ({
      title: event.title,
      description: event.venueName ?? 'Malaga AI event',
      imageUrl: event.imageUrl,
    }))

  const visiblePhotos: GalleryPhoto[] = photos.length > 0 ? photos : fallbackPhotos

  useEffect(() => {
    if (!selectedPhoto) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedPhoto])

  return (
    <section id="photos" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="photos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Photos</p>
          <h2 id="photos-title" className="mt-3 font-safiro text-4xl text-white md:text-5xl">
            Event photos
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A look at the sessions, conversations, and community moments shaping Malaga AI.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {visiblePhotos.map((photo, index) => (
            <button
              type="button"
              key={`${photo.title}-${index}`}
              className="group relative min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-card/80 text-left transition focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-background md:min-h-60"
              onClick={() => photo.imageUrl && setSelectedPhoto(photo)}
              aria-label={photo.imageUrl ? `Open photo: ${photo.title}` : undefined}
              disabled={!photo.imageUrl}
            >
              {photo.imageUrl ? (
                <img src={photo.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(45,212,191,0.34),transparent_18rem),linear-gradient(135deg,rgba(15,23,42,0.94),rgba(8,47,73,0.72),rgba(20,184,166,0.28))]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
              {photo.imageUrl ? (
                <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/60 text-white opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </span>
              ) : null}
              <div className="relative flex h-full min-h-52 flex-col justify-end p-5 md:min-h-60 md:p-6">
                <h3 className="font-safiro text-2xl text-white">{photo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{photo.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto?.imageUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 backdrop-blur-sm sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-modal-title"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-14 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white transition hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-teal-300"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <figure>
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[78vh] w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-white">
                <h3 id="photo-modal-title" className="font-safiro text-2xl">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">{selectedPhoto.description}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </section>
  )
}

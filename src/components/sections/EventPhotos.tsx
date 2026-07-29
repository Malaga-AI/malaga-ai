import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import dsc05500 from '@/assets/events/DSC05500.jpg'
import dsc05507 from '@/assets/events/DSC05507.jpg'
import DSC05631 from '@/assets/events/DSC05631.jpg'
import image00010 from '@/assets/events/image00010.jpeg'
import image00024 from '@/assets/events/image00024.jpeg'
import panel from '@/assets/events/Panel.jpg'
import registration from '@/assets/events/Registration.jpg'
import { ImageAutoSlider, type ImageAutoSliderItem } from '@/components/ui/image-auto-slider'

type GalleryPhoto = ImageAutoSliderItem

const eventPhotos: GalleryPhoto[] = [
  {
    title: 'Malaga-AI Community Session Feb2026',
    description: 'GSEC',
    imageUrl: dsc05500,
  },
  {
    title: 'Malaga-AI Community Session Feb2026',
    description: 'GSEC',
    imageUrl: dsc05507,
  },
  {
    title: 'IWD2026',
    description: 'Monday',
    imageUrl: image00010,
  },
  {
    title: 'IWD2026',
    description: 'Monday',
    imageUrl: image00024,
  },
  {
    title: 'Employment in the Age Of AI 2026',
    description: 'GSEC',
    imageUrl: registration,
  },
  {
    title: 'Employment in the Age Of AI 2026',
    description: 'GSEC',
    imageUrl: panel,
  },
  {
    title: 'AI Agents 2025',
    description: 'GSEC',
    imageUrl: DSC05631,
  },
]

export function EventPhotos() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const selectedPhoto = selectedPhotoIndex === null ? null : eventPhotos[selectedPhotoIndex]

  const showPreviousPhoto = () => {
    setSelectedPhotoIndex((index) => (index === null ? null : (index - 1 + eventPhotos.length) % eventPhotos.length))
  }

  const showNextPhoto = () => {
    setSelectedPhotoIndex((index) => (index === null ? null : (index + 1) % eventPhotos.length))
  }

  useEffect(() => {
    if (selectedPhotoIndex === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhotoIndex(null)
      }

      if (event.key === 'ArrowLeft') {
        showPreviousPhoto()
      }

      if (event.key === 'ArrowRight') {
        showNextPhoto()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedPhotoIndex])

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

        <div className="mt-10">
          <ImageAutoSlider images={eventPhotos} onImageClick={(_, index) => setSelectedPhotoIndex(index)} />
        </div>
      </div>

      {selectedPhoto?.imageUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 backdrop-blur-sm sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-modal-title"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-14 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white transition hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-teal-300"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Close photo"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="absolute left-2 top-[calc(50%-3rem)] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-lg backdrop-blur transition hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-300 sm:left-4"
              onClick={showPreviousPhoto}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="absolute right-2 top-[calc(50%-3rem)] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-lg backdrop-blur transition hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-300 sm:right-4"
              onClick={showNextPhoto}
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
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

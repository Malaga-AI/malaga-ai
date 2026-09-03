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
import { useTexts } from '@/lib/texts'

const eventPhotoImages = [dsc05500, dsc05507, image00010, image00024, registration, panel, DSC05631]

export function EventPhotos() {
  const texts = useTexts()
  const eventPhotos: ImageAutoSliderItem[] = eventPhotoImages.map((imageUrl, index) => ({
    title: texts.photos.captions[index].title,
    description: texts.photos.captions[index].description,
    imageUrl,
  }))

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
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-ink">{texts.photos.kicker}</p>
          <h2 id="photos-title" className="mt-3 font-safiro text-4xl text-foreground md:text-5xl">
            {texts.photos.heading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{texts.photos.description}</p>
        </div>

        <div className="mt-10">
          <ImageAutoSlider images={eventPhotos} onImageClick={(_, index) => setSelectedPhotoIndex(index)} />
        </div>
      </div>

      {selectedPhoto?.imageUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 py-6 backdrop-blur-sm sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-modal-title"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-14 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface text-foreground transition hover:bg-surface-strong focus:outline-none focus:ring-2 focus:ring-ring"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label={texts.photos.closePhotoAriaLabel}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="absolute left-2 top-[calc(50%-3rem)] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-panel text-foreground shadow-lg backdrop-blur transition hover:bg-overlay focus:outline-none focus:ring-2 focus:ring-ring sm:left-4"
              onClick={showPreviousPhoto}
              aria-label={texts.photos.previousPhotoAriaLabel}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="absolute right-2 top-[calc(50%-3rem)] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-panel text-foreground shadow-lg backdrop-blur transition hover:bg-overlay focus:outline-none focus:ring-2 focus:ring-ring sm:right-4"
              onClick={showNextPhoto}
              aria-label={texts.photos.nextPhotoAriaLabel}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>

            <figure>
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[78vh] w-full rounded-2xl border border-border object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-foreground">
                <h3 id="photo-modal-title" className="font-safiro text-2xl">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{selectedPhoto.description}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </section>
  )
}

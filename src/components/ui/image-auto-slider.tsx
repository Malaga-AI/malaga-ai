import { ZoomIn } from 'lucide-react'

export type ImageAutoSliderItem = {
  title: string
  description?: string
  imageUrl: string
}

type ImageAutoSliderProps = {
  images: ImageAutoSliderItem[]
  onImageClick?: (image: ImageAutoSliderItem, index: number) => void
  openPhotoAriaLabel: (label: string) => string
  galleryImageFallbackAlt: (imageNumber: number) => string
}

export function ImageAutoSlider({ images, onImageClick, openPhotoAriaLabel, galleryImageFallbackAlt }: ImageAutoSliderProps) {
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="image-auto-slider__container w-full">
        <div className="image-auto-slider__track flex w-max gap-4 sm:gap-5 lg:gap-6">
          {duplicatedImages.map((image, index) => {
            const imageNumber = (index % images.length) + 1
            const fallbackLabel = galleryImageFallbackAlt(imageNumber)

            return (
              <button
                type="button"
                key={`${image.imageUrl}-${index}`}
                className="group relative h-52 w-52 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-card text-left shadow-xl transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                onClick={() => onImageClick?.(image, index % images.length)}
                aria-label={openPhotoAriaLabel(image.title || fallbackLabel)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title || fallbackLabel}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80" />
                <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/60 text-white opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-safiro text-xl leading-tight text-white">{image.title}</span>
                  {image.description ? (
                    <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-200">{image.description}</span>
                  ) : null}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

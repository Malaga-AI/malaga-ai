import malagaAiLogo from '@/assets/brand/malaga-ai-logo.png'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  className?: string
  imageClassName?: string
  showText?: boolean
}

export function BrandLogo({ className, imageClassName, showText = true }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img
        src={malagaAiLogo}
        alt="Malaga AI logo"
        className={cn('h-12 w-auto max-w-[220px] object-contain', imageClassName)}
      />
      {showText ? <span className="font-safiro text-xl text-white">Malaga AI</span> : null}
    </span>
  )
}

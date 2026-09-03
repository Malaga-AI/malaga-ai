import darkLogo from '@/assets/brand/malaga-ai-logo-dark.svg'
import lightLogo from '@/assets/brand/malaga-ai-logo-light.svg'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import { useTexts } from '@/lib/texts'

type BrandLogoProps = {
  className?: string
  imageClassName?: string
  showText?: boolean
}

export function BrandLogo({ className, imageClassName, showText = true }: BrandLogoProps) {
  const { theme } = useTheme()
  const { brandLogoAlt } = useTexts().chrome

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img
        src={theme === 'light' ? lightLogo : darkLogo}
        alt={brandLogoAlt}
        className={cn('h-12 w-auto max-w-[220px] object-contain', imageClassName)}
      />
      {showText ? <span className="font-safiro text-xl text-foreground">Malaga-AI</span> : null}
    </span>
  )
}

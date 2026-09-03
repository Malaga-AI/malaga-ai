import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language'
import { useTexts } from '@/lib/texts'

export function LanguageToggle({ className }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage()
  const { languageToggleLabel } = useTexts().chrome
  const nextLanguage = language === 'en' ? 'es' : 'en'
  const label = languageToggleLabel(nextLanguage)

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-sm font-semibold text-foreground transition hover:bg-surface-strong focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        className,
      )}
    >
      {nextLanguage.toUpperCase()}
    </button>
  )
}

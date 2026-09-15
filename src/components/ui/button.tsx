import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  /**
   * Stretch the link's hit area over the nearest `relative` ancestor, so a
   * click anywhere on a card does exactly what its CTA does. The card must not
   * contain other interactive elements.
   */
  stretched?: boolean
}

export function Button({ className, variant = 'primary', stretched = false, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        // A transformed element becomes the containing block for its `::after`,
        // which would shrink the stretched hit area back to the button on hover.
        // Stretched buttons leave the lift to the card instead.
        !stretched && variant !== 'ghost' && 'hover:-translate-y-0.5',
        stretched && "after:absolute after:inset-0 after:content-['']",
        variant === 'primary' && 'bg-primary text-primary-foreground shadow-glow hover:bg-primary-hover',
        variant === 'secondary' && 'border border-border-strong bg-surface text-foreground hover:bg-surface-strong',
        variant === 'ghost' && 'text-muted-foreground hover:bg-surface-strong hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

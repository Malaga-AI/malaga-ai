import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        variant === 'primary' &&
          'bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:bg-primary-hover',
        variant === 'secondary' &&
          'border border-border-strong bg-surface text-foreground hover:-translate-y-0.5 hover:bg-surface-strong',
        variant === 'ghost' && 'text-muted-foreground hover:bg-surface-strong hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

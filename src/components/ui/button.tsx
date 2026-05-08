import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-background',
        variant === 'primary' &&
          'bg-teal-300 text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-teal-200',
        variant === 'secondary' &&
          'border border-white/15 bg-white/[0.08] text-white hover:-translate-y-0.5 hover:bg-white/[0.14]',
        variant === 'ghost' && 'text-muted-foreground hover:bg-white/[0.08] hover:text-white',
        className,
      )}
      {...props}
    />
  )
}

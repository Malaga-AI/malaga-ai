import * as React from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-xs font-medium text-slate-200',
        className,
      )}
      {...props}
    />
  )
}

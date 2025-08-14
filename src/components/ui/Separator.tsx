'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'dashed' | 'dotted'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const separatorVariants = {
  default: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted'
}

const separatorSpacing = {
  none: '',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-8'
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ 
    className, 
    orientation = 'horizontal', 
    variant = 'default',
    spacing = 'md',
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'border-mw-gray-200 dark:border-mw-gray-700',
          separatorVariants[variant],
          orientation === 'horizontal' 
            ? `border-t w-full ${separatorSpacing[spacing]}` 
            : `border-l h-full ${spacing !== 'none' ? 'mx-4' : ''}`,
          className
        )}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'

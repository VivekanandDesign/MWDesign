'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  label?: string
}

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
}

const progressVariants = {
  default: 'bg-mw-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600'
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = 'md', 
    variant = 'default', 
    showLabel = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div className="space-y-2">
        {(showLabel || label) && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
              {label || 'Progress'}
            </span>
            {showLabel && (
              <span className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={clsx(
            'w-full bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full overflow-hidden',
            progressSizes[size],
            className
          )}
          {...props}
        >
          <div
            className={clsx(
              'h-full transition-all duration-300 ease-in-out rounded-full',
              progressVariants[variant]
            )}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemax={max}
            aria-valuemin={0}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
  animation?: 'pulse' | 'wave' | 'none'
}

const skeletonVariants = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-md'
}

const skeletonAnimations = {
  pulse: 'animate-pulse',
  wave: 'animate-[wave_1.6s_ease-in-out_infinite]',
  none: ''
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = 'text', 
    width,
    height,
    lines = 1,
    animation = 'pulse',
    style,
    ...props 
  }, ref) => {
    const getDefaultHeight = () => {
      if (height) return height
      switch (variant) {
        case 'text': return '1rem'
        case 'circular': return '2.5rem'
        case 'rectangular': return '8rem'
        default: return '1rem'
      }
    }

    const getDefaultWidth = () => {
      if (width) return width
      switch (variant) {
        case 'circular': return '2.5rem'
        default: return '100%'
      }
    }

    if (variant === 'text' && lines > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              ref={index === 0 ? ref : undefined}
              className={clsx(
                'bg-mw-gray-200 dark:bg-mw-gray-700',
                skeletonVariants[variant],
                skeletonAnimations[animation],
                className
              )}
              style={{
                width: index === lines - 1 ? '75%' : getDefaultWidth(),
                height: getDefaultHeight(),
                ...style
              }}
              {...(index === 0 ? props : {})}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'bg-mw-gray-200 dark:bg-mw-gray-700',
          skeletonVariants[variant],
          skeletonAnimations[animation],
          className
        )}
        style={{
          width: getDefaultWidth(),
          height: getDefaultHeight(),
          ...style
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

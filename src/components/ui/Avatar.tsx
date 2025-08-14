import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circle' | 'square'
}

const avatarSizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl'
}

const avatarVariants = {
  circle: 'rounded-full',
  square: 'rounded-md'
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', variant = 'circle', ...props }, ref) => {
    const initials = fallback || alt?.charAt(0)?.toUpperCase() || '?'

    return (
      <div
        ref={ref}
        className={clsx(
          'relative inline-flex items-center justify-center font-medium bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-600 dark:text-mw-gray-300 overflow-hidden',
          avatarSizes[size],
          avatarVariants[variant],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="select-none">
            {initials}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  spacing?: 'tight' | 'normal' | 'loose'
}

const spacingClasses = {
  tight: '-space-x-1',
  normal: '-space-x-2',
  loose: '-space-x-3'
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, size = 'md', spacing = 'normal', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const displayChildren = max ? childrenArray.slice(0, max) : childrenArray
    const remainingCount = max ? Math.max(0, childrenArray.length - max) : 0

    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center',
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {displayChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-white dark:ring-mw-gray-900">
            {React.isValidElement(child) && child.type === Avatar
              ? React.cloneElement(child, { size } as any)
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="ring-2 ring-white dark:ring-mw-gray-900">
            <Avatar
              size={size}
              fallback={`+${remainingCount}`}
              className="bg-mw-gray-200 dark:bg-mw-gray-600 text-mw-gray-700 dark:text-mw-gray-200"
            />
          </div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'

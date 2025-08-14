import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const badgeVariants = {
  default: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
  primary: 'bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/20 dark:text-mw-blue-300',
  secondary: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  outline: 'border border-mw-gray-300 dark:border-mw-gray-600 text-mw-gray-700 dark:text-mw-gray-300'
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full font-medium',
          badgeVariants[variant],
          badgeSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

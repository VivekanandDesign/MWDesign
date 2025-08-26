// Enhanced Button with Loading State
import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { Spinner } from './Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'flow'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean  // NEW: Loading state
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          buttonVariants[variant],
          buttonSizes[size],
          loading && 'cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Spinner 
            size={size === 'sm' ? 'sm' : 'md'} 
            variant={variant === 'primary' ? 'white' : 'default'}
            className="mr-2" 
          />
        )}
        {children}
      </button>
    )
  }
)

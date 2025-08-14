import { clsx } from 'clsx'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'white'
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const spinnerVariants = {
  default: 'text-mw-gray-600 dark:text-mw-gray-400',
  primary: 'text-mw-blue-600 dark:text-mw-blue-400',
  white: 'text-white'
}

export function Spinner({ className, size = 'md', variant = 'default', ...props }: SpinnerProps) {
  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        spinnerSizes[size],
        spinnerVariants[variant],
        className
      )}
      role="status"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'white'
  text?: string
  overlay?: boolean
}

export function Loading({ 
  className, 
  size = 'md', 
  variant = 'default', 
  text = 'Loading...', 
  overlay = false,
  ...props 
}: LoadingProps) {
  const content = (
    <div className={clsx(
      'flex flex-col items-center justify-center space-y-2',
      overlay && 'bg-white/80 dark:bg-mw-gray-900/80 backdrop-blur-sm'
    )}>
      <Spinner size={size} variant={variant} />
      {text && (
        <p className={clsx(
          'text-sm font-medium',
          spinnerVariants[variant]
        )}>
          {text}
        </p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div
        className={clsx(
          'absolute inset-0 z-50 flex items-center justify-center',
          className
        )}
        {...props}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className={clsx('flex items-center justify-center p-4', className)}
      {...props}
    >
      {content}
    </div>
  )
}

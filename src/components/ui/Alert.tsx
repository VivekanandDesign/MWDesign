import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
  children: React.ReactNode
}

const alertVariants = {
  default: {
    container: 'bg-mw-gray-50 border-mw-gray-200 text-mw-gray-800 dark:bg-mw-gray-800 dark:border-mw-gray-700 dark:text-mw-gray-200',
    icon: 'text-mw-gray-600 dark:text-mw-gray-400',
    IconComponent: Info
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    icon: 'text-green-600 dark:text-green-400',
    IconComponent: CheckCircle
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    icon: 'text-yellow-600 dark:text-yellow-400',
    IconComponent: AlertTriangle
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    icon: 'text-red-600 dark:text-red-400',
    IconComponent: AlertCircle
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    icon: 'text-blue-600 dark:text-blue-400',
    IconComponent: Info
  }
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, dismissible, onDismiss, children, ...props }, ref) => {
    const config = alertVariants[variant]
    const IconComponent = config.IconComponent

    return (
      <div
        ref={ref}
        className={clsx(
          'relative rounded-lg border p-4',
          config.container,
          className
        )}
        {...props}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <IconComponent className={clsx('h-5 w-5', config.icon)} />
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <h3 className="text-sm font-medium mb-1">
                {title}
              </h3>
            )}
            <div className="text-sm">
              {children}
            </div>
          </div>
          {dismissible && onDismiss && (
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={onDismiss}
                  className={clsx(
                    'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                    config.icon,
                    'hover:bg-black/5 dark:hover:bg-white/10 focus:ring-current'
                  )}
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'block w-full px-3 py-2 border rounded-md shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500'
              : 'border-mw-gray-300 dark:border-mw-gray-600 text-mw-gray-900 dark:text-white placeholder-mw-gray-400',
            'dark:bg-mw-gray-800',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helpText && !error && (
          <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">{helpText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

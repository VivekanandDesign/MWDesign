import { forwardRef } from 'react'
import { clsx } from 'clsx'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  description?: string
  error?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, description, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'block w-full rounded-md border px-3 py-2 text-sm',
            'border-mw-gray-300 dark:border-mw-gray-600',
            'bg-white dark:bg-mw-gray-800',
            'text-mw-gray-900 dark:text-mw-gray-100',
            'focus:border-mw-blue-500 focus:ring-1 focus:ring-mw-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {description && !error && (
          <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
            {description}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

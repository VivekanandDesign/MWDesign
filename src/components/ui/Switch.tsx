'use client'

import { forwardRef, useState } from 'react'
import { clsx } from 'clsx'
import { Check, X, Loader2 } from 'lucide-react'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  loading?: boolean
  showIcons?: boolean
  onLabel?: string
  offLabel?: string
  thumbIcon?: React.ReactNode
  trackIcon?: React.ReactNode
  animate?: boolean
  immediate?: boolean
}

const switchSizes = {
  sm: {
    track: 'w-8 h-4',
    thumb: 'w-3 h-3',
    translate: 'translate-x-4',
    icon: 'w-2 h-2',
    gap: 'ml-8'
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5', 
    translate: 'translate-x-5',
    icon: 'w-3 h-3',
    gap: 'ml-14'
  },
  lg: {
    track: 'w-14 h-8',
    thumb: 'w-6 h-6',
    translate: 'translate-x-6',
    icon: 'w-4 h-4',
    gap: 'ml-16'
  }
}

const switchVariants = {
  default: {
    off: 'bg-mw-gray-200 dark:bg-mw-gray-700',
    on: 'bg-mw-blue-600',
    thumb: 'bg-white',
    focus: 'peer-focus:ring-mw-blue-500'
  },
  success: {
    off: 'bg-mw-gray-200 dark:bg-mw-gray-700',
    on: 'bg-green-600',
    thumb: 'bg-white',
    focus: 'peer-focus:ring-green-500'
  },
  warning: {
    off: 'bg-mw-gray-200 dark:bg-mw-gray-700',
    on: 'bg-yellow-600',
    thumb: 'bg-white',
    focus: 'peer-focus:ring-yellow-500'
  },
  danger: {
    off: 'bg-mw-gray-200 dark:bg-mw-gray-700',
    on: 'bg-red-600',
    thumb: 'bg-white',
    focus: 'peer-focus:ring-red-500'
  }
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className, 
    label, 
    description, 
    error, 
    size = 'md', 
    variant = 'default',
    loading = false,
    showIcons = false,
    onLabel,
    offLabel,
    thumbIcon,
    trackIcon,
    animate = true,
    immediate = false,
    checked = false,
    onChange,
    ...props 
  }, ref) => {
    const sizeConfig = switchSizes[size]
    const variantConfig = switchVariants[variant]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (loading) return
      
      if (immediate) {
        onChange?.(e)
      } else {
        // Simulate async operation
        setTimeout(() => {
          onChange?.(e)
        }, 150)
      }
    }

    const renderThumbContent = () => {
      if (loading) {
        return <Loader2 className={clsx(sizeConfig.icon, 'animate-spin text-mw-gray-400')} />
      }

      if (thumbIcon) {
        return thumbIcon
      }

      if (showIcons) {
        return checked ? (
          <Check className={clsx(sizeConfig.icon, 'text-green-600')} />
        ) : (
          <X className={clsx(sizeConfig.icon, 'text-mw-gray-400')} />
        )
      }

      return null
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                ref={ref}
                className="sr-only peer"
                checked={checked}
                onChange={handleChange}
                disabled={loading || props.disabled}
                {...props}
              />
              <div
                className={clsx(
                  'relative rounded-full cursor-pointer',
                  animate ? 'transition-colors duration-200' : '',
                  'peer-focus:ring-2 peer-focus:ring-offset-2',
                  variantConfig.focus,
                  'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
                  error 
                    ? 'bg-red-200 peer-checked:bg-red-600' 
                    : checked 
                      ? variantConfig.on 
                      : variantConfig.off,
                  sizeConfig.track,
                  className
                )}
              >
                {/* Track Icon */}
                {trackIcon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {trackIcon}
                  </div>
                )}

                {/* Thumb */}
                <div
                  className={clsx(
                    'absolute left-0.5 top-0.5 rounded-full flex items-center justify-center',
                    animate ? 'transition-transform duration-200' : '',
                    checked ? 'peer-checked:' + sizeConfig.translate : '',
                    variantConfig.thumb,
                    sizeConfig.thumb,
                    loading && 'shadow-sm'
                  )}
                >
                  {renderThumbContent()}
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="flex flex-col">
              {label && (
                <label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 cursor-pointer">
                  {label}
                </label>
              )}
              {(onLabel || offLabel) && (
                <span className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                  {checked ? onLabel : offLabel}
                </span>
              )}
            </div>
          </div>

          {/* Status Indicator */}
          {loading && (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-mw-gray-400" />
              <span className="text-xs text-mw-gray-500">Updating...</span>
            </div>
          )}
        </div>

        {/* Description and Error */}
        {description && !error && (
          <p className={clsx('text-sm text-mw-gray-500 dark:text-mw-gray-400', sizeConfig.gap)}>
            {description}
          </p>
        )}
        {error && (
          <p className={clsx('text-sm text-red-600 dark:text-red-400', sizeConfig.gap)}>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'

// Enhanced Switch Group for multiple related switches
interface SwitchGroupProps {
  label?: string
  description?: string
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function SwitchGroup({ 
  label, 
  description, 
  children, 
  orientation = 'vertical',
  className 
}: SwitchGroupProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      {label && (
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-mw-gray-900 dark:text-white">
            {label}
          </h3>
          {description && (
            <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={clsx(
        orientation === 'horizontal' ? 'flex flex-wrap gap-6' : 'space-y-4'
      )}>
        {children}
      </div>
    </div>
  )
}

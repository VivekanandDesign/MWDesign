'use client'

import React from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

interface ChipProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onRemove?: () => void
  disabled?: boolean
  clickable?: boolean
  className?: string
  onClick?: () => void
}

const chipVariants = {
  default: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
  primary: 'bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/30 dark:text-mw-blue-300',
  secondary: 'bg-mw-gray-100 text-mw-gray-700 dark:bg-mw-gray-700 dark:text-mw-gray-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  outline: 'border border-mw-gray-300 text-mw-gray-700 dark:border-mw-gray-600 dark:text-mw-gray-300'
}

const chipSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
}

export function Chip({ 
  children, 
  variant = 'default', 
  size = 'md', 
  onRemove, 
  disabled = false,
  clickable = false,
  className,
  onClick
}: ChipProps) {
  const isInteractive = clickable || onClick

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium transition-colors duration-200',
        chipVariants[variant],
        chipSizes[size],
        isInteractive && !disabled && 'cursor-pointer hover:opacity-80',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled && onClick ? onClick : undefined}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) {
              onRemove()
            }
          }}
          disabled={disabled}
          className={clsx(
            'ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200',
            disabled && 'cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent'
          )}
          aria-label="Remove"
        >
          <X className={clsx(
            size === 'sm' ? 'w-3 h-3' : 
            size === 'md' ? 'w-3.5 h-3.5' : 
            'w-4 h-4'
          )} />
        </button>
      )}
    </span>
  )
}

// Alternative name for consistency with some design systems
export const Tag = Chip

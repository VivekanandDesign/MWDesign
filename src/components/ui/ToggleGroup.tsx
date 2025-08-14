'use client'

import React, { useState, createContext, useContext } from 'react'
import { clsx } from 'clsx'

export interface ToggleGroupProps {
  type: 'single' | 'multiple'
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  defaultValue?: string | string[]
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
  children: React.ReactNode
  className?: string
}

export interface ToggleGroupItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const ToggleGroupContext = createContext<{
  type: 'single' | 'multiple'
  value: string | string[]
  onValueChange: (value: string | string[]) => void
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  variant: 'default' | 'outline'
} | null>(null)

const toggleSizes = {
  sm: 'h-8 px-2 text-xs',
  md: 'h-9 px-3 text-sm',
  lg: 'h-10 px-4 text-base'
}

const toggleVariants = {
  default: {
    base: 'bg-transparent hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300',
    selected: 'bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white'
  },
  outline: {
    base: 'border border-mw-gray-200 dark:border-mw-gray-700 bg-transparent hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300',
    selected: 'bg-mw-gray-900 dark:bg-white text-white dark:text-mw-gray-900 border-mw-gray-900 dark:border-white'
  }
}

export function ToggleGroup({
  type,
  value,
  onValueChange,
  defaultValue,
  disabled = false,
  size = 'md',
  variant = 'default',
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue || (type === 'single' ? '' : [])
  )

  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <ToggleGroupContext.Provider
      value={{
        type,
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        size,
        variant
      }}
    >
      <div
        className={clsx(
          'inline-flex items-center justify-center rounded-md',
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export function ToggleGroupItem({
  value,
  disabled,
  className,
  children,
  onClick,
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext)
  
  if (!context) {
    throw new Error('ToggleGroupItem must be used within ToggleGroup')
  }

  const isSelected = context.type === 'single' 
    ? context.value === value
    : Array.isArray(context.value) && context.value.includes(value)

  const isDisabled = disabled || context.disabled

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    
    if (isDisabled) return

    if (context.type === 'single') {
      context.onValueChange(isSelected ? '' : value)
    } else {
      const currentValues = Array.isArray(context.value) ? context.value : []
      const newValues = isSelected
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      context.onValueChange(newValues)
    }
  }

  const variantConfig = toggleVariants[context.variant]

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      data-state={isSelected ? 'on' : 'off'}
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mw-blue-500',
        'disabled:pointer-events-none disabled:opacity-50',
        'first:rounded-l-md last:rounded-r-md [&:not(:first-child):not(:last-child)]:rounded-none',
        toggleSizes[context.size],
        isSelected ? variantConfig.selected : variantConfig.base,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Utility hook for controlled toggle groups
export function useToggleGroup(type: 'single' | 'multiple') {
  const [value, setValue] = useState<string | string[]>(
    type === 'single' ? '' : []
  )
  
  return {
    value,
    setValue,
    onValueChange: setValue
  }
}

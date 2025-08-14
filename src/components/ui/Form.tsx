'use client'

import React, { createContext, useContext } from 'react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface FormContextValue {
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const FormContext = createContext<FormContextValue>({})

interface FormProps {
  children: React.ReactNode
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  className?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  layout?: 'vertical' | 'horizontal' | 'inline'
}

interface FormSectionProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}

interface FormGroupProps {
  children: React.ReactNode
  className?: string
  required?: boolean
}

interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

interface FormLabelProps {
  children: React.ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
}

interface FormControlProps {
  children: React.ReactNode
  className?: string
}

interface FormDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface FormErrorProps {
  children: React.ReactNode
  className?: string
}

interface FormActionsProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

const formLayouts = {
  vertical: 'space-y-6',
  horizontal: 'space-y-6',
  inline: 'flex flex-wrap items-end gap-4'
}

const formSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

export function Form({
  children,
  onSubmit,
  className,
  disabled = false,
  size = 'md',
  layout = 'vertical'
}: FormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      event.preventDefault()
      onSubmit(event)
    }
  }

  return (
    <FormContext.Provider value={{ disabled, size }}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          formLayouts[layout],
          formSizes[size],
          className
        )}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

export function FormSection({
  children,
  title,
  description,
  className
}: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-medium text-mw-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

export function FormGroup({
  children,
  className,
  required = false
}: FormGroupProps) {
  return (
    <div className={cn('space-y-2', className)} data-required={required}>
      {children}
    </div>
  )
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  )
}

export function FormLabel({
  children,
  htmlFor,
  required = false,
  className
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300',
        className
      )}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  )
}

export function FormControl({ children, className }: FormControlProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  )
}

export function FormDescription({ children, className }: FormDescriptionProps) {
  return (
    <p className={cn(
      'text-xs text-mw-gray-500 dark:text-mw-gray-400',
      className
    )}>
      {children}
    </p>
  )
}

export function FormError({ children, className }: FormErrorProps) {
  return (
    <p className={cn(
      'text-xs text-red-600 dark:text-red-400 flex items-center gap-1',
      className
    )}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {children}
    </p>
  )
}

export function FormActions({
  children,
  className,
  align = 'left'
}: FormActionsProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return (
    <div className={cn(
      'flex items-center gap-3 pt-4',
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  )
}

// Hook to access form context
export function useFormContext() {
  return useContext(FormContext)
}

// Fieldset component for grouping related fields
interface FieldsetProps {
  children: React.ReactNode
  legend?: string
  className?: string
  disabled?: boolean
}

export function Fieldset({
  children,
  legend,
  className,
  disabled = false
}: FieldsetProps) {
  return (
    <fieldset
      disabled={disabled}
      className={cn(
        'border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4 space-y-4',
        disabled && 'opacity-50',
        className
      )}
    >
      {legend && (
        <legend className="px-2 text-sm font-medium text-mw-gray-900 dark:text-white">
          {legend}
        </legend>
      )}
      {children}
    </fieldset>
  )
}

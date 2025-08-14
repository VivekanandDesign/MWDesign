'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'

export interface AccordionProps {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
}

export interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

export interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionContext = React.createContext<{
  type: 'single' | 'multiple'
  value: string | string[]
  onValueChange: (value: string | string[]) => void
} | null>(null)

const AccordionItemContext = React.createContext<{
  value: string
  isOpen: boolean
  toggle: () => void
} | null>(null)

export function Accordion({ 
  type = 'single', 
  defaultValue, 
  value, 
  onValueChange, 
  children, 
  className 
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  )
  
  const currentValue = value ?? internalValue
  const handleValueChange = onValueChange ?? setInternalValue

  return (
    <AccordionContext.Provider value={{ type, value: currentValue, onValueChange: handleValueChange }}>
      <div className={clsx('w-full', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('AccordionItem must be used within Accordion')
  }

  const isOpen = context.type === 'multiple' 
    ? (context.value as string[]).includes(value)
    : context.value === value

  const toggle = () => {
    if (context.type === 'multiple') {
      const currentValues = context.value as string[]
      const newValues = isOpen
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      context.onValueChange(newValues)
    } else {
      context.onValueChange(isOpen ? '' : value)
    }
  }

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, toggle }}>
      <div className={clsx('border-b border-mw-gray-200 dark:border-mw-gray-700', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionTrigger must be used within AccordionItem')
  }

  return (
    <button
      type="button"
      onClick={context.toggle}
      className={clsx(
        'flex w-full items-center justify-between py-4 font-medium transition-all',
        'text-left text-mw-gray-900 dark:text-mw-gray-100',
        'hover:text-mw-blue-600 dark:hover:text-mw-blue-400',
        'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:ring-offset-2 rounded-sm',
        className
      )}
    >
      {children}
      <ChevronDown
        className={clsx(
          'h-4 w-4 shrink-0 transition-transform duration-200',
          context.isOpen && 'rotate-180'
        )}
      />
    </button>
  )
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionContent must be used within AccordionItem')
  }

  return (
    <div
      className={clsx(
        'overflow-hidden transition-all duration-300',
        context.isOpen ? 'animate-in slide-in-from-top-1' : 'animate-out slide-out-to-top-1 hidden'
      )}
    >
      <div className={clsx('pb-4 pt-0 text-mw-gray-600 dark:text-mw-gray-400', className)}>
        {children}
      </div>
    </div>
  )
}

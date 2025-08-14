'use client'

import React, { useState, createContext, useContext } from 'react'
import { clsx } from 'clsx'

export interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children: React.ReactNode
}

export interface CollapsibleTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CollapsibleContext = createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
  disabled: boolean
} | null>(null)

export function Collapsible({ 
  open = false, 
  onOpenChange, 
  disabled = false, 
  children 
}: CollapsibleProps) {
  return (
    <CollapsibleContext.Provider value={{ 
      open, 
      onOpenChange: onOpenChange || (() => {}), 
      disabled 
    }}>
      {children}
    </CollapsibleContext.Provider>
  )
}

export function CollapsibleTrigger({ 
  asChild, 
  children, 
  onClick, 
  className,
  ...props 
}: CollapsibleTriggerProps) {
  const context = useContext(CollapsibleContext)
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (!context?.disabled) {
      context?.onOpenChange(!context.open)
    }
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      disabled: context?.disabled,
      'aria-expanded': context?.open,
      'data-state': context?.open ? 'open' : 'closed',
      ...props
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={context?.disabled}
      aria-expanded={context?.open}
      data-state={context?.open ? 'open' : 'closed'}
      className={clsx(
        'flex items-center justify-between w-full text-left',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function CollapsibleContent({ 
  children, 
  className, 
  ...props 
}: CollapsibleContentProps) {
  const context = useContext(CollapsibleContext)

  return (
    <div
      data-state={context?.open ? 'open' : 'closed'}
      className={clsx(
        'overflow-hidden transition-all duration-300 ease-in-out',
        context?.open 
          ? 'animate-in slide-in-from-top-1 fade-in-0' 
          : 'animate-out slide-out-to-top-1 fade-out-0 hidden',
        className
      )}
      {...props}
    >
      {context?.open && (
        <div className="pt-1">
          {children}
        </div>
      )}
    </div>
  )
}

// Utility hook for controlled collapsibles
export function useCollapsible() {
  const [open, setOpen] = useState(false)
  
  return {
    open,
    setOpen,
    onOpenChange: setOpen,
    toggle: () => setOpen(prev => !prev)
  }
}

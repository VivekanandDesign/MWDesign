'use client'

import React, { useState, useEffect, createContext, useContext, isValidElement, cloneElement } from 'react'
import { clsx } from 'clsx'
import { X } from 'lucide-react'
import { Button } from './Button'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  showCloseButton?: boolean
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  asChild?: boolean
}

const DialogContext = createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({ children, asChild, onClick, ...props }: DialogTriggerProps) {
  const context = useContext(DialogContext)
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e)
    context?.onOpenChange(true)
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      onClick: handleClick
    })
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export function DialogContent({ 
  children, 
  className, 
  showCloseButton = true,
  ...props 
}: DialogContentProps) {
  const context = useContext(DialogContext)
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        context?.onOpenChange(false)
      }
    }

    if (context?.open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [context?.open])

  if (!context?.open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => context.onOpenChange(false)}
      />
      
      {/* Content */}
      <div
        className={clsx(
          'relative z-50 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto',
          'bg-white dark:bg-mw-gray-800 rounded-lg shadow-lg border border-mw-gray-200 dark:border-mw-gray-700',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          className
        )}
        {...props}
      >
        {showCloseButton && (
          <button
            onClick={() => context.onOpenChange(false)}
            className="absolute top-4 right-4 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <div className={clsx('flex flex-col space-y-1.5 p-6 pb-2', className)} {...props}>
      {children}
    </div>
  )
}

export function DialogFooter({ children, className, ...props }: DialogFooterProps) {
  return (
    <div 
      className={clsx('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-2', className)} 
      {...props}
    >
      {children}
    </div>
  )
}

export function DialogTitle({ children, className, ...props }: DialogTitleProps) {
  return (
    <h2 
      className={clsx('text-lg font-semibold text-mw-gray-900 dark:text-white', className)} 
      {...props}
    >
      {children}
    </h2>
  )
}

export function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  return (
    <p 
      className={clsx('text-sm text-mw-gray-600 dark:text-mw-gray-300', className)} 
      {...props}
    >
      {children}
    </p>
  )
}

// Utility hook for controlled dialogs
export function useDialog() {
  const [open, setOpen] = useState(false)
  
  return {
    open,
    setOpen,
    onOpenChange: setOpen,
    close: () => setOpen(false),
    toggle: () => setOpen(prev => !prev)
  }
}

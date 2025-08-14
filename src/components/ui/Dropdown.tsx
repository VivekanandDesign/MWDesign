import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { clsx } from 'clsx'

interface DropdownContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

export interface DropdownProps {
  children: ReactNode
  className?: string
}

export const Dropdown = ({ children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen(!isOpen)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      <div ref={dropdownRef} className={clsx('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export interface DropdownTriggerProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

export const DropdownTrigger = ({ children, asChild, className }: DropdownTriggerProps) => {
  const context = useContext(DropdownContext)
  
  if (!context) {
    throw new Error('DropdownTrigger must be used within a Dropdown')
  }

  if (asChild) {
    // Clone the child element and add click handler
    return (
      <div onClick={context.toggle} className={className}>
        {children}
      </div>
    )
  }

  return (
    <button
      onClick={context.toggle}
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'bg-white dark:bg-mw-gray-800 border border-mw-gray-300 dark:border-mw-gray-600',
        'text-mw-gray-700 dark:text-mw-gray-300',
        'hover:bg-mw-gray-50 dark:hover:bg-mw-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:ring-offset-2',
        className
      )}
      aria-expanded={context.isOpen}
      aria-haspopup="true"
    >
      {children}
      <svg
        className={clsx(
          'ml-2 h-4 w-4 transition-transform',
          context.isOpen && 'rotate-180'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export interface DropdownContentProps {
  children: ReactNode
  className?: string
  align?: 'left' | 'right' | 'center'
}

export const DropdownContent = ({ children, className, align = 'left' }: DropdownContentProps) => {
  const context = useContext(DropdownContext)
  
  if (!context) {
    throw new Error('DropdownContent must be used within a Dropdown')
  }

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  }

  if (!context.isOpen) return null

  return (
    <div
      className={clsx(
        'absolute z-50 mt-2 min-w-[200px] rounded-md shadow-lg',
        'bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700',
        'ring-1 ring-black ring-opacity-5',
        alignmentClasses[align],
        className
      )}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

export interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const DropdownItem = ({ children, onClick, disabled, className }: DropdownItemProps) => {
  const context = useContext(DropdownContext)

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
      context?.setIsOpen(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        'w-full text-left px-4 py-2 text-sm',
        'text-mw-gray-700 dark:text-mw-gray-300',
        'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700',
        'focus:bg-mw-gray-100 dark:focus:bg-mw-gray-700 focus:outline-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role="menuitem"
    >
      {children}
    </button>
  )
}

export interface DropdownSeparatorProps {
  className?: string
}

export const DropdownSeparator = ({ className }: DropdownSeparatorProps) => {
  return (
    <div
      className={clsx(
        'my-1 h-px bg-mw-gray-200 dark:bg-mw-gray-700',
        className
      )}
      role="separator"
    />
  )
}

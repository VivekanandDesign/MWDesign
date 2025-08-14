import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ModalContextType {
  isOpen: boolean
  onClose: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  size = 'md'
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4'
  }

  if (!isOpen) return null

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={handleBackdropClick}
      >
        <div
          ref={modalRef}
          className={clsx(
            'relative w-full rounded-lg bg-white dark:bg-mw-gray-800 shadow-xl',
            'max-h-[90vh] overflow-hidden',
            sizeClasses[size],
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}

export interface ModalHeaderProps {
  children: ReactNode
  className?: string
}

export const ModalHeader = ({ children, className }: ModalHeaderProps) => {
  const context = useContext(ModalContext)
  
  return (
    <div className={clsx(
      'flex items-center justify-between p-6 border-b border-mw-gray-200 dark:border-mw-gray-700',
      className
    )}>
      <div className="flex-1">{children}</div>
      <button
        onClick={context?.onClose}
        className="ml-4 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export interface ModalBodyProps {
  children: ReactNode
  className?: string
}

export const ModalBody = ({ children, className }: ModalBodyProps) => {
  return (
    <div className={clsx('p-6 overflow-y-auto', className)}>
      {children}
    </div>
  )
}

export interface ModalFooterProps {
  children: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={clsx(
      'flex items-center justify-end space-x-3 p-6 border-t border-mw-gray-200 dark:border-mw-gray-700',
      className
    )}>
      {children}
    </div>
  )
}

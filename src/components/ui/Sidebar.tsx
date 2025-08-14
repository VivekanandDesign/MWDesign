'use client'

import React, { useState } from 'react'
import { X, Menu, ChevronLeft, ChevronRight } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface SidebarProps {
  children: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  position?: 'left' | 'right'
  variant?: 'overlay' | 'push' | 'persistent'
  width?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  collapsible?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

interface SidebarHeaderProps {
  children: React.ReactNode
  className?: string
}

interface SidebarContentProps {
  children: React.ReactNode
  className?: string
}

interface SidebarFooterProps {
  children: React.ReactNode
  className?: string
}

const sidebarWidths = {
  sm: 'w-64',
  md: 'w-72',
  lg: 'w-80',
  xl: 'w-96'
}

const collapsedWidth = 'w-16'

export function Sidebar({
  children,
  isOpen = true,
  onOpenChange,
  position = 'left',
  variant = 'persistent',
  width = 'md',
  className,
  collapsible = false,
  collapsed = false,
  onCollapsedChange
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen)
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed)
  
  const open = onOpenChange ? isOpen : internalOpen
  const isCollapsed = onCollapsedChange ? collapsed : internalCollapsed
  
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen)
    } else {
      setInternalOpen(newOpen)
    }
  }
  
  const handleCollapsedChange = (newCollapsed: boolean) => {
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed)
    } else {
      setInternalCollapsed(newCollapsed)
    }
  }

  if (variant === 'overlay') {
    return (
      <>
        {/* Backdrop */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => handleOpenChange(false)}
          />
        )}
        
        {/* Sidebar */}
        <div
          className={cn(
            'fixed top-0 h-full bg-white dark:bg-mw-gray-900 border-r border-mw-gray-200 dark:border-mw-gray-700 z-50 transition-transform duration-300 ease-in-out',
            position === 'left' ? 'left-0' : 'right-0',
            sidebarWidths[width],
            open 
              ? 'translate-x-0' 
              : position === 'left' 
                ? '-translate-x-full' 
                : 'translate-x-full',
            className
          )}
        >
          {children}
        </div>
      </>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col bg-white dark:bg-mw-gray-900 border-r border-mw-gray-200 dark:border-mw-gray-700 transition-all duration-300 ease-in-out',
        collapsible && isCollapsed ? collapsedWidth : sidebarWidths[width],
        !open && variant === 'push' && 'hidden',
        className
      )}
    >
      {collapsible && (
        <div className="flex justify-end p-2 border-b border-mw-gray-200 dark:border-mw-gray-700">
          <button
            onClick={() => handleCollapsedChange(!isCollapsed)}
            className="p-1 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      
      <div className={cn('flex-1 overflow-hidden', isCollapsed && 'px-2')}>
        {children}
      </div>
    </div>
  )
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return (
    <div className={cn(
      'px-4 py-4 border-b border-mw-gray-200 dark:border-mw-gray-700',
      className
    )}>
      {children}
    </div>
  )
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={cn(
      'flex-1 overflow-y-auto px-4 py-4',
      className
    )}>
      {children}
    </div>
  )
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div className={cn(
      'px-4 py-4 border-t border-mw-gray-200 dark:border-mw-gray-700',
      className
    )}>
      {children}
    </div>
  )
}

// Mobile sidebar trigger
interface SidebarTriggerProps {
  onClick: () => void
  className?: string
}

export function SidebarTrigger({ onClick, className }: SidebarTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-md text-mw-gray-500 hover:text-mw-gray-700 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 dark:hover:text-mw-gray-300 lg:hidden',
        className
      )}
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}

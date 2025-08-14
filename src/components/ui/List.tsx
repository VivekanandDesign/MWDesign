'use client'

import React from 'react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface ListProps {
  children: React.ReactNode
  variant?: 'ordered' | 'unordered' | 'none'
  size?: 'sm' | 'md' | 'lg'
  spacing?: 'tight' | 'normal' | 'loose'
  className?: string
}

interface ListItemProps {
  children: React.ReactNode
  className?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

const listVariants = {
  ordered: 'list-decimal',
  unordered: 'list-disc',
  none: 'list-none'
}

const listSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const listSpacing = {
  tight: 'space-y-1',
  normal: 'space-y-2', 
  loose: 'space-y-4'
}

export function List({ 
  children, 
  variant = 'unordered', 
  size = 'md',
  spacing = 'normal',
  className 
}: ListProps) {
  const Component = variant === 'ordered' ? 'ol' : 'ul'
  
  return (
    <Component
      className={cn(
        listVariants[variant],
        listSizes[size],
        listSpacing[spacing],
        variant !== 'none' && 'pl-5',
        'text-mw-gray-700 dark:text-mw-gray-300',
        className
      )}
    >
      {children}
    </Component>
  )
}

export function ListItem({ 
  children, 
  className,
  startContent,
  endContent 
}: ListItemProps) {
  return (
    <li className={cn('flex items-start', className)}>
      {startContent && (
        <div className="flex-shrink-0 mr-2">
          {startContent}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {children}
      </div>
      {endContent && (
        <div className="flex-shrink-0 ml-2">
          {endContent}
        </div>
      )}
    </li>
  )
}

// Specialized list components
interface DescriptionListProps {
  items: Array<{
    term: React.ReactNode
    description: React.ReactNode
  }>
  layout?: 'vertical' | 'horizontal'
  className?: string
}

export function DescriptionList({ 
  items, 
  layout = 'vertical',
  className 
}: DescriptionListProps) {
  return (
    <dl className={cn(
      layout === 'horizontal' 
        ? 'grid grid-cols-3 gap-x-4 gap-y-2'
        : 'space-y-3',
      className
    )}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <dt className={cn(
            'font-medium text-mw-gray-900 dark:text-white',
            layout === 'horizontal' ? 'col-span-1' : 'mb-1'
          )}>
            {item.term}
          </dt>
          <dd className={cn(
            'text-mw-gray-600 dark:text-mw-gray-300',
            layout === 'horizontal' ? 'col-span-2' : ''
          )}>
            {item.description}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

// Navigation list for menus
interface NavigationListProps {
  items: Array<{
    label: React.ReactNode
    href?: string
    onClick?: () => void
    active?: boolean
    disabled?: boolean
    icon?: React.ReactNode
  }>
  className?: string
}

export function NavigationList({ items, className }: NavigationListProps) {
  return (
    <ul className={cn('space-y-1', className)}>
      {items.map((item, index) => (
        <li key={index}>
          {item.href ? (
            <a
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                item.active
                  ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                  : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 hover:text-mw-gray-900 dark:hover:text-white',
                item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              {item.icon && (
                <span className="mr-2">
                  {item.icon}
                </span>
              )}
              {item.label}
            </a>
          ) : (
            <button
              onClick={item.onClick}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-left',
                item.active
                  ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                  : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 hover:text-mw-gray-900 dark:hover:text-white',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {item.icon && (
                <span className="mr-2">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

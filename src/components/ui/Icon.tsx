'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  className?: string
  onClick?: () => void
}

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4', 
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
}

const iconVariants = {
  default: 'text-mw-gray-600 dark:text-mw-gray-400',
  primary: 'text-mw-blue-600 dark:text-mw-blue-400',
  secondary: 'text-mw-gray-500 dark:text-mw-gray-500',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400'
}

export function Icon({ 
  icon: IconComponent, 
  size = 'md', 
  variant = 'default',
  className,
  onClick,
  ...props 
}: IconProps) {
  return (
    <IconComponent 
      className={cn(
        iconSizes[size],
        iconVariants[variant],
        onClick && 'cursor-pointer hover:opacity-75 transition-opacity',
        className
      )}
      onClick={onClick}
      {...props}
    />
  )
}

// Commonly used icons with pre-configured variants
export function ChevronDownIcon(props: Omit<IconProps, 'icon'>) {
  const { ChevronDown } = require('lucide-react')
  return <Icon icon={ChevronDown} {...props} />
}

export function ChevronUpIcon(props: Omit<IconProps, 'icon'>) {
  const { ChevronUp } = require('lucide-react')
  return <Icon icon={ChevronUp} {...props} />
}

export function ChevronLeftIcon(props: Omit<IconProps, 'icon'>) {
  const { ChevronLeft } = require('lucide-react')
  return <Icon icon={ChevronLeft} {...props} />
}

export function ChevronRightIcon(props: Omit<IconProps, 'icon'>) {
  const { ChevronRight } = require('lucide-react')
  return <Icon icon={ChevronRight} {...props} />
}

export function SearchIcon(props: Omit<IconProps, 'icon'>) {
  const { Search } = require('lucide-react')
  return <Icon icon={Search} {...props} />
}

export function CloseIcon(props: Omit<IconProps, 'icon'>) {
  const { X } = require('lucide-react')
  return <Icon icon={X} {...props} />
}

export function CheckIcon(props: Omit<IconProps, 'icon'>) {
  const { Check } = require('lucide-react')
  return <Icon icon={Check} {...props} />
}

export function PlusIcon(props: Omit<IconProps, 'icon'>) {
  const { Plus } = require('lucide-react')
  return <Icon icon={Plus} {...props} />
}

export function MinusIcon(props: Omit<IconProps, 'icon'>) {
  const { Minus } = require('lucide-react')
  return <Icon icon={Minus} {...props} />
}

export function InfoIcon(props: Omit<IconProps, 'icon'>) {
  const { Info } = require('lucide-react')
  return <Icon icon={Info} {...props} />
}

export function AlertTriangleIcon(props: Omit<IconProps, 'icon'>) {
  const { AlertTriangle } = require('lucide-react')
  return <Icon icon={AlertTriangle} {...props} />
}

export function AlertCircleIcon(props: Omit<IconProps, 'icon'>) {
  const { AlertCircle } = require('lucide-react')
  return <Icon icon={AlertCircle} {...props} />
}

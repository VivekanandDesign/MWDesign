// Enhanced icon component for the Moving Walls Design System
import React from 'react'
import { LucideProps } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

// Type-safe icon component props
export interface IconComponentProps extends LucideProps {
  name: string
  size?: number
  className?: string
}

// Dynamic icon component that can render any Lucide icon by name
export const DynamicIcon: React.FC<IconComponentProps> = ({ 
  name, 
  size = 24, 
  className = '', 
  ...props 
}) => {
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`)
    return (
      <div 
        className={`inline-flex items-center justify-center bg-gray-200 text-gray-500 text-xs ${className}`}
        style={{ width: size, height: size }}
      >
        ?
      </div>
    )
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      {...props}
    />
  )
}

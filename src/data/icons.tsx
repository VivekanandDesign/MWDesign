// Enhanced icon data and utilities for the Moving Walls Design System
import React from 'react'
import { LucideProps } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

// Import generated icon data
import iconData from './lucide-icons.json'

export interface IconCategory {
  name: string
  description: string
  icons: string[]
}

export interface IconData {
  metadata: {
    totalIcons: number
    totalCategories: number
    generatedAt: string
    lucideVersion: string
  }
  categories: Record<string, IconCategory>
  allIcons: string[]
}

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

// Get all available icons data
export const getIconsData = (): IconData => iconData as IconData

// Get icons by category
export const getIconsByCategory = (categoryId: string): string[] => {
  const data = getIconsData()
  return data.categories[categoryId]?.icons || []
}

// Get all category IDs
export const getCategoryIds = (): string[] => {
  const data = getIconsData()
  return Object.keys(data.categories)
}

// Get category information
export const getCategoryInfo = (categoryId: string): IconCategory | undefined => {
  const data = getIconsData()
  return data.categories[categoryId]
}

// Search icons by name
export const searchIcons = (query: string, maxResults = 50): string[] => {
  const data = getIconsData()
  const lowercaseQuery = query.toLowerCase()
  
  if (!query.trim()) {
    return data.allIcons.slice(0, maxResults)
  }

  // Exact matches first
  const exactMatches = data.allIcons.filter(icon => 
    icon.toLowerCase() === lowercaseQuery
  )

  // Starts with matches
  const startsWithMatches = data.allIcons.filter(icon => 
    icon.toLowerCase().startsWith(lowercaseQuery) && 
    !exactMatches.includes(icon)
  )

  // Contains matches
  const containsMatches = data.allIcons.filter(icon => 
    icon.toLowerCase().includes(lowercaseQuery) && 
    !exactMatches.includes(icon) && 
    !startsWithMatches.includes(icon)
  )

  return [
    ...exactMatches,
    ...startsWithMatches,
    ...containsMatches
  ].slice(0, maxResults)
}

// Filter icons by multiple categories
export const filterIconsByCategories = (categoryIds: string[]): string[] => {
  const data = getIconsData()
  const allCategoryIcons = categoryIds.flatMap(id => 
    data.categories[id]?.icons || []
  )
  return [...new Set(allCategoryIcons)] // Remove duplicates
}

// Get random icons
export const getRandomIcons = (count = 10): string[] => {
  const data = getIconsData()
  const shuffled = [...data.allIcons].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Check if an icon exists
export const iconExists = (iconName: string): boolean => {
  return (LucideIcons as any)[iconName] !== undefined
}

// Get icon usage statistics
export const getIconStats = () => {
  const data = getIconsData()
  return {
    total: data.metadata.totalIcons,
    categories: data.metadata.totalCategories,
    averagePerCategory: Math.round(data.metadata.totalIcons / data.metadata.totalCategories),
    largestCategory: Object.entries(data.categories).reduce((max, [id, category]) => 
      category.icons.length > max.count 
        ? { id, name: category.name, count: category.icons.length }
        : max
    , { id: '', name: '', count: 0 }),
    generatedAt: data.metadata.generatedAt,
    version: data.metadata.lucideVersion
  }
}

// Export the raw data for advanced usage
export { iconData }

// Re-export commonly used Lucide icons for backward compatibility
export {
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Search, Settings, Menu, X, Plus, Minus,
  Heart, Star, User, Users, Mail, Phone,
  Calendar, Clock, Home, File, Folder,
  Edit, Trash, Copy, Share, Download, Upload
} from 'lucide-react'

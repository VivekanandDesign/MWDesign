// Utility functions for MW Design System

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats icon names from kebab-case to PascalCase
 */
export function formatIconName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Generates code snippets for icon usage
 */
export function generateIconCode(iconName: string, framework: 'react' | 'vue' | 'html' = 'react'): string {
  const formattedName = formatIconName(iconName)
  
  switch (framework) {
    case 'react':
      return `import { ${formattedName} } from 'lucide-react'

<${formattedName} size={24} />`
    case 'vue':
      return `<template>
  <${formattedName} :size="24" />
</template>

<script>
import { ${formattedName} } from 'lucide-vue-next'
export default {
  components: { ${formattedName} }
}
</script>`
    case 'html':
      return `<i data-lucide="${iconName}"></i>

<!-- Include Lucide script -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>lucide.createIcons();</script>`
    default:
      return ''
  }
}

/**
 * Debounce function for search and input operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Converts hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/**
 * Generates HSL color variations
 */
export function generateColorVariations(baseColor: string, steps = 10) {
  // This is a simplified version - in a real implementation,
  // you'd want more sophisticated color manipulation
  const variations = []
  for (let i = 0; i < steps; i++) {
    const lightness = (i / (steps - 1)) * 100
    variations.push(`hsl(${baseColor}, ${lightness}%)`)
  }
  return variations
}

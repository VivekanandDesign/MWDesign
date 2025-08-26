'use client'

import { useState } from 'react'
import { Copy, Check, Palette, Type, Sun, Moon, Ruler, Square, Layers, Zap, Grid3X3, Monitor, Tablet, Smartphone, Eye, Target, MousePointer, Accessibility } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'

// Moving Walls Brand Colors
const brandColors = {
  light: {
    primary: '#1d65af',    // Deep Blue for light mode
    secondary: '#4cb0e4',  // Light Blue for light mode
    success: '#2d7d32',    // Success Green for light mode
    danger: '#d63535',     // Error Red for light mode
    warning: '#f9a825',    // Warning Orange for light mode
    info: '#0188d1',       // Info Blue for light mode
    neutral: '#717171'     // Neutral Gray for light mode
  },
  dark: {
    primary: '#2176cc',    // Bright Blue for dark mode
    secondary: '#60b8e7',  // Light Blue for dark mode
    success: '#38983d',    // Bright Green for dark mode
    danger: '#e64646',     // Bright Red for dark mode
    warning: '#ffb74d',    // Bright Orange for dark mode
    info: '#29b6f6',       // Bright Info Blue for dark mode
    neutral: '#9e9e9e'     // Light Gray for dark mode
  }
}

const colorDescriptions = {
  primary: {
    name: 'Energy Blue',
    description: 'Our primary brand color representing innovation, trust, and breakthrough thinking'
  },
  secondary: {
    name: 'Breakthrough Orange',
    description: 'Secondary color symbolizing momentum, achievement, and pushing boundaries'
  },
  flow: {
    name: 'Flow Teal',
    description: 'Accent color representing seamless experiences, harmony, and smooth execution'
  }
}

const typographyScale = {
  'Display Large': { size: '4.5rem', lineHeight: '1', weight: '700', usage: 'Hero headlines, major page titles' },
  'Display Medium': { size: '3.75rem', lineHeight: '1', weight: '700', usage: 'Section headlines, large displays' },
  'Display Small': { size: '3rem', lineHeight: '1.2', weight: '600', usage: 'Card titles, prominent text' },
  'Heading 1': { size: '2.25rem', lineHeight: '1.2', weight: '600', usage: 'Page headings, main sections' },
  'Heading 2': { size: '1.875rem', lineHeight: '1.3', weight: '600', usage: 'Subsection headings' },
  'Heading 3': { size: '1.5rem', lineHeight: '1.4', weight: '500', usage: 'Component headings' },
  'Heading 4': { size: '1.25rem', lineHeight: '1.5', weight: '500', usage: 'Small headings, labels' },
  'Body Large': { size: '1.125rem', lineHeight: '1.6', weight: '400', usage: 'Lead paragraphs, introductions' },
  'Body Medium': { size: '1rem', lineHeight: '1.6', weight: '400', usage: 'Default body text, descriptions' },
  'Body Small': { size: '0.875rem', lineHeight: '1.5', weight: '400', usage: 'Secondary text, captions' },
  'Caption': { size: '0.75rem', lineHeight: '1.4', weight: '400', usage: 'Labels, metadata, fine print' }
}

const spacingScale = {
  '1': { px: '4px', rem: '0.25rem', usage: 'Border widths, fine adjustments' },
  '2': { px: '8px', rem: '0.5rem', usage: 'Small gaps, compact spacing' },
  '3': { px: '12px', rem: '0.75rem', usage: 'Text spacing, small margins' },
  '4': { px: '16px', rem: '1rem', usage: 'Default spacing, component padding' },
  '5': { px: '20px', rem: '1.25rem', usage: 'Medium spacing, button padding' },
  '6': { px: '24px', rem: '1.5rem', usage: 'Large component spacing' },
  '8': { px: '32px', rem: '2rem', usage: 'Section spacing, large gaps' },
  '10': { px: '40px', rem: '2.5rem', usage: 'Layout spacing, large margins' },
  '12': { px: '48px', rem: '3rem', usage: 'Section padding, major spacing' },
  '16': { px: '64px', rem: '4rem', usage: 'Page sections, hero spacing' },
  '20': { px: '80px', rem: '5rem', usage: 'Large sections, major layouts' },
  '24': { px: '96px', rem: '6rem', usage: 'Page-level spacing' },
  '32': { px: '128px', rem: '8rem', usage: 'Maximum spacing, special layouts' }
}

const borderRadiusScale = {
  'none': { px: '0px', rem: '0rem', usage: 'Sharp corners, no rounding' },
  'sm': { px: '4px', rem: '0.25rem', usage: 'Subtle rounding for small elements' },
  'md': { px: '6px', rem: '0.375rem', usage: 'Standard rounding (system default)' },
  'lg': { px: '8px', rem: '0.5rem', usage: 'Prominent rounding for larger elements' },
  'xl': { px: '12px', rem: '0.75rem', usage: 'Strong rounding for cards and containers' },
  '2xl': { px: '16px', rem: '1rem', usage: 'Very rounded corners for special elements' },
  'full': { px: '9999px', rem: '9999px', usage: 'Circular elements, pills, badges' }
}

const elevationScale = {
  'none': { 
    shadow: 'none', 
    usage: 'Flat elements, disabled states',
    example: 'Disabled buttons, flat cards'
  },
  'sm': { 
    shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
    usage: 'Subtle depth for small elements',
    example: 'Input fields, small cards'
  },
  'md': { 
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
    usage: 'Standard elevation for components',
    example: 'Buttons, standard cards'
  },
  'lg': { 
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
    usage: 'Elevated components, hover states',
    example: 'Dropdown menus, tooltips'
  },
  'xl': { 
    shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
    usage: 'High elevation for important elements',
    example: 'Modals, important notifications'
  },
  '2xl': { 
    shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
    usage: 'Maximum elevation for overlays',
    example: 'Modal overlays, full-screen dialogs'
  }
}

const animationTokens = {
  duration: {
    'fast': { ms: '150ms', usage: 'Quick interactions, micro-animations' },
    'base': { ms: '200ms', usage: 'Standard transitions, hover effects' },
    'slow': { ms: '300ms', usage: 'Complex animations, page transitions' },
    'slower': { ms: '500ms', usage: 'Emphasized animations, loading states' }
  },
  easing: {
    'linear': { curve: 'linear', usage: 'Constant speed, loading indicators' },
    'ease-in': { curve: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Starting slow, accelerating' },
    'ease-out': { curve: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Starting fast, decelerating' },
    'ease-in-out': { curve: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Smooth start and end' },
    'bounce': { curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', usage: 'Playful, attention-grabbing' }
  }
}

const gridSystemTokens = {
  breakpoints: {
    'xs': { size: '0px', container: '100%', maxWidth: '480px', usage: 'Mobile phones (< 480px)', icon: 'smartphone' },
    'sm': { size: '480px', container: '480px', maxWidth: '640px', usage: 'Small tablets (≥ 480px)', icon: 'tablet' },
    'md': { size: '768px', container: '768px', maxWidth: '768px', usage: 'Tablets (≥ 768px)', icon: 'tablet' },
    'lg': { size: '1024px', container: '1024px', maxWidth: '1024px', usage: 'Laptops (≥ 1024px)', icon: 'monitor' },
    'xl': { size: '1280px', container: '1280px', maxWidth: '1280px', usage: 'Desktops (≥ 1280px)', icon: 'monitor' },
    '2xl': { size: '1536px', container: '1536px', maxWidth: '1536px', usage: 'Large screens (≥ 1536px)', icon: 'monitor' }
  },
  columns: {
    '1': { width: '8.333333%', flex: '0 0 8.333333%', usage: 'Sidebar, small widgets' },
    '2': { width: '16.666667%', flex: '0 0 16.666667%', usage: 'Navigation, narrow columns' },
    '3': { width: '25%', flex: '0 0 25%', usage: 'Cards in 4-column layout' },
    '4': { width: '33.333333%', flex: '0 0 33.333333%', usage: 'Cards in 3-column layout' },
    '6': { width: '50%', flex: '0 0 50%', usage: 'Two-column layout' },
    '8': { width: '66.666667%', flex: '0 0 66.666667%', usage: 'Main content area' },
    '9': { width: '75%', flex: '0 0 75%', usage: 'Primary content section' },
    '12': { width: '100%', flex: '0 0 100%', usage: 'Full-width elements' }
  },
  gaps: {
    '0': { size: '0px', rem: '0rem', usage: 'No spacing between grid items' },
    '1': { size: '4px', rem: '0.25rem', usage: 'Tight layouts, compact grids' },
    '2': { size: '8px', rem: '0.5rem', usage: 'Small component grids' },
    '4': { size: '16px', rem: '1rem', usage: 'Standard grid spacing' },
    '6': { size: '24px', rem: '1.5rem', usage: 'Comfortable grid spacing' },
    '8': { size: '32px', rem: '2rem', usage: 'Generous grid spacing' },
    '12': { size: '48px', rem: '3rem', usage: 'Section-level grid spacing' }
  }
}

const zIndexTokens = {
  'auto': { value: 'auto', usage: 'Default stacking, follows document flow' },
  '0': { value: '0', usage: 'Base level, no elevation' },
  '10': { value: '10', usage: 'Above base content' },
  '20': { value: '20', usage: 'Slightly elevated elements' },
  '30': { value: '30', usage: 'Moderately elevated elements' },
  '40': { value: '40', usage: 'Highly elevated elements' },
  '50': { value: '50', usage: 'Maximum content elevation' },
  'dropdown': { value: '1000', usage: 'Dropdown menus, select options' },
  'sticky': { value: '1020', usage: 'Sticky headers, navigation' },
  'fixed': { value: '1030', usage: 'Fixed position elements' },
  'modal-backdrop': { value: '1040', usage: 'Modal backdrop overlay' },
  'modal': { value: '1050', usage: 'Modal dialogs, overlays' },
  'popover': { value: '1060', usage: 'Popovers, floating content' },
  'tooltip': { value: '1070', usage: 'Tooltips, contextual help' },
  'toast': { value: '1080', usage: 'Toast notifications, alerts' }
}

const focusTokens = {
  rings: {
    'none': { shadow: '0 0 0 0px transparent', usage: 'Remove focus indicator' },
    'sm': { shadow: '0 0 0 1px var(--focus-color)', usage: 'Subtle focus ring' },
    'md': { shadow: '0 0 0 2px var(--focus-color)', usage: 'Standard focus ring' },
    'lg': { shadow: '0 0 0 3px var(--focus-color)', usage: 'Prominent focus ring' },
    'xl': { shadow: '0 0 0 4px var(--focus-color)', usage: 'High contrast focus ring' }
  },
  colors: {
    'primary': { color: '#3b82f6', usage: 'Primary actions, default focus' },
    'success': { color: '#10b981', usage: 'Success states, positive actions' },
    'warning': { color: '#f59e0b', usage: 'Warning states, caution required' },
    'danger': { color: '#ef4444', usage: 'Danger states, destructive actions' },
    'info': { color: '#06b6d4', usage: 'Info states, neutral information' }
  },
  offset: {
    '0': { value: '0px', usage: 'No offset from element' },
    '1': { value: '1px', usage: 'Minimal offset' },
    '2': { value: '2px', usage: 'Standard offset' },
    '4': { value: '4px', usage: 'Comfortable offset' }
  }
}

const iconTokens = {
  sizes: {
    'xs': { size: '12px', usage: 'Tiny icons in dense layouts' },
    'sm': { size: '16px', usage: 'Small icons in compact components' },
    'md': { size: '20px', usage: 'Standard icon size for most use cases' },
    'lg': { size: '24px', usage: 'Large icons for emphasis' },
    'xl': { size: '32px', usage: 'Extra large icons for hero sections' },
    '2xl': { size: '48px', usage: 'Oversized icons for major features' }
  },
  strokeWidths: {
    'thin': { width: '1px', usage: 'Delicate, minimal icon style' },
    'normal': { width: '1.5px', usage: 'Standard stroke weight' },
    'thick': { width: '2px', usage: 'Bold, prominent icon style' },
    'heavy': { width: '2.5px', usage: 'Maximum weight for high contrast' }
  }
}

const interactionTokens = {
  states: {
    'hover': { 
      opacity: '0.8', 
      scale: '1.02', 
      transition: 'all 0.2s ease-out',
      usage: 'Mouse hover interactions' 
    },
    'active': { 
      opacity: '0.9', 
      scale: '0.98', 
      transition: 'all 0.1s ease-in',
      usage: 'Active press/click state' 
    },
    'focus': { 
      ring: '0 0 0 2px var(--focus-color)', 
      outline: 'none',
      usage: 'Keyboard focus state' 
    },
    'focus-visible': { 
      ring: '0 0 0 2px var(--focus-color)', 
      outline: 'none',
      usage: 'Visible focus for keyboard navigation' 
    },
    'disabled': { 
      opacity: '0.5', 
      cursor: 'not-allowed',
      usage: 'Disabled/non-interactive state' 
    },
    'loading': { 
      opacity: '0.7', 
      cursor: 'wait',
      usage: 'Loading/processing state' 
    }
  },
  timing: {
    'instant': { duration: '0ms', usage: 'Immediate state changes' },
    'fast': { duration: '100ms', usage: 'Quick micro-interactions' },
    'normal': { duration: '200ms', usage: 'Standard interaction timing' },
    'slow': { duration: '300ms', usage: 'Deliberate, noticeable changes' },
    'slower': { duration: '500ms', usage: 'Emphasized transitions' }
  }
}

const accessibilityTokens = {
  contrast: {
    'aa-normal': { ratio: '4.5:1', usage: 'WCAG AA for normal text (18px+)' },
    'aa-large': { ratio: '3:1', usage: 'WCAG AA for large text (24px+)' },
    'aaa-normal': { ratio: '7:1', usage: 'WCAG AAA for normal text' },
    'aaa-large': { ratio: '4.5:1', usage: 'WCAG AAA for large text' }
  },
  motion: {
    'reduce': { 
      query: 'prefers-reduced-motion: reduce',
      animations: 'none',
      transitions: 'none',
      usage: 'Respect user motion preferences' 
    },
    'no-preference': { 
      query: 'prefers-reduced-motion: no-preference',
      usage: 'Normal motion for users who allow it' 
    }
  },
  fontSize: {
    'minimum': { size: '16px', usage: 'Minimum readable text size' },
    'comfortable': { size: '18px', usage: 'Comfortable reading size' },
    'large': { size: '20px', usage: 'Large text for accessibility' }
  }
}

interface ColorCardProps {
  colorName: string;
  lightColor: string;
  darkColor: string;
  description: string;
}

function ColorCard({ colorName, lightColor, darkColor, description }: ColorCardProps) {
  const [copiedLight, setCopiedLight] = useState(false)
  const [copiedDark, setCopiedDark] = useState(false)

  const copyColor = async (color: string, isDark: boolean) => {
    await navigator.clipboard.writeText(color)
    if (isDark) {
      setCopiedDark(true)
      setTimeout(() => setCopiedDark(false), 2000)
    } else {
      setCopiedLight(true)
      setTimeout(() => setCopiedLight(false), 2000)
    }
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2 capitalize">
          {colorName}
        </h3>
        <p className="text-mw-gray-600 dark:text-mw-gray-300 text-sm mb-4">
          {description}
        </p>
        
        <div className="space-y-3">
          {/* Light Theme Color */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg border border-mw-gray-200 dark:border-mw-gray-600 flex-shrink-0 shadow-lg transition-all duration-300"
              style={{ backgroundColor: lightColor }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-mw-gray-500" />
                <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Light Theme</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <code className="text-sm font-mono text-mw-gray-600 dark:text-mw-gray-400">
                  {lightColor}
                </code>
                <button
                  onClick={() => copyColor(lightColor, false)}
                  className="p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
                  aria-label="Copy light color"
                >
                  {copiedLight ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-mw-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Dark Theme Color */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg border border-mw-gray-200 dark:border-mw-gray-600 flex-shrink-0 shadow-lg transition-all duration-300"
              style={{ backgroundColor: darkColor }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Moon className="w-4 h-4 text-mw-gray-500" />
                <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Dark Theme</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <code className="text-sm font-mono text-mw-gray-600 dark:text-mw-gray-400">
                  {darkColor}
                </code>
                <button
                  onClick={() => copyColor(darkColor, true)}
                  className="p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
                  aria-label="Copy dark color"
                >
                  {copiedDark ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-mw-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypographyCard({ name, spec, example }: {
  name: string
  spec: { size: string; lineHeight: string; weight: string; usage: string }
  example?: string
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    const css = `font-size: ${spec.size};\nline-height: ${spec.lineHeight};\nfont-weight: ${spec.weight};`
    await navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            {name}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy CSS"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Typography Example */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div 
          className="text-mw-gray-900 dark:text-white font-poppins"
          style={{ 
            fontSize: spec.size, 
            lineHeight: spec.lineHeight, 
            fontWeight: spec.weight 
          }}
        >
          {example || `The quick brown fox jumps over the lazy dog`}
        </div>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Size</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.size}</code>
        </div>
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Line Height</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.lineHeight}</code>
        </div>
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Weight</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.weight}</code>
        </div>
      </div>
    </div>
  )
}

function SpacingCard({ token, spec }: {
  token: string
  spec: { px: string; rem: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    await navigator.clipboard.writeText(spec.rem)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            {token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy spacing value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Spacing Visual */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="flex items-center space-x-4">
          <div 
            className="bg-mw-blue-500 rounded"
            style={{ width: spec.px, height: spec.px }}
          />
          <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            Visual representation of {spec.px} spacing
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Pixels</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.px}</code>
        </div>
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">REM</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.rem}</code>
        </div>
      </div>
    </div>
  )
}

function BorderRadiusCard({ token, spec }: {
  token: string
  spec: { px: string; rem: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    await navigator.clipboard.writeText(spec.rem)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            radius-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy border radius value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Border Radius Visual */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="flex items-center justify-center">
          <div 
            className="w-16 h-16 bg-mw-blue-500 border-2 border-mw-blue-600"
            style={{ borderRadius: spec.px }}
          />
        </div>
        <div className="text-center text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-2">
          {spec.px} border radius
        </div>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Pixels</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.px}</code>
        </div>
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">REM</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.rem}</code>
        </div>
      </div>
    </div>
  )
}

function ElevationCard({ token, spec }: {
  token: string
  spec: { shadow: string; usage: string; example: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    await navigator.clipboard.writeText(spec.shadow)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            shadow-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy shadow value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Shadow Visual */}
      <div className="mb-4 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="flex items-center justify-center">
          <div 
            className="w-20 h-12 bg-white dark:bg-mw-gray-700 rounded-lg"
            style={{ boxShadow: spec.shadow }}
          />
        </div>
        <div className="text-center text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-3">
          {spec.example}
        </div>
      </div>

      {/* Shadow Value */}
      <div className="text-sm">
        <span className="text-mw-gray-500 dark:text-mw-gray-400 block mb-1">CSS Value</span>
        <code className="text-mw-gray-900 dark:text-white font-mono text-xs break-all">
          {spec.shadow === 'none' ? 'none' : spec.shadow}
        </code>
      </div>
    </div>
  )
}

function AnimationCard({ category, token, spec }: {
  category: 'duration' | 'easing'
  token: string
  spec: { ms?: string; curve?: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    const value = category === 'duration' ? spec.ms : spec.curve
    await navigator.clipboard.writeText(value || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayValue = category === 'duration' ? spec.ms : spec.curve

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            {category}-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy animation value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Animation Preview */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="flex items-center justify-center">
          <div 
            className="w-8 h-8 bg-mw-blue-500 rounded-lg animate-pulse"
            style={{ 
              animationDuration: category === 'duration' ? spec.ms : '1s',
              animationTimingFunction: category === 'easing' ? spec.curve : 'ease-in-out'
            }}
          />
        </div>
        <div className="text-center text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-2">
          Animation preview
        </div>
      </div>

      {/* Value */}
      <div className="text-sm">
        <span className="text-mw-gray-500 dark:text-mw-gray-400 block mb-1">Value</span>
        <code className="text-mw-gray-900 dark:text-white font-mono text-xs break-all">
          {displayValue}
        </code>
      </div>
    </div>
  )
}

function BreakpointCard({ name, spec }: {
  name: string
  spec: { size: string; container: string; maxWidth: string; usage: string; icon: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    const css = `@media (min-width: ${spec.size}) {\n  /* Styles for ${name} breakpoint */\n  max-width: ${spec.maxWidth};\n}`
    await navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getIcon = () => {
    switch(spec.icon) {
      case 'smartphone': return <Smartphone className="w-6 h-6" />
      case 'tablet': return <Tablet className="w-6 h-6" />
      case 'monitor': return <Monitor className="w-6 h-6" />
      default: return <Monitor className="w-6 h-6" />
    }
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-mw-blue-100 dark:bg-mw-blue-900 rounded-lg text-mw-blue-600 dark:text-mw-blue-400">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
              {spec.usage}
            </p>
          </div>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy breakpoint CSS"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Breakpoint Visual */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="relative">
          <div className="flex items-center justify-center h-16 bg-mw-blue-500 rounded-lg text-white text-sm font-medium">
            {spec.size} and up
          </div>
          <div className="mt-2 text-center text-xs text-mw-gray-600 dark:text-mw-gray-300">
            Container: {spec.container} | Max: {spec.maxWidth}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Min Width</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.size}</code>
        </div>
        <div>
          <span className="text-mw-gray-500 dark:text-mw-gray-400 block">Container</span>
          <code className="text-mw-gray-900 dark:text-white font-mono">{spec.container}</code>
        </div>
      </div>
    </div>
  )
}

function ColumnGridDemo() {
  const [selectedLayout, setSelectedLayout] = useState('6-6')
  
  const layouts = {
    '12': [12],
    '6-6': [6, 6],
    '4-8': [4, 8],
    '3-9': [3, 9],
    '4-4-4': [4, 4, 4],
    '3-3-3-3': [3, 3, 3, 3],
    '2-2-2-2-2-2': [2, 2, 2, 2, 2, 2],
    '1-1-1-1-1-1-1-1-1-1-1-1': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }

  return (
    <div className="space-y-6">
      {/* Layout Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(layouts).map((layout) => (
          <button
            key={layout}
            onClick={() => setSelectedLayout(layout)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedLayout === layout
                ? 'bg-mw-blue-500 text-white'
                : 'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600'
            }`}
          >
            {layout}
          </button>
        ))}
      </div>

      {/* Grid Visualization */}
      <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="grid grid-cols-12 gap-4">
          {layouts[selectedLayout as keyof typeof layouts].map((colSpan, index) => (
            <div
              key={index}
              className="bg-mw-blue-500 text-white rounded-lg p-4 text-center font-medium transition-all duration-300 hover:bg-mw-blue-600"
              style={{ gridColumn: `span ${colSpan}` }}
            >
              col-{colSpan}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-mw-gray-600 dark:text-mw-gray-300">
          Layout: {selectedLayout} | Total columns: 12
        </div>
      </div>

      {/* Grid Guidelines */}
      <div className="p-4 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
        <h4 className="font-medium text-mw-gray-900 dark:text-white mb-3">12-Column Grid System</h4>
        <div className="grid grid-cols-12 gap-1 h-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="bg-mw-gray-200 dark:bg-mw-gray-600 rounded text-xs flex items-center justify-center text-mw-gray-600 dark:text-mw-gray-300"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GapSystemDemo() {
  const [selectedGap, setSelectedGap] = useState('4')

  return (
    <div className="space-y-6">
      {/* Gap Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(gridSystemTokens.gaps).map((gap) => (
          <button
            key={gap}
            onClick={() => setSelectedGap(gap)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedGap === gap
                ? 'bg-mw-blue-500 text-white'
                : 'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600'
            }`}
          >
            gap-{gap} ({gridSystemTokens.gaps[gap as keyof typeof gridSystemTokens.gaps].size})
          </button>
        ))}
      </div>

      {/* Gap Visualization */}
      <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div 
          className="grid grid-cols-4"
          style={{ gap: gridSystemTokens.gaps[selectedGap as keyof typeof gridSystemTokens.gaps].size }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-mw-blue-500 text-white rounded-lg p-4 text-center font-medium text-sm"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-mw-gray-600 dark:text-mw-gray-300">
          Gap: {gridSystemTokens.gaps[selectedGap as keyof typeof gridSystemTokens.gaps].size} 
          ({gridSystemTokens.gaps[selectedGap as keyof typeof gridSystemTokens.gaps].rem})
        </div>
      </div>

      {/* Gap Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(gridSystemTokens.gaps).map(([token, spec]) => (
          <div key={token} className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-4">
            <div className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">
              gap-{token}
            </div>
            <div className="text-xs text-mw-gray-600 dark:text-mw-gray-300 mb-3">
              {spec.usage}
            </div>
            <div className="space-y-1">
              <div className="text-xs text-mw-gray-500">
                <code>{spec.size}</code> | <code>{spec.rem}</code>
              </div>
              <div 
                className="bg-mw-blue-500 rounded"
                style={{ width: spec.size, height: '8px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GridLayoutExamples() {
  return (
    <div className="space-y-8">
      {/* Dashboard Layout */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white">Dashboard Layout</h4>
        <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
          <div className="grid grid-cols-12 gap-4 h-48">
            {/* Header */}
            <div className="col-span-12 bg-mw-blue-500 text-white rounded-lg p-4 flex items-center justify-center font-medium">
              Header (12 columns)
            </div>
            {/* Sidebar */}
            <div className="col-span-3 bg-mw-gray-600 text-white rounded-lg p-4 flex items-center justify-center font-medium">
              Sidebar (3 cols)
            </div>
            {/* Main Content */}
            <div className="col-span-9 bg-mw-green-500 text-white rounded-lg p-4 flex items-center justify-center font-medium">
              Main Content (9 columns)
            </div>
          </div>
        </div>
      </div>

      {/* E-commerce Grid */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white">Product Grid</h4>
        <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-mw-secondary-bg text-white rounded-lg p-4 h-32 flex items-center justify-center font-medium"
              >
                Product {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Layout */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white">Blog Layout</h4>
        <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
          <div className="grid grid-cols-12 gap-6 h-64">
            {/* Main Article */}
            <div className="col-span-12 lg:col-span-8 bg-mw-primary-bg text-white rounded-lg p-6 flex items-center justify-center font-medium">
              Featured Article (8 columns on lg+)
            </div>
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <div className="bg-mw-flow-bg text-white rounded-lg p-4 h-28 flex items-center justify-center font-medium">
                Recent Posts
              </div>
              <div className="bg-mw-flow-bg text-white rounded-lg p-4 h-28 flex items-center justify-center font-medium">
                Categories
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Cards */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white">Responsive Card Grid</h4>
        <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="bg-mw-energy-bg text-white rounded-lg p-4 h-24 flex items-center justify-center font-medium"
              >
                Card {i + 1}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-mw-gray-600 dark:text-mw-gray-300">
            1 col on mobile, 2 on md, 3 on lg, 4 on xl
          </div>
        </div>
      </div>
    </div>
  )
}

function ZIndexCard({ token, spec }: {
  token: string
  spec: { value: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    await navigator.clipboard.writeText(spec.value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLayerHeight = (value: string) => {
    if (value === 'auto' || value === '0') return 'h-4'
    const numValue = parseInt(value)
    if (numValue <= 50) return 'h-6'
    if (numValue <= 1000) return 'h-8'
    return 'h-10'
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            z-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy z-index value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Z-Index Visual */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg relative h-20 overflow-hidden">
        <div className="absolute inset-4 bg-mw-gray-300 dark:bg-mw-gray-600 rounded opacity-60">
          <div className="p-2 text-xs text-mw-gray-600 dark:text-mw-gray-300">Background</div>
        </div>
        <div 
          className={`absolute bg-mw-blue-500 text-white rounded text-xs flex items-center justify-center font-medium ${getLayerHeight(spec.value)}`}
          style={{ 
            zIndex: spec.value === 'auto' ? 'auto' : parseInt(spec.value) > 1000 ? 2 : 1,
            left: '1rem',
            right: '1rem',
            top: '1.5rem'
          }}
        >
          z-index: {spec.value}
        </div>
      </div>

      {/* Z-Index Value */}
      <div className="text-sm">
        <span className="text-mw-gray-500 dark:text-mw-gray-400 block mb-1">CSS Value</span>
        <code className="text-mw-gray-900 dark:text-white font-mono">{spec.value}</code>
      </div>
    </div>
  )
}

function FocusCard({ category, token, spec }: {
  category: 'rings' | 'colors' | 'offset'
  token: string
  spec: { shadow?: string; color?: string; value?: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)
  const [focused, setFocused] = useState(false)

  const copyCSS = async () => {
    const value = spec.shadow || spec.color || spec.value || ''
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayValue = spec.shadow || spec.color || spec.value

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            {category}-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy focus value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Focus Visual */}
      <div className="mb-4 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="flex items-center justify-center">
          <button
            className="px-4 py-2 bg-mw-blue-500 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none"
            style={{ 
              boxShadow: focused ? (spec.shadow || `0 0 0 2px ${spec.color}`) : 'none',
              '--focus-color': spec.color
            } as React.CSSProperties}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            {category === 'colors' ? `Focus (${token})` : 'Click to Focus'}
          </button>
        </div>
        <div className="text-center text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-2">
          {category === 'colors' ? 'Color example' : focused ? 'Focused!' : 'Click to see focus state'}
        </div>
      </div>

      {/* Value */}
      <div className="text-sm">
        <span className="text-mw-gray-500 dark:text-mw-gray-400 block mb-1">Value</span>
        <code className="text-mw-gray-900 dark:text-white font-mono text-xs break-all">
          {displayValue}
        </code>
      </div>
    </div>
  )
}

function IconCard({ category, token, spec }: {
  category: 'sizes' | 'strokeWidths'
  token: string
  spec: { size?: string; width?: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    const value = spec.size || spec.width || ''
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayValue = spec.size || spec.width

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            icon-{category === 'sizes' ? 'size' : 'stroke'}-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy icon value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Icon Visual */}
      <div className="mb-4 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg flex items-center justify-center">
        {category === 'sizes' ? (
          <Eye 
            className="text-mw-blue-500"
            style={{ 
              width: spec.size, 
              height: spec.size 
            }}
          />
        ) : (
          <Target 
            className="text-mw-blue-500"
            style={{ 
              width: '24px', 
              height: '24px',
              strokeWidth: spec.width 
            }}
          />
        )}
      </div>

      {/* Value */}
      <div className="text-sm">
        <span className="text-mw-gray-500 dark:text-mw-gray-400 block mb-1">
          {category === 'sizes' ? 'Size' : 'Stroke Width'}
        </span>
        <code className="text-mw-gray-900 dark:text-white font-mono">{displayValue}</code>
      </div>
    </div>
  )
}

function InteractionCard({ category, token, spec }: {
  category: 'states' | 'timing'
  token: string
  spec: { opacity?: string; scale?: string; transition?: string; ring?: string; outline?: string; cursor?: string; duration?: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const copyCSS = async () => {
    if (category === 'states') {
      const css = Object.entries(spec)
        .filter(([key]) => key !== 'usage')
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')
      await navigator.clipboard.writeText(css)
    } else {
      await navigator.clipboard.writeText(spec.duration || '')
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            {category}-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy interaction value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Interaction Demo */}
      <div className="mb-4 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        <div className="flex items-center justify-center">
          {category === 'states' ? (
            <button
              className="px-4 py-2 bg-mw-blue-500 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none"
              style={{
                opacity: isActive ? spec.opacity : '1',
                transform: isActive ? `scale(${spec.scale})` : 'scale(1)',
                cursor: spec.cursor || 'pointer',
                boxShadow: token === 'focus' || token === 'focus-visible' ? spec.ring : 'none',
                outline: spec.outline || 'none'
              }}
              onMouseDown={() => setIsActive(true)}
              onMouseUp={() => setIsActive(false)}
              onMouseLeave={() => setIsActive(false)}
              disabled={token === 'disabled'}
            >
              {token.charAt(0).toUpperCase() + token.slice(1)} State
            </button>
          ) : (
            <div 
              className="w-16 h-16 bg-mw-blue-500 rounded-lg transition-all"
              style={{ 
                transitionDuration: spec.duration,
                transform: isActive ? 'scale(1.2) rotate(45deg)' : 'scale(1) rotate(0deg)'
              }}
              onMouseEnter={() => setIsActive(true)}
              onMouseLeave={() => setIsActive(false)}
            />
          )}
        </div>
        <div className="text-center text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-2">
          {category === 'states' ? 'Click/hover to see effect' : 'Hover to see timing'}
        </div>
      </div>

      {/* Values */}
      <div className="text-sm space-y-1">
        {category === 'states' ? (
          Object.entries(spec)
            .filter(([key]) => key !== 'usage')
            .map(([key, value]) => (
              <div key={key}>
                <span className="text-mw-gray-500 dark:text-mw-gray-400">{key}:</span>
                <code className="ml-2 text-mw-gray-900 dark:text-white font-mono">{value}</code>
              </div>
            ))
        ) : (
          <div>
            <span className="text-mw-gray-500 dark:text-mw-gray-400">Duration:</span>
            <code className="ml-2 text-mw-gray-900 dark:text-white font-mono">{spec.duration}</code>
          </div>
        )}
      </div>
    </div>
  )
}

function AccessibilityCard({ category, token, spec }: {
  category: 'contrast' | 'motion' | 'fontSize'
  token: string
  spec: { ratio?: string; query?: string; animations?: string; transitions?: string; size?: string; usage: string }
}) {
  const [copied, setCopied] = useState(false)

  const copyCSS = async () => {
    if (category === 'contrast') {
      await navigator.clipboard.writeText(spec.ratio || '')
    } else if (category === 'motion') {
      await navigator.clipboard.writeText(spec.query || '')
    } else {
      await navigator.clipboard.writeText(spec.size || '')
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
            a11y-{category}-{token}
          </h3>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            {spec.usage}
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="p-2 rounded-lg hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          aria-label="Copy accessibility value"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-mw-gray-500" />
          )}
        </button>
      </div>

      {/* Accessibility Demo */}
      <div className="mb-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
        {category === 'contrast' ? (
          <div className="space-y-2">
            <div className="bg-white p-3 rounded border">
              <div className="text-black text-sm font-medium">
                Text with {spec.ratio} contrast ratio
              </div>
              <div className="text-gray-600 text-xs mt-1">
                Example of {token.replace('-', ' ')} text
              </div>
            </div>
          </div>
        ) : category === 'motion' ? (
          <div className="text-center">
            <div className={`w-12 h-12 bg-mw-blue-500 rounded-lg mx-auto ${
              token === 'reduce' ? '' : 'animate-pulse'
            }`} />
            <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-2">
              {token === 'reduce' ? 'No animation (respects preference)' : 'Normal animation'}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div 
              className="text-mw-gray-900 dark:text-white font-medium"
              style={{ fontSize: spec.size }}
            >
              Sample Text
            </div>
            <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-2">
              {spec.size} font size
            </div>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="text-sm">
        <span className="text-mw-gray-500 dark:text-mw-gray-400 block mb-1">
          {category === 'contrast' ? 'Ratio' : category === 'motion' ? 'Media Query' : 'Size'}
        </span>
        <code className="text-mw-gray-900 dark:text-white font-mono text-xs break-all">
          {spec.ratio || spec.query || spec.size}
        </code>
      </div>
    </div>
  )
}

export default function NewDesignTokensPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-mw-gray-950">
      <Navigation />
      
      <PageHero
        title="New Design Tokens"
        description="Explore the next generation of our design system with updated colors and typography. This showcases the proposed new color palette and enhanced typography scale."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Color Palette Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Palette className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Color Palette
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Semantic color system with optimized light and dark theme variants
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(brandColors.light).map(([colorName, lightColor]) => (
              <ColorCard
                key={colorName}
                colorName={colorName}
                lightColor={lightColor}
                darkColor={brandColors.dark[colorName as keyof typeof brandColors.dark]}
                description={`${colorName === 'primary' ? 'Primary brand color for main UI elements' : 
                  colorName === 'secondary' ? 'Secondary color for complementary elements' : 
                  colorName === 'success' ? 'Success state indicators' :
                  colorName === 'danger' ? 'Error and danger states' :
                  colorName === 'warning' ? 'Warning state indicators' :
                  colorName === 'info' ? 'Informational elements' : 'Neutral UI elements'}`}
              />
            ))}
          </div>

          {/* Color Usage Examples */}
          <div className="mt-12 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Color Usage Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(brandColors.light).map(([colorName, lightColor]) => (
                <div key={colorName} className="space-y-4">
                  <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 capitalize">
                    {colorName} Usage
                  </h4>
                  <button 
                    className="w-full px-4 py-2 text-white rounded-lg text-sm font-medium transition-all duration-300"
                    style={{ backgroundColor: lightColor }}
                  >
                    {colorName.charAt(0).toUpperCase() + colorName.slice(1)} Button
                  </button>
                  <div 
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-center transition-all duration-300"
                    style={{ borderWidth: 2, borderStyle: 'solid', borderColor: lightColor, color: lightColor }}
                  >
                    Outline Button
                  </div>
                  <div 
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ 
                      backgroundColor: `${lightColor}15`,
                      color: lightColor 
                    }}
                  >
                    Light Background
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <Type className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Typography Scale
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Comprehensive type system using Poppins font family with clear hierarchy
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(typographyScale).map(([name, spec]) => (
              <TypographyCard
                key={name}
                name={name}
                spec={spec}
                example={name.includes('Display') ? 'Design System' : undefined}
              />
            ))}
          </div>

          {/* Typography Hierarchy Demo */}
          <div className="mt-12 p-8 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Typography Hierarchy in Action
            </h3>
            <div className="space-y-6">
              <div style={{ fontSize: '4.5rem', lineHeight: '1', fontWeight: '700' }} className="text-mw-gray-900 dark:text-white">
                Design System
              </div>
              <div style={{ fontSize: '2.25rem', lineHeight: '1.2', fontWeight: '600' }} className="text-mw-gray-900 dark:text-white">
                Building consistent user experiences
              </div>
              <div style={{ fontSize: '1.125rem', lineHeight: '1.6', fontWeight: '400' }} className="text-mw-gray-600 dark:text-mw-gray-300">
                This is a lead paragraph that introduces the main content. It uses Body Large typography to create visual hierarchy and draw attention to important introductory text.
              </div>
              <div style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '400' }} className="text-mw-gray-600 dark:text-mw-gray-300">
                This is regular body text using Body Medium typography. It's perfect for the main content of articles, descriptions, and general reading material. The line height and spacing are optimized for readability across different screen sizes.
              </div>
              <div style={{ fontSize: '0.875rem', lineHeight: '1.5', fontWeight: '400' }} className="text-mw-gray-500 dark:text-mw-gray-400">
                This is Body Small text, ideal for secondary information, captions, and supplementary content that supports the main text.
              </div>
            </div>
          </div>
        </section>

        {/* Spacing Scale Section */}
        <section className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <Ruler className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Spacing Scale
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                4pt grid-based spacing system for consistent layouts and component spacing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(spacingScale).map(([token, spec]) => (
              <SpacingCard
                key={token}
                token={`spacing-${token}`}
                spec={spec}
              />
            ))}
          </div>

          {/* Spacing Usage Examples */}
          <div className="mt-12 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Spacing Usage Examples
            </h3>
            <div className="space-y-6">
              {/* Component Spacing Example */}
              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
                  Component Spacing
                </h4>
                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
                  <div className="w-12 h-12 bg-mw-blue-500 rounded-lg"></div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white">Component Title</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-300">16px (1rem) spacing</div>
                  </div>
                </div>
              </div>

              {/* Layout Spacing Example */}
              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
                  Layout Spacing
                </h4>
                <div className="space-y-8">
                  <div className="p-6 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Section 1</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-300">32px (2rem) section spacing</div>
                  </div>
                  <div className="p-6 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Section 2</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-300">32px (2rem) section spacing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid System Section */}
        <section className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <Grid3X3 className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Grid System
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Responsive 12-column grid system with consistent breakpoints and spacing
              </p>
            </div>
          </div>

          {/* Responsive Breakpoints */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Responsive Breakpoints
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(gridSystemTokens.breakpoints).map(([name, spec]) => (
                <BreakpointCard key={name} name={name} spec={spec} />
              ))}
            </div>
          </div>

          {/* Column System */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              12-Column System
            </h3>
            <ColumnGridDemo />
          </div>

          {/* Gap System */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Grid Gap System
            </h3>
            <GapSystemDemo />
          </div>

          {/* Layout Examples */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Common Grid Layouts
            </h3>
            <GridLayoutExamples />
          </div>

          {/* Implementation Examples */}
          <div className="mt-12 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Grid Implementation Examples
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* CSS Grid */}
              <div>
                <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-4">
                  CSS Grid
                </h4>
                <pre className="bg-mw-gray-900 text-mw-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-6 { grid-column: span 6; }
.col-span-8 { grid-column: span 8; }
.col-span-9 { grid-column: span 9; }
.col-span-12 { grid-column: span 12; }

/* Responsive breakpoints */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`}</code>
                </pre>
              </div>

              {/* Flexbox Grid */}
              <div>
                <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-4">
                  Flexbox Grid
                </h4>
                <pre className="bg-mw-gray-900 text-mw-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.flex-1 { flex: 0 0 8.333333%; }
.flex-2 { flex: 0 0 16.666667%; }
.flex-3 { flex: 0 0 25%; }
.flex-4 { flex: 0 0 33.333333%; }
.flex-6 { flex: 0 0 50%; }
.flex-8 { flex: 0 0 66.666667%; }
.flex-9 { flex: 0 0 75%; }
.flex-12 { flex: 0 0 100%; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .flex-1, .flex-2, .flex-3,
  .flex-4, .flex-6, .flex-8,
  .flex-9 {
    flex: 0 0 100%;
  }
}`}</code>
                </pre>
              </div>

              {/* Tailwind Usage */}
              <div className="lg:col-span-2">
                <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-4">
                  Tailwind CSS Grid Classes
                </h4>
                <pre className="bg-mw-gray-900 text-mw-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`<!-- Container with 12-column grid -->
<div class="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-4">
  
  <!-- Full width header -->
  <header class="col-span-12 bg-blue-500 p-4">
    Header Content
  </header>
  
  <!-- Sidebar (3 columns) -->
  <aside class="col-span-3 bg-gray-200 p-4">
    Sidebar
  </aside>
  
  <!-- Main content (9 columns) -->
  <main class="col-span-9 bg-gray-100 p-4">
    Main Content
  </main>
  
  <!-- Responsive product grid -->
  <section class="col-span-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div class="bg-white p-4 rounded-lg">Product 1</div>
      <div class="bg-white p-4 rounded-lg">Product 2</div>
      <div class="bg-white p-4 rounded-lg">Product 3</div>
      <div class="bg-white p-4 rounded-lg">Product 4</div>
    </div>
  </section>
  
</div>

<!-- Responsive classes -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <!-- Automatically responsive grid -->
</div>`}</code>
                </pre>
              </div>
            </div>

            {/* Grid Best Practices */}
            <div className="mt-8 p-6 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
              <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-4">
                Grid System Best Practices
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-mw-gray-900 dark:text-white mb-2">Layout Guidelines</h5>
                  <ul className="space-y-2 text-sm text-mw-gray-600 dark:text-mw-gray-300">
                    <li>• Use 12-column grid for maximum flexibility</li>
                    <li>• Maintain consistent gap spacing (16px default)</li>
                    <li>• Design mobile-first, then enhance for larger screens</li>
                    <li>• Use semantic column combinations (3+9, 4+8, 6+6)</li>
                    <li>• Respect container max-widths at each breakpoint</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-mw-gray-900 dark:text-white mb-2">Performance Tips</h5>
                  <ul className="space-y-2 text-sm text-mw-gray-600 dark:text-mw-gray-300">
                    <li>• Prefer CSS Grid for complex layouts</li>
                    <li>• Use Flexbox for simple component layouts</li>
                    <li>• Minimize nested grids when possible</li>
                    <li>• Test on real devices for responsive behavior</li>
                    <li>• Use auto-fit/auto-fill for dynamic content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Token Reference */}
          <div className="mt-8 p-6 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Grid Token Reference
            </h3>
            <div className="space-y-6">
              {/* Breakpoint Tokens */}
              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
                  Breakpoint Tokens
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(gridSystemTokens.breakpoints).map(([name, spec]) => (
                    <div key={name} className="text-sm">
                      <div className="font-mono text-mw-gray-600 dark:text-mw-gray-300">
                        --breakpoint-{name}: {spec.size}
                      </div>
                      <div className="text-mw-gray-500 mt-1">
                        Container: {spec.container}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column Tokens */}
              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
                  Column Width Tokens
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(gridSystemTokens.columns).map(([name, spec]) => (
                    <div key={name} className="text-sm">
                      <div className="font-mono text-mw-gray-600 dark:text-mw-gray-300">
                        --col-{name}: {spec.width}
                      </div>
                      <div className="text-mw-gray-500 mt-1">
                        {spec.usage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gap Tokens */}
              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
                  Gap Tokens
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(gridSystemTokens.gaps).map(([name, spec]) => (
                    <div key={name} className="text-sm">
                      <div className="font-mono text-mw-gray-600 dark:text-mw-gray-300">
                        --gap-{name}: {spec.rem}
                      </div>
                      <div className="text-mw-gray-500 mt-1">
                        {spec.size} | {spec.usage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <Square className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Border Radius
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Consistent corner rounding system with 6px as the standard radius
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(borderRadiusScale).map(([token, spec]) => (
              <BorderRadiusCard
                key={token}
                token={token}
                spec={spec}
              />
            ))}
          </div>

          {/* Border Radius Usage Examples */}
          <div className="mt-12 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Border Radius Usage Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(borderRadiusScale).slice(0, 4).map(([token, spec]) => (
                <div key={token} className="space-y-3">
                  <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                    {token} - {spec.px}
                  </h4>
                  <div className="space-y-3">
                    <button 
                      className="w-full px-4 py-2 bg-mw-blue-500 text-white text-sm font-medium transition-colors hover:bg-mw-blue-600"
                      style={{ borderRadius: spec.px }}
                    >
                      Button
                    </button>
                    <div 
                      className="w-full p-3 bg-white dark:bg-mw-gray-700 border border-mw-gray-200 dark:border-mw-gray-600 text-sm text-mw-gray-900 dark:text-white"
                      style={{ borderRadius: spec.px }}
                    >
                      Input Field
                    </div>
                    <div 
                      className="w-full p-3 bg-mw-gray-100 dark:bg-mw-gray-800 text-sm text-mw-gray-700 dark:text-mw-gray-300"
                      style={{ borderRadius: spec.px }}
                    >
                      Card Container
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elevation Section */}
        <section className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <Layers className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Elevation & Shadows
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Layered shadow system to create depth and visual hierarchy
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(elevationScale).map(([token, spec]) => (
              <ElevationCard
                key={token}
                token={token}
                spec={spec}
              />
            ))}
          </div>

          {/* Elevation Usage Examples */}
          <div className="mt-12 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Elevation Usage Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { level: 'sm', content: 'Input Field', bg: 'bg-white dark:bg-mw-gray-700' },
                { level: 'md', content: 'Button', bg: 'bg-mw-blue-500 text-white' },
                { level: 'lg', content: 'Dropdown Menu', bg: 'bg-white dark:bg-mw-gray-700' },
                { level: 'xl', content: 'Modal Dialog', bg: 'bg-white dark:bg-mw-gray-700' },
                { level: '2xl', content: 'Overlay', bg: 'bg-white dark:bg-mw-gray-700' }
              ].map(({ level, content, bg }) => (
                <div key={level} className="text-center">
                  <div 
                    className={`p-4 rounded-lg ${bg} text-sm font-medium transition-shadow hover:shadow-lg`}
                    style={{ boxShadow: elevationScale[level as keyof typeof elevationScale].shadow }}
                  >
                    {content}
                  </div>
                  <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 mt-2">
                    shadow-{level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient Section */}
        <section className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 rounded-lg mw-energy-bg" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Brand Gradients
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Dynamic gradient system that brings energy and movement to the interface
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Energy Gradient */}
            <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden group">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2">
                  Energy Gradient
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 text-sm mb-4">
                  Combines Energy Blue and Breakthrough Orange for dynamic, energetic elements
                </p>
                <div className="space-y-4">
                  <div className="h-24 rounded-lg mw-energy-bg transition-transform duration-300 group-hover:scale-105" />
                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-energy-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      Button Example
                    </button>
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-energy-bg opacity-75">
                      Subtle Variant
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow Gradient */}
            <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden group">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2">
                  Flow Gradient
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 text-sm mb-4">
                  Combines Flow Teal with Energy Blue for smooth, calming transitions
                </p>
                <div className="space-y-4">
                  <div className="h-24 rounded-lg mw-flow-bg transition-transform duration-300 group-hover:scale-105" />
                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-flow-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      Button Example
                    </button>
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-flow-bg opacity-75">
                      Subtle Variant
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Gradient */}
            <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden group">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2">
                  Primary Gradient
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 text-sm mb-4">
                  Rich blend of Energy Blue shades for primary actions and focus states
                </p>
                <div className="space-y-4">
                  <div className="h-24 rounded-lg mw-primary-bg transition-transform duration-300 group-hover:scale-105" />
                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-primary-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      Button Example
                    </button>
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-primary-bg opacity-75">
                      Subtle Variant
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Gradient */}
            <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden group">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2">
                  Secondary Gradient
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 text-sm mb-4">
                  Warm blend of Breakthrough Orange shades for emphasis and calls-to-action
                </p>
                <div className="space-y-4">
                  <div className="h-24 rounded-lg mw-secondary-bg transition-transform duration-300 group-hover:scale-105" />
                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-secondary-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      Button Example
                    </button>
                    <div className="px-4 py-2 rounded-lg text-white text-sm font-medium mw-secondary-bg opacity-75">
                      Subtle Variant
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animation Section */}
        <section className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="w-8 h-8 text-mw-blue-600 dark:text-mw-blue-400" />
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Animation Tokens
              </h2>
              <p className="text-mw-gray-600 dark:text-mw-gray-300 mt-2">
                Consistent timing and easing for smooth, purposeful motion design
              </p>
            </div>
          </div>

          {/* Duration Tokens */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Duration Tokens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(animationTokens.duration).map(([token, spec]) => (
                <AnimationCard
                  key={token}
                  category="duration"
                  token={token}
                  spec={spec}
                />
              ))}
            </div>
          </div>

          {/* Easing Tokens */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Easing Tokens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(animationTokens.easing).map(([token, spec]) => (
                <AnimationCard
                  key={token}
                  category="easing"
                  token={token}
                  spec={spec}
                />
              ))}
            </div>
          </div>

          {/* Animation Usage Examples */}
          {/* Brand Animation Examples */}
          <div className="mt-12 p-6 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Brand Animation Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  Progressive Focus
                </h4>
                <button className="w-full px-4 py-2 rounded-lg font-medium mw-progressive-focus bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none">
                  Focus Me
                </button>
                <p className="text-xs text-mw-gray-500">Uses mw-progressive-focus with brand gradients</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  Floating Card
                </h4>
                <div className="w-full p-4 mw-energy-bg text-white rounded-lg text-center font-medium mw-float">
                  Energy Animation
                </div>
                <p className="text-xs text-mw-gray-500">Uses mw-float animation with Energy gradient</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  Breakthrough Button
                </h4>
                <button className="w-full mw-btn-primary">
                  Hover For Effect
                </button>
                <p className="text-xs text-mw-gray-500">Uses mw-btn-primary with shine effect</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  Flow Card
                </h4>
                <div className="w-full p-4 mw-flow-bg text-white rounded-lg text-center font-medium mw-flow-transition hover:-translate-y-2 hover:shadow-lg">
                  Smooth Transition
                </div>
                <p className="text-xs text-mw-gray-500">Uses mw-flow-transition for smooth movement</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  Diagonal Card
                </h4>
                <div className="w-full p-4 mw-secondary-bg text-white rounded-lg text-center font-medium mw-diagonal-card">
                  Hover to Align
                </div>
                <p className="text-xs text-mw-gray-500">Uses mw-diagonal-card for subtle rotation</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  Bounce Effect
                </h4>
                <button className="w-full mw-btn-flow mw-bounce-transition hover:scale-110">
                  Bounce on Hover
                </button>
                <p className="text-xs text-mw-gray-500">Uses mw-bounce-transition for playful interaction</p>
              </div>
            </div>
          </div>

          {/* Animation Token Usage */}
          <div className="mt-8 p-6 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">
              Animation Token Usage
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                  Duration Tokens
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Quick', token: '--mw-duration-quick', value: '150ms' },
                    { name: 'Smooth', token: '--mw-duration-smooth', value: '300ms' },
                    { name: 'Dramatic', token: '--mw-duration-dramatic', value: '500ms' },
                    { name: 'Flow', token: '--mw-duration-flow', value: '600ms' }
                  ].map(({ name, token, value }) => (
                    <div key={name} className="text-sm">
                      <div className="font-mono text-mw-gray-600 dark:text-mw-gray-300">{token}</div>
                      <div className="text-mw-gray-500 mt-1">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                  Easing Tokens
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Flow', token: '--mw-ease-flow', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
                    { name: 'Bounce', token: '--mw-ease-bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
                    { name: 'Smooth', token: '--mw-ease-smooth', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
                  ].map(({ name, token, value }) => (
                    <div key={name} className="text-sm">
                      <div className="font-mono text-mw-gray-600 dark:text-mw-gray-300">{token}</div>
                      <div className="text-mw-gray-500 mt-1">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Z-Index Scale */}
        <section id="z-index" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white flex items-center gap-3">
              <Layers className="w-8 h-8 text-mw-blue-500" />
              Z-Index Scale
            </h2>
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
              Systematic layering scale to manage component stacking order and prevent z-index conflicts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(zIndexTokens).map(([key, value]) => (
              <ZIndexCard key={key} token={key} spec={value} />
            ))}
          </div>
        </section>

        {/* Focus Ring System */}
        <section id="focus" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white flex items-center gap-3">
              <Eye className="w-8 h-8 text-mw-blue-500" />
              Focus Ring System
            </h2>
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
              WCAG-compliant focus indicators with consistent styling across all interactive elements.
            </p>
          </div>

          <div className="space-y-8">
            {/* Focus Rings */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Ring Sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(focusTokens.rings).map(([key, value]) => (
                  <FocusCard key={key} category="rings" token={key} spec={value} />
                ))}
              </div>
            </div>

            {/* Focus Colors */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Ring Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(focusTokens.colors).map(([key, value]) => (
                  <FocusCard key={key} category="colors" token={key} spec={value} />
                ))}
              </div>
            </div>

            {/* Focus Offset */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Ring Offset</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(focusTokens.offset).map(([key, value]) => (
                  <FocusCard key={key} category="offset" token={key} spec={value} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Icon System */}
        <section id="icons" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white flex items-center gap-3">
              <Target className="w-8 h-8 text-mw-blue-500" />
              Icon System Tokens
            </h2>
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
              Consistent icon sizing and stroke weight system for optimal visual hierarchy and accessibility.
            </p>
          </div>

          <div className="space-y-8">
            {/* Icon Sizes */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Icon Sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(iconTokens.sizes).map(([key, value]) => (
                  <IconCard key={key} category="sizes" token={key} spec={value} />
                ))}
              </div>
            </div>

            {/* Stroke Widths */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Stroke Widths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(iconTokens.strokeWidths).map(([key, value]) => (
                  <IconCard key={key} category="strokeWidths" token={key} spec={value} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interaction States */}
        <section id="interactions" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white flex items-center gap-3">
              <MousePointer className="w-8 h-8 text-mw-blue-500" />
              Interaction States
            </h2>
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
              Consistent interactive feedback and timing tokens for seamless user experiences.
            </p>
          </div>

          <div className="space-y-8">
            {/* Interaction States */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">State Tokens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(interactionTokens.states).map(([key, value]) => (
                  <InteractionCard key={key} category="states" token={key} spec={value} />
                ))}
              </div>
            </div>

            {/* Timing */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Timing Tokens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(interactionTokens.timing).map(([key, value]) => (
                  <InteractionCard key={key} category="timing" token={key} spec={value} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Tokens */}
        <section id="accessibility" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white flex items-center gap-3">
              <Accessibility className="w-8 h-8 text-mw-blue-500" />
              Accessibility Tokens
            </h2>
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
              WCAG-compliant tokens ensuring inclusive design with proper contrast ratios and accessible interactions.
            </p>
          </div>

          <div className="space-y-8">
            {/* Contrast Ratios */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Contrast Ratios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(accessibilityTokens.contrast).map(([key, value]) => (
                  <AccessibilityCard key={key} category="contrast" token={key} spec={value} />
                ))}
              </div>
            </div>

            {/* Motion Preferences */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Motion Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(accessibilityTokens.motion).map(([key, value]) => (
                  <AccessibilityCard key={key} category="motion" token={key} spec={value} />
                ))}
              </div>
            </div>

            {/* Font Sizes */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">Minimum Font Sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(accessibilityTokens.fontSize).map(([key, value]) => (
                  <AccessibilityCard key={key} category="fontSize" token={key} spec={value} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-8">
            Implementation Guide
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
              <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
                CSS Variables
              </h3>
              <pre className="bg-mw-gray-900 text-mw-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`:root {
  /* Colors */
  --color-primary: #1d65af;
  --color-secondary: #4cb0e4;
  --color-success: #2d7d32;
  --color-danger: #c52828;
  --color-warning: #f9a825;
  --color-info: #0188d1;
  --color-neutral: #717171;
  
  /* Spacing (4pt grid) */
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
  
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.375rem; /* 6px - Standard */
  --radius-lg: 0.5rem;   /* 8px */
  --radius-xl: 0.75rem;  /* 12px */
  --radius-2xl: 1rem;    /* 16px */
  --radius-full: 9999px;
  
  /* Elevation */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
               0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
               0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
               0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Animation */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --color-primary: #2176cc;
  --color-secondary: #60b8e7;
  /* ... dark variants */
}`}</code>
              </pre>
            </div>

            <div className="bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 p-6">
              <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
                Tailwind Usage
              </h3>
              <pre className="bg-mw-gray-900 text-mw-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<!-- Color examples -->
<button class="bg-primary text-white">
  Primary Button
</button>

<button class="bg-success text-white">
  Success Button
</button>

<!-- Spacing examples -->
<div class="p-4 mb-6 space-y-2">
  Component with 4pt grid spacing
</div>

<div class="px-6 py-8">
  Section with larger spacing
</div>

<!-- Border radius examples -->
<button class="rounded-md bg-primary text-white px-4 py-2">
  Standard 6px radius
</button>

<div class="rounded-lg p-4 bg-gray-100">
  Card with larger radius
</div>

<!-- Shadow examples -->
<div class="shadow-md bg-white p-4 rounded-lg">
  Card with medium elevation
</div>

<div class="shadow-lg bg-white p-6 rounded-lg">
  Modal with high elevation
</div>

<!-- Animation examples -->
<button class="transition-all duration-fast ease-out 
              hover:bg-blue-600 hover:shadow-md">
  Quick hover animation
</button>

<div class="transition-transform duration-slow ease-in-out 
           hover:scale-105">
  Smooth transform animation
</div>`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

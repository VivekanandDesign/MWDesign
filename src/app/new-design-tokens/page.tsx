'use client'

import { useState } from 'react'
import { Copy, Check, Palette, Type, Sun, Moon, Ruler, Square, Layers, Zap } from 'lucide-react'
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

'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

const colorPalette = {
  'MW Blue': {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  'MW Gray': {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  }
}

const utilityColors = {
  'Success': '#10b981',
  'Warning': '#f59e0b',
  'Error': '#ef4444',
  'Info': '#3b82f6',
}

const typography = {
  'Display': { size: '3.75rem', lineHeight: '1', weight: '700' },
  'H1': { size: '3rem', lineHeight: '1', weight: '700' },
  'H2': { size: '2.25rem', lineHeight: '2.5rem', weight: '600' },
  'H3': { size: '1.875rem', lineHeight: '2.25rem', weight: '600' },
  'H4': { size: '1.5rem', lineHeight: '2rem', weight: '600' },
  'H5': { size: '1.25rem', lineHeight: '1.75rem', weight: '600' },
  'H6': { size: '1.125rem', lineHeight: '1.75rem', weight: '600' },
  'Body Large': { size: '1.125rem', lineHeight: '1.75rem', weight: '400' },
  'Body': { size: '1rem', lineHeight: '1.5rem', weight: '400' },
  'Body Small': { size: '0.875rem', lineHeight: '1.25rem', weight: '400' },
  'Caption': { size: '0.75rem', lineHeight: '1rem', weight: '400' },
}

const spacing = {
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
}

function ColorSwatch({ name, value, onCopy }: { name: string; value: string; onCopy: (value: string) => void }) {
  return (
    <div 
      className="cursor-pointer group" 
      onClick={() => onCopy(value)}
    >
      <div 
        className="w-full h-16 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 mb-2 group-hover:scale-105 transition-transform duration-200"
        style={{ backgroundColor: value }}
      />
      <div className="text-sm font-medium text-mw-gray-900 dark:text-white">{name}</div>
      <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 font-mono">{value}</div>
    </div>
  )
}

function CopyNotification({ show }: { show: boolean }) {
  if (!show) return null
  
  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
      <Check className="w-4 h-4" />
      <span>Copied to clipboard!</span>
    </div>
  )
}

export default function TokensPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = value
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <PageHero
        title="Design Tokens"
        description="The foundation of our design system. These tokens ensure visual consistency across all products and platforms."
        badge={{
          text: "Design Foundation",
          variant: "secondary"
        }}
        stats={[
          { label: "Color Tokens", value: "50+" },
          { label: "Typography", value: "SF Pro" },
          { label: "Grid System", value: "4pt" },
          { label: "Accessibility", value: "AA" }
        ]}
      />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Colors */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Color Palette
            </h2>
            
            {/* Primary Colors */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  Primary Colors
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  Our sophisticated blue palette symbolizing trust, intelligence, and innovation.
                </p>
              </CardHeader>
              <CardContent>
                {Object.entries(colorPalette).map(([paletteName, colors]) => (
                  <div key={paletteName} className="mb-8 last:mb-0">
                    <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-4">
                      {paletteName}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-11 gap-4">
                      {Object.entries(colors).map(([shade, value]) => (
                        <ColorSwatch
                          key={shade}
                          name={shade}
                          value={value}
                          onCopy={copyToClipboard}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Utility Colors */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  Utility Colors
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  Semantic colors for states like success, warning, error, and information.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(utilityColors).map(([name, value]) => (
                    <ColorSwatch
                      key={name}
                      name={name}
                      value={value}
                      onCopy={copyToClipboard}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Typography */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Typography
            </h2>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  SF Pro Type Scale
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  A structured type scale providing clarity and consistency across all screen sizes.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(typography).map(([name, props]) => (
                    <div key={name} className="border-b border-mw-gray-200 dark:border-mw-gray-700 pb-6 last:border-b-0 last:pb-0">
                      <div 
                        className="text-mw-gray-900 dark:text-white font-sf-pro mb-2"
                        style={{ 
                          fontSize: props.size, 
                          lineHeight: props.lineHeight,
                          fontWeight: props.weight 
                        }}
                      >
                        {name} - The quick brown fox
                      </div>
                      <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400 font-mono">
                        {props.size} / {props.lineHeight} / {props.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Spacing */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Spacing Scale
            </h2>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  4pt Grid System
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  Consistent spacing tokens based on a 4pt grid for clean, predictable layouts.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(spacing).map(([token, value]) => (
                    <div key={token} className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-mono text-mw-gray-600 dark:text-mw-gray-400">
                        {token}
                      </div>
                      <div className="w-24 text-sm font-mono text-mw-gray-600 dark:text-mw-gray-400">
                        {value}
                      </div>
                      <div 
                        className="bg-mw-blue-600 rounded"
                        style={{ width: value, height: '1rem' }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Elevation */}
          <section>
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Elevation & Shadows
            </h2>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  Shadow Tokens
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  Subtle shadows to create depth and hierarchy in your interfaces.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white dark:bg-mw-gray-800 rounded-lg shadow-mw-sm mx-auto mb-3"></div>
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white">Small</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 font-mono">shadow-mw-sm</div>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white dark:bg-mw-gray-800 rounded-lg shadow-mw-md mx-auto mb-3"></div>
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white">Medium</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 font-mono">shadow-mw-md</div>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white dark:bg-mw-gray-800 rounded-lg shadow-mw-lg mx-auto mb-3"></div>
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white">Large</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 font-mono">shadow-mw-lg</div>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white dark:bg-mw-gray-800 rounded-lg shadow-mw-xl mx-auto mb-3"></div>
                    <div className="text-sm font-medium text-mw-gray-900 dark:text-white">Extra Large</div>
                    <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 font-mono">shadow-mw-xl</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
      <CopyNotification show={copied} />
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Code, Download, Eye, ExternalLink } from 'lucide-react'

interface ComponentPreview {
  name: string
  code: string
  props?: Record<string, any>
}

interface LivePreviewProps {
  preview: ComponentPreview | null
}

// Sample MW Design System Components for Preview
const PreviewButton = ({ children, variant = 'primary', size = 'md', ...props }: any) => {
  const baseClasses = 'font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 rounded-lg'
  const variantClasses: Record<string, string> = {
    primary: 'bg-mw-primary-600 hover:bg-mw-primary-700 text-white focus:ring-mw-primary-500',
    secondary: 'bg-mw-gray-200 hover:bg-mw-gray-300 text-mw-gray-900 focus:ring-mw-gray-500',
    ghost: 'bg-transparent hover:bg-mw-gray-100 text-mw-gray-700 focus:ring-mw-gray-500'
  }
  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md}`}
      {...props}
    >
      {children}
    </button>
  )
}

const PreviewCard = ({ children, className = '', ...props }: any) => {
  return (
    <div 
      className={`bg-white dark:bg-mw-gray-800 rounded-xl shadow-md border border-mw-gray-200 dark:border-mw-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const PreviewCardHeader = ({ children }: any) => (
  <div className="p-6 border-b border-mw-gray-200 dark:border-mw-gray-700">
    {children}
  </div>
)

const PreviewCardContent = ({ children }: any) => (
  <div className="p-6">
    {children}
  </div>
)

const PreviewCardFooter = ({ children }: any) => (
  <div className="p-6 border-t border-mw-gray-200 dark:border-mw-gray-700 flex space-x-3">
    {children}
  </div>
)

export function LivePreview({ preview }: LivePreviewProps) {
  const renderPreview = () => {
    if (!preview) return null

    switch (preview.name.toLowerCase()) {
      case 'button':
        return (
          <div className="space-y-4">
            <PreviewButton variant="primary" size="md">
              Click Me
            </PreviewButton>
            <div className="flex space-x-2">
              <PreviewButton variant="primary" size="sm">Small</PreviewButton>
              <PreviewButton variant="primary" size="md">Medium</PreviewButton>
              <PreviewButton variant="primary" size="lg">Large</PreviewButton>
            </div>
            <div className="flex space-x-2">
              <PreviewButton variant="primary">Primary</PreviewButton>
              <PreviewButton variant="secondary">Secondary</PreviewButton>
              <PreviewButton variant="ghost">Ghost</PreviewButton>
            </div>
          </div>
        )
      
      case 'card':
        return (
          <PreviewCard className="max-w-sm">
            <PreviewCardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Card Title
              </h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-1">
                Card subtitle or description
              </p>
            </PreviewCardHeader>
            <PreviewCardContent>
              <p className="text-mw-gray-700 dark:text-mw-gray-300">
                Your card content goes here. This is a flexible container for any type of content.
              </p>
            </PreviewCardContent>
            <PreviewCardFooter>
              <PreviewButton variant="primary" size="sm">Action</PreviewButton>
              <PreviewButton variant="ghost" size="sm">Cancel</PreviewButton>
            </PreviewCardFooter>
          </PreviewCard>
        )
      
      case 'modal':
        return (
          <div className="relative">
            <div className="bg-black/20 rounded-lg p-8 border-2 border-dashed border-mw-gray-300 dark:border-mw-gray-600">
              <div className="bg-white dark:bg-mw-gray-800 rounded-lg shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Modal Title</h3>
                  <button className="text-mw-gray-400 hover:text-mw-gray-600">✕</button>
                </div>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-6">
                  This is a modal dialog example with proper overlay and content structure.
                </p>
                <div className="flex space-x-3">
                  <PreviewButton variant="primary" size="sm">Confirm</PreviewButton>
                  <PreviewButton variant="ghost" size="sm">Cancel</PreviewButton>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'form':
        return (
          <PreviewCard className="max-w-sm">
            <PreviewCardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Contact Form</h3>
            </PreviewCardHeader>
            <PreviewCardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                    Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md focus:ring-2 focus:ring-mw-primary-500 focus:border-transparent dark:bg-mw-gray-700 dark:text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md focus:ring-2 focus:ring-mw-primary-500 focus:border-transparent dark:bg-mw-gray-700 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
                <PreviewButton variant="primary" size="sm" className="w-full">
                  Submit
                </PreviewButton>
              </form>
            </PreviewCardContent>
          </PreviewCard>
        )
      
      case 'navbar':
        return (
          <div className="w-full">
            <nav className="bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="font-bold text-mw-gray-900 dark:text-white">Brand</div>
                  <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600">Home</a>
                    <a href="#" className="text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600">About</a>
                    <a href="#" className="text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600">Services</a>
                    <a href="#" className="text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600">Contact</a>
                  </div>
                </div>
                <PreviewButton variant="primary" size="sm">Get Started</PreviewButton>
              </div>
            </nav>
          </div>
        )
      
      default:
        return (
          <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-700 rounded-lg border-2 border-dashed border-mw-gray-300 dark:border-mw-gray-600">
            <div className="text-center">
              <Code className="w-8 h-8 text-mw-gray-400 mx-auto mb-2" />
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Preview for {preview.name}
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-mw-gray-50 dark:bg-mw-gray-800/50 border-b border-mw-gray-200 dark:border-mw-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-mw-gray-900 dark:text-white">Live Preview</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-900 dark:hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-900 dark:hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="p-2 text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-900 dark:hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
              Component: <span className="font-medium text-mw-gray-900 dark:text-white">{preview.name}</span>
            </div>
            
            {/* Preview Area */}
            <div className="min-h-40 flex items-center justify-center bg-mw-gray-50 dark:bg-mw-gray-900/50 rounded-lg border border-mw-gray-200 dark:border-mw-gray-600 p-6">
              {renderPreview()}
            </div>
            
            {/* Component Info */}
            <div className="space-y-2">
              <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">Features:</div>
              <div className="flex flex-wrap gap-1">
                {['Responsive', 'Accessible', 'MW Tokens', 'Dark Mode'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="pt-4 border-t border-mw-gray-200 dark:border-mw-gray-600">
              <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 mb-2">Quick Actions:</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-mw-primary-100 dark:bg-mw-primary-900/20 text-mw-primary-700 dark:text-mw-primary-300 rounded hover:bg-mw-primary-200 dark:hover:bg-mw-primary-900/40 transition-colors">
                  Export Code
                </button>
                <button className="px-3 py-1 text-xs bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600 transition-colors">
                  View Props
                </button>
                <button className="px-3 py-1 text-xs bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600 transition-colors">
                  Customize
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-mw-gray-100 dark:bg-mw-gray-700 rounded-full flex items-center justify-center mx-auto">
                <Code className="w-8 h-8 text-mw-gray-400" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-2">Ready to Create</h4>
                <p className="text-mw-gray-600 dark:text-mw-gray-400">
                  Generate a component to see live preview with interactive states
                </p>
              </div>
              <div className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
                Try: "Create a button component" or "Build a card layout"
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

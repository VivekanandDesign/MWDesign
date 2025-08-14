'use client'

import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronRight, Code } from 'lucide-react'
import { Button } from './Button'

interface CollapsibleCodeProps {
  code: string
  language?: string
  title?: string
  defaultExpanded?: boolean
  className?: string
}

export function CollapsibleCode({ 
  code, 
  language = 'tsx', 
  title, 
  defaultExpanded = false,
  className = ''
}: CollapsibleCodeProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative ${className}`}>
      {title && (
        <div className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
          {title}
        </div>
      )}
      
      {/* Toggle Button */}
      <div className="mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-2"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Code className="h-4 w-4" />
          <span>{isExpanded ? 'Hide Code' : 'Show Code'}</span>
        </Button>
      </div>

      {/* Code Block */}
      {isExpanded && (
        <div className="relative bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg p-4 pr-12">
          <pre className="text-sm text-mw-gray-800 dark:text-mw-gray-200 overflow-x-auto">
            <code className={`language-${language}`}>{code}</code>
          </pre>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

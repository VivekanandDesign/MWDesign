'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Minimize2, RotateCcw, Download, Share, Eye, Code } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'

interface FigmaEmbedProps {
  fileId: string
  nodeId?: string
  viewMode?: 'design' | 'prototype' | 'dev'
  onFrameChange?: (frameId: string) => void
  className?: string
  cardTitle?: string // Add this to show different content based on card
}

export function FigmaEmbed({ 
  fileId, 
  nodeId, 
  viewMode = 'design',
  onFrameChange,
  className = '',
  cardTitle
}: FigmaEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [embedError, setEmbedError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Construct Figma embed URL with fallback logic
  const getEmbedUrl = () => {
    const baseUrl = `https://www.figma.com/embed?embed_host=mw-design-system&url=https://www.figma.com/design/${fileId}/MW-Global-Design-System`
    
    // If nodeId is provided and not empty, add it to URL
    if (nodeId && nodeId.trim() !== '') {
      return `${baseUrl}?node-id=${nodeId}&view=${viewMode}`
    }
    
    // Fallback to base URL without node ID
    return `${baseUrl}&view=${viewMode}`
  }

  const embedUrl = getEmbedUrl()

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoading(false)
      setEmbedError(false)
    }

    const handleError = () => {
      setIsLoading(false)
      setEmbedError(true)
      console.warn(`Failed to load Figma embed with node ID: ${nodeId}`)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    // Reset loading state when URL changes
    setIsLoading(true)
    setEmbedError(false)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
    }
  }, [embedUrl, nodeId])

  const handleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setEmbedError(false)
    if (iframeRef.current) {
      iframeRef.current.src = embedUrl
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'MW Global Design System',
        text: 'Check out this Figma design system',
        url: `https://www.figma.com/design/${fileId}/MW-Global-Design-System${nodeId ? `?node-id=${nodeId}` : ''}`
      })
    } catch (error) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const viewModeConfig = {
    design: { label: 'Design', icon: Eye, color: 'mw-primary' },
    prototype: { label: 'Prototype', icon: Maximize2, color: 'mw-secondary' },
    dev: { label: 'Dev Mode', icon: Code, color: 'mw-accent' }
  }

  if (embedError) {
    return (
      <Card className={`p-8 text-center ${className}`}>
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-mw-red-100 dark:bg-mw-red-900/20 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-mw-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
              Unable to Load Figma File
            </h3>
            <p className="text-mw-gray-600 dark:text-mw-gray-400 mb-4">
              The Figma file might be private or the link has changed. Please check the permissions or try refreshing.
            </p>
            <div className="flex items-center justify-center space-x-3">
              <Button onClick={handleRefresh} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button 
                onClick={() => window.open(`https://www.figma.com/design/${fileId}`, '_blank')}
                variant="primary"
              >
                Open in Figma
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-white dark:bg-mw-gray-800 rounded-lg shadow-mw-lg overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-mw-gray-50 dark:bg-mw-gray-700 border-b border-mw-gray-200 dark:border-mw-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-mw-primary-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <div>
            <h3 className="font-semibold text-mw-gray-900 dark:text-white">
              MW Global Design System
            </h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
              {nodeId ? `Frame: ${nodeId}` : 'Full File View'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge 
            variant="secondary" 
            className={`bg-${viewModeConfig[viewMode].color}-100 text-${viewModeConfig[viewMode].color}-700`}
          >
            {React.createElement(viewModeConfig[viewMode].icon, { className: 'w-3 h-3 mr-1' })}
            {viewModeConfig[viewMode].label}
          </Badge>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={handleRefresh} title="Refresh">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} title="Share">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFullscreen} title="Fullscreen">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.open(`https://www.figma.com/design/${fileId}`, '_blank')}
              title="Open in Figma"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Embed Container */}
      <div className="relative">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-mw-gray-50 dark:bg-mw-gray-800 z-10"
          >
            <div className="text-center space-y-4">
              <Spinner size="lg" />
              <p className="text-mw-gray-600 dark:text-mw-gray-400">
                Loading Figma design...
              </p>
            </div>
          </motion.div>
        )}

        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-[70vh] border-0 bg-white"
          title="Figma Design"
          allowFullScreen
          style={{ minHeight: '600px' }}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-mw-gray-50 dark:bg-mw-gray-700 border-t border-mw-gray-200 dark:border-mw-gray-600 text-xs text-mw-gray-600 dark:text-mw-gray-400">
        <div className="flex items-center space-x-4">
          <span>File ID: {fileId}</span>
          {nodeId && <span>Node: {nodeId}</span>}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Live</span>
        </div>
      </div>
    </div>
  )
}

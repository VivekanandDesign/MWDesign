'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, GitBranch, Clock, Users, MessageCircle, Grid, Eye, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { FigmaEmbed } from './components/FigmaEmbed'
import { FigmaNavigation } from './components/FigmaNavigation'
import { DesignTokenSync } from './components/DesignTokenSync'
import { FigmaCardGrid } from './components/FigmaCardGrid'
import { useFigmaAPI } from './hooks/useFigmaAPI'

export default function FigmaViewerPage() {
  const [currentNodeId, setCurrentNodeId] = useState<string>('')
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [viewMode, setViewMode] = useState<'design' | 'prototype' | 'dev'>('design')
  const [showTokenSync, setShowTokenSync] = useState(false)
  const [showViewer, setShowViewer] = useState(false)

  // Figma file configuration
  const FIGMA_FILE_ID = 'EXdqM1gSlWdFD7u5SjPBmV'
  const DEFAULT_NODE_ID = '179-5304'
  
  const { file, frames, comments, loading, error, getFrameById } = useFigmaAPI({
    fileId: FIGMA_FILE_ID,
    nodeId: currentNodeId || DEFAULT_NODE_ID
  })

  const currentFrame = getFrameById(currentNodeId)

  const handleCardSelect = (nodeId: string, title: string) => {
    setCurrentNodeId(nodeId)
    setCurrentTitle(title)
    setShowViewer(true)
  }

  const handleBackToCards = () => {
    setShowViewer(false)
    setCurrentNodeId('')
    setCurrentTitle('')
  }

  const handleFrameSelect = (frameId: string) => {
    setCurrentNodeId(frameId)
  }

  const handleViewModeChange = (mode: 'design' | 'prototype' | 'dev') => {
    setViewMode(mode)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
        <Navigation />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-mw-primary-200 border-t-mw-primary-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-mw-gray-600 dark:text-mw-gray-400">
                  Loading Figma design system...
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
        <Navigation />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-96">
              <Card className="p-8 text-center max-w-md">
                <div className="w-16 h-16 mx-auto bg-mw-red-100 dark:bg-mw-red-900/20 rounded-full flex items-center justify-center mb-4">
                  <ExternalLink className="w-8 h-8 text-mw-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                  Unable to Load Figma File
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-400 mb-4">
                  {error}
                </p>
                <Link href="/design-process">
                  <Button>Return to Design Process</Button>
                </Link>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {showViewer ? (
                  <Button variant="outline" size="sm" onClick={handleBackToCards}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Cards
                  </Button>
                ) : null}
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-mw-gray-900 dark:text-white">
                    {showViewer && currentTitle ? currentTitle : 'Figma Design System'}
                  </h1>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {showViewer 
                      ? 'Live view of MW Global Design System in Figma'
                      : 'Explore different sections of our design system'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {showViewer && (
                  <Button
                    variant={showTokenSync ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setShowTokenSync(!showTokenSync)}
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    {showTokenSync ? 'Hide' : 'Show'} Token Sync
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://www.figma.com/design/${FIGMA_FILE_ID}/MW-Global-Design-System`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Figma
                </Button>
              </div>
            </div>

            {/* File Info - only show when viewer is active */}
            {showViewer && file && (
              <Card className="mt-6 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-mw-primary-600 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">MW</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-mw-gray-900 dark:text-white">
                          {file.name}
                        </h3>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                          Version {file.version}
                        </p>
                      </div>
                    </div>

                    <Separator orientation="vertical" className="h-8" />

                    <div className="flex items-center space-x-4 text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Updated {new Date(file.lastModified).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{frames.length} frames</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{comments.length} comments</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="success" size="sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Live
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {file.role}
                    </Badge>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>

          {/* Design Token Sync Panel */}
          <AnimatePresence>
            {showViewer && showTokenSync && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <DesignTokenSync />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {!showViewer ? (
              <motion.div
                key="card-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FigmaCardGrid onCardSelect={handleCardSelect} />
              </motion.div>
            ) : (
              <motion.div
                key="figma-viewer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8"
              >
                
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1">
                  <FigmaNavigation
                    frames={frames}
                    comments={comments}
                    currentFrameId={currentNodeId}
                    onFrameSelect={handleFrameSelect}
                    onViewModeChange={handleViewModeChange}
                    viewMode={viewMode}
                    className="sticky top-8"
                  />
                </div>

                {/* Figma Embed */}
                <div className="lg:col-span-3">
                  <motion.div
                    key={currentNodeId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FigmaEmbed
                      fileId={FIGMA_FILE_ID}
                      nodeId={currentNodeId}
                      viewMode={viewMode}
                      onFrameChange={handleFrameSelect}
                      cardTitle={currentTitle}
                    />
                  </motion.div>

                  {/* Current Frame Info */}
                  {currentFrame && (
                    <Card className="mt-6 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-mw-gray-900 dark:text-white">
                            Current Frame: {currentFrame.name}
                          </h4>
                          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {currentFrame.type} • ID: {currentFrame.id}
                          </p>
                        </div>
                        
                        {currentFrame.absoluteBoundingBox && (
                          <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {Math.round(currentFrame.absoluteBoundingBox.width)}×{Math.round(currentFrame.absoluteBoundingBox.height)}px
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions - only show when not in viewer mode */}
          {!showViewer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <Card className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                    Ready to implement these designs?
                  </h3>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400 mb-6">
                    Explore our component library and design tokens to bring these designs to life in code.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Link href="/components">
                      <Button>View Component Library</Button>
                    </Link>
                    <Link href="/tokens">
                      <Button variant="outline">Design Tokens</Button>
                    </Link>
                    <Link href="/getting-started">
                      <Button variant="outline">Getting Started</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

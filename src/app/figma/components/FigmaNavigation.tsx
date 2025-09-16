'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Frame, 
  Layers, 
  MessageCircle, 
  Bookmark,
  Clock,
  Filter,
  Grid,
  Eye
} from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import { FigmaFrame, FigmaComment } from '../types/figma'

interface FigmaNavigationProps {
  frames: FigmaFrame[]
  comments: FigmaComment[]
  currentFrameId?: string
  onFrameSelect: (frameId: string) => void
  onViewModeChange: (mode: 'design' | 'prototype' | 'dev') => void
  viewMode: 'design' | 'prototype' | 'dev'
  className?: string
}

export function FigmaNavigation({
  frames,
  comments,
  currentFrameId,
  onFrameSelect,
  onViewModeChange,
  viewMode,
  className = ''
}: FigmaNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['frames', 'recent']))
  const [filterType, setFilterType] = useState<'all' | 'components' | 'pages'>('all')

  // Filter frames based on search and filter type
  const filteredFrames = useMemo(() => {
    let filtered = frames

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(frame =>
        frame.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(frame => {
        if (filterType === 'components') {
          return frame.name.toLowerCase().includes('component') || 
                 frame.name.toLowerCase().includes('button') ||
                 frame.name.toLowerCase().includes('input') ||
                 frame.name.toLowerCase().includes('card')
        }
        if (filterType === 'pages') {
          return frame.name.toLowerCase().includes('page') || 
                 frame.name.toLowerCase().includes('overview') ||
                 frame.name.toLowerCase().includes('system')
        }
      })
    }

    return filtered
  }, [frames, searchQuery, filterType])

  // Recent frames (mock data)
  const recentFrames = useMemo(() => {
    return frames.slice(0, 3)
  }, [frames])

  // Bookmarked frames (mock data)
  const bookmarkedFrames = useMemo(() => {
    return frames.filter(frame => frame.name.includes('Components'))
  }, [frames])

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleFrameClick = (frameId: string) => {
    onFrameSelect(frameId)
  }

  const getFrameCommentCount = (frameId: string) => {
    return comments.filter(comment => 
      comment.client_meta.node_id?.includes(frameId)
    ).length
  }

  const viewModes = [
    { id: 'design', label: 'Design', icon: Eye },
    { id: 'prototype', label: 'Prototype', icon: Grid },
    { id: 'dev', label: 'Dev Mode', icon: Layers }
  ] as const

  const filters = [
    { id: 'all', label: 'All Frames' },
    { id: 'components', label: 'Components' },
    { id: 'pages', label: 'Pages' }
  ] as const

  const NavigationSection = ({ 
    title, 
    icon: Icon, 
    sectionKey, 
    children, 
    count 
  }: { 
    title: string
    icon: React.ComponentType<{ className?: string }>
    sectionKey: string
    children: React.ReactNode
    count?: number
  }) => (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full p-2 text-left hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-mw-gray-600 dark:text-mw-gray-400" />
          <span className="font-medium text-mw-gray-900 dark:text-white">{title}</span>
          {count !== undefined && (
            <Badge variant="secondary" size="sm">{count}</Badge>
          )}
        </div>
        {expandedSections.has(sectionKey) ? (
          <ChevronDown className="w-4 h-4 text-mw-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-mw-gray-400" />
        )}
      </button>
      
      <AnimatePresence>
        {expandedSections.has(sectionKey) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-6 mt-2 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const FrameItem = ({ frame }: { frame: FigmaFrame }) => {
    const commentCount = getFrameCommentCount(frame.id)
    const isActive = currentFrameId === frame.id

    return (
      <motion.button
        whileHover={{ x: 4 }}
        onClick={() => handleFrameClick(frame.id)}
        className={`w-full text-left p-3 rounded-lg transition-all ${
          isActive
            ? 'bg-mw-primary-100 dark:bg-mw-primary-900/20 border border-mw-primary-200 dark:border-mw-primary-700'
            : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <Frame className={`w-3 h-3 flex-shrink-0 ${
              isActive ? 'text-mw-primary-600' : 'text-mw-gray-400'
            }`} />
            <span className={`text-sm truncate ${
              isActive 
                ? 'text-mw-primary-900 dark:text-mw-primary-100 font-medium' 
                : 'text-mw-gray-700 dark:text-mw-gray-300'
            }`}>
              {frame.name}
            </span>
          </div>
          {commentCount > 0 && (
            <Badge variant="secondary" size="sm" className="ml-2">
              <MessageCircle className="w-3 h-3 mr-1" />
              {commentCount}
            </Badge>
          )}
        </div>
      </motion.button>
    )
  }

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <div className="p-4 border-b border-mw-gray-200 dark:border-mw-gray-700">
        <h2 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
          Design System Navigator
        </h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
          <Input
            placeholder="Search frames..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* View Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-mw-gray-100 dark:bg-mw-gray-700 rounded-lg mb-4">
          {viewModes.map((mode) => (
            <Button
              key={mode.id}
              variant={viewMode === mode.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange(mode.id)}
              className="flex-1"
            >
              <mode.icon className="w-3 h-3 mr-1" />
              {mode.label}
            </Button>
          ))}
        </div>

        {/* Filter */}
        <div className="flex space-x-1">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={filterType === filter.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterType(filter.id as any)}
              className="flex-1 text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Recent Frames */}
        <NavigationSection
          title="Recent"
          icon={Clock}
          sectionKey="recent"
          count={recentFrames.length}
        >
          {recentFrames.map((frame) => (
            <FrameItem key={frame.id} frame={frame} />
          ))}
        </NavigationSection>

        <Separator className="my-4" />

        {/* Bookmarked Frames */}
        <NavigationSection
          title="Bookmarked"
          icon={Bookmark}
          sectionKey="bookmarked"
          count={bookmarkedFrames.length}
        >
          {bookmarkedFrames.map((frame) => (
            <FrameItem key={frame.id} frame={frame} />
          ))}
        </NavigationSection>

        <Separator className="my-4" />

        {/* All Frames */}
        <NavigationSection
          title="All Frames"
          icon={Layers}
          sectionKey="frames"
          count={filteredFrames.length}
        >
          {filteredFrames.map((frame) => (
            <FrameItem key={frame.id} frame={frame} />
          ))}
        </NavigationSection>

        {/* Comments Section */}
        {comments.length > 0 && (
          <>
            <Separator className="my-4" />
            <NavigationSection
              title="Comments"
              icon={MessageCircle}
              sectionKey="comments"
              count={comments.length}
            >
              {comments.slice(0, 5).map((comment) => (
                <div
                  key={comment.id}
                  className="p-2 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 rounded-lg cursor-pointer"
                >
                  <div className="flex items-start space-x-2">
                    <img
                      src={comment.user.img_url}
                      alt={comment.user.handle}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400 truncate">
                        {comment.user.handle}
                      </p>
                      <p className="text-sm text-mw-gray-900 dark:text-white line-clamp-2">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </NavigationSection>
          </>
        )}
      </div>
    </Card>
  )
}

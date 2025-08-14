'use client'

import React, { useState, useRef } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  DownloadIcon,
  ExternalLink,
  Eye,
  X,
  ZoomIn,
  RotateCw,
  Share2,
  Heart,
  Bookmark,
  MoreHorizontal
} from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

type ThumbnailType = 'image' | 'video' | 'document' | 'audio' | 'file'

interface ThumbnailProps {
  src: string
  alt?: string
  type?: ThumbnailType
  title?: string
  subtitle?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall' | 'auto'
  hover?: boolean
  clickable?: boolean
  selected?: boolean
  badge?: React.ReactNode
  overlay?: React.ReactNode
  actions?: Array<{
    icon: React.ReactNode
    label: string
    onClick: () => void
  }>
  showPreview?: boolean
  className?: string
  onSelect?: () => void
  onClick?: () => void
  onPreview?: () => void
  onDownload?: () => void
  onLoad?: () => void
  onError?: () => void
  loading?: boolean
  error?: boolean
  placeholder?: React.ReactNode
}

const thumbnailSizes = {
  xs: 'w-16 h-16',
  sm: 'w-24 h-24', 
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64'
}

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[3/2]',
  tall: 'aspect-[2/3]',
  auto: ''
}

const typeIcons = {
  image: '🖼️',
  video: '🎥',
  document: '📄',
  audio: '🎵',
  file: '📁'
}

interface VideoThumbnailProps extends ThumbnailProps {
  duration?: string
  autoPlay?: boolean
  muted?: boolean
}

interface ImageThumbnailProps extends ThumbnailProps {
  lazy?: boolean
  fallback?: string
}

export function Thumbnail({
  src,
  alt = '',
  type = 'image',
  title,
  subtitle,
  size = 'md',
  aspectRatio = 'auto',
  hover = true,
  clickable = false,
  selected = false,
  badge,
  overlay,
  actions,
  showPreview = false,
  className,
  onSelect,
  onClick,
  onPreview,
  onDownload,
  onLoad,
  onError,
  loading = false,
  error = false,
  placeholder
}: ThumbnailProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (clickable && onClick) {
      onClick()
    } else if (onSelect) {
      onSelect()
    }
  }

  const handleImageError = () => {
    setImageError(true)
    if (onError) {
      onError()
    }
  }

  const handleImageLoad = () => {
    if (onLoad) {
      onLoad()
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="w-full h-full bg-mw-gray-200 dark:bg-mw-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-mw-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )
    }

    if (error || imageError) {
      return (
        <div className="w-full h-full bg-mw-gray-100 dark:bg-mw-gray-800 flex flex-col items-center justify-center text-mw-gray-400 dark:text-mw-gray-500">
          {placeholder || (
            <>
              <X className="w-8 h-8 mb-2" />
              <span className="text-xs">Failed to load</span>
            </>
          )}
        </div>
      )
    }

    switch (type) {
      case 'image':
        return (
          <img
            src={src}
            alt={alt}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover"
          />
        )
      
      case 'video':
        return (
          <div className="relative w-full h-full">
            <video
              src={src}
              className="w-full h-full object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-black ml-1" />
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="w-full h-full bg-mw-gray-100 dark:bg-mw-gray-800 flex flex-col items-center justify-center">
            <div className="text-2xl mb-2">{typeIcons[type]}</div>
            <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 uppercase tracking-wide">
              {type}
            </div>
          </div>
        )
    }
  }

  const renderOverlay = () => {
    if (!hover || (!isHovered && !selected)) return null

    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-2">
          {showPreview && onPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPreview()
              }}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors"
              title="Preview"
            >
              <Eye className="w-4 h-4 text-black" />
            </button>
          )}
          
          {onDownload && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDownload()
              }}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors"
              title="Download"
            >
              <DownloadIcon className="w-4 h-4 text-black" />
            </button>
          )}
          
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                action.onClick()
              }}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative group cursor-pointer',
        aspectRatio !== 'auto' ? aspectRatios[aspectRatio] : thumbnailSizes[size],
        clickable && 'hover:shadow-lg transition-shadow duration-200',
        selected && 'ring-2 ring-mw-blue-500',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Content */}
      <div className="w-full h-full rounded-lg overflow-hidden bg-mw-gray-100 dark:bg-mw-gray-800">
        {renderContent()}
      </div>

      {/* Badge */}
      {badge && (
        <div className="absolute top-2 right-2 z-10">
          {badge}
        </div>
      )}

      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-2 left-2 z-10">
          <div className="w-5 h-5 bg-mw-blue-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      )}

      {/* Hover Overlay */}
      {renderOverlay()}

      {/* Custom Overlay */}
      {overlay && (
        <div className="absolute inset-0 z-20">
          {overlay}
        </div>
      )}

      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <div className="mt-2">
          {title && (
            <div className="text-sm font-medium text-mw-gray-900 dark:text-white truncate">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 truncate">
              {subtitle}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function VideoThumbnail({
  duration,
  autoPlay = false,
  muted = true,
  ...props
}: VideoThumbnailProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Thumbnail
      {...props}
      type="video"
      overlay={
        <div className="absolute inset-0">
          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          )}
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
          </div>
        </div>
      }
    />
  )
}

export function ImageThumbnail({
  lazy = true,
  fallback,
  ...props
}: ImageThumbnailProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <Thumbnail
      {...props}
      type="image"
      loading={lazy && !loaded && !error}
      error={error}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      placeholder={
        fallback ? (
          <img src={fallback} alt="Fallback" className="w-full h-full object-cover opacity-50" />
        ) : undefined
      }
    />
  )
}

// Gallery Component for multiple thumbnails
interface ThumbnailGalleryProps {
  items: Array<ThumbnailProps & { id: string }>
  columns?: number
  gap?: 'sm' | 'md' | 'lg'
  selectable?: boolean
  selectedIds?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  className?: string
}

const galleryGaps = {
  sm: 'gap-2',
  md: 'gap-4', 
  lg: 'gap-6'
}

export function ThumbnailGallery({
  items,
  columns = 4,
  gap = 'md',
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  className
}: ThumbnailGalleryProps) {
  const handleSelection = (id: string) => {
    if (!selectable || !onSelectionChange) return

    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
    
    onSelectionChange(newSelection)
  }

  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${columns}`,
        galleryGaps[gap],
        className
      )}
    >
      {items.map((item) => (
        <Thumbnail
          key={item.id}
          {...item}
          selected={selectable && selectedIds.includes(item.id)}
          onSelect={() => handleSelection(item.id)}
        />
      ))}
    </div>
  )
}

export default Thumbnail

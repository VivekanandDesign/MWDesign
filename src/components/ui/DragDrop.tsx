'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  Music, 
  Archive, 
  FileText,
  X,
  Check,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  RefreshCw,
  Move,
  GripVertical
} from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// File type definitions
export interface DroppedFile {
  id: string
  file: File
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress?: number
  error?: string
  preview?: string
}

// Drag and Drop Hook
export function useDragDrop({
  onDrop,
  accept,
  multiple = true,
  maxSize,
  onError
}: {
  onDrop: (files: File[]) => void
  accept?: string[]
  multiple?: boolean
  maxSize?: number
  onError?: (error: string) => void
}) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [isDragReject, setIsDragReject] = useState(false)
  const dragCounter = useRef(0)

  const validateFile = useCallback((file: File): boolean => {
    if (accept && accept.length > 0) {
      const fileType = file.type
      const fileName = file.name.toLowerCase()
      const isValidType = accept.some(acceptType => {
        if (acceptType.startsWith('.')) {
          return fileName.endsWith(acceptType)
        }
        if (acceptType.includes('/*')) {
          return fileType.startsWith(acceptType.replace('/*', ''))
        }
        return fileType === acceptType
      })
      
      if (!isValidType) {
        onError?.(`File type ${fileType} is not accepted`)
        return false
      }
    }

    if (maxSize && file.size > maxSize) {
      onError?.(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`)
      return false
    }

    return true
  }, [accept, maxSize, onError])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsDragActive(false)
    setIsDragReject(false)
    dragCounter.current = 0

    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(validateFile)
    
    if (!multiple && validFiles.length > 1) {
      onError?.('Multiple files not allowed')
      return
    }

    if (validFiles.length > 0) {
      onDrop(validFiles)
    }
  }, [multiple, onDrop, validateFile, onError])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    
    if (dragCounter.current === 0) {
      setIsDragActive(false)
      setIsDragReject(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Check if files being dragged are valid
    const files = Array.from(e.dataTransfer.files)
    const hasInvalidFiles = files.some(file => !validateFile(file))
    setIsDragReject(hasInvalidFiles)
  }, [validateFile])

  return {
    isDragActive,
    isDragReject,
    dragProps: {
      onDrop: handleDrop,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver
    }
  }
}

// File Icon Component
function getFileIcon(file: File) {
  const type = file.type
  const name = file.name.toLowerCase()

  if (type.startsWith('image/')) return <Image className="w-6 h-6" />
  if (type.startsWith('video/')) return <Video className="w-6 h-6" />
  if (type.startsWith('audio/')) return <Music className="w-6 h-6" />
  if (type.includes('pdf') || name.endsWith('.pdf')) return <FileText className="w-6 h-6" />
  if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return <Archive className="w-6 h-6" />
  return <File className="w-6 h-6" />
}

// Main Drag and Drop Component
interface DragDropProps {
  onFileDrop: (files: File[]) => void
  accept?: string[]
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  showPreview?: boolean
  compact?: boolean
}

export function DragDrop({
  onFileDrop,
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  disabled = false,
  className,
  children,
  showPreview = true,
  compact = false
}: DragDropProps) {
  const [files, setFiles] = useState<DroppedFile[]>([])
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isDragActive, isDragReject, dragProps } = useDragDrop({
    onDrop: handleFileDrop,
    accept,
    multiple,
    maxSize,
    onError: setError
  })

  function handleFileDrop(droppedFiles: File[]) {
    if (disabled) return

    let filesToAdd = droppedFiles
    
    if (maxFiles) {
      const remainingSlots = maxFiles - files.length
      if (remainingSlots <= 0) {
        setError(`Maximum ${maxFiles} files allowed`)
        return
      }
      filesToAdd = droppedFiles.slice(0, remainingSlots)
    }

    const newFiles: DroppedFile[] = filesToAdd.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))

    setFiles(prev => [...prev, ...newFiles])
    onFileDrop(filesToAdd)
    setError('')
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      handleFileDrop(selectedFiles)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const clearAll = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
    setError('')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [files])

  if (compact) {
    return (
      <div className={cn('relative', className)}>
        <div
          {...dragProps}
          className={cn(
            'border-2 border-dashed rounded-lg p-4 text-center transition-colors',
            isDragActive && !isDragReject && 'border-mw-blue-500 bg-mw-blue-50 dark:bg-mw-blue-950',
            isDragReject && 'border-red-500 bg-red-50 dark:bg-red-950',
            !isDragActive && 'border-mw-gray-300 dark:border-mw-gray-600',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple={multiple}
            accept={accept?.join(',')}
            onChange={handleFileInput}
            disabled={disabled}
          />
          
          <div className="flex items-center justify-center space-x-2">
            <Upload className="w-5 h-5 text-mw-gray-400" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-mw-blue-600 hover:text-mw-blue-700 font-medium"
              disabled={disabled}
            >
              Choose files
            </button>
            <span className="text-sm text-mw-gray-500">or drag here</span>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        {...dragProps}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragActive && !isDragReject && 'border-mw-blue-500 bg-mw-blue-50 dark:bg-mw-blue-950',
          isDragReject && 'border-red-500 bg-red-50 dark:bg-red-950',
          !isDragActive && 'border-mw-gray-300 dark:border-mw-gray-600 hover:border-mw-gray-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept?.join(',')}
          onChange={handleFileInput}
          disabled={disabled}
        />

        {children || (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-mw-gray-100 dark:bg-mw-gray-800 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-mw-gray-400" />
            </div>
            
            <div className="space-y-2">
              <div className="text-lg font-medium text-mw-gray-900 dark:text-white">
                {isDragActive 
                  ? isDragReject 
                    ? 'Invalid file type' 
                    : 'Drop files here'
                  : 'Upload files'
                }
              </div>
              
              <div className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-mw-blue-600 hover:text-mw-blue-700 font-medium"
                  disabled={disabled}
                >
                  Choose files
                </button>
                {' '}or drag and drop
              </div>

              {(accept || maxSize || maxFiles) && (
                <div className="text-xs text-mw-gray-400 space-y-1">
                  {accept && (
                    <div>Accepted: {accept.join(', ')}</div>
                  )}
                  {maxSize && (
                    <div>Max size: {Math.round(maxSize / 1024 / 1024)}MB</div>
                  )}
                  {maxFiles && (
                    <div>Max files: {maxFiles}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* File List */}
      {showPreview && files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-mw-gray-900 dark:text-white">
              Files ({files.length})
            </h4>
            <button
              onClick={clearAll}
              className="text-sm text-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2">
            {files.map((droppedFile) => (
              <FilePreview
                key={droppedFile.id}
                file={droppedFile}
                onRemove={() => removeFile(droppedFile.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// File Preview Component
interface FilePreviewProps {
  file: DroppedFile
  onRemove: () => void
  showActions?: boolean
}

function FilePreview({ file, onRemove, showActions = true }: FilePreviewProps) {
  const [showFullPreview, setShowFullPreview] = useState(false)

  return (
    <>
      <div className="flex items-center space-x-3 p-3 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
        {/* File Icon/Preview */}
        <div className="flex-shrink-0">
          {file.preview ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-mw-gray-200 dark:bg-mw-gray-700 rounded-lg flex items-center justify-center text-mw-gray-500">
              {getFileIcon(file.file)}
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-mw-gray-900 dark:text-white truncate">
            {file.file.name}
          </div>
          <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
            {file.file.type || 'Unknown'} - {file.file.size ? `${(file.file.size / 1024).toFixed(1)} KB` : 'Unknown size'}
          </div>
          
          {/* Progress Bar */}
          {file.status === 'uploading' && file.progress !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full h-1">
                <div
                  className="bg-mw-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {file.status === 'error' && file.error && (
            <div className="mt-1 text-xs text-red-600 dark:text-red-400">
              {file.error}
            </div>
          )}
        </div>

        {/* Status Icon */}
        <div className="flex-shrink-0">
          {file.status === 'uploading' && (
            <RefreshCw className="w-4 h-4 text-mw-blue-500 animate-spin" />
          )}
          {file.status === 'success' && (
            <Check className="w-4 h-4 text-green-500" />
          )}
          {file.status === 'error' && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center space-x-1">
            {file.preview && (
              <button
                onClick={() => setShowFullPreview(true)}
                className="p-1.5 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300 rounded"
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={onRemove}
              className="p-1.5 text-mw-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Full Preview Modal */}
      {showFullPreview && file.preview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowFullPreview(false)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={file.preview}
              alt={file.file.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}

// Sortable Drag and Drop List
interface SortableItem {
  id: string
  content: React.ReactNode
}

interface SortableListProps {
  items: SortableItem[]
  onReorder: (items: SortableItem[]) => void
  className?: string
  itemClassName?: string
}

export function SortableList({ items, onReorder, className, itemClassName }: SortableListProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDragOverItem(id)
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = items.findIndex(item => item.id === draggedItem)
    const targetIndex = items.findIndex(item => item.id === targetId)
    
    const newItems = [...items]
    const draggedItemData = newItems[draggedIndex]
    
    // Remove dragged item
    newItems.splice(draggedIndex, 1)
    
    // Insert at new position
    newItems.splice(targetIndex, 0, draggedItemData)
    
    onReorder(newItems)
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDrop={(e) => handleDrop(e, item.id)}
          onDragEnd={handleDragEnd}
          className={cn(
            'flex items-center space-x-3 p-3 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg cursor-move transition-colors',
            draggedItem === item.id && 'opacity-50',
            dragOverItem === item.id && 'border-mw-blue-500 bg-mw-blue-50 dark:bg-mw-blue-950',
            itemClassName
          )}
        >
          <GripVertical className="w-4 h-4 text-mw-gray-400" />
          <div className="flex-1">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DragDrop

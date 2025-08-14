'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, File, Image, FileText } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void
  onError?: (error: string) => void
  multiple?: boolean
  accept?: string
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  variant?: 'dropzone' | 'button' | 'input'
  showPreview?: boolean
}

interface FileItemProps {
  file: File
  onRemove?: () => void
  showPreview?: boolean
}

interface DragDropZoneProps {
  onDrop: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getFileIcon(file: File) {
  if (file.type.startsWith('image/')) {
    return <Image className="w-4 h-4" />
  }
  if (file.type.includes('text/') || file.type.includes('application/json')) {
    return <FileText className="w-4 h-4" />
  }
  return <File className="w-4 h-4" />
}

function FileItem({ file, onRemove, showPreview = true }: FileItemProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  React.useEffect(() => {
    if (showPreview && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file, showPreview])

  return (
    <div className="flex items-center p-3 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
      <div className="flex-shrink-0 mr-3">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={file.name}
            className="w-10 h-10 object-cover rounded"
          />
        ) : (
          <div className="w-10 h-10 bg-mw-gray-200 dark:bg-mw-gray-700 rounded flex items-center justify-center text-mw-gray-500">
            {getFileIcon(file)}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-mw-gray-900 dark:text-white truncate">
          {file.name}
        </p>
        <p className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
          {formatFileSize(file.size)}
        </p>
      </div>
      
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 ml-2 p-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

function DragDropZone({
  onDrop,
  accept,
  multiple = false,
  disabled = false,
  children,
  className
}: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    
    // Filter files by accept type if specified
    const filteredFiles = accept 
      ? files.filter(file => {
          const acceptTypes = accept.split(',').map(type => type.trim())
          return acceptTypes.some(type => {
            if (type.startsWith('.')) {
              return file.name.toLowerCase().endsWith(type.toLowerCase())
            }
            return file.type.match(new RegExp(type.replace('*', '.*')))
          })
        })
      : files

    const finalFiles = multiple ? filteredFiles : filteredFiles.slice(0, 1)
    onDrop(finalFiles)
  }, [onDrop, accept, multiple, disabled])

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        'relative',
        isDragOver && 'opacity-75',
        className
      )}
    >
      {children}
    </div>
  )
}

export function FileUpload({
  onFilesChange,
  onError,
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  disabled = false,
  className,
  children,
  variant = 'dropzone',
  showPreview = true
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFiles = useCallback((newFiles: File[]): File[] => {
    const validFiles: File[] = []

    for (const file of newFiles) {
      // Check file size
      if (maxSize && file.size > maxSize) {
        onError?.(`File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`)
        continue
      }

      // Check file count
      if (maxFiles && files.length + validFiles.length >= maxFiles) {
        onError?.(`Maximum ${maxFiles} files allowed.`)
        break
      }

      validFiles.push(file)
    }

    return validFiles
  }, [files.length, maxSize, maxFiles, onError])

  const handleFilesChange = useCallback((newFiles: File[]) => {
    const validFiles = validateFiles(newFiles)
    
    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    }
  }, [files, multiple, validateFiles, onFilesChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFilesChange(selectedFiles)
    
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  if (variant === 'button') {
    return (
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
        
        <button
          onClick={openFileDialog}
          disabled={disabled}
          className="inline-flex items-center px-4 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md shadow-sm text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 bg-white dark:bg-mw-gray-800 hover:bg-mw-gray-50 dark:hover:bg-mw-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mw-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4 mr-2" />
          {children || 'Choose Files'}
        </button>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <FileItem
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => removeFile(index)}
                showPreview={showPreview}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'input') {
    return (
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          className="block w-full text-sm text-mw-gray-500 dark:text-mw-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-mw-blue-50 file:text-mw-blue-700 hover:file:bg-mw-blue-100 dark:file:bg-mw-blue-900/20 dark:file:text-mw-blue-300 dark:hover:file:bg-mw-blue-900/30"
        />

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <FileItem
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => removeFile(index)}
                showPreview={showPreview}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default dropzone variant
  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        disabled={disabled}
        className="hidden"
      />

      <DragDropZone
        onDrop={handleFilesChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="w-full"
      >
        <div
          onClick={openFileDialog}
          className={cn(
            'w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors',
            disabled
              ? 'border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800 cursor-not-allowed'
              : 'border-mw-gray-300 dark:border-mw-gray-600 hover:border-mw-blue-400 dark:hover:border-mw-blue-500 hover:bg-mw-blue-50 dark:hover:bg-mw-blue-900/10'
          )}
        >
          <Upload className="w-8 h-8 mx-auto mb-4 text-mw-gray-400" />
          
          {children || (
            <div>
              <p className="text-sm font-medium text-mw-gray-900 dark:text-white mb-1">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                {accept && `Accepts: ${accept}`}
                {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                {maxFiles && ` • Max files: ${maxFiles}`}
              </p>
            </div>
          )}
        </div>
      </DragDropZone>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <FileItem
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => removeFile(index)}
              showPreview={showPreview}
            />
          ))}
        </div>
      )}
    </div>
  )
}

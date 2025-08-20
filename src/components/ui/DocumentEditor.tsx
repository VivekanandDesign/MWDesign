'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { 
  Save, 
  Download, 
  Upload, 
  FileText, 
  Eye, 
  Edit3, 
  Share2, 
  Settings, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw,
  Search,
  Replace,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Palette,
  Plus,
  Minus
} from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface DocumentEditorProps {
  value?: string
  onChange?: (value: string) => void
  title?: string
  onTitleChange?: (title: string) => void
  mode?: 'edit' | 'view' | 'split'
  showToolbar?: boolean
  showSidebar?: boolean
  showStatusBar?: boolean
  autoSave?: boolean
  autoSaveInterval?: number
  className?: string
  onSave?: (content: string) => void
  onExport?: (format: 'pdf' | 'docx' | 'txt') => void
  readOnly?: boolean
  collaborative?: boolean
  zoom?: number
  onZoomChange?: (zoom: number) => void
}

interface DocumentStats {
  characters: number
  words: number
  lines: number
  pages: number
}

function calculateStats(content: string): DocumentStats {
  const characters = content.length
  const words = content.trim() ? content.trim().split(/\s+/).length : 0
  const lines = content.split('\n').length
  const pages = Math.ceil(words / 250) || 1 // Approximate 250 words per page
  
  return { characters, words, lines, pages }
}

export function DocumentEditor({
  value = '',
  onChange,
  title = 'Untitled Document',
  onTitleChange,
  mode = 'edit',
  showToolbar = true,
  showSidebar = false,
  showStatusBar = true,
  autoSave = false,
  autoSaveInterval = 30000,
  className,
  onSave,
  onExport,
  readOnly = false,
  collaborative = false,
  zoom = 100,
  onZoomChange
}: DocumentEditorProps) {
  const [content, setContent] = useState(value)
  const [documentTitle, setDocumentTitle] = useState(title)
  const [currentMode, setCurrentMode] = useState(mode)
  const [isModified, setIsModified] = useState(false)
  const [findReplace, setFindReplace] = useState({ show: false, find: '', replace: '' })
  const [currentZoom, setCurrentZoom] = useState(zoom)
  const [stats, setStats] = useState<DocumentStats>(calculateStats(value))
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const autoSaveRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setContent(value)
    setStats(calculateStats(value))
  }, [value])

  useEffect(() => {
    if (autoSave && isModified) {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
      autoSaveRef.current = setTimeout(() => {
        handleSave()
      }, autoSaveInterval)
    }
    return () => {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    }
  }, [content, isModified, autoSave, autoSaveInterval])

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)
    setStats(calculateStats(newContent))
    setIsModified(true)
    onChange?.(newContent)
  }, [onChange])

  const handleTitleChange = useCallback((newTitle: string) => {
    setDocumentTitle(newTitle)
    onTitleChange?.(newTitle)
  }, [onTitleChange])

  const handleSave = useCallback(() => {
    onSave?.(content)
    setIsModified(false)
  }, [content, onSave])

  const handleZoom = useCallback((newZoom: number) => {
    const clampedZoom = Math.max(50, Math.min(200, newZoom))
    setCurrentZoom(clampedZoom)
    onZoomChange?.(clampedZoom)
  }, [onZoomChange])

  const formatText = useCallback((command: string, value?: string) => {
    if (readOnly || !editorRef.current) return
    
    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    let newText = selectedText
    switch (command) {
      case 'bold':
        newText = `**${selectedText}**`
        break
      case 'italic':
        newText = `*${selectedText}*`
        break
      case 'underline':
        newText = `_${selectedText}_`
        break
      case 'heading1':
        newText = `# ${selectedText}`
        break
      case 'heading2':
        newText = `## ${selectedText}`
        break
      case 'bulletList':
        newText = `- ${selectedText}`
        break
      case 'numberedList':
        newText = `1. ${selectedText}`
        break
    }
    
    const newContent = content.substring(0, start) + newText + content.substring(end)
    handleContentChange(newContent)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + newText.length)
    }, 0)
  }, [content, readOnly, handleContentChange])

  const toolbar = showToolbar && (
    <div className="flex items-center justify-between p-2 border-b border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800/50">
      <div className="flex items-center gap-2">
        {/* File Operations */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleSave}
            disabled={!isModified}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 disabled:opacity-50"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={() => onExport?.('pdf')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Export as PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600" />

        {/* Formatting */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => formatText('bold')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('italic')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('underline')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => formatText('alignLeft')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('alignCenter')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText('alignRight')}
            className="p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* View Mode */}
        <div className="flex items-center border border-mw-gray-300 dark:border-mw-gray-600 rounded-md">
          <button
            onClick={() => setCurrentMode('edit')}
            className={cn(
              'px-3 py-1 text-sm rounded-l-md',
              currentMode === 'edit' 
                ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'
            )}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMode('view')}
            className={cn(
              'px-3 py-1 text-sm',
              currentMode === 'view' 
                ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'
            )}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMode('split')}
            className={cn(
              'px-3 py-1 text-sm rounded-r-md',
              currentMode === 'split' 
                ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'
            )}
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleZoom(currentZoom - 10)}
            className="p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm min-w-[3rem] text-center">{currentZoom}%</span>
          <button
            onClick={() => handleZoom(currentZoom + 10)}
            className="p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const statusBar = showStatusBar && (
    <div className="flex items-center justify-between p-2 border-t border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800/50 text-xs text-mw-gray-600 dark:text-mw-gray-400">
      <div className="flex items-center gap-4">
        <span>{stats.words} words</span>
        <span>{stats.characters} characters</span>
        <span>{stats.lines} lines</span>
        <span>Page {stats.pages}</span>
        {isModified && <span className="text-mw-orange-500">- Unsaved changes</span>}
        {autoSave && <span className="text-mw-green-500">- Auto-save enabled</span>}
      </div>
      <div className="flex items-center gap-4">
        {collaborative && <span className="text-mw-blue-500">- Collaborative</span>}
        <span>UTF-8</span>
      </div>
    </div>
  )

  const editorContent = (
    <div className="flex-1 relative">
      <textarea
        ref={editorRef}
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Start writing your document..."
        readOnly={readOnly}
        className={cn(
          'w-full h-full p-6 border-0 resize-none focus:outline-none',
          'bg-white dark:bg-mw-gray-900',
          'text-mw-gray-900 dark:text-white',
          'placeholder-mw-gray-500 dark:placeholder-mw-gray-400',
          'font-mono leading-relaxed'
        )}
        style={{ 
          fontSize: `${currentZoom}%`,
          lineHeight: 1.6,
          minHeight: '500px'
        }}
      />
    </div>
  )

  const previewContent = (
    <div className="flex-1 p-6 overflow-auto">
      <div 
        className="prose prose-lg max-w-none dark:prose-invert"
        style={{ fontSize: `${currentZoom}%` }}
      >
        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
      </div>
    </div>
  )

  return (
    <div className={cn('flex flex-col h-full border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden bg-white dark:bg-mw-gray-900', className)}>
      {/* Document Title */}
      <div className="p-3 border-b border-mw-gray-200 dark:border-mw-gray-700">
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-lg font-semibold bg-transparent border-0 focus:outline-none w-full text-mw-gray-900 dark:text-white"
          placeholder="Document title..."
          readOnly={readOnly}
        />
      </div>

      {toolbar}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {currentMode === 'edit' && editorContent}
        {currentMode === 'view' && previewContent}
        {currentMode === 'split' && (
          <>
            <div className="flex-1 border-r border-mw-gray-200 dark:border-mw-gray-700">
              {editorContent}
            </div>
            <div className="flex-1">
              {previewContent}
            </div>
          </>
        )}
      </div>

      {statusBar}
    </div>
  )
}

export default DocumentEditor

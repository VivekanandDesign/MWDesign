import { useState, useCallback } from 'react'
import { 
  generateCopyContent, 
  copyToClipboard, 
  downloadSVG, 
  CopyType, 
  SVGCopyOptions 
} from '@/utils/svgExtractor'

export interface CopyState {
  copiedIcon: string | null
  copiedType: CopyType | null
  isLoading: boolean
  error: string | null
}

export interface UseCopyIconReturn {
  copyState: CopyState
  copyIcon: (iconName: string, type: CopyType, options?: SVGCopyOptions) => Promise<void>
  downloadIcon: (iconName: string, options?: SVGCopyOptions) => Promise<void>
  clearCopyState: () => void
}

/**
 * Custom hook for managing icon copy functionality
 */
export const useCopyIcon = (onSuccess?: (iconName: string, type: CopyType) => void, onError?: (error: string) => void): UseCopyIconReturn => {
  const [copyState, setCopyState] = useState<CopyState>({
    copiedIcon: null,
    copiedType: null,
    isLoading: false,
    error: null
  })

  const copyIcon = useCallback(async (
    iconName: string, 
    type: CopyType, 
    options: SVGCopyOptions = {}
  ) => {
    setCopyState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const content = generateCopyContent(iconName, type, options)
      const success = await copyToClipboard(content, type)

      if (success) {
        setCopyState({
          copiedIcon: iconName,
          copiedType: type,
          isLoading: false,
          error: null
        })

        // Call success callback
        onSuccess?.(iconName, type)

        // Auto-clear after 2 seconds
        setTimeout(() => {
          setCopyState(prev => ({ 
            ...prev, 
            copiedIcon: null, 
            copiedType: null 
          }))
        }, 2000)
      } else {
        throw new Error('Failed to copy to clipboard')
      }
    } catch (error) {
      console.error('Copy failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Copy failed'
      
      setCopyState({
        copiedIcon: null,
        copiedType: null,
        isLoading: false,
        error: errorMessage
      })

      // Call error callback
      onError?.(errorMessage)

      // Auto-clear error after 3 seconds
      setTimeout(() => {
        setCopyState(prev => ({ ...prev, error: null }))
      }, 3000)
    }
  }, [onSuccess, onError])

  const downloadIcon = useCallback(async (
    iconName: string, 
    options: SVGCopyOptions = {}
  ) => {
    setCopyState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      downloadSVG(iconName, options)
      
      setCopyState({
        copiedIcon: iconName,
        copiedType: CopyType.DOWNLOAD,
        isLoading: false,
        error: null
      })

      // Call success callback
      onSuccess?.(iconName, CopyType.DOWNLOAD)

      // Auto-clear after 2 seconds
      setTimeout(() => {
        setCopyState(prev => ({ 
          ...prev, 
          copiedIcon: null, 
          copiedType: null 
        }))
      }, 2000)
    } catch (error) {
      console.error('Download failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Download failed'
      
      setCopyState({
        copiedIcon: null,
        copiedType: null,
        isLoading: false,
        error: errorMessage
      })

      // Call error callback
      onError?.(errorMessage)

      // Auto-clear error after 3 seconds
      setTimeout(() => {
        setCopyState(prev => ({ ...prev, error: null }))
      }, 3000)
    }
  }, [onSuccess, onError])

  const clearCopyState = useCallback(() => {
    setCopyState({
      copiedIcon: null,
      copiedType: null,
      isLoading: false,
      error: null
    })
  }, [])

  return {
    copyState,
    copyIcon,
    downloadIcon,
    clearCopyState
  }
}

/**
 * Hook for managing copy preferences
 */
export interface CopyPreferences {
  defaultCopyType: CopyType
  defaultSVGSize: number
  defaultStrokeWidth: number
  autoCleanSVG: boolean
  showCopyConfirmation: boolean
}

const DEFAULT_PREFERENCES: CopyPreferences = {
  defaultCopyType: CopyType.SVG,
  defaultSVGSize: 24,
  defaultStrokeWidth: 2,
  autoCleanSVG: true,
  showCopyConfirmation: true
}

export const useCopyPreferences = () => {
  const [preferences, setPreferences] = useState<CopyPreferences>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mw-icon-copy-preferences')
      return stored ? JSON.parse(stored) : DEFAULT_PREFERENCES
    }
    return DEFAULT_PREFERENCES
  })

  const updatePreferences = useCallback((updates: Partial<CopyPreferences>) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, ...updates }
      if (typeof window !== 'undefined') {
        localStorage.setItem('mw-icon-copy-preferences', JSON.stringify(newPreferences))
      }
      return newPreferences
    })
  }, [])

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mw-icon-copy-preferences')
    }
  }, [])

  return {
    preferences,
    updatePreferences,
    resetPreferences
  }
}

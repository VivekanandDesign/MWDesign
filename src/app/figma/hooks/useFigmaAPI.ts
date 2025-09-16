'use client'

import { useState, useEffect, useCallback } from 'react'
import { FigmaFile, FigmaComment, FigmaFrame } from '../types/figma'

// Note: For demo purposes, we'll use the embed URL approach
// In production, you'd need a Figma API token and proper backend integration

interface UseFigmaAPIProps {
  fileId: string
  nodeId?: string
}

interface FigmaAPIState {
  file: FigmaFile | null
  frames: FigmaFrame[]
  comments: FigmaComment[]
  loading: boolean
  error: string | null
}

export function useFigmaAPI({ fileId, nodeId }: UseFigmaAPIProps) {
  const [state, setState] = useState<FigmaAPIState>({
    file: null,
    frames: [],
    comments: [],
    loading: true,
    error: null
  })

  // Mock data for demo purposes
  const mockFigmaData = useCallback(() => {
    return {
      file: {
        name: 'MW Global Design System',
        lastModified: '2025-09-16T10:30:00Z',
        version: '1.2.5',
        thumbnailUrl: '/api/placeholder/400/300',
        document: {
          id: '0:0',
          name: 'Document',
          type: 'DOCUMENT',
          children: []
        },
        components: {},
        styles: {},
        schemaVersion: 1,
        role: 'viewer',
        editorType: 'figma',
        linkAccess: 'view'
      } as FigmaFile,
      frames: [
        {
          id: '179-5304',
          name: 'Design System Overview',
          type: 'FRAME',
          absoluteBoundingBox: { x: 0, y: 0, width: 1440, height: 1024 }
        },
        {
          id: '180-5305',
          name: 'Color Palette',
          type: 'FRAME',
          absoluteBoundingBox: { x: 1500, y: 0, width: 1440, height: 1024 }
        },
        {
          id: '181-5306',
          name: 'Typography Scale',
          type: 'FRAME',
          absoluteBoundingBox: { x: 3000, y: 0, width: 1440, height: 1024 }
        },
        {
          id: '182-5307',
          name: 'Components Library',
          type: 'FRAME',
          absoluteBoundingBox: { x: 0, y: 1100, width: 1440, height: 2048 }
        },
        {
          id: '183-5308',
          name: 'Button Variants',
          type: 'FRAME',
          absoluteBoundingBox: { x: 1500, y: 1100, width: 1440, height: 800 }
        },
        {
          id: '184-5309',
          name: 'Form Components',
          type: 'FRAME',
          absoluteBoundingBox: { x: 3000, y: 1100, width: 1440, height: 1200 }
        }
      ] as FigmaFrame[],
      comments: [
        {
          id: 'comment-1',
          file_key: fileId,
          parent_id: '',
          user: {
            id: 'user-1',
            handle: 'designer',
            img_url: '/api/placeholder/32/32'
          },
          created_at: '2025-09-15T14:30:00Z',
          message: 'Updated the primary button with better accessibility contrast',
          client_meta: {
            x: 100,
            y: 200,
            node_id: ['183-5308']
          },
          reactions: []
        },
        {
          id: 'comment-2',
          file_key: fileId,
          parent_id: '',
          user: {
            id: 'user-2',
            handle: 'developer',
            img_url: '/api/placeholder/32/32'
          },
          created_at: '2025-09-16T09:15:00Z',
          message: 'The spacing tokens look good. Ready to implement in code.',
          client_meta: {
            x: 300,
            y: 150,
            node_id: ['181-5306']
          },
          reactions: [
            {
              emoji: '👍',
              count: 2,
              users: []
            }
          ]
        }
      ] as FigmaComment[]
    }
  }, [fileId])

  const fetchFigmaData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockData = mockFigmaData()
      
      setState({
        file: mockData.file,
        frames: mockData.frames,
        comments: mockData.comments,
        loading: false,
        error: null
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Figma data'
      }))
    }
  }, [mockFigmaData])

  useEffect(() => {
    if (fileId) {
      fetchFigmaData()
    }
  }, [fileId, fetchFigmaData])

  const refreshData = useCallback(() => {
    fetchFigmaData()
  }, [fetchFigmaData])

  const getFrameById = useCallback((frameId: string) => {
    return state.frames.find(frame => frame.id === frameId)
  }, [state.frames])

  const getCommentsForFrame = useCallback((frameId: string) => {
    return state.comments.filter(comment => 
      comment.client_meta.node_id?.includes(frameId)
    )
  }, [state.comments])

  return {
    ...state,
    refreshData,
    getFrameById,
    getCommentsForFrame
  }
}

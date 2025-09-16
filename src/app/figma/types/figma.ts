// Figma API Types and Interfaces

export interface FigmaFile {
  document: FigmaNode
  components: { [key: string]: FigmaComponent }
  schemaVersion: number
  styles: { [key: string]: FigmaStyle }
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  role: string
  editorType: string
  linkAccess: string
}

export interface FigmaNode {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
  backgroundColor?: FigmaColor
  absoluteBoundingBox?: FigmaRectangle
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  strokeWeight?: number
  cornerRadius?: number
  effects?: FigmaEffect[]
  characters?: string
  style?: FigmaTypeStyle
  characterStyleOverrides?: number[]
  styleOverrideTable?: { [key: string]: FigmaTypeStyle }
}

export interface FigmaComponent {
  key: string
  name: string
  description: string
  documentationLinks: FigmaDocumentationLink[]
}

export interface FigmaStyle {
  key: string
  name: string
  description: string
  styleType: string
}

export interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

export interface FigmaRectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface FigmaFill {
  type: string
  color?: FigmaColor
  gradientHandlePositions?: FigmaVector[]
  gradientStops?: FigmaColorStop[]
}

export interface FigmaStroke {
  type: string
  color?: FigmaColor
}

export interface FigmaEffect {
  type: string
  color?: FigmaColor
  offset?: FigmaVector
  radius?: number
  visible?: boolean
}

export interface FigmaTypeStyle {
  fontFamily: string
  fontPostScriptName: string
  fontWeight: number
  fontSize: number
  lineHeightPx: number
  lineHeightPercent: number
  letterSpacing: number
  fills: FigmaFill[]
}

export interface FigmaVector {
  x: number
  y: number
}

export interface FigmaColorStop {
  position: number
  color: FigmaColor
}

export interface FigmaDocumentationLink {
  uri: string
}

export interface FigmaComment {
  id: string
  file_key: string
  parent_id: string
  user: FigmaUser
  created_at: string
  resolved_at?: string
  message: string
  client_meta: FigmaClientMeta
  reactions: FigmaReaction[]
}

export interface FigmaUser {
  id: string
  handle: string
  img_url: string
}

export interface FigmaClientMeta {
  x?: number
  y?: number
  node_id?: string[]
  node_offset?: FigmaVector
}

export interface FigmaReaction {
  emoji: string
  count: number
  users: FigmaUser[]
}

// Viewer State Types
export interface FigmaViewerState {
  currentFileId: string
  currentNodeId?: string
  viewMode: 'design' | 'prototype' | 'dev'
  zoom: number
  pan: { x: number; y: number }
  selectedFrames: string[]
  showComments: boolean
  showGrid: boolean
  showRulers: boolean
}

export interface FigmaFrame {
  id: string
  name: string
  type: string
  children?: FigmaFrame[]
  thumbnailUrl?: string
  absoluteBoundingBox?: FigmaRectangle
}

export interface DesignToken {
  name: string
  value: string
  type: 'color' | 'typography' | 'spacing' | 'shadow' | 'border'
  category: string
  figmaValue?: string
  codeValue?: string
  synced: boolean
}

export interface ComponentMapping {
  figmaComponentId: string
  figmaComponentName: string
  codeComponentName: string
  codeComponentPath: string
  props: { [key: string]: any }
  variants: string[]
  status: 'synced' | 'outdated' | 'missing'
}

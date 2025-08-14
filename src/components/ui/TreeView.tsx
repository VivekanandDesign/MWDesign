'use client'

import React, { useState, useCallback } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  icon?: React.ReactNode
  disabled?: boolean
  selectable?: boolean
  data?: any
}

interface TreeViewProps {
  data: TreeNode[]
  selectedIds?: string[]
  expandedIds?: string[]
  onSelect?: (selectedIds: string[], node: TreeNode) => void
  onExpand?: (expandedIds: string[]) => void
  multiple?: boolean
  defaultExpanded?: string[]
  defaultSelected?: string[]
  showIcons?: boolean
  showLines?: boolean
  className?: string
}

interface TreeItemProps {
  node: TreeNode
  level: number
  isExpanded: boolean
  isSelected: boolean
  hasChildren: boolean
  onToggle: (nodeId: string) => void
  onSelect: (nodeId: string, node: TreeNode) => void
  showIcons: boolean
  showLines: boolean
  isLast?: boolean
  parentLines?: boolean[]
}

function TreeItem({
  node,
  level,
  isExpanded,
  isSelected,
  hasChildren,
  onToggle,
  onSelect,
  showIcons,
  showLines,
  isLast = false,
  parentLines = []
}: TreeItemProps) {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      onToggle(node.id)
    }
  }

  const handleSelect = () => {
    if (!node.disabled && node.selectable !== false) {
      onSelect(node.id, node)
    }
  }

  const getDefaultIcon = () => {
    if (hasChildren) {
      return isExpanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />
    }
    return <File className="w-4 h-4" />
  }

  const currentLines = [...parentLines, !isLast]

  return (
    <>
      <div
        className={cn(
          'group flex items-center py-1 px-2 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 cursor-pointer transition-colors relative',
          isSelected && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300',
          node.disabled && 'opacity-50 cursor-not-allowed',
          level > 0 && 'ml-4'
        )}
        onClick={handleSelect}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        {/* Tree lines */}
        {showLines && level > 0 && (
          <div className="absolute left-0 top-0 h-full pointer-events-none">
            {parentLines.map((hasLine, index) => (
              <div
                key={index}
                className="absolute top-0 h-full w-px bg-mw-gray-300 dark:bg-mw-gray-600"
                style={{ left: `${index * 20 + 10}px` }}
              >
                {hasLine && <div className="w-full h-full bg-mw-gray-300 dark:bg-mw-gray-600" />}
              </div>
            ))}
            <div
              className="absolute top-0 h-1/2 w-px bg-mw-gray-300 dark:bg-mw-gray-600"
              style={{ left: `${level * 20}px` }}
            />
            <div
              className="absolute top-1/2 w-2 h-px bg-mw-gray-300 dark:bg-mw-gray-600"
              style={{ left: `${level * 20}px` }}
            />
            {!isLast && (
              <div
                className="absolute top-1/2 bottom-0 w-px bg-mw-gray-300 dark:bg-mw-gray-600"
                style={{ left: `${level * 20}px` }}
              />
            )}
          </div>
        )}

        {/* Expand/collapse button */}
        <div className="flex items-center justify-center w-4 h-4 mr-2">
          {hasChildren ? (
            <button
              onClick={handleToggle}
              className="text-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          ) : (
            showLines && <div className="w-3 h-3" />
          )}
        </div>

        {/* Icon */}
        {showIcons && (
          <div className="flex items-center justify-center w-4 h-4 mr-2 text-mw-gray-500">
            {node.icon || getDefaultIcon()}
          </div>
        )}

        {/* Label */}
        <span className="text-sm font-medium text-mw-gray-900 dark:text-white select-none">
          {node.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeItemContainer
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              onSelect={onSelect}
              showIcons={showIcons}
              showLines={showLines}
              isLast={index === node.children!.length - 1}
              parentLines={currentLines}
            />
          ))}
        </div>
      )}
    </>
  )
}

interface TreeItemContainerProps extends Omit<TreeItemProps, 'isExpanded' | 'isSelected' | 'hasChildren'> {
  node: TreeNode
}

function TreeItemContainer({ node, ...props }: TreeItemContainerProps) {
  // This would need to be connected to the parent component's state
  // For now, using internal state as an example
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  
  const hasChildren = Boolean(node.children && node.children.length > 0)

  const handleToggle = (nodeId: string) => {
    if (nodeId === node.id) {
      setIsExpanded(!isExpanded)
    }
    props.onToggle(nodeId)
  }

  const handleSelect = (nodeId: string, selectedNode: TreeNode) => {
    if (nodeId === node.id) {
      setIsSelected(!isSelected)
    }
    props.onSelect(nodeId, selectedNode)
  }

  return (
    <TreeItem
      {...props}
      node={node}
      isExpanded={isExpanded}
      isSelected={isSelected}
      hasChildren={hasChildren}
      onToggle={handleToggle}
      onSelect={handleSelect}
    />
  )
}

export function TreeView({
  data,
  selectedIds: controlledSelectedIds,
  expandedIds: controlledExpandedIds,
  onSelect,
  onExpand,
  multiple = false,
  defaultExpanded = [],
  defaultSelected = [],
  showIcons = true,
  showLines = false,
  className
}: TreeViewProps) {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(defaultSelected)
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(defaultExpanded)

  const selectedIds = controlledSelectedIds !== undefined ? controlledSelectedIds : internalSelectedIds
  const expandedIds = controlledExpandedIds !== undefined ? controlledExpandedIds : internalExpandedIds

  const handleToggle = useCallback((nodeId: string) => {
    const newExpandedIds = expandedIds.includes(nodeId)
      ? expandedIds.filter(id => id !== nodeId)
      : [...expandedIds, nodeId]

    if (controlledExpandedIds === undefined) {
      setInternalExpandedIds(newExpandedIds)
    }
    onExpand?.(newExpandedIds)
  }, [expandedIds, controlledExpandedIds, onExpand])

  const handleSelect = useCallback((nodeId: string, node: TreeNode) => {
    let newSelectedIds: string[]

    if (multiple) {
      newSelectedIds = selectedIds.includes(nodeId)
        ? selectedIds.filter(id => id !== nodeId)
        : [...selectedIds, nodeId]
    } else {
      newSelectedIds = selectedIds.includes(nodeId) ? [] : [nodeId]
    }

    if (controlledSelectedIds === undefined) {
      setInternalSelectedIds(newSelectedIds)
    }
    onSelect?.(newSelectedIds, node)
  }, [selectedIds, multiple, controlledSelectedIds, onSelect])

  const renderTreeItem = (node: TreeNode, level: number, isLast: boolean, parentLines: boolean[] = []) => {
    const isExpanded = expandedIds.includes(node.id)
    const isSelected = selectedIds.includes(node.id)
    const hasChildren = Boolean(node.children && node.children.length > 0)
    const currentLines = [...parentLines, !isLast]

    return (
      <React.Fragment key={node.id}>
        <TreeItem
          node={node}
          level={level}
          isExpanded={isExpanded}
          isSelected={isSelected}
          hasChildren={hasChildren}
          onToggle={handleToggle}
          onSelect={handleSelect}
          showIcons={showIcons}
          showLines={showLines}
          isLast={isLast}
          parentLines={parentLines}
        />
        
        {hasChildren && isExpanded && node.children && (
          <div>
            {node.children.map((child, index) => 
              renderTreeItem(
                child, 
                level + 1, 
                index === node.children!.length - 1,
                currentLines
              )
            )}
          </div>
        )}
      </React.Fragment>
    )
  }

  return (
    <div className={cn('py-2', className)}>
      {data.map((node, index) => 
        renderTreeItem(node, 0, index === data.length - 1)
      )}
    </div>
  )
}

// Utility function to find a node by ID
export function findTreeNode(data: TreeNode[], nodeId: string): TreeNode | null {
  for (const node of data) {
    if (node.id === nodeId) {
      return node
    }
    if (node.children) {
      const found = findTreeNode(node.children, nodeId)
      if (found) return found
    }
  }
  return null
}

// Utility function to get all node IDs
export function getAllNodeIds(data: TreeNode[]): string[] {
  const ids: string[] = []
  
  function traverse(nodes: TreeNode[]) {
    for (const node of nodes) {
      ids.push(node.id)
      if (node.children) {
        traverse(node.children)
      }
    }
  }
  
  traverse(data)
  return ids
}

// Utility function to get parent node IDs for expansion
export function getParentIds(data: TreeNode[], targetId: string): string[] {
  const parentIds: string[] = []
  
  function findParents(nodes: TreeNode[], parents: string[] = []): boolean {
    for (const node of nodes) {
      if (node.id === targetId) {
        parentIds.push(...parents)
        return true
      }
      if (node.children) {
        if (findParents(node.children, [...parents, node.id])) {
          return true
        }
      }
    }
    return false
  }
  
  findParents(data)
  return parentIds
}

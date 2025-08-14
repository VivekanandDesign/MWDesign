'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { ChevronUp, ChevronDown, Search, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export type DataGridColumnType = 'text' | 'number' | 'date' | 'boolean' | 'custom'
export type DataGridSortDirection = 'asc' | 'desc' | null

export interface DataGridColumn<T = any> {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  type?: DataGridColumnType
  width?: number | string
  minWidth?: number
  maxWidth?: number
  align?: 'left' | 'center' | 'right'
  sticky?: 'left' | 'right'
}

export interface DataGridSort {
  columnId: string
  direction: DataGridSortDirection
}

export interface DataGridFilter {
  columnId: string
  value: any
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte'
}

export interface DataGridSelection<T = any> {
  mode: 'none' | 'single' | 'multiple'
  selectedRows: Set<string | number>
  onSelectionChange?: (selectedRows: Set<string | number>, selectedData: T[]) => void
}

interface DataGridProps<T = any> {
  data: T[]
  columns: DataGridColumn<T>[]
  getRowId?: (row: T, index: number) => string | number
  
  // Sorting
  sorting?: DataGridSort[]
  onSortingChange?: (sorting: DataGridSort[]) => void
  
  // Filtering
  filters?: DataGridFilter[]
  onFiltersChange?: (filters: DataGridFilter[]) => void
  
  // Selection
  selection?: DataGridSelection<T>
  
  // Pagination
  pagination?: {
    pageIndex: number
    pageSize: number
    total: number
    onPageChange: (pageIndex: number) => void
    onPageSizeChange: (pageSize: number) => void
  }
  
  // Row actions
  rowActions?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: (row: T) => void
    variant?: 'default' | 'destructive'
  }>
  
  // Loading state
  loading?: boolean
  
  // Empty state
  emptyMessage?: string
  
  // Styling
  striped?: boolean
  bordered?: boolean
  compact?: boolean
  stickyHeader?: boolean
  maxHeight?: string
  className?: string
}

interface DataGridHeaderProps<T = any> {
  column: DataGridColumn<T>
  sorting?: DataGridSort[]
  onSort?: (columnId: string) => void
  onFilter?: (columnId: string, value: any) => void
}

function DataGridHeader<T>({ column, sorting, onSort, onFilter }: DataGridHeaderProps<T>) {
  const [showFilter, setShowFilter] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  
  const sortDirection = sorting?.find(s => s.columnId === column.id)?.direction
  
  const handleSort = () => {
    if (column.sortable && onSort) {
      onSort(column.id)
    }
  }
  
  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter?.(column.id, filterValue)
    setShowFilter(false)
  }
  
  return (
    <th
      className={cn(
        'px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700',
        column.align === 'center' && 'text-center',
        column.align === 'right' && 'text-right',
        column.sticky === 'left' && 'sticky left-0 z-10',
        column.sticky === 'right' && 'sticky right-0 z-10'
      )}
      style={{ 
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth
      }}
    >
      <div className="flex items-center space-x-2">
        <span
          className={cn(
            'text-xs font-medium text-mw-gray-900 dark:text-white uppercase tracking-wider',
            column.sortable && 'cursor-pointer hover:text-mw-blue-600 dark:hover:text-mw-blue-400'
          )}
          onClick={handleSort}
        >
          {column.header}
        </span>
        
        {column.sortable && (
          <button onClick={handleSort} className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300">
            {sortDirection === 'asc' ? (
              <ChevronUp className="w-4 h-4" />
            ) : sortDirection === 'desc' ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <div className="w-4 h-4 flex flex-col">
                <ChevronUp className="w-4 h-2" />
                <ChevronDown className="w-4 h-2" />
              </div>
            )}
          </button>
        )}
        
        {column.filterable && (
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300"
            >
              <Filter className="w-4 h-4" />
            </button>
            
            {showFilter && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg z-20">
                <form onSubmit={handleFilter} className="p-3">
                  <input
                    type="text"
                    placeholder={`Filter ${column.header}...`}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-mw-gray-200 dark:border-mw-gray-700 rounded focus:outline-none focus:border-mw-blue-500 dark:focus:border-mw-blue-400 bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white"
                    autoFocus
                  />
                  <div className="mt-2 flex space-x-2">
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs bg-mw-blue-600 text-white rounded hover:bg-mw-blue-700"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterValue('')
                        onFilter?.(column.id, '')
                        setShowFilter(false)
                      }}
                      className="px-3 py-1 text-xs bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </th>
  )
}

export function DataGrid<T extends Record<string, any>>({
  data,
  columns,
  getRowId = (_, index) => index,
  sorting = [],
  onSortingChange,
  filters = [],
  onFiltersChange,
  selection,
  pagination,
  rowActions,
  loading = false,
  emptyMessage = 'No data available',
  striped = false,
  bordered = false,
  compact = false,
  stickyHeader = false,
  maxHeight,
  className
}: DataGridProps<T>) {
  // Handle sorting
  const handleSort = useCallback((columnId: string) => {
    if (!onSortingChange) return
    
    const existingSort = sorting.find(s => s.columnId === columnId)
    let newSorting: DataGridSort[]
    
    if (!existingSort) {
      newSorting = [{ columnId, direction: 'asc' }]
    } else if (existingSort.direction === 'asc') {
      newSorting = [{ columnId, direction: 'desc' }]
    } else {
      newSorting = sorting.filter(s => s.columnId !== columnId)
    }
    
    onSortingChange(newSorting)
  }, [sorting, onSortingChange])
  
  // Handle filtering
  const handleFilter = useCallback((columnId: string, value: any) => {
    if (!onFiltersChange) return
    
    const newFilters = filters.filter(f => f.columnId !== columnId)
    if (value) {
      newFilters.push({ columnId, value, operator: 'contains' })
    }
    
    onFiltersChange(newFilters)
  }, [filters, onFiltersChange])
  
  // Handle selection
  const handleRowSelect = useCallback((rowId: string | number, row: T) => {
    if (!selection || selection.mode === 'none') return
    
    const newSelection = new Set(selection.selectedRows)
    
    if (selection.mode === 'single') {
      newSelection.clear()
      newSelection.add(rowId)
    } else {
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId)
      } else {
        newSelection.add(rowId)
      }
    }
    
    const selectedData = data.filter((_, index) => 
      newSelection.has(getRowId(data[index], index))
    )
    
    selection.onSelectionChange?.(newSelection, selectedData)
  }, [selection, data, getRowId])
  
  const handleSelectAll = useCallback(() => {
    if (!selection || selection.mode !== 'multiple') return
    
    const allSelected = data.length > 0 && 
      data.every((_, index) => selection.selectedRows.has(getRowId(data[index], index)))
    
    const newSelection = new Set<string | number>()
    if (!allSelected) {
      data.forEach((_, index) => {
        newSelection.add(getRowId(data[index], index))
      })
    }
    
    const selectedData = allSelected ? [] : data
    selection.onSelectionChange?.(newSelection, selectedData)
  }, [selection, data, getRowId])
  
  // Render cell content
  const renderCell = (column: DataGridColumn<T>, row: T) => {
    if (column.cell) {
      const value = column.accessorKey ? row[column.accessorKey] : row
      return column.cell(value, row)
    }
    
    if (column.accessorKey) {
      const value = row[column.accessorKey]
      
      if (column.type === 'boolean') {
        return value ? 'Yes' : 'No'
      }
      
      if (column.type === 'date' && value && Object.prototype.toString.call(value) === '[object Date]') {
        return (value as Date).toLocaleDateString()
      }
      
      return String(value ?? '')
    }
    
    return null
  }
  
  const hasSelection = selection && selection.mode !== 'none'
  const hasActions = rowActions && rowActions.length > 0
  
  return (
    <div className={cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg overflow-hidden', className)}>
      <div 
        className={cn('overflow-auto', stickyHeader && 'max-h-96')}
        style={{ maxHeight }}
      >
        <table className="w-full">
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {hasSelection && (
                <th className="w-12 px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
                  {selection.mode === 'multiple' && (
                    <input
                      type="checkbox"
                      checked={data.length > 0 && data.every((_, index) => 
                        selection.selectedRows.has(getRowId(data[index], index))
                      )}
                      onChange={handleSelectAll}
                      className="rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-blue-600 focus:ring-mw-blue-500"
                    />
                  )}
                </th>
              )}
              
              {columns.map((column) => (
                <DataGridHeader
                  key={column.id}
                  column={column}
                  sorting={sorting}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
              ))}
              
              {hasActions && (
                <th className="w-12 px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-mw-gray-200 dark:divide-mw-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-mw-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-mw-gray-500 dark:text-mw-gray-400">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)} className="px-4 py-8 text-center text-sm text-mw-gray-500 dark:text-mw-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row, index)
                const isSelected = selection?.selectedRows.has(rowId)
                
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      'hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800/50',
                      striped && index % 2 === 1 && 'bg-mw-gray-25 dark:bg-mw-gray-950/50',
                      isSelected && 'bg-mw-blue-50 dark:bg-mw-blue-950/20',
                      compact ? 'h-12' : 'h-16'
                    )}
                  >
                    {hasSelection && (
                      <td className="px-4 py-3">
                        <input
                          type={selection.mode === 'single' ? 'radio' : 'checkbox'}
                          name={selection.mode === 'single' ? 'row-selection' : undefined}
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId, row)}
                          className="rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-blue-600 focus:ring-mw-blue-500"
                        />
                      </td>
                    )}
                    
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          'px-4 py-3 text-sm text-mw-gray-900 dark:text-white',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.sticky === 'left' && 'sticky left-0 z-10 bg-white dark:bg-mw-gray-900',
                          column.sticky === 'right' && 'sticky right-0 z-10 bg-white dark:bg-mw-gray-900',
                          bordered && 'border-r border-mw-gray-200 dark:border-mw-gray-700 last:border-r-0'
                        )}
                      >
                        {renderCell(column, row)}
                      </td>
                    ))}
                    
                    {hasActions && (
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          {rowActions!.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={() => action.onClick(row)}
                              className={cn(
                                'p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800',
                                action.variant === 'destructive' 
                                  ? 'text-red-600 hover:text-red-700' 
                                  : 'text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-700 dark:hover:text-mw-gray-300'
                              )}
                              title={action.label}
                            >
                              {action.icon || <MoreVertical className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-t border-mw-gray-200 dark:border-mw-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, pagination.total)} of{' '}
              {pagination.total} results
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={pagination.pageSize}
              onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))}
              className="text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded px-2 py-1 bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            
            <button
              onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 0}
              className="px-3 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800"
            >
              Previous
            </button>
            
            <button
              onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
              disabled={(pagination.pageIndex + 1) * pagination.pageSize >= pagination.total}
              className="px-3 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

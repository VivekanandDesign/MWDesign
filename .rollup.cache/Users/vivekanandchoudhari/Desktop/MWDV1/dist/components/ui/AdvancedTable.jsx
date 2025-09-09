'use client';
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search, Filter, MoreVertical, RefreshCw, Columns, ChevronsUpDown, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FilterX, RotateCcw, Maximize2, Minimize2, Lock, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';
import { Tooltip } from './Tooltip';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from './Dropdown';
import { Modal } from './Modal';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
// Utility functions for data processing
const applyFilters = (data, filters, columns) => {
    return data.filter(row => {
        return filters.every(filter => {
            const column = columns.find(col => col.id === filter.columnId);
            if (!column)
                return true;
            const value = column.accessorFn
                ? column.accessorFn(row)
                : column.accessorKey
                    ? row[column.accessorKey]
                    : row;
            const filterValue = filter.value;
            if (value == null)
                return false;
            switch (filter.operator) {
                case 'equals':
                    return value === filterValue;
                case 'contains':
                    return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
                case 'startsWith':
                    return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
                case 'endsWith':
                    return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
                case 'gt':
                    return Number(value) > Number(filterValue);
                case 'lt':
                    return Number(value) < Number(filterValue);
                case 'gte':
                    return Number(value) >= Number(filterValue);
                case 'lte':
                    return Number(value) <= Number(filterValue);
                case 'in':
                    return Array.isArray(filterValue) && filterValue.includes(value);
                case 'notIn':
                    return Array.isArray(filterValue) && !filterValue.includes(value);
                default:
                    return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
            }
        });
    });
};
const applySorting = (data, sorting, columns) => {
    if (sorting.length === 0)
        return data;
    return [...data].sort((a, b) => {
        for (const sort of sorting) {
            const column = columns.find(col => col.id === sort.columnId);
            if (!column || !sort.direction)
                continue;
            const aValue = column.accessorFn
                ? column.accessorFn(a)
                : column.accessorKey
                    ? a[column.accessorKey]
                    : a;
            const bValue = column.accessorFn
                ? column.accessorFn(b)
                : column.accessorKey
                    ? b[column.accessorKey]
                    : b;
            let comparison = 0;
            if (aValue < bValue)
                comparison = -1;
            else if (aValue > bValue)
                comparison = 1;
            if (comparison !== 0) {
                return sort.direction === 'desc' ? -comparison : comparison;
            }
        }
        return 0;
    });
};
const applyGlobalFilter = (data, globalFilter, columns) => {
    if (!globalFilter)
        return data;
    const searchableColumns = columns.filter(col => col.searchable !== false);
    return data.filter(row => {
        return searchableColumns.some(column => {
            const value = column.accessorFn
                ? column.accessorFn(row)
                : column.accessorKey
                    ? row[column.accessorKey]
                    : row;
            return String(value || '').toLowerCase().includes(globalFilter.toLowerCase());
        });
    });
};
function AdvancedTableHeaderCell({ column, sorting, onSort, onFilter, onResize, density }) {
    var _a;
    const [showFilter, setShowFilter] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filterOperator, setFilterOperator] = useState('contains');
    const resizeRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const sortDirection = (_a = sorting.find(s => s.columnId === column.id)) === null || _a === void 0 ? void 0 : _a.direction;
    const densityClasses = {
        compact: 'px-2 py-1',
        normal: 'px-4 py-2',
        comfortable: 'px-6 py-3'
    };
    const handleSort = () => {
        if (column.sortable) {
            onSort(column.id);
        }
    };
    const handleFilter = (e) => {
        e.preventDefault();
        onFilter(column.id, filterValue, filterOperator);
        setShowFilter(false);
    };
    const handleClearFilter = () => {
        setFilterValue('');
        onFilter(column.id, '', filterOperator);
        setShowFilter(false);
    };
    useEffect(() => {
        const handleMouseMove = (e) => {
            var _a;
            if (!isResizing || !resizeRef.current || !onResize)
                return;
            const rect = (_a = resizeRef.current.closest('th')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (rect) {
                const newWidth = e.clientX - rect.left;
                if (newWidth >= (column.minWidth || 50)) {
                    onResize(column.id, newWidth);
                }
            }
        };
        const handleMouseUp = () => {
            setIsResizing(false);
        };
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, column.id, column.minWidth, onResize]);
    return (<th className={cn('bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700 relative', densityClasses[density], column.align === 'center' && 'text-center', column.align === 'right' && 'text-right', column.sticky === 'left' && 'sticky left-0 z-20', column.sticky === 'right' && 'sticky right-0 z-20', column.pinned && 'bg-mw-blue-50 dark:bg-mw-blue-950/20')} style={{
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth
        }}>
      <div className="flex items-center justify-between group">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <span className={cn('text-xs font-medium text-mw-gray-900 dark:text-white uppercase tracking-wider truncate', column.sortable && 'cursor-pointer hover:text-mw-primary-600 dark:hover:text-mw-primary-400 select-none')} onClick={handleSort} title={typeof column.header === 'string' ? column.header : column.id}>
            {column.header}
          </span>
          
          {column.sortable && (<button onClick={handleSort} className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300 flex-shrink-0">
              {sortDirection === 'asc' ? (<ChevronUp className="w-4 h-4"/>) : sortDirection === 'desc' ? (<ChevronDown className="w-4 h-4"/>) : (<ChevronsUpDown className="w-4 h-4 opacity-50"/>)}
            </button>)}
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {column.filterable && (<div className="relative">
              <button onClick={() => setShowFilter(!showFilter)} className="p-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300 rounded" title="Filter">
                <Filter className="w-3 h-3"/>
              </button>
              
              {showFilter && (<div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg z-30">
                  <form onSubmit={handleFilter} className="p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">
                        Operator
                      </label>
                      <select value={filterOperator} onChange={(e) => setFilterOperator(e.target.value)} className="w-full px-2 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded focus:outline-none focus:border-mw-primary-500 bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white">
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="startsWith">Starts with</option>
                        <option value="endsWith">Ends with</option>
                        {column.type === 'number' && (<>
                            <option value="gt">Greater than</option>
                            <option value="lt">Less than</option>
                            <option value="gte">Greater than or equal</option>
                            <option value="lte">Less than or equal</option>
                          </>)}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">
                        Value
                      </label>
                      <input type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'} placeholder={`Filter ${typeof column.header === 'string' ? column.header : column.id}...`} value={filterValue} onChange={(e) => setFilterValue(e.target.value)} className="w-full px-2 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded focus:outline-none focus:border-mw-primary-500 bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white" autoFocus/>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button type="submit" size="sm" className="flex-1">
                        Apply
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={handleClearFilter}>
                        Clear
                      </Button>
                    </div>
                  </form>
                </div>)}
            </div>)}
          
          {column.pinned && (<div title="Pinned column">
              <Lock className="w-3 h-3 text-mw-blue-500"/>
            </div>)}
        </div>
        
        {/* Resize Handle */}
        {column.resizable && onResize && (<div ref={resizeRef} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-mw-primary-500 transition-colors" onMouseDown={() => setIsResizing(true)}/>)}
      </div>
    </th>);
}
function AdvancedTableCell({ column, row, value, density, onClick }) {
    const densityClasses = {
        compact: 'px-2 py-1',
        normal: 'px-4 py-2',
        comfortable: 'px-6 py-3'
    };
    const renderCellContent = () => {
        if (column.cell) {
            return column.cell(value, row, column);
        }
        switch (column.type) {
            case 'boolean':
                return (<Badge variant={value ? 'success' : 'secondary'}>
            {value ? 'Yes' : 'No'}
          </Badge>);
            case 'badge':
                return (<Badge variant={(value === null || value === void 0 ? void 0 : value.variant) || 'secondary'}>
            {(value === null || value === void 0 ? void 0 : value.label) || value}
          </Badge>);
            case 'progress':
                return (<div className="flex items-center space-x-2">
            <div className="flex-1 bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full h-2">
              <div className="bg-mw-primary-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, value || 0))}%` }}/>
            </div>
            <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400 min-w-[3rem] text-right">
              {value}%
            </span>
          </div>);
            case 'image':
                return (<img src={value} alt="" className="w-8 h-8 rounded object-cover" onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                    }}/>);
            case 'link':
                return (<a href={(value === null || value === void 0 ? void 0 : value.href) || value} target="_blank" rel="noopener noreferrer" className="text-mw-primary-600 dark:text-mw-primary-400 hover:underline inline-flex items-center space-x-1">
            <span>{(value === null || value === void 0 ? void 0 : value.label) || value}</span>
            <ExternalLink className="w-3 h-3"/>
          </a>);
            case 'date':
                if (value && (value instanceof Date || !isNaN(Date.parse(value)))) {
                    return new Date(value).toLocaleDateString();
                }
                return String(value || '');
            case 'number':
                if (typeof value === 'number') {
                    return value.toLocaleString();
                }
                return String(value || '');
            default:
                return String(value || '');
        }
    };
    return (<td className={cn('text-sm text-mw-gray-900 dark:text-white border-r border-mw-gray-200 dark:border-mw-gray-700 last:border-r-0', densityClasses[density], column.align === 'center' && 'text-center', column.align === 'right' && 'text-right', column.sticky === 'left' && 'sticky left-0 z-10 bg-white dark:bg-mw-gray-900', column.sticky === 'right' && 'sticky right-0 z-10 bg-white dark:bg-mw-gray-900', onClick && 'cursor-pointer hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800')} onClick={onClick}>
      {renderCellContent()}
    </td>);
}
// Main Advanced Table Component
export function AdvancedTable({ data, columns, getRowId = (_, index) => index, state = {}, onStateChange, enableSorting = true, enableFiltering = true, enableGlobalFilter = true, enableColumnResizing = false, enableColumnReordering = false, enableColumnVisibility = true, enableRowSelection = false, enableBulkActions = false, enableVirtualization = false, enableExport = false, enableFullscreen = false, selection, pagination, rowActions, bulkActions, toolbarActions, loading = false, loadingMessage = 'Loading...', emptyMessage = 'No data available', errorMessage, striped = false, bordered = false, hoverable = true, stickyHeader = false, maxHeight, className, size = 'md', onRowClick, onRowDoubleClick, onRowHover, onCellClick, expandableRows, grouping, virtualization }) {
    // Internal state
    const [internalState, setInternalState] = useState(Object.assign({ sorting: [], filters: [], globalFilter: '', columnVisibility: {}, columnOrder: columns.map(col => col.id), columnSizing: {}, density: 'normal', frozenColumns: { left: [], right: [] } }, state));
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showColumnSettings, setShowColumnSettings] = useState(false);
    const tableRef = useRef(null);
    // Update internal state when external state changes
    useEffect(() => {
        if (state) {
            setInternalState(prev => (Object.assign(Object.assign({}, prev), state)));
        }
    }, [state]);
    // Handle state changes
    const updateState = useCallback((updates) => {
        const newState = Object.assign(Object.assign({}, internalState), updates);
        setInternalState(newState);
        onStateChange === null || onStateChange === void 0 ? void 0 : onStateChange(newState);
    }, [internalState, onStateChange]);
    // Data processing
    const processedData = useMemo(() => {
        let result = [...data];
        // Apply global filter
        if (internalState.globalFilter) {
            result = applyGlobalFilter(result, internalState.globalFilter, columns);
        }
        // Apply column filters
        if (internalState.filters.length > 0) {
            result = applyFilters(result, internalState.filters, columns);
        }
        // Apply sorting
        if (internalState.sorting.length > 0) {
            result = applySorting(result, internalState.sorting, columns);
        }
        return result;
    }, [data, columns, internalState.globalFilter, internalState.filters, internalState.sorting]);
    // Pagination
    const paginatedData = useMemo(() => {
        if (!pagination)
            return processedData;
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        return processedData.slice(start, end);
    }, [processedData, pagination]);
    // Visible columns
    const visibleColumns = useMemo(() => {
        return columns
            .filter(col => !col.hidden && internalState.columnVisibility[col.id] !== false)
            .sort((a, b) => {
            const aIndex = internalState.columnOrder.indexOf(a.id);
            const bIndex = internalState.columnOrder.indexOf(b.id);
            return aIndex - bIndex;
        });
    }, [columns, internalState.columnVisibility, internalState.columnOrder]);
    // Event handlers
    const handleSort = useCallback((columnId) => {
        if (!enableSorting)
            return;
        const existingSort = internalState.sorting.find(s => s.columnId === columnId);
        let newSorting;
        if (!existingSort) {
            newSorting = [{ columnId, direction: 'asc' }, ...internalState.sorting];
        }
        else if (existingSort.direction === 'asc') {
            newSorting = internalState.sorting.map(s => s.columnId === columnId ? Object.assign(Object.assign({}, s), { direction: 'desc' }) : s);
        }
        else {
            newSorting = internalState.sorting.filter(s => s.columnId !== columnId);
        }
        updateState({ sorting: newSorting });
    }, [enableSorting, internalState.sorting, updateState]);
    const handleFilter = useCallback((columnId, value, operator = 'contains') => {
        if (!enableFiltering)
            return;
        const newFilters = internalState.filters.filter(f => f.columnId !== columnId);
        if (value) {
            newFilters.push({ columnId, value, operator });
        }
        updateState({ filters: newFilters });
    }, [enableFiltering, internalState.filters, updateState]);
    const handleGlobalFilter = useCallback((value) => {
        if (!enableGlobalFilter)
            return;
        updateState({ globalFilter: value });
    }, [enableGlobalFilter, updateState]);
    const handleColumnResize = useCallback((columnId, width) => {
        if (!enableColumnResizing)
            return;
        updateState({
            columnSizing: Object.assign(Object.assign({}, internalState.columnSizing), { [columnId]: width })
        });
    }, [enableColumnResizing, internalState.columnSizing, updateState]);
    const handleRowSelect = useCallback((rowId, row) => {
        var _a;
        if (!selection || selection.mode === 'none')
            return;
        const newSelection = new Set(selection.selectedRows);
        if (selection.mode === 'single') {
            newSelection.clear();
            newSelection.add(rowId);
        }
        else {
            if (newSelection.has(rowId)) {
                newSelection.delete(rowId);
            }
            else {
                newSelection.add(rowId);
            }
        }
        const selectedData = paginatedData.filter((_, index) => newSelection.has(getRowId(paginatedData[index], index)));
        (_a = selection.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(selection, newSelection, selectedData);
    }, [selection, paginatedData, getRowId]);
    const handleSelectAll = useCallback(() => {
        var _a;
        if (!selection || selection.mode !== 'multiple')
            return;
        const allPageRowIds = paginatedData.map((row, index) => getRowId(row, index));
        const allSelected = allPageRowIds.every(id => selection.selectedRows.has(id));
        const newSelection = new Set(selection.selectedRows);
        if (allSelected) {
            // Deselect all on current page
            allPageRowIds.forEach(id => newSelection.delete(id));
        }
        else {
            // Select all on current page
            allPageRowIds.forEach(id => newSelection.add(id));
        }
        const selectedData = data.filter((row, index) => newSelection.has(getRowId(row, index)));
        (_a = selection.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(selection, newSelection, selectedData);
    }, [selection, paginatedData, data, getRowId]);
    const handleClearFilters = useCallback(() => {
        updateState({ filters: [], globalFilter: '' });
    }, [updateState]);
    const handleResetTable = useCallback(() => {
        updateState({
            sorting: [],
            filters: [],
            globalFilter: '',
            columnVisibility: {},
            columnOrder: columns.map(col => col.id),
            columnSizing: {},
            density: 'normal'
        });
    }, [updateState, columns]);
    const toggleFullscreen = useCallback(() => {
        var _a, _b, _c;
        setIsFullscreen(!isFullscreen);
        if (!isFullscreen) {
            (_b = (_a = tableRef.current) === null || _a === void 0 ? void 0 : _a.requestFullscreen) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        else {
            (_c = document.exitFullscreen) === null || _c === void 0 ? void 0 : _c.call(document);
        }
    }, [isFullscreen]);
    // Render helpers
    const renderToolbar = () => (<div className="flex items-center justify-between p-4 border-b border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800">
      <div className="flex items-center space-x-4">
        {/* Global Search */}
        {enableGlobalFilter && (<div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 w-4 h-4"/>
            <Input placeholder="Search..." value={internalState.globalFilter} onChange={(e) => handleGlobalFilter(e.target.value)} className="pl-10 w-64"/>
          </div>)}
        
        {/* Active Filters */}
        {internalState.filters.length > 0 && (<div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-mw-gray-600 dark:text-mw-gray-400">
              Filters:
            </span>
            {internalState.filters.map((filter, index) => {
                const column = columns.find(col => col.id === filter.columnId);
                return (<Badge key={index} variant="secondary" className="text-xs cursor-pointer" onClick={() => handleFilter(filter.columnId, '')}>
                  {column === null || column === void 0 ? void 0 : column.header}: {filter.value}
                  <X className="w-3 h-3 ml-1"/>
                </Badge>);
            })}
            <Button variant="outline" size="sm" onClick={handleClearFilters} className="text-xs">
              <FilterX className="w-3 h-3 mr-1"/>
              Clear All
            </Button>
          </div>)}
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Bulk Actions */}
        {enableBulkActions && selection && selection.selectedRows.size > 0 && bulkActions && (<div className="flex items-center space-x-2 mr-4">
            <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
              {selection.selectedRows.size} selected
            </span>
            {bulkActions.map((action, index) => {
                var _a;
                const selectedData = data.filter((row, rowIndex) => selection.selectedRows.has(getRowId(row, rowIndex)));
                return (<Button key={index} variant={action.variant || 'outline'} size="sm" onClick={() => action.onClick(selectedData)} disabled={(_a = action.disabled) === null || _a === void 0 ? void 0 : _a.call(action, selectedData)} title={action.tooltip}>
                  {action.icon}
                  {action.label}
                </Button>);
            })}
          </div>)}
        
        {/* Toolbar Actions */}
        {toolbarActions === null || toolbarActions === void 0 ? void 0 : toolbarActions.map((action, index) => (<Button key={index} variant={action.variant || 'outline'} size="sm" onClick={action.onClick} title={action.tooltip}>
            {action.icon}
            {action.label}
          </Button>))}
        
        {/* Density Toggle */}
        <select value={internalState.density} onChange={(e) => updateState({ density: e.target.value })} className="text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded px-2 py-1 bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white">
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="comfortable">Comfortable</option>
        </select>
        
        {/* Column Settings */}
        {enableColumnVisibility && (<Button variant="outline" size="sm" onClick={() => setShowColumnSettings(!showColumnSettings)} title="Column Settings">
            <Columns className="w-4 h-4"/>
          </Button>)}
        
        {/* Reset */}
        <Button variant="outline" size="sm" onClick={handleResetTable} title="Reset Table">
          <RotateCcw className="w-4 h-4"/>
        </Button>
        
        {/* Fullscreen */}
        {enableFullscreen && (<Button variant="outline" size="sm" onClick={toggleFullscreen} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
            {isFullscreen ? (<Minimize2 className="w-4 h-4"/>) : (<Maximize2 className="w-4 h-4"/>)}
          </Button>)}
      </div>
    </div>);
    const renderPagination = () => {
        if (!pagination)
            return null;
        const totalPages = Math.ceil(pagination.total / pagination.pageSize);
        const startRecord = pagination.pageIndex * pagination.pageSize + 1;
        const endRecord = Math.min((pagination.pageIndex + 1) * pagination.pageSize, pagination.total);
        return (<div className="flex items-center justify-between px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-t border-mw-gray-200 dark:border-mw-gray-700">
        <div className="flex items-center space-x-2">
          {pagination.showTotal && (<span className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
              {typeof pagination.showTotal === 'function'
                    ? pagination.showTotal(pagination.total, [startRecord, endRecord])
                    : `Showing ${startRecord} to ${endRecord} of ${pagination.total} results`}
            </span>)}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Page Size Selector */}
          {pagination.showSizeChanger && (<div className="flex items-center space-x-2">
              <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Show</span>
              <select value={pagination.pageSize} onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))} className="text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded px-2 py-1 bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white">
                {(pagination.pageSizeOptions || [10, 25, 50, 100]).map(size => (<option key={size} value={size}>{size}</option>))}
              </select>
            </div>)}
          
          {/* Pagination Controls */}
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={() => pagination.onPageChange(0)} disabled={pagination.pageIndex === 0} title="First Page">
              <ChevronsLeft className="w-4 h-4"/>
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => pagination.onPageChange(pagination.pageIndex - 1)} disabled={pagination.pageIndex === 0} title="Previous Page">
              <ChevronLeft className="w-4 h-4"/>
            </Button>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                    pageNum = i;
                }
                else if (pagination.pageIndex < 3) {
                    pageNum = i;
                }
                else if (pagination.pageIndex > totalPages - 3) {
                    pageNum = totalPages - 5 + i;
                }
                else {
                    pageNum = pagination.pageIndex - 2 + i;
                }
                return (<Button key={pageNum} variant={pagination.pageIndex === pageNum ? 'primary' : 'outline'} size="sm" onClick={() => pagination.onPageChange(pageNum)} className="min-w-[2rem]">
                  {pageNum + 1}
                </Button>);
            })}
            
            <Button variant="outline" size="sm" onClick={() => pagination.onPageChange(pagination.pageIndex + 1)} disabled={pagination.pageIndex >= totalPages - 1} title="Next Page">
              <ChevronRight className="w-4 h-4"/>
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => pagination.onPageChange(totalPages - 1)} disabled={pagination.pageIndex >= totalPages - 1} title="Last Page">
              <ChevronsRight className="w-4 h-4"/>
            </Button>
          </div>
          
          {/* Quick Jumper */}
          {pagination.showQuickJumper && (<div className="flex items-center space-x-2">
              <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Go to</span>
              <Input type="number" min={1} max={totalPages} className="w-16 text-xs" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const page = parseInt(e.target.value) - 1;
                        if (page >= 0 && page < totalPages) {
                            pagination.onPageChange(page);
                        }
                    }
                }}/>
            </div>)}
        </div>
      </div>);
    };
    const hasSelection = selection && selection.mode !== 'none';
    const hasActions = rowActions && rowActions.length > 0;
    return (<div ref={tableRef} className={cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg overflow-hidden', isFullscreen && 'fixed inset-0 z-50 rounded-none', className)}>
      {/* Toolbar */}
      {renderToolbar()}
      
        {/* Column Settings Modal */}
        <Modal isOpen={showColumnSettings} onClose={() => setShowColumnSettings(false)} size="md">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
              Column Settings
            </h3>
            <div className="space-y-4">
              <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Configure which columns to display and their order.
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {columns.map(column => (<div key={column.id} className="flex items-center justify-between p-2 border border-mw-gray-200 dark:border-mw-gray-700 rounded">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={internalState.columnVisibility[column.id] !== false} onChange={(e) => {
                updateState({
                    columnVisibility: Object.assign(Object.assign({}, internalState.columnVisibility), { [column.id]: e.target.checked })
                });
            }} className="rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-primary-600 focus:ring-mw-primary-500"/>
                      <span className="text-sm">{column.header}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {column.pinned && (<div title="Pinned column">
                          <Lock className="w-4 h-4 text-mw-primary-500"/>
                        </div>)}
                      {column.sticky && (<Badge variant="secondary" className="text-xs">
                          {column.sticky}
                        </Badge>)}
                    </div>
                  </div>))}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-mw-gray-200 dark:border-mw-gray-700">
                <Button variant="outline" onClick={() => {
            updateState({
                columnVisibility: Object.fromEntries(columns.map(col => [col.id, true]))
            });
        }}>
                  Show All
                </Button>
                <Button variant="outline" onClick={() => setShowColumnSettings(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>      {/* Table Container */}
      <div className={cn('overflow-auto', stickyHeader && 'max-h-96')} style={{ maxHeight }}>
        <table className="w-full">
          {/* Header */}
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {/* Selection Column */}
              {hasSelection && (<th className={cn('w-12 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700', internalState.density === 'compact' ? 'px-2 py-1' :
                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3')}>
                  {selection.mode === 'multiple' && (<input type="checkbox" checked={paginatedData.length > 0 && paginatedData.every((row, index) => selection.selectedRows.has(getRowId(row, index)))} onChange={handleSelectAll} className="rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-primary-600 focus:ring-mw-primary-500"/>)}
                </th>)}
              
              {/* Data Columns */}
              {visibleColumns.map(column => (<AdvancedTableHeaderCell key={column.id} column={column} sorting={internalState.sorting} onSort={handleSort} onFilter={handleFilter} onResize={enableColumnResizing ? handleColumnResize : undefined} density={internalState.density}/>))}
              
              {/* Actions Column */}
              {hasActions && (<th className={cn('w-16 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700', internalState.density === 'compact' ? 'px-2 py-1' :
                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3')}>
                  <span className="sr-only">Actions</span>
                </th>)}
            </tr>
          </thead>
          
          {/* Body */}
          <tbody className="divide-y divide-mw-gray-200 dark:divide-mw-gray-700">
            {/* Loading State */}
            {loading ? (<tr>
                <td colSpan={visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-mw-primary-600"/>
                    <span className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
                      {loadingMessage}
                    </span>
                  </div>
                </td>
              </tr>) : /* Error State */
            errorMessage ? (<tr>
                <td colSpan={visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)} className="px-4 py-8 text-center">
                  <div className="text-red-600 dark:text-red-400">
                    {errorMessage}
                  </div>
                </td>
              </tr>) : /* Empty State */
                paginatedData.length === 0 ? (<tr>
                <td colSpan={visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)} className="px-4 py-8 text-center text-sm text-mw-gray-500 dark:text-mw-gray-400">
                  {emptyMessage}
                </td>
              </tr>) : (
                /* Data Rows */
                paginatedData.map((row, index) => {
                    const rowId = getRowId(row, index);
                    const isSelected = selection === null || selection === void 0 ? void 0 : selection.selectedRows.has(rowId);
                    return (<React.Fragment key={rowId}>
                    <tr className={cn('transition-colors', hoverable && 'hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800/50', striped && index % 2 === 1 && 'bg-mw-gray-25 dark:bg-mw-gray-950/50', isSelected && 'bg-mw-primary-50 dark:bg-mw-primary-950/20', onRowClick && 'cursor-pointer', internalState.density === 'compact' ? 'h-10' :
                            internalState.density === 'normal' ? 'h-12' : 'h-16')} onClick={() => onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(row, index)} onDoubleClick={() => onRowDoubleClick === null || onRowDoubleClick === void 0 ? void 0 : onRowDoubleClick(row, index)} onMouseEnter={() => onRowHover === null || onRowHover === void 0 ? void 0 : onRowHover(row, index)}>
                      {/* Selection Cell */}
                      {hasSelection && (<td className={cn(internalState.density === 'compact' ? 'px-2 py-1' :
                                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3')}>
                          <input type="checkbox" checked={isSelected} onChange={() => handleRowSelect(rowId, row)} className="rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-primary-600 focus:ring-mw-primary-500"/>
                        </td>)}
                      
                      {/* Data Cells */}
                      {visibleColumns.map(column => {
                            const value = column.accessorFn
                                ? column.accessorFn(row)
                                : column.accessorKey
                                    ? row[column.accessorKey]
                                    : row;
                            return (<AdvancedTableCell key={column.id} column={column} row={row} value={value} density={internalState.density} onClick={() => onCellClick === null || onCellClick === void 0 ? void 0 : onCellClick(value, row, column)}/>);
                        })}
                      
                      {/* Actions Cell */}
                      {hasActions && (<td className={cn('text-center', internalState.density === 'compact' ? 'px-2 py-1' :
                                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3')}>
                          <div className="flex items-center justify-center space-x-1">
                            {rowActions.slice(0, 3).map((action, actionIndex) => {
                                var _a, _b;
                                if ((_a = action.hidden) === null || _a === void 0 ? void 0 : _a.call(action, row))
                                    return null;
                                return (<Tooltip key={actionIndex} content={action.tooltip || action.label}>
                                  <Button variant="outline" size="sm" onClick={(e) => {
                                        e.stopPropagation();
                                        action.onClick(row, index);
                                    }} disabled={(_b = action.disabled) === null || _b === void 0 ? void 0 : _b.call(action, row)} className="h-8 w-8 p-0">
                                    {action.icon || <MoreVertical className="w-4 h-4"/>}
                                  </Button>
                                </Tooltip>);
                            })}
                            
                            {rowActions.length > 3 && (<Dropdown>
                                <DropdownTrigger asChild>
                                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4"/>
                                  </Button>
                                </DropdownTrigger>
                                <DropdownContent>
                                  {rowActions.slice(3).map((action, actionIndex) => {
                                    var _a, _b;
                                    if ((_a = action.hidden) === null || _a === void 0 ? void 0 : _a.call(action, row))
                                        return null;
                                    return (<DropdownItem key={actionIndex} onClick={() => action.onClick(row, index)} disabled={(_b = action.disabled) === null || _b === void 0 ? void 0 : _b.call(action, row)}>
                                        <div className="flex items-center space-x-2">
                                          {action.icon}
                                          <span>{action.label}</span>
                                        </div>
                                      </DropdownItem>);
                                })}
                                </DropdownContent>
                              </Dropdown>)}
                          </div>
                        </td>)}
                    </tr>
                    
                    {/* Expandable Row */}
                    {(expandableRows === null || expandableRows === void 0 ? void 0 : expandableRows.enabled) && expandableRows.expandedRows.has(rowId) && (<tr>
                        <td colSpan={visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0)} className="p-0 border-0">
                          <div className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4">
                            {expandableRows.renderExpandedRow(row)}
                          </div>
                        </td>
                      </tr>)}
                  </React.Fragment>);
                }))}
          </tbody>
          
          {/* Footer */}
          {visibleColumns.some(col => col.footer) && (<tfoot className="bg-mw-gray-50 dark:bg-mw-gray-800 border-t border-mw-gray-200 dark:border-mw-gray-700">
              <tr>
                {hasSelection && (<td className={cn(internalState.density === 'compact' ? 'px-2 py-1' :
                    internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3')}/>)}
                
                {visibleColumns.map(column => {
                const columnData = processedData.map(row => {
                    return column.accessorFn
                        ? column.accessorFn(row)
                        : column.accessorKey
                            ? row[column.accessorKey]
                            : row;
                });
                let footerContent;
                if (typeof column.footer === 'function') {
                    footerContent = column.footer(columnData);
                }
                else {
                    footerContent = column.footer;
                }
                return (<td key={column.id} className={cn('text-sm font-medium text-mw-gray-900 dark:text-white', internalState.density === 'compact' ? 'px-2 py-1' :
                        internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3', column.align === 'center' && 'text-center', column.align === 'right' && 'text-right')}>
                      {footerContent}
                    </td>);
            })}
                
                {hasActions && (<td className={cn(internalState.density === 'compact' ? 'px-2 py-1' :
                    internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3')}/>)}
              </tr>
            </tfoot>)}
        </table>
      </div>
      
      {/* Pagination */}
      {renderPagination()}
    </div>);
}
//# sourceMappingURL=AdvancedTable.jsx.map
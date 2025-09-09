'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsx("th", { className: cn('bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700 relative', densityClasses[density], column.align === 'center' && 'text-center', column.align === 'right' && 'text-right', column.sticky === 'left' && 'sticky left-0 z-20', column.sticky === 'right' && 'sticky right-0 z-20', column.pinned && 'bg-mw-blue-50 dark:bg-mw-blue-950/20'), style: {
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth
        }, children: _jsxs("div", { className: "flex items-center justify-between group", children: [_jsxs("div", { className: "flex items-center space-x-2 min-w-0 flex-1", children: [_jsx("span", { className: cn('text-xs font-medium text-mw-gray-900 dark:text-white uppercase tracking-wider truncate', column.sortable && 'cursor-pointer hover:text-mw-primary-600 dark:hover:text-mw-primary-400 select-none'), onClick: handleSort, title: typeof column.header === 'string' ? column.header : column.id, children: column.header }), column.sortable && (_jsx("button", { onClick: handleSort, className: "text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300 flex-shrink-0", children: sortDirection === 'asc' ? (_jsx(ChevronUp, { className: "w-4 h-4" })) : sortDirection === 'desc' ? (_jsx(ChevronDown, { className: "w-4 h-4" })) : (_jsx(ChevronsUpDown, { className: "w-4 h-4 opacity-50" })) }))] }), _jsxs("div", { className: "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [column.filterable && (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowFilter(!showFilter), className: "p-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300 rounded", title: "Filter", children: _jsx(Filter, { className: "w-3 h-3" }) }), showFilter && (_jsx("div", { className: "absolute top-full right-0 mt-1 w-64 bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg z-30", children: _jsxs("form", { onSubmit: handleFilter, className: "p-4 space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1", children: "Operator" }), _jsxs("select", { value: filterOperator, onChange: (e) => setFilterOperator(e.target.value), className: "w-full px-2 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded focus:outline-none focus:border-mw-primary-500 bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white", children: [_jsx("option", { value: "contains", children: "Contains" }), _jsx("option", { value: "equals", children: "Equals" }), _jsx("option", { value: "startsWith", children: "Starts with" }), _jsx("option", { value: "endsWith", children: "Ends with" }), column.type === 'number' && (_jsxs(_Fragment, { children: [_jsx("option", { value: "gt", children: "Greater than" }), _jsx("option", { value: "lt", children: "Less than" }), _jsx("option", { value: "gte", children: "Greater than or equal" }), _jsx("option", { value: "lte", children: "Less than or equal" })] }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1", children: "Value" }), _jsx("input", { type: column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text', placeholder: `Filter ${typeof column.header === 'string' ? column.header : column.id}...`, value: filterValue, onChange: (e) => setFilterValue(e.target.value), className: "w-full px-2 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded focus:outline-none focus:border-mw-primary-500 bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white", autoFocus: true })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { type: "submit", size: "sm", className: "flex-1", children: "Apply" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: handleClearFilter, children: "Clear" })] })] }) }))] })), column.pinned && (_jsx("div", { title: "Pinned column", children: _jsx(Lock, { className: "w-3 h-3 text-mw-blue-500" }) }))] }), column.resizable && onResize && (_jsx("div", { ref: resizeRef, className: "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-mw-primary-500 transition-colors", onMouseDown: () => setIsResizing(true) }))] }) }));
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
                return (_jsx(Badge, { variant: value ? 'success' : 'secondary', children: value ? 'Yes' : 'No' }));
            case 'badge':
                return (_jsx(Badge, { variant: (value === null || value === void 0 ? void 0 : value.variant) || 'secondary', children: (value === null || value === void 0 ? void 0 : value.label) || value }));
            case 'progress':
                return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "flex-1 bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-mw-primary-500 h-2 rounded-full transition-all", style: { width: `${Math.min(100, Math.max(0, value || 0))}%` } }) }), _jsxs("span", { className: "text-xs text-mw-gray-600 dark:text-mw-gray-400 min-w-[3rem] text-right", children: [value, "%"] })] }));
            case 'image':
                return (_jsx("img", { src: value, alt: "", className: "w-8 h-8 rounded object-cover", onError: (e) => {
                        e.target.src = '/placeholder-image.png';
                    } }));
            case 'link':
                return (_jsxs("a", { href: (value === null || value === void 0 ? void 0 : value.href) || value, target: "_blank", rel: "noopener noreferrer", className: "text-mw-primary-600 dark:text-mw-primary-400 hover:underline inline-flex items-center space-x-1", children: [_jsx("span", { children: (value === null || value === void 0 ? void 0 : value.label) || value }), _jsx(ExternalLink, { className: "w-3 h-3" })] }));
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
    return (_jsx("td", { className: cn('text-sm text-mw-gray-900 dark:text-white border-r border-mw-gray-200 dark:border-mw-gray-700 last:border-r-0', densityClasses[density], column.align === 'center' && 'text-center', column.align === 'right' && 'text-right', column.sticky === 'left' && 'sticky left-0 z-10 bg-white dark:bg-mw-gray-900', column.sticky === 'right' && 'sticky right-0 z-10 bg-white dark:bg-mw-gray-900', onClick && 'cursor-pointer hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800'), onClick: onClick, children: renderCellContent() }));
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
    const renderToolbar = () => (_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [enableGlobalFilter && (_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: "Search...", value: internalState.globalFilter, onChange: (e) => handleGlobalFilter(e.target.value), className: "pl-10 w-64" })] })), internalState.filters.length > 0 && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs font-medium text-mw-gray-600 dark:text-mw-gray-400", children: "Filters:" }), internalState.filters.map((filter, index) => {
                                const column = columns.find(col => col.id === filter.columnId);
                                return (_jsxs(Badge, { variant: "secondary", className: "text-xs cursor-pointer", onClick: () => handleFilter(filter.columnId, ''), children: [column === null || column === void 0 ? void 0 : column.header, ": ", filter.value, _jsx(X, { className: "w-3 h-3 ml-1" })] }, index));
                            }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleClearFilters, className: "text-xs", children: [_jsx(FilterX, { className: "w-3 h-3 mr-1" }), "Clear All"] })] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [enableBulkActions && selection && selection.selectedRows.size > 0 && bulkActions && (_jsxs("div", { className: "flex items-center space-x-2 mr-4", children: [_jsxs("span", { className: "text-xs text-mw-gray-600 dark:text-mw-gray-400", children: [selection.selectedRows.size, " selected"] }), bulkActions.map((action, index) => {
                                var _a;
                                const selectedData = data.filter((row, rowIndex) => selection.selectedRows.has(getRowId(row, rowIndex)));
                                return (_jsxs(Button, { variant: action.variant || 'outline', size: "sm", onClick: () => action.onClick(selectedData), disabled: (_a = action.disabled) === null || _a === void 0 ? void 0 : _a.call(action, selectedData), title: action.tooltip, children: [action.icon, action.label] }, index));
                            })] })), toolbarActions === null || toolbarActions === void 0 ? void 0 : toolbarActions.map((action, index) => (_jsxs(Button, { variant: action.variant || 'outline', size: "sm", onClick: action.onClick, title: action.tooltip, children: [action.icon, action.label] }, index))), _jsxs("select", { value: internalState.density, onChange: (e) => updateState({ density: e.target.value }), className: "text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded px-2 py-1 bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white", children: [_jsx("option", { value: "compact", children: "Compact" }), _jsx("option", { value: "normal", children: "Normal" }), _jsx("option", { value: "comfortable", children: "Comfortable" })] }), enableColumnVisibility && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => setShowColumnSettings(!showColumnSettings), title: "Column Settings", children: _jsx(Columns, { className: "w-4 h-4" }) })), _jsx(Button, { variant: "outline", size: "sm", onClick: handleResetTable, title: "Reset Table", children: _jsx(RotateCcw, { className: "w-4 h-4" }) }), enableFullscreen && (_jsx(Button, { variant: "outline", size: "sm", onClick: toggleFullscreen, title: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen', children: isFullscreen ? (_jsx(Minimize2, { className: "w-4 h-4" })) : (_jsx(Maximize2, { className: "w-4 h-4" })) }))] })] }));
    const renderPagination = () => {
        if (!pagination)
            return null;
        const totalPages = Math.ceil(pagination.total / pagination.pageSize);
        const startRecord = pagination.pageIndex * pagination.pageSize + 1;
        const endRecord = Math.min((pagination.pageIndex + 1) * pagination.pageSize, pagination.total);
        return (_jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-t border-mw-gray-200 dark:border-mw-gray-700", children: [_jsx("div", { className: "flex items-center space-x-2", children: pagination.showTotal && (_jsx("span", { className: "text-xs text-mw-gray-600 dark:text-mw-gray-400", children: typeof pagination.showTotal === 'function'
                            ? pagination.showTotal(pagination.total, [startRecord, endRecord])
                            : `Showing ${startRecord} to ${endRecord} of ${pagination.total} results` })) }), _jsxs("div", { className: "flex items-center space-x-2", children: [pagination.showSizeChanger && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-mw-gray-600 dark:text-mw-gray-400", children: "Show" }), _jsx("select", { value: pagination.pageSize, onChange: (e) => pagination.onPageSizeChange(Number(e.target.value)), className: "text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded px-2 py-1 bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white", children: (pagination.pageSizeOptions || [10, 25, 50, 100]).map(size => (_jsx("option", { value: size, children: size }, size))) })] })), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => pagination.onPageChange(0), disabled: pagination.pageIndex === 0, title: "First Page", children: _jsx(ChevronsLeft, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => pagination.onPageChange(pagination.pageIndex - 1), disabled: pagination.pageIndex === 0, title: "Previous Page", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                                    return (_jsx(Button, { variant: pagination.pageIndex === pageNum ? 'primary' : 'outline', size: "sm", onClick: () => pagination.onPageChange(pageNum), className: "min-w-[2rem]", children: pageNum + 1 }, pageNum));
                                }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => pagination.onPageChange(pagination.pageIndex + 1), disabled: pagination.pageIndex >= totalPages - 1, title: "Next Page", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => pagination.onPageChange(totalPages - 1), disabled: pagination.pageIndex >= totalPages - 1, title: "Last Page", children: _jsx(ChevronsRight, { className: "w-4 h-4" }) })] }), pagination.showQuickJumper && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-mw-gray-600 dark:text-mw-gray-400", children: "Go to" }), _jsx(Input, { type: "number", min: 1, max: totalPages, className: "w-16 text-xs", onKeyDown: (e) => {
                                        if (e.key === 'Enter') {
                                            const page = parseInt(e.target.value) - 1;
                                            if (page >= 0 && page < totalPages) {
                                                pagination.onPageChange(page);
                                            }
                                        }
                                    } })] }))] })] }));
    };
    const hasSelection = selection && selection.mode !== 'none';
    const hasActions = rowActions && rowActions.length > 0;
    return (_jsxs("div", { ref: tableRef, className: cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg overflow-hidden', isFullscreen && 'fixed inset-0 z-50 rounded-none', className), children: [renderToolbar(), _jsx(Modal, { isOpen: showColumnSettings, onClose: () => setShowColumnSettings(false), size: "md", children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-mw-gray-900 dark:text-white mb-4", children: "Column Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "text-sm text-mw-gray-600 dark:text-mw-gray-400", children: "Configure which columns to display and their order." }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: columns.map(column => (_jsxs("div", { className: "flex items-center justify-between p-2 border border-mw-gray-200 dark:border-mw-gray-700 rounded", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", checked: internalState.columnVisibility[column.id] !== false, onChange: (e) => {
                                                            updateState({
                                                                columnVisibility: Object.assign(Object.assign({}, internalState.columnVisibility), { [column.id]: e.target.checked })
                                                            });
                                                        }, className: "rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-primary-600 focus:ring-mw-primary-500" }), _jsx("span", { className: "text-sm", children: column.header })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [column.pinned && (_jsx("div", { title: "Pinned column", children: _jsx(Lock, { className: "w-4 h-4 text-mw-primary-500" }) })), column.sticky && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: column.sticky }))] })] }, column.id))) }), _jsxs("div", { className: "flex justify-end space-x-2 pt-4 border-t border-mw-gray-200 dark:border-mw-gray-700", children: [_jsx(Button, { variant: "outline", onClick: () => {
                                                updateState({
                                                    columnVisibility: Object.fromEntries(columns.map(col => [col.id, true]))
                                                });
                                            }, children: "Show All" }), _jsx(Button, { variant: "outline", onClick: () => setShowColumnSettings(false), children: "Close" })] })] })] }) }), "      ", _jsx("div", { className: cn('overflow-auto', stickyHeader && 'max-h-96'), style: { maxHeight }, children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: cn(stickyHeader && 'sticky top-0 z-10'), children: _jsxs("tr", { children: [hasSelection && (_jsx("th", { className: cn('w-12 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700', internalState.density === 'compact' ? 'px-2 py-1' :
                                            internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3'), children: selection.mode === 'multiple' && (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && paginatedData.every((row, index) => selection.selectedRows.has(getRowId(row, index))), onChange: handleSelectAll, className: "rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-primary-600 focus:ring-mw-primary-500" })) })), visibleColumns.map(column => (_jsx(AdvancedTableHeaderCell, { column: column, sorting: internalState.sorting, onSort: handleSort, onFilter: handleFilter, onResize: enableColumnResizing ? handleColumnResize : undefined, density: internalState.density }, column.id))), hasActions && (_jsx("th", { className: cn('w-16 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700', internalState.density === 'compact' ? 'px-2 py-1' :
                                            internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3'), children: _jsx("span", { className: "sr-only", children: "Actions" }) }))] }) }), _jsx("tbody", { className: "divide-y divide-mw-gray-200 dark:divide-mw-gray-700", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0), className: "px-4 py-8 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(RefreshCw, { className: "w-4 h-4 animate-spin text-mw-primary-600" }), _jsx("span", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: loadingMessage })] }) }) })) : /* Error State */
                                errorMessage ? (_jsx("tr", { children: _jsx("td", { colSpan: visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0), className: "px-4 py-8 text-center", children: _jsx("div", { className: "text-red-600 dark:text-red-400", children: errorMessage }) }) })) : /* Empty State */
                                    paginatedData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0), className: "px-4 py-8 text-center text-sm text-mw-gray-500 dark:text-mw-gray-400", children: emptyMessage }) })) : (
                                    /* Data Rows */
                                    paginatedData.map((row, index) => {
                                        const rowId = getRowId(row, index);
                                        const isSelected = selection === null || selection === void 0 ? void 0 : selection.selectedRows.has(rowId);
                                        return (_jsxs(React.Fragment, { children: [_jsxs("tr", { className: cn('transition-colors', hoverable && 'hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800/50', striped && index % 2 === 1 && 'bg-mw-gray-25 dark:bg-mw-gray-950/50', isSelected && 'bg-mw-primary-50 dark:bg-mw-primary-950/20', onRowClick && 'cursor-pointer', internalState.density === 'compact' ? 'h-10' :
                                                        internalState.density === 'normal' ? 'h-12' : 'h-16'), onClick: () => onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(row, index), onDoubleClick: () => onRowDoubleClick === null || onRowDoubleClick === void 0 ? void 0 : onRowDoubleClick(row, index), onMouseEnter: () => onRowHover === null || onRowHover === void 0 ? void 0 : onRowHover(row, index), children: [hasSelection && (_jsx("td", { className: cn(internalState.density === 'compact' ? 'px-2 py-1' :
                                                                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3'), children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: () => handleRowSelect(rowId, row), className: "rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-primary-600 focus:ring-mw-primary-500" }) })), visibleColumns.map(column => {
                                                            const value = column.accessorFn
                                                                ? column.accessorFn(row)
                                                                : column.accessorKey
                                                                    ? row[column.accessorKey]
                                                                    : row;
                                                            return (_jsx(AdvancedTableCell, { column: column, row: row, value: value, density: internalState.density, onClick: () => onCellClick === null || onCellClick === void 0 ? void 0 : onCellClick(value, row, column) }, column.id));
                                                        }), hasActions && (_jsx("td", { className: cn('text-center', internalState.density === 'compact' ? 'px-2 py-1' :
                                                                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3'), children: _jsxs("div", { className: "flex items-center justify-center space-x-1", children: [rowActions.slice(0, 3).map((action, actionIndex) => {
                                                                        var _a, _b;
                                                                        if ((_a = action.hidden) === null || _a === void 0 ? void 0 : _a.call(action, row))
                                                                            return null;
                                                                        return (_jsx(Tooltip, { content: action.tooltip || action.label, children: _jsx(Button, { variant: "outline", size: "sm", onClick: (e) => {
                                                                                    e.stopPropagation();
                                                                                    action.onClick(row, index);
                                                                                }, disabled: (_b = action.disabled) === null || _b === void 0 ? void 0 : _b.call(action, row), className: "h-8 w-8 p-0", children: action.icon || _jsx(MoreVertical, { className: "w-4 h-4" }) }) }, actionIndex));
                                                                    }), rowActions.length > 3 && (_jsxs(Dropdown, { children: [_jsx(DropdownTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) }), _jsx(DropdownContent, { children: rowActions.slice(3).map((action, actionIndex) => {
                                                                                    var _a, _b;
                                                                                    if ((_a = action.hidden) === null || _a === void 0 ? void 0 : _a.call(action, row))
                                                                                        return null;
                                                                                    return (_jsx(DropdownItem, { onClick: () => action.onClick(row, index), disabled: (_b = action.disabled) === null || _b === void 0 ? void 0 : _b.call(action, row), children: _jsxs("div", { className: "flex items-center space-x-2", children: [action.icon, _jsx("span", { children: action.label })] }) }, actionIndex));
                                                                                }) })] }))] }) }))] }), (expandableRows === null || expandableRows === void 0 ? void 0 : expandableRows.enabled) && expandableRows.expandedRows.has(rowId) && (_jsx("tr", { children: _jsx("td", { colSpan: visibleColumns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0), className: "p-0 border-0", children: _jsx("div", { className: "bg-mw-gray-50 dark:bg-mw-gray-800 p-4", children: expandableRows.renderExpandedRow(row) }) }) }))] }, rowId));
                                    })) }), visibleColumns.some(col => col.footer) && (_jsx("tfoot", { className: "bg-mw-gray-50 dark:bg-mw-gray-800 border-t border-mw-gray-200 dark:border-mw-gray-700", children: _jsxs("tr", { children: [hasSelection && (_jsx("td", { className: cn(internalState.density === 'compact' ? 'px-2 py-1' :
                                            internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3') })), visibleColumns.map(column => {
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
                                        return (_jsx("td", { className: cn('text-sm font-medium text-mw-gray-900 dark:text-white', internalState.density === 'compact' ? 'px-2 py-1' :
                                                internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3', column.align === 'center' && 'text-center', column.align === 'right' && 'text-right'), children: footerContent }, column.id));
                                    }), hasActions && (_jsx("td", { className: cn(internalState.density === 'compact' ? 'px-2 py-1' :
                                            internalState.density === 'normal' ? 'px-4 py-2' : 'px-6 py-3') }))] }) }))] }) }), renderPagination()] }));
}
//# sourceMappingURL=AdvancedTable.js.map
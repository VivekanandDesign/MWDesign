'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Filter, MoreVertical } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function DataGridHeader({ column, sorting, onSort, onFilter }) {
    var _a;
    const [showFilter, setShowFilter] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const sortDirection = (_a = sorting === null || sorting === void 0 ? void 0 : sorting.find(s => s.columnId === column.id)) === null || _a === void 0 ? void 0 : _a.direction;
    const handleSort = () => {
        if (column.sortable && onSort) {
            onSort(column.id);
        }
    };
    const handleFilter = (e) => {
        e.preventDefault();
        onFilter === null || onFilter === void 0 ? void 0 : onFilter(column.id, filterValue);
        setShowFilter(false);
    };
    return (_jsx("th", { className: cn('px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700', column.align === 'center' && 'text-center', column.align === 'right' && 'text-right', column.sticky === 'left' && 'sticky left-0 z-10', column.sticky === 'right' && 'sticky right-0 z-10'), style: {
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth
        }, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: cn('text-xs font-medium text-mw-gray-900 dark:text-white uppercase tracking-wider', column.sortable && 'cursor-pointer hover:text-mw-blue-600 dark:hover:text-mw-blue-400'), onClick: handleSort, children: column.header }), column.sortable && (_jsx("button", { onClick: handleSort, className: "text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300", children: sortDirection === 'asc' ? (_jsx(ChevronUp, { className: "w-4 h-4" })) : sortDirection === 'desc' ? (_jsx(ChevronDown, { className: "w-4 h-4" })) : (_jsxs("div", { className: "w-4 h-4 flex flex-col", children: [_jsx(ChevronUp, { className: "w-4 h-2" }), _jsx(ChevronDown, { className: "w-4 h-2" })] })) })), column.filterable && (_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowFilter(!showFilter), className: "text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300", children: _jsx(Filter, { className: "w-4 h-4" }) }), showFilter && (_jsx("div", { className: "absolute top-full right-0 mt-1 w-48 bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg z-20", children: _jsxs("form", { onSubmit: handleFilter, className: "p-3", children: [_jsx("input", { type: "text", placeholder: `Filter ${column.header}...`, value: filterValue, onChange: (e) => setFilterValue(e.target.value), className: "w-full px-3 py-2 text-sm border border-mw-gray-200 dark:border-mw-gray-700 rounded focus:outline-none focus:border-mw-blue-500 dark:focus:border-mw-blue-400 bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white", autoFocus: true }), _jsxs("div", { className: "mt-2 flex space-x-2", children: [_jsx("button", { type: "submit", className: "px-3 py-1 text-xs bg-mw-blue-600 text-white rounded hover:bg-mw-blue-700", children: "Apply" }), _jsx("button", { type: "button", onClick: () => {
                                                    setFilterValue('');
                                                    onFilter === null || onFilter === void 0 ? void 0 : onFilter(column.id, '');
                                                    setShowFilter(false);
                                                }, className: "px-3 py-1 text-xs bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600", children: "Clear" })] })] }) }))] }))] }) }));
}
export function DataGrid({ data, columns, getRowId = (_, index) => index, sorting = [], onSortingChange, filters = [], onFiltersChange, selection, pagination, rowActions, loading = false, emptyMessage = 'No data available', striped = false, bordered = false, compact = false, stickyHeader = false, maxHeight, className }) {
    // Handle sorting
    const handleSort = useCallback((columnId) => {
        if (!onSortingChange)
            return;
        const existingSort = sorting.find(s => s.columnId === columnId);
        let newSorting;
        if (!existingSort) {
            newSorting = [{ columnId, direction: 'asc' }];
        }
        else if (existingSort.direction === 'asc') {
            newSorting = [{ columnId, direction: 'desc' }];
        }
        else {
            newSorting = sorting.filter(s => s.columnId !== columnId);
        }
        onSortingChange(newSorting);
    }, [sorting, onSortingChange]);
    // Handle filtering
    const handleFilter = useCallback((columnId, value) => {
        if (!onFiltersChange)
            return;
        const newFilters = filters.filter(f => f.columnId !== columnId);
        if (value) {
            newFilters.push({ columnId, value, operator: 'contains' });
        }
        onFiltersChange(newFilters);
    }, [filters, onFiltersChange]);
    // Handle selection
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
        const selectedData = data.filter((_, index) => newSelection.has(getRowId(data[index], index)));
        (_a = selection.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(selection, newSelection, selectedData);
    }, [selection, data, getRowId]);
    const handleSelectAll = useCallback(() => {
        var _a;
        if (!selection || selection.mode !== 'multiple')
            return;
        const allSelected = data.length > 0 &&
            data.every((_, index) => selection.selectedRows.has(getRowId(data[index], index)));
        const newSelection = new Set();
        if (!allSelected) {
            data.forEach((_, index) => {
                newSelection.add(getRowId(data[index], index));
            });
        }
        const selectedData = allSelected ? [] : data;
        (_a = selection.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(selection, newSelection, selectedData);
    }, [selection, data, getRowId]);
    // Render cell content
    const renderCell = (column, row) => {
        if (column.cell) {
            const value = column.accessorKey ? row[column.accessorKey] : row;
            return column.cell(value, row);
        }
        if (column.accessorKey) {
            const value = row[column.accessorKey];
            if (column.type === 'boolean') {
                return value ? 'Yes' : 'No';
            }
            if (column.type === 'date' && value && Object.prototype.toString.call(value) === '[object Date]') {
                return value.toLocaleDateString();
            }
            return String(value !== null && value !== void 0 ? value : '');
        }
        return null;
    };
    const hasSelection = selection && selection.mode !== 'none';
    const hasActions = rowActions && rowActions.length > 0;
    return (_jsxs("div", { className: cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg overflow-hidden', className), children: [_jsx("div", { className: cn('overflow-auto', stickyHeader && 'max-h-96'), style: { maxHeight }, children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: cn(stickyHeader && 'sticky top-0 z-10'), children: _jsxs("tr", { children: [hasSelection && (_jsx("th", { className: "w-12 px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700", children: selection.mode === 'multiple' && (_jsx("input", { type: "checkbox", checked: data.length > 0 && data.every((_, index) => selection.selectedRows.has(getRowId(data[index], index))), onChange: handleSelectAll, className: "rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-blue-600 focus:ring-mw-blue-500" })) })), columns.map((column) => (_jsx(DataGridHeader, { column: column, sorting: sorting, onSort: handleSort, onFilter: handleFilter }, column.id))), hasActions && (_jsx("th", { className: "w-12 px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700", children: _jsx("span", { className: "sr-only", children: "Actions" }) }))] }) }), _jsx("tbody", { className: "divide-y divide-mw-gray-200 dark:divide-mw-gray-700", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0), className: "px-4 py-8 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-mw-blue-600 border-t-transparent rounded-full animate-spin" }), _jsx("span", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: "Loading..." })] }) }) })) : data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0), className: "px-4 py-8 text-center text-sm text-mw-gray-500 dark:text-mw-gray-400", children: emptyMessage }) })) : (data.map((row, index) => {
                                const rowId = getRowId(row, index);
                                const isSelected = selection === null || selection === void 0 ? void 0 : selection.selectedRows.has(rowId);
                                return (_jsxs("tr", { className: cn('hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800/50', striped && index % 2 === 1 && 'bg-mw-gray-25 dark:bg-mw-gray-950/50', isSelected && 'bg-mw-blue-50 dark:bg-mw-blue-950/20', compact ? 'h-12' : 'h-16'), children: [hasSelection && (_jsx("td", { className: "px-4 py-3", children: _jsx("input", { type: selection.mode === 'single' ? 'radio' : 'checkbox', name: selection.mode === 'single' ? 'row-selection' : undefined, checked: isSelected, onChange: () => handleRowSelect(rowId, row), className: "rounded border-mw-gray-300 dark:border-mw-gray-600 text-mw-blue-600 focus:ring-mw-blue-500" }) })), columns.map((column) => (_jsx("td", { className: cn('px-4 py-3 text-sm text-mw-gray-900 dark:text-white', column.align === 'center' && 'text-center', column.align === 'right' && 'text-right', column.sticky === 'left' && 'sticky left-0 z-10 bg-white dark:bg-mw-gray-900', column.sticky === 'right' && 'sticky right-0 z-10 bg-white dark:bg-mw-gray-900', bordered && 'border-r border-mw-gray-200 dark:border-mw-gray-700 last:border-r-0'), children: renderCell(column, row) }, column.id))), hasActions && (_jsx("td", { className: "px-4 py-3", children: _jsx("div", { className: "flex items-center space-x-2", children: rowActions.map((action, actionIndex) => (_jsx("button", { onClick: () => action.onClick(row), className: cn('p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800', action.variant === 'destructive'
                                                        ? 'text-red-600 hover:text-red-700'
                                                        : 'text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-700 dark:hover:text-mw-gray-300'), title: action.label, children: action.icon || _jsx(MoreVertical, { className: "w-4 h-4" }) }, actionIndex))) }) }))] }, rowId));
                            })) })] }) }), pagination && (_jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-mw-gray-50 dark:bg-mw-gray-800 border-t border-mw-gray-200 dark:border-mw-gray-700", children: [_jsx("div", { className: "flex items-center space-x-2", children: _jsxs("span", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: ["Showing ", pagination.pageIndex * pagination.pageSize + 1, " to", ' ', Math.min((pagination.pageIndex + 1) * pagination.pageSize, pagination.total), " of", ' ', pagination.total, " results"] }) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("select", { value: pagination.pageSize, onChange: (e) => pagination.onPageSizeChange(Number(e.target.value)), className: "text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded px-2 py-1 bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] }), _jsx("button", { onClick: () => pagination.onPageChange(pagination.pageIndex - 1), disabled: pagination.pageIndex === 0, className: "px-3 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800", children: "Previous" }), _jsx("button", { onClick: () => pagination.onPageChange(pagination.pageIndex + 1), disabled: (pagination.pageIndex + 1) * pagination.pageSize >= pagination.total, className: "px-3 py-1 text-xs border border-mw-gray-200 dark:border-mw-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800", children: "Next" })] })] }))] }));
}
//# sourceMappingURL=DataGrid.js.map
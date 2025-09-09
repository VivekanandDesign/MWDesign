import React from 'react';
export type AdvancedTableColumnType = 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'progress' | 'image' | 'link' | 'custom';
export type AdvancedTableSortDirection = 'asc' | 'desc' | null;
export type AdvancedTableFilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'between' | 'in' | 'notIn';
export type AdvancedTableSelectionMode = 'none' | 'single' | 'multiple';
export type AdvancedTableDensity = 'compact' | 'normal' | 'comfortable';
export interface AdvancedTableColumn<T = any> {
    id: string;
    header: string | React.ReactNode;
    accessorKey?: keyof T | string;
    accessorFn?: (row: T) => any;
    cell?: (value: any, row: T, column: AdvancedTableColumn<T>) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
    type?: AdvancedTableColumnType;
    width?: number | string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'left' | 'center' | 'right';
    sticky?: 'left' | 'right';
    resizable?: boolean;
    hidden?: boolean;
    pinned?: boolean;
    freezable?: boolean;
    aggregate?: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'custom';
    aggregateFn?: (values: any[]) => any;
    footer?: React.ReactNode | ((values: any[]) => React.ReactNode);
    meta?: Record<string, any>;
}
export interface AdvancedTableSort {
    columnId: string;
    direction: AdvancedTableSortDirection;
}
export interface AdvancedTableFilter {
    columnId: string;
    value: any;
    operator?: AdvancedTableFilterOperator;
}
export interface AdvancedTableSelection<T = any> {
    mode: AdvancedTableSelectionMode;
    selectedRows: Set<string | number>;
    onSelectionChange?: (selectedRows: Set<string | number>, selectedData: T[]) => void;
    preserveSelection?: boolean;
}
export interface AdvancedTablePagination {
    pageIndex: number;
    pageSize: number;
    total: number;
    onPageChange: (pageIndex: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
    pageSizeOptions?: number[];
}
export interface AdvancedTableRowAction<T = any> {
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T, rowIndex: number) => void;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'flow';
    disabled?: (row: T) => boolean;
    hidden?: (row: T) => boolean;
    tooltip?: string;
}
export interface AdvancedTableBulkAction<T = any> {
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedRows: T[]) => void;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'flow';
    disabled?: (selectedRows: T[]) => boolean;
    tooltip?: string;
}
export interface AdvancedTableToolbarAction {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'flow';
    tooltip?: string;
}
export interface AdvancedTableState {
    sorting: AdvancedTableSort[];
    filters: AdvancedTableFilter[];
    globalFilter: string;
    columnVisibility: Record<string, boolean>;
    columnOrder: string[];
    columnSizing: Record<string, number>;
    density: AdvancedTableDensity;
    frozenColumns: {
        left: string[];
        right: string[];
    };
}
interface AdvancedTableProps<T = any> {
    data: T[];
    columns: AdvancedTableColumn<T>[];
    getRowId?: (row: T, index: number) => string | number;
    state?: Partial<AdvancedTableState>;
    onStateChange?: (state: AdvancedTableState) => void;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enableGlobalFilter?: boolean;
    enableColumnResizing?: boolean;
    enableColumnReordering?: boolean;
    enableColumnVisibility?: boolean;
    enableRowSelection?: boolean;
    enableBulkActions?: boolean;
    enableVirtualization?: boolean;
    enableExport?: boolean;
    enableFullscreen?: boolean;
    selection?: AdvancedTableSelection<T>;
    pagination?: AdvancedTablePagination;
    rowActions?: AdvancedTableRowAction<T>[];
    bulkActions?: AdvancedTableBulkAction<T>[];
    toolbarActions?: AdvancedTableToolbarAction[];
    loading?: boolean;
    loadingMessage?: string;
    emptyMessage?: string | React.ReactNode;
    errorMessage?: string | React.ReactNode;
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    stickyHeader?: boolean;
    maxHeight?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    onRowClick?: (row: T, rowIndex: number) => void;
    onRowDoubleClick?: (row: T, rowIndex: number) => void;
    onRowHover?: (row: T, rowIndex: number) => void;
    onCellClick?: (value: any, row: T, column: AdvancedTableColumn<T>) => void;
    expandableRows?: {
        enabled: boolean;
        expandedRows: Set<string | number>;
        onExpandedChange: (expandedRows: Set<string | number>) => void;
        renderExpandedRow: (row: T) => React.ReactNode;
    };
    grouping?: {
        enabled: boolean;
        groupBy: string[];
        onGroupByChange: (groupBy: string[]) => void;
    };
    virtualization?: {
        enabled: boolean;
        estimatedRowHeight: number;
        overscan?: number;
    };
}
export declare function AdvancedTable<T extends Record<string, any>>({ data, columns, getRowId, state, onStateChange, enableSorting, enableFiltering, enableGlobalFilter, enableColumnResizing, enableColumnReordering, enableColumnVisibility, enableRowSelection, enableBulkActions, enableVirtualization, enableExport, enableFullscreen, selection, pagination, rowActions, bulkActions, toolbarActions, loading, loadingMessage, emptyMessage, errorMessage, striped, bordered, hoverable, stickyHeader, maxHeight, className, size, onRowClick, onRowDoubleClick, onRowHover, onCellClick, expandableRows, grouping, virtualization }: AdvancedTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AdvancedTable.d.ts.map
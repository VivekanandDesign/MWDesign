import React from 'react';
export type DataGridColumnType = 'text' | 'number' | 'date' | 'boolean' | 'custom';
export type DataGridSortDirection = 'asc' | 'desc' | null;
export interface DataGridColumn<T = any> {
    id: string;
    header: string;
    accessorKey?: keyof T;
    cell?: (value: any, row: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    type?: DataGridColumnType;
    width?: number | string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'left' | 'center' | 'right';
    sticky?: 'left' | 'right';
}
export interface DataGridSort {
    columnId: string;
    direction: DataGridSortDirection;
}
export interface DataGridFilter {
    columnId: string;
    value: any;
    operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
}
export interface DataGridSelection<T = any> {
    mode: 'none' | 'single' | 'multiple';
    selectedRows: Set<string | number>;
    onSelectionChange?: (selectedRows: Set<string | number>, selectedData: T[]) => void;
}
interface DataGridProps<T = any> {
    data: T[];
    columns: DataGridColumn<T>[];
    getRowId?: (row: T, index: number) => string | number;
    sorting?: DataGridSort[];
    onSortingChange?: (sorting: DataGridSort[]) => void;
    filters?: DataGridFilter[];
    onFiltersChange?: (filters: DataGridFilter[]) => void;
    selection?: DataGridSelection<T>;
    pagination?: {
        pageIndex: number;
        pageSize: number;
        total: number;
        onPageChange: (pageIndex: number) => void;
        onPageSizeChange: (pageSize: number) => void;
    };
    rowActions?: Array<{
        label: string;
        icon?: React.ReactNode;
        onClick: (row: T) => void;
        variant?: 'default' | 'destructive';
    }>;
    loading?: boolean;
    emptyMessage?: string;
    striped?: boolean;
    bordered?: boolean;
    compact?: boolean;
    stickyHeader?: boolean;
    maxHeight?: string;
    className?: string;
}
export declare function DataGrid<T extends Record<string, any>>({ data, columns, getRowId, sorting, onSortingChange, filters, onFiltersChange, selection, pagination, rowActions, loading, emptyMessage, striped, bordered, compact, stickyHeader, maxHeight, className }: DataGridProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DataGrid.d.ts.map
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    striped?: boolean;
    hoverable?: boolean;
    size?: 'sm' | 'md' | 'lg';
}
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
}
export interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | 'none';
    onSort?: () => void;
}
export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
}
export declare function Table({ className, striped, hoverable, size, children, ...props }: TableProps): import("react/jsx-runtime").JSX.Element;
export declare function TableHeader({ className, children, ...props }: TableHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function TableBody({ className, children, ...props }: TableBodyProps): import("react/jsx-runtime").JSX.Element;
export declare function TableRow({ className, children, ...props }: TableRowProps): import("react/jsx-runtime").JSX.Element;
export declare function TableHead({ className, sortable, sortDirection, onSort, children, ...props }: TableHeadProps): import("react/jsx-runtime").JSX.Element;
export declare function TableCell({ className, children, ...props }: TableCellProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Table.d.ts.map
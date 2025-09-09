import { ReactNode } from 'react';
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    siblingCount?: number;
    className?: string;
}
export declare const Pagination: ({ currentPage, totalPages, onPageChange, showFirstLast, showPrevNext, siblingCount, className }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
interface PaginationButtonProps {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
    className?: string;
    'aria-label'?: string;
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
}
declare const PaginationButton: ({ children, onClick, disabled, isActive, className, ...props }: PaginationButtonProps) => import("react/jsx-runtime").JSX.Element;
export { PaginationButton };
//# sourceMappingURL=Pagination.d.ts.map
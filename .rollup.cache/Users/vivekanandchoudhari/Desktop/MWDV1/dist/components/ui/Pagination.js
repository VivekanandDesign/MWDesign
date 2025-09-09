import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
export const Pagination = ({ currentPage, totalPages, onPageChange, showFirstLast = true, showPrevNext = true, siblingCount = 1, className }) => {
    const generatePageNumbers = () => {
        const pages = [];
        // Always show first page
        pages.push(1);
        // Calculate start and end for middle pages
        const start = Math.max(2, currentPage - siblingCount);
        const end = Math.min(totalPages - 1, currentPage + siblingCount);
        // Add ellipsis after first page if needed
        if (start > 2) {
            pages.push('...');
        }
        // Add middle pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        // Add ellipsis before last page if needed
        if (end < totalPages - 1) {
            pages.push('...');
        }
        // Always show last page (if more than 1 page)
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        return pages;
    };
    const pages = generatePageNumbers();
    return (_jsxs("nav", { className: clsx('flex items-center justify-center space-x-1', className), "aria-label": "Pagination", children: [showFirstLast && (_jsx(PaginationButton, { onClick: () => onPageChange(1), disabled: currentPage === 1, "aria-label": "Go to first page", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 19l-7-7 7-7m8 14l-7-7 7-7" }) }) })), showPrevNext && (_jsx(PaginationButton, { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, "aria-label": "Go to previous page", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) })), pages.map((page, index) => (_jsx("div", { children: typeof page === 'number' ? (_jsx(PaginationButton, { onClick: () => onPageChange(page), isActive: page === currentPage, "aria-label": `Go to page ${page}`, "aria-current": page === currentPage ? 'page' : undefined, children: page })) : (_jsx("span", { className: "px-3 py-2 text-sm text-mw-gray-500 dark:text-mw-gray-400", children: page })) }, index))), showPrevNext && (_jsx(PaginationButton, { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, "aria-label": "Go to next page", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })), showFirstLast && (_jsx(PaginationButton, { onClick: () => onPageChange(totalPages), disabled: currentPage === totalPages, "aria-label": "Go to last page", children: _jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 5l7 7-7 7M5 5l7 7-7 7" }) }) }))] }));
};
const PaginationButton = (_a) => {
    var { children, onClick, disabled = false, isActive = false, className } = _a, props = __rest(_a, ["children", "onClick", "disabled", "isActive", "className"]);
    return (_jsx("button", Object.assign({ onClick: onClick, disabled: disabled, className: clsx('px-3 py-2 text-sm font-medium rounded-md', 'border border-mw-gray-300 dark:border-mw-gray-600', 'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:ring-offset-2', 'transition-colors duration-200', {
            // Active state
            'bg-mw-blue-600 text-white border-mw-blue-600': isActive,
            // Default state
            'bg-white dark:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-gray-50 dark:hover:bg-mw-gray-700': !isActive && !disabled,
            // Disabled state
            'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-400 dark:text-mw-gray-500 cursor-not-allowed': disabled,
        }, className) }, props, { children: children })));
};
export { PaginationButton };
//# sourceMappingURL=Pagination.js.map
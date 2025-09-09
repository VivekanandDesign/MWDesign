'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const listVariants = {
    ordered: 'list-decimal',
    unordered: 'list-disc',
    none: 'list-none'
};
const listSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
};
const listSpacing = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-4'
};
export function List({ children, variant = 'unordered', size = 'md', spacing = 'normal', className }) {
    const Component = variant === 'ordered' ? 'ol' : 'ul';
    return (_jsx(Component, { className: cn(listVariants[variant], listSizes[size], listSpacing[spacing], variant !== 'none' && 'pl-5', 'text-mw-gray-700 dark:text-mw-gray-300', className), children: children }));
}
export function ListItem({ children, className, startContent, endContent }) {
    return (_jsxs("li", { className: cn('flex items-start', className), children: [startContent && (_jsx("div", { className: "flex-shrink-0 mr-2", children: startContent })), _jsx("div", { className: "flex-1 min-w-0", children: children }), endContent && (_jsx("div", { className: "flex-shrink-0 ml-2", children: endContent }))] }));
}
export function DescriptionList({ items, layout = 'vertical', className }) {
    return (_jsx("dl", { className: cn(layout === 'horizontal'
            ? 'grid grid-cols-3 gap-x-4 gap-y-2'
            : 'space-y-3', className), children: items.map((item, index) => (_jsxs(React.Fragment, { children: [_jsx("dt", { className: cn('font-medium text-mw-gray-900 dark:text-white', layout === 'horizontal' ? 'col-span-1' : 'mb-1'), children: item.term }), _jsx("dd", { className: cn('text-mw-gray-600 dark:text-mw-gray-300', layout === 'horizontal' ? 'col-span-2' : ''), children: item.description })] }, index))) }));
}
export function NavigationList({ items, className }) {
    return (_jsx("ul", { className: cn('space-y-1', className), children: items.map((item, index) => (_jsx("li", { children: item.href ? (_jsxs("a", { href: item.href, className: cn('flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors', item.active
                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                    : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 hover:text-mw-gray-900 dark:hover:text-white', item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'), children: [item.icon && (_jsx("span", { className: "mr-2", children: item.icon })), item.label] })) : (_jsxs("button", { onClick: item.onClick, disabled: item.disabled, className: cn('w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-left', item.active
                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                    : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 hover:text-mw-gray-900 dark:hover:text-white', item.disabled && 'opacity-50 cursor-not-allowed'), children: [item.icon && (_jsx("span", { className: "mr-2", children: item.icon })), item.label] })) }, index))) }));
}
//# sourceMappingURL=List.js.map
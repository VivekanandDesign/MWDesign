'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const sidebarWidths = {
    sm: 'w-64',
    md: 'w-72',
    lg: 'w-80',
    xl: 'w-96'
};
const collapsedWidth = 'w-16';
export function Sidebar({ children, isOpen = true, onOpenChange, position = 'left', variant = 'persistent', width = 'md', className, collapsible = false, collapsed = false, onCollapsedChange }) {
    const [internalOpen, setInternalOpen] = useState(isOpen);
    const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
    const open = onOpenChange ? isOpen : internalOpen;
    const isCollapsed = onCollapsedChange ? collapsed : internalCollapsed;
    const handleOpenChange = (newOpen) => {
        if (onOpenChange) {
            onOpenChange(newOpen);
        }
        else {
            setInternalOpen(newOpen);
        }
    };
    const handleCollapsedChange = (newCollapsed) => {
        if (onCollapsedChange) {
            onCollapsedChange(newCollapsed);
        }
        else {
            setInternalCollapsed(newCollapsed);
        }
    };
    if (variant === 'overlay') {
        return (_jsxs(_Fragment, { children: [open && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-40 lg:hidden", onClick: () => handleOpenChange(false) })), _jsx("div", { className: cn('fixed top-0 h-full bg-white dark:bg-mw-gray-900 border-r border-mw-gray-200 dark:border-mw-gray-700 z-50 transition-transform duration-300 ease-in-out', position === 'left' ? 'left-0' : 'right-0', sidebarWidths[width], open
                        ? 'translate-x-0'
                        : position === 'left'
                            ? '-translate-x-full'
                            : 'translate-x-full', className), children: children })] }));
    }
    return (_jsxs("div", { className: cn('flex flex-col bg-white dark:bg-mw-gray-900 border-r border-mw-gray-200 dark:border-mw-gray-700 transition-all duration-300 ease-in-out', collapsible && isCollapsed ? collapsedWidth : sidebarWidths[width], !open && variant === 'push' && 'hidden', className), children: [collapsible && (_jsx("div", { className: "flex justify-end p-2 border-b border-mw-gray-200 dark:border-mw-gray-700", children: _jsx("button", { onClick: () => handleCollapsedChange(!isCollapsed), className: "p-1 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300", children: isCollapsed ? (_jsx(ChevronRight, { className: "w-4 h-4" })) : (_jsx(ChevronLeft, { className: "w-4 h-4" })) }) })), _jsx("div", { className: cn('flex-1 overflow-hidden', isCollapsed && 'px-2'), children: children })] }));
}
export function SidebarHeader({ children, className }) {
    return (_jsx("div", { className: cn('px-4 py-4 border-b border-mw-gray-200 dark:border-mw-gray-700', className), children: children }));
}
export function SidebarContent({ children, className }) {
    return (_jsx("div", { className: cn('flex-1 overflow-y-auto px-4 py-4', className), children: children }));
}
export function SidebarFooter({ children, className }) {
    return (_jsx("div", { className: cn('px-4 py-4 border-t border-mw-gray-200 dark:border-mw-gray-700', className), children: children }));
}
export function SidebarTrigger({ onClick, className }) {
    return (_jsx("button", { onClick: onClick, className: cn('p-2 rounded-md text-mw-gray-500 hover:text-mw-gray-700 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 dark:hover:text-mw-gray-300 lg:hidden', className), children: _jsx(Menu, { className: "w-5 h-5" }) }));
}
//# sourceMappingURL=Sidebar.js.map
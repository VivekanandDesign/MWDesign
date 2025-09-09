'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { FileX, Search, Package, Users, Database } from 'lucide-react';
import { Button } from './Button';
const emptyStateIcons = {
    noData: _jsx(Database, { className: "w-12 h-12 text-mw-gray-400" }),
    noResults: _jsx(Search, { className: "w-12 h-12 text-mw-gray-400" }),
    noFiles: _jsx(FileX, { className: "w-12 h-12 text-mw-gray-400" }),
    noUsers: _jsx(Users, { className: "w-12 h-12 text-mw-gray-400" }),
    empty: _jsx(Package, { className: "w-12 h-12 text-mw-gray-400" })
};
const emptySizes = {
    sm: {
        container: 'py-8',
        icon: 'w-8 h-8',
        title: 'text-sm font-medium',
        description: 'text-xs',
        spacing: 'space-y-2'
    },
    md: {
        container: 'py-12',
        icon: 'w-12 h-12',
        title: 'text-lg font-semibold',
        description: 'text-sm',
        spacing: 'space-y-4'
    },
    lg: {
        container: 'py-16',
        icon: 'w-16 h-16',
        title: 'text-xl font-semibold',
        description: 'text-base',
        spacing: 'space-y-6'
    }
};
export function EmptyState(_a) {
    var { icon, title, description, action, size = 'md', className } = _a, props = __rest(_a, ["icon", "title", "description", "action", "size", "className"]);
    const sizeConfig = emptySizes[size];
    return (_jsxs("div", Object.assign({ className: clsx('flex flex-col items-center justify-center text-center', sizeConfig.container, sizeConfig.spacing, className) }, props, { children: [_jsx("div", { className: clsx('flex items-center justify-center', sizeConfig.icon), children: icon || emptyStateIcons.empty }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: clsx(sizeConfig.title, 'text-mw-gray-900 dark:text-white'), children: title }), description && (_jsx("p", { className: clsx(sizeConfig.description, 'text-mw-gray-600 dark:text-mw-gray-400 max-w-sm'), children: description }))] }), action && (_jsx(Button, { onClick: action.onClick, variant: action.variant || 'primary', size: size === 'sm' ? 'sm' : 'md', children: action.label }))] })));
}
// Predefined empty state variants
export function NoDataEmptyState(props) {
    return _jsx(EmptyState, Object.assign({ icon: emptyStateIcons.noData }, props));
}
export function NoResultsEmptyState(props) {
    return _jsx(EmptyState, Object.assign({ icon: emptyStateIcons.noResults }, props));
}
export function NoFilesEmptyState(props) {
    return _jsx(EmptyState, Object.assign({ icon: emptyStateIcons.noFiles }, props));
}
export function NoUsersEmptyState(props) {
    return _jsx(EmptyState, Object.assign({ icon: emptyStateIcons.noUsers }, props));
}
//# sourceMappingURL=EmptyState.js.map
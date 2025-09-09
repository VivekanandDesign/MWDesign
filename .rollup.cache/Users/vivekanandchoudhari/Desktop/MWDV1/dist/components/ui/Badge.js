import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
const badgeVariants = {
    default: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
    primary: 'bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/20 dark:text-mw-blue-300',
    secondary: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    outline: 'border border-mw-gray-300 dark:border-mw-gray-600 text-mw-gray-700 dark:text-mw-gray-300'
};
const badgeSizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
};
export const Badge = forwardRef((_a, ref) => {
    var { className, variant = 'default', size = 'md', children } = _a, props = __rest(_a, ["className", "variant", "size", "children"]);
    return (_jsx("span", Object.assign({ ref: ref, className: clsx('inline-flex items-center rounded-full font-medium', badgeVariants[variant], badgeSizes[size], className) }, props, { children: children })));
});
Badge.displayName = 'Badge';
//# sourceMappingURL=Badge.js.map
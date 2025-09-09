'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
const progressSizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
};
const progressVariants = {
    default: 'bg-mw-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
};
export const Progress = forwardRef((_a, ref) => {
    var { className, value = 0, max = 100, size = 'md', variant = 'default', showLabel = false, label } = _a, props = __rest(_a, ["className", "value", "max", "size", "variant", "showLabel", "label"]);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    return (_jsxs("div", { className: "space-y-2", children: [(showLabel || label) && (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300", children: label || 'Progress' }), showLabel && (_jsxs("span", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: [Math.round(percentage), "%"] }))] })), _jsx("div", Object.assign({ ref: ref, className: clsx('w-full bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full overflow-hidden', progressSizes[size], className) }, props, { children: _jsx("div", { className: clsx('h-full transition-all duration-300 ease-in-out rounded-full', progressVariants[variant]), style: { width: `${percentage}%` }, role: "progressbar", "aria-valuenow": value, "aria-valuemax": max, "aria-valuemin": 0 }) }))] }));
});
Progress.displayName = 'Progress';
//# sourceMappingURL=Progress.js.map
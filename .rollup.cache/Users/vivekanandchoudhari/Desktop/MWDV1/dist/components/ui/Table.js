'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { ChevronUp, ChevronDown } from 'lucide-react';
const tableSizes = {
    sm: '[&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-1 text-sm',
    md: '[&_th]:px-4 [&_th]:py-2 [&_td]:px-4 [&_td]:py-2',
    lg: '[&_th]:px-6 [&_th]:py-3 [&_td]:px-6 [&_td]:py-3 text-lg'
};
export function Table(_a) {
    var { className, striped = false, hoverable = false, size = 'md', children } = _a, props = __rest(_a, ["className", "striped", "hoverable", "size", "children"]);
    return (_jsx("div", { className: "overflow-x-auto", children: _jsx("table", Object.assign({ className: clsx('w-full border-collapse border border-mw-gray-200 dark:border-mw-gray-700', tableSizes[size], striped && '[&_tbody_tr:nth-child(even)]:bg-mw-gray-50 dark:[&_tbody_tr:nth-child(even)]:bg-mw-gray-800/50', hoverable && '[&_tbody_tr]:hover:bg-mw-gray-50 dark:[&_tbody_tr]:hover:bg-mw-gray-800/50', className) }, props, { children: children })) }));
}
export function TableHeader(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("thead", Object.assign({ className: clsx('bg-mw-gray-100 dark:bg-mw-gray-800', className) }, props, { children: children })));
}
export function TableBody(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("tbody", Object.assign({ className: clsx('bg-white dark:bg-mw-gray-900', className) }, props, { children: children })));
}
export function TableRow(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("tr", Object.assign({ className: clsx('border-b border-mw-gray-200 dark:border-mw-gray-700 transition-colors', className) }, props, { children: children })));
}
export function TableHead(_a) {
    var { className, sortable = false, sortDirection = 'none', onSort, children } = _a, props = __rest(_a, ["className", "sortable", "sortDirection", "onSort", "children"]);
    return (_jsx("th", Object.assign({ className: clsx('text-left font-semibold text-mw-gray-900 dark:text-white border-r border-mw-gray-200 dark:border-mw-gray-700 last:border-r-0', sortable && 'cursor-pointer select-none hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700', className), onClick: sortable ? onSort : undefined }, props, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: children }), sortable && (_jsxs("div", { className: "flex flex-col ml-2", children: [_jsx(ChevronUp, { className: clsx('w-3 h-3', sortDirection === 'asc' ? 'text-mw-blue-600' : 'text-mw-gray-400') }), _jsx(ChevronDown, { className: clsx('w-3 h-3 -mt-1', sortDirection === 'desc' ? 'text-mw-blue-600' : 'text-mw-gray-400') })] }))] }) })));
}
export function TableCell(_a) {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("td", Object.assign({ className: clsx('text-mw-gray-700 dark:text-mw-gray-300 border-r border-mw-gray-200 dark:border-mw-gray-700 last:border-r-0', className) }, props, { children: children })));
}
//# sourceMappingURL=Table.js.map
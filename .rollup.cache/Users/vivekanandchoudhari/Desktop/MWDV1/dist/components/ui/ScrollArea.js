'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
export const ScrollArea = forwardRef((_a, ref) => {
    var { className, children, type = 'hover' } = _a, props = __rest(_a, ["className", "children", "type"]);
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('relative overflow-hidden', className) }, props, { children: _jsx("div", { className: clsx('h-full w-full rounded-[inherit]', {
                'overflow-auto': type === 'auto',
                'overflow-scroll': type === 'always' || type === 'scroll',
                'overflow-auto scrollbar-thin scrollbar-thumb-mw-gray-300 dark:scrollbar-thumb-mw-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-mw-gray-400 dark:hover:scrollbar-thumb-mw-gray-500': type === 'hover'
            }), style: {
                scrollbarWidth: type === 'hover' ? 'thin' : 'auto',
                scrollbarColor: type === 'hover' ? '#d1d5db transparent' : 'auto'
            }, children: children }) })));
});
ScrollArea.displayName = 'ScrollArea';
export const ScrollBar = forwardRef((_a, ref) => {
    var { className, orientation = 'vertical' } = _a, props = __rest(_a, ["className", "orientation"]);
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('flex touch-none select-none transition-colors', orientation === 'vertical' &&
            'h-full w-2.5 border-l border-l-transparent p-[1px]', orientation === 'horizontal' &&
            'h-2.5 w-full border-t border-t-transparent p-[1px]', className) }, props, { children: _jsx("div", { className: clsx('relative flex-1 rounded-full bg-mw-gray-200 dark:bg-mw-gray-700', orientation === 'vertical' && 'w-full', orientation === 'horizontal' && 'h-full') }) })));
});
ScrollBar.displayName = 'ScrollBar';
//# sourceMappingURL=ScrollArea.js.map
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import { clsx } from 'clsx';
const TabsContext = React.createContext(null);
export function Tabs({ defaultValue = '', value, onValueChange, children, className }) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value !== null && value !== void 0 ? value : internalValue;
    const handleValueChange = onValueChange !== null && onValueChange !== void 0 ? onValueChange : setInternalValue;
    return (_jsx(TabsContext.Provider, { value: { value: currentValue, onValueChange: handleValueChange }, children: _jsx("div", { className: clsx('w-full', className), children: children }) }));
}
export function TabsList({ children, className }) {
    return (_jsx("div", { className: clsx('inline-flex h-10 items-center justify-center rounded-md bg-mw-gray-100 dark:bg-mw-gray-800 p-1', className), children: children }));
}
export function TabsTrigger({ value, children, className, disabled }) {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error('TabsTrigger must be used within Tabs');
    }
    const isActive = context.value === value;
    return (_jsx("button", { type: "button", disabled: disabled, onClick: () => !disabled && context.onValueChange(value), className: clsx('inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-blue-500 focus-visible:ring-offset-2', 'disabled:pointer-events-none disabled:opacity-50', isActive
            ? 'bg-white text-mw-gray-900 shadow-sm dark:bg-mw-gray-900 dark:text-mw-gray-50'
            : 'text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-900 dark:hover:text-mw-gray-50', className), children: children }));
}
export function TabsContent({ value, children, className }) {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error('TabsContent must be used within Tabs');
    }
    if (context.value !== value) {
        return null;
    }
    return (_jsx("div", { className: clsx('mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-blue-500 focus-visible:ring-offset-2', className), children: children }));
}
//# sourceMappingURL=Tabs.js.map
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const FormContext = createContext({});
const formLayouts = {
    vertical: 'space-y-6',
    horizontal: 'space-y-6',
    inline: 'flex flex-wrap items-end gap-4'
};
const formSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
};
export function Form({ children, onSubmit, className, disabled = false, size = 'md', layout = 'vertical' }) {
    const handleSubmit = (event) => {
        if (onSubmit) {
            event.preventDefault();
            onSubmit(event);
        }
    };
    return (_jsx(FormContext.Provider, { value: { disabled, size }, children: _jsx("form", { onSubmit: handleSubmit, className: cn(formLayouts[layout], formSizes[size], className), children: children }) }));
}
export function FormSection({ children, title, description, className }) {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [(title || description) && (_jsxs("div", { className: "space-y-1", children: [title && (_jsx("h3", { className: "text-lg font-medium text-mw-gray-900 dark:text-white", children: title })), description && (_jsx("p", { className: "text-sm text-mw-gray-600 dark:text-mw-gray-300", children: description }))] })), _jsx("div", { className: "space-y-4", children: children })] }));
}
export function FormGroup({ children, className, required = false }) {
    return (_jsx("div", { className: cn('space-y-2', className), "data-required": required, children: children }));
}
export function FormField({ children, className }) {
    return (_jsx("div", { className: cn('space-y-2', className), children: children }));
}
export function FormLabel({ children, htmlFor, required = false, className }) {
    return (_jsxs("label", { htmlFor: htmlFor, className: cn('block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300', className), children: [children, required && (_jsx("span", { className: "text-red-500 ml-1", "aria-label": "required", children: "*" }))] }));
}
export function FormControl({ children, className }) {
    return (_jsx("div", { className: cn('relative', className), children: children }));
}
export function FormDescription({ children, className }) {
    return (_jsx("p", { className: cn('text-xs text-mw-gray-500 dark:text-mw-gray-400', className), children: children }));
}
export function FormError({ children, className }) {
    return (_jsxs("p", { className: cn('text-xs text-red-600 dark:text-red-400 flex items-center gap-1', className), children: [_jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }), children] }));
}
export function FormActions({ children, className, align = 'left' }) {
    const alignClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    };
    return (_jsx("div", { className: cn('flex items-center gap-3 pt-4', alignClasses[align], className), children: children }));
}
// Hook to access form context
export function useFormContext() {
    return useContext(FormContext);
}
export function Fieldset({ children, legend, className, disabled = false }) {
    return (_jsxs("fieldset", { disabled: disabled, className: cn('border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4 space-y-4', disabled && 'opacity-50', className), children: [legend && (_jsx("legend", { className: "px-2 text-sm font-medium text-mw-gray-900 dark:text-white", children: legend })), children] }));
}
//# sourceMappingURL=Form.js.map
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
export const Select = forwardRef((_a, ref) => {
    var { className, label, description, error, options, placeholder } = _a, props = __rest(_a, ["className", "label", "description", "error", "options", "placeholder"]);
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsx("label", { className: "block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300", children: label })), _jsxs("select", Object.assign({ ref: ref, className: clsx('block w-full rounded-md border px-3 py-2 text-sm', 'border-mw-gray-300 dark:border-mw-gray-600', 'bg-white dark:bg-mw-gray-800', 'text-mw-gray-900 dark:text-mw-gray-100', 'focus:border-mw-blue-500 focus:ring-1 focus:ring-mw-blue-500', 'disabled:opacity-50 disabled:cursor-not-allowed', error && 'border-red-500 focus:border-red-500 focus:ring-red-500', className) }, props, { children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((option) => (_jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)))] })), description && !error && (_jsx("p", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: description })), error && (_jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error }))] }));
});
Select.displayName = 'Select';
//# sourceMappingURL=Select.js.map
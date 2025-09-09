import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
export const Input = forwardRef((_a, ref) => {
    var { className, label, error, helpText } = _a, props = __rest(_a, ["className", "label", "error", "helpText"]);
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsx("label", { className: "block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300", children: label })), _jsx("input", Object.assign({ ref: ref, className: clsx('block w-full px-3 py-2 border rounded-md shadow-sm', 'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent', 'disabled:opacity-50 disabled:cursor-not-allowed', error
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500'
                    : 'border-mw-gray-300 dark:border-mw-gray-600 text-mw-gray-900 dark:text-white placeholder-mw-gray-400', 'dark:bg-mw-gray-800', className) }, props)), error && (_jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error })), helpText && !error && (_jsx("p", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: helpText }))] }));
});
Input.displayName = 'Input';
//# sourceMappingURL=Input.js.map
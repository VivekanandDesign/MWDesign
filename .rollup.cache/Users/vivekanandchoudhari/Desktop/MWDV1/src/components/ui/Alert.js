import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
const alertVariants = {
    default: {
        container: 'bg-mw-gray-50 border-mw-gray-200 text-mw-gray-800 dark:bg-mw-gray-800 dark:border-mw-gray-700 dark:text-mw-gray-200',
        icon: 'text-mw-gray-600 dark:text-mw-gray-400',
        IconComponent: Info
    },
    success: {
        container: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
        icon: 'text-green-600 dark:text-green-400',
        IconComponent: CheckCircle
    },
    warning: {
        container: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
        icon: 'text-yellow-600 dark:text-yellow-400',
        IconComponent: AlertTriangle
    },
    error: {
        container: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
        icon: 'text-red-600 dark:text-red-400',
        IconComponent: AlertCircle
    },
    info: {
        container: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
        icon: 'text-blue-600 dark:text-blue-400',
        IconComponent: Info
    }
};
export const Alert = forwardRef((_a, ref) => {
    var { className, variant = 'default', title, dismissible, onDismiss, children } = _a, props = __rest(_a, ["className", "variant", "title", "dismissible", "onDismiss", "children"]);
    const config = alertVariants[variant];
    const IconComponent = config.IconComponent;
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('relative rounded-lg border p-4', config.container, className) }, props, { children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(IconComponent, { className: clsx('h-5 w-5', config.icon) }) }), _jsxs("div", { className: "ml-3 flex-1", children: [title && (_jsx("h3", { className: "text-sm font-medium mb-1", children: title })), _jsx("div", { className: "text-sm", children: children })] }), dismissible && onDismiss && (_jsx("div", { className: "ml-auto pl-3", children: _jsx("div", { className: "-mx-1.5 -my-1.5", children: _jsxs("button", { type: "button", onClick: onDismiss, className: clsx('inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2', config.icon, 'hover:bg-black/5 dark:hover:bg-white/10 focus:ring-current'), children: [_jsx("span", { className: "sr-only", children: "Dismiss" }), _jsx(X, { className: "h-4 w-4" })] }) }) }))] }) })));
});
Alert.displayName = 'Alert';
//# sourceMappingURL=Alert.js.map
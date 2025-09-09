import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
const spinnerSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
};
const spinnerVariants = {
    default: 'text-mw-gray-600 dark:text-mw-gray-400',
    primary: 'text-mw-blue-600 dark:text-mw-blue-400',
    white: 'text-white'
};
export function Spinner(_a) {
    var { className, size = 'md', variant = 'default' } = _a, props = __rest(_a, ["className", "size", "variant"]);
    return (_jsx("div", Object.assign({ className: clsx('inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]', spinnerSizes[size], spinnerVariants[variant], className), role: "status" }, props, { children: _jsx("span", { className: "sr-only", children: "Loading..." }) })));
}
export function Loading(_a) {
    var { className, size = 'md', variant = 'default', text = 'Loading...', overlay = false } = _a, props = __rest(_a, ["className", "size", "variant", "text", "overlay"]);
    const content = (_jsxs("div", { className: clsx('flex flex-col items-center justify-center space-y-2', overlay && 'bg-white/80 dark:bg-mw-gray-900/80 backdrop-blur-sm'), children: [_jsx(Spinner, { size: size, variant: variant }), text && (_jsx("p", { className: clsx('text-sm font-medium', spinnerVariants[variant]), children: text }))] }));
    if (overlay) {
        return (_jsx("div", Object.assign({ className: clsx('absolute inset-0 z-50 flex items-center justify-center', className) }, props, { children: content })));
    }
    return (_jsx("div", Object.assign({ className: clsx('flex items-center justify-center p-4', className) }, props, { children: content })));
}
//# sourceMappingURL=Spinner.js.map
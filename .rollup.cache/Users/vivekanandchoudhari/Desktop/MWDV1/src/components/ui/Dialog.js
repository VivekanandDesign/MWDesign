'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext, isValidElement, cloneElement } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
const DialogContext = createContext(null);
export function Dialog({ open = false, onOpenChange, children }) {
    return (_jsx(DialogContext.Provider, { value: { open, onOpenChange: onOpenChange || (() => { }) }, children: children }));
}
export function DialogTrigger(_a) {
    var { children, asChild, onClick } = _a, props = __rest(_a, ["children", "asChild", "onClick"]);
    const context = useContext(DialogContext);
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        context === null || context === void 0 ? void 0 : context.onOpenChange(true);
    };
    if (asChild && isValidElement(children)) {
        return cloneElement(children, Object.assign(Object.assign({}, props), { onClick: handleClick }));
    }
    return (_jsx("button", Object.assign({ onClick: handleClick }, props, { children: children })));
}
export function DialogContent(_a) {
    var { children, className, showCloseButton = true } = _a, props = __rest(_a, ["children", "className", "showCloseButton"]);
    const context = useContext(DialogContext);
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                context === null || context === void 0 ? void 0 : context.onOpenChange(false);
            }
        };
        if (context === null || context === void 0 ? void 0 : context.open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [context === null || context === void 0 ? void 0 : context.open]);
    if (!(context === null || context === void 0 ? void 0 : context.open))
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm", onClick: () => context.onOpenChange(false) }), _jsxs("div", Object.assign({ className: clsx('relative z-50 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto', 'bg-white dark:bg-mw-gray-800 rounded-lg shadow-lg border border-mw-gray-200 dark:border-mw-gray-700', 'animate-in fade-in-0 zoom-in-95 duration-200', className) }, props, { children: [showCloseButton && (_jsx("button", { onClick: () => context.onOpenChange(false), className: "absolute top-4 right-4 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity", children: _jsx(X, { className: "w-4 h-4" }) })), children] }))] }));
}
export function DialogHeader(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("div", Object.assign({ className: clsx('flex flex-col space-y-1.5 p-6 pb-2', className) }, props, { children: children })));
}
export function DialogFooter(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("div", Object.assign({ className: clsx('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-2', className) }, props, { children: children })));
}
export function DialogTitle(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("h2", Object.assign({ className: clsx('text-lg font-semibold text-mw-gray-900 dark:text-white', className) }, props, { children: children })));
}
export function DialogDescription(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("p", Object.assign({ className: clsx('text-sm text-mw-gray-600 dark:text-mw-gray-300', className) }, props, { children: children })));
}
// Utility hook for controlled dialogs
export function useDialog() {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
        onOpenChange: setOpen,
        close: () => setOpen(false),
        toggle: () => setOpen(prev => !prev)
    };
}
//# sourceMappingURL=Dialog.js.map
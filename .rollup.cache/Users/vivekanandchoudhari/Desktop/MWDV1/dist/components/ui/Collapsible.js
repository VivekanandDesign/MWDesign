'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, createContext, useContext } from 'react';
import { clsx } from 'clsx';
const CollapsibleContext = createContext(null);
export function Collapsible({ open = false, onOpenChange, disabled = false, children }) {
    return (_jsx(CollapsibleContext.Provider, { value: {
            open,
            onOpenChange: onOpenChange || (() => { }),
            disabled
        }, children: children }));
}
export function CollapsibleTrigger(_a) {
    var { asChild, children, onClick, className } = _a, props = __rest(_a, ["asChild", "children", "onClick", "className"]);
    const context = useContext(CollapsibleContext);
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (!(context === null || context === void 0 ? void 0 : context.disabled)) {
            context === null || context === void 0 ? void 0 : context.onOpenChange(!context.open);
        }
    };
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, Object.assign({ onClick: handleClick, disabled: context === null || context === void 0 ? void 0 : context.disabled, 'aria-expanded': context === null || context === void 0 ? void 0 : context.open, 'data-state': (context === null || context === void 0 ? void 0 : context.open) ? 'open' : 'closed' }, props));
    }
    return (_jsx("button", Object.assign({ onClick: handleClick, disabled: context === null || context === void 0 ? void 0 : context.disabled, "aria-expanded": context === null || context === void 0 ? void 0 : context.open, "data-state": (context === null || context === void 0 ? void 0 : context.open) ? 'open' : 'closed', className: clsx('flex items-center justify-between w-full text-left', 'disabled:opacity-50 disabled:cursor-not-allowed', className) }, props, { children: children })));
}
export function CollapsibleContent(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    const context = useContext(CollapsibleContext);
    return (_jsx("div", Object.assign({ "data-state": (context === null || context === void 0 ? void 0 : context.open) ? 'open' : 'closed', className: clsx('overflow-hidden transition-all duration-300 ease-in-out', (context === null || context === void 0 ? void 0 : context.open)
            ? 'animate-in slide-in-from-top-1 fade-in-0'
            : 'animate-out slide-out-to-top-1 fade-out-0 hidden', className) }, props, { children: (context === null || context === void 0 ? void 0 : context.open) && (_jsx("div", { className: "pt-1", children: children })) })));
}
// Utility hook for controlled collapsibles
export function useCollapsible() {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
        onOpenChange: setOpen,
        toggle: () => setOpen(prev => !prev)
    };
}
//# sourceMappingURL=Collapsible.js.map
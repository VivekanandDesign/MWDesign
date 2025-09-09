'use client';
import { __rest } from "tslib";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
const SheetContext = createContext(null);
const sheetSides = {
    top: {
        container: 'inset-x-0 top-0',
        content: 'h-auto max-h-[80vh] w-full',
        animation: 'slide-in-from-top-full'
    },
    right: {
        container: 'inset-y-0 right-0',
        content: 'h-full w-3/4 sm:max-w-sm',
        animation: 'slide-in-from-right-full'
    },
    bottom: {
        container: 'inset-x-0 bottom-0',
        content: 'h-auto max-h-[80vh] w-full',
        animation: 'slide-in-from-bottom-full'
    },
    left: {
        container: 'inset-y-0 left-0',
        content: 'h-full w-3/4 sm:max-w-sm',
        animation: 'slide-in-from-left-full'
    }
};
const sheetSizes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'w-full'
};
export function Sheet({ open = false, onOpenChange, children }) {
    return (<SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => { }) }}>
      {children}
    </SheetContext.Provider>);
}
export function SheetTrigger(_a) {
    var { asChild, children, onClick } = _a, props = __rest(_a, ["asChild", "children", "onClick"]);
    const context = useContext(SheetContext);
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        context === null || context === void 0 ? void 0 : context.onOpenChange(true);
    };
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, Object.assign(Object.assign({}, props), { onClick: handleClick }));
    }
    return (<button onClick={handleClick} {...props}>
      {children}
    </button>);
}
export function SheetContent(_a) {
    var { side = 'right', size = 'md', className, children } = _a, props = __rest(_a, ["side", "size", "className", "children"]);
    const context = useContext(SheetContext);
    const sideConfig = sheetSides[side];
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
    return (<div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => context.onOpenChange(false)}/>
      
      {/* Sheet */}
      <div className={clsx('fixed z-50', sideConfig.container)}>
        <div className={clsx('flex flex-col bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-800 shadow-lg', sideConfig.content, side === 'right' && sheetSizes[size], side === 'left' && sheetSizes[size], side === 'top' && 'rounded-b-lg', side === 'bottom' && 'rounded-t-lg', side === 'left' && 'rounded-r-lg', side === 'right' && 'rounded-l-lg', `animate-in ${sideConfig.animation} duration-300`, className)} {...props}>
          {/* Close button */}
          <button onClick={() => context.onOpenChange(false)} className="absolute top-4 right-4 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity z-10">
            <X className="w-4 h-4"/>
          </button>
          
          {children}
        </div>
      </div>
    </div>);
}
export function SheetHeader(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<div className={clsx('flex flex-col space-y-2 p-6 pb-4', className)} {...props}>
      {children}
    </div>);
}
export function SheetFooter(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<div className={clsx('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4 mt-auto', className)} {...props}>
      {children}
    </div>);
}
export function SheetTitle(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<h2 className={clsx('text-lg font-semibold text-mw-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h2>);
}
export function SheetDescription(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<p className={clsx('text-sm text-mw-gray-600 dark:text-mw-gray-300', className)} {...props}>
      {children}
    </p>);
}
// Utility hook for controlled sheets
export function useSheet() {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
        onOpenChange: setOpen,
        close: () => setOpen(false),
        toggle: () => setOpen(prev => !prev)
    };
}
//# sourceMappingURL=Sheet.jsx.map
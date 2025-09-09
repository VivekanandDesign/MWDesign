'use client';
import { __rest } from "tslib";
import React, { useState, useEffect, createContext, useContext, isValidElement, cloneElement } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
const DialogContext = createContext(null);
export function Dialog({ open = false, onOpenChange, children }) {
    return (<DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => { }) }}>
      {children}
    </DialogContext.Provider>);
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
    return (<button onClick={handleClick} {...props}>
      {children}
    </button>);
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
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => context.onOpenChange(false)}/>
      
      {/* Content */}
      <div className={clsx('relative z-50 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto', 'bg-white dark:bg-mw-gray-800 rounded-lg shadow-lg border border-mw-gray-200 dark:border-mw-gray-700', 'animate-in fade-in-0 zoom-in-95 duration-200', className)} {...props}>
        {showCloseButton && (<button onClick={() => context.onOpenChange(false)} className="absolute top-4 right-4 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
            <X className="w-4 h-4"/>
          </button>)}
        {children}
      </div>
    </div>);
}
export function DialogHeader(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<div className={clsx('flex flex-col space-y-1.5 p-6 pb-2', className)} {...props}>
      {children}
    </div>);
}
export function DialogFooter(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<div className={clsx('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-2', className)} {...props}>
      {children}
    </div>);
}
export function DialogTitle(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<h2 className={clsx('text-lg font-semibold text-mw-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h2>);
}
export function DialogDescription(_a) {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<p className={clsx('text-sm text-mw-gray-600 dark:text-mw-gray-300', className)} {...props}>
      {children}
    </p>);
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
//# sourceMappingURL=Dialog.jsx.map
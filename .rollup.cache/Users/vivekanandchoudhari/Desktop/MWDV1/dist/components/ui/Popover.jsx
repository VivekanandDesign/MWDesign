'use client';
import { __rest } from "tslib";
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { clsx } from 'clsx';
const PopoverContext = createContext(null);
export function Popover({ open = false, onOpenChange, children }) {
    const triggerRef = useRef(null);
    return (<PopoverContext.Provider value={{
            open,
            onOpenChange: onOpenChange || (() => { }),
            triggerRef
        }}>
      {children}
    </PopoverContext.Provider>);
}
export function PopoverTrigger(_a) {
    var { asChild, children, onClick } = _a, props = __rest(_a, ["asChild", "children", "onClick"]);
    const context = useContext(PopoverContext);
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        context === null || context === void 0 ? void 0 : context.onOpenChange(!context.open);
    };
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, Object.assign({ ref: context === null || context === void 0 ? void 0 : context.triggerRef, onClick: handleClick }, props));
    }
    return (<button ref={context === null || context === void 0 ? void 0 : context.triggerRef} onClick={handleClick} {...props}>
      {children}
    </button>);
}
export function PopoverContent(_a) {
    var { side = 'bottom', align = 'center', sideOffset = 4, alignOffset = 0, className, children } = _a, props = __rest(_a, ["side", "align", "sideOffset", "alignOffset", "className", "children"]);
    const context = useContext(PopoverContext);
    const contentRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    useEffect(() => {
        if (!(context === null || context === void 0 ? void 0 : context.open) || !context.triggerRef.current || !contentRef.current)
            return;
        const updatePosition = () => {
            const trigger = context.triggerRef.current;
            const content = contentRef.current;
            if (!trigger || !content)
                return;
            const triggerRect = trigger.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            let top = 0;
            let left = 0;
            // Calculate position based on side
            switch (side) {
                case 'top':
                    top = triggerRect.top - contentRect.height - sideOffset;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + sideOffset;
                    break;
                case 'left':
                    left = triggerRect.left - contentRect.width - sideOffset;
                    break;
                case 'right':
                    left = triggerRect.right + sideOffset;
                    break;
            }
            // Calculate alignment
            if (side === 'top' || side === 'bottom') {
                switch (align) {
                    case 'start':
                        left = triggerRect.left + alignOffset;
                        break;
                    case 'center':
                        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 + alignOffset;
                        break;
                    case 'end':
                        left = triggerRect.right - contentRect.width + alignOffset;
                        break;
                }
            }
            else {
                switch (align) {
                    case 'start':
                        top = triggerRect.top + alignOffset;
                        break;
                    case 'center':
                        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2 + alignOffset;
                        break;
                    case 'end':
                        top = triggerRect.bottom - contentRect.height + alignOffset;
                        break;
                }
            }
            // Ensure content stays within viewport
            left = Math.max(8, Math.min(left, viewportWidth - contentRect.width - 8));
            top = Math.max(8, Math.min(top, viewportHeight - contentRect.height - 8));
            setPosition({ top, left });
        };
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [context === null || context === void 0 ? void 0 : context.open, side, align, sideOffset, alignOffset]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((context === null || context === void 0 ? void 0 : context.open) &&
                contentRef.current &&
                !contentRef.current.contains(e.target) &&
                context.triggerRef.current &&
                !context.triggerRef.current.contains(e.target)) {
                context.onOpenChange(false);
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape' && (context === null || context === void 0 ? void 0 : context.open)) {
                context.onOpenChange(false);
            }
        };
        if (context === null || context === void 0 ? void 0 : context.open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [context === null || context === void 0 ? void 0 : context.open]);
    if (!(context === null || context === void 0 ? void 0 : context.open))
        return null;
    return (<div ref={contentRef} className={clsx('fixed z-50 min-w-[8rem] rounded-md border border-mw-gray-200 dark:border-mw-gray-700', 'bg-white dark:bg-mw-gray-800 p-4 shadow-md outline-none', 'animate-in fade-in-0 zoom-in-95 duration-200', className)} style={{
            top: position.top,
            left: position.left,
        }} {...props}>
      {children}
    </div>);
}
// Utility hook for controlled popovers
export function usePopover() {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
        onOpenChange: setOpen,
        close: () => setOpen(false),
        toggle: () => setOpen(prev => !prev)
    };
}
//# sourceMappingURL=Popover.jsx.map
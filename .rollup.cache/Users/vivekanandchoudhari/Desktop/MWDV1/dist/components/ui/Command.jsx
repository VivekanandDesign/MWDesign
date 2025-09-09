'use client';
import { __rest } from "tslib";
import { useState, useEffect, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Search } from 'lucide-react';
export const Command = forwardRef((_a, ref) => {
    var { className, value, onValueChange, placeholder = 'Search...', disabled, children } = _a, props = __rest(_a, ["className", "value", "onValueChange", "placeholder", "disabled", "children"]);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(value || '');
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(open => !open);
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);
    const handleValueChange = (newValue) => {
        setSearchValue(newValue);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue);
    };
    return (<div ref={ref} className={clsx('flex flex-col overflow-hidden rounded-md border border-mw-gray-200 dark:border-mw-gray-700 bg-white dark:bg-mw-gray-800', className)} {...props}>
        <div className="flex items-center border-b border-mw-gray-200 dark:border-mw-gray-700 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 text-mw-gray-500 dark:text-mw-gray-400"/>
          <input className={clsx('flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-mw-gray-500 dark:placeholder:text-mw-gray-400', 'disabled:cursor-not-allowed disabled:opacity-50')} placeholder={placeholder} disabled={disabled} value={searchValue} onChange={(e) => handleValueChange(e.target.value)}/>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-100 dark:bg-mw-gray-700 px-1.5 font-mono text-[10px] font-medium text-mw-gray-600 dark:text-mw-gray-300 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>);
});
Command.displayName = 'Command';
export const CommandGroup = forwardRef((_a, ref) => {
    var { className, heading, children } = _a, props = __rest(_a, ["className", "heading", "children"]);
    return (<div ref={ref} className={clsx('overflow-hidden p-1', className)} {...props}>
        {heading && (<div className="px-2 py-1.5 text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400">
            {heading}
          </div>)}
        <div>{children}</div>
      </div>);
});
CommandGroup.displayName = 'CommandGroup';
export const CommandItem = forwardRef((_a, ref) => {
    var { className, value, onSelect, disabled, children } = _a, props = __rest(_a, ["className", "value", "onSelect", "disabled", "children"]);
    return (<div ref={ref} className={clsx('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none', 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700', 'data-[selected]:bg-mw-gray-100 dark:data-[selected]:bg-mw-gray-700', disabled && 'pointer-events-none opacity-50', className)} onClick={() => !disabled && (onSelect === null || onSelect === void 0 ? void 0 : onSelect(value || ''))} {...props}>
        {children}
      </div>);
});
CommandItem.displayName = 'CommandItem';
export const CommandSeparator = forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div ref={ref} className={clsx('-mx-1 h-px bg-mw-gray-200 dark:bg-mw-gray-700', className)} {...props}/>);
});
CommandSeparator.displayName = 'CommandSeparator';
//# sourceMappingURL=Command.jsx.map
'use client';
import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { clsx } from 'clsx';
export function Menu({ children, className }) {
    return (<div className={clsx('min-w-[220px] overflow-hidden rounded-md border border-mw-gray-200 bg-white p-1 shadow-md dark:border-mw-gray-700 dark:bg-mw-gray-800', className)} role="menu">
      {children}
    </div>);
}
export function MenuItem({ children, onClick, disabled = false, selected = false, destructive = false, icon, shortcut, hasSubmenu = false, className }) {
    return (<div className={clsx('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-200', disabled ? 'pointer-events-none opacity-50' :
            destructive ? 'text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20' :
                'text-mw-gray-900 hover:bg-mw-gray-100 dark:text-mw-gray-100 dark:hover:bg-mw-gray-700', selected && 'bg-mw-blue-100 text-mw-blue-900 dark:bg-mw-blue-900/30 dark:text-mw-blue-300', className)} role="menuitem" onClick={!disabled ? onClick : undefined}>
      {icon && (<span className="mr-2 h-4 w-4 flex items-center justify-center">
          {icon}
        </span>)}
      <span className="flex-1">{children}</span>
      {shortcut && (<span className="ml-auto text-xs tracking-widest text-mw-gray-500 dark:text-mw-gray-400">
          {shortcut}
        </span>)}
      {hasSubmenu && (<ChevronRight className="ml-auto h-4 w-4"/>)}
    </div>);
}
export function MenuSeparator({ className }) {
    return (<div className={clsx('my-1 h-px bg-mw-gray-200 dark:bg-mw-gray-700', className)} role="separator"/>);
}
export function MenuGroup({ children, label, className }) {
    return (<div className={clsx('px-2 py-1.5', className)} role="group">
      {label && (<div className="px-2 py-1.5 text-xs font-semibold text-mw-gray-500 dark:text-mw-gray-400">
          {label}
        </div>)}
      {children}
    </div>);
}
export function MenuCheckboxItem({ children, checked = false, onCheckedChange, disabled = false, className }) {
    return (<div className={clsx('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-200', disabled ? 'pointer-events-none opacity-50' :
            'text-mw-gray-900 hover:bg-mw-gray-100 dark:text-mw-gray-100 dark:hover:bg-mw-gray-700', className)} role="menuitemcheckbox" aria-checked={checked} onClick={!disabled && onCheckedChange ? () => onCheckedChange(!checked) : undefined}>
      <span className="mr-2 h-4 w-4 flex items-center justify-center">
        {checked && <Check className="h-4 w-4"/>}
      </span>
      <span className="flex-1">{children}</span>
    </div>);
}
// Context for radio group
const MenuRadioContext = React.createContext({});
export function MenuRadioGroup({ children, value, onValueChange, className }) {
    return (<MenuRadioContext.Provider value={{ value, onValueChange }}>
      <div className={className} role="radiogroup">
        {children}
      </div>
    </MenuRadioContext.Provider>);
}
export function MenuRadioItem({ children, value, disabled = false, className }) {
    const { value: groupValue, onValueChange } = React.useContext(MenuRadioContext);
    const isSelected = groupValue === value;
    return (<div className={clsx('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-200', disabled ? 'pointer-events-none opacity-50' :
            'text-mw-gray-900 hover:bg-mw-gray-100 dark:text-mw-gray-100 dark:hover:bg-mw-gray-700', isSelected && 'bg-mw-blue-100 text-mw-blue-900 dark:bg-mw-blue-900/30 dark:text-mw-blue-300', className)} role="menuitemradio" aria-checked={isSelected} onClick={!disabled && onValueChange ? () => onValueChange(value) : undefined}>
      <span className="mr-2 h-4 w-4 flex items-center justify-center">
        {isSelected && (<div className="h-2 w-2 rounded-full bg-current"/>)}
      </span>
      <span className="flex-1">{children}</span>
    </div>);
}
//# sourceMappingURL=Menu.jsx.map
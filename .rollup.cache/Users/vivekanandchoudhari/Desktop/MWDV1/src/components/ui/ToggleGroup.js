'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, createContext, useContext } from 'react';
import { clsx } from 'clsx';
const ToggleGroupContext = createContext(null);
const toggleSizes = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-9 px-3 text-sm',
    lg: 'h-10 px-4 text-base'
};
const toggleVariants = {
    default: {
        base: 'bg-transparent hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300',
        selected: 'bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white'
    },
    outline: {
        base: 'border border-mw-gray-200 dark:border-mw-gray-700 bg-transparent hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300',
        selected: 'bg-mw-gray-900 dark:bg-white text-white dark:text-mw-gray-900 border-mw-gray-900 dark:border-white'
    }
};
export function ToggleGroup(_a) {
    var { type, value, onValueChange, defaultValue, disabled = false, size = 'md', variant = 'default', className, children } = _a, props = __rest(_a, ["type", "value", "onValueChange", "defaultValue", "disabled", "size", "variant", "className", "children"]);
    const [internalValue, setInternalValue] = useState(defaultValue || (type === 'single' ? '' : []));
    const currentValue = value !== undefined ? value : internalValue;
    const handleValueChange = (newValue) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue);
    };
    return (_jsx(ToggleGroupContext.Provider, { value: {
            type,
            value: currentValue,
            onValueChange: handleValueChange,
            disabled,
            size,
            variant
        }, children: _jsx("div", Object.assign({ className: clsx('inline-flex items-center justify-center rounded-md', className), role: "group" }, props, { children: children })) }));
}
export function ToggleGroupItem(_a) {
    var { value, disabled, className, children, onClick } = _a, props = __rest(_a, ["value", "disabled", "className", "children", "onClick"]);
    const context = useContext(ToggleGroupContext);
    if (!context) {
        throw new Error('ToggleGroupItem must be used within ToggleGroup');
    }
    const isSelected = context.type === 'single'
        ? context.value === value
        : Array.isArray(context.value) && context.value.includes(value);
    const isDisabled = disabled || context.disabled;
    const handleClick = (e) => {
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
        if (isDisabled)
            return;
        if (context.type === 'single') {
            context.onValueChange(isSelected ? '' : value);
        }
        else {
            const currentValues = Array.isArray(context.value) ? context.value : [];
            const newValues = isSelected
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            context.onValueChange(newValues);
        }
    };
    const variantConfig = toggleVariants[context.variant];
    return (_jsx("button", Object.assign({ onClick: handleClick, disabled: isDisabled, "data-state": isSelected ? 'on' : 'off', className: clsx('inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors', 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mw-blue-500', 'disabled:pointer-events-none disabled:opacity-50', 'first:rounded-l-md last:rounded-r-md [&:not(:first-child):not(:last-child)]:rounded-none', toggleSizes[context.size], isSelected ? variantConfig.selected : variantConfig.base, className) }, props, { children: children })));
}
// Utility hook for controlled toggle groups
export function useToggleGroup(type) {
    const [value, setValue] = useState(type === 'single' ? '' : []);
    return {
        value,
        setValue,
        onValueChange: setValue
    };
}
//# sourceMappingURL=ToggleGroup.js.map
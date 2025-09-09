'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const autocompleteSizes = {
    sm: 'min-h-8 text-sm',
    md: 'min-h-10 text-base',
    lg: 'min-h-12 text-lg'
};
function defaultFilterOptions(options, query) {
    const lowercaseQuery = query.toLowerCase();
    return options.filter(option => {
        var _a;
        return option.label.toLowerCase().includes(lowercaseQuery) ||
            option.value.toLowerCase().includes(lowercaseQuery) ||
            ((_a = option.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(lowercaseQuery));
    });
}
function groupOptions(options) {
    return options.reduce((groups, option) => {
        const group = option.group || 'ungrouped';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(option);
        return groups;
    }, {});
}
export function Autocomplete({ options, value: controlledValue, onChange, onSearch, placeholder = 'Search or select...', multiple = false, disabled = false, loading = false, label, error, helpText, size = 'md', clearable = true, creatable = false, onCreate, maxSelections, className, noOptionsText = 'No options found', filterOptions = defaultFilterOptions }) {
    var _a;
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [internalValue, setInternalValue] = useState(multiple ? [] : '');
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const containerRef = useRef(null);
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
    const filteredOptions = query ? filterOptions(options, query) : options;
    const availableOptions = multiple
        ? filteredOptions.filter(option => !selectedValues.includes(option.value))
        : filteredOptions;
    // Handle creating new options
    const canCreate = creatable && query && !filteredOptions.some(option => option.label.toLowerCase() === query.toLowerCase() || option.value.toLowerCase() === query.toLowerCase());
    const allOptions = canCreate
        ? [{ value: query, label: `Create "${query}"`, isCreate: true }, ...availableOptions]
        : availableOptions;
    const groupedOptions = groupOptions(allOptions);
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setQuery('');
                setHighlightedIndex(-1);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleValueChange = useCallback((newValue) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    }, [controlledValue, onChange]);
    const handleSelectOption = (option) => {
        var _a;
        if ('isCreate' in option && option.isCreate) {
            onCreate === null || onCreate === void 0 ? void 0 : onCreate(option.value);
            if (multiple) {
                handleValueChange([...selectedValues, option.value]);
            }
            else {
                handleValueChange(option.value);
                setIsOpen(false);
            }
            setQuery('');
            return;
        }
        const normalOption = option;
        if (normalOption.disabled)
            return;
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            if (currentValues.includes(option.value)) {
                handleValueChange(currentValues.filter(v => v !== option.value));
            }
            else {
                if (maxSelections && currentValues.length >= maxSelections)
                    return;
                handleValueChange([...currentValues, option.value]);
            }
        }
        else {
            handleValueChange(option.value);
            setIsOpen(false);
            setQuery('');
        }
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setHighlightedIndex(-1);
    };
    const handleRemoveValue = (valueToRemove) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            handleValueChange(currentValues.filter(v => v !== valueToRemove));
        }
        else {
            handleValueChange('');
        }
    };
    const handleClear = () => {
        var _a;
        handleValueChange(multiple ? [] : '');
        setQuery('');
        setIsOpen(false);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setIsOpen(true);
        setHighlightedIndex(-1);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(newQuery);
    };
    const handleKeyDown = (e) => {
        if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
            setIsOpen(true);
            return;
        }
        if (isOpen) {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setHighlightedIndex(prev => prev < allOptions.length - 1 ? prev + 1 : prev);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex >= 0 && allOptions[highlightedIndex]) {
                        handleSelectOption(allOptions[highlightedIndex]);
                    }
                    break;
                case 'Escape':
                    setIsOpen(false);
                    setQuery('');
                    setHighlightedIndex(-1);
                    break;
                case 'Backspace':
                    if (!query && multiple && selectedValues.length > 0) {
                        handleRemoveValue(selectedValues[selectedValues.length - 1]);
                    }
                    break;
            }
        }
    };
    const getSelectedOption = (val) => {
        return options.find(option => option.value === val);
    };
    const displayValue = multiple
        ? ''
        : selectedValues.length > 0
            ? ((_a = getSelectedOption(selectedValues[0])) === null || _a === void 0 ? void 0 : _a.label) || selectedValues[0]
            : query;
    return (_jsxs("div", { className: className, children: [label && (_jsx("label", { className: "block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1", children: label })), _jsxs("div", { className: "relative", ref: containerRef, children: [_jsx("div", { className: cn('relative w-full border rounded-md bg-white dark:bg-mw-gray-800 focus-within:ring-2 focus-within:ring-mw-blue-500 focus-within:border-transparent', autocompleteSizes[size], error
                            ? 'border-red-300 dark:border-red-600'
                            : 'border-mw-gray-300 dark:border-mw-gray-600', disabled && 'opacity-50 cursor-not-allowed'), children: _jsxs("div", { className: "flex items-center flex-wrap gap-1 px-3 py-2", children: [multiple && selectedValues.map(val => {
                                    const option = getSelectedOption(val);
                                    return (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300 text-xs rounded", children: [(option === null || option === void 0 ? void 0 : option.label) || val, _jsx("button", { type: "button", onClick: () => handleRemoveValue(val), className: "text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-800 dark:hover:text-mw-blue-200", children: _jsx(X, { className: "w-3 h-3" }) })] }, val));
                                }), _jsx("input", { ref: inputRef, type: "text", value: multiple ? query : displayValue, onChange: handleInputChange, onKeyDown: handleKeyDown, onFocus: () => setIsOpen(true), placeholder: selectedValues.length > 0 ? '' : placeholder, disabled: disabled, className: "flex-1 min-w-0 bg-transparent border-none outline-none text-mw-gray-900 dark:text-white placeholder-mw-gray-500 dark:placeholder-mw-gray-400" }), _jsxs("div", { className: "flex items-center gap-1", children: [loading && (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-mw-gray-300 border-t-mw-blue-600" })), clearable && (selectedValues.length > 0 || query) && (_jsx("button", { type: "button", onClick: handleClear, className: "text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200", children: _jsx(X, { className: "w-4 h-4" }) })), _jsx("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: "text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200", children: _jsx(ChevronDown, { className: cn('w-4 h-4 transition-transform', isOpen && 'rotate-180') }) })] })] }) }), isOpen && (_jsx("div", { className: "absolute z-50 w-full mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg max-h-60 overflow-auto", children: allOptions.length === 0 ? (_jsx("div", { className: "px-3 py-2 text-sm text-mw-gray-500 dark:text-mw-gray-400", children: noOptionsText })) : (_jsx("ul", { ref: listRef, className: "py-1", children: Object.entries(groupedOptions).map(([groupName, groupOptions]) => (_jsxs(React.Fragment, { children: [groupName !== 'ungrouped' && (_jsx("li", { className: "px-3 py-1 text-xs font-semibold text-mw-gray-500 dark:text-mw-gray-400 uppercase tracking-wide", children: groupName })), groupOptions.map((option, index) => {
                                        const globalIndex = allOptions.findIndex(opt => opt.value === option.value);
                                        const isSelected = selectedValues.includes(option.value);
                                        const isHighlighted = globalIndex === highlightedIndex;
                                        const normalOption = option;
                                        const isCreate = 'isCreate' in option && option.isCreate;
                                        return (_jsxs("li", { className: cn('px-3 py-2 text-sm cursor-pointer flex items-center justify-between', isHighlighted && 'bg-mw-blue-100 dark:bg-mw-blue-900/20', normalOption.disabled && 'opacity-50 cursor-not-allowed', isCreate && 'font-medium text-mw-blue-600 dark:text-mw-blue-400'), onClick: () => !normalOption.disabled && handleSelectOption(option), children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-mw-gray-900 dark:text-white", children: option.label }), option.description && (_jsx("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: option.description }))] }), isSelected && (_jsx(Check, { className: "w-4 h-4 text-mw-blue-600 dark:text-mw-blue-400" }))] }, option.value));
                                    })] }, groupName))) })) }))] }), helpText && !error && (_jsx("p", { className: "mt-1 text-xs text-mw-gray-500 dark:text-mw-gray-400", children: helpText })), error && (_jsxs("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1", children: [_jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }), error] }))] }));
}
//# sourceMappingURL=Autocomplete.js.map
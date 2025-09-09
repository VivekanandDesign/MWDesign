'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const searchSizes = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
};
const searchVariants = {
    default: 'border-mw-gray-300 dark:border-mw-gray-600 bg-white dark:bg-mw-gray-800',
    filled: 'border-transparent bg-mw-gray-100 dark:bg-mw-gray-700',
    outlined: 'border-2 border-mw-gray-300 dark:border-mw-gray-600 bg-white dark:bg-mw-gray-800'
};
export function SearchBar({ placeholder = 'Search...', value: controlledValue, onChange, onSearch, onClear, suggestions = [], loading = false, disabled = false, size = 'md', variant = 'default', showClearButton = true, debounceMs = 300, className, autoFocus = false, maxSuggestions = 5 }) {
    const [internalValue, setInternalValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionRefs = useRef([]);
    const debounceRef = useRef();
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const filteredSuggestions = suggestions
        .filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()) &&
        suggestion.toLowerCase() !== value.toLowerCase())
        .slice(0, maxSuggestions);
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);
    const handleValueChange = useCallback((newValue) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        // Debounced search
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            onSearch === null || onSearch === void 0 ? void 0 : onSearch(newValue);
        }, debounceMs);
        // Show suggestions if there's a value
        setShowSuggestions(newValue.length > 0 && filteredSuggestions.length > 0);
        setActiveSuggestionIndex(-1);
    }, [controlledValue, onChange, onSearch, debounceMs, filteredSuggestions.length]);
    const handleInputChange = (e) => {
        handleValueChange(e.target.value);
    };
    const handleClear = () => {
        var _a;
        handleValueChange('');
        onClear === null || onClear === void 0 ? void 0 : onClear();
        setShowSuggestions(false);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(value);
        setShowSuggestions(false);
    };
    const handleSuggestionClick = (suggestion) => {
        handleValueChange(suggestion);
        setShowSuggestions(false);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(suggestion);
    };
    const handleKeyDown = (e) => {
        if (!showSuggestions)
            return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveSuggestionIndex(prev => prev < filteredSuggestions.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                if (activeSuggestionIndex >= 0) {
                    e.preventDefault();
                    handleSuggestionClick(filteredSuggestions[activeSuggestionIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
                break;
        }
    };
    useEffect(() => {
        var _a;
        if (activeSuggestionIndex >= 0 && suggestionRefs.current[activeSuggestionIndex]) {
            (_a = suggestionRefs.current[activeSuggestionIndex]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                block: 'nearest'
            });
        }
    }, [activeSuggestionIndex]);
    return (_jsxs("div", { className: cn('relative', className), children: [_jsx("form", { onSubmit: handleSubmit, className: "relative", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: loading ? (_jsx(Loader2, { className: "w-4 h-4 text-mw-gray-400 animate-spin" })) : (_jsx(Search, { className: "w-4 h-4 text-mw-gray-400" })) }), _jsx("input", { ref: inputRef, type: "text", value: value, onChange: handleInputChange, onKeyDown: handleKeyDown, onFocus: () => {
                                if (value.length > 0 && filteredSuggestions.length > 0) {
                                    setShowSuggestions(true);
                                }
                            }, onBlur: () => {
                                // Delay hiding suggestions to allow clicks
                                setTimeout(() => setShowSuggestions(false), 200);
                            }, placeholder: placeholder, disabled: disabled, className: cn('block w-full pl-10 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed', searchSizes[size], searchVariants[variant], 'text-mw-gray-900 dark:text-white placeholder-mw-gray-500 dark:placeholder-mw-gray-400') }), showClearButton && value && (_jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: _jsx("button", { type: "button", onClick: handleClear, className: "text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200", children: _jsx(X, { className: "w-4 h-4" }) }) }))] }) }), showSuggestions && filteredSuggestions.length > 0 && (_jsx("div", { className: "absolute z-50 w-full mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg max-h-60 overflow-auto", children: _jsx("ul", { className: "py-1", children: filteredSuggestions.map((suggestion, index) => (_jsx("li", { ref: el => { suggestionRefs.current[index] = el; }, className: cn('px-3 py-2 text-sm cursor-pointer', index === activeSuggestionIndex
                            ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                            : 'text-mw-gray-900 dark:text-white hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'), onClick: () => handleSuggestionClick(suggestion), children: _jsxs("div", { className: "flex items-center", children: [_jsx(Search, { className: "w-3 h-3 mr-2 text-mw-gray-400" }), suggestion] }) }, suggestion))) }) }))] }));
}
export function SearchResults({ results, loading = false, onResultClick, className }) {
    if (loading) {
        return (_jsx("div", { className: cn('flex items-center justify-center p-8', className), children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: "w-8 h-8 mx-auto mb-4 text-mw-gray-400 animate-spin" }), _jsx("p", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: "Searching..." })] }) }));
    }
    if (results.length === 0) {
        return (_jsxs("div", { className: cn('text-center p-8', className), children: [_jsx(Search, { className: "w-8 h-8 mx-auto mb-4 text-mw-gray-400" }), _jsx("p", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: "No results found" })] }));
    }
    return (_jsx("div", { className: cn('space-y-4', className), children: results.map((result) => (_jsxs("div", { className: "p-4 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800/50 cursor-pointer transition-colors", onClick: () => {
                var _a;
                (_a = result.onClick) === null || _a === void 0 ? void 0 : _a.call(result);
                onResultClick === null || onResultClick === void 0 ? void 0 : onResultClick(result);
            }, children: [result.category && (_jsx("p", { className: "text-xs text-mw-blue-600 dark:text-mw-blue-400 font-medium mb-1", children: result.category })), _jsx("h3", { className: "text-sm font-medium text-mw-gray-900 dark:text-white mb-1", children: result.title }), result.description && (_jsx("p", { className: "text-xs text-mw-gray-600 dark:text-mw-gray-300", children: result.description }))] }, result.id))) }));
}
//# sourceMappingURL=SearchBar.js.map
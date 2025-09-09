'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
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
    return (<div className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {loading ? (<Loader2 className="w-4 h-4 text-mw-gray-400 animate-spin"/>) : (<Search className="w-4 h-4 text-mw-gray-400"/>)}
          </div>
          
          <input ref={inputRef} type="text" value={value} onChange={handleInputChange} onKeyDown={handleKeyDown} onFocus={() => {
            if (value.length > 0 && filteredSuggestions.length > 0) {
                setShowSuggestions(true);
            }
        }} onBlur={() => {
            // Delay hiding suggestions to allow clicks
            setTimeout(() => setShowSuggestions(false), 200);
        }} placeholder={placeholder} disabled={disabled} className={cn('block w-full pl-10 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed', searchSizes[size], searchVariants[variant], 'text-mw-gray-900 dark:text-white placeholder-mw-gray-500 dark:placeholder-mw-gray-400')}/>
          
          {showClearButton && value && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" onClick={handleClear} className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200">
                <X className="w-4 h-4"/>
              </button>
            </div>)}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (<div className="absolute z-50 w-full mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (<li key={suggestion} ref={el => { suggestionRefs.current[index] = el; }} className={cn('px-3 py-2 text-sm cursor-pointer', index === activeSuggestionIndex
                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                    : 'text-mw-gray-900 dark:text-white hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700')} onClick={() => handleSuggestionClick(suggestion)}>
                <div className="flex items-center">
                  <Search className="w-3 h-3 mr-2 text-mw-gray-400"/>
                  {suggestion}
                </div>
              </li>))}
          </ul>
        </div>)}
    </div>);
}
export function SearchResults({ results, loading = false, onResultClick, className }) {
    if (loading) {
        return (<div className={cn('flex items-center justify-center p-8', className)}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 text-mw-gray-400 animate-spin"/>
          <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
            Searching...
          </p>
        </div>
      </div>);
    }
    if (results.length === 0) {
        return (<div className={cn('text-center p-8', className)}>
        <Search className="w-8 h-8 mx-auto mb-4 text-mw-gray-400"/>
        <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
          No results found
        </p>
      </div>);
    }
    return (<div className={cn('space-y-4', className)}>
      {results.map((result) => (<div key={result.id} className="p-4 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800/50 cursor-pointer transition-colors" onClick={() => {
                var _a;
                (_a = result.onClick) === null || _a === void 0 ? void 0 : _a.call(result);
                onResultClick === null || onResultClick === void 0 ? void 0 : onResultClick(result);
            }}>
          {result.category && (<p className="text-xs text-mw-blue-600 dark:text-mw-blue-400 font-medium mb-1">
              {result.category}
            </p>)}
          <h3 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-1">
            {result.title}
          </h3>
          {result.description && (<p className="text-xs text-mw-gray-600 dark:text-mw-gray-300">
              {result.description}
            </p>)}
        </div>))}
    </div>);
}
//# sourceMappingURL=SearchBar.jsx.map
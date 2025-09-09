import React from 'react';
interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    suggestions?: string[];
    loading?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled' | 'outlined';
    showClearButton?: boolean;
    debounceMs?: number;
    className?: string;
    autoFocus?: boolean;
    maxSuggestions?: number;
}
interface SearchResultsProps {
    results: Array<{
        id: string;
        title: string;
        description?: string;
        category?: string;
        url?: string;
        onClick?: () => void;
    }>;
    loading?: boolean;
    onResultClick?: (result: any) => void;
    className?: string;
}
export declare function SearchBar({ placeholder, value: controlledValue, onChange, onSearch, onClear, suggestions, loading, disabled, size, variant, showClearButton, debounceMs, className, autoFocus, maxSuggestions }: SearchBarProps): React.JSX.Element;
export declare function SearchResults({ results, loading, onResultClick, className }: SearchResultsProps): React.JSX.Element;
export {};

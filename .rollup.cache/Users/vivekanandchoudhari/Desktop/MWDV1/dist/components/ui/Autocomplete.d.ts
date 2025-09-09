import React from 'react';
interface AutocompleteOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    group?: string;
}
interface AutocompleteProps {
    options: AutocompleteOption[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    onSearch?: (query: string) => void;
    placeholder?: string;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    error?: string;
    helpText?: string;
    size?: 'sm' | 'md' | 'lg';
    clearable?: boolean;
    creatable?: boolean;
    onCreate?: (value: string) => void;
    maxSelections?: number;
    className?: string;
    noOptionsText?: string;
    filterOptions?: (options: AutocompleteOption[], query: string) => AutocompleteOption[];
}
export declare function Autocomplete({ options, value: controlledValue, onChange, onSearch, placeholder, multiple, disabled, loading, label, error, helpText, size, clearable, creatable, onCreate, maxSelections, className, noOptionsText, filterOptions }: AutocompleteProps): React.JSX.Element;
export {};

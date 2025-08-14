'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X, ChevronDown, Check } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface AutocompleteOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
  group?: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  onSearch?: (query: string) => void
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  loading?: boolean
  label?: string
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
  clearable?: boolean
  creatable?: boolean
  onCreate?: (value: string) => void
  maxSelections?: number
  className?: string
  noOptionsText?: string
  filterOptions?: (options: AutocompleteOption[], query: string) => AutocompleteOption[]
}

const autocompleteSizes = {
  sm: 'min-h-8 text-sm',
  md: 'min-h-10 text-base',
  lg: 'min-h-12 text-lg'
}

function defaultFilterOptions(options: AutocompleteOption[], query: string): AutocompleteOption[] {
  const lowercaseQuery = query.toLowerCase()
  return options.filter(option => 
    option.label.toLowerCase().includes(lowercaseQuery) ||
    option.value.toLowerCase().includes(lowercaseQuery) ||
    option.description?.toLowerCase().includes(lowercaseQuery)
  )
}

function groupOptions(options: AutocompleteOption[]): { [key: string]: AutocompleteOption[] } {
  return options.reduce((groups, option) => {
    const group = option.group || 'ungrouped'
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(option)
    return groups
  }, {} as { [key: string]: AutocompleteOption[] })
}

export function Autocomplete({
  options,
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search or select...',
  multiple = false,
  disabled = false,
  loading = false,
  label,
  error,
  helpText,
  size = 'md',
  clearable = true,
  creatable = false,
  onCreate,
  maxSelections,
  className,
  noOptionsText = 'No options found',
  filterOptions = defaultFilterOptions
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [internalValue, setInternalValue] = useState<string | string[]>(multiple ? [] : '')
  
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const selectedValues = Array.isArray(value) ? value : value ? [value] : []
  
  const filteredOptions = query ? filterOptions(options, query) : options
  const availableOptions = multiple 
    ? filteredOptions.filter(option => !selectedValues.includes(option.value))
    : filteredOptions

  // Handle creating new options
  const canCreate = creatable && query && !filteredOptions.some(option => 
    option.label.toLowerCase() === query.toLowerCase() || option.value.toLowerCase() === query.toLowerCase()
  )

  const allOptions = canCreate 
    ? [{ value: query, label: `Create "${query}"`, isCreate: true }, ...availableOptions]
    : availableOptions

  const groupedOptions = groupOptions(allOptions)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery('')
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleValueChange = useCallback((newValue: string | string[]) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }, [controlledValue, onChange])

  const handleSelectOption = (option: AutocompleteOption | { value: string; label: string; isCreate?: boolean }) => {
    if ('isCreate' in option && option.isCreate) {
      onCreate?.(option.value)
      if (multiple) {
        handleValueChange([...selectedValues, option.value])
      } else {
        handleValueChange(option.value)
        setIsOpen(false)
      }
      setQuery('')
      return
    }

    const normalOption = option as AutocompleteOption
    if (normalOption.disabled) return

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      if (currentValues.includes(option.value)) {
        handleValueChange(currentValues.filter(v => v !== option.value))
      } else {
        if (maxSelections && currentValues.length >= maxSelections) return
        handleValueChange([...currentValues, option.value])
      }
    } else {
      handleValueChange(option.value)
      setIsOpen(false)
      setQuery('')
    }

    inputRef.current?.focus()
    setHighlightedIndex(-1)
  }

  const handleRemoveValue = (valueToRemove: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      handleValueChange(currentValues.filter(v => v !== valueToRemove))
    } else {
      handleValueChange('')
    }
  }

  const handleClear = () => {
    handleValueChange(multiple ? [] : '')
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setIsOpen(true)
    setHighlightedIndex(-1)
    onSearch?.(newQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true)
      return
    }

    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(prev => 
            prev < allOptions.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0 && allOptions[highlightedIndex]) {
            handleSelectOption(allOptions[highlightedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setQuery('')
          setHighlightedIndex(-1)
          break
        case 'Backspace':
          if (!query && multiple && selectedValues.length > 0) {
            handleRemoveValue(selectedValues[selectedValues.length - 1])
          }
          break
      }
    }
  }

  const getSelectedOption = (val: string) => {
    return options.find(option => option.value === val)
  }

  const displayValue = multiple 
    ? '' 
    : selectedValues.length > 0 
      ? getSelectedOption(selectedValues[0])?.label || selectedValues[0]
      : query

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative" ref={containerRef}>
        <div
          className={cn(
            'relative w-full border rounded-md bg-white dark:bg-mw-gray-800 focus-within:ring-2 focus-within:ring-mw-blue-500 focus-within:border-transparent',
            autocompleteSizes[size],
            error
              ? 'border-red-300 dark:border-red-600'
              : 'border-mw-gray-300 dark:border-mw-gray-600',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className="flex items-center flex-wrap gap-1 px-3 py-2">
            {/* Selected values (for multiple) */}
            {multiple && selectedValues.map(val => {
              const option = getSelectedOption(val)
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300 text-xs rounded"
                >
                  {option?.label || val}
                  <button
                    type="button"
                    onClick={() => handleRemoveValue(val)}
                    className="text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-800 dark:hover:text-mw-blue-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })}

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={multiple ? query : displayValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              placeholder={selectedValues.length > 0 ? '' : placeholder}
              disabled={disabled}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-mw-gray-900 dark:text-white placeholder-mw-gray-500 dark:placeholder-mw-gray-400"
            />

            {/* Actions */}
            <div className="flex items-center gap-1">
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-mw-gray-300 border-t-mw-blue-600" />
              )}
              
              {clearable && (selectedValues.length > 0 || query) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200"
              >
                <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
            {allOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-mw-gray-500 dark:text-mw-gray-400">
                {noOptionsText}
              </div>
            ) : (
              <ul ref={listRef} className="py-1">
                {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                  <React.Fragment key={groupName}>
                    {groupName !== 'ungrouped' && (
                      <li className="px-3 py-1 text-xs font-semibold text-mw-gray-500 dark:text-mw-gray-400 uppercase tracking-wide">
                        {groupName}
                      </li>
                    )}
                    {groupOptions.map((option, index) => {
                      const globalIndex = allOptions.findIndex(opt => opt.value === option.value)
                      const isSelected = selectedValues.includes(option.value)
                      const isHighlighted = globalIndex === highlightedIndex
                      const normalOption = option as AutocompleteOption
                      const isCreate = 'isCreate' in option && option.isCreate

                      return (
                        <li
                          key={option.value}
                          className={cn(
                            'px-3 py-2 text-sm cursor-pointer flex items-center justify-between',
                            isHighlighted && 'bg-mw-blue-100 dark:bg-mw-blue-900/20',
                            normalOption.disabled && 'opacity-50 cursor-not-allowed',
                            (isCreate as boolean) && 'font-medium text-mw-blue-600 dark:text-mw-blue-400'
                          )}
                          onClick={() => !normalOption.disabled && handleSelectOption(option)}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-mw-gray-900 dark:text-white">
                              {option.label}
                            </div>
                            {option.description && (
                              <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                                {option.description}
                              </div>
                            )}
                          </div>
                          
                          {isSelected && (
                            <Check className="w-4 h-4 text-mw-blue-600 dark:text-mw-blue-400" />
                          )}
                        </li>
                      )
                    })}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {helpText && !error && (
        <p className="mt-1 text-xs text-mw-gray-500 dark:text-mw-gray-400">
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Filter as FilterIcon, X, ChevronDown, ToggleLeft, ToggleRight, Plus } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const defaultOperators = {
    text: ['equals', 'not_equals', 'contains', 'not_contains', 'starts_with', 'ends_with', 'is_empty', 'is_not_empty'],
    number: ['equals', 'not_equals', 'greater_than', 'less_than', 'greater_equal', 'less_equal', 'between', 'is_empty', 'is_not_empty'],
    select: ['equals', 'not_equals', 'in', 'not_in'],
    multiselect: ['in', 'not_in'],
    date: ['equals', 'not_equals', 'greater_than', 'less_than', 'between'],
    daterange: ['between'],
    boolean: ['equals'],
    custom: ['equals', 'not_equals']
};
const operatorLabels = {
    equals: 'equals',
    not_equals: 'does not equal',
    contains: 'contains',
    not_contains: 'does not contain',
    starts_with: 'starts with',
    ends_with: 'ends with',
    greater_than: 'greater than',
    less_than: 'less than',
    greater_equal: 'greater than or equal',
    less_equal: 'less than or equal',
    between: 'between',
    in: 'in',
    not_in: 'not in',
    is_empty: 'is empty',
    is_not_empty: 'is not empty'
};
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function FilterRuleComponent({ rule, fields, onChange, onRemove, showRemove = true }) {
    const field = fields.find(f => f.key === rule.field);
    const availableOperators = (field === null || field === void 0 ? void 0 : field.operators) || defaultOperators[rule.type] || [];
    const handleFieldChange = (fieldKey) => {
        const newField = fields.find(f => f.key === fieldKey);
        if (newField) {
            const newRule = Object.assign(Object.assign({}, rule), { field: fieldKey, type: newField.type, operator: (newField.operators || defaultOperators[newField.type])[0], value: newField.type === 'boolean' ? false : '' });
            onChange(newRule);
        }
    };
    const handleOperatorChange = (operator) => {
        onChange(Object.assign(Object.assign({}, rule), { operator, value: operator === 'is_empty' || operator === 'is_not_empty' ? null : rule.value }));
    };
    const handleValueChange = (value) => {
        onChange(Object.assign(Object.assign({}, rule), { value }));
    };
    const renderValueInput = () => {
        var _a, _b, _c, _d, _e;
        if (rule.operator === 'is_empty' || rule.operator === 'is_not_empty') {
            return null;
        }
        switch (rule.type) {
            case 'text':
                return (<input type="text" value={rule.value || ''} onChange={(e) => handleValueChange(e.target.value)} placeholder={(field === null || field === void 0 ? void 0 : field.placeholder) || 'Enter value...'} className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white placeholder-mw-gray-500 dark:placeholder-mw-gray-400 focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>);
            case 'number':
                if (rule.operator === 'between') {
                    return (<div className="flex gap-2 flex-1">
              <input type="number" value={((_a = rule.value) === null || _a === void 0 ? void 0 : _a.from) || ''} onChange={(e) => handleValueChange(Object.assign(Object.assign({}, rule.value), { from: e.target.value }))} placeholder="Min" className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>
              <input type="number" value={((_b = rule.value) === null || _b === void 0 ? void 0 : _b.to) || ''} onChange={(e) => handleValueChange(Object.assign(Object.assign({}, rule.value), { to: e.target.value }))} placeholder="Max" className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>
            </div>);
                }
                return (<input type="number" value={rule.value || ''} onChange={(e) => handleValueChange(e.target.value)} placeholder="Enter number..." className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>);
            case 'select':
            case 'multiselect':
                return (<select value={rule.value || ''} onChange={(e) => handleValueChange(e.target.value)} className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500">
            <option value="">Select option...</option>
            {(_c = field === null || field === void 0 ? void 0 : field.options) === null || _c === void 0 ? void 0 : _c.map(option => (<option key={option.value} value={option.value}>
                {option.label}
              </option>))}
          </select>);
            case 'date':
                return (<input type="date" value={rule.value || ''} onChange={(e) => handleValueChange(e.target.value)} className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>);
            case 'daterange':
                return (<div className="flex gap-2 flex-1">
            <input type="date" value={((_d = rule.value) === null || _d === void 0 ? void 0 : _d.from) || ''} onChange={(e) => handleValueChange(Object.assign(Object.assign({}, rule.value), { from: e.target.value }))} className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>
            <input type="date" value={((_e = rule.value) === null || _e === void 0 ? void 0 : _e.to) || ''} onChange={(e) => handleValueChange(Object.assign(Object.assign({}, rule.value), { to: e.target.value }))} className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>
          </div>);
            case 'boolean':
                return (<button type="button" onClick={() => handleValueChange(!rule.value)} className="flex items-center gap-2 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white hover:bg-mw-gray-50 dark:hover:bg-mw-gray-700">
            {rule.value ? (<>
                <ToggleRight className="w-4 h-4 text-mw-green-500"/>
                <span>True</span>
              </>) : (<>
                <ToggleLeft className="w-4 h-4 text-mw-gray-400"/>
                <span>False</span>
              </>)}
          </button>);
            default:
                return (<input type="text" value={rule.value || ''} onChange={(e) => handleValueChange(e.target.value)} placeholder="Enter value..." className="flex-1 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500"/>);
        }
    };
    return (<div className="flex items-center gap-2 p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg bg-mw-gray-50 dark:bg-mw-gray-800/50">
      {/* Field Selection */}
      <select value={rule.field} onChange={(e) => handleFieldChange(e.target.value)} className="px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500">
        <option value="">Select field...</option>
        {fields.map(field => (<option key={field.key} value={field.key}>
            {field.label}
          </option>))}
      </select>

      {/* Operator Selection */}
      <select value={rule.operator} onChange={(e) => handleOperatorChange(e.target.value)} className="px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mw-blue-500" disabled={!rule.field}>
        {availableOperators.map(op => (<option key={op} value={op}>
            {operatorLabels[op]}
          </option>))}
      </select>

      {/* Value Input */}
      {renderValueInput()}

      {/* Remove Button */}
      {showRemove && (<button type="button" onClick={onRemove} className="p-2 text-mw-gray-400 hover:text-mw-red-500 hover:bg-mw-red-50 dark:hover:bg-mw-red-900/20 rounded-md transition-colors" title="Remove filter">
          <X className="w-4 h-4"/>
        </button>)}
    </div>);
}
export function Filter({ fields, value = [], onChange, placeholder = 'Add filters', showCount = true, allowMultiple = true, presets, className, onApply, onClear }) {
    const [filters, setFilters] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        setFilters(value);
    }, [value]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        onChange === null || onChange === void 0 ? void 0 : onChange(newFilters);
    };
    const addFilter = () => {
        const newFilter = {
            id: generateId(),
            field: '',
            operator: 'equals',
            value: '',
            type: 'text'
        };
        const newFilters = allowMultiple ? [...filters, newFilter] : [newFilter];
        handleFiltersChange(newFilters);
    };
    const updateFilter = (index, updatedFilter) => {
        const newFilters = [...filters];
        newFilters[index] = updatedFilter;
        handleFiltersChange(newFilters);
    };
    const removeFilter = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        handleFiltersChange(newFilters);
    };
    const clearAllFilters = () => {
        handleFiltersChange([]);
        onClear === null || onClear === void 0 ? void 0 : onClear();
    };
    const applyFilters = () => {
        onApply === null || onApply === void 0 ? void 0 : onApply(filters);
        setIsOpen(false);
    };
    const activeFiltersCount = filters.filter(f => f.field && f.operator).length;
    const displayText = useMemo(() => {
        if (activeFiltersCount === 0)
            return placeholder;
        if (showCount)
            return `${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''} applied`;
        // Show first filter summary
        const firstFilter = filters.find(f => f.field && f.operator);
        if (firstFilter) {
            const field = fields.find(f => f.key === firstFilter.field);
            return `${(field === null || field === void 0 ? void 0 : field.label) || firstFilter.field} ${operatorLabels[firstFilter.operator]}${activeFiltersCount > 1 ? ` (+${activeFiltersCount - 1})` : ''}`;
        }
        return placeholder;
    }, [activeFiltersCount, filters, fields, placeholder, showCount]);
    return (<div ref={containerRef} className={cn('relative', className)}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={cn('flex items-center gap-2 px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md', 'bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white', 'hover:border-mw-gray-400 dark:hover:border-mw-gray-500', 'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent', activeFiltersCount > 0 && 'ring-2 ring-mw-blue-500 border-mw-blue-500')}>
        <FilterIcon className="w-4 h-4"/>
        <span className="flex-1 text-left truncate">{displayText}</span>
        {activeFiltersCount > 0 && (<span className="bg-mw-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {activeFiltersCount}
          </span>)}
        <ChevronDown className="w-4 h-4 text-mw-gray-400"/>
      </button>

      {isOpen && (<div className="absolute z-50 mt-1 w-96 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-mw-gray-900 dark:text-white">Filters</h3>
              {filters.length > 0 && (<button onClick={clearAllFilters} className="text-xs text-mw-gray-500 dark:text-mw-gray-400 hover:text-mw-red-500 dark:hover:text-mw-red-400">
                  Clear all
                </button>)}
            </div>

            {/* Presets */}
            {presets && presets.length > 0 && (<div className="mb-4">
                <h4 className="text-xs font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">Quick Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, index) => (<button key={index} onClick={() => handleFiltersChange(preset.filters)} className="px-2 py-1 text-xs bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600">
                      {preset.label}
                    </button>))}
                </div>
              </div>)}

            {/* Filter Rules */}
            <div className="space-y-3">
              {filters.map((filter, index) => (<FilterRuleComponent key={filter.id} rule={filter} fields={fields} onChange={(updatedFilter) => updateFilter(index, updatedFilter)} onRemove={() => removeFilter(index)} showRemove={filters.length > 1 || filters.length === 1}/>))}

              {/* Add Filter Button */}
              {(allowMultiple || filters.length === 0) && (<button onClick={addFilter} className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-mw-gray-300 dark:border-mw-gray-600 rounded-lg text-mw-gray-500 dark:text-mw-gray-400 hover:border-mw-gray-400 dark:hover:border-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300 transition-colors">
                  <Plus className="w-4 h-4"/>
                  <span className="text-sm">Add filter</span>
                </button>)}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-mw-gray-200 dark:border-mw-gray-700">
              <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                {activeFiltersCount} of {filters.length} filters configured
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="px-3 py-1 text-sm text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-900 dark:hover:text-white">
                  Cancel
                </button>
                <button onClick={applyFilters} className="px-3 py-1 text-sm bg-mw-blue-500 text-white rounded hover:bg-mw-blue-600">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>)}
    </div>);
}
export default Filter;
//# sourceMappingURL=Filter.jsx.map
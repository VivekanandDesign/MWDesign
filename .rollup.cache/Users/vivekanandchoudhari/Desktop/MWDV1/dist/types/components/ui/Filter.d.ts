type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'between' | 'in' | 'not_in' | 'is_empty' | 'is_not_empty';
type FilterType = 'text' | 'number' | 'select' | 'multiselect' | 'date' | 'daterange' | 'boolean' | 'custom';
interface FilterRule {
    id: string;
    field: string;
    operator: FilterOperator;
    value: any;
    type: FilterType;
}
interface FilterField {
    key: string;
    label: string;
    type: FilterType;
    options?: Array<{
        value: any;
        label: string;
    }>;
    operators?: FilterOperator[];
    placeholder?: string;
}
interface FilterProps {
    fields: FilterField[];
    value?: FilterRule[];
    onChange?: (filters: FilterRule[]) => void;
    placeholder?: string;
    showCount?: boolean;
    allowMultiple?: boolean;
    presets?: Array<{
        label: string;
        filters: FilterRule[];
    }>;
    className?: string;
    onApply?: (filters: FilterRule[]) => void;
    onClear?: () => void;
}
export declare function Filter({ fields, value, onChange, placeholder, showCount, allowMultiple, presets, className, onApply, onClear }: FilterProps): import("react/jsx-runtime").JSX.Element;
export default Filter;
export type { FilterRule, FilterField, FilterOperator, FilterType };
//# sourceMappingURL=Filter.d.ts.map
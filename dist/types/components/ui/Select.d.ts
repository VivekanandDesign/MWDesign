export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    description?: string;
    error?: string;
    options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
    placeholder?: string;
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Select.d.ts.map
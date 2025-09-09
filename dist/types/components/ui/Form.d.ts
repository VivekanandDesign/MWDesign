import React from 'react';
interface FormContextValue {
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}
interface FormProps {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    layout?: 'vertical' | 'horizontal' | 'inline';
}
interface FormSectionProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}
interface FormGroupProps {
    children: React.ReactNode;
    className?: string;
    required?: boolean;
}
interface FormFieldProps {
    children: React.ReactNode;
    className?: string;
}
interface FormLabelProps {
    children: React.ReactNode;
    htmlFor?: string;
    required?: boolean;
    className?: string;
}
interface FormControlProps {
    children: React.ReactNode;
    className?: string;
}
interface FormDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
interface FormErrorProps {
    children: React.ReactNode;
    className?: string;
}
interface FormActionsProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}
export declare function Form({ children, onSubmit, className, disabled, size, layout }: FormProps): import("react/jsx-runtime").JSX.Element;
export declare function FormSection({ children, title, description, className }: FormSectionProps): import("react/jsx-runtime").JSX.Element;
export declare function FormGroup({ children, className, required }: FormGroupProps): import("react/jsx-runtime").JSX.Element;
export declare function FormField({ children, className }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
export declare function FormLabel({ children, htmlFor, required, className }: FormLabelProps): import("react/jsx-runtime").JSX.Element;
export declare function FormControl({ children, className }: FormControlProps): import("react/jsx-runtime").JSX.Element;
export declare function FormDescription({ children, className }: FormDescriptionProps): import("react/jsx-runtime").JSX.Element;
export declare function FormError({ children, className }: FormErrorProps): import("react/jsx-runtime").JSX.Element;
export declare function FormActions({ children, className, align }: FormActionsProps): import("react/jsx-runtime").JSX.Element;
export declare function useFormContext(): FormContextValue;
interface FieldsetProps {
    children: React.ReactNode;
    legend?: string;
    className?: string;
    disabled?: boolean;
}
export declare function Fieldset({ children, legend, className, disabled }: FieldsetProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Form.d.ts.map
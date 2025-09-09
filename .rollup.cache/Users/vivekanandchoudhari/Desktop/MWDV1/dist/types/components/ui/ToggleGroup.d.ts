import React from 'react';
export interface ToggleGroupProps {
    type: 'single' | 'multiple';
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    defaultValue?: string | string[];
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline';
    children: React.ReactNode;
    className?: string;
}
export interface ToggleGroupItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
}
export declare function ToggleGroup({ type, value, onValueChange, defaultValue, disabled, size, variant, className, children, ...props }: ToggleGroupProps): import("react/jsx-runtime").JSX.Element;
export declare function ToggleGroupItem({ value, disabled, className, children, onClick, ...props }: ToggleGroupItemProps): import("react/jsx-runtime").JSX.Element;
export declare function useToggleGroup(type: 'single' | 'multiple'): {
    value: string | string[];
    setValue: React.Dispatch<React.SetStateAction<string | string[]>>;
    onValueChange: React.Dispatch<React.SetStateAction<string | string[]>>;
};
//# sourceMappingURL=ToggleGroup.d.ts.map
import { ReactNode } from 'react';
export interface DropdownProps {
    children: ReactNode;
    className?: string;
}
export declare const Dropdown: ({ children, className }: DropdownProps) => import("react/jsx-runtime").JSX.Element;
export interface DropdownTriggerProps {
    children: ReactNode;
    asChild?: boolean;
    className?: string;
}
export declare const DropdownTrigger: ({ children, asChild, className }: DropdownTriggerProps) => import("react/jsx-runtime").JSX.Element;
export interface DropdownContentProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'right' | 'center';
}
export declare const DropdownContent: ({ children, className, align }: DropdownContentProps) => import("react/jsx-runtime").JSX.Element | null;
export interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
export declare const DropdownItem: ({ children, onClick, disabled, className }: DropdownItemProps) => import("react/jsx-runtime").JSX.Element;
export interface DropdownSeparatorProps {
    className?: string;
}
export declare const DropdownSeparator: ({ className }: DropdownSeparatorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map
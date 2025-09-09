import React from 'react';
interface MenuProps {
    children: React.ReactNode;
    className?: string;
}
interface MenuItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    selected?: boolean;
    destructive?: boolean;
    icon?: React.ReactNode;
    shortcut?: string;
    hasSubmenu?: boolean;
    className?: string;
}
interface MenuSeparatorProps {
    className?: string;
}
interface MenuGroupProps {
    children: React.ReactNode;
    label?: string;
    className?: string;
}
interface MenuCheckboxItemProps {
    children: React.ReactNode;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
interface MenuRadioGroupProps {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}
interface MenuRadioItemProps {
    children: React.ReactNode;
    value: string;
    disabled?: boolean;
    className?: string;
}
export declare function Menu({ children, className }: MenuProps): import("react/jsx-runtime").JSX.Element;
export declare function MenuItem({ children, onClick, disabled, selected, destructive, icon, shortcut, hasSubmenu, className }: MenuItemProps): import("react/jsx-runtime").JSX.Element;
export declare function MenuSeparator({ className }: MenuSeparatorProps): import("react/jsx-runtime").JSX.Element;
export declare function MenuGroup({ children, label, className }: MenuGroupProps): import("react/jsx-runtime").JSX.Element;
export declare function MenuCheckboxItem({ children, checked, onCheckedChange, disabled, className }: MenuCheckboxItemProps): import("react/jsx-runtime").JSX.Element;
export declare function MenuRadioGroup({ children, value, onValueChange, className }: MenuRadioGroupProps): import("react/jsx-runtime").JSX.Element;
export declare function MenuRadioItem({ children, value, disabled, className }: MenuRadioItemProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Menu.d.ts.map
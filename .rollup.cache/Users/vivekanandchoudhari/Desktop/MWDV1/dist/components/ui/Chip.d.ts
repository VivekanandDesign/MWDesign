import React from 'react';
interface ChipProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onRemove?: () => void;
    disabled?: boolean;
    clickable?: boolean;
    className?: string;
    onClick?: () => void;
}
export declare function Chip({ children, variant, size, onRemove, disabled, clickable, className, onClick }: ChipProps): React.JSX.Element;
export declare const Tag: typeof Chip;
export {};

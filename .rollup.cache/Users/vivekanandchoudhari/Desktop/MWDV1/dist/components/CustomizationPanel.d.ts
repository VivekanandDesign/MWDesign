import React from 'react';
interface CustomizationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    iconName?: string;
    className?: string;
}
export declare function CustomizationPanel({ isOpen, onClose, iconName, className }: CustomizationPanelProps): React.JSX.Element | null;
export {};

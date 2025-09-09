import React from 'react';
interface IconDetailsModalProps {
    isOpen: boolean;
    iconName: string | null;
    activeTab: 'customize' | 'code';
    onClose: () => void;
    onTabChange: (tab: 'customize' | 'code') => void;
    onIconChange?: (iconName: string) => void;
}
export declare function IconDetailsModal({ isOpen, iconName, activeTab, onClose, onTabChange, onIconChange }: IconDetailsModalProps): React.ReactPortal | null;
export {};

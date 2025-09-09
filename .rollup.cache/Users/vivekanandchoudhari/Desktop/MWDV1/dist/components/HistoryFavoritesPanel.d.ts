import React from 'react';
interface HistoryFavoritesPanelProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}
export declare function HistoryFavoritesPanel({ isOpen, onClose, className }: HistoryFavoritesPanelProps): React.JSX.Element | null;
export {};

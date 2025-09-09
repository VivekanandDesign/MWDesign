import React from 'react';
interface IconRelatedSuggestionsProps {
    iconName: string;
    relatedIcons: string[];
    onIconSelect?: (iconName: string) => void;
    className?: string;
}
export declare function IconRelatedSuggestions({ iconName, relatedIcons, onIconSelect, className }: IconRelatedSuggestionsProps): React.JSX.Element;
export {};

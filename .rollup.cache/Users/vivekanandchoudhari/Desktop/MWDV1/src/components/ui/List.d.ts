import React from 'react';
interface ListProps {
    children: React.ReactNode;
    variant?: 'ordered' | 'unordered' | 'none';
    size?: 'sm' | 'md' | 'lg';
    spacing?: 'tight' | 'normal' | 'loose';
    className?: string;
}
interface ListItemProps {
    children: React.ReactNode;
    className?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
}
export declare function List({ children, variant, size, spacing, className }: ListProps): import("react/jsx-runtime").JSX.Element;
export declare function ListItem({ children, className, startContent, endContent }: ListItemProps): import("react/jsx-runtime").JSX.Element;
interface DescriptionListProps {
    items: Array<{
        term: React.ReactNode;
        description: React.ReactNode;
    }>;
    layout?: 'vertical' | 'horizontal';
    className?: string;
}
export declare function DescriptionList({ items, layout, className }: DescriptionListProps): import("react/jsx-runtime").JSX.Element;
interface NavigationListProps {
    items: Array<{
        label: React.ReactNode;
        href?: string;
        onClick?: () => void;
        active?: boolean;
        disabled?: boolean;
        icon?: React.ReactNode;
    }>;
    className?: string;
}
export declare function NavigationList({ items, className }: NavigationListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=List.d.ts.map
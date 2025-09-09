import React from 'react';
interface PageHeroProps {
    title: string;
    description: string;
    badge?: {
        text: string;
        variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
    };
    stats?: {
        label: string;
        value: string;
    }[];
    className?: string;
}
export declare function PageHero({ title, description, badge, stats, className }: PageHeroProps): React.JSX.Element;
export {};

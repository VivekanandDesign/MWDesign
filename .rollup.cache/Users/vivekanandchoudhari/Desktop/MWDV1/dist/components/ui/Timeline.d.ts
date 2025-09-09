import React from 'react';
interface TimelineItem {
    title: string;
    description?: string;
    time?: string;
    status?: 'completed' | 'current' | 'pending';
    icon?: React.ReactNode;
}
interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}
export declare function Timeline({ items, className }: TimelineProps): React.JSX.Element;
interface TimelineItemProps {
    children: React.ReactNode;
    status?: 'completed' | 'current' | 'pending';
    icon?: React.ReactNode;
    time?: string;
    isLast?: boolean;
}
export declare function TimelineItem({ children, status, icon, time, isLast }: TimelineItemProps): React.JSX.Element;
export {};

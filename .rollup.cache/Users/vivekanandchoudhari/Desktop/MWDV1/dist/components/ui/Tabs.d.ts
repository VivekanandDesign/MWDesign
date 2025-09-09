import React from 'react';
export interface TabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}
export interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}
export interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}
export interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}
export declare function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps): React.JSX.Element;
export declare function TabsList({ children, className }: TabsListProps): React.JSX.Element;
export declare function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps): React.JSX.Element;
export declare function TabsContent({ value, children, className }: TabsContentProps): React.JSX.Element | null;

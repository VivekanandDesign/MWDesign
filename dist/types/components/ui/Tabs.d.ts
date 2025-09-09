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
export declare function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps): import("react/jsx-runtime").JSX.Element;
export declare function TabsList({ children, className }: TabsListProps): import("react/jsx-runtime").JSX.Element;
export declare function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps): import("react/jsx-runtime").JSX.Element;
export declare function TabsContent({ value, children, className }: TabsContentProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Tabs.d.ts.map
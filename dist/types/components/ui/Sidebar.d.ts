import React from 'react';
interface SidebarProps {
    children: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    position?: 'left' | 'right';
    variant?: 'overlay' | 'push' | 'persistent';
    width?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
}
interface SidebarHeaderProps {
    children: React.ReactNode;
    className?: string;
}
interface SidebarContentProps {
    children: React.ReactNode;
    className?: string;
}
interface SidebarFooterProps {
    children: React.ReactNode;
    className?: string;
}
export declare function Sidebar({ children, isOpen, onOpenChange, position, variant, width, className, collapsible, collapsed, onCollapsedChange }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarHeader({ children, className }: SidebarHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarContent({ children, className }: SidebarContentProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarFooter({ children, className }: SidebarFooterProps): import("react/jsx-runtime").JSX.Element;
interface SidebarTriggerProps {
    onClick: () => void;
    className?: string;
}
export declare function SidebarTrigger({ onClick, className }: SidebarTriggerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Sidebar.d.ts.map
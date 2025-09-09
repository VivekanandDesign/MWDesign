import React from 'react';
export type PanelDirection = 'horizontal' | 'vertical';
export type PanelCollapse = 'left' | 'right' | 'top' | 'bottom' | 'none';
interface PanelGroupProps {
    direction?: PanelDirection;
    className?: string;
    children: React.ReactNode;
}
interface PanelProps {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    className?: string;
    children: React.ReactNode;
}
interface PanelResizerProps {
    direction?: PanelDirection;
    disabled?: boolean;
    className?: string;
}
interface PanelHeaderProps {
    title?: string;
    actions?: React.ReactNode;
    collapsible?: boolean;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
    className?: string;
    children?: React.ReactNode;
}
export declare function PanelGroup({ direction, className, children }: PanelGroupProps): React.JSX.Element;
export declare function Panel({ defaultSize, minSize, maxSize, collapsible, collapsed, onCollapse, className, children }: PanelProps): React.JSX.Element;
export declare function PanelResizer({ direction, disabled, className }: PanelResizerProps): React.JSX.Element;
export declare function PanelHeader({ title, actions, collapsible, collapsed, onToggleCollapse, className, children }: PanelHeaderProps): React.JSX.Element;
export declare function SplitPanel({ leftPanel, rightPanel, defaultLeftSize, minLeftSize, maxLeftSize, className }: {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    defaultLeftSize?: number;
    minLeftSize?: number;
    maxLeftSize?: number;
    className?: string;
}): React.JSX.Element;
export declare function StackPanel({ topPanel, bottomPanel, defaultTopSize, minTopSize, maxTopSize, className }: {
    topPanel: React.ReactNode;
    bottomPanel: React.ReactNode;
    defaultTopSize?: number;
    minTopSize?: number;
    maxTopSize?: number;
    className?: string;
}): React.JSX.Element;
export declare function SidebarPanel({ children, collapsed, onToggle, title, width, className }: {
    children: React.ReactNode;
    collapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
    title?: string;
    width?: number;
    className?: string;
}): React.JSX.Element;
export {};

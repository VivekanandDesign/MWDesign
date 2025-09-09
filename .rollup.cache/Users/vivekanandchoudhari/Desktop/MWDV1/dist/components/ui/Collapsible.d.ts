import React from 'react';
export interface CollapsibleProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    children: React.ReactNode;
}
export interface CollapsibleTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    children: React.ReactNode;
}
export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function Collapsible({ open, onOpenChange, disabled, children }: CollapsibleProps): React.JSX.Element;
export declare function CollapsibleTrigger({ asChild, children, onClick, className, ...props }: CollapsibleTriggerProps): React.JSX.Element;
export declare function CollapsibleContent({ children, className, ...props }: CollapsibleContentProps): React.JSX.Element;
export declare function useCollapsible(): {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
};

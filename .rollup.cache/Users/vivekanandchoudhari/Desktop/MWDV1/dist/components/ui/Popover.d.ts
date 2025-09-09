import React from 'react';
export interface PopoverProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    children: React.ReactNode;
}
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    alignOffset?: number;
    children: React.ReactNode;
}
export declare function Popover({ open, onOpenChange, children }: PopoverProps): React.JSX.Element;
export declare function PopoverTrigger({ asChild, children, onClick, ...props }: PopoverTriggerProps): React.JSX.Element;
export declare function PopoverContent({ side, align, sideOffset, alignOffset, className, children, ...props }: PopoverContentProps): React.JSX.Element | null;
export declare function usePopover(): {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
    toggle: () => void;
};

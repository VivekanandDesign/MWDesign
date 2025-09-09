import React from 'react';
export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    showCloseButton?: boolean;
}
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}
export interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    asChild?: boolean;
}
export declare function Dialog({ open, onOpenChange, children }: DialogProps): React.JSX.Element;
export declare function DialogTrigger({ children, asChild, onClick, ...props }: DialogTriggerProps): React.JSX.Element;
export declare function DialogContent({ children, className, showCloseButton, ...props }: DialogContentProps): React.JSX.Element | null;
export declare function DialogHeader({ children, className, ...props }: DialogHeaderProps): React.JSX.Element;
export declare function DialogFooter({ children, className, ...props }: DialogFooterProps): React.JSX.Element;
export declare function DialogTitle({ children, className, ...props }: DialogTitleProps): React.JSX.Element;
export declare function DialogDescription({ children, className, ...props }: DialogDescriptionProps): React.JSX.Element;
export declare function useDialog(): {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
    toggle: () => void;
};

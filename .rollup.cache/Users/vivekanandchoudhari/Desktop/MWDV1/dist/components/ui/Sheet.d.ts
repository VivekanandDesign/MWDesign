import React from 'react';
export interface SheetProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
export interface SheetTriggerProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
    children: React.ReactNode;
}
export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: 'top' | 'right' | 'bottom' | 'left';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
}
export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
export interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}
export declare function Sheet({ open, onOpenChange, children }: SheetProps): React.JSX.Element;
export declare function SheetTrigger({ asChild, children, onClick, ...props }: SheetTriggerProps): React.JSX.Element;
export declare function SheetContent({ side, size, className, children, ...props }: SheetContentProps): React.JSX.Element | null;
export declare function SheetHeader({ children, className, ...props }: SheetHeaderProps): React.JSX.Element;
export declare function SheetFooter({ children, className, ...props }: SheetFooterProps): React.JSX.Element;
export declare function SheetTitle({ children, className, ...props }: SheetTitleProps): React.JSX.Element;
export declare function SheetDescription({ children, className, ...props }: SheetDescriptionProps): React.JSX.Element;
export declare function useSheet(): {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
    toggle: () => void;
};

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    scrollHideDelay?: number;
}
export declare const ScrollArea: import("react").ForwardRefExoticComponent<ScrollAreaProps & import("react").RefAttributes<HTMLDivElement>>;
export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'vertical' | 'horizontal';
}
export declare const ScrollBar: import("react").ForwardRefExoticComponent<ScrollBarProps & import("react").RefAttributes<HTMLDivElement>>;

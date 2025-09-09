export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'default' | 'dashed' | 'dotted';
    spacing?: 'none' | 'sm' | 'md' | 'lg';
}
export declare const Separator: import("react").ForwardRefExoticComponent<SeparatorProps & import("react").RefAttributes<HTMLDivElement>>;

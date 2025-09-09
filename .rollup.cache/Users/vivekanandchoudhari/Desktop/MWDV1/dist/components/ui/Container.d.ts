import React from 'react';
interface ContainerProps {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    centered?: boolean;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}
declare const containerSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
};
export declare function Container({ children, size, padding, centered, className, as: Component }: ContainerProps): React.JSX.Element;
interface ResponsiveContainerProps extends Omit<ContainerProps, 'size'> {
    breakpoints?: {
        sm?: keyof typeof containerSizes;
        md?: keyof typeof containerSizes;
        lg?: keyof typeof containerSizes;
        xl?: keyof typeof containerSizes;
        '2xl'?: keyof typeof containerSizes;
    };
}
export declare function ResponsiveContainer({ children, breakpoints, padding, centered, className, as: Component }: ResponsiveContainerProps): React.JSX.Element;
interface GridContainerProps {
    children: React.ReactNode;
    cols?: number | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: number | {
        x?: number;
        y?: number;
    };
    className?: string;
}
export declare function GridContainer({ children, cols, gap, className }: GridContainerProps): React.JSX.Element;
interface FlexContainerProps {
    children: React.ReactNode;
    direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
    wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    gap?: number;
    className?: string;
}
export declare function FlexContainer({ children, direction, wrap, align, justify, gap, className }: FlexContainerProps): React.JSX.Element;
interface StackProps {
    children: React.ReactNode;
    spacing?: number;
    divider?: React.ReactNode;
    className?: string;
}
export declare function Stack({ children, spacing, divider, className }: StackProps): React.JSX.Element;
interface HStackProps {
    children: React.ReactNode;
    spacing?: number;
    divider?: React.ReactNode;
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    className?: string;
}
export declare function HStack({ children, spacing, divider, align, className }: HStackProps): React.JSX.Element;
export {};

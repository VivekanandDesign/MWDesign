export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}
export declare function Tooltip({ content, children, position, className }: TooltipProps): import("react").JSX.Element;

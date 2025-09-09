export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    description?: string;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'danger';
    loading?: boolean;
    showIcons?: boolean;
    onLabel?: string;
    offLabel?: string;
    thumbIcon?: React.ReactNode;
    trackIcon?: React.ReactNode;
    animate?: boolean;
    immediate?: boolean;
}
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLInputElement>>;
interface SwitchGroupProps {
    label?: string;
    description?: string;
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}
export declare function SwitchGroup({ label, description, children, orientation, className }: SwitchGroupProps): import("react").JSX.Element;
export {};

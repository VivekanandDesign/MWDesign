export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;

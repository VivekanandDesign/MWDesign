export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'white';
}
export declare function Spinner({ className, size, variant, ...props }: SpinnerProps): import("react").JSX.Element;
export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'white';
    text?: string;
    overlay?: boolean;
}
export declare function Loading({ className, size, variant, text, overlay, ...props }: LoadingProps): import("react").JSX.Element;

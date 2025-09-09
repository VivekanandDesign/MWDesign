export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function Card({ className, children, ...props }: CardProps): import("react").JSX.Element;
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function CardHeader({ className, children, ...props }: CardHeaderProps): import("react").JSX.Element;
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function CardContent({ className, children, ...props }: CardContentProps): import("react").JSX.Element;
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function CardFooter({ className, children, ...props }: CardFooterProps): import("react").JSX.Element;

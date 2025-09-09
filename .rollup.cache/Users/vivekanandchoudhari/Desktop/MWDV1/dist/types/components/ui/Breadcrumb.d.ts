import { ReactNode } from 'react';
export interface BreadcrumbProps {
    children: ReactNode;
    className?: string;
    separator?: ReactNode;
}
export declare const Breadcrumb: ({ children, className, separator }: BreadcrumbProps) => import("react/jsx-runtime").JSX.Element;
export interface BreadcrumbItemProps {
    children: ReactNode;
    href?: string;
    isLast?: boolean;
    className?: string;
}
export declare const BreadcrumbItem: ({ children, href, isLast, className }: BreadcrumbItemProps) => import("react/jsx-runtime").JSX.Element;
export interface BreadcrumbSeparatorProps {
    className?: string;
    children?: ReactNode;
}
export declare const BreadcrumbSeparator: ({ className, children }: BreadcrumbSeparatorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Breadcrumb.d.ts.map
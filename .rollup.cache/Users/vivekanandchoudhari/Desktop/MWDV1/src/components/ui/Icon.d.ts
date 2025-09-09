import { LucideIcon } from 'lucide-react';
interface IconProps {
    icon: LucideIcon;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    className?: string;
    onClick?: () => void;
}
export declare function Icon({ icon: IconComponent, size, variant, className, onClick, ...props }: IconProps): import("react/jsx-runtime").JSX.Element;
export declare function ChevronDownIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function ChevronUpIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function ChevronLeftIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function ChevronRightIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function SearchIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function CloseIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function CheckIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function PlusIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function MinusIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function InfoIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function AlertTriangleIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function AlertCircleIcon(props: Omit<IconProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Icon.d.ts.map
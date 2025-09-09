export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'outline';
    };
    size?: 'sm' | 'md' | 'lg';
}
export declare function EmptyState({ icon, title, description, action, size, className, ...props }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export declare function NoDataEmptyState(props: Omit<EmptyStateProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function NoResultsEmptyState(props: Omit<EmptyStateProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function NoFilesEmptyState(props: Omit<EmptyStateProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
export declare function NoUsersEmptyState(props: Omit<EmptyStateProps, 'icon'>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EmptyState.d.ts.map
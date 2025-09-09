import React from 'react';
export type SnackbarType = 'success' | 'error' | 'warning' | 'info';
export type SnackbarPosition = 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
export interface SnackbarOptions {
    id?: string;
    type?: SnackbarType;
    title?: string;
    message: string;
    duration?: number;
    persistent?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
    onClose?: () => void;
}
interface SnackbarState extends Required<Omit<SnackbarOptions, 'action' | 'onClose'>> {
    action?: SnackbarOptions['action'];
    onClose?: SnackbarOptions['onClose'];
    timestamp: number;
}
interface SnackbarContextValue {
    snackbars: SnackbarState[];
    show: (options: SnackbarOptions) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
interface SnackbarProviderProps {
    children: React.ReactNode;
    position?: SnackbarPosition;
    maxSnackbars?: number;
    defaultDuration?: number;
}
export declare function SnackbarProvider({ children, position, maxSnackbars, defaultDuration }: SnackbarProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useSnackbar(): SnackbarContextValue;
export declare function useSnackbarHelpers(): {
    success: (message: string, options?: Omit<SnackbarOptions, "message" | "type">) => string;
    error: (message: string, options?: Omit<SnackbarOptions, "message" | "type">) => string;
    warning: (message: string, options?: Omit<SnackbarOptions, "message" | "type">) => string;
    info: (message: string, options?: Omit<SnackbarOptions, "message" | "type">) => string;
};
export {};
//# sourceMappingURL=Snackbar.d.ts.map
export interface Toast {
    id: string;
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}
export declare function useToast(): ToastContextType;
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export {};

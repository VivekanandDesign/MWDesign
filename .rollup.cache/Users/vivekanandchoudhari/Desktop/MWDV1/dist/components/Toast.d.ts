import React from 'react';
import { CopyType } from '@/utils/svgExtractor';
interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    copyType?: CopyType;
    iconName?: string;
    duration?: number;
    onClose?: () => void;
}
export declare const Toast: React.FC<ToastProps>;
/**
 * Toast Container for managing multiple toasts
 */
interface ToastContainerProps {
    toasts: Array<ToastProps & {
        id: string;
    }>;
    onRemove: (id: string) => void;
}
export declare const ToastContainer: React.FC<ToastContainerProps>;
/**
 * Hook for managing toasts
 */
export declare const useToast: () => {
    toasts: (ToastProps & {
        id: string;
    })[];
    addToast: (toast: ToastProps) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
};
export {};

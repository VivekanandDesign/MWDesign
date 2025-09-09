import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Check, X, AlertCircle, Download, Copy, FileText, Code } from 'lucide-react';
import { CopyType } from '@/utils/svgExtractor';
export const Toast = ({ message, type = 'success', copyType, iconName, duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose === null || onClose === void 0 ? void 0 : onClose(), 300);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    const getIcon = () => {
        if (type === 'error')
            return _jsx(AlertCircle, { className: "w-4 h-4" });
        if (type === 'success' && copyType) {
            switch (copyType) {
                case CopyType.SVG: return _jsx(FileText, { className: "w-4 h-4" });
                case CopyType.JSX: return _jsx(Code, { className: "w-4 h-4" });
                case CopyType.IMPORT: return _jsx(Copy, { className: "w-4 h-4" });
                case CopyType.DOWNLOAD: return _jsx(Download, { className: "w-4 h-4" });
                default: return _jsx(Check, { className: "w-4 h-4" });
            }
        }
        return _jsx(Check, { className: "w-4 h-4" });
    };
    const getTypeStyles = () => {
        switch (type) {
            case 'error':
                return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
            case 'info':
                return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
            case 'success':
            default:
                return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
        }
    };
    const getIconStyles = () => {
        switch (type) {
            case 'error':
                return 'text-red-600 dark:text-red-400';
            case 'info':
                return 'text-blue-600 dark:text-blue-400';
            case 'success':
            default:
                return 'text-green-600 dark:text-green-400';
        }
    };
    return (_jsx("div", { className: `
      fixed top-4 right-4 z-50 min-w-72 max-w-96 border rounded-lg p-4 shadow-lg 
      transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${getTypeStyles()}
    `, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `${getIconStyles()} mt-0.5 flex-shrink-0`, children: getIcon() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-sm", children: message }), iconName && copyType && (_jsxs("div", { className: "text-xs opacity-80 mt-1", children: [copyType === CopyType.SVG && 'SVG markup copied to clipboard', copyType === CopyType.JSX && 'JSX component copied to clipboard', copyType === CopyType.IMPORT && 'Import statement copied to clipboard', copyType === CopyType.DOWNLOAD && 'SVG file downloaded'] }))] }), _jsx("button", { onClick: () => {
                        setIsVisible(false);
                        setTimeout(() => onClose === null || onClose === void 0 ? void 0 : onClose(), 300);
                    }, className: "text-current opacity-60 hover:opacity-100 transition-opacity", children: _jsx(X, { className: "w-4 h-4" }) })] }) }));
};
export const ToastContainer = ({ toasts, onRemove }) => {
    return (_jsx("div", { className: "fixed top-4 right-4 z-50 space-y-2", children: toasts.map((toast, index) => (_jsx("div", { style: {
                transform: `translateY(${index * -8}px)`,
                zIndex: 50 - index
            }, children: _jsx(Toast, Object.assign({}, toast, { onClose: () => onRemove(toast.id) })) }, toast.id))) }));
};
/**
 * Hook for managing toasts
 */
export const useToast = () => {
    const [toasts, setToasts] = useState([]);
    const addToast = (toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, Object.assign(Object.assign({}, toast), { id })]);
        return id;
    };
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    const clearToasts = () => {
        setToasts([]);
    };
    return {
        toasts,
        addToast,
        removeToast,
        clearToasts
    };
};
//# sourceMappingURL=Toast.js.map
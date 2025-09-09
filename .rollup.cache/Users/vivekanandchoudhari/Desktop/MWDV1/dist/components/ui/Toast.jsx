'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
const ToastContext = createContext(undefined);
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((toast) => {
        var _a;
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = Object.assign(Object.assign({}, toast), { id });
        setToasts(prev => [...prev, newToast]);
        // Auto remove after duration
        const duration = (_a = toast.duration) !== null && _a !== void 0 ? _a : 5000;
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);
    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);
    return (<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>);
}
function ToastContainer() {
    const { toasts } = useToast();
    return (<div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm">
      {toasts.map(toast => (<ToastComponent key={toast.id} toast={toast}/>))}
    </div>);
}
const toastVariants = {
    default: {
        container: 'bg-white dark:bg-mw-gray-800 border-mw-gray-200 dark:border-mw-gray-700',
        icon: Info,
        iconColor: 'text-mw-blue-600'
    },
    success: {
        container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        icon: CheckCircle,
        iconColor: 'text-green-600'
    },
    error: {
        container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
        icon: AlertCircle,
        iconColor: 'text-red-600'
    },
    warning: {
        container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        icon: AlertTriangle,
        iconColor: 'text-yellow-600'
    },
    info: {
        container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
        icon: Info,
        iconColor: 'text-blue-600'
    }
};
function ToastComponent({ toast }) {
    const { removeToast } = useToast();
    const variant = toastVariants[toast.variant || 'default'];
    const Icon = variant.icon;
    return (<div className={clsx('flex items-start p-4 border rounded-lg shadow-lg animate-in slide-in-from-right-full', variant.container)}>
      <Icon className={clsx('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', variant.iconColor)}/>
      
      <div className="flex-1 min-w-0">
        {toast.title && (<p className="text-sm font-semibold text-mw-gray-900 dark:text-white">
            {toast.title}
          </p>)}
        {toast.description && (<p className={clsx('text-sm text-mw-gray-600 dark:text-mw-gray-300', toast.title && 'mt-1')}>
            {toast.description}
          </p>)}
        {toast.action && (<button onClick={toast.action.onClick} className="mt-2 text-sm font-medium text-mw-blue-600 hover:text-mw-blue-700 dark:text-mw-blue-400 dark:hover:text-mw-blue-300">
            {toast.action.label}
          </button>)}
      </div>
      
      <button onClick={() => removeToast(toast.id)} className="ml-3 flex-shrink-0 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200">
        <X className="w-4 h-4"/>
      </button>
    </div>);
}
//# sourceMappingURL=Toast.jsx.map
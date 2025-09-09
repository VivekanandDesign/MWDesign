'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const SnackbarContext = createContext(null);
export function SnackbarProvider({ children, position = 'bottom-right', maxSnackbars = 5, defaultDuration = 5000 }) {
    const [snackbars, setSnackbars] = useState([]);
    const show = useCallback((options) => {
        const id = options.id || `snackbar-${Date.now()}-${Math.random()}`;
        const snackbar = {
            id,
            type: options.type || 'info',
            title: options.title || '',
            message: options.message,
            duration: options.duration !== undefined ? options.duration : defaultDuration,
            persistent: options.persistent || false,
            action: options.action,
            onClose: options.onClose,
            timestamp: Date.now()
        };
        setSnackbars(prev => {
            const newSnackbars = [snackbar, ...prev];
            // Remove oldest if exceeding max
            if (newSnackbars.length > maxSnackbars) {
                return newSnackbars.slice(0, maxSnackbars);
            }
            return newSnackbars;
        });
        return id;
    }, [defaultDuration, maxSnackbars]);
    const dismiss = useCallback((id) => {
        setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
    }, []);
    const dismissAll = useCallback(() => {
        setSnackbars([]);
    }, []);
    const contextValue = {
        snackbars,
        show,
        dismiss,
        dismissAll
    };
    return (<SnackbarContext.Provider value={contextValue}>
      {children}
      <SnackbarContainer position={position}/>
    </SnackbarContext.Provider>);
}
export function useSnackbar() {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
}
function SnackbarContainer({ position }) {
    const { snackbars } = useSnackbar();
    const getPositionClasses = () => {
        switch (position) {
            case 'top':
                return 'top-4 left-1/2 transform -translate-x-1/2';
            case 'top-right':
                return 'top-4 right-4';
            case 'top-left':
                return 'top-4 left-4';
            case 'bottom':
                return 'bottom-4 left-1/2 transform -translate-x-1/2';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            default:
                return 'bottom-4 right-4';
        }
    };
    if (typeof document === 'undefined')
        return null;
    return createPortal(<div className={cn('fixed z-50 flex flex-col space-y-2 max-w-sm', getPositionClasses())}>
      {snackbars.map((snackbar) => (<SnackbarItem key={snackbar.id} snackbar={snackbar}/>))}
    </div>, document.body);
}
function SnackbarItem({ snackbar }) {
    const { dismiss } = useSnackbar();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    useEffect(() => {
        // Show animation
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 10);
        // Auto dismiss
        let dismissTimer;
        if (!snackbar.persistent && snackbar.duration > 0) {
            dismissTimer = setTimeout(() => {
                handleDismiss();
            }, snackbar.duration);
        }
        return () => {
            clearTimeout(showTimer);
            if (dismissTimer)
                clearTimeout(dismissTimer);
        };
    }, [snackbar.duration, snackbar.persistent]);
    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            var _a;
            dismiss(snackbar.id);
            (_a = snackbar.onClose) === null || _a === void 0 ? void 0 : _a.call(snackbar);
        }, 200); // Match exit animation duration
    };
    const handleActionClick = () => {
        var _a;
        (_a = snackbar.action) === null || _a === void 0 ? void 0 : _a.onClick();
        handleDismiss();
    };
    const getIcon = () => {
        switch (snackbar.type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500"/>;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500"/>;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500"/>;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500"/>;
            default:
                return <Info className="w-5 h-5 text-blue-500"/>;
        }
    };
    const getTypeClasses = () => {
        switch (snackbar.type) {
            case 'success':
                return 'border-green-200 dark:border-green-800';
            case 'error':
                return 'border-red-200 dark:border-red-800';
            case 'warning':
                return 'border-yellow-200 dark:border-yellow-800';
            case 'info':
                return 'border-blue-200 dark:border-blue-800';
            default:
                return 'border-mw-gray-200 dark:border-mw-gray-700';
        }
    };
    return (<div className={cn('flex items-start p-4 bg-white dark:bg-mw-gray-900 border rounded-lg shadow-lg transition-all duration-200 ease-in-out transform', 'max-w-sm w-full', getTypeClasses(), isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0', isExiting && '-translate-x-full opacity-0')}>
      {/* Icon */}
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {snackbar.title && (<div className="text-sm font-medium text-mw-gray-900 dark:text-white mb-1">
            {snackbar.title}
          </div>)}
        <div className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
          {snackbar.message}
        </div>
        
        {/* Action */}
        {snackbar.action && (<div className="mt-2">
            <button onClick={handleActionClick} className="text-sm font-medium text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-700 dark:hover:text-mw-blue-300">
              {snackbar.action.label}
            </button>
          </div>)}
      </div>

      {/* Close button */}
      <button onClick={handleDismiss} className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300">
        <X className="w-4 h-4"/>
      </button>
    </div>);
}
// Convenience hooks for different types
export function useSnackbarHelpers() {
    const { show } = useSnackbar();
    return {
        success: (message, options) => show(Object.assign(Object.assign({}, options), { message, type: 'success' })),
        error: (message, options) => show(Object.assign(Object.assign({}, options), { message, type: 'error' })),
        warning: (message, options) => show(Object.assign(Object.assign({}, options), { message, type: 'warning' })),
        info: (message, options) => show(Object.assign(Object.assign({}, options), { message, type: 'info' }))
    };
}
//# sourceMappingURL=Snackbar.jsx.map
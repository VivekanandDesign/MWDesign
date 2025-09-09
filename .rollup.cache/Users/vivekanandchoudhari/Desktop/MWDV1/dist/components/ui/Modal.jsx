import { createContext, useContext, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
const ModalContext = createContext(undefined);
export const Modal = ({ isOpen, onClose, children, className, size = 'md' }) => {
    const modalRef = useRef(null);
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full m-4'
    };
    if (!isOpen)
        return null;
    return (<ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={handleBackdropClick}>
        <div ref={modalRef} className={clsx('relative w-full rounded-lg bg-white dark:bg-mw-gray-800 shadow-xl', 'max-h-[90vh] overflow-hidden', sizeClasses[size], className)} role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    </ModalContext.Provider>);
};
export const ModalHeader = ({ children, className }) => {
    const context = useContext(ModalContext);
    return (<div className={clsx('flex items-center justify-between p-6 border-b border-mw-gray-200 dark:border-mw-gray-700', className)}>
      <div className="flex-1">{children}</div>
      <button onClick={context === null || context === void 0 ? void 0 : context.onClose} className="ml-4 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200" aria-label="Close modal">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>);
};
export const ModalBody = ({ children, className }) => {
    return (<div className={clsx('p-6 overflow-y-auto', className)}>
      {children}
    </div>);
};
export const ModalFooter = ({ children, className }) => {
    return (<div className={clsx('flex items-center justify-end space-x-3 p-6 border-t border-mw-gray-200 dark:border-mw-gray-700', className)}>
      {children}
    </div>);
};
//# sourceMappingURL=Modal.jsx.map
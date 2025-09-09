import { ReactNode } from 'react';
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
export declare const Modal: ({ isOpen, onClose, children, className, size }: ModalProps) => import("react/jsx-runtime").JSX.Element | null;
export interface ModalHeaderProps {
    children: ReactNode;
    className?: string;
}
export declare const ModalHeader: ({ children, className }: ModalHeaderProps) => import("react/jsx-runtime").JSX.Element;
export interface ModalBodyProps {
    children: ReactNode;
    className?: string;
}
export declare const ModalBody: ({ children, className }: ModalBodyProps) => import("react/jsx-runtime").JSX.Element;
export interface ModalFooterProps {
    children: ReactNode;
    className?: string;
}
export declare const ModalFooter: ({ children, className }: ModalFooterProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Modal.d.ts.map
import React from 'react';
interface FileUploadProps {
    onFilesChange?: (files: File[]) => void;
    onError?: (error: string) => void;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    variant?: 'dropzone' | 'button' | 'input';
    showPreview?: boolean;
}
export declare function FileUpload({ onFilesChange, onError, multiple, accept, maxSize, maxFiles, disabled, className, children, variant, showPreview }: FileUploadProps): React.JSX.Element;
export {};

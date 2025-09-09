import React from 'react';
export interface DroppedFile {
    id: string;
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress?: number;
    error?: string;
    preview?: string;
}
export declare function useDragDrop({ onDrop, accept, multiple, maxSize, onError }: {
    onDrop: (files: File[]) => void;
    accept?: string[];
    multiple?: boolean;
    maxSize?: number;
    onError?: (error: string) => void;
}): {
    isDragActive: boolean;
    isDragReject: boolean;
    dragProps: {
        onDrop: (e: React.DragEvent) => void;
        onDragEnter: (e: React.DragEvent) => void;
        onDragLeave: (e: React.DragEvent) => void;
        onDragOver: (e: React.DragEvent) => void;
    };
};
interface DragDropProps {
    onFileDrop: (files: File[]) => void;
    accept?: string[];
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    showPreview?: boolean;
    compact?: boolean;
}
export declare function DragDrop({ onFileDrop, accept, multiple, maxSize, maxFiles, disabled, className, children, showPreview, compact }: DragDropProps): React.JSX.Element;
interface SortableItem {
    id: string;
    content: React.ReactNode;
}
interface SortableListProps {
    items: SortableItem[];
    onReorder: (items: SortableItem[]) => void;
    className?: string;
    itemClassName?: string;
}
export declare function SortableList({ items, onReorder, className, itemClassName }: SortableListProps): React.JSX.Element;
export default DragDrop;

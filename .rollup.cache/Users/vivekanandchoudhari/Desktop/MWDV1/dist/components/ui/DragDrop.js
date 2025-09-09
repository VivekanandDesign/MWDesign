'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, File, Image, Video, Music, Archive, FileText, X, Check, AlertCircle, Eye, RefreshCw, GripVertical } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
// Drag and Drop Hook
export function useDragDrop({ onDrop, accept, multiple = true, maxSize, onError }) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [isDragReject, setIsDragReject] = useState(false);
    const dragCounter = useRef(0);
    const validateFile = useCallback((file) => {
        if (accept && accept.length > 0) {
            const fileType = file.type;
            const fileName = file.name.toLowerCase();
            const isValidType = accept.some(acceptType => {
                if (acceptType.startsWith('.')) {
                    return fileName.endsWith(acceptType);
                }
                if (acceptType.includes('/*')) {
                    return fileType.startsWith(acceptType.replace('/*', ''));
                }
                return fileType === acceptType;
            });
            if (!isValidType) {
                onError === null || onError === void 0 ? void 0 : onError(`File type ${fileType} is not accepted`);
                return false;
            }
        }
        if (maxSize && file.size > maxSize) {
            onError === null || onError === void 0 ? void 0 : onError(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
            return false;
        }
        return true;
    }, [accept, maxSize, onError]);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        setIsDragReject(false);
        dragCounter.current = 0;
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(validateFile);
        if (!multiple && validFiles.length > 1) {
            onError === null || onError === void 0 ? void 0 : onError('Multiple files not allowed');
            return;
        }
        if (validFiles.length > 0) {
            onDrop(validFiles);
        }
    }, [multiple, onDrop, validateFile, onError]);
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragActive(true);
        }
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragActive(false);
            setIsDragReject(false);
        }
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        // Check if files being dragged are valid
        const files = Array.from(e.dataTransfer.files);
        const hasInvalidFiles = files.some(file => !validateFile(file));
        setIsDragReject(hasInvalidFiles);
    }, [validateFile]);
    return {
        isDragActive,
        isDragReject,
        dragProps: {
            onDrop: handleDrop,
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver
        }
    };
}
// File Icon Component
function getFileIcon(file) {
    const type = file.type;
    const name = file.name.toLowerCase();
    if (type.startsWith('image/'))
        return _jsx(Image, { className: "w-6 h-6" });
    if (type.startsWith('video/'))
        return _jsx(Video, { className: "w-6 h-6" });
    if (type.startsWith('audio/'))
        return _jsx(Music, { className: "w-6 h-6" });
    if (type.includes('pdf') || name.endsWith('.pdf'))
        return _jsx(FileText, { className: "w-6 h-6" });
    if (type.includes('zip') || type.includes('rar') || type.includes('archive'))
        return _jsx(Archive, { className: "w-6 h-6" });
    return _jsx(File, { className: "w-6 h-6" });
}
export function DragDrop({ onFileDrop, accept, multiple = true, maxSize, maxFiles, disabled = false, className, children, showPreview = true, compact = false }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const { isDragActive, isDragReject, dragProps } = useDragDrop({
        onDrop: handleFileDrop,
        accept,
        multiple,
        maxSize,
        onError: setError
    });
    function handleFileDrop(droppedFiles) {
        if (disabled)
            return;
        let filesToAdd = droppedFiles;
        if (maxFiles) {
            const remainingSlots = maxFiles - files.length;
            if (remainingSlots <= 0) {
                setError(`Maximum ${maxFiles} files allowed`);
                return;
            }
            filesToAdd = droppedFiles.slice(0, remainingSlots);
        }
        const newFiles = filesToAdd.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            status: 'pending',
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        }));
        setFiles(prev => [...prev, ...newFiles]);
        onFileDrop(filesToAdd);
        setError('');
    }
    const handleFileInput = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length > 0) {
            handleFileDrop(selectedFiles);
        }
    };
    const removeFile = (id) => {
        setFiles(prev => {
            const fileToRemove = prev.find(f => f.id === id);
            if (fileToRemove === null || fileToRemove === void 0 ? void 0 : fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return prev.filter(f => f.id !== id);
        });
    };
    const clearAll = () => {
        files.forEach(file => {
            if (file.preview) {
                URL.revokeObjectURL(file.preview);
            }
        });
        setFiles([]);
        setError('');
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    useEffect(() => {
        return () => {
            files.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [files]);
    if (compact) {
        return (_jsxs("div", { className: cn('relative', className), children: [_jsxs("div", Object.assign({}, dragProps, { className: cn('border-2 border-dashed rounded-lg p-4 text-center transition-colors', isDragActive && !isDragReject && 'border-mw-blue-500 bg-mw-blue-50 dark:bg-mw-blue-950', isDragReject && 'border-red-500 bg-red-50 dark:bg-red-950', !isDragActive && 'border-mw-gray-300 dark:border-mw-gray-600', disabled && 'opacity-50 cursor-not-allowed'), children: [_jsx("input", { ref: fileInputRef, type: "file", className: "hidden", multiple: multiple, accept: accept === null || accept === void 0 ? void 0 : accept.join(','), onChange: handleFileInput, disabled: disabled }), _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(Upload, { className: "w-5 h-5 text-mw-gray-400" }), _jsx("button", { onClick: () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "text-sm text-mw-blue-600 hover:text-mw-blue-700 font-medium", disabled: disabled, children: "Choose files" }), _jsx("span", { className: "text-sm text-mw-gray-500", children: "or drag here" })] })] })), error && (_jsxs("p", { className: "mt-2 text-sm text-red-600 flex items-center", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), error] }))] }));
    }
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsxs("div", Object.assign({}, dragProps, { className: cn('border-2 border-dashed rounded-lg p-8 text-center transition-colors', isDragActive && !isDragReject && 'border-mw-blue-500 bg-mw-blue-50 dark:bg-mw-blue-950', isDragReject && 'border-red-500 bg-red-50 dark:bg-red-950', !isDragActive && 'border-mw-gray-300 dark:border-mw-gray-600 hover:border-mw-gray-400', disabled && 'opacity-50 cursor-not-allowed'), children: [_jsx("input", { ref: fileInputRef, type: "file", className: "hidden", multiple: multiple, accept: accept === null || accept === void 0 ? void 0 : accept.join(','), onChange: handleFileInput, disabled: disabled }), children || (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-mw-gray-100 dark:bg-mw-gray-800 rounded-full flex items-center justify-center", children: _jsx(Upload, { className: "w-8 h-8 text-mw-gray-400" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-lg font-medium text-mw-gray-900 dark:text-white", children: isDragActive
                                            ? isDragReject
                                                ? 'Invalid file type'
                                                : 'Drop files here'
                                            : 'Upload files' }), _jsxs("div", { className: "text-sm text-mw-gray-500 dark:text-mw-gray-400", children: [_jsx("button", { onClick: () => { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "text-mw-blue-600 hover:text-mw-blue-700 font-medium", disabled: disabled, children: "Choose files" }), ' ', "or drag and drop"] }), (accept || maxSize || maxFiles) && (_jsxs("div", { className: "text-xs text-mw-gray-400 space-y-1", children: [accept && (_jsxs("div", { children: ["Accepted: ", accept.join(', ')] })), maxSize && (_jsxs("div", { children: ["Max size: ", Math.round(maxSize / 1024 / 1024), "MB"] })), maxFiles && (_jsxs("div", { children: ["Max files: ", maxFiles] }))] }))] })] }))] })), error && (_jsx("div", { className: "p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg", children: _jsxs("div", { className: "flex items-center text-red-600 dark:text-red-400", children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-2 flex-shrink-0" }), _jsx("span", { className: "text-sm", children: error })] }) })), showPreview && files.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h4", { className: "text-sm font-medium text-mw-gray-900 dark:text-white", children: ["Files (", files.length, ")"] }), _jsx("button", { onClick: clearAll, className: "text-sm text-mw-gray-500 hover:text-mw-gray-700 dark:hover:text-mw-gray-300", children: "Clear all" })] }), _jsx("div", { className: "space-y-2", children: files.map((droppedFile) => (_jsx(FilePreview, { file: droppedFile, onRemove: () => removeFile(droppedFile.id) }, droppedFile.id))) })] }))] }));
}
function FilePreview({ file, onRemove, showActions = true }) {
    const [showFullPreview, setShowFullPreview] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-3 p-3 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700", children: [_jsx("div", { className: "flex-shrink-0", children: file.preview ? (_jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden", children: _jsx("img", { src: file.preview, alt: file.file.name, className: "w-full h-full object-cover" }) })) : (_jsx("div", { className: "w-10 h-10 bg-mw-gray-200 dark:bg-mw-gray-700 rounded-lg flex items-center justify-center text-mw-gray-500", children: getFileIcon(file.file) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-mw-gray-900 dark:text-white truncate", children: file.file.name }), _jsxs("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: [file.file.type || 'Unknown', " - ", file.file.size ? `${(file.file.size / 1024).toFixed(1)} KB` : 'Unknown size'] }), file.status === 'uploading' && file.progress !== undefined && (_jsx("div", { className: "mt-2", children: _jsx("div", { className: "w-full bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full h-1", children: _jsx("div", { className: "bg-mw-blue-600 h-1 rounded-full transition-all duration-300", style: { width: `${file.progress}%` } }) }) })), file.status === 'error' && file.error && (_jsx("div", { className: "mt-1 text-xs text-red-600 dark:text-red-400", children: file.error }))] }), _jsxs("div", { className: "flex-shrink-0", children: [file.status === 'uploading' && (_jsx(RefreshCw, { className: "w-4 h-4 text-mw-blue-500 animate-spin" })), file.status === 'success' && (_jsx(Check, { className: "w-4 h-4 text-green-500" })), file.status === 'error' && (_jsx(AlertCircle, { className: "w-4 h-4 text-red-500" }))] }), showActions && (_jsxs("div", { className: "flex items-center space-x-1", children: [file.preview && (_jsx("button", { onClick: () => setShowFullPreview(true), className: "p-1.5 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300 rounded", title: "Preview", children: _jsx(Eye, { className: "w-4 h-4" }) })), _jsx("button", { onClick: onRemove, className: "p-1.5 text-mw-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded", title: "Remove", children: _jsx(X, { className: "w-4 h-4" }) })] }))] }), showFullPreview && file.preview && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "relative max-w-4xl max-h-full", children: [_jsx("button", { onClick: () => setShowFullPreview(false), className: "absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("img", { src: file.preview, alt: file.file.name, className: "max-w-full max-h-full object-contain rounded-lg" })] }) }))] }));
}
export function SortableList({ items, onReorder, className, itemClassName }) {
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverItem, setDragOverItem] = useState(null);
    const handleDragStart = (e, id) => {
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e, id) => {
        e.preventDefault();
        setDragOverItem(id);
    };
    const handleDrop = (e, targetId) => {
        e.preventDefault();
        if (!draggedItem || draggedItem === targetId)
            return;
        const draggedIndex = items.findIndex(item => item.id === draggedItem);
        const targetIndex = items.findIndex(item => item.id === targetId);
        const newItems = [...items];
        const draggedItemData = newItems[draggedIndex];
        // Remove dragged item
        newItems.splice(draggedIndex, 1);
        // Insert at new position
        newItems.splice(targetIndex, 0, draggedItemData);
        onReorder(newItems);
        setDraggedItem(null);
        setDragOverItem(null);
    };
    const handleDragEnd = () => {
        setDraggedItem(null);
        setDragOverItem(null);
    };
    return (_jsx("div", { className: cn('space-y-2', className), children: items.map((item) => (_jsxs("div", { draggable: true, onDragStart: (e) => handleDragStart(e, item.id), onDragOver: (e) => handleDragOver(e, item.id), onDrop: (e) => handleDrop(e, item.id), onDragEnd: handleDragEnd, className: cn('flex items-center space-x-3 p-3 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg cursor-move transition-colors', draggedItem === item.id && 'opacity-50', dragOverItem === item.id && 'border-mw-blue-500 bg-mw-blue-50 dark:bg-mw-blue-950', itemClassName), children: [_jsx(GripVertical, { className: "w-4 h-4 text-mw-gray-400" }), _jsx("div", { className: "flex-1", children: item.content })] }, item.id))) }));
}
export default DragDrop;
//# sourceMappingURL=DragDrop.js.map
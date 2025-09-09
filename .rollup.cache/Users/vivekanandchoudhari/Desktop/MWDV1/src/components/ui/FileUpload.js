'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Image, FileText } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
function getFileIcon(file) {
    if (file.type.startsWith('image/')) {
        return _jsx(Image, { className: "w-4 h-4" });
    }
    if (file.type.includes('text/') || file.type.includes('application/json')) {
        return _jsx(FileText, { className: "w-4 h-4" });
    }
    return _jsx(File, { className: "w-4 h-4" });
}
function FileItem({ file, onRemove, showPreview = true }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    React.useEffect(() => {
        if (showPreview && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file, showPreview]);
    return (_jsxs("div", { className: "flex items-center p-3 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700", children: [_jsx("div", { className: "flex-shrink-0 mr-3", children: previewUrl ? (_jsx("img", { src: previewUrl, alt: file.name, className: "w-10 h-10 object-cover rounded" })) : (_jsx("div", { className: "w-10 h-10 bg-mw-gray-200 dark:bg-mw-gray-700 rounded flex items-center justify-center text-mw-gray-500", children: getFileIcon(file) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-mw-gray-900 dark:text-white truncate", children: file.name }), _jsx("p", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: formatFileSize(file.size) })] }), onRemove && (_jsx("button", { onClick: onRemove, className: "flex-shrink-0 ml-2 p-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200", children: _jsx(X, { className: "w-4 h-4" }) }))] }));
}
function DragDropZone({ onDrop, accept, multiple = false, disabled = false, children, className }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragOver(true);
        }
    }, [disabled]);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (disabled)
            return;
        const files = Array.from(e.dataTransfer.files);
        // Filter files by accept type if specified
        const filteredFiles = accept
            ? files.filter(file => {
                const acceptTypes = accept.split(',').map(type => type.trim());
                return acceptTypes.some(type => {
                    if (type.startsWith('.')) {
                        return file.name.toLowerCase().endsWith(type.toLowerCase());
                    }
                    return file.type.match(new RegExp(type.replace('*', '.*')));
                });
            })
            : files;
        const finalFiles = multiple ? filteredFiles : filteredFiles.slice(0, 1);
        onDrop(finalFiles);
    }, [onDrop, accept, multiple, disabled]);
    return (_jsx("div", { onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, className: cn('relative', isDragOver && 'opacity-75', className), children: children }));
}
export function FileUpload({ onFilesChange, onError, multiple = false, accept, maxSize, maxFiles, disabled = false, className, children, variant = 'dropzone', showPreview = true }) {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const validateFiles = useCallback((newFiles) => {
        const validFiles = [];
        for (const file of newFiles) {
            // Check file size
            if (maxSize && file.size > maxSize) {
                onError === null || onError === void 0 ? void 0 : onError(`File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`);
                continue;
            }
            // Check file count
            if (maxFiles && files.length + validFiles.length >= maxFiles) {
                onError === null || onError === void 0 ? void 0 : onError(`Maximum ${maxFiles} files allowed.`);
                break;
            }
            validFiles.push(file);
        }
        return validFiles;
    }, [files.length, maxSize, maxFiles, onError]);
    const handleFilesChange = useCallback((newFiles) => {
        const validFiles = validateFiles(newFiles);
        if (validFiles.length > 0) {
            const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
            setFiles(updatedFiles);
            onFilesChange === null || onFilesChange === void 0 ? void 0 : onFilesChange(updatedFiles);
        }
    }, [files, multiple, validateFiles, onFilesChange]);
    const handleInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        handleFilesChange(selectedFiles);
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChange === null || onFilesChange === void 0 ? void 0 : onFilesChange(updatedFiles);
    };
    const openFileDialog = () => {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    if (variant === 'button') {
        return (_jsxs("div", { className: className, children: [_jsx("input", { ref: fileInputRef, type: "file", multiple: multiple, accept: accept, onChange: handleInputChange, disabled: disabled, className: "hidden" }), _jsxs("button", { onClick: openFileDialog, disabled: disabled, className: "inline-flex items-center px-4 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md shadow-sm text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 bg-white dark:bg-mw-gray-800 hover:bg-mw-gray-50 dark:hover:bg-mw-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mw-blue-500 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), children || 'Choose Files'] }), files.length > 0 && (_jsx("div", { className: "mt-4 space-y-2", children: files.map((file, index) => (_jsx(FileItem, { file: file, onRemove: () => removeFile(index), showPreview: showPreview }, `${file.name}-${index}`))) }))] }));
    }
    if (variant === 'input') {
        return (_jsxs("div", { className: className, children: [_jsx("input", { ref: fileInputRef, type: "file", multiple: multiple, accept: accept, onChange: handleInputChange, disabled: disabled, className: "block w-full text-sm text-mw-gray-500 dark:text-mw-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-mw-blue-50 file:text-mw-blue-700 hover:file:bg-mw-blue-100 dark:file:bg-mw-blue-900/20 dark:file:text-mw-blue-300 dark:hover:file:bg-mw-blue-900/30" }), files.length > 0 && (_jsx("div", { className: "mt-4 space-y-2", children: files.map((file, index) => (_jsx(FileItem, { file: file, onRemove: () => removeFile(index), showPreview: showPreview }, `${file.name}-${index}`))) }))] }));
    }
    // Default dropzone variant
    return (_jsxs("div", { className: className, children: [_jsx("input", { ref: fileInputRef, type: "file", multiple: multiple, accept: accept, onChange: handleInputChange, disabled: disabled, className: "hidden" }), _jsx(DragDropZone, { onDrop: handleFilesChange, accept: accept, multiple: multiple, disabled: disabled, className: "w-full", children: _jsxs("div", { onClick: openFileDialog, className: cn('w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors', disabled
                        ? 'border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800 cursor-not-allowed'
                        : 'border-mw-gray-300 dark:border-mw-gray-600 hover:border-mw-blue-400 dark:hover:border-mw-blue-500 hover:bg-mw-blue-50 dark:hover:bg-mw-blue-900/10'), children: [_jsx(Upload, { className: "w-8 h-8 mx-auto mb-4 text-mw-gray-400" }), children || (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-mw-gray-900 dark:text-white mb-1", children: "Drop files here or click to upload" }), _jsxs("p", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: [accept && `Accepts: ${accept}`, maxSize && ` - Max size: ${formatFileSize(maxSize)}`, maxFiles && ` - Max files: ${maxFiles}`] })] }))] }) }), files.length > 0 && (_jsx("div", { className: "mt-4 space-y-2", children: files.map((file, index) => (_jsx(FileItem, { file: file, onRemove: () => removeFile(index), showPreview: showPreview }, `${file.name}-${index}`))) }))] }));
}
//# sourceMappingURL=FileUpload.js.map
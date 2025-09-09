'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Save, Download, FileText, Eye, Edit3, ZoomIn, ZoomOut, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function calculateStats(content) {
    const characters = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split('\n').length;
    const pages = Math.ceil(words / 250) || 1; // Approximate 250 words per page
    return { characters, words, lines, pages };
}
export function DocumentEditor({ value = '', onChange, title = 'Untitled Document', onTitleChange, mode = 'edit', showToolbar = true, showSidebar = false, showStatusBar = true, autoSave = false, autoSaveInterval = 30000, className, onSave, onExport, readOnly = false, collaborative = false, zoom = 100, onZoomChange }) {
    const [content, setContent] = useState(value);
    const [documentTitle, setDocumentTitle] = useState(title);
    const [currentMode, setCurrentMode] = useState(mode);
    const [isModified, setIsModified] = useState(false);
    const [findReplace, setFindReplace] = useState({ show: false, find: '', replace: '' });
    const [currentZoom, setCurrentZoom] = useState(zoom);
    const [stats, setStats] = useState(calculateStats(value));
    const editorRef = useRef(null);
    const autoSaveRef = useRef();
    useEffect(() => {
        setContent(value);
        setStats(calculateStats(value));
    }, [value]);
    useEffect(() => {
        if (autoSave && isModified) {
            if (autoSaveRef.current)
                clearTimeout(autoSaveRef.current);
            autoSaveRef.current = setTimeout(() => {
                handleSave();
            }, autoSaveInterval);
        }
        return () => {
            if (autoSaveRef.current)
                clearTimeout(autoSaveRef.current);
        };
    }, [content, isModified, autoSave, autoSaveInterval]);
    const handleContentChange = useCallback((newContent) => {
        setContent(newContent);
        setStats(calculateStats(newContent));
        setIsModified(true);
        onChange === null || onChange === void 0 ? void 0 : onChange(newContent);
    }, [onChange]);
    const handleTitleChange = useCallback((newTitle) => {
        setDocumentTitle(newTitle);
        onTitleChange === null || onTitleChange === void 0 ? void 0 : onTitleChange(newTitle);
    }, [onTitleChange]);
    const handleSave = useCallback(() => {
        onSave === null || onSave === void 0 ? void 0 : onSave(content);
        setIsModified(false);
    }, [content, onSave]);
    const handleZoom = useCallback((newZoom) => {
        const clampedZoom = Math.max(50, Math.min(200, newZoom));
        setCurrentZoom(clampedZoom);
        onZoomChange === null || onZoomChange === void 0 ? void 0 : onZoomChange(clampedZoom);
    }, [onZoomChange]);
    const formatText = useCallback((command, value) => {
        if (readOnly || !editorRef.current)
            return;
        const textarea = editorRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        let newText = selectedText;
        switch (command) {
            case 'bold':
                newText = `**${selectedText}**`;
                break;
            case 'italic':
                newText = `*${selectedText}*`;
                break;
            case 'underline':
                newText = `_${selectedText}_`;
                break;
            case 'heading1':
                newText = `# ${selectedText}`;
                break;
            case 'heading2':
                newText = `## ${selectedText}`;
                break;
            case 'bulletList':
                newText = `- ${selectedText}`;
                break;
            case 'numberedList':
                newText = `1. ${selectedText}`;
                break;
        }
        const newContent = content.substring(0, start) + newText + content.substring(end);
        handleContentChange(newContent);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + newText.length);
        }, 0);
    }, [content, readOnly, handleContentChange]);
    const toolbar = showToolbar && (_jsxs("div", { className: "flex items-center justify-between p-2 border-b border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800/50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: handleSave, disabled: !isModified, className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 disabled:opacity-50", title: "Save", children: _jsx(Save, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => onExport === null || onExport === void 0 ? void 0 : onExport('pdf'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Export as PDF", children: _jsx(Download, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => formatText('bold'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Bold", children: _jsx(Bold, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => formatText('italic'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Italic", children: _jsx(Italic, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => formatText('underline'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Underline", children: _jsx(Underline, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => formatText('alignLeft'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Align Left", children: _jsx(AlignLeft, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => formatText('alignCenter'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Align Center", children: _jsx(AlignCenter, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => formatText('alignRight'), className: "p-2 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Align Right", children: _jsx(AlignRight, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center border border-mw-gray-300 dark:border-mw-gray-600 rounded-md", children: [_jsx("button", { onClick: () => setCurrentMode('edit'), className: cn('px-3 py-1 text-sm rounded-l-md', currentMode === 'edit'
                                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                                    : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'), children: _jsx(Edit3, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setCurrentMode('view'), className: cn('px-3 py-1 text-sm', currentMode === 'view'
                                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                                    : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'), children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setCurrentMode('split'), className: cn('px-3 py-1 text-sm rounded-r-md', currentMode === 'split'
                                    ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                                    : 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'), children: _jsx(FileText, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => handleZoom(currentZoom - 10), className: "p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Zoom Out", children: _jsx(ZoomOut, { className: "w-4 h-4" }) }), _jsxs("span", { className: "text-sm min-w-[3rem] text-center", children: [currentZoom, "%"] }), _jsx("button", { onClick: () => handleZoom(currentZoom + 10), className: "p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700", title: "Zoom In", children: _jsx(ZoomIn, { className: "w-4 h-4" }) })] })] })] }));
    const statusBar = showStatusBar && (_jsxs("div", { className: "flex items-center justify-between p-2 border-t border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800/50 text-xs text-mw-gray-600 dark:text-mw-gray-400", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { children: [stats.words, " words"] }), _jsxs("span", { children: [stats.characters, " characters"] }), _jsxs("span", { children: [stats.lines, " lines"] }), _jsxs("span", { children: ["Page ", stats.pages] }), isModified && _jsx("span", { className: "text-mw-orange-500", children: "- Unsaved changes" }), autoSave && _jsx("span", { className: "text-mw-green-500", children: "- Auto-save enabled" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [collaborative && _jsx("span", { className: "text-mw-blue-500", children: "- Collaborative" }), _jsx("span", { children: "UTF-8" })] })] }));
    const editorContent = (_jsx("div", { className: "flex-1 relative", children: _jsx("textarea", { ref: editorRef, value: content, onChange: (e) => handleContentChange(e.target.value), placeholder: "Start writing your document...", readOnly: readOnly, className: cn('w-full h-full p-6 border-0 resize-none focus:outline-none', 'bg-white dark:bg-mw-gray-900', 'text-mw-gray-900 dark:text-white', 'placeholder-mw-gray-500 dark:placeholder-mw-gray-400', 'font-mono leading-relaxed'), style: {
                fontSize: `${currentZoom}%`,
                lineHeight: 1.6,
                minHeight: '500px'
            } }) }));
    const previewContent = (_jsx("div", { className: "flex-1 p-6 overflow-auto", children: _jsx("div", { className: "prose prose-lg max-w-none dark:prose-invert", style: { fontSize: `${currentZoom}%` }, children: _jsx("div", { dangerouslySetInnerHTML: { __html: content.replace(/\n/g, '<br>') } }) }) }));
    return (_jsxs("div", { className: cn('flex flex-col h-full border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden bg-white dark:bg-mw-gray-900', className), children: [_jsx("div", { className: "p-3 border-b border-mw-gray-200 dark:border-mw-gray-700", children: _jsx("input", { type: "text", value: documentTitle, onChange: (e) => handleTitleChange(e.target.value), className: "text-lg font-semibold bg-transparent border-0 focus:outline-none w-full text-mw-gray-900 dark:text-white", placeholder: "Document title...", readOnly: readOnly }) }), toolbar, _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [currentMode === 'edit' && editorContent, currentMode === 'view' && previewContent, currentMode === 'split' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex-1 border-r border-mw-gray-200 dark:border-mw-gray-700", children: editorContent }), _jsx("div", { className: "flex-1", children: previewContent })] }))] }), statusBar] }));
}
export default DocumentEditor;
//# sourceMappingURL=DocumentEditor.js.map
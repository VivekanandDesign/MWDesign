'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Link, Image, Code, Type, Eye, Edit3 } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function ToolbarButton({ onClick, active, disabled, children, title }) {
    return (_jsx("button", { type: "button", onClick: onClick, disabled: disabled, title: title, className: cn('p-2 rounded-md text-sm font-medium transition-colors', 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700', 'focus:outline-none focus:ring-2 focus:ring-mw-blue-500', active && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300', disabled && 'opacity-50 cursor-not-allowed', !active && 'text-mw-gray-600 dark:text-mw-gray-300'), children: children }));
}
export function RichTextEditor({ value = '', onChange, placeholder = 'Start writing...', disabled = false, readOnly = false, minHeight = 200, maxHeight = 500, showToolbar = true, toolbarPosition = 'top', enablePreview = false, className, onFocus, onBlur }) {
    const [content, setContent] = useState(value);
    const [isPreview, setIsPreview] = useState(false);
    const [selection, setSelection] = useState(null);
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    useEffect(() => {
        setContent(value);
    }, [value]);
    const handleContentChange = useCallback((newContent) => {
        setContent(newContent);
        onChange === null || onChange === void 0 ? void 0 : onChange(newContent);
    }, [onChange]);
    const execCommand = useCallback((command, value) => {
        if (disabled || readOnly)
            return;
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
            const newContent = editorRef.current.innerHTML;
            handleContentChange(newContent);
        }
    }, [disabled, readOnly, handleContentChange]);
    const insertText = useCallback((before, after = '') => {
        if (!textareaRef.current || disabled || readOnly)
            return;
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = before + selectedText + after;
        const newContent = content.substring(0, start) + newText + content.substring(end);
        handleContentChange(newContent);
        // Set new cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    }, [content, disabled, readOnly, handleContentChange]);
    const formatCommands = {
        bold: () => insertText('**', '**'),
        italic: () => insertText('*', '*'),
        underline: () => insertText('_', '_'),
        strikethrough: () => insertText('~~', '~~'),
        code: () => insertText('`', '`'),
        link: () => {
            const url = prompt('Enter URL:');
            if (url)
                insertText('[', `](${url})`);
        },
        image: () => {
            const url = prompt('Enter image URL:');
            if (url)
                insertText('![', `](${url})`);
        },
        quote: () => insertText('> '),
        bulletList: () => insertText('- '),
        numberedList: () => insertText('1. '),
        heading1: () => insertText('# '),
        heading2: () => insertText('## '),
        heading3: () => insertText('### ')
    };
    const toolbar = showToolbar && (_jsxs("div", { className: "flex items-center gap-1 p-2 border-b border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800/50", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ToolbarButton, { onClick: formatCommands.bold, title: "Bold", children: _jsx(Bold, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.italic, title: "Italic", children: _jsx(Italic, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.underline, title: "Underline", children: _jsx(Underline, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.strikethrough, title: "Strikethrough", children: _jsx(Strikethrough, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ToolbarButton, { onClick: formatCommands.heading1, title: "Heading 1", children: _jsx(Type, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.quote, title: "Quote", children: _jsx(Quote, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.code, title: "Code", children: _jsx(Code, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ToolbarButton, { onClick: formatCommands.bulletList, title: "Bullet List", children: _jsx(List, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.numberedList, title: "Numbered List", children: _jsx(ListOrdered, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ToolbarButton, { onClick: formatCommands.link, title: "Insert Link", children: _jsx(Link, { className: "w-4 h-4" }) }), _jsx(ToolbarButton, { onClick: formatCommands.image, title: "Insert Image", children: _jsx(Image, { className: "w-4 h-4" }) })] }), enablePreview && (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1" }), _jsx(ToolbarButton, { onClick: () => setIsPreview(!isPreview), active: isPreview, title: isPreview ? 'Edit' : 'Preview', children: isPreview ? _jsx(Edit3, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] }))] }));
    const editor = (_jsx("div", { className: "relative flex-1", children: isPreview ? (_jsx("div", { className: "p-3 prose prose-sm max-w-none dark:prose-invert", style: { minHeight, maxHeight }, children: _jsx("div", { dangerouslySetInnerHTML: { __html: content.replace(/\n/g, '<br>') } }) })) : (_jsx("textarea", { ref: textareaRef, value: content, onChange: (e) => handleContentChange(e.target.value), placeholder: placeholder, disabled: disabled, readOnly: readOnly, onFocus: onFocus, onBlur: onBlur, className: cn('w-full p-3 border-0 resize-none focus:outline-none', 'bg-white dark:bg-mw-gray-900', 'text-mw-gray-900 dark:text-white', 'placeholder-mw-gray-500 dark:placeholder-mw-gray-400', disabled && 'opacity-50 cursor-not-allowed'), style: { minHeight, maxHeight } })) }));
    return (_jsxs("div", { className: cn('border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden', 'bg-white dark:bg-mw-gray-900', 'focus-within:ring-2 focus-within:ring-mw-blue-500 focus-within:border-transparent', disabled && 'opacity-50', className), children: [toolbarPosition === 'top' && toolbar, editor, toolbarPosition === 'bottom' && toolbar] }));
}
export default RichTextEditor;
//# sourceMappingURL=RichTextEditor.js.map
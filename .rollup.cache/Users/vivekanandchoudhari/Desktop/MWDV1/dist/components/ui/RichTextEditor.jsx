'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Link, Image, Code, Type, Eye, Edit3 } from 'lucide-react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function ToolbarButton({ onClick, active, disabled, children, title }) {
    return (<button type="button" onClick={onClick} disabled={disabled} title={title} className={cn('p-2 rounded-md text-sm font-medium transition-colors', 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700', 'focus:outline-none focus:ring-2 focus:ring-mw-blue-500', active && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300', disabled && 'opacity-50 cursor-not-allowed', !active && 'text-mw-gray-600 dark:text-mw-gray-300')}>
      {children}
    </button>);
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
    const toolbar = showToolbar && (<div className="flex items-center gap-1 p-2 border-b border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800/50">
      <div className="flex items-center gap-1">
        <ToolbarButton onClick={formatCommands.bold} title="Bold">
          <Bold className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.italic} title="Italic">
          <Italic className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.underline} title="Underline">
          <Underline className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.strikethrough} title="Strikethrough">
          <Strikethrough className="w-4 h-4"/>
        </ToolbarButton>
      </div>
      
      <div className="w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1"/>
      
      <div className="flex items-center gap-1">
        <ToolbarButton onClick={formatCommands.heading1} title="Heading 1">
          <Type className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.quote} title="Quote">
          <Quote className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.code} title="Code">
          <Code className="w-4 h-4"/>
        </ToolbarButton>
      </div>
      
      <div className="w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1"/>
      
      <div className="flex items-center gap-1">
        <ToolbarButton onClick={formatCommands.bulletList} title="Bullet List">
          <List className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.numberedList} title="Numbered List">
          <ListOrdered className="w-4 h-4"/>
        </ToolbarButton>
      </div>
      
      <div className="w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1"/>
      
      <div className="flex items-center gap-1">
        <ToolbarButton onClick={formatCommands.link} title="Insert Link">
          <Link className="w-4 h-4"/>
        </ToolbarButton>
        <ToolbarButton onClick={formatCommands.image} title="Insert Image">
          <Image className="w-4 h-4"/>
        </ToolbarButton>
      </div>
      
      {enablePreview && (<>
          <div className="w-px h-6 bg-mw-gray-300 dark:bg-mw-gray-600 mx-1"/>
          <ToolbarButton onClick={() => setIsPreview(!isPreview)} active={isPreview} title={isPreview ? 'Edit' : 'Preview'}>
            {isPreview ? <Edit3 className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
          </ToolbarButton>
        </>)}
    </div>);
    const editor = (<div className="relative flex-1">
      {isPreview ? (<div className="p-3 prose prose-sm max-w-none dark:prose-invert" style={{ minHeight, maxHeight }}>
          <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}/>
        </div>) : (<textarea ref={textareaRef} value={content} onChange={(e) => handleContentChange(e.target.value)} placeholder={placeholder} disabled={disabled} readOnly={readOnly} onFocus={onFocus} onBlur={onBlur} className={cn('w-full p-3 border-0 resize-none focus:outline-none', 'bg-white dark:bg-mw-gray-900', 'text-mw-gray-900 dark:text-white', 'placeholder-mw-gray-500 dark:placeholder-mw-gray-400', disabled && 'opacity-50 cursor-not-allowed')} style={{ minHeight, maxHeight }}/>)}
    </div>);
    return (<div className={cn('border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden', 'bg-white dark:bg-mw-gray-900', 'focus-within:ring-2 focus-within:ring-mw-blue-500 focus-within:border-transparent', disabled && 'opacity-50', className)}>
      {toolbarPosition === 'top' && toolbar}
      {editor}
      {toolbarPosition === 'bottom' && toolbar}
    </div>);
}
export default RichTextEditor;
//# sourceMappingURL=RichTextEditor.jsx.map
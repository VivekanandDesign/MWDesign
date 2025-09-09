import React from 'react';
interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    minHeight?: number;
    maxHeight?: number;
    showToolbar?: boolean;
    toolbarPosition?: 'top' | 'bottom';
    enablePreview?: boolean;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}
export declare function RichTextEditor({ value, onChange, placeholder, disabled, readOnly, minHeight, maxHeight, showToolbar, toolbarPosition, enablePreview, className, onFocus, onBlur }: RichTextEditorProps): React.JSX.Element;
export default RichTextEditor;

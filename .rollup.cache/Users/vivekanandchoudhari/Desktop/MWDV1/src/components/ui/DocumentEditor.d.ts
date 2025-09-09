interface DocumentEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    title?: string;
    onTitleChange?: (title: string) => void;
    mode?: 'edit' | 'view' | 'split';
    showToolbar?: boolean;
    showSidebar?: boolean;
    showStatusBar?: boolean;
    autoSave?: boolean;
    autoSaveInterval?: number;
    className?: string;
    onSave?: (content: string) => void;
    onExport?: (format: 'pdf' | 'docx' | 'txt') => void;
    readOnly?: boolean;
    collaborative?: boolean;
    zoom?: number;
    onZoomChange?: (zoom: number) => void;
}
export declare function DocumentEditor({ value, onChange, title, onTitleChange, mode, showToolbar, showSidebar, showStatusBar, autoSave, autoSaveInterval, className, onSave, onExport, readOnly, collaborative, zoom, onZoomChange }: DocumentEditorProps): import("react/jsx-runtime").JSX.Element;
export default DocumentEditor;
//# sourceMappingURL=DocumentEditor.d.ts.map
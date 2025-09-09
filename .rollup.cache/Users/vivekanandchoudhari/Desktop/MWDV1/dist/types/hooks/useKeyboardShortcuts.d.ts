export interface KeyboardShortcut {
    key: string;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    description: string;
    action: () => void;
}
export interface ShortcutGroup {
    name: string;
    shortcuts: KeyboardShortcut[];
}
export declare function useKeyboardShortcuts(): {
    shortcuts: KeyboardShortcut[];
    isHelpOpen: boolean;
    lastPressedKey: string;
    addShortcut: (shortcut: KeyboardShortcut) => void;
    removeShortcut: (key: string) => void;
    clearShortcuts: () => void;
    toggleHelp: () => void;
    getShortcutGroups: () => ShortcutGroup[];
};
export declare function useIconKeyboardShortcuts({ onCopyAsSVG, onCopyAsJSX, onCopyAsImport, onDownload, onToggleFavorite, onToggleCustomization, onToggleHistory, onSearch, onEscape }: {
    onCopyAsSVG?: () => void;
    onCopyAsJSX?: () => void;
    onCopyAsImport?: () => void;
    onDownload?: () => void;
    onToggleFavorite?: () => void;
    onToggleCustomization?: () => void;
    onToggleHistory?: () => void;
    onSearch?: () => void;
    onEscape?: () => void;
}): {
    getShortcutGroups: () => ShortcutGroup[];
    isHelpOpen: boolean;
    toggleHelp: () => void;
};
//# sourceMappingURL=useKeyboardShortcuts.d.ts.map
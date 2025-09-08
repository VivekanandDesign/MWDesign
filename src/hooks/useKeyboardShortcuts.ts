import { useEffect, useCallback, useState } from 'react';

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

export function useKeyboardShortcuts() {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [lastPressedKey, setLastPressedKey] = useState<string>('');

  const addShortcut = useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts(prev => [...prev, shortcut]);
  }, []);

  const removeShortcut = useCallback((key: string) => {
    setShortcuts(prev => prev.filter(s => s.key !== key));
  }, []);

  const clearShortcuts = useCallback(() => {
    setShortcuts([]);
  }, []);

  const toggleHelp = useCallback(() => {
    setIsHelpOpen(prev => !prev);
  }, []);

  const checkShortcut = useCallback((event: KeyboardEvent, shortcut: KeyboardShortcut): boolean => {
    const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
    const ctrlMatches = (shortcut.ctrlKey || false) === event.ctrlKey;
    const metaMatches = (shortcut.metaKey || false) === event.metaKey;
    const shiftMatches = (shortcut.shiftKey || false) === event.shiftKey;
    const altMatches = (shortcut.altKey || false) === event.altKey;

    return keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches;
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Show which key was pressed for debugging
    setLastPressedKey(formatKeyCombo(event));

    // Find and execute matching shortcut
    const matchingShortcut = shortcuts.find(shortcut => checkShortcut(event, shortcut));
    
    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.action();
    }
  }, [shortcuts, checkShortcut]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const getShortcutGroups = useCallback((): ShortcutGroup[] => {
    const groups: Record<string, KeyboardShortcut[]> = {};
    
    shortcuts.forEach(shortcut => {
      const category = getShortcutCategory(shortcut);
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(shortcut);
    });

    return Object.entries(groups).map(([name, shortcuts]) => ({
      name,
      shortcuts: shortcuts.sort((a, b) => a.key.localeCompare(b.key))
    }));
  }, [shortcuts]);

  return {
    shortcuts,
    isHelpOpen,
    lastPressedKey,
    addShortcut,
    removeShortcut,
    clearShortcuts,
    toggleHelp,
    getShortcutGroups
  };
}

// Icon-specific keyboard shortcuts hook
export function useIconKeyboardShortcuts({
  onCopyAsSVG,
  onCopyAsJSX,
  onCopyAsImport,
  onDownload,
  onToggleFavorite,
  onToggleCustomization,
  onToggleHistory,
  onSearch,
  onEscape
}: {
  onCopyAsSVG?: () => void;
  onCopyAsJSX?: () => void;
  onCopyAsImport?: () => void;
  onDownload?: () => void;
  onToggleFavorite?: () => void;
  onToggleCustomization?: () => void;
  onToggleHistory?: () => void;
  onSearch?: () => void;
  onEscape?: () => void;
}) {
  const { addShortcut, clearShortcuts, getShortcutGroups, isHelpOpen, toggleHelp } = useKeyboardShortcuts();

  useEffect(() => {
    clearShortcuts();

    // Copy shortcuts
    if (onCopyAsSVG) {
      addShortcut({
        key: 's',
        ctrlKey: true,
        description: 'Copy as SVG',
        action: onCopyAsSVG
      });
    }

    if (onCopyAsJSX) {
      addShortcut({
        key: 'j',
        ctrlKey: true,
        description: 'Copy as JSX',
        action: onCopyAsJSX
      });
    }

    if (onCopyAsImport) {
      addShortcut({
        key: 'i',
        ctrlKey: true,
        description: 'Copy as Import',
        action: onCopyAsImport
      });
    }

    if (onDownload) {
      addShortcut({
        key: 'd',
        ctrlKey: true,
        description: 'Download SVG',
        action: onDownload
      });
    }

    // Favorite shortcut
    if (onToggleFavorite) {
      addShortcut({
        key: 'f',
        ctrlKey: true,
        description: 'Toggle Favorite',
        action: onToggleFavorite
      });
    }

    if (onToggleCustomization) {
      addShortcut({
        key: 'c',
        ctrlKey: true,
        shiftKey: true,
        description: 'Toggle Customization Panel',
        action: onToggleCustomization
      });
    }

    if (onToggleHistory) {
      addShortcut({
        key: 'h',
        ctrlKey: true,
        description: 'Toggle History Panel',
        action: onToggleHistory
      });
    }

    // Search shortcut
    if (onSearch) {
      addShortcut({
        key: '/',
        description: 'Focus Search',
        action: onSearch
      });
    }

    // Escape shortcut
    if (onEscape) {
      addShortcut({
        key: 'Escape',
        description: 'Close Panels/Deselect',
        action: onEscape
      });
    }

    // Help shortcut
    addShortcut({
      key: '?',
      description: 'Show Keyboard Shortcuts',
      action: toggleHelp
    });

  }, [
    onCopyAsSVG, onCopyAsJSX, onCopyAsImport, onDownload,
    onToggleFavorite, onToggleCustomization, onToggleHistory,
    onSearch, onEscape, addShortcut, clearShortcuts, toggleHelp
  ]);

  return {
    getShortcutGroups,
    isHelpOpen,
    toggleHelp
  };
}

function formatKeyCombo(event: KeyboardEvent): string {
  const parts = [];
  
  if (event.ctrlKey) parts.push('Ctrl');
  if (event.metaKey) parts.push('Cmd');
  if (event.altKey) parts.push('Alt');
  if (event.shiftKey) parts.push('Shift');
  
  parts.push(event.key);
  
  return parts.join(' + ');
}

function getShortcutCategory(shortcut: KeyboardShortcut): string {
  if (shortcut.description.toLowerCase().includes('copy')) return 'Copy Actions';
  if (shortcut.description.toLowerCase().includes('select')) return 'Selection';
  if (shortcut.description.toLowerCase().includes('toggle')) return 'Toggles';
  if (shortcut.description.toLowerCase().includes('search')) return 'Navigation';
  return 'General';
}

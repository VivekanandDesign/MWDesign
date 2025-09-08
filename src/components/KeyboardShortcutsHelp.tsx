import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Separator } from './ui/Separator';
import { Keyboard, X } from 'lucide-react';
import { useIconKeyboardShortcuts, ShortcutGroup } from '../hooks/useKeyboardShortcuts';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function KeyboardShortcutsHelp({ isOpen, onClose, className = '' }: KeyboardShortcutsHelpProps) {
  const { getShortcutGroups } = useIconKeyboardShortcuts({});

  if (!isOpen) return null;

  const shortcutGroups = getShortcutGroups();

  const formatShortcut = (shortcut: any) => {
    const parts = [];
    
    if (shortcut.metaKey) parts.push('⌘');
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.shiftKey) parts.push('⇧');
    
    // Format key names
    let keyName = shortcut.key;
    if (keyName === ' ') keyName = 'Space';
    if (keyName === 'Escape') keyName = 'Esc';
    if (keyName === '/') keyName = '/';
    if (keyName === '?') keyName = '?';
    
    parts.push(keyName);
    
    return parts;
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Keyboard className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm" className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Use these keyboard shortcuts to work faster with icons
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Default Shortcuts */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Copy Actions</h3>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Copy as SVG</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">S</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Copy as JSX</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">J</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Copy as Import</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">I</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Download SVG</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">D</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Selection Shortcuts */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Selection</h3>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Toggle Selection (Batch Mode)</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Space</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Select All</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">A</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Deselect All</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">⇧</Badge>
                  <Badge variant="outline">A</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Mode Toggles */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Modes & Panels</h3>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Toggle Batch Mode</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">B</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Toggle Customization Panel</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">⇧</Badge>
                  <Badge variant="outline">C</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Toggle History Panel</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">H</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Toggle Favorite</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Ctrl</Badge>
                  <Badge variant="outline">F</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Focus Search</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">/</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Close Panels / Deselect</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">Esc</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Show This Help</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">?</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Shortcuts */}
          {shortcutGroups.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-4">Active Shortcuts</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  These shortcuts are currently active based on your context
                </div>
                {shortcutGroups.map((group: ShortcutGroup) => (
                  <div key={group.name} className="mb-4">
                    <h4 className="font-medium mb-2">{group.name}</h4>
                    <div className="grid gap-2">
                      {group.shortcuts.map((shortcut: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <span className="text-sm">{shortcut.description}</span>
                          <div className="flex items-center gap-1">
                            {formatShortcut(shortcut).map((part: string, partIndex: number) => (
                              <Badge key={partIndex} variant="outline" className="text-xs">
                                {part}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Tip: Press <Badge variant="outline" className="mx-1">?</Badge> anytime to see available shortcuts
          </div>
        </div>
      </Card>
    </div>
  );
}

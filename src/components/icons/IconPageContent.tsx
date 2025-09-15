'use client';

import React, { useState } from 'react';
import { IconQuickStart } from '@/components/icons/IconQuickStart';
import { IconBrowser } from '@/components/icons/IconBrowser';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download, Copy } from 'lucide-react';

type IconPageMode = 'quickstart' | 'browser';

export function IconPageContent() {
  const [mode, setMode] = useState<IconPageMode>('quickstart');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [showSelection, setShowSelection] = useState(false);
  
  const handleIconSelect = (iconName: string) => {
    if (showSelection) {
      setSelectedIcons(prev => 
        prev.includes(iconName) 
          ? prev.filter(i => i !== iconName)
          : [...prev, iconName]
      );
    } else {
      // Single icon selection - copy to clipboard or other action
      navigator.clipboard.writeText(iconName);
      console.log('Icon selected:', iconName);
    }
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setMode('browser');
  };
  
  const handleViewAllIcons = () => {
    setMode('browser');
    setSelectedCategory('all');
  };
  
  const handleBackToQuickStart = () => {
    setMode('quickstart');
    setSelectedCategory('all');
  };
  
  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with mode controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {mode === 'browser' && (
              <Button
                variant="outline"
                onClick={handleBackToQuickStart}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Quick Start
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                {mode === 'quickstart' ? 'Icon Quick Start' : 'Icon Browser'}
              </h1>
              <p className="text-mw-gray-600 dark:text-mw-gray-300">
                {mode === 'quickstart' 
                  ? 'Start with curated icons, explore when you need more'
                  : 'Advanced search and filtering across all icons'
                }
              </p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {mode === 'browser' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowSelection(!showSelection)}
                  className="flex items-center gap-2"
                >
                  {showSelection ? 'Single Select' : 'Multi Select'}
                </Button>
                
                {showSelection && selectedIcons.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedIcons.join(', '));
                      }}
                      className="flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copy ({selectedIcons.length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Export functionality
                        const exportData = {
                          icons: selectedIcons,
                          timestamp: new Date().toISOString()
                        };
                        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                          type: 'application/json'
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'selected-icons.json';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      Export
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Content based on mode */}
        {mode === 'quickstart' ? (
          <IconQuickStart
            onViewAllIcons={handleViewAllIcons}
            onCategorySelect={handleCategorySelect}
            onIconSelect={handleIconSelect}
          />
        ) : (
          <IconBrowser
            onIconSelect={handleIconSelect}
            selectedIcons={selectedIcons}
            showSelection={showSelection}
          />
        )}
        
        {/* Selection summary */}
        {showSelection && selectedIcons.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg p-4 max-w-sm">
            <h4 className="font-semibold text-mw-gray-900 dark:text-white mb-2">
              Selected Icons ({selectedIcons.length})
            </h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedIcons.map((iconName) => (
                <div
                  key={iconName}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-mw-gray-600 dark:text-mw-gray-300">
                    {iconName}
                  </span>
                  <button
                    onClick={() => setSelectedIcons(prev => prev.filter(i => i !== iconName))}
                    className="text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={() => setSelectedIcons([])}
                variant="outline"
                className="flex-1"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

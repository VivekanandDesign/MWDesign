import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Download, Copy, Heart, Settings, ChevronDown } from 'lucide-react';
import { useCopyIcon } from '../hooks/useCopyIcon';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { useIconCustomization } from '../hooks/useIconCustomization';
import { CopyType } from '../utils/svgExtractor';
export function EnhancedCopyIconButton({ iconName, className = '', variant = 'primary', size = 'sm', showFavorite = true, showCustomize = true, onCustomizeClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const { copyState, copyIcon, downloadIcon } = useCopyIcon();
    const { toggleFavorite, isFavorite, addToHistory } = useCopyHistory();
    const { customization, preferences, generateCustomizedSVG, generateCustomizedJSX, generateCustomizedImport } = useIconCustomization();
    const copyFormats = [
        { value: CopyType.SVG, label: 'SVG', description: 'Copy SVG markup' },
        { value: CopyType.JSX, label: 'JSX', description: 'Copy JSX component' },
        { value: CopyType.IMPORT, label: 'Import', description: 'Copy import statement' },
        { value: CopyType.DOWNLOAD, label: 'Download', description: 'Download SVG file' }
    ];
    const handleCopy = async (type) => {
        try {
            const options = {
                size: customization.size,
                strokeWidth: customization.strokeWidth,
                color: customization.color,
                fillColor: customization.fillColor,
                className: customization.className
            };
            if (type === CopyType.DOWNLOAD) {
                await downloadIcon(iconName, options);
            }
            else {
                await copyIcon(iconName, type, options);
            }
            // Add to history
            let format = 'svg';
            if (type === CopyType.JSX)
                format = 'jsx';
            else if (type === CopyType.IMPORT)
                format = 'import';
            else if (type === CopyType.DOWNLOAD)
                format = 'download';
            addToHistory(iconName, format, '');
            setIsOpen(false);
        }
        catch (error) {
            console.error('Copy failed:', error);
        }
    };
    const handleQuickCopy = () => {
        const preferredType = preferences.preferredFormat === 'jsx' ? CopyType.JSX :
            preferences.preferredFormat === 'import' ? CopyType.IMPORT :
                CopyType.SVG;
        handleCopy(preferredType);
    };
    return (<div className={`relative ${className}`}>
      {/* Main Button */}
      <div className="flex items-center">
        {/* Quick Copy Button */}
        <Button onClick={handleQuickCopy} variant={variant} size={size} disabled={copyState.isLoading} className="flex items-center gap-2 rounded-r-none border-r border-white/20">
          <Copy className="w-4 h-4"/>
          {preferences.preferredFormat.toUpperCase()}
        </Button>

        {/* Dropdown Toggle */}
        <Button onClick={() => setIsOpen(!isOpen)} variant={variant} size={size} disabled={copyState.isLoading} className="px-2 rounded-l-none">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
        </Button>

        {/* Favorite Button */}
        {showFavorite && (<Button onClick={() => toggleFavorite(iconName)} variant="ghost" size={size} className="ml-1 p-1">
            <Heart className={`w-4 h-4 ${isFavorite(iconName)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-400'}`}/>
          </Button>)}

        {/* Customize Button */}
        {showCustomize && (<Button onClick={onCustomizeClick} variant="ghost" size={size} className="ml-1 p-1">
            <Settings className="w-4 h-4 text-gray-400 hover:text-blue-400"/>
          </Button>)}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (<div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">
              Copy Options for {iconName}
            </div>
            
            {copyFormats.map((format) => (<button key={format.value} onClick={() => handleCopy(format.value)} disabled={copyState.isLoading} className="w-full flex items-start justify-between px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50">
                <div className="flex-1">
                  <div className="font-medium">{format.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {format.description}
                  </div>
                </div>
                
                {format.value === CopyType.DOWNLOAD ? (<Download className="w-4 h-4 mt-0.5 text-gray-400"/>) : (<Copy className="w-4 h-4 mt-0.5 text-gray-400"/>)}
              </button>))}

            {/* Customization Preview */}
            {(customization.size !== 24 || customization.strokeWidth !== 2 || customization.color !== 'currentColor') && (<div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 px-2 py-1">
                  Custom Settings Applied
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                  Size: {customization.size}px, Stroke: {customization.strokeWidth}px
                  {customization.color !== 'currentColor' && `, Color: ${customization.color}`}
                </div>
              </div>)}
          </div>
        </div>)}

      {/* Click Outside Handler */}
      {isOpen && (<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}/>)}
    </div>);
}
// Simplified version for basic use cases
export function SimpleCopyButton({ iconName, type = CopyType.JSX, className = '', variant = 'outline', size = 'sm' }) {
    const { copyState, copyIcon, downloadIcon } = useCopyIcon();
    const { addToHistory } = useCopyHistory();
    const handleCopy = async () => {
        try {
            if (type === CopyType.DOWNLOAD) {
                await downloadIcon(iconName);
            }
            else {
                await copyIcon(iconName, type);
            }
            // Add to history
            let format = 'svg';
            if (type === CopyType.JSX)
                format = 'jsx';
            else if (type === CopyType.IMPORT)
                format = 'import';
            else if (type === CopyType.DOWNLOAD)
                format = 'download';
            addToHistory(iconName, format, '');
        }
        catch (error) {
            console.error('Copy failed:', error);
        }
    };
    const getIcon = () => {
        switch (type) {
            case CopyType.DOWNLOAD:
                return <Download className="w-4 h-4"/>;
            default:
                return <Copy className="w-4 h-4"/>;
        }
    };
    const getLabel = () => {
        switch (type) {
            case CopyType.SVG:
                return 'SVG';
            case CopyType.JSX:
                return 'JSX';
            case CopyType.IMPORT:
                return 'IMPORT';
            case CopyType.DOWNLOAD:
                return 'DOWNLOAD';
            default:
                return 'COPY';
        }
    };
    return (<Button onClick={handleCopy} variant={variant} size={size} disabled={copyState.isLoading} className={`flex items-center gap-2 ${className}`}>
      {getIcon()}
      {getLabel()}
    </Button>);
}
//# sourceMappingURL=EnhancedCopyIconButton.jsx.map
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Tooltip } from './ui/Tooltip';
import { Copy, Code, Download, Check, ExternalLink } from 'lucide-react';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { useIconCustomization } from '../hooks/useIconCustomization';
import { generateIconCode } from '../utils/iconCodeGenerator';
export function IconActionButtons({ iconName, className = '' }) {
    const [copiedState, setCopiedState] = useState({});
    const { addToHistory } = useCopyHistory();
    const { customization } = useIconCustomization();
    const handleCopy = async (type, content) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedState(prev => (Object.assign(Object.assign({}, prev), { [type]: true })));
            // Add to history - map URL type to a valid CopyFormat
            const historyType = type === 'url' ? 'svg' : type;
            addToHistory(iconName, historyType, content);
            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopiedState(prev => (Object.assign(Object.assign({}, prev), { [type]: false })));
            }, 2000);
        }
        catch (error) {
            console.error('Failed to copy:', error);
        }
    };
    const handleDownload = (type) => {
        const code = generateIconCode(iconName, 'svg', customization);
        let blob;
        let filename;
        switch (type) {
            case 'svg':
                blob = new Blob([code], { type: 'image/svg+xml' });
                filename = `${iconName}.svg`;
                break;
            case 'png':
                // For PNG, we'd need to convert SVG to canvas then to PNG
                // This is a simplified implementation
                blob = new Blob([code], { type: 'image/svg+xml' });
                filename = `${iconName}.png`;
                break;
            case 'pdf':
                // For PDF, we'd need a PDF library
                blob = new Blob([code], { type: 'application/pdf' });
                filename = `${iconName}.pdf`;
                break;
            default:
                return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        // Add to history - use 'download' format for all download types
        addToHistory(iconName, 'download', code);
    };
    const svgCode = generateIconCode(iconName, 'svg', customization);
    const jsxCode = generateIconCode(iconName, 'jsx', customization);
    const iconUrl = `${window.location.origin}/icons/${iconName}.svg`;
    return (<div className={`space-y-4 ${className}`}>
      {/* Primary Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Tooltip content="Copy SVG code">
          <Button onClick={() => handleCopy('svg', svgCode)} variant="outline" className="flex-1 h-12" disabled={copiedState.svg}>
            {copiedState.svg ? (<Check className="w-4 h-4 mr-2 text-green-500"/>) : (<Copy className="w-4 h-4 mr-2"/>)}
            {copiedState.svg ? 'Copied!' : 'SVG'}
          </Button>
        </Tooltip>

        <Tooltip content="Copy JSX/React code">
          <Button onClick={() => handleCopy('jsx', jsxCode)} variant="outline" className="flex-1 h-12" disabled={copiedState.jsx}>
            {copiedState.jsx ? (<Check className="w-4 h-4 mr-2 text-green-500"/>) : (<Code className="w-4 h-4 mr-2"/>)}
            {copiedState.jsx ? 'Copied!' : 'JSX'}
          </Button>
        </Tooltip>

        <Tooltip content="Download SVG file">
          <Button onClick={() => handleDownload('svg')} variant="outline" className="flex-1 h-12">
            <Download className="w-4 h-4 mr-2"/>
            Download
          </Button>
        </Tooltip>
      </div>

      {/* Secondary Actions */}
      <div className="space-y-3">
        {/* URL Copy */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-0 flex-1 truncate">
            {iconUrl}
          </span>
          <Button onClick={() => handleCopy('url', iconUrl)} variant="ghost" size="sm" disabled={copiedState.url}>
            {copiedState.url ? (<Check className="w-3 h-3 text-green-500"/>) : (<ExternalLink className="w-3 h-3"/>)}
          </Button>
        </div>

        {/* Download Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Download as:
          </span>
          <div className="flex gap-2">
            <Button onClick={() => handleDownload('svg')} variant="ghost" size="sm" className="text-xs px-2 py-1">
              SVG
            </Button>
            <Button onClick={() => handleDownload('png')} variant="ghost" size="sm" className="text-xs px-2 py-1">
              PNG
            </Button>
            <Button onClick={() => handleDownload('pdf')} variant="ghost" size="sm" className="text-xs px-2 py-1">
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Format</span>
            <div className="flex gap-1 mt-1">
              <Badge variant="outline" className="text-xs">SVG</Badge>
              <Badge variant="outline" className="text-xs">Vector</Badge>
            </div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">License</span>
            <div className="font-medium">MIT</div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap gap-4">
          <span><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">⌘C</kbd> Copy SVG</span>
          <span><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">⌘J</kbd> Copy JSX</span>
          <span><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">⌘D</kbd> Download</span>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=IconActionButtons.jsx.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [_jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsx(Tooltip, { content: "Copy SVG code", children: _jsxs(Button, { onClick: () => handleCopy('svg', svgCode), variant: "outline", className: "flex-1 h-12", disabled: copiedState.svg, children: [copiedState.svg ? (_jsx(Check, { className: "w-4 h-4 mr-2 text-green-500" })) : (_jsx(Copy, { className: "w-4 h-4 mr-2" })), copiedState.svg ? 'Copied!' : 'SVG'] }) }), _jsx(Tooltip, { content: "Copy JSX/React code", children: _jsxs(Button, { onClick: () => handleCopy('jsx', jsxCode), variant: "outline", className: "flex-1 h-12", disabled: copiedState.jsx, children: [copiedState.jsx ? (_jsx(Check, { className: "w-4 h-4 mr-2 text-green-500" })) : (_jsx(Code, { className: "w-4 h-4 mr-2" })), copiedState.jsx ? 'Copied!' : 'JSX'] }) }), _jsx(Tooltip, { content: "Download SVG file", children: _jsxs(Button, { onClick: () => handleDownload('svg'), variant: "outline", className: "flex-1 h-12", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Download"] }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400 min-w-0 flex-1 truncate", children: iconUrl }), _jsx(Button, { onClick: () => handleCopy('url', iconUrl), variant: "ghost", size: "sm", disabled: copiedState.url, children: copiedState.url ? (_jsx(Check, { className: "w-3 h-3 text-green-500" })) : (_jsx(ExternalLink, { className: "w-3 h-3" })) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Download as:" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: () => handleDownload('svg'), variant: "ghost", size: "sm", className: "text-xs px-2 py-1", children: "SVG" }), _jsx(Button, { onClick: () => handleDownload('png'), variant: "ghost", size: "sm", className: "text-xs px-2 py-1", children: "PNG" }), _jsx(Button, { onClick: () => handleDownload('pdf'), variant: "ghost", size: "sm", className: "text-xs px-2 py-1", children: "PDF" })] })] })] }), _jsx("div", { className: "pt-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Format" }), _jsxs("div", { className: "flex gap-1 mt-1", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: "SVG" }), _jsx(Badge, { variant: "outline", className: "text-xs", children: "Vector" })] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "License" }), _jsx("div", { className: "font-medium", children: "MIT" })] })] }) }), _jsx("div", { className: "pt-2 text-xs text-gray-500 dark:text-gray-400", children: _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("span", { children: [_jsx("kbd", { className: "px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded", children: "\u2318C" }), " Copy SVG"] }), _jsxs("span", { children: [_jsx("kbd", { className: "px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded", children: "\u2318J" }), " Copy JSX"] }), _jsxs("span", { children: [_jsx("kbd", { className: "px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded", children: "\u2318D" }), " Download"] })] }) })] }));
}
//# sourceMappingURL=IconActionButtons.js.map
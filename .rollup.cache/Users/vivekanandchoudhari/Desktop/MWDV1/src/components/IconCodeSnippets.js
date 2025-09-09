import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CodeSnippet } from './CodeSnippet';
import { Copy, Check, Download } from 'lucide-react';
import { useIconCustomization } from '../hooks/useIconCustomization';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { generateCodeSnippets } from '../utils/iconCodeGenerator';
export function IconCodeSnippets({ iconName, className = '' }) {
    const [copiedState, setCopiedState] = useState({});
    const { customization } = useIconCustomization();
    const { addToHistory } = useCopyHistory();
    const codeSnippets = generateCodeSnippets(iconName, {
        size: customization.size,
        color: customization.color,
        strokeWidth: customization.strokeWidth,
        fillColor: customization.fillColor
    });
    const handleCopy = async (type, content) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedState(prev => (Object.assign(Object.assign({}, prev), { [type]: true })));
            // Add to history
            addToHistory(iconName, type, content);
            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopiedState(prev => (Object.assign(Object.assign({}, prev), { [type]: false })));
            }, 2000);
        }
        catch (error) {
            console.error('Failed to copy:', error);
        }
    };
    const handleDownload = (filename, content) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    const codeBlocks = [
        {
            id: 'svg',
            title: 'SVG',
            description: 'Raw SVG markup',
            content: codeSnippets.svg,
            language: 'xml',
            filename: `${iconName}.svg`
        },
        {
            id: 'jsx',
            title: 'React/JSX',
            description: 'React component',
            content: codeSnippets.jsx,
            language: 'jsx',
            filename: `${iconName}.jsx`
        },
        {
            id: 'html',
            title: 'HTML',
            description: 'HTML with inline styles',
            content: codeSnippets.html,
            language: 'html',
            filename: `${iconName}.html`
        },
        {
            id: 'css',
            title: 'CSS',
            description: 'CSS styles',
            content: codeSnippets.css,
            language: 'css',
            filename: `${iconName}.css`
        },
        {
            id: 'tailwind',
            title: 'Tailwind',
            description: 'Tailwind CSS classes',
            content: codeSnippets.tailwind,
            language: 'html',
            filename: `${iconName}-tailwind.html`
        }
    ];
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Code Snippets" }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [codeBlocks.length, " formats"] })] }), _jsx("div", { className: "space-y-4", children: codeBlocks.map((block) => (_jsxs("div", { className: "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-900 dark:text-white", children: block.title }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: block.description })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { onClick: () => handleDownload(block.filename, block.content), variant: "ghost", size: "sm", className: "text-xs", children: [_jsx(Download, { className: "w-3 h-3 mr-1" }), "Download"] }), _jsx(Button, { onClick: () => handleCopy(block.id, block.content), variant: "ghost", size: "sm", className: "text-xs", disabled: copiedState[block.id], children: copiedState[block.id] ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "w-3 h-3 mr-1 text-green-500" }), "Copied!"] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "w-3 h-3 mr-1" }), "Copy"] })) })] })] }), _jsx("div", { className: "p-0 max-h-96 overflow-hidden", children: _jsx(CodeSnippet, { code: block.content, language: block.language }) })] }, block.id))) }), _jsxs("div", { className: "mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-blue-900 dark:text-blue-300 mb-2", children: "Usage Instructions" }), _jsxs("div", { className: "text-sm text-blue-800 dark:text-blue-200 space-y-2", children: [_jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "SVG:" }), " Use directly in HTML or save as .svg file"] }), _jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "React/JSX:" }), " Copy component into your React project"] }), _jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "HTML/CSS:" }), " Traditional web development approach"] }), _jsxs("p", { children: ["\u2022 ", _jsx("strong", { children: "Tailwind:" }), " Use with Tailwind CSS framework"] })] })] }), _jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("strong", { children: "Note:" }), " All code snippets are generated with your current customization settings: Size ", customization.size, "px, Stroke ", customization.strokeWidth, "px, Color ", customization.color, customization.fillColor && customization.fillColor !== 'none' && `, Fill ${customization.fillColor}`, customization.className && `, Class "${customization.className}"`, "."] })] }));
}
//# sourceMappingURL=IconCodeSnippets.js.map
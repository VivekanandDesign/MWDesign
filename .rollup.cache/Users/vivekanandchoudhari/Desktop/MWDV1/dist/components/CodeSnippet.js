'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, Code } from 'lucide-react';
import { Button } from '@/components/ui/Button';
export function CodeSnippet({ code, language = 'tsx', title, defaultExpanded = false }) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs("div", { className: "relative", children: [title && (_jsx("div", { className: "text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2", children: title })), _jsx("div", { className: "mb-2", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsExpanded(!isExpanded), className: "inline-flex items-center space-x-2", children: [isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" })), _jsx(Code, { className: "h-4 w-4" }), _jsx("span", { children: isExpanded ? 'Hide Code' : 'Show Code' })] }) }), isExpanded && (_jsxs("div", { className: "relative bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg p-4 pr-12", children: [_jsx("pre", { className: "text-sm text-mw-gray-800 dark:text-mw-gray-200 overflow-x-auto", children: _jsx("code", { children: code }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "absolute top-2 right-2 h-8 w-8 p-0", onClick: copyToClipboard, children: copied ? (_jsx(Check, { className: "h-4 w-4 text-green-600" })) : (_jsx(Copy, { className: "h-4 w-4" })) })] }))] }));
}
//# sourceMappingURL=CodeSnippet.js.map
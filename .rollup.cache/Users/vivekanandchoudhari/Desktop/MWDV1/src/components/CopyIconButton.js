import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Copy, Check, ChevronDown, Download, Code, FileText, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyType } from '@/utils/svgExtractor';
import { useCopyIcon } from '@/hooks/useCopyIcon';
export const CopyIconButton = ({ iconName, variant = 'primary', size = 'sm', className = '', showDropdown = true, iconSize = 24, strokeWidth = 2 }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { copyState, copyIcon, downloadIcon } = useCopyIcon();
    const dropdownRef = useRef(null);
    const isIconCopied = copyState.copiedIcon === iconName;
    const isLoading = copyState.isLoading;
    const handleCopy = async (type) => {
        const options = {
            size: iconSize,
            strokeWidth: strokeWidth,
            removeIds: true,
            addClasses: true
        };
        if (type === CopyType.DOWNLOAD) {
            await downloadIcon(iconName, options);
        }
        else {
            await copyIcon(iconName, type, options);
        }
        setIsDropdownOpen(false);
    };
    const getButtonText = () => {
        if (isLoading)
            return 'Copying...';
        if (isIconCopied) {
            switch (copyState.copiedType) {
                case CopyType.SVG: return 'SVG Copied!';
                case CopyType.IMPORT: return 'Import Copied!';
                case CopyType.JSX: return 'JSX Copied!';
                case CopyType.DOWNLOAD: return 'Downloaded!';
                default: return 'Copied!';
            }
        }
        return 'Copy SVG';
    };
    const getButtonIcon = () => {
        if (isLoading)
            return _jsx(Loader2, { className: "w-3 h-3 animate-spin" });
        if (isIconCopied)
            return _jsx(Check, { className: "w-3 h-3" });
        return _jsx(Copy, { className: "w-3 h-3" });
    };
    const copyOptions = [
        {
            type: CopyType.SVG,
            label: 'Copy SVG Code',
            icon: _jsx(FileText, { className: "w-4 h-4" }),
            description: 'Raw SVG markup'
        },
        {
            type: CopyType.JSX,
            label: 'Copy JSX Component',
            icon: _jsx(Code, { className: "w-4 h-4" }),
            description: 'React JSX format'
        },
        {
            type: CopyType.IMPORT,
            label: 'Copy Import Statement',
            icon: _jsx(Copy, { className: "w-4 h-4" }),
            description: 'Lucide import'
        },
        {
            type: CopyType.DOWNLOAD,
            label: 'Download SVG File',
            icon: _jsx(Download, { className: "w-4 h-4" }),
            description: 'Save as .svg file'
        }
    ];
    if (!showDropdown) {
        // Simple copy button without dropdown
        return (_jsxs(Button, { size: size, variant: variant, onClick: () => handleCopy(CopyType.SVG), disabled: isLoading, className: `${className} ${isIconCopied ? 'bg-green-600 hover:bg-green-700' : ''}`, title: "Copy SVG code", children: [getButtonIcon(), size !== 'sm' && _jsx("span", { className: "ml-1", children: getButtonText() })] }));
    }
    return (_jsxs("div", { className: `relative ${className}`, ref: dropdownRef, children: [_jsxs("div", { className: "flex", children: [_jsxs(Button, { size: size, variant: variant, onClick: () => handleCopy(CopyType.SVG), disabled: isLoading, className: `rounded-r-none border-r-0 ${isIconCopied ? 'bg-green-600 hover:bg-green-700 border-green-600' : ''}`, title: "Copy SVG code", children: [getButtonIcon(), size !== 'sm' && _jsx("span", { className: "ml-1", children: getButtonText() })] }), _jsx(Button, { size: size, variant: variant, onClick: () => setIsDropdownOpen(!isDropdownOpen), className: `rounded-l-none px-2 ${isIconCopied ? 'bg-green-600 hover:bg-green-700 border-green-600' : ''}`, title: "More copy options", children: _jsx(ChevronDown, { className: `w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}` }) })] }), isDropdownOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: () => setIsDropdownOpen(false) }), _jsx("div", { className: "absolute top-full left-0 mt-1 w-56 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg z-50", children: _jsx("div", { className: "py-1", children: copyOptions.map((option) => (_jsxs("button", { onClick: () => handleCopy(option.type), disabled: isLoading, className: "w-full px-4 py-3 text-left hover:bg-mw-gray-50 dark:hover:bg-mw-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-start gap-3 transition-colors", children: [_jsx("span", { className: "text-mw-gray-600 dark:text-mw-gray-400 mt-0.5", children: option.icon }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-mw-gray-900 dark:text-white", children: option.label }), _jsx("div", { className: "text-xs text-mw-gray-500 dark:text-mw-gray-400", children: option.description })] })] }, option.type))) }) })] })), copyState.error && (_jsx("div", { className: "absolute top-full left-0 mt-2 w-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 shadow-lg z-50", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-red-800 dark:text-red-200", children: "Copy Failed" }), _jsx("div", { className: "text-xs text-red-600 dark:text-red-400", children: copyState.error })] })] }) }))] }));
};
/**
 * Simple icon copy button for minimal use cases
 */
export const SimpleCopyButton = ({ iconName, copyType = CopyType.SVG, size = 16, className = '' }) => {
    const { copyState, copyIcon } = useCopyIcon();
    const isIconCopied = copyState.copiedIcon === iconName && copyState.copiedType === copyType;
    return (_jsx("button", { onClick: () => copyIcon(iconName, copyType, { size }), className: `inline-flex items-center justify-center w-6 h-6 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors ${className}`, title: `Copy ${copyType.toUpperCase()}`, children: isIconCopied ? (_jsx(Check, { className: "w-3 h-3 text-green-600" })) : (_jsx(Copy, { className: "w-3 h-3 text-mw-gray-600 dark:text-mw-gray-400" })) }));
};
//# sourceMappingURL=CopyIconButton.js.map
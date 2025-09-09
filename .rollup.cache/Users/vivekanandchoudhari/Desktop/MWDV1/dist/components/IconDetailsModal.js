import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { IconPreview } from './IconPreview';
import { IconActionButtons } from './IconActionButtons';
import { IconCustomizationControls } from './IconCustomizationControls';
import { IconCodeSnippets } from './IconCodeSnippets';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { useIconCustomization } from '../hooks/useIconCustomization';
import { getIconsData } from '../data/icons';
import { formatIconName, getIconDescription } from '../utils/iconNameFormatter';
export function IconDetailsModal({ isOpen, iconName, activeTab, onClose, onTabChange, onIconChange }) {
    var _a;
    const modalRef = useRef(null);
    const { isFavorite, toggleFavorite } = useCopyHistory();
    const { customization } = useIconCustomization();
    // Get icon metadata
    const iconData = getIconsData();
    const iconCategory = (_a = Object.entries(iconData.categories).find(([_, cat]) => cat.icons.includes(iconName || ''))) === null || _a === void 0 ? void 0 : _a[1];
    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);
    const currentIconIndex = (iconCategory === null || iconCategory === void 0 ? void 0 : iconCategory.icons.indexOf(iconName || '')) || 0;
    const canNavigatePrev = currentIconIndex > 0;
    const canNavigateNext = currentIconIndex < ((iconCategory === null || iconCategory === void 0 ? void 0 : iconCategory.icons.length) || 0) - 1;
    const handleNavigatePrev = () => {
        if (canNavigatePrev && iconCategory && onIconChange) {
            const prevIcon = iconCategory.icons[currentIconIndex - 1];
            onIconChange(prevIcon);
        }
    };
    const handleNavigateNext = () => {
        if (canNavigateNext && iconCategory && onIconChange) {
            const nextIcon = iconCategory.icons[currentIconIndex + 1];
            onIconChange(nextIcon);
        }
    };
    if (!isOpen || !iconName)
        return null;
    const modalContent = (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: _jsxs("div", { ref: modalRef, className: "relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { children: [_jsx("h2", { id: "modal-title", className: "text-xl font-semibold text-gray-900 dark:text-white", children: formatIconName(iconName) }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: getIconDescription(iconName) }), iconCategory && (_jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: iconCategory.name }), _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [currentIconIndex + 1, " of ", iconCategory.icons.length] })] }))] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { onClick: handleNavigatePrev, disabled: !canNavigatePrev, variant: "ghost", size: "sm", className: "p-2", title: "Previous icon", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), _jsx(Button, { onClick: handleNavigateNext, disabled: !canNavigateNext, variant: "ghost", size: "sm", className: "p-2", title: "Next icon", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }), _jsx(Button, { onClick: () => toggleFavorite(iconName), variant: "ghost", size: "sm", className: "p-2", title: isFavorite(iconName) ? 'Remove from favorites' : 'Add to favorites', children: _jsx(Heart, { className: `w-4 h-4 ${isFavorite(iconName)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-400 hover:text-red-400'}` }) }), _jsx(Button, { onClick: onClose, variant: "ghost", size: "sm", className: "p-2", title: "Close modal", "data-modal-focus-first": true, children: _jsx(X, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "flex flex-col lg:flex-row max-h-[calc(90vh-80px)]", children: [_jsxs("div", { className: "flex-1 p-6 border-r border-gray-200 dark:border-gray-700", children: [_jsx(IconPreview, { iconName: iconName, customization: customization, className: "mb-6" }), _jsx(IconActionButtons, { iconName: iconName, className: "mb-4" }), _jsxs("div", { className: "mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 dark:text-white mb-2", children: "Quick Info" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Category" }), _jsx("div", { className: "font-medium", children: (iconCategory === null || iconCategory === void 0 ? void 0 : iconCategory.name) || 'Unknown' })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Size" }), _jsxs("div", { className: "font-medium", children: [customization.size, "px"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Stroke" }), _jsxs("div", { className: "font-medium", children: [customization.strokeWidth, "px"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Color" }), _jsx("div", { className: "font-medium", children: customization.color === 'currentColor' ? 'Current' : customization.color })] })] })] })] }), _jsxs("div", { className: "flex-1 flex flex-col max-h-full", children: [_jsx("div", { className: "flex border-b border-gray-200 dark:border-gray-700", children: [
                                        { id: 'customize', label: 'Customize', shortcut: '1' },
                                        { id: 'code', label: 'Code', shortcut: '2' }
                                    ].map(tab => (_jsxs("button", { onClick: () => onTabChange(tab.id), className: `flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`, children: [tab.label, _jsxs("kbd", { className: "ml-2 px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded", children: ["\u2318", tab.shortcut] })] }, tab.id))) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [activeTab === 'customize' && (_jsx(IconCustomizationControls, { iconName: iconName })), activeTab === 'code' && (_jsx(IconCodeSnippets, { iconName: iconName }))] })] })] })] }) }));
    // Render modal in portal
    return createPortal(modalContent, document.body);
}
//# sourceMappingURL=IconDetailsModal.js.map
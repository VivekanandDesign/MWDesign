import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './ui/Button';
import { useIconCustomization } from '../hooks/useIconCustomization';
import { Palette, RotateCcw } from 'lucide-react';
export function IconCustomizationControls({ iconName, className = '' }) {
    const { customization, updateCustomization, resetCustomization } = useIconCustomization();
    const colorOptions = [
        { name: 'Current', value: 'currentColor', class: 'border-2 border-gray-300' },
        { name: 'Black', value: '#000000', class: 'bg-black' },
        { name: 'Gray', value: '#6b7280', class: 'bg-gray-500' },
        { name: 'Blue', value: '#3b82f6', class: 'bg-blue-600' },
        { name: 'Green', value: '#10b981', class: 'bg-green-600' },
        { name: 'Red', value: '#ef4444', class: 'bg-red-600' },
        { name: 'Purple', value: '#8b5cf6', class: 'bg-purple-600' },
        { name: 'Orange', value: '#f97316', class: 'bg-orange-600' },
        { name: 'Pink', value: '#ec4899', class: 'bg-pink-600' },
        { name: 'Indigo', value: '#6366f1', class: 'bg-indigo-600' }
    ];
    const fillOptions = [
        { name: 'None', value: 'none', class: 'border-2 border-gray-300' },
        { name: 'Current', value: 'currentColor', class: 'border-2 border-blue-300 bg-blue-50' },
        { name: 'Black', value: '#000000', class: 'bg-black' },
        { name: 'White', value: '#ffffff', class: 'bg-white border-2 border-gray-300' },
        { name: 'Gray', value: '#f3f4f6', class: 'bg-gray-100' }
    ];
    const sizePresets = [16, 20, 24, 28, 32, 40, 48, 64, 80, 96];
    const strokePresets = [0.5, 1, 1.5, 2, 2.5, 3];
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Customize Icon" }), _jsxs(Button, { onClick: resetCustomization, variant: "ghost", size: "sm", className: "text-xs", children: [_jsx(RotateCcw, { className: "w-3 h-3 mr-1" }), "Reset"] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-900 dark:text-white mb-3", children: ["Size: ", customization.size, "px"] }), _jsx("div", { className: "mb-3", children: _jsx("input", { type: "range", min: 12, max: 128, value: customization.size, onChange: (e) => updateCustomization({ size: parseInt(e.target.value) }), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" }) }), _jsx("div", { className: "flex flex-wrap gap-2", children: sizePresets.map((size) => (_jsxs("button", { onClick: () => updateCustomization({ size }), className: `
                px-2 py-1 text-xs rounded border transition-colors
                ${customization.size === size
                                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'border-gray-200 hover:border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400'}
              `, children: [size, "px"] }, size))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-900 dark:text-white mb-3", children: ["Stroke Width: ", customization.strokeWidth, "px"] }), _jsx("div", { className: "mb-3", children: _jsx("input", { type: "range", min: 0.5, max: 4, step: 0.25, value: customization.strokeWidth, onChange: (e) => updateCustomization({ strokeWidth: parseFloat(e.target.value) }), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" }) }), _jsx("div", { className: "flex flex-wrap gap-2", children: strokePresets.map((width) => (_jsxs("button", { onClick: () => updateCustomization({ strokeWidth: width }), className: `
                px-2 py-1 text-xs rounded border transition-colors
                ${customization.strokeWidth === width
                                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'border-gray-200 hover:border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400'}
              `, children: [width, "px"] }, width))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-900 dark:text-white mb-3", children: [_jsx(Palette, { className: "w-4 h-4 inline mr-2" }), "Stroke Color"] }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { type: "color", value: customization.color === 'currentColor' ? '#000000' : customization.color, onChange: (e) => updateCustomization({ color: e.target.value }), className: "w-12 h-8 border border-gray-300 rounded cursor-pointer" }), _jsx("input", { type: "text", value: customization.color, onChange: (e) => updateCustomization({ color: e.target.value }), placeholder: "Color value", className: "flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" })] }), _jsx("div", { className: "grid grid-cols-5 gap-2", children: colorOptions.map((color) => (_jsx("button", { onClick: () => updateCustomization({ color: color.value }), className: `
                w-full h-8 rounded-md border-2 transition-all relative
                ${customization.color === color.value
                                ? 'ring-2 ring-blue-500 ring-offset-2'
                                : 'hover:scale-105'}
                ${color.class}
              `, title: `${color.name}: ${color.value}`, children: color.value === 'currentColor' && (_jsx("span", { className: "absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600", children: "Auto" })) }, color.value))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 dark:text-white mb-3", children: "Fill Color" }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { type: "color", value: !customization.fillColor || customization.fillColor === 'none' || customization.fillColor === 'currentColor' ? '#000000' : customization.fillColor, onChange: (e) => updateCustomization({ fillColor: e.target.value }), className: "w-12 h-8 border border-gray-300 rounded cursor-pointer", disabled: !customization.fillColor || customization.fillColor === 'none' }), _jsx("input", { type: "text", value: customization.fillColor || 'none', onChange: (e) => updateCustomization({ fillColor: e.target.value }), placeholder: "Fill value", className: "flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" })] }), _jsx("div", { className: "grid grid-cols-5 gap-2", children: fillOptions.map((fill) => (_jsx("button", { onClick: () => updateCustomization({ fillColor: fill.value }), className: `
                w-full h-8 rounded-md border-2 transition-all relative
                ${customization.fillColor === fill.value
                                ? 'ring-2 ring-blue-500 ring-offset-2'
                                : 'hover:scale-105'}
                ${fill.class}
              `, title: `${fill.name}: ${fill.value}`, children: (fill.value === 'none' || fill.value === 'currentColor') && (_jsx("span", { className: "absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600", children: fill.name })) }, fill.value))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 dark:text-white mb-2", children: "CSS Class Name" }), _jsx("input", { type: "text", value: customization.className || '', onChange: (e) => updateCustomization({ className: e.target.value }), placeholder: "e.g. icon-custom my-icon", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" })] }), _jsxs("div", { className: "pt-4 border-t border-gray-200 dark:border-gray-700", children: [_jsx("h4", { className: "text-sm font-medium text-gray-900 dark:text-white mb-2", children: "Current Configuration" }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400 space-y-1", children: [_jsxs("div", { children: ["Size: ", customization.size, "px"] }), _jsxs("div", { children: ["Stroke: ", customization.strokeWidth, "px"] }), _jsxs("div", { children: ["Color: ", customization.color] }), customization.fillColor && _jsxs("div", { children: ["Fill: ", customization.fillColor] }), customization.className && _jsxs("div", { children: ["Class: ", customization.className] })] })] })] }));
}
//# sourceMappingURL=IconCustomizationControls.js.map
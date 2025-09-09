import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';
export function IconPreview({ iconName, customization, className = '' }) {
    const [showGrid, setShowGrid] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    // Add checkerboard CSS styles on client side only
    React.useEffect(() => {
        if (typeof window !== 'undefined' && !document.head.querySelector('style[data-icon-preview]')) {
            const style = document.createElement('style');
            style.setAttribute('data-icon-preview', '');
            style.textContent = `
        .bg-checkerboard {
          background-image: 
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        .dark .bg-checkerboard {
          background-image: 
            linear-gradient(45deg, #374151 25%, transparent 25%), 
            linear-gradient(-45deg, #374151 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #374151 75%), 
            linear-gradient(-45deg, transparent 75%, #374151 75%);
        }
      `;
            document.head.appendChild(style);
        }
    }, []);
    const previewSizes = [16, 20, 24, 32, 48, 64];
    const backgroundOptions = [
        { name: 'None', value: 'transparent', class: '' },
        { name: 'Light', value: '#f8f9fa', class: 'bg-gray-50' },
        { name: 'Dark', value: '#1f2937', class: 'bg-gray-800' },
        { name: 'Primary', value: '#3b82f6', class: 'bg-blue-600' },
        { name: 'Grid', value: 'grid', class: 'bg-checkerboard' }
    ];
    const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);
    return (<div className={`space-y-6 ${className}`}>
      {/* Main Preview */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview
          </h3>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowGrid(!showGrid)} variant="ghost" size="sm" className="text-xs">
              {showGrid ? <EyeOff className="w-3 h-3 mr-1"/> : <Eye className="w-3 h-3 mr-1"/>}
              Grid
            </Button>
            <Button onClick={() => setIsExpanded(!isExpanded)} variant="ghost" size="sm" className="text-xs">
              {isExpanded ? <Minimize2 className="w-3 h-3"/> : <Maximize2 className="w-3 h-3"/>}
            </Button>
          </div>
        </div>

        {/* Main Preview Area */}
        <div className={`
            relative min-h-48 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 
            flex items-center justify-center transition-all duration-200
            ${selectedBackground.class}
            ${isExpanded ? 'min-h-64' : 'min-h-48'}
            ${showGrid ? 'bg-checkerboard' : ''}
          `} style={{
            backgroundColor: selectedBackground.value === 'grid' ? undefined : selectedBackground.value
        }}>
          <div className="text-center">
            <div className="mb-4">
              <DynamicIcon name={iconName} size={customization.size} style={{
            color: customization.color,
            fill: customization.fillColor && customization.fillColor !== 'none' ? customization.fillColor : 'none'
        }} strokeWidth={customization.strokeWidth}/>
            </div>
            <Badge variant="outline" className="text-xs">
              {customization.size}×{customization.size}px
            </Badge>
          </div>

          {/* Grid overlay */}
          {showGrid && (<div className="absolute inset-0 pointer-events-none opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
            }}/>)}
        </div>

        {/* Background Options */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background
          </label>
          <div className="flex flex-wrap gap-2">
            {backgroundOptions.map((bg) => (<button key={bg.name} onClick={() => setSelectedBackground(bg)} className={`
                  px-3 py-1.5 rounded-md text-xs font-medium border transition-all
                  ${selectedBackground.name === bg.name
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400'}
                `}>
                {bg.name}
              </button>))}
          </div>
        </div>
      </div>

      {/* Size Variations */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Size Variations
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {previewSizes.map((size) => (<div key={size} className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <DynamicIcon name={iconName} size={size} style={{
                color: customization.color,
                fill: customization.fillColor && customization.fillColor !== 'none' ? customization.fillColor : 'none'
            }} strokeWidth={customization.strokeWidth}/>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {size}px
              </span>
            </div>))}
        </div>
      </div>

      {/* Color Variations */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Color Variations
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Current', color: 'currentColor' },
            { name: 'Black', color: '#000000' },
            { name: 'Gray', color: '#6b7280' },
            { name: 'Blue', color: '#3b82f6' },
            { name: 'Green', color: '#10b981' },
            { name: 'Red', color: '#ef4444' },
            { name: 'Purple', color: '#8b5cf6' },
            { name: 'Orange', color: '#f97316' }
        ].map((colorOption) => (<div key={colorOption.name} className="flex flex-col items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <DynamicIcon name={iconName} size={24} style={{
                color: colorOption.color,
                fill: customization.fillColor && customization.fillColor !== 'none' ? customization.fillColor : 'none'
            }} strokeWidth={customization.strokeWidth}/>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {colorOption.name}
              </span>
            </div>))}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=IconPreview.jsx.map
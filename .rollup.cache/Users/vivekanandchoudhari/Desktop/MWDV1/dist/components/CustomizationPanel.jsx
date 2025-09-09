import React from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Slider } from './ui/Slider';
import { Switch } from './ui/Switch';
import { Card } from './ui/Card';
import { Separator } from './ui/Separator';
import { Badge } from './ui/Badge';
import { Settings, RotateCcw, Save, Palette } from 'lucide-react';
import { useIconCustomization } from '../hooks/useIconCustomization';
export function CustomizationPanel({ isOpen, onClose, iconName, className = '' }) {
    const { customization, preferences, updateCustomization, updatePreferences, resetCustomization, applyPreferencesToCustomization, generateCustomizedSVG, generateCustomizedJSX, generateCustomizedImport } = useIconCustomization();
    if (!isOpen)
        return null;
    const colorPresets = [
        { name: 'Current Color', value: 'currentColor' },
        { name: 'MW Energy Blue', value: '#1d65af' },
        { name: 'MW Orange', value: '#4cb0e4' },
        { name: 'MW Flow Teal', value: '#00bcd4' },
        { name: 'Success Green', value: '#10b981' },
        { name: 'Warning Yellow', value: '#f59e0b' },
        { name: 'Danger Red', value: '#ef4444' },
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#ffffff' }
    ];
    const sizePresets = [16, 20, 24, 28, 32, 40, 48, 64];
    const strokeWidthPresets = [1, 1.5, 2, 2.5, 3, 4];
    return (<div className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto z-50 ${className}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5"/>
            <h2 className="text-lg font-semibold">Icon Customization</h2>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            ×
          </Button>
        </div>

        {iconName && (<div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Badge variant="outline" className="mb-2">{iconName}</Badge>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Customizing this icon
            </div>
          </div>)}

        {/* Size Controls */}
        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            Size & Stroke
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Size (px)</label>
              <div className="flex items-center gap-2 mb-2">
                <Slider value={customization.size} onChange={(value) => updateCustomization({ size: value })} min={12} max={128} step={4} className="flex-1"/>
                <Input type="number" value={customization.size} onChange={(e) => updateCustomization({ size: parseInt(e.target.value) || 24 })} className="w-16 text-sm" min={12} max={128}/>
              </div>
              <div className="flex gap-1">
                {sizePresets.map(size => (<Button key={size} onClick={() => updateCustomization({ size })} variant={customization.size === size ? 'primary' : 'ghost'} size="sm" className="text-xs">
                    {size}
                  </Button>))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Stroke Width</label>
              <div className="flex items-center gap-2 mb-2">
                <Slider value={customization.strokeWidth} onChange={(value) => updateCustomization({ strokeWidth: value })} min={0.5} max={5} step={0.5} className="flex-1"/>
                <Input type="number" value={customization.strokeWidth} onChange={(e) => updateCustomization({ strokeWidth: parseFloat(e.target.value) || 2 })} className="w-16 text-sm" min={0.5} max={5} step={0.5}/>
              </div>
              <div className="flex gap-1">
                {strokeWidthPresets.map(width => (<Button key={width} onClick={() => updateCustomization({ strokeWidth: width })} variant={customization.strokeWidth === width ? 'primary' : 'ghost'} size="sm" className="text-xs">
                    {width}
                  </Button>))}
              </div>
            </div>
          </div>
        </Card>

        {/* Color Controls */}
        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4"/>
            Colors
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Stroke Color</label>
              <div className="flex items-center gap-2 mb-2">
                <Input type="color" value={customization.color === 'currentColor' ? '#000000' : customization.color} onChange={(e) => updateCustomization({ color: e.target.value })} className="w-12 h-8 p-1"/>
                <Input type="text" value={customization.color} onChange={(e) => updateCustomization({ color: e.target.value })} className="flex-1 text-sm" placeholder="currentColor"/>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {colorPresets.map(preset => (<Button key={preset.value} onClick={() => updateCustomization({ color: preset.value })} variant={customization.color === preset.value ? 'primary' : 'ghost'} size="sm" className="text-xs justify-start">
                    <div className="w-3 h-3 rounded mr-1 border border-gray-300" style={{
                backgroundColor: preset.value === 'currentColor' ? '#6b7280' : preset.value
            }}/>
                    {preset.name}
                  </Button>))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Fill Color (Optional)</label>
              <div className="flex items-center gap-2">
                <Input type="color" value={customization.fillColor || '#000000'} onChange={(e) => updateCustomization({ fillColor: e.target.value })} className="w-12 h-8 p-1"/>
                <Input type="text" value={customization.fillColor || ''} onChange={(e) => updateCustomization({ fillColor: e.target.value || undefined })} className="flex-1 text-sm" placeholder="none"/>
                <Button onClick={() => updateCustomization({ fillColor: undefined })} variant="ghost" size="sm" className="text-xs">
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Class Name */}
        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-3">CSS Class</h3>
          <Input type="text" value={customization.className || ''} onChange={(e) => updateCustomization({ className: e.target.value || undefined })} placeholder="icon-class" className="text-sm"/>
        </Card>

        <Separator className="my-4"/>

        {/* Preferences */}
        <Card className="p-4 mb-4">
          <h3 className="font-medium mb-3">Preferences</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">Include className prop</label>
              <Switch checked={preferences.includeClassName} onChange={(e) => updatePreferences({ includeClassName: e.target.checked })}/>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Naming Convention</label>
              <Select value={preferences.namingConvention} onChange={(e) => updatePreferences({
            namingConvention: e.target.value
        })} options={[
            { value: 'camelCase', label: 'camelCase' },
            { value: 'PascalCase', label: 'PascalCase' },
            { value: 'kebab-case', label: 'kebab-case' }
        ]}/>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Preferred Format</label>
              <Select value={preferences.preferredFormat} onChange={(e) => updatePreferences({
            preferredFormat: e.target.value
        })} options={[
            { value: 'svg', label: 'SVG' },
            { value: 'jsx', label: 'JSX' },
            { value: 'import', label: 'Import' }
        ]}/>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={resetCustomization} variant="outline" size="sm" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4"/>
            Reset
          </Button>
          
          <Button onClick={applyPreferencesToCustomization} variant="ghost" size="sm" className="flex items-center gap-2">
            <Save className="w-4 h-4"/>
            Apply Defaults
          </Button>
        </div>

        {/* Preview */}
        {iconName && (<Card className="p-4 mt-4">
            <h3 className="font-medium mb-3">Preview</h3>
            <div className="space-y-2 text-xs">
              <div>
                <strong>JSX:</strong>
                <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  {generateCustomizedJSX(iconName)}
                </code>
              </div>
              <div>
                <strong>Import:</strong>
                <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  {generateCustomizedImport(iconName)}
                </code>
              </div>
            </div>
          </Card>)}
      </div>
    </div>);
}
//# sourceMappingURL=CustomizationPanel.jsx.map
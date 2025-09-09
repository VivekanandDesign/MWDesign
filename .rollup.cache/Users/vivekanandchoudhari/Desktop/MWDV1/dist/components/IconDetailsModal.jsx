import React, { useEffect, useRef } from 'react';
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
    const modalContent = (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div ref={modalRef} className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {formatIconName(iconName)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {getIconDescription(iconName)}
              </p>
              {iconCategory && (<div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {iconCategory.name}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentIconIndex + 1} of {iconCategory.icons.length}
                  </span>
                </div>)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation Arrows */}
            <Button onClick={handleNavigatePrev} disabled={!canNavigatePrev} variant="ghost" size="sm" className="p-2" title="Previous icon">
              <ChevronLeft className="w-4 h-4"/>
            </Button>
            
            <Button onClick={handleNavigateNext} disabled={!canNavigateNext} variant="ghost" size="sm" className="p-2" title="Next icon">
              <ChevronRight className="w-4 h-4"/>
            </Button>

            {/* Favorite Button */}
            <Button onClick={() => toggleFavorite(iconName)} variant="ghost" size="sm" className="p-2" title={isFavorite(iconName) ? 'Remove from favorites' : 'Add to favorites'}>
              <Heart className={`w-4 h-4 ${isFavorite(iconName)
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-400'}`}/>
            </Button>

            {/* Close Button */}
            <Button onClick={onClose} variant="ghost" size="sm" className="p-2" title="Close modal" data-modal-focus-first>
              <X className="w-4 h-4"/>
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Left Panel - Icon Preview */}
          <div className="flex-1 p-6 border-r border-gray-200 dark:border-gray-700">
            <IconPreview iconName={iconName} customization={customization} className="mb-6"/>
            
            <IconActionButtons iconName={iconName} className="mb-4"/>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Quick Info
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Category</span>
                  <div className="font-medium">{(iconCategory === null || iconCategory === void 0 ? void 0 : iconCategory.name) || 'Unknown'}</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Size</span>
                  <div className="font-medium">{customization.size}px</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Stroke</span>
                  <div className="font-medium">{customization.strokeWidth}px</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Color</span>
                  <div className="font-medium">
                    {customization.color === 'currentColor' ? 'Current' : customization.color}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Tabs Content */}
          <div className="flex-1 flex flex-col max-h-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
            { id: 'customize', label: 'Customize', shortcut: '1' },
            { id: 'code', label: 'Code', shortcut: '2' }
        ].map(tab => (<button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`}>
                  {tab.label}
                  <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                    ⌘{tab.shortcut}
                  </kbd>
                </button>))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'customize' && (<IconCustomizationControls iconName={iconName}/>)}
              
              {activeTab === 'code' && (<IconCodeSnippets iconName={iconName}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
    // Render modal in portal
    return createPortal(modalContent, document.body);
}
//# sourceMappingURL=IconDetailsModal.jsx.map
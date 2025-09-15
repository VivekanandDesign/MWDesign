'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { type IconCategory } from '@/data/icons';
import { type LucideCategory } from '@/lib/lucide-icons';

interface SimpleCategorySidebarProps {
  categories: Record<string, IconCategory>;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  allIconsCount?: number;
  lucideCategories?: Record<string, LucideCategory>;
  isOpen?: boolean;
  onClose?: () => void;
}

export function SimpleCategorySidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  allIconsCount = 0,
  lucideCategories = {},
  isOpen = true,
  onClose
}: SimpleCategorySidebarProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-mw-gray-800 
        border-r border-mw-gray-200 dark:border-mw-gray-700 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <h2 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              Categories
            </h2>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-1">
              Browse icons by category
            </p>
          </div>
          
          {/* Categories List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {/* All Icons */}
              <button
                onClick={() => handleCategoryClick('all')}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg text-left transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-mw-primary-50 text-mw-primary-700 dark:bg-mw-primary-900/20 dark:text-mw-primary-400 border border-mw-primary-200 dark:border-mw-primary-800'
                    : 'text-mw-gray-700 hover:bg-mw-gray-50 dark:text-mw-gray-300 dark:hover:bg-mw-gray-700/50'
                }`}
              >
                <span className="font-medium">All Icons</span>
                <Badge 
                  variant={selectedCategory === 'all' ? 'primary' : 'secondary'} 
                  className="text-xs"
                >
                  {allIconsCount.toLocaleString()}
                </Badge>
              </button>
              
              {/* Lucide Categories */}
              {Object.keys(lucideCategories).length > 0 && (
                <>
                  <div className="my-4 border-t border-mw-gray-200 dark:border-mw-gray-700" />
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 uppercase tracking-wider px-4">
                      Categories
                    </h3>
                  </div>
                  {Object.entries(lucideCategories).map(([categoryId, category]) => (
                    <button
                      key={`lucide-${categoryId}`}
                      onClick={() => handleCategoryClick(`lucide-${categoryId}`)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg text-left transition-colors ${
                        selectedCategory === `lucide-${categoryId}`
                          ? 'bg-mw-primary-50 text-mw-primary-700 dark:bg-mw-primary-900/20 dark:text-mw-primary-400 border border-mw-primary-200 dark:border-mw-primary-800'
                          : 'text-mw-gray-700 hover:bg-mw-gray-50 dark:text-mw-gray-300 dark:hover:bg-mw-gray-700/50'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 mt-0.5">
                          {category.description}
                        </div>
                      </div>
                      <Badge 
                        variant={selectedCategory === `lucide-${categoryId}` ? 'primary' : 'secondary'} 
                        className="text-xs ml-2 flex-shrink-0"
                      >
                        {category.icons.length}
                      </Badge>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { Menu, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { 
  getAllLucideIconNames, 
  getLucideIconsByCategory, 
  getAllLucideCategories,
  searchLucideIcons,
  getLucideMetadata 
} from '@/lib/lucide-icons';
import { SimpleIconSearch } from './SimpleIconSearch';
import { SimpleCategorySidebar } from './SimpleCategorySidebar';
import { SimpleIconGrid } from './SimpleIconGrid';

export function SimpleIconsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Get Lucide icon data only
  const lucideMetadata = getLucideMetadata();
  const lucideCategories = getAllLucideCategories();

  // Get current icons based on selected category
  const currentIcons = useMemo(() => {
    if (selectedCategory === 'all') {
      // Show all Lucide icons (limited for performance)
      return getAllLucideIconNames().slice(0, 1000);
    } else if (selectedCategory.startsWith('lucide-')) {
      // Handle Lucide category
      const lucideCategory = selectedCategory.replace('lucide-', '');
      return getLucideIconsByCategory(lucideCategory);
    } else {
      // Fallback to all icons
      return getAllLucideIconNames().slice(0, 1000);
    }
  }, [selectedCategory]);

  // Get current category info
  const currentCategoryInfo = useMemo(() => {
    if (selectedCategory === 'all') {
      return {
        name: 'All Icons',
        description: 'Complete Lucide icon library',
        count: lucideMetadata.totalIcons
      };
    } else if (selectedCategory.startsWith('lucide-')) {
      const lucideCategory = selectedCategory.replace('lucide-', '');
      const category = lucideCategories[lucideCategory];
      return {
        name: category?.name || lucideCategory,
        description: category?.description || 'Lucide icon category',
        count: category?.icons.length || 0
      };
    } else {
      // Fallback for any other category
      return {
        name: 'All Icons',
        description: 'Complete Lucide icon library',
        count: lucideMetadata.totalIcons
      };
    }
  }, [selectedCategory, lucideCategories, lucideMetadata]);

  const handleIconCopy = (iconName: string) => {
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchTerm(''); // Clear search when changing categories
  };

  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <SimpleCategorySidebar
          categories={{}} // Remove curated categories
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          allIconsCount={lucideMetadata.totalIcons}
          lucideCategories={lucideCategories}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <h1 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              Icons
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2"
            >
              <Menu className="w-4 h-4" />
              Categories
            </Button>
          </div>

          {/* Search Section */}
          <div className="p-6 bg-white dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <div className="max-w-md">
              <SimpleIconSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder={`Search ${currentCategoryInfo.count} icons...`}
              />
            </div>
          </div>

          {/* Content Header */}
          <div className="p-6 bg-white dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  {currentCategoryInfo.name}
                </h2>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-1">
                  {currentCategoryInfo.description}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  {currentIcons.length.toLocaleString()} icons
                </span>
                
                {/* Copy Success Indicator */}
                {copiedIcon && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      {copiedIcon} copied!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Icons Grid */}
          <div className="flex-1 p-6">
            <SimpleIconGrid
              icons={currentIcons}
              searchTerm={searchTerm}
              onIconCopy={handleIconCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

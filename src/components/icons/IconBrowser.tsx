'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Star, TrendingUp, Grid3x3, List, Filter, ArrowRight } from 'lucide-react';
import { getEnhancedIconsData, searchEnhancedIcons, getIconsByCategory, trackIconUsage } from '@/data/enhanced-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

type ViewMode = 'curated' | 'popular' | 'complete';
type DisplayMode = 'grid' | 'list';

interface IconBrowserProps {
  onIconSelect?: (iconName: string) => void;
  selectedIcons?: string[];
  showSelection?: boolean;
}

export function IconBrowser({ onIconSelect, selectedIcons = [], showSelection = false }: IconBrowserProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('curated');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const enhancedData = getEnhancedIconsData();
  
  // Search results with scope switching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const results = searchEnhancedIcons(searchQuery, viewMode, 100);
    return results;
  }, [searchQuery, viewMode]);
  
  // Category icons based on current view mode
  const categoryIcons = useMemo(() => {
    if (selectedCategory === 'all') return null;
    
    return getIconsByCategory(selectedCategory, viewMode);
  }, [selectedCategory, viewMode]);
  
  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    trackIconUsage(iconName, `browser-${viewMode}`);
    onIconSelect?.(iconName);
  };
  
  // Get current icons to display
  const getCurrentIcons = () => {
    if (searchResults) return searchResults.icons;
    if (categoryIcons) return categoryIcons.icons;
    
    switch (viewMode) {
      case 'curated':
        return enhancedData.curated.allIcons;
      case 'popular':
        return enhancedData.popular.featured;
      case 'complete':
        return []; // Would load complete library
      default:
        return enhancedData.curated.allIcons;
    }
  };
  
  const currentIcons = getCurrentIcons();
  
  return (
    <div className="space-y-6">
      {/* Header with mode switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Icon Library</h2>
          <p className="text-mw-gray-600 dark:text-mw-gray-300">
            {viewMode === 'curated' && `${enhancedData.curated.totalIcons} curated icons`}
            {viewMode === 'popular' && 'Popular and trending icons'}
            {viewMode === 'complete' && `${enhancedData.complete.totalIcons} total icons available`}
          </p>
        </div>
        
        {/* View mode tabs */}
        <div className="flex bg-mw-gray-100 dark:bg-mw-gray-800 rounded-lg p-1">
          {([
            { key: 'curated', label: 'Curated', icon: Star },
            { key: 'popular', label: 'Popular', icon: TrendingUp },
            { key: 'complete', label: 'All Icons', icon: Grid3x3 }
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setViewMode(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === key
                  ? 'bg-white dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white shadow-sm'
                  : 'text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400" size={20} />
          <Input
            type="text"
            placeholder={`Search ${viewMode} icons...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            <ChevronDown 
              size={16} 
              className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} 
            />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setDisplayMode(displayMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center gap-2"
          >
            {displayMode === 'grid' ? <List size={16} /> : <Grid3x3 size={16} />}
          </Button>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {Object.entries(enhancedData.curated.categories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.name} ({category.icons.length}
                    {category.totalAvailable && category.totalAvailable > category.icons.length && 
                      ` of ${category.totalAvailable}`
                    })
                  </option>
                ))}
              </select>
            </div>
            
            {/* Quick access tags */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                Quick Access
              </label>
              <div className="flex flex-wrap gap-2">
                {['Beginner', 'Popular', 'Advanced'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-mw-primary-50 dark:hover:bg-mw-primary-900"
                    onClick={() => {
                      const icons = tag === 'Beginner' ? enhancedData.navigation.beginner :
                                   tag === 'Popular' ? enhancedData.popular.featured :
                                   enhancedData.navigation.advanced;
                      setSearchQuery(icons[0]); // Simple demo - would show filtered results
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Progressive disclosure hint */}
      {viewMode === 'curated' && !searchQuery && selectedCategory !== 'all' && categoryIcons?.hasMore && (
        <div className="bg-mw-primary-50 dark:bg-mw-primary-900/20 border border-mw-primary-200 dark:border-mw-primary-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-mw-primary-900 dark:text-mw-primary-100">
                More icons available
              </h4>
              <p className="text-sm text-mw-primary-700 dark:text-mw-primary-300">
                Showing {categoryIcons.total} curated icons. 
                {categoryIcons.hasMore && ' Switch to "All Icons" to see the complete collection.'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('complete')}
              className="flex items-center gap-2"
            >
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Results summary */}
      {searchResults && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
            Found {searchResults.total} icons in {searchResults.scope} collection
          </p>
          {searchResults.total > searchResults.icons.length && (
            <Button variant="outline" size="sm">
              Load More
            </Button>
          )}
        </div>
      )}
      
      {/* Icons grid/list */}
      <div className={
        displayMode === 'grid' 
          ? 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4'
          : 'space-y-2'
      }>
        {currentIcons.map((iconName) => (
          <IconItem
            key={iconName}
            iconName={iconName}
            displayMode={displayMode}
            isSelected={selectedIcons.includes(iconName)}
            onSelect={() => handleIconSelect(iconName)}
            showSelection={showSelection}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {currentIcons.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-mw-gray-100 dark:bg-mw-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-mw-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-2">
            No icons found
          </h3>
          <p className="text-mw-gray-600 dark:text-mw-gray-300">
            Try adjusting your search or filters
          </p>
        </div>
      )}
      
      {/* Load more for complete library */}
      {viewMode === 'complete' && currentIcons.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="px-8">
            Load More Icons
          </Button>
          <p className="text-sm text-mw-gray-500 dark:text-mw-gray-400 mt-2">
            Showing first 100 of {enhancedData.complete.totalIcons} icons
          </p>
        </div>
      )}
    </div>
  );
}

// Individual icon item component
interface IconItemProps {
  iconName: string;
  displayMode: DisplayMode;
  isSelected: boolean;
  onSelect: () => void;
  showSelection: boolean;
}

function IconItem({ iconName, displayMode, isSelected, onSelect, showSelection }: IconItemProps) {
  if (displayMode === 'list') {
    return (
      <div
        onClick={onSelect}
        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
          isSelected && showSelection
            ? 'border-mw-primary-500 bg-mw-primary-50 dark:bg-mw-primary-900/20'
            : 'border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-gray-300 dark:hover:border-mw-gray-600'
        }`}
      >
        <div className="w-8 h-8 flex items-center justify-center bg-mw-gray-100 dark:bg-mw-gray-800 rounded">
          {/* Icon would be rendered here */}
          <div className="w-5 h-5 bg-mw-gray-400 rounded" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-mw-gray-900 dark:text-white">
            {iconName}
          </p>
        </div>
        {showSelection && isSelected && (
          <div className="w-5 h-5 bg-mw-primary-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div
      onClick={onSelect}
      className={`aspect-square p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md group ${
        isSelected && showSelection
          ? 'border-mw-primary-500 bg-mw-primary-50 dark:bg-mw-primary-900/20'
          : 'border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-gray-300 dark:hover:border-mw-gray-600'
      }`}
      title={iconName}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center">
          {/* Icon would be rendered here */}
          <div className="w-6 h-6 bg-mw-gray-400 rounded" />
        </div>
        <p className="text-xs text-mw-gray-600 dark:text-mw-gray-300 text-center truncate w-full group-hover:text-mw-gray-900 dark:group-hover:text-white">
          {iconName}
        </p>
        {showSelection && isSelected && (
          <div className="absolute top-1 right-1 w-4 h-4 bg-mw-primary-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}

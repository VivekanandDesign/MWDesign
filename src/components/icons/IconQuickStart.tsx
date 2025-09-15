'use client';

import React, { useState } from 'react';
import { Star, TrendingUp, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { getEnhancedIconsData } from '@/data/enhanced-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface IconQuickStartProps {
  onViewAllIcons?: () => void;
  onCategorySelect?: (category: string) => void;
  onIconSelect?: (iconName: string) => void;
}

export function IconQuickStart({ onViewAllIcons, onCategorySelect, onIconSelect }: IconQuickStartProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'categories' | 'trending'>('featured');
  const enhancedData = getEnhancedIconsData();
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">
          Quick Start Icons
        </h2>
        <p className="text-mw-gray-600 dark:text-mw-gray-300">
          Start with our carefully curated collection, then explore all {enhancedData.complete.totalIcons.toLocaleString()} icons
        </p>
      </div>
      
      {/* Tab navigation */}
      <div className="flex justify-center">
        <div className="flex bg-mw-gray-100 dark:bg-mw-gray-800 rounded-lg p-1">
          {([
            { key: 'featured', label: 'Featured', icon: Star },
            { key: 'categories', label: 'Categories', icon: null },
            { key: 'trending', label: 'Trending', icon: TrendingUp }
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-white dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white shadow-sm'
                  : 'text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-gray-900 dark:hover:text-white'
              }`}
            >
              {Icon && <Icon size={16} />}
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'featured' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              Essential Icons
            </h3>
            <Badge variant="outline" className="bg-mw-primary-50 dark:bg-mw-primary-900/20">
              {enhancedData.popular.featured.length} icons
            </Badge>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {enhancedData.popular.featured.map((iconName) => (
              <QuickIconItem
                key={iconName}
                iconName={iconName}
                onSelect={() => onIconSelect?.(iconName)}
              />
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(enhancedData.curated.categories).map(([key, category]) => (
            <CategoryCard
              key={key}
              categoryKey={key}
              category={category}
              onSelect={() => onCategorySelect?.(key)}
            />
          ))}
        </div>
      )}
      
      {activeTab === 'trending' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-mw-primary-500" size={20} />
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              Trending Icons
            </h3>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {enhancedData.popular.trending.map((iconName) => (
              <QuickIconItem
                key={iconName}
                iconName={iconName}
                onSelect={() => onIconSelect?.(iconName)}
                isTrending
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Progressive disclosure CTA */}
      <Card className="p-6 bg-gradient-to-r from-mw-primary-50 to-mw-secondary-50 dark:from-mw-primary-900/20 dark:to-mw-secondary-900/20 border-mw-primary-200 dark:border-mw-primary-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
              Need more icons?
            </h3>
            <p className="text-mw-gray-600 dark:text-mw-gray-300">
              Explore our complete library with {(enhancedData.complete.totalIcons - enhancedData.curated.totalIcons).toLocaleString()} additional icons across {enhancedData.complete.totalCategories} categories
            </p>
          </div>
          <Button
            onClick={onViewAllIcons}
            className="flex items-center gap-2 px-6"
          >
            Browse All Icons
            <ArrowRight size={16} />
          </Button>
        </div>
      </Card>
      
      {/* Quick access suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SuggestionCard
          title="For Beginners"
          description="Start with these user-friendly icons"
          icons={enhancedData.navigation.beginner.slice(0, 6)}
          badge="Recommended"
          onIconSelect={onIconSelect}
        />
        
        <SuggestionCard
          title="Quick Access"
          description="Common actions and interfaces"
          icons={enhancedData.navigation.quickAccess.slice(0, 6)}
          badge="Popular"
          onIconSelect={onIconSelect}
        />
        
        <SuggestionCard
          title="Advanced"
          description="Technical and specialized icons"
          icons={enhancedData.navigation.advanced.slice(0, 6)}
          badge="Pro"
          onIconSelect={onIconSelect}
        />
      </div>
    </div>
  );
}

// Quick icon item component
interface QuickIconItemProps {
  iconName: string;
  onSelect: () => void;
  isTrending?: boolean;
}

function QuickIconItem({ iconName, onSelect, isTrending }: QuickIconItemProps) {
  return (
    <div
      onClick={onSelect}
      className="relative aspect-square p-3 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 cursor-pointer transition-all hover:shadow-md hover:border-mw-gray-300 dark:hover:border-mw-gray-600 group"
      title={iconName}
    >
      {isTrending && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-mw-primary-500 rounded-full flex items-center justify-center">
          <Zap size={12} className="text-white" />
        </div>
      )}
      
      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
        <div className="w-8 h-8 flex items-center justify-center">
          {/* Icon would be rendered here */}
          <div className="w-6 h-6 bg-mw-gray-400 rounded" />
        </div>
        <p className="text-xs text-mw-gray-600 dark:text-mw-gray-300 text-center truncate w-full group-hover:text-mw-gray-900 dark:group-hover:text-white">
          {iconName}
        </p>
      </div>
    </div>
  );
}

// Category card component
interface CategoryCardProps {
  categoryKey: string;
  category: any;
  onSelect: () => void;
}

function CategoryCard({ categoryKey, category, onSelect }: CategoryCardProps) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
  };
  
  return (
    <Card
      className="p-4 cursor-pointer transition-all hover:shadow-md hover:border-mw-gray-300 dark:hover:border-mw-gray-600"
      onClick={onSelect}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-mw-gray-900 dark:text-white">
            {category.name}
          </h4>
          <Badge 
            variant="outline" 
            className={`text-xs ${priorityColors[category.priority as keyof typeof priorityColors]}`}
          >
            {category.priority}
          </Badge>
        </div>
        
        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
            {category.icons.length} curated
          </span>
          {category.totalAvailable && category.totalAvailable > category.icons.length && (
            <span className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
              +{category.totalAvailable - category.icons.length} more
            </span>
          )}
        </div>
        
        {/* Preview icons */}
        <div className="flex gap-2">
          {category.icons.slice(0, 4).map((iconName: string) => (
            <div
              key={iconName}
              className="w-8 h-8 bg-mw-gray-100 dark:bg-mw-gray-800 rounded flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-mw-gray-400 rounded" />
            </div>
          ))}
          {category.icons.length > 4 && (
            <div className="w-8 h-8 bg-mw-gray-100 dark:bg-mw-gray-800 rounded flex items-center justify-center">
              <span className="text-xs text-mw-gray-500">+{category.icons.length - 4}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

// Suggestion card component
interface SuggestionCardProps {
  title: string;
  description: string;
  icons: string[];
  badge: string;
  onIconSelect?: (iconName: string) => void;
}

function SuggestionCard({ title, description, icons, badge, onIconSelect }: SuggestionCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-mw-gray-900 dark:text-white">
            {title}
          </h4>
          <Badge variant="outline" className="text-xs">
            {badge}
          </Badge>
        </div>
        
        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
          {description}
        </p>
        
        <div className="grid grid-cols-6 gap-2">
          {icons.map((iconName) => (
            <div
              key={iconName}
              onClick={() => onIconSelect?.(iconName)}
              className="aspect-square bg-mw-gray-100 dark:bg-mw-gray-800 rounded cursor-pointer hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700 transition-colors flex items-center justify-center"
              title={iconName}
            >
              <div className="w-4 h-4 bg-mw-gray-400 rounded" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

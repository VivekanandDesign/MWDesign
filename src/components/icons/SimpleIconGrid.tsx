'use client';

import React from 'react';
import { SimpleIconCard } from './SimpleIconCard';

interface SimpleIconGridProps {
  icons: string[];
  searchTerm: string;
  onIconCopy?: (iconName: string) => void;
}

export function SimpleIconGrid({ icons, searchTerm, onIconCopy }: SimpleIconGridProps) {
  // Filter icons based on search term
  const filteredIcons = React.useMemo(() => {
    if (!searchTerm.trim()) return icons;
    
    const search = searchTerm.toLowerCase();
    return icons.filter(iconName => 
      iconName.toLowerCase().includes(search) ||
      iconName.replace(/([A-Z])/g, ' $1').trim().toLowerCase().includes(search)
    );
  }, [icons, searchTerm]);

  if (filteredIcons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-mw-gray-100 dark:bg-mw-gray-800 flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-medium text-mw-gray-600 dark:text-mw-gray-400 mb-2">
          No icons found
        </h3>
        <p className="text-sm text-mw-gray-500 dark:text-mw-gray-500 max-w-md">
          {searchTerm 
            ? `No icons match "${searchTerm}". Try a different search term.`
            : "No icons available in this category."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
      {filteredIcons.map((iconName) => (
        <SimpleIconCard
          key={iconName}
          iconName={iconName}
          size={24}
          onCopy={onIconCopy}
        />
      ))}
    </div>
  );
}

'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SimpleIconSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export function SimpleIconSearch({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search icons..." 
}: SimpleIconSearchProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search className="w-4 h-4 text-mw-gray-400" />
      </div>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 text-sm bg-white dark:bg-mw-gray-800 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg focus:ring-2 focus:ring-mw-primary-500 focus:border-mw-primary-500 dark:focus:ring-mw-primary-400 dark:focus:border-mw-primary-400 text-mw-gray-900 dark:text-white placeholder-mw-gray-500 transition-colors"
      />
      
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors"
          title="Clear search"
        >
          <X className="w-4 h-4 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-300" />
        </button>
      )}
    </div>
  );
}

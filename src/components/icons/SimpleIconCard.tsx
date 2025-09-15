'use client';

import React, { useState, useRef } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { getLucideIcon } from '@/lib/lucide-icons';

interface SimpleIconCardProps {
  iconName: string;
  size?: number;
  onCopy?: (iconName: string) => void;
}

export function SimpleIconCard({ iconName, size = 24, onCopy }: SimpleIconCardProps) {
  const [copied, setCopied] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  
  // Get the icon component from Lucide using our helper
  const IconComponent = getLucideIcon(iconName);
  
  // Debug logging for development
  if (process.env.NODE_ENV === 'development' && !IconComponent) {
    console.warn(`Icon not found: ${iconName}`);
  }
  
  if (!IconComponent) {
    return (
      <div className="bg-mw-gray-100 dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4 opacity-50">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-mw-gray-200 dark:bg-mw-gray-700">
            <span className="text-xs text-mw-gray-500">?</span>
          </div>
          <p className="text-xs text-mw-gray-500 text-center">
            {iconName}
          </p>
        </div>
      </div>
    );
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(iconName);
      setCopied(true);
      onCopy?.(iconName);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy icon name:', error);
    }
  };

  const handleCopySvg = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      // Find the SVG element in the icon container
      const svgElement = iconRef.current?.querySelector('svg');
      if (svgElement) {
        // Clone the SVG to avoid modifying the original
        const clonedSvg = svgElement.cloneNode(true) as SVGElement;
        
        // Clean up the SVG attributes for better portability
        clonedSvg.removeAttribute('data-lucide');
        clonedSvg.setAttribute('width', size.toString());
        clonedSvg.setAttribute('height', size.toString());
        clonedSvg.setAttribute('viewBox', '0 0 24 24');
        clonedSvg.setAttribute('fill', 'none');
        clonedSvg.setAttribute('stroke', 'currentColor');
        clonedSvg.setAttribute('stroke-width', '2');
        clonedSvg.setAttribute('stroke-linecap', 'round');
        clonedSvg.setAttribute('stroke-linejoin', 'round');
        
        // Get the outer HTML of the cleaned SVG
        const svgString = clonedSvg.outerHTML;
        
        await navigator.clipboard.writeText(svgString);
        setCopiedSvg(true);
        
        setTimeout(() => setCopiedSvg(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy SVG:', error);
    }
  };

  const formatIconName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className="group relative bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4 hover:border-mw-primary-300 dark:hover:border-mw-primary-600 hover:shadow-md transition-all duration-200 cursor-pointer">
      {/* Icon */}
      <div className="flex flex-col items-center space-y-2">
        <div 
          ref={iconRef}
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-mw-gray-50 dark:bg-mw-gray-700 group-hover:bg-mw-primary-50 dark:group-hover:bg-mw-primary-900/20 transition-colors"
        >
          <IconComponent 
            size={size} 
            className="text-mw-gray-700 dark:text-mw-gray-300 group-hover:text-mw-primary-600 dark:group-hover:text-mw-primary-400 transition-colors"
          />
        </div>
        
        {/* Icon Name */}
        <div className="text-center">
          <p className="text-xs font-medium text-mw-gray-900 dark:text-white group-hover:text-mw-primary-600 dark:group-hover:text-mw-primary-400 transition-colors">
            {formatIconName(iconName)}
          </p>
        </div>
      </div>
      
      {/* Copy Buttons - Show on Hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
        {/* Copy SVG Button */}
        <button
          onClick={handleCopySvg}
          className="p-1.5 rounded-md bg-white dark:bg-mw-gray-700 border border-mw-gray-200 dark:border-mw-gray-600 hover:bg-mw-secondary-50 dark:hover:bg-mw-secondary-900/20 hover:border-mw-secondary-300 dark:hover:border-mw-secondary-600"
          title={copiedSvg ? 'SVG Copied!' : 'Copy SVG'}
        >
          {copiedSvg ? (
            <Check size={14} className="text-green-600" />
          ) : (
            <Code size={14} className="text-mw-gray-600 dark:text-mw-gray-400" />
          )}
        </button>
        
        {/* Copy Name Button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md bg-white dark:bg-mw-gray-700 border border-mw-gray-200 dark:border-mw-gray-600 hover:bg-mw-primary-50 dark:hover:bg-mw-primary-900/20 hover:border-mw-primary-300 dark:hover:border-mw-primary-600"
          title={copied ? 'Name Copied!' : 'Copy icon name'}
        >
          {copied ? (
            <Check size={14} className="text-green-600" />
          ) : (
            <Copy size={14} className="text-mw-gray-600 dark:text-mw-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}

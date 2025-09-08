import { useMemo } from 'react';
import { formatIconName } from '../utils/iconNameFormatter';
import { getIconsData } from '../data/icons';

/**
 * Custom hook for searching icons with optimized performance
 * Supports both technical names and formatted names
 */
export function useIconSearch() {
  // Pre-compute formatted names once and memoize
  const iconSearchData = useMemo(() => {
    const data = getIconsData();
    const allIcons = Object.values(data.categories).flatMap(category => category.icons);
    
    return allIcons.map(icon => ({
      technical: icon,
      formatted: formatIconName(icon).toLowerCase(),
      technicalLower: icon.toLowerCase()
    }));
  }, []); // Empty dependency array - only compute once

  const searchIcons = useMemo(() => {
    return (query: string, limit?: number): string[] => {
      if (!query.trim()) return [];
      
      const lowercaseQuery = query.toLowerCase();
      
      const matchedIcons = iconSearchData.filter(({ technicalLower, formatted }) => {
        return technicalLower.includes(lowercaseQuery) || 
               formatted.includes(lowercaseQuery);
      });

      const results = matchedIcons.map(item => item.technical);
      return limit ? results.slice(0, limit) : results;
    };
  }, [iconSearchData]);

  return { searchIcons };
}

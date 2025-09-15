import * as LucideIcons from 'lucide-react';
import lucideIconsData from '@/data/lucide-icons.json';

// Type definitions for Lucide icon components
export type LucideIconComponent = React.ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}> | React.ForwardRefExoticComponent<{
  size?: number;
  className?: string;
  strokeWidth?: number;
} & React.RefAttributes<SVGSVGElement>>;

export interface LucideIconInfo {
  name: string;
  component: LucideIconComponent;
  category: string;
  keywords?: string[];
}

export interface LucideCategory {
  name: string;
  description: string;
  icons: string[];
}

// Cache for icon components to avoid repeated lookups
const iconComponentCache = new Map<string, LucideIconComponent>();

/**
 * Get a Lucide icon component by name
 */
export function getLucideIcon(iconName: string): LucideIconComponent | null {
  // Check cache first
  if (iconComponentCache.has(iconName)) {
    return iconComponentCache.get(iconName) || null;
  }

  // Get the component from Lucide
  const IconComponent = (LucideIcons as any)[iconName];
  
  // Lucide icons are forwardRef components, check for $$typeof and render function
  if (IconComponent && 
      (typeof IconComponent === 'function' || 
       (IconComponent.$$typeof && IconComponent.render))) {
    iconComponentCache.set(iconName, IconComponent);
    return IconComponent;
  }

  return null;
}

/**
 * Get all available Lucide icon names
 */
export function getAllLucideIconNames(): string[] {
  return Object.values(lucideIconsData.categories)
    .flatMap((category: any) => category.icons || []);
}

/**
 * Get Lucide icons by category
 */
export function getLucideIconsByCategory(categoryKey: string): string[] {
  const category = (lucideIconsData.categories as any)[categoryKey];
  return category?.icons || [];
}

/**
 * Get all Lucide categories
 */
export function getAllLucideCategories(): Record<string, LucideCategory> {
  return lucideIconsData.categories as Record<string, LucideCategory>;
}

/**
 * Search Lucide icons by name or keywords
 */
export function searchLucideIcons(query: string, limit?: number): LucideIconInfo[] {
  if (!query.trim()) {
    return [];
  }

  const lowercaseQuery = query.toLowerCase();
  const results: LucideIconInfo[] = [];

  // Search through all categories
  Object.entries(lucideIconsData.categories).forEach(([categoryKey, category]: [string, any]) => {
    category.icons?.forEach((iconName: string) => {
      // Check if icon name matches
      if (iconName.toLowerCase().includes(lowercaseQuery)) {
        const component = getLucideIcon(iconName);
        if (component) {
          results.push({
            name: iconName,
            component,
            category: categoryKey,
            keywords: [categoryKey, category.name]
          });
        }
      }
    });
  });

  // Sort by relevance (exact matches first, then by name length)
  results.sort((a, b) => {
    const aExact = a.name.toLowerCase() === lowercaseQuery;
    const bExact = b.name.toLowerCase() === lowercaseQuery;
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    const aStarts = a.name.toLowerCase().startsWith(lowercaseQuery);
    const bStarts = b.name.toLowerCase().startsWith(lowercaseQuery);
    
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    
    return a.name.length - b.name.length;
  });

  return limit ? results.slice(0, limit) : results;
}

/**
 * Get icon information including component and metadata
 */
export function getLucideIconInfo(iconName: string): LucideIconInfo | null {
  const component = getLucideIcon(iconName);
  if (!component) return null;

  // Find the category this icon belongs to
  let category = 'unknown';
  Object.entries(lucideIconsData.categories).forEach(([categoryKey, categoryData]: [string, any]) => {
    if (categoryData.icons?.includes(iconName)) {
      category = categoryKey;
    }
  });

  return {
    name: iconName,
    component,
    category,
    keywords: [category]
  };
}

/**
 * Check if an icon exists in the Lucide library
 */
export function isValidLucideIcon(iconName: string): boolean {
  return getLucideIcon(iconName) !== null;
}

/**
 * Get random Lucide icons for showcase
 */
export function getRandomLucideIcons(count: number = 20): LucideIconInfo[] {
  const allIcons = getAllLucideIconNames();
  const shuffled = allIcons.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  return selected
    .map(iconName => getLucideIconInfo(iconName))
    .filter(Boolean) as LucideIconInfo[];
}

/**
 * Get popular/featured icons from each category
 */
export function getFeaturedLucideIcons(): Record<string, LucideIconInfo[]> {
  const featured: Record<string, LucideIconInfo[]> = {};
  
  Object.entries(lucideIconsData.categories).forEach(([categoryKey, category]: [string, any]) => {
    // Get first 10 icons from each category as "featured"
    const featuredIcons = (category.icons || [])
      .slice(0, 10)
      .map((iconName: string) => getLucideIconInfo(iconName))
      .filter(Boolean) as LucideIconInfo[];
    
    if (featuredIcons.length > 0) {
      featured[categoryKey] = featuredIcons;
    }
  });
  
  return featured;
}

/**
 * Get Lucide library metadata
 */
export function getLucideMetadata() {
  return {
    totalIcons: lucideIconsData.metadata.totalIcons,
    totalCategories: lucideIconsData.metadata.totalCategories,
    version: lucideIconsData.metadata.lucideVersion,
    generatedAt: lucideIconsData.metadata.generatedAt
  };
}

/**
 * Batch load icon components (for performance)
 */
export function preloadLucideIcons(iconNames: string[]): void {
  iconNames.forEach(iconName => {
    if (!iconComponentCache.has(iconName)) {
      getLucideIcon(iconName);
    }
  });
}

export default {
  getAllLucideIconNames,
  getLucideIcon,
  getLucideIconsByCategory,
  getAllLucideCategories,
  searchLucideIcons,
  getLucideIconInfo,
  isValidLucideIcon,
  getRandomLucideIcons,
  getFeaturedLucideIcons,
  getLucideMetadata,
  preloadLucideIcons
};

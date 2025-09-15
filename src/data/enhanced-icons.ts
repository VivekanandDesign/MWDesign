import { getIconsData } from './icons';
import lucideIconsData from './lucide-icons.json';

export interface EnhancedIconCategory {
  name: string;
  description: string;
  icons: string[];
  totalAvailable?: number; // Total icons available in complete library
  priority: 'high' | 'medium' | 'low';
}

export interface PopularIcon {
  name: string;
  category: string;
  usage: number;
  trending: boolean;
}

export interface EnhancedIconsData {
  // Core curated experience (current 133 icons)
  curated: {
    categories: Record<string, EnhancedIconCategory>;
    totalIcons: number;
    allIcons: string[];
  };
  
  // Progressive disclosure layers
  popular: {
    featured: string[]; // Top 20 most used icons
    byCategory: Record<string, string[]>; // Top 5 per category
    trending: string[]; // Recently popular icons
  };
  
  // Complete library metadata (lazy loaded)
  complete: {
    totalIcons: number;
    totalCategories: number;
    categories: string[];
    searchIndex?: any; // Loaded on demand
  };
  
  // Navigation and UX
  navigation: {
    quickAccess: string[]; // Most common icons
    beginner: string[]; // Recommended for new users
    advanced: string[]; // Power user icons
  };
}

// Enhanced icon data combining curated + complete library metadata
export function getEnhancedIconsData(): EnhancedIconsData {
  const curatedData = getIconsData();
  
  // Map curated categories with complete library counts
  const enhancedCategories: Record<string, EnhancedIconCategory> = {};
  
  Object.entries(curatedData.categories).forEach(([key, category]) => {
    // Find corresponding category in complete library
    const completeCategory = findCompleteCategory(key, category.name);
    const totalAvailable = completeCategory ? completeCategory.icons.length : category.icons.length;
    
    enhancedCategories[key] = {
      ...category,
      totalAvailable,
      priority: getPriority(key, category.icons.length)
    };
  });
  
  return {
    curated: {
      categories: enhancedCategories,
      totalIcons: curatedData.totalIcons,
      allIcons: curatedData.allIcons
    },
    
    popular: {
      featured: getFeaturedIcons(),
      byCategory: getPopularByCategory(),
      trending: getTrendingIcons()
    },
    
    complete: {
      totalIcons: lucideIconsData.metadata.totalIcons,
      totalCategories: lucideIconsData.metadata.totalCategories,
      categories: Object.keys(lucideIconsData.categories)
    },
    
    navigation: {
      quickAccess: getQuickAccessIcons(),
      beginner: getBeginnerIcons(),
      advanced: getAdvancedIcons()
    }
  };
}

// Find corresponding category in complete library
function findCompleteCategory(curatedKey: string, curatedName: string) {
  const categoryMappings: Record<string, string> = {
    'arrows': 'arrows',
    'interface': 'layout',
    'communication': 'communication',
    'files': 'files',
    'design': 'design',
    'business': 'finance',
    'technology': 'devices',
    'travel': 'transportation'
  };
  
  const completeKey = categoryMappings[curatedKey];
  return completeKey && lucideIconsData.categories[completeKey as keyof typeof lucideIconsData.categories] 
    ? lucideIconsData.categories[completeKey as keyof typeof lucideIconsData.categories] 
    : null;
}

// Determine priority based on category and icon count
function getPriority(key: string, iconCount: number): 'high' | 'medium' | 'low' {
  const highPriorityCategories = ['interface', 'arrows', 'files'];
  const mediumPriorityCategories = ['communication', 'design'];
  
  if (highPriorityCategories.includes(key)) return 'high';
  if (mediumPriorityCategories.includes(key)) return 'medium';
  return 'low';
}

// Get featured icons (most commonly used across design systems)
function getFeaturedIcons(): string[] {
  return [
    // Essential interface icons
    'Menu', 'X', 'Search', 'Home', 'Settings',
    'User', 'Bell', 'Heart', 'Star', 'Plus',
    
    // Navigation icons
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronRight',
    
    // Communication icons
    'Mail', 'MessageCircle', 'Phone', 'Share2', 'Download'
  ];
}

// Get popular icons by category (top 5 each)
function getPopularByCategory(): Record<string, string[]> {
  return {
    arrows: ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ChevronRight'],
    interface: ['Menu', 'X', 'Search', 'Home', 'Settings'],
    communication: ['Mail', 'MessageCircle', 'Phone', 'Share2', 'Send'],
    files: ['File', 'Folder', 'Download', 'Upload', 'Save'],
    design: ['Palette', 'Eye', 'Edit', 'Layers', 'Zap'],
    business: ['Users', 'TrendingUp', 'DollarSign', 'BarChart', 'Target'],
    technology: ['Smartphone', 'Wifi', 'Globe', 'Monitor', 'Battery'],
    travel: ['MapPin', 'Navigation', 'Car', 'Plane', 'Map']
  };
}

// Get trending icons (simulated - in real app, this would come from analytics)
function getTrendingIcons(): string[] {
  return [
    'Sparkles', 'Zap', 'Rocket', 'Cpu', 'Shield',
    'Globe', 'Wifi', 'Smartphone', 'Camera', 'Video'
  ];
}

// Quick access icons for power users
function getQuickAccessIcons(): string[] {
  return [
    'Copy', 'Paste', 'Undo', 'Redo', 'Save',
    'Print', 'Share', 'Export', 'Import', 'Refresh'
  ];
}

// Beginner-friendly icons
function getBeginnerIcons(): string[] {
  return [
    'Home', 'User', 'Settings', 'Help', 'Info',
    'Search', 'Menu', 'X', 'Check', 'Heart'
  ];
}

// Advanced/specialized icons
function getAdvancedIcons(): string[] {
  return [
    'Terminal', 'Code', 'GitBranch', 'Database', 'Server',
    'Api', 'Webhook', 'Key', 'Shield', 'Lock'
  ];
}

// Search function that works across curated and complete libraries
export function searchEnhancedIcons(
  query: string, 
  scope: 'curated' | 'popular' | 'complete' = 'curated',
  limit?: number
): { icons: string[]; scope: string; total: number } {
  const enhancedData = getEnhancedIconsData();
  const lowercaseQuery = query.toLowerCase();
  
  let searchPool: string[] = [];
  
  switch (scope) {
    case 'curated':
      searchPool = enhancedData.curated.allIcons;
      break;
    case 'popular':
      searchPool = [
        ...enhancedData.popular.featured,
        ...Object.values(enhancedData.popular.byCategory).flat(),
        ...enhancedData.popular.trending
      ];
      break;
    case 'complete':
      // In real implementation, this would search the complete library
      searchPool = getAllIconsFromComplete();
      break;
  }
  
  const matchedIcons = searchPool.filter(icon => 
    icon.toLowerCase().includes(lowercaseQuery)
  );
  
  const results = limit ? matchedIcons.slice(0, limit) : matchedIcons;
  
  return {
    icons: [...new Set(results)], // Remove duplicates
    scope,
    total: matchedIcons.length
  };
}

// Helper to get all icons from complete library (lazy loaded)
function getAllIconsFromComplete(): string[] {
  // This would be implemented as a lazy-loaded function
  // For now, return a subset for demonstration
  return Object.values(lucideIconsData.categories)
    .flatMap((category: any) => category.icons || [])
    .slice(0, 1000); // Limit for performance demo
}

// Get icons by category with progressive loading
export function getIconsByCategory(
  categoryKey: string, 
  level: 'curated' | 'popular' | 'complete' = 'curated'
): { icons: string[]; hasMore: boolean; total: number } {
  const enhancedData = getEnhancedIconsData();
  
  switch (level) {
    case 'curated':
      const curatedCategory = enhancedData.curated.categories[categoryKey];
      return {
        icons: curatedCategory?.icons || [],
        hasMore: (curatedCategory?.totalAvailable || 0) > (curatedCategory?.icons.length || 0),
        total: curatedCategory?.icons.length || 0
      };
      
    case 'popular':
      const popularIcons = enhancedData.popular.byCategory[categoryKey] || [];
      return {
        icons: popularIcons,
        hasMore: true,
        total: popularIcons.length
      };
      
    case 'complete':
      // This would load from the complete library
      const completeCategory = findCompleteCategory(categoryKey, '');
      return {
        icons: completeCategory?.icons || [],
        hasMore: false,
        total: completeCategory?.icons.length || 0
      };
      
    default:
      return { icons: [], hasMore: false, total: 0 };
  }
}

// Analytics helpers (for future implementation)
export function trackIconUsage(iconName: string, context: string) {
  // This would send analytics data
  console.log(`Icon used: ${iconName} in ${context}`);
}

export function getIconRecommendations(
  currentIcons: string[], 
  context?: string
): string[] {
  // This would provide AI-powered recommendations
  const enhancedData = getEnhancedIconsData();
  return enhancedData.popular.featured.slice(0, 5);
}

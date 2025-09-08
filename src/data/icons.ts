export interface IconCategory {
  name: string;
  description: string;
  icons: string[];
}

export interface IconsData {
  categories: Record<string, IconCategory>;
  totalIcons: number;
  allIcons: string[];
  metadata: {
    totalIcons: number;
  };
}

// Sample icon data - in a real application, this would come from your icon library
export function getIconsData(): IconsData {
  const categories = {
    'arrows': {
      name: 'Arrows & Navigation',
      description: 'Direction arrows, navigation icons, and movement indicators',
      icons: [
        'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right',
        'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
        'arrow-up-right', 'arrow-down-left', 'corner-up-left', 'corner-down-right',
        'move', 'move-3d', 'navigation', 'compass'
      ]
    },
    'interface': {
      name: 'Interface & Controls',
      description: 'Common UI elements, buttons, and interactive controls',
      icons: [
        'home', 'settings', 'menu', 'search', 'filter', 'sort',
        'plus', 'minus', 'x', 'check', 'star', 'heart',
        'bell', 'bookmark', 'flag', 'info', 'help-circle', 'alert-circle'
      ]
    },
    'communication': {
      name: 'Communication',
      description: 'Email, messaging, phone, and social interaction icons',
      icons: [
        'mail', 'message-circle', 'message-square', 'send',
        'phone', 'phone-call', 'video', 'mic', 'mic-off',
        'share', 'share-2', 'at-sign', 'hash', 'link', 'external-link'
      ]
    },
    'files': {
      name: 'Files & Documents',
      description: 'File types, folders, and document management icons',
      icons: [
        'file', 'file-text', 'folder', 'folder-open',
        'download', 'upload', 'save', 'copy', 'scissors', 'clipboard',
        'image', 'video', 'music', 'archive', 'database', 'hard-drive'
      ]
    },
    'design': {
      name: 'Design & Graphics',
      description: 'Design tools, graphics, and creative icons',
      icons: [
        'palette', 'brush', 'pen-tool', 'edit', 'edit-2', 'edit-3',
        'eye', 'eye-off', 'layers', 'layout', 'grid', 'circle',
        'square', 'triangle', 'hexagon', 'zap', 'sun', 'moon'
      ]
    },
    'business': {
      name: 'Business & Finance',
      description: 'Business, finance, shopping, and commercial icons',
      icons: [
        'dollar-sign', 'credit-card', 'shopping-cart', 'shopping-bag',
        'briefcase', 'users', 'user', 'building', 'store',
        'trending-up', 'trending-down', 'bar-chart', 'pie-chart', 'target', 'award'
      ]
    },
    'technology': {
      name: 'Technology',
      description: 'Tech devices, connectivity, and digital icons',
      icons: [
        'smartphone', 'tablet', 'laptop', 'monitor', 'printer',
        'wifi', 'bluetooth', 'battery', 'plug', 'cpu', 'server',
        'cloud', 'cloud-upload', 'cloud-download', 'globe', 'lock', 'unlock'
      ]
    },
    'travel': {
      name: 'Travel & Transportation',
      description: 'Travel, maps, vehicles, and location icons',
      icons: [
        'map', 'map-pin', 'navigation', 'compass', 'car', 'truck',
        'plane', 'train', 'bike', 'walking', 'ship', 'anchor',
        'luggage', 'camera', 'tent', 'mountain', 'tree', 'palmtree'
      ]
    }
  };

  const totalIcons = Object.values(categories).reduce((total, category) => total + category.icons.length, 0);
  const allIcons = Object.values(categories).flatMap(category => category.icons);

  return {
    categories,
    totalIcons,
    allIcons,
    metadata: {
      totalIcons
    }
  };
}

// Helper function to search icons (simple technical name search only)
export function searchIcons(query: string, limit?: number): string[] {
  const data = getIconsData();
  const allIcons = Object.values(data.categories).flatMap(category => category.icons);
  const lowercaseQuery = query.toLowerCase();
  
  const matchedIcons = allIcons.filter((icon: string) => {
    const technicalName = icon.toLowerCase();
    return technicalName.includes(lowercaseQuery);
  });

  return limit ? matchedIcons.slice(0, limit) : matchedIcons;
}

// Helper function to get icons by category
export function getIconsByCategory(categoryId: string): string[] {
  const data = getIconsData();
  return data.categories[categoryId]?.icons || [];
}

// Helper function to get category for an icon
export function getIconCategory(iconName: string): IconCategory | null {
  const data = getIconsData();
  
  for (const category of Object.values(data.categories)) {
    if (category.icons.includes(iconName)) {
      return category;
    }
  }
  
  return null;
}

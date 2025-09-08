import { useState, useCallback, useEffect } from 'react';
import { CopyFormat } from '../utils/svgExtractor';

export interface CopyHistoryItem {
  id: string;
  iconName: string;
  format: CopyFormat;
  timestamp: number;
  content: string;
}

export interface FavoriteIcon {
  iconName: string;
  addedAt: number;
  category?: string;
}

const MAX_HISTORY_ITEMS = 50;
const STORAGE_KEYS = {
  HISTORY: 'mw-copy-history',
  FAVORITES: 'mw-favorite-icons'
};

export function useCopyHistory() {
  const [history, setHistory] = useState<CopyHistoryItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteIcon[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      
      if (storedHistory) {
        try {
          setHistory(JSON.parse(storedHistory));
        } catch (error) {
          console.error('Failed to parse copy history:', error);
        }
      }
      
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Failed to parse favorites:', error);
        }
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = useCallback((newHistory: CopyHistoryItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: FavoriteIcon[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
    }
  }, []);

  const addToHistory = useCallback((iconName: string, format: CopyFormat, content: string) => {
    const newItem: CopyHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      iconName,
      format,
      timestamp: Date.now(),
      content
    };

    setHistory(prev => {
      const newHistory = [newItem, ...prev.slice(0, MAX_HISTORY_ITEMS - 1)];
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.id !== id);
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    }
  }, []);

  const recopyChistoryItem = useCallback(async (item: CopyHistoryItem) => {
    try {
      await navigator.clipboard.writeText(item.content);
      return true;
    } catch (error) {
      console.error('Failed to copy from history:', error);
      return false;
    }
  }, []);

  const toggleFavorite = useCallback((iconName: string, category?: string) => {
    setFavorites(prev => {
      const existingIndex = prev.findIndex(fav => fav.iconName === iconName);
      let newFavorites: FavoriteIcon[];
      
      if (existingIndex >= 0) {
        // Remove from favorites
        newFavorites = prev.filter(fav => fav.iconName !== iconName);
      } else {
        // Add to favorites
        const newFavorite: FavoriteIcon = {
          iconName,
          addedAt: Date.now(),
          category
        };
        newFavorites = [newFavorite, ...prev];
      }
      
      saveFavorites(newFavorites);
      return newFavorites;
    });
  }, [saveFavorites]);

  const isFavorite = useCallback((iconName: string) => {
    return favorites.some(fav => fav.iconName === iconName);
  }, [favorites]);

  const getFavoritesByCategory = useCallback(() => {
    const categorized: Record<string, FavoriteIcon[]> = {};
    
    favorites.forEach(fav => {
      const category = fav.category || 'Uncategorized';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(fav);
    });
    
    return categorized;
  }, [favorites]);

  const searchHistory = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return history.filter(item =>
      item.iconName.toLowerCase().includes(lowercaseQuery) ||
      item.format.toLowerCase().includes(lowercaseQuery)
    );
  }, [history]);

  const getRecentIcons = useCallback((limit: number = 10) => {
    const recentIconNames = new Set<string>();
    const recent: string[] = [];
    
    for (const item of history) {
      if (!recentIconNames.has(item.iconName) && recent.length < limit) {
        recentIconNames.add(item.iconName);
        recent.push(item.iconName);
      }
    }
    
    return recent;
  }, [history]);

  const getPopularIcons = useCallback((limit: number = 10) => {
    const iconCounts: Record<string, number> = {};
    
    history.forEach(item => {
      iconCounts[item.iconName] = (iconCounts[item.iconName] || 0) + 1;
    });
    
    return Object.entries(iconCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([iconName]) => iconName);
  }, [history]);

  const toggleHistoryPanel = useCallback(() => {
    setIsHistoryOpen(prev => !prev);
  }, []);

  const toggleFavoritesPanel = useCallback(() => {
    setIsFavoritesOpen(prev => !prev);
  }, []);

  return {
    history,
    favorites,
    isHistoryOpen,
    isFavoritesOpen,
    addToHistory,
    removeFromHistory,
    clearHistory,
    recopyChistoryItem,
    toggleFavorite,
    isFavorite,
    getFavoritesByCategory,
    searchHistory,
    getRecentIcons,
    getPopularIcons,
    toggleHistoryPanel,
    toggleFavoritesPanel
  };
}

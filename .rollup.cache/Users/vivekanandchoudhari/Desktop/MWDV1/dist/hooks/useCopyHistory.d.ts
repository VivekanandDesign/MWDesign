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
export declare function useCopyHistory(): {
    history: CopyHistoryItem[];
    favorites: FavoriteIcon[];
    isHistoryOpen: boolean;
    isFavoritesOpen: boolean;
    addToHistory: (iconName: string, format: CopyFormat, content: string) => void;
    removeFromHistory: (id: string) => void;
    clearHistory: () => void;
    recopyChistoryItem: (item: CopyHistoryItem) => Promise<boolean>;
    toggleFavorite: (iconName: string, category?: string) => void;
    isFavorite: (iconName: string) => boolean;
    getFavoritesByCategory: () => Record<string, FavoriteIcon[]>;
    searchHistory: (query: string) => CopyHistoryItem[];
    getRecentIcons: (limit?: number) => string[];
    getPopularIcons: (limit?: number) => string[];
    toggleHistoryPanel: () => void;
    toggleFavoritesPanel: () => void;
};

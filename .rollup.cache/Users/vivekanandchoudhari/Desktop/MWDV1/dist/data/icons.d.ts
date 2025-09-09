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
export declare function getIconsData(): IconsData;
export declare function searchIcons(query: string, limit?: number): string[];
export declare function getIconsByCategory(categoryId: string): string[];
export declare function getIconCategory(iconName: string): IconCategory | null;

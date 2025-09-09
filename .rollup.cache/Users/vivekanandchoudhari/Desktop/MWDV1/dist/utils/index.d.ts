import { type ClassValue } from 'clsx';
/**
 * Combines class names using clsx and tailwind-merge
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Formats icon names from kebab-case to PascalCase
 */
export declare function formatIconName(name: string): string;
/**
 * Generates code snippets for icon usage
 */
export declare function generateIconCode(iconName: string, framework?: 'react' | 'vue' | 'html'): string;
/**
 * Debounce function for search and input operations
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Converts hex color to RGB values
 */
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Generates HSL color variations
 */
export declare function generateColorVariations(baseColor: string, steps?: number): string[];

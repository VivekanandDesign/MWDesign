import { CopyType, SVGCopyOptions } from '@/utils/svgExtractor';
export interface CopyState {
    copiedIcon: string | null;
    copiedType: CopyType | null;
    isLoading: boolean;
    error: string | null;
}
export interface UseCopyIconReturn {
    copyState: CopyState;
    copyIcon: (iconName: string, type: CopyType, options?: SVGCopyOptions) => Promise<void>;
    downloadIcon: (iconName: string, options?: SVGCopyOptions) => Promise<void>;
    clearCopyState: () => void;
}
/**
 * Custom hook for managing icon copy functionality
 */
export declare const useCopyIcon: (onSuccess?: (iconName: string, type: CopyType) => void, onError?: (error: string) => void) => UseCopyIconReturn;
/**
 * Hook for managing copy preferences
 */
export interface CopyPreferences {
    defaultCopyType: CopyType;
    defaultSVGSize: number;
    defaultStrokeWidth: number;
    autoCleanSVG: boolean;
    showCopyConfirmation: boolean;
}
export declare const useCopyPreferences: () => {
    preferences: CopyPreferences;
    updatePreferences: (updates: Partial<CopyPreferences>) => void;
    resetPreferences: () => void;
};
//# sourceMappingURL=useCopyIcon.d.ts.map
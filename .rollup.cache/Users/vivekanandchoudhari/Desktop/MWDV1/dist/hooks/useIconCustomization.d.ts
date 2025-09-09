export interface IconCustomization {
    size: number;
    strokeWidth: number;
    color: string;
    fillColor?: string;
    className?: string;
}
export interface CustomizationPreferences {
    defaultSize: number;
    defaultStrokeWidth: number;
    defaultColor: string;
    includeClassName: boolean;
    preferredFormat: 'svg' | 'jsx' | 'import';
    namingConvention: 'camelCase' | 'PascalCase' | 'kebab-case';
}
export declare function useIconCustomization(): {
    customization: IconCustomization;
    preferences: CustomizationPreferences;
    isCustomizing: boolean;
    updateCustomization: (updates: Partial<IconCustomization>) => void;
    updatePreferences: (updates: Partial<CustomizationPreferences>) => void;
    resetCustomization: () => void;
    applyPreferencesToCustomization: () => void;
    toggleCustomizationPanel: () => void;
    generateCustomizedSVG: (originalSVG: string) => string;
    generateCustomizedJSX: (iconName: string) => string;
    generateCustomizedImport: (iconName: string) => string;
};

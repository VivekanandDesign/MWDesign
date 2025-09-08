import { useState, useCallback } from 'react';

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

const DEFAULT_CUSTOMIZATION: IconCustomization = {
  size: 24,
  strokeWidth: 2,
  color: 'currentColor'
};

const DEFAULT_PREFERENCES: CustomizationPreferences = {
  defaultSize: 24,
  defaultStrokeWidth: 2,
  defaultColor: 'currentColor',
  includeClassName: true,
  preferredFormat: 'jsx',
  namingConvention: 'PascalCase'
};

export function useIconCustomization() {
  const [customization, setCustomization] = useState<IconCustomization>(DEFAULT_CUSTOMIZATION);
  const [preferences, setPreferences] = useState<CustomizationPreferences>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mw-icon-preferences');
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    }
    return DEFAULT_PREFERENCES;
  });
  const [isCustomizing, setIsCustomizing] = useState(false);

  const updateCustomization = useCallback((updates: Partial<IconCustomization>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  }, []);

  const updatePreferences = useCallback((updates: Partial<CustomizationPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('mw-icon-preferences', JSON.stringify(newPreferences));
    }
  }, [preferences]);

  const resetCustomization = useCallback(() => {
    setCustomization(DEFAULT_CUSTOMIZATION);
  }, []);

  const applyPreferencesToCustomization = useCallback(() => {
    setCustomization({
      size: preferences.defaultSize,
      strokeWidth: preferences.defaultStrokeWidth,
      color: preferences.defaultColor,
      className: preferences.includeClassName ? '' : undefined
    });
  }, [preferences]);

  const toggleCustomizationPanel = useCallback(() => {
    setIsCustomizing(prev => !prev);
  }, []);

  const generateCustomizedSVG = useCallback((originalSVG: string): string => {
    let customizedSVG = originalSVG;
    
    // Update size
    customizedSVG = customizedSVG.replace(
      /width="[^"]*"/g,
      `width="${customization.size}"`
    );
    customizedSVG = customizedSVG.replace(
      /height="[^"]*"/g,
      `height="${customization.size}"`
    );
    
    // Update stroke-width
    customizedSVG = customizedSVG.replace(
      /stroke-width="[^"]*"/g,
      `stroke-width="${customization.strokeWidth}"`
    );
    
    // Update color
    if (customization.color !== 'currentColor') {
      customizedSVG = customizedSVG.replace(
        /stroke="currentColor"/g,
        `stroke="${customization.color}"`
      );
    }
    
    // Add fill color if specified
    if (customization.fillColor) {
      customizedSVG = customizedSVG.replace(
        /fill="none"/g,
        `fill="${customization.fillColor}"`
      );
    }
    
    // Add custom class if specified
    if (customization.className) {
      customizedSVG = customizedSVG.replace(
        /<svg([^>]*)>/,
        `<svg$1 class="${customization.className}">`
      );
    }
    
    return customizedSVG;
  }, [customization]);

  const generateCustomizedJSX = useCallback((iconName: string): string => {
    const componentName = formatIconName(iconName, preferences.namingConvention);
    const props = [];
    
    if (customization.size !== 24) {
      props.push(`size={${customization.size}}`);
    }
    if (customization.strokeWidth !== 2) {
      props.push(`strokeWidth={${customization.strokeWidth}}`);
    }
    if (customization.color !== 'currentColor') {
      props.push(`color="${customization.color}"`);
    }
    if (customization.className) {
      props.push(`className="${customization.className}"`);
    }
    
    const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
    
    return `<${componentName}${propsString} />`;
  }, [customization, preferences.namingConvention]);

  const generateCustomizedImport = useCallback((iconName: string): string => {
    const componentName = formatIconName(iconName, preferences.namingConvention);
    return `import { ${componentName} } from 'lucide-react';`;
  }, [preferences.namingConvention]);

  return {
    customization,
    preferences,
    isCustomizing,
    updateCustomization,
    updatePreferences,
    resetCustomization,
    applyPreferencesToCustomization,
    toggleCustomizationPanel,
    generateCustomizedSVG,
    generateCustomizedJSX,
    generateCustomizedImport
  };
}

function formatIconName(iconName: string, convention: CustomizationPreferences['namingConvention']): string {
  switch (convention) {
    case 'camelCase':
      return iconName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    case 'PascalCase':
      return iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    case 'kebab-case':
    default:
      return iconName;
  }
}

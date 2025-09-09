// Utility functions for MW Design System
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/**
 * Formats icon names from kebab-case to PascalCase
 */
export function formatIconName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
/**
 * Generates code snippets for icon usage
 */
export function generateIconCode(iconName, framework = 'react') {
    const formattedName = formatIconName(iconName);
    switch (framework) {
        case 'react':
            return `import { ${formattedName} } from 'lucide-react'

<${formattedName} size={24} />`;
        case 'vue':
            return `<template>
  <${formattedName} :size="24" />
</template>

<script>
import { ${formattedName} } from 'lucide-vue-next'
export default {
  components: { ${formattedName} }
}
</script>`;
        case 'html':
            return `<i data-lucide="${iconName}"></i>

<!-- Include Lucide script -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>lucide.createIcons();</script>`;
        default:
            return '';
    }
}
/**
 * Debounce function for search and input operations
 */
export function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
/**
 * Converts hex color to RGB values
 */
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        : null;
}
/**
 * Generates HSL color variations
 */
export function generateColorVariations(baseColor, steps = 10) {
    // This is a simplified version - in a real implementation,
    // you'd want more sophisticated color manipulation
    const variations = [];
    for (let i = 0; i < steps; i++) {
        const lightness = (i / (steps - 1)) * 100;
        variations.push(`hsl(${baseColor}, ${lightness}%)`);
    }
    return variations;
}
//# sourceMappingURL=index.js.map
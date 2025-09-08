export type CodeFormat = 'svg' | 'jsx' | 'vue' | 'svelte';

export interface IconCustomization {
  size: number;
  color: string;
  strokeWidth: number;
  fillColor?: string;
  className?: string;
}

export function generateIconCode(
  iconName: string,
  format: CodeFormat,
  customization: IconCustomization
): string {
  const { size, color, strokeWidth, fillColor } = customization;
  
  switch (format) {
    case 'svg':
      return generateSVGCode(iconName, customization);
    case 'jsx':
      return generateJSXCode(iconName, customization);
    case 'vue':
      return generateVueCode(iconName, customization);
    case 'svelte':
      return generateSvelteCode(iconName, customization);
    default:
      return generateSVGCode(iconName, customization);
  }
}

function generateSVGCode(iconName: string, customization: IconCustomization): string {
  const { size, color, strokeWidth, fillColor } = customization;
  
  // This is a simplified SVG generator - in a real app, you'd have actual icon data
  return `  stroke="${color}" 
  stroke-width="${strokeWidth}" 
  fill="${fillColor === 'currentColor' ? 'none' : fillColor || 'none'}" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  <!-- ${iconName} icon paths would go here -->
  <path d="..." />
</svg>`;
}

function generateJSXCode(iconName: string, customization: IconCustomization): string {
  const { size, color, strokeWidth, fillColor } = customization;
  const componentName = iconName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
  
  return `import React from 'react';

export const ${componentName}Icon = () => (
  <svg 
    width={${size}} 
    height={${size}} 
    viewBox="0 0 24 24" 
    fill="${fillColor === 'currentColor' ? 'none' : fillColor || 'none'}" 
    stroke="${color}" 
    strokeWidth={${strokeWidth}} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* ${iconName} icon paths */}
    <path d="..." />
  </svg>
);

// Usage:
// <${componentName}Icon />`;
}

function generateVueCode(iconName: string, customization: IconCustomization): string {
  const { size, color, strokeWidth, fillColor } = customization;
  const componentName = iconName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
  
  return `<template>
  <svg 
    :width="${size}" 
    :height="${size}" 
    viewBox="0 0 24 24" 
    fill="${fillColor === 'currentColor' ? 'none' : fillColor || 'none'}" 
    stroke="${color}" 
    :stroke-width="${strokeWidth}" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <!-- ${iconName} icon paths -->
    <path d="..." />
  </svg>
</template>

<script>
export default {
  name: '${componentName}Icon'
}
</script>`;
}

function generateSvelteCode(iconName: string, customization: IconCustomization): string {
  const { size, color, strokeWidth, fillColor } = customization;
  
  return `<svg 
  width={${size}} 
  height={${size}} 
  viewBox="0 0 24 24" 
  fill="${fillColor === 'currentColor' ? 'none' : fillColor || 'none'}" 
  stroke="${color}" 
  stroke-width={${strokeWidth}} 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <!-- ${iconName} icon paths -->
  <path d="..." />
</svg>

<!-- Usage: <${iconName.charAt(0).toUpperCase() + iconName.slice(1)}Icon /> -->`;
}

export function generateCodeSnippets(iconName: string, customization: IconCustomization) {
  return {
    svg: generateSVGCode(iconName, customization),
    jsx: generateJSXCode(iconName, customization),
    vue: generateVueCode(iconName, customization),
    svelte: generateSvelteCode(iconName, customization),
    
    // Additional code examples
    html: `<!-- HTML with CSS classes -->
<i class="icon-${iconName}" style="font-size: ${customization.size}px; color: ${customization.color};"></i>

<!-- Or with inline SVG -->
${generateSVGCode(iconName, customization)}`,

    css: `.icon-${iconName} {
  width: ${customization.size}px;
  height: ${customization.size}px;
  color: ${customization.color};
  stroke-width: ${customization.strokeWidth};
}

.icon-${iconName}:hover {
  opacity: 0.8;
  transform: scale(1.1);
  transition: all 0.2s ease;
}`,

    tailwind: `<!-- Tailwind CSS classes -->
<svg className="w-${Math.floor(customization.size / 4)} h-${Math.floor(customization.size / 4)} text-gray-600 hover:text-gray-800">
  <!-- icon paths -->
</svg>

<!-- With custom sizing -->
<svg 
  className="inline-block" 
  style={{ width: '${customization.size}px', height: '${customization.size}px', color: '${customization.color}' }}
>
  <!-- icon paths -->
</svg>`
  };
}

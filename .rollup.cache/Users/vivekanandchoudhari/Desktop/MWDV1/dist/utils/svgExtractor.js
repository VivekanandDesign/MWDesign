import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as LucideIcons from 'lucide-react';
export var CopyType;
(function (CopyType) {
    CopyType["IMPORT"] = "import";
    CopyType["SVG"] = "svg";
    CopyType["JSX"] = "jsx";
    CopyType["DOWNLOAD"] = "download";
})(CopyType || (CopyType = {}));
/**
 * Extract SVG markup from a Lucide icon component
 */
export const extractSVGFromIcon = (iconName, options = {}) => {
    const { size = 24, strokeWidth = 2, removeIds = true, addClasses = true, customAttributes = {}, format = 'optimized' } = options;
    // Get the icon component from Lucide
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) {
        throw new Error(`Icon "${iconName}" not found in Lucide icons`);
    }
    try {
        // Create React element with specified props
        const iconElement = React.createElement(IconComponent, Object.assign({ size,
            strokeWidth }, customAttributes));
        // Render to static markup (SVG string)
        let svgMarkup = renderToStaticMarkup(iconElement);
        // Post-process the SVG based on format
        svgMarkup = postProcessSVG(svgMarkup, {
            removeIds,
            addClasses,
            format,
            iconName
        });
        return svgMarkup;
    }
    catch (error) {
        console.error(`Failed to extract SVG for icon "${iconName}":`, error);
        throw new Error(`Failed to extract SVG for icon "${iconName}"`);
    }
};
/**
 * Post-process SVG markup for optimization and customization
 */
const postProcessSVG = (svgMarkup, options) => {
    const { removeIds, addClasses, format, iconName } = options;
    let processed = svgMarkup;
    // Remove auto-generated IDs if requested
    if (removeIds) {
        processed = processed.replace(/id="[^"]*"/g, '');
    }
    // Add semantic classes if requested
    if (addClasses && iconName) {
        processed = processed.replace('<svg', `<svg class="icon icon-${iconName.toLowerCase()}"`);
    }
    // Format-specific optimizations
    if (format === 'optimized') {
        // Remove unnecessary whitespace
        processed = processed.replace(/>\s+</g, '><');
        // Add viewBox if missing (Lucide should have it, but just in case)
        if (!processed.includes('viewBox') && processed.includes('width="24"')) {
            processed = processed.replace('width="24" height="24"', 'viewBox="0 0 24 24" width="24" height="24"');
        }
    }
    if (format === 'inline') {
        // Remove XML declaration and make suitable for inline use
        processed = processed.replace(/^<\?xml[^>]*>\s*/, '');
    }
    return processed;
};
/**
 * Generate different copy formats
 */
export const generateCopyContent = (iconName, copyType, options = {}) => {
    switch (copyType) {
        case CopyType.IMPORT:
            return `import { ${iconName} } from 'lucide-react'`;
        case CopyType.SVG:
            return extractSVGFromIcon(iconName, options);
        case CopyType.JSX:
            const svgContent = extractSVGFromIcon(iconName, Object.assign(Object.assign({}, options), { format: 'raw' }));
            // Convert SVG to JSX format
            let jsxContent = svgContent
                .replace(/class=/g, 'className=')
                .replace(/stroke-width=/g, 'strokeWidth=')
                .replace(/stroke-linecap=/g, 'strokeLinecap=')
                .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
                .replace(/fill-rule=/g, 'fillRule=')
                .replace(/clip-rule=/g, 'clipRule=');
            return `const ${iconName}Icon = () => (\n  ${jsxContent}\n)`;
        default:
            throw new Error(`Unsupported copy type: ${copyType}`);
    }
};
/**
 * Copy content to clipboard with proper error handling
 */
export const copyToClipboard = async (content, type = 'content') => {
    try {
        await navigator.clipboard.writeText(content);
        return true;
    }
    catch (error) {
        console.error('Failed to copy to clipboard:', error);
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = content;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        }
        catch (fallbackError) {
            console.error('Fallback copy method also failed:', fallbackError);
            return false;
        }
    }
};
/**
 * Download SVG as file
 */
export const downloadSVG = (iconName, options = {}) => {
    try {
        const svgContent = extractSVGFromIcon(iconName, Object.assign(Object.assign({}, options), { format: 'raw' }));
        // Add XML declaration for proper SVG file
        const fullSVGContent = `<?xml version="1.0" encoding="UTF-8"?>\n${svgContent}`;
        const blob = new Blob([fullSVGContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${iconName.toLowerCase()}.svg`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }
    catch (error) {
        console.error(`Failed to download SVG for icon "${iconName}":`, error);
        throw error;
    }
};
/**
 * Get optimized SVG attributes for different use cases
 */
export const getOptimizedSVGAttributes = (useCase) => {
    const baseAttributes = {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
    };
    switch (useCase) {
        case 'web':
            return Object.assign(Object.assign({}, baseAttributes), { 'aria-hidden': 'true', focusable: 'false' });
        case 'print':
            return Object.assign(Object.assign({}, baseAttributes), { stroke: '#000000' });
        case 'icon':
            return Object.assign(Object.assign({}, baseAttributes), { width: '1em', height: '1em' });
        default:
            return baseAttributes;
    }
};
//# sourceMappingURL=svgExtractor.js.map
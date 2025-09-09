export declare enum CopyType {
    IMPORT = "import",
    SVG = "svg",
    JSX = "jsx",
    DOWNLOAD = "download"
}
export type CopyFormat = 'import' | 'svg' | 'jsx' | 'download';
export interface SVGCopyOptions {
    size?: number;
    strokeWidth?: number;
    removeIds?: boolean;
    addClasses?: boolean;
    customAttributes?: Record<string, string>;
    format?: 'raw' | 'optimized' | 'inline';
}
/**
 * Extract SVG markup from a Lucide icon component
 */
export declare const extractSVGFromIcon: (iconName: string, options?: SVGCopyOptions) => string;
/**
 * Generate different copy formats
 */
export declare const generateCopyContent: (iconName: string, copyType: CopyType, options?: SVGCopyOptions) => string;
/**
 * Copy content to clipboard with proper error handling
 */
export declare const copyToClipboard: (content: string, type?: string) => Promise<boolean>;
/**
 * Download SVG as file
 */
export declare const downloadSVG: (iconName: string, options?: SVGCopyOptions) => void;
/**
 * Get optimized SVG attributes for different use cases
 */
export declare const getOptimizedSVGAttributes: (useCase: "web" | "print" | "icon") => {
    xmlns: string;
    fill: string;
    viewBox: string;
    stroke: string;
} | {
    'aria-hidden': string;
    focusable: string;
    xmlns: string;
    fill: string;
    viewBox: string;
    stroke: string;
} | {
    width: string;
    height: string;
    xmlns: string;
    fill: string;
    viewBox: string;
    stroke: string;
};
//# sourceMappingURL=svgExtractor.d.ts.map
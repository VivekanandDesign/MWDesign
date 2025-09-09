export type CodeFormat = 'svg' | 'jsx' | 'vue' | 'svelte';
export interface IconCustomization {
    size: number;
    color: string;
    strokeWidth: number;
    fillColor?: string;
    className?: string;
}
export declare function generateIconCode(iconName: string, format: CodeFormat, customization: IconCustomization): string;
export declare function generateCodeSnippets(iconName: string, customization: IconCustomization): {
    svg: string;
    jsx: string;
    vue: string;
    svelte: string;
    html: string;
    css: string;
    tailwind: string;
};
//# sourceMappingURL=iconCodeGenerator.d.ts.map
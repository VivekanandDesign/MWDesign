import React from 'react';
import { CopyType } from '@/utils/svgExtractor';
interface CopyIconButtonProps {
    iconName: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showDropdown?: boolean;
    iconSize?: number;
    strokeWidth?: number;
}
export declare const CopyIconButton: React.FC<CopyIconButtonProps>;
/**
 * Simple icon copy button for minimal use cases
 */
export declare const SimpleCopyButton: React.FC<{
    iconName: string;
    copyType?: CopyType;
    size?: number;
    className?: string;
}>;
export {};
//# sourceMappingURL=CopyIconButton.d.ts.map
import React from 'react';
import { CopyType } from '../utils/svgExtractor';
interface EnhancedCopyIconButtonProps {
    iconName: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    showFavorite?: boolean;
    showCustomize?: boolean;
    onCustomizeClick?: () => void;
}
export declare function EnhancedCopyIconButton({ iconName, className, variant, size, showFavorite, showCustomize, onCustomizeClick }: EnhancedCopyIconButtonProps): React.JSX.Element;
export declare function SimpleCopyButton({ iconName, type, className, variant, size }: {
    iconName: string;
    type?: CopyType;
    className?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}): React.JSX.Element;
export {};

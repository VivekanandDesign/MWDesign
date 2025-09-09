import React from 'react';
import { IconCustomization } from '@/hooks/useIconCustomization';
interface IconPreviewProps {
    iconName: string;
    customization: IconCustomization;
    className?: string;
}
export declare function IconPreview({ iconName, customization, className }: IconPreviewProps): React.JSX.Element;
export {};

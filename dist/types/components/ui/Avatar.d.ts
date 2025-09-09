import React from 'react';
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    variant?: 'circle' | 'square';
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    max?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    spacing?: 'tight' | 'normal' | 'loose';
}
export declare const AvatarGroup: React.ForwardRefExoticComponent<AvatarGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Avatar.d.ts.map
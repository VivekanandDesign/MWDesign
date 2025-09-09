import './mw-loader.css';
export interface MWLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'gradient' | 'outline';
    animation?: 'pulse' | 'wave' | 'typewriter' | 'glow' | 'bounce';
    speed?: 'slow' | 'normal' | 'fast';
}
export declare const MWLoader: import("react").ForwardRefExoticComponent<MWLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWDotsLoaderProps extends Omit<MWLoaderProps, 'animation'> {
    showDots?: boolean;
    dotAnimation?: 'typing' | 'bouncing' | 'fading';
}
export declare const MWDotsLoader: import("react").ForwardRefExoticComponent<MWDotsLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWBrandLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'spin' | 'pulse' | 'scale';
    showText?: boolean;
}
export declare const MWBrandLoader: import("react").ForwardRefExoticComponent<MWBrandLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWProgressiveLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'gradient' | 'outline';
    speed?: 'slow' | 'normal' | 'fast';
    direction?: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top' | 'center-out' | 'edges-in';
    fillColor?: string;
}
export declare const MWProgressiveLoader: import("react").ForwardRefExoticComponent<MWProgressiveLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWGlitchLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    intensity?: 'low' | 'medium' | 'high';
    speed?: 'slow' | 'normal' | 'fast';
}
export declare const MWGlitchLoader: import("react").ForwardRefExoticComponent<MWGlitchLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWHeartbeatLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'gradient' | 'pulse';
    speed?: 'slow' | 'normal' | 'fast';
}
export declare const MWHeartbeatLoader: import("react").ForwardRefExoticComponent<MWHeartbeatLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWMatrixLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    speed?: 'slow' | 'normal' | 'fast';
}
export declare const MWMatrixLoader: import("react").ForwardRefExoticComponent<MWMatrixLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWNeonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'purple' | 'cyan' | 'pink';
    speed?: 'slow' | 'normal' | 'fast';
}
export declare const MWNeonLoader: import("react").ForwardRefExoticComponent<MWNeonLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface MWBounceLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'gradient' | 'rainbow';
    speed?: 'slow' | 'normal' | 'fast';
}
export declare const MWBounceLoader: import("react").ForwardRefExoticComponent<MWBounceLoaderProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MWLoader.d.ts.map
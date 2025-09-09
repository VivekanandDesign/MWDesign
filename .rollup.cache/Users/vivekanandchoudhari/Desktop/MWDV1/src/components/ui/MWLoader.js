'use client';
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import './mw-loader.css';
const loaderSizes = {
    sm: 'text-sm', // 14px
    md: 'text-lg', // 18px  
    lg: 'text-xl', // 20px
    xl: 'text-2xl' // 24px
};
const loaderVariants = {
    default: 'text-mw-gray-600 dark:text-mw-gray-400',
    primary: 'text-mw-blue-600 dark:text-mw-blue-400',
    gradient: 'bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text text-transparent',
    outline: 'text-transparent'
};
const animationSpeeds = {
    slow: '3s',
    normal: '2s',
    fast: '1s'
};
export const MWLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', variant = 'primary', animation = 'pulse', speed = 'normal' } = _a, props = __rest(_a, ["className", "size", "variant", "animation", "speed"]);
    const getAnimationClass = () => {
        switch (animation) {
            case 'pulse':
                return 'animate-pulse';
            case 'wave':
                return 'animate-mw-wave';
            case 'typewriter':
                return 'animate-mw-typewriter';
            case 'glow':
                return 'animate-mw-glow';
            case 'bounce':
                return 'animate-bounce';
            default:
                return 'animate-pulse';
        }
    };
    const getOutlineStyle = () => {
        if (variant === 'outline') {
            return {
                WebkitTextStroke: '2px #2563EB',
                textStroke: '2px #2563EB'
            };
        }
        return {};
    };
    if (animation === 'typewriter') {
        return (_jsx("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider', loaderSizes[size], className), style: Object.assign({ animationDuration: animationSpeeds[speed] }, getOutlineStyle()), role: "status", "aria-label": "Loading" }, props, { children: _jsx("span", { className: clsx('relative overflow-hidden', loaderVariants[variant], 'before:content-["MW"] before:absolute before:left-0 before:top-0', 'before:w-0 before:animate-[typewriter_2s_steps(2,end)_infinite]', 'before:border-r-2 before:border-r-mw-blue-600', 'before:bg-white before:dark:bg-mw-gray-900'), children: "MW" }) })));
    }
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider select-none', loaderSizes[size], loaderVariants[variant], getAnimationClass(), className), style: Object.assign({ animationDuration: animationSpeeds[speed] }, getOutlineStyle()), role: "status", "aria-label": "Loading" }, props, { children: "MW" })));
});
MWLoader.displayName = 'MWLoader';
export const MWDotsLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', variant = 'primary', speed = 'normal', showDots = true, dotAnimation = 'typing' } = _a, props = __rest(_a, ["className", "size", "variant", "speed", "showDots", "dotAnimation"]);
    const getDotAnimationClass = () => {
        switch (dotAnimation) {
            case 'typing':
                return 'animate-[typing_1.5s_ease-in-out_infinite]';
            case 'bouncing':
                return 'animate-bounce';
            case 'fading':
                return 'animate-pulse';
            default:
                return 'animate-pulse';
        }
    };
    return (_jsxs("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center gap-1', className), role: "status", "aria-label": "Loading" }, props, { children: [_jsx("span", { className: clsx('font-bold tracking-wider', loaderSizes[size], loaderVariants[variant]), children: "MW" }), showDots && (_jsxs("div", { className: "flex items-center space-x-1 ml-2", children: [_jsx("div", { className: clsx('w-2 h-2 rounded-full', variant === 'primary' ? 'bg-mw-blue-600' : 'bg-current', getDotAnimationClass()), style: { animationDelay: '0s' } }), _jsx("div", { className: clsx('w-2 h-2 rounded-full', variant === 'primary' ? 'bg-mw-blue-600' : 'bg-current', getDotAnimationClass()), style: { animationDelay: '0.2s' } }), _jsx("div", { className: clsx('w-2 h-2 rounded-full', variant === 'primary' ? 'bg-mw-blue-600' : 'bg-current', getDotAnimationClass()), style: { animationDelay: '0.4s' } })] }))] })));
});
MWDotsLoader.displayName = 'MWDotsLoader';
export const MWBrandLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', variant = 'pulse', showText = true } = _a, props = __rest(_a, ["className", "size", "variant", "showText"]);
    const brandSizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-24 h-24 text-xl'
    };
    const getAnimationClass = () => {
        switch (variant) {
            case 'spin':
                return 'animate-spin';
            case 'pulse':
                return 'animate-pulse';
            case 'scale':
                return 'animate-[scale_2s_ease-in-out_infinite]';
            default:
                return 'animate-pulse';
        }
    };
    return (_jsxs("div", Object.assign({ ref: ref, className: clsx('flex flex-col items-center justify-center space-y-3', className), role: "status", "aria-label": "Loading" }, props, { children: [_jsx("div", { className: clsx('flex items-center justify-center rounded-lg bg-mw-blue-600 text-white font-bold', brandSizes[size], getAnimationClass()), children: "MW" }), showText && (_jsx("div", { className: "text-sm text-mw-gray-600 dark:text-mw-gray-400 font-medium", children: "Loading..." }))] })));
});
MWBrandLoader.displayName = 'MWBrandLoader';
export const MWProgressiveLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', variant = 'primary', speed = 'normal', direction = 'left-to-right', fillColor } = _a, props = __rest(_a, ["className", "size", "variant", "speed", "direction", "fillColor"]);
    const animationDuration = {
        slow: '3s',
        normal: '2s',
        fast: '1s'
    };
    const getVariantColor = () => {
        if (fillColor)
            return fillColor;
        switch (variant) {
            case 'default':
                return '#6B7280'; // mw-gray-500
            case 'primary':
                return '#2563EB'; // mw-blue-600
            case 'gradient':
                return 'url(#mw-gradient)';
            case 'outline':
                return 'transparent';
            default:
                return '#2563EB';
        }
    };
    const getOutlineStyle = () => {
        if (variant === 'outline') {
            return {
                WebkitTextStroke: '2px #2563EB',
                textStroke: '2px #2563EB'
            };
        }
        return {};
    };
    const getAnimationName = () => {
        switch (direction) {
            case 'left-to-right':
                return 'mw-fill-left-right';
            case 'right-to-left':
                return 'mw-fill-right-left';
            case 'top-to-bottom':
                return 'mw-fill-top-bottom';
            case 'bottom-to-top':
                return 'mw-fill-bottom-top';
            case 'center-out':
                return 'mw-fill-center-out';
            case 'edges-in':
                return 'mw-fill-edges-in';
            default:
                return 'mw-fill-left-right';
        }
    };
    const getClipPathStyle = () => {
        const animationName = getAnimationName();
        return {
            animation: `${animationName} ${animationDuration[speed]} ease-in-out infinite`
        };
    };
    return (_jsxs("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider relative overflow-hidden', loaderSizes[size], className), role: "status", "aria-label": "Loading" }, props, { children: [_jsx("span", { className: "text-mw-gray-300 dark:text-mw-gray-600 select-none relative z-10", style: getOutlineStyle(), children: "MW" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center overflow-hidden z-20", style: Object.assign(Object.assign({ color: getVariantColor(), background: variant === 'gradient'
                        ? 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)'
                        : 'transparent', WebkitBackgroundClip: variant === 'gradient' ? 'text' : 'initial', backgroundClip: variant === 'gradient' ? 'text' : 'initial' }, getClipPathStyle()), getOutlineStyle()), children: _jsx("span", { className: "font-bold tracking-wider select-none", style: {
                        color: variant === 'gradient' ? 'transparent' : getVariantColor()
                    }, children: "MW" }) }), variant === 'gradient' && (_jsx("svg", { width: "0", height: "0", className: "absolute", children: _jsx("defs", { children: _jsxs("linearGradient", { id: "mw-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [_jsx("stop", { offset: "0%", stopColor: "#2563EB" }), _jsx("stop", { offset: "100%", stopColor: "#1D4ED8" })] }) }) }))] })));
});
MWProgressiveLoader.displayName = 'MWProgressiveLoader';
export const MWGlitchLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', intensity = 'medium', speed = 'normal' } = _a, props = __rest(_a, ["className", "size", "intensity", "speed"]);
    const animationDuration = {
        slow: '4s',
        normal: '2s',
        fast: '1s'
    };
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider relative', loaderSizes[size], className), style: {
            animation: `mw-glitch-${intensity} ${animationDuration[speed]} linear infinite`
        }, role: "status", "aria-label": "Loading" }, props, { children: _jsxs("span", { className: "text-mw-blue-600 dark:text-mw-blue-400 select-none relative", children: ["MW", _jsx("span", { className: "absolute inset-0 text-red-500 opacity-70 animate-mw-glitch-red", children: "MW" }), _jsx("span", { className: "absolute inset-0 text-cyan-500 opacity-70 animate-mw-glitch-cyan", children: "MW" })] }) })));
});
MWGlitchLoader.displayName = 'MWGlitchLoader';
export const MWHeartbeatLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', variant = 'primary', speed = 'normal' } = _a, props = __rest(_a, ["className", "size", "variant", "speed"]);
    const animationDuration = {
        slow: '3s',
        normal: '1.5s',
        fast: '1s'
    };
    const getVariantClass = () => {
        switch (variant) {
            case 'primary':
                return 'text-mw-blue-600 dark:text-mw-blue-400';
            case 'gradient':
                return 'bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text text-transparent';
            case 'pulse':
                return 'text-mw-blue-600 dark:text-mw-blue-400';
            default:
                return 'text-mw-blue-600 dark:text-mw-blue-400';
        }
    };
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider', loaderSizes[size], getVariantClass(), className), style: {
            animation: `mw-heartbeat ${animationDuration[speed]} ease-in-out infinite`
        }, role: "status", "aria-label": "Loading" }, props, { children: _jsx("span", { className: "select-none", children: "MW" }) })));
});
MWHeartbeatLoader.displayName = 'MWHeartbeatLoader';
export const MWMatrixLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', speed = 'normal' } = _a, props = __rest(_a, ["className", "size", "speed"]);
    const animationDuration = {
        slow: '4s',
        normal: '2s',
        fast: '1s'
    };
    return (_jsxs("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider relative overflow-hidden', loaderSizes[size], className), role: "status", "aria-label": "Loading" }, props, { children: [_jsx("span", { className: "text-mw-blue-600 dark:text-mw-blue-400 select-none relative z-10", children: "MW" }), _jsxs("div", { className: "absolute inset-0 text-green-400 opacity-30 font-mono text-xs", style: {
                    animation: `mw-matrix-rain ${animationDuration[speed]} linear infinite`
                }, children: [_jsx("span", { className: "absolute animate-mw-matrix-1", children: "01" }), _jsx("span", { className: "absolute animate-mw-matrix-2", children: "10" }), _jsx("span", { className: "absolute animate-mw-matrix-3", children: "11" })] })] })));
});
MWMatrixLoader.displayName = 'MWMatrixLoader';
export const MWNeonLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', color = 'blue', speed = 'normal' } = _a, props = __rest(_a, ["className", "size", "color", "speed"]);
    const animationDuration = {
        slow: '3s',
        normal: '2s',
        fast: '1s'
    };
    const getColorClass = () => {
        switch (color) {
            case 'blue':
                return 'text-blue-400';
            case 'purple':
                return 'text-purple-400';
            case 'cyan':
                return 'text-cyan-400';
            case 'pink':
                return 'text-pink-400';
            default:
                return 'text-blue-400';
        }
    };
    const getNeonShadow = () => {
        switch (color) {
            case 'blue':
                return '0 0 5px #60A5FA, 0 0 10px #60A5FA, 0 0 15px #60A5FA';
            case 'purple':
                return '0 0 5px #C084FC, 0 0 10px #C084FC, 0 0 15px #C084FC';
            case 'cyan':
                return '0 0 5px #22D3EE, 0 0 10px #22D3EE, 0 0 15px #22D3EE';
            case 'pink':
                return '0 0 5px #F472B6, 0 0 10px #F472B6, 0 0 15px #F472B6';
            default:
                return '0 0 5px #60A5FA, 0 0 10px #60A5FA, 0 0 15px #60A5FA';
        }
    };
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider', loaderSizes[size], getColorClass(), className), style: {
            textShadow: getNeonShadow(),
            animation: `mw-neon-flicker ${animationDuration[speed]} ease-in-out infinite`
        }, role: "status", "aria-label": "Loading" }, props, { children: _jsx("span", { className: "select-none", children: "MW" }) })));
});
MWNeonLoader.displayName = 'MWNeonLoader';
export const MWBounceLoader = forwardRef((_a, ref) => {
    var { className, size = 'md', variant = 'primary', speed = 'normal' } = _a, props = __rest(_a, ["className", "size", "variant", "speed"]);
    const animationDuration = {
        slow: '2s',
        normal: '1s',
        fast: '0.5s'
    };
    const getVariantClass = (letter) => {
        switch (variant) {
            case 'primary':
                return 'text-mw-blue-600 dark:text-mw-blue-400';
            case 'gradient':
                return 'bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text text-transparent';
            case 'rainbow':
                return letter === 'M' ? 'text-pink-500' : 'text-purple-500';
            default:
                return 'text-mw-blue-600 dark:text-mw-blue-400';
        }
    };
    return (_jsxs("div", Object.assign({ ref: ref, className: clsx('inline-flex items-center justify-center font-bold tracking-wider', loaderSizes[size], className), role: "status", "aria-label": "Loading" }, props, { children: [_jsx("span", { className: clsx('select-none', getVariantClass('M')), style: {
                    animation: `mw-bounce-letter ${animationDuration[speed]} ease-in-out infinite`,
                    animationDelay: '0s'
                }, children: "M" }), _jsx("span", { className: clsx('select-none', getVariantClass('W')), style: {
                    animation: `mw-bounce-letter ${animationDuration[speed]} ease-in-out infinite`,
                    animationDelay: '0.2s'
                }, children: "W" })] })));
});
MWBounceLoader.displayName = 'MWBounceLoader';
//# sourceMappingURL=MWLoader.js.map
'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
const skeletonVariants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
};
const skeletonAnimations = {
    pulse: 'animate-pulse',
    wave: 'animate-[wave_1.6s_ease-in-out_infinite]',
    none: ''
};
export const Skeleton = forwardRef((_a, ref) => {
    var { className, variant = 'text', width, height, lines = 1, animation = 'pulse', style } = _a, props = __rest(_a, ["className", "variant", "width", "height", "lines", "animation", "style"]);
    const getDefaultHeight = () => {
        if (height)
            return height;
        switch (variant) {
            case 'text': return '1rem';
            case 'circular': return '2.5rem';
            case 'rectangular': return '8rem';
            default: return '1rem';
        }
    };
    const getDefaultWidth = () => {
        if (width)
            return width;
        switch (variant) {
            case 'circular': return '2.5rem';
            default: return '100%';
        }
    };
    if (variant === 'text' && lines > 1) {
        return (_jsx("div", { className: "space-y-2", children: Array.from({ length: lines }).map((_, index) => (_jsx("div", Object.assign({ ref: index === 0 ? ref : undefined, className: clsx('bg-mw-gray-200 dark:bg-mw-gray-700', skeletonVariants[variant], skeletonAnimations[animation], className), style: Object.assign({ width: index === lines - 1 ? '75%' : getDefaultWidth(), height: getDefaultHeight() }, style) }, (index === 0 ? props : {})), index))) }));
    }
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('bg-mw-gray-200 dark:bg-mw-gray-700', skeletonVariants[variant], skeletonAnimations[animation], className), style: Object.assign({ width: getDefaultWidth(), height: getDefaultHeight() }, style) }, props)));
});
Skeleton.displayName = 'Skeleton';
//# sourceMappingURL=Skeleton.js.map
import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
const avatarSizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl'
};
const avatarVariants = {
    circle: 'rounded-full',
    square: 'rounded-md'
};
export const Avatar = forwardRef((_a, ref) => {
    var _b;
    var { className, src, alt, fallback, size = 'md', variant = 'circle' } = _a, props = __rest(_a, ["className", "src", "alt", "fallback", "size", "variant"]);
    const initials = fallback || ((_b = alt === null || alt === void 0 ? void 0 : alt.charAt(0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || '?';
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('relative inline-flex items-center justify-center font-medium bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-600 dark:text-mw-gray-300 overflow-hidden', avatarSizes[size], avatarVariants[variant], className) }, props, { children: src ? (_jsx("img", { src: src, alt: alt, className: "w-full h-full object-cover" })) : (_jsx("span", { className: "select-none", children: initials })) })));
});
Avatar.displayName = 'Avatar';
const spacingClasses = {
    tight: '-space-x-1',
    normal: '-space-x-2',
    loose: '-space-x-3'
};
export const AvatarGroup = forwardRef((_a, ref) => {
    var { className, children, max, size = 'md', spacing = 'normal' } = _a, props = __rest(_a, ["className", "children", "max", "size", "spacing"]);
    const childrenArray = React.Children.toArray(children);
    const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? Math.max(0, childrenArray.length - max) : 0;
    return (_jsxs("div", Object.assign({ ref: ref, className: clsx('flex items-center', spacingClasses[spacing], className) }, props, { children: [displayChildren.map((child, index) => (_jsx("div", { className: "ring-2 ring-white dark:ring-mw-gray-900", children: React.isValidElement(child) && child.type === Avatar
                    ? React.cloneElement(child, { size })
                    : child }, index))), remainingCount > 0 && (_jsx("div", { className: "ring-2 ring-white dark:ring-mw-gray-900", children: _jsx(Avatar, { size: size, fallback: `+${remainingCount}`, className: "bg-mw-gray-200 dark:bg-mw-gray-600 text-mw-gray-700 dark:text-mw-gray-200" }) }))] })));
});
AvatarGroup.displayName = 'AvatarGroup';
//# sourceMappingURL=Avatar.js.map
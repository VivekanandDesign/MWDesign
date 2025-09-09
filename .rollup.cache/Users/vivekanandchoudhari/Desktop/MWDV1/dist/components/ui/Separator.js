'use client';
import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
const separatorVariants = {
    default: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
};
const separatorSpacing = {
    none: '',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-8'
};
export const Separator = forwardRef((_a, ref) => {
    var { className, orientation = 'horizontal', variant = 'default', spacing = 'md' } = _a, props = __rest(_a, ["className", "orientation", "variant", "spacing"]);
    return (_jsx("div", Object.assign({ ref: ref, className: clsx('border-mw-gray-200 dark:border-mw-gray-700', separatorVariants[variant], orientation === 'horizontal'
            ? `border-t w-full ${separatorSpacing[spacing]}`
            : `border-l h-full ${spacing !== 'none' ? 'mx-4' : ''}`, className), role: "separator", "aria-orientation": orientation }, props)));
});
Separator.displayName = 'Separator';
//# sourceMappingURL=Separator.js.map
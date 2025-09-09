'use client';
import React from 'react';
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const containerSizes = {
    xs: 'max-w-xs', // 320px
    sm: 'max-w-sm', // 384px 
    md: 'max-w-md', // 448px
    lg: 'max-w-lg', // 512px
    xl: 'max-w-xl', // 576px
    '2xl': 'max-w-2xl', // 672px
    full: 'max-w-full'
};
const containerPadding = {
    none: '',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12'
};
export function Container({ children, size = 'full', padding = 'md', centered = true, className, as: Component = 'div' }) {
    return (<Component className={cn(containerSizes[size], containerPadding[padding], centered && 'mx-auto', className)}>
      {children}
    </Component>);
}
export function ResponsiveContainer({ children, breakpoints = { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }, padding = 'md', centered = true, className, as: Component = 'div' }) {
    const responsiveClasses = Object.entries(breakpoints)
        .map(([breakpoint, size]) => {
        if (breakpoint === 'sm')
            return containerSizes[size];
        return `${breakpoint}:${containerSizes[size]}`;
    })
        .join(' ');
    return (<Component className={cn(responsiveClasses, containerPadding[padding], centered && 'mx-auto', className)}>
      {children}
    </Component>);
}
export function GridContainer({ children, cols = 1, gap = 4, className }) {
    const getGridCols = () => {
        if (typeof cols === 'number') {
            return `grid-cols-${cols}`;
        }
        const classes = [];
        if (cols.sm)
            classes.push(`grid-cols-${cols.sm}`);
        if (cols.md)
            classes.push(`md:grid-cols-${cols.md}`);
        if (cols.lg)
            classes.push(`lg:grid-cols-${cols.lg}`);
        if (cols.xl)
            classes.push(`xl:grid-cols-${cols.xl}`);
        return classes.join(' ');
    };
    const getGap = () => {
        if (typeof gap === 'number') {
            return `gap-${gap}`;
        }
        const classes = [];
        if (gap.x)
            classes.push(`gap-x-${gap.x}`);
        if (gap.y)
            classes.push(`gap-y-${gap.y}`);
        return classes.join(' ');
    };
    return (<div className={cn('grid', getGridCols(), getGap(), className)}>
      {children}
    </div>);
}
export function FlexContainer({ children, direction = 'row', wrap = 'nowrap', align = 'start', justify = 'start', gap = 0, className }) {
    const directionClasses = {
        'row': 'flex-row',
        'row-reverse': 'flex-row-reverse',
        'col': 'flex-col',
        'col-reverse': 'flex-col-reverse'
    };
    const wrapClasses = {
        'wrap': 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse',
        'nowrap': 'flex-nowrap'
    };
    const alignClasses = {
        'start': 'items-start',
        'end': 'items-end',
        'center': 'items-center',
        'baseline': 'items-baseline',
        'stretch': 'items-stretch'
    };
    const justifyClasses = {
        'start': 'justify-start',
        'end': 'justify-end',
        'center': 'justify-center',
        'between': 'justify-between',
        'around': 'justify-around',
        'evenly': 'justify-evenly'
    };
    return (<div className={cn('flex', directionClasses[direction], wrapClasses[wrap], alignClasses[align], justifyClasses[justify], gap > 0 && `gap-${gap}`, className)}>
      {children}
    </div>);
}
export function Stack({ children, spacing = 4, divider, className }) {
    const childrenArray = React.Children.toArray(children);
    return (<div className={cn(`space-y-${spacing}`, className)}>
      {childrenArray.map((child, index) => (<React.Fragment key={index}>
          {child}
          {divider && index < childrenArray.length - 1 && (<div className="flex justify-center">
              {divider}
            </div>)}
        </React.Fragment>))}
    </div>);
}
export function HStack({ children, spacing = 4, divider, align = 'center', className }) {
    const childrenArray = React.Children.toArray(children);
    const alignClasses = {
        'start': 'items-start',
        'end': 'items-end',
        'center': 'items-center',
        'baseline': 'items-baseline',
        'stretch': 'items-stretch'
    };
    return (<div className={cn('flex', alignClasses[align], `gap-${spacing}`, className)}>
      {childrenArray.map((child, index) => (<React.Fragment key={index}>
          {child}
          {divider && index < childrenArray.length - 1 && (<div className="flex items-center">
              {divider}
            </div>)}
        </React.Fragment>))}
    </div>);
}
//# sourceMappingURL=Container.jsx.map
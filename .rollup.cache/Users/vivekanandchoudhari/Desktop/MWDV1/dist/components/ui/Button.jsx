import { __rest } from "tslib";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
const buttonVariants = {
    primary: 'bg-mw-primary-600 text-white hover:bg-mw-primary-700 focus:ring-mw-primary-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5',
    secondary: 'bg-mw-secondary-600 text-white hover:bg-mw-secondary-700 focus:ring-mw-secondary-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5',
    flow: 'bg-mw-flow-600 text-white hover:bg-mw-flow-700 focus:ring-mw-flow-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5',
    ghost: 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-primary-50 hover:text-mw-primary-700 dark:hover:bg-mw-gray-800 focus:ring-mw-primary-500 transition-all duration-300',
    outline: 'border-2 border-mw-primary-300 text-mw-primary-700 hover:bg-mw-primary-50 hover:border-mw-primary-500 dark:border-mw-primary-600 dark:text-mw-primary-400 dark:hover:bg-mw-primary-900 focus:ring-mw-primary-500 transition-all duration-300',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5'
};
const buttonSizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
};
export const Button = forwardRef((_a, ref) => {
    var { className, variant = 'primary', size = 'md', children } = _a, props = __rest(_a, ["className", "variant", "size", "children"]);
    return (<button ref={ref} className={clsx('inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200', 'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed', buttonVariants[variant], buttonSizes[size], className)} {...props}>
        {children}
      </button>);
});
Button.displayName = 'Button';
//# sourceMappingURL=Button.jsx.map
import { __rest } from "tslib";
import { forwardRef } from 'react';
import { clsx } from 'clsx';
export const Checkbox = forwardRef((_a, ref) => {
    var { className, label, description, error } = _a, props = __rest(_a, ["className", "label", "description", "error"]);
    return (<div className="space-y-2">
        <div className="flex items-start space-x-3">
          <input type="checkbox" ref={ref} className={clsx('mt-0.5 h-4 w-4 rounded border-mw-gray-300 dark:border-mw-gray-600', 'text-mw-blue-600 focus:ring-mw-blue-500 focus:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', error && 'border-red-300 text-red-600 focus:ring-red-500', className)} {...props}/>
          {(label || description) && (<div className="flex-1 min-w-0">
              {label && (<label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  {label}
                </label>)}
              {description && (<p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
                  {description}
                </p>)}
            </div>)}
        </div>
        {error && (<p className="text-sm text-red-600 dark:text-red-400">{error}</p>)}
      </div>);
});
Checkbox.displayName = 'Checkbox';
export const Radio = forwardRef((_a, ref) => {
    var { className, label, description, error } = _a, props = __rest(_a, ["className", "label", "description", "error"]);
    return (<div className="space-y-2">
        <div className="flex items-start space-x-3">
          <input type="radio" ref={ref} className={clsx('mt-0.5 h-4 w-4 border-mw-gray-300 dark:border-mw-gray-600', 'text-mw-blue-600 focus:ring-mw-blue-500 focus:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', error && 'border-red-300 text-red-600 focus:ring-red-500', className)} {...props}/>
          {(label || description) && (<div className="flex-1 min-w-0">
              {label && (<label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  {label}
                </label>)}
              {description && (<p className="text-sm text-mw-gray-500 dark:text-mw-gray-400">
                  {description}
                </p>)}
            </div>)}
        </div>
        {error && (<p className="text-sm text-red-600 dark:text-red-400">{error}</p>)}
      </div>);
});
Radio.displayName = 'Radio';
//# sourceMappingURL=Checkbox.jsx.map
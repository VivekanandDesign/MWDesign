'use client';
import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
function Step({ step, index, isLast, orientation }) {
    const { title, description, completed, current } = step;
    return (<div className={clsx("flex", orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row', !isLast && orientation === 'horizontal' ? 'flex-1' : '')}>
      <div className={clsx("flex items-center", orientation === 'horizontal' ? 'flex-col' : 'flex-row')}>
        {/* Step Circle */}
        <div className={clsx("relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors duration-200", completed ? "bg-mw-blue-600 border-mw-blue-600 text-white" :
            current ? "bg-white border-mw-blue-600 text-mw-blue-600 dark:bg-mw-gray-900" :
                "bg-white border-mw-gray-300 text-mw-gray-500 dark:bg-mw-gray-800 dark:border-mw-gray-600")}>
          {completed ? <Check className="w-4 h-4"/> : index + 1}
        </div>

        {/* Connector Line */}
        {!isLast && (<div className={clsx("bg-mw-gray-300 dark:bg-mw-gray-600", orientation === 'horizontal' ? "h-0.5 flex-1 w-full mt-4" : "w-0.5 h-12 ml-4", completed && "bg-mw-blue-600")}/>)}
      </div>

      {/* Step Content */}
      <div className={clsx(orientation === 'horizontal' ? 'mt-4 text-center' : 'ml-4', orientation === 'vertical' && !isLast ? 'pb-8' : '')}>
        <h3 className={clsx("text-sm font-medium", current ? "text-mw-blue-600 dark:text-mw-blue-400" :
            completed ? "text-mw-gray-900 dark:text-white" :
                "text-mw-gray-500 dark:text-mw-gray-400")}>
          {title}
        </h3>
        {description && (<p className="mt-1 text-xs text-mw-gray-500 dark:text-mw-gray-400">
            {description}
          </p>)}
      </div>
    </div>);
}
export function Stepper({ steps, orientation = 'horizontal', className }) {
    return (<div className={clsx("flex", orientation === 'horizontal' ? 'items-start justify-between' : 'flex-col', className)}>
      {steps.map((step, index) => (<Step key={index} step={step} index={index} isLast={index === steps.length - 1} orientation={orientation}/>))}
    </div>);
}
//# sourceMappingURL=Stepper.jsx.map
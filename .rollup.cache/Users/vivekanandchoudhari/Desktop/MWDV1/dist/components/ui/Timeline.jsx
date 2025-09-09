'use client';
import React from 'react';
import { clsx } from 'clsx';
export function Timeline({ items, className }) {
    return (<div className={clsx('relative', className)}>
      {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const { title, description, time, status = 'pending', icon } = item;
            return (<div key={index} className="relative flex items-start group">
            {/* Timeline Line */}
            {!isLast && (<div className="absolute left-4 top-8 w-0.5 h-full bg-mw-gray-200 dark:bg-mw-gray-700 group-hover:bg-mw-blue-200 dark:group-hover:bg-mw-blue-800 transition-colors duration-200"/>)}

            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className={clsx("flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200", status === 'completed' ? "bg-mw-blue-600 border-mw-blue-600 text-white" :
                    status === 'current' ? "bg-white border-mw-blue-600 text-mw-blue-600 dark:bg-mw-gray-900 ring-4 ring-mw-blue-100 dark:ring-mw-blue-900/20" :
                        "bg-white border-mw-gray-300 text-mw-gray-400 dark:bg-mw-gray-800 dark:border-mw-gray-600")}>
                {icon || (<div className={clsx("w-2 h-2 rounded-full", status === 'completed' ? "bg-white" :
                        status === 'current' ? "bg-mw-blue-600" :
                            "bg-mw-gray-400 dark:bg-mw-gray-500")}/>)}
              </div>
            </div>

            {/* Content */}
            <div className="ml-4 pb-8 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={clsx("text-sm font-medium", status === 'current' ? "text-mw-blue-600 dark:text-mw-blue-400" :
                    status === 'completed' ? "text-mw-gray-900 dark:text-white" :
                        "text-mw-gray-600 dark:text-mw-gray-300")}>
                  {title}
                </h3>
                {time && (<time className="text-xs text-mw-gray-500 dark:text-mw-gray-400 flex-shrink-0 ml-2">
                    {time}
                  </time>)}
              </div>
              {description && (<p className="mt-1 text-xs text-mw-gray-500 dark:text-mw-gray-400 leading-relaxed">
                  {description}
                </p>)}
            </div>
          </div>);
        })}
    </div>);
}
export function TimelineItem({ children, status = 'pending', icon, time, isLast = false }) {
    return (<div className="relative flex items-start group">
      {/* Timeline Line */}
      {!isLast && (<div className="absolute left-4 top-8 w-0.5 h-full bg-mw-gray-200 dark:bg-mw-gray-700 group-hover:bg-mw-blue-200 dark:group-hover:bg-mw-blue-800 transition-colors duration-200"/>)}

      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className={clsx("flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200", status === 'completed' ? "bg-mw-blue-600 border-mw-blue-600 text-white" :
            status === 'current' ? "bg-white border-mw-blue-600 text-mw-blue-600 dark:bg-mw-gray-900 ring-4 ring-mw-blue-100 dark:ring-mw-blue-900/20" :
                "bg-white border-mw-gray-300 text-mw-gray-400 dark:bg-mw-gray-800 dark:border-mw-gray-600")}>
          {icon || (<div className={clsx("w-2 h-2 rounded-full", status === 'completed' ? "bg-white" :
                status === 'current' ? "bg-mw-blue-600" :
                    "bg-mw-gray-400 dark:bg-mw-gray-500")}/>)}
        </div>
      </div>

      {/* Content */}
      <div className="ml-4 pb-8 flex-1 min-w-0">
        {time && (<time className="text-xs text-mw-gray-500 dark:text-mw-gray-400 block mb-1">
            {time}
          </time>)}
        {children}
      </div>
    </div>);
}
//# sourceMappingURL=Timeline.jsx.map
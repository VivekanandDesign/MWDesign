'use client';
import React from 'react';
export function PageHero({ title, description, badge, stats, className = '' }) {
    const badgeColors = {
        primary: 'bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/20 dark:text-mw-blue-300',
        secondary: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    };
    return (<div className={`relative overflow-hidden bg-gradient-to-br from-mw-blue-50 via-white to-mw-blue-50/30 
      dark:from-mw-gray-900 dark:via-mw-gray-900 dark:to-mw-blue-950/20 
      border-b border-mw-gray-200 dark:border-mw-gray-700 ${className}`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 dark:opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-mw-blue-500/3 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          {badge && (<div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${badgeColors[badge.variant || 'primary']}`}>
                {badge.text}
              </span>
            </div>)}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-blue-700 dark:text-mw-blue-400 mb-6">
            <span className="bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text 
              supports-[background-clip:text]:text-transparent">
              {title}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-mw-gray-600 dark:text-mw-gray-300 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          {stats && stats.length > 0 && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (<div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-mw-blue-600 dark:text-mw-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-mw-gray-600 dark:text-mw-gray-400">
                    {stat.label}
                  </div>
                </div>))}
            </div>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=PageHero.jsx.map
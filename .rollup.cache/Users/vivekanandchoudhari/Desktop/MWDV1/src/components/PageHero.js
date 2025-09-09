'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PageHero({ title, description, badge, stats, className = '' }) {
    const badgeColors = {
        primary: 'bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/20 dark:text-mw-blue-300',
        secondary: 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-200',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    };
    return (_jsxs("div", { className: `relative overflow-hidden bg-gradient-to-br from-mw-blue-50 via-white to-mw-blue-50/30 
      dark:from-mw-gray-900 dark:via-mw-gray-900 dark:to-mw-blue-950/20 
      border-b border-mw-gray-200 dark:border-mw-gray-700 ${className}`, children: [_jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-3 dark:opacity-5" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-mw-blue-500/3 to-transparent" }), _jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24", children: _jsxs("div", { className: "text-center max-w-4xl mx-auto", children: [badge && (_jsx("div", { className: "mb-6", children: _jsx("span", { className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${badgeColors[badge.variant || 'primary']}`, children: badge.text }) })), _jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-blue-700 dark:text-mw-blue-400 mb-6", children: _jsx("span", { className: "bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text \n              supports-[background-clip:text]:text-transparent", children: title }) }), _jsx("p", { className: "text-xl sm:text-2xl text-mw-gray-600 dark:text-mw-gray-300 mb-8 leading-relaxed", children: description }), stats && stats.length > 0 && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12", children: stats.map((stat, index) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl sm:text-4xl font-bold text-mw-blue-600 dark:text-mw-blue-400 mb-2", children: stat.value }), _jsx("div", { className: "text-sm font-medium text-mw-gray-600 dark:text-mw-gray-400", children: stat.label })] }, index))) }))] }) })] }));
}
//# sourceMappingURL=PageHero.js.map
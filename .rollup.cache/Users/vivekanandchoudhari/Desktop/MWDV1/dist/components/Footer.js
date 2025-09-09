import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
const footerSections = [
    {
        title: 'Design System',
        links: [
            { name: 'Design Tokens', href: '/tokens' },
            { name: 'Components', href: '/components' },
            { name: 'Patterns', href: '/patterns' },
        ]
    },
    {
        title: 'Resources',
        links: [
            { name: 'Icon Library', href: '/icons' },
        ]
    }
];
export function Footer() {
    return (_jsx("footer", { className: "bg-mw-gray-50 dark:bg-mw-gray-900 border-t border-mw-gray-200 dark:border-mw-gray-800", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("div", { className: "py-16", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-10 h-10 bg-mw-blue-600 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: "MW" }) }), _jsx("span", { className: "font-bold text-2xl text-mw-gray-900 dark:text-white", children: "Design System" })] }), _jsx("p", { className: "text-lg text-mw-gray-600 dark:text-mw-gray-300 max-w-md", children: "A comprehensive design system that empowers teams to build consistent, accessible, and scalable digital experiences." })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-8", children: footerSections.map((section) => (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-mw-gray-900 dark:text-white mb-4", children: section.title }), _jsx("ul", { className: "space-y-3", children: section.links.map((link) => (_jsx("li", { children: _jsx(Link, { href: link.href, className: "text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-blue-600 dark:hover:text-mw-blue-400 transition-colors duration-200", children: link.name }) }, link.name))) })] }, section.title))) })] }) }), _jsx("div", { className: "py-6 border-t border-mw-gray-200 dark:border-mw-gray-800", children: _jsx("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: _jsx("div", { className: "text-mw-gray-600 dark:text-mw-gray-400", children: "\u00A9 2025 Moving Walls. All rights reserved." }) }) })] }) }));
}
//# sourceMappingURL=Footer.js.map
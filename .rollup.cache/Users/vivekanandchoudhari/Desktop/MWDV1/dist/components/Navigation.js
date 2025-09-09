'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Palette, Code, BookOpen, Heart, Layout } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
const navigationItems = [
    { name: 'Brand Identity', href: '/brand-identity', icon: Heart },
    { name: 'Design Tokens', href: '/new-design-tokens', icon: Palette },
    { name: 'Components', href: '/components', icon: Code },
    { name: 'Examples', href: '/examples', icon: Layout },
    { name: 'Icons', href: '/icons', icon: Palette },
    { name: 'Patterns', href: '/patterns', icon: Code },
    { name: 'Design Process', href: '/design-process', icon: BookOpen },
];
export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (_jsxs("nav", { className: "bg-white dark:bg-mw-gray-900 border-b border-mw-gray-200 dark:border-mw-gray-700 sticky top-0 z-50", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsx("div", { className: "flex items-center", children: _jsx(Link, { href: "/", className: "flex items-center", children: _jsx("span", { className: "font-bold text-xl text-mw-gray-900 dark:text-white", children: "MWDesign" }) }) }), _jsx("div", { className: "hidden md:flex items-center space-x-8", children: navigationItems.map((item) => (_jsxs(Link, { href: item.href, className: "text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600 dark:hover:text-mw-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 relative group", children: [item.name, _jsx("span", { className: "absolute bottom-0 left-0 w-0 h-0.5 bg-mw-primary-600 transition-all duration-300 group-hover:w-full" })] }, item.name))) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(ThemeToggle, {}), _jsx(Button, { variant: "ghost", size: "sm", className: "md:hidden", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), "aria-label": "Toggle mobile menu", children: isMobileMenuOpen ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Menu, { className: "h-5 w-5" }) })] })] }) }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden bg-white dark:bg-mw-gray-900 border-t border-mw-gray-200 dark:border-mw-gray-700", children: _jsx("div", { className: "px-2 pt-2 pb-3 space-y-1", children: navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (_jsxs(Link, { href: item.href, className: "flex items-center space-x-3 text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600 hover:bg-mw-primary-50 dark:hover:text-mw-primary-400 dark:hover:bg-mw-primary-900 px-3 py-2 rounded-md text-base font-medium transition-all duration-300", onClick: () => setIsMobileMenuOpen(false), children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: item.name })] }, item.name));
                    }) }) }))] }));
}
//# sourceMappingURL=Navigation.js.map
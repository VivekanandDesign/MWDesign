import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Icon } from './ui/Icon';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { getIconsData } from '../data/icons';
import { formatIconName } from '../utils/iconNameFormatter';
import { Search, Heart, Clock, TrendingUp, Grid3X3, Filter, Star } from 'lucide-react';
export function IconRelatedSuggestions({ iconName, relatedIcons, onIconSelect, className = '' }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const { favorites, isFavorite, toggleFavorite, getRecentIcons, getPopularIcons } = useCopyHistory();
    const iconData = getIconsData();
    // Get current icon's category
    const currentCategory = useMemo(() => {
        var _a;
        return (_a = Object.entries(iconData.categories).find(([_, cat]) => cat.icons.includes(iconName))) === null || _a === void 0 ? void 0 : _a[1];
    }, [iconName, iconData.categories]);
    // Get filtered suggestions
    const filteredSuggestions = useMemo(() => {
        let suggestions = [];
        switch (selectedFilter) {
            case 'category':
                suggestions = (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.icons.filter(icon => icon !== iconName)) || [];
                break;
            case 'recent':
                suggestions = getRecentIcons(20).filter(icon => icon !== iconName);
                break;
            case 'popular':
                suggestions = getPopularIcons(20).filter(icon => icon !== iconName);
                break;
            case 'favorites':
                suggestions = favorites.map(fav => fav.iconName).filter(icon => icon !== iconName);
                break;
            case 'all':
            default:
                // Combine category icons with some popular ones
                const categoryIcons = (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.icons.filter(icon => icon !== iconName)) || [];
                const popularIcons = getPopularIcons(10).filter(icon => icon !== iconName && !categoryIcons.includes(icon));
                suggestions = [...categoryIcons.slice(0, 12), ...popularIcons.slice(0, 8)];
                break;
        }
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            suggestions = suggestions.filter(icon => icon.toLowerCase().includes(query));
        }
        return suggestions.slice(0, 24); // Limit to 24 suggestions
    }, [selectedFilter, currentCategory, iconName, searchQuery, favorites, getRecentIcons, getPopularIcons]);
    const filterOptions = [
        { id: 'all', label: 'All', icon: Grid3X3, count: relatedIcons.length },
        { id: 'category', label: (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.name) || 'Category', icon: Filter, count: (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.icons.length) || 0 },
        { id: 'recent', label: 'Recent', icon: Clock, count: getRecentIcons().length },
        { id: 'popular', label: 'Popular', icon: TrendingUp, count: getPopularIcons().length },
        { id: 'favorites', label: 'Favorites', icon: Heart, count: favorites.length }
    ];
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Related Icons" }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [filteredSuggestions.length, " icons"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search related icons...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: filterOptions.map((filter) => {
                    const IconComponent = filter.icon;
                    return (_jsxs("button", { onClick: () => setSelectedFilter(filter.id), className: `
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${selectedFilter === filter.id
                            ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'}
              `, children: [_jsx(IconComponent, { className: "w-4 h-4" }), filter.label, _jsx(Badge, { variant: "outline", className: "text-xs ml-1", children: filter.count })] }, filter.id));
                }) }), currentCategory && selectedFilter === 'category' && (_jsxs("div", { className: "p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsxs("h4", { className: "text-sm font-medium text-blue-900 dark:text-blue-300", children: [currentCategory.name, " Category"] }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [currentCategory.icons.length, " icons"] })] }), _jsx("p", { className: "text-sm text-blue-800 dark:text-blue-200", children: currentCategory.description })] })), filteredSuggestions.length > 0 ? (_jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3", children: filteredSuggestions.map((suggestionIcon) => (_jsxs("div", { className: "group relative aspect-square border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 hover:scale-105", onClick: () => onIconSelect === null || onIconSelect === void 0 ? void 0 : onIconSelect(suggestionIcon), children: [_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx(Icon, { icon: Star, size: "md", className: "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200" }) }), _jsx("button", { onClick: (e) => {
                                e.stopPropagation();
                                toggleFavorite(suggestionIcon);
                            }, className: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Heart, { className: `w-3 h-3 ${isFavorite(suggestionIcon)
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400 hover:text-red-400'}` }) }), _jsx("div", { className: "absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: _jsx("div", { className: "bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap", children: formatIconName(suggestionIcon) }) })] }, suggestionIcon))) })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-400 dark:text-gray-600 mb-2", children: _jsx(Search, { className: "w-12 h-12 mx-auto mb-4" }) }), _jsx("h4", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "No related icons found" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: searchQuery
                            ? `No icons match "${searchQuery}" in the ${selectedFilter} filter.`
                            : `No icons available for the ${selectedFilter} filter.` }), searchQuery && (_jsx(Button, { onClick: () => setSearchQuery(''), variant: "ghost", size: "sm", className: "mt-3", children: "Clear search" }))] })), _jsx("div", { className: "pt-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs(Button, { onClick: () => setSelectedFilter('category'), variant: "ghost", size: "sm", className: "text-xs", children: ["More from ", (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.name) || 'this category'] }), _jsx(Button, { onClick: () => setSelectedFilter('popular'), variant: "ghost", size: "sm", className: "text-xs", children: "Popular icons" }), _jsx(Button, { onClick: () => setSelectedFilter('recent'), variant: "ghost", size: "sm", className: "text-xs", children: "Recently used" })] }) })] }));
}
//# sourceMappingURL=IconRelatedSuggestions.js.map
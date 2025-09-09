import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Separator } from './ui/Separator';
import { History, Heart, Search, Trash2, Copy, Clock, Star } from 'lucide-react';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { useToast } from './Toast';
export function HistoryFavoritesPanel({ isOpen, onClose, className = '' }) {
    const { history, favorites, removeFromHistory, clearHistory, recopyChistoryItem, toggleFavorite, isFavorite, getFavoritesByCategory, searchHistory, getRecentIcons, getPopularIcons } = useCopyHistory();
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('history');
    if (!isOpen)
        return null;
    const filteredHistory = searchQuery ? searchHistory(searchQuery) : history;
    const categorizedFavorites = getFavoritesByCategory();
    const recentIcons = getRecentIcons(8);
    const popularIcons = getPopularIcons(8);
    const handleRecopy = async (item) => {
        const success = await recopyChistoryItem(item);
        if (success) {
            addToast({
                type: 'success',
                message: `${item.iconName} copied as ${item.format.toUpperCase()}`,
                iconName: item.iconName
            });
        }
        else {
            addToast({
                type: 'error',
                message: 'Could not copy to clipboard'
            });
        }
    };
    const formatTime = (timestamp) => {
        const now = Date.now();
        const diff = now - timestamp;
        if (diff < 60000)
            return 'just now';
        if (diff < 3600000)
            return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000)
            return `${Math.floor(diff / 3600000)}h ago`;
        return new Date(timestamp).toLocaleDateString();
    };
    const formatType = (format) => {
        const colors = {
            svg: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            jsx: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            import: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
            download: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
        };
        return (_jsx(Badge, { className: `text-xs ${colors[format] || 'bg-gray-100 text-gray-700'}`, children: format.toUpperCase() }));
    };
    return (_jsx("div", { className: `fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 ${className}`, children: _jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(History, { className: "w-5 h-5" }), _jsx("h2", { className: "text-lg font-semibold", children: "History & Favorites" })] }), _jsx(Button, { onClick: onClose, variant: "ghost", size: "sm", children: "\u00D7" })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { type: "text", placeholder: "Search history...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 text-sm" })] })] }), _jsx("div", { className: "flex border-b border-gray-200 dark:border-gray-700", children: [
                        { id: 'history', label: 'History', icon: Clock },
                        { id: 'favorites', label: 'Favorites', icon: Heart },
                        { id: 'insights', label: 'Insights', icon: Star }
                    ].map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`, children: [_jsx(tab.icon, { className: "w-4 h-4" }), tab.label] }, tab.id))) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [activeTab === 'history' && (_jsxs("div", { className: "p-4", children: [history.length > 0 && (_jsx("div", { className: "mb-4", children: _jsxs(Button, { onClick: clearHistory, variant: "outline", size: "sm", className: "flex items-center gap-2 text-red-600 hover:text-red-700", children: [_jsx(Trash2, { className: "w-4 h-4" }), "Clear All History"] }) })), _jsx("div", { className: "space-y-2", children: filteredHistory.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500 dark:text-gray-400", children: searchQuery ? 'No matching items found' : 'No history yet' })) : (filteredHistory.map((item) => (_jsx(Card, { className: "p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium text-sm truncate", children: item.iconName }), formatType(item.format)] }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: formatTime(item.timestamp) })] }), _jsxs("div", { className: "flex items-center gap-1 ml-2", children: [_jsx(Button, { onClick: () => toggleFavorite(item.iconName), variant: "ghost", size: "sm", className: "p-1", children: _jsx(Heart, { className: `w-4 h-4 ${isFavorite(item.iconName)
                                                                    ? 'fill-red-500 text-red-500'
                                                                    : 'text-gray-400'}` }) }), _jsx(Button, { onClick: () => handleRecopy(item), variant: "ghost", size: "sm", className: "p-1", children: _jsx(Copy, { className: "w-4 h-4" }) }), _jsx(Button, { onClick: () => removeFromHistory(item.id), variant: "ghost", size: "sm", className: "p-1 text-red-500 hover:text-red-700", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }) }, item.id)))) })] })), activeTab === 'favorites' && (_jsx("div", { className: "p-4", children: Object.keys(categorizedFavorites).length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500 dark:text-gray-400", children: "No favorites yet" })) : (_jsx("div", { className: "space-y-4", children: Object.entries(categorizedFavorites).map(([category, items]) => (_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-sm text-gray-700 dark:text-gray-300 mb-2", children: category }), _jsx("div", { className: "space-y-2", children: items.map((fav) => (_jsx(Card, { className: "p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("span", { className: "font-medium text-sm", children: fav.iconName }), _jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: ["Added ", formatTime(fav.addedAt)] })] }), _jsx(Button, { onClick: () => toggleFavorite(fav.iconName), variant: "ghost", size: "sm", className: "p-1 text-red-500 hover:text-red-700", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) }, fav.iconName))) })] }, category))) })) })), activeTab === 'insights' && (_jsxs("div", { className: "p-4 space-y-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-medium text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), "Recently Used"] }), _jsx("div", { className: "flex flex-wrap gap-1", children: recentIcons.length === 0 ? (_jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "No recent activity" })) : (recentIcons.map(iconName => (_jsx(Badge, { variant: "outline", className: "text-xs", children: iconName }, iconName)))) })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsxs("h3", { className: "font-medium text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2", children: [_jsx(Star, { className: "w-4 h-4" }), "Most Used"] }), _jsx("div", { className: "flex flex-wrap gap-1", children: popularIcons.length === 0 ? (_jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "No usage data yet" })) : (popularIcons.map(iconName => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: iconName }, iconName)))) })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-sm text-gray-700 dark:text-gray-300 mb-3", children: "Statistics" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Card, { className: "p-3 text-center", children: [_jsx("div", { className: "text-lg font-bold text-blue-600 dark:text-blue-400", children: history.length }), _jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Total Copies" })] }), _jsxs(Card, { className: "p-3 text-center", children: [_jsx("div", { className: "text-lg font-bold text-red-600 dark:text-red-400", children: favorites.length }), _jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Favorites" })] }), _jsxs(Card, { className: "p-3 text-center", children: [_jsx("div", { className: "text-lg font-bold text-green-600 dark:text-green-400", children: new Set(history.map(h => h.iconName)).size }), _jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Unique Icons" })] }), _jsxs(Card, { className: "p-3 text-center", children: [_jsx("div", { className: "text-lg font-bold text-purple-600 dark:text-purple-400", children: history.filter(h => h.timestamp > Date.now() - 86400000).length }), _jsx("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: "Today" })] })] })] })] }))] })] }) }));
}
//# sourceMappingURL=HistoryFavoritesPanel.js.map
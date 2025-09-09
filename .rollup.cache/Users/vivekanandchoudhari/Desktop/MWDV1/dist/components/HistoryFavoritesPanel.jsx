import React, { useState } from 'react';
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
        return (<Badge className={`text-xs ${colors[format] || 'bg-gray-100 text-gray-700'}`}>
        {format.toUpperCase()}
      </Badge>);
    };
    return (<div className={`fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50 ${className}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5"/>
              <h2 className="text-lg font-semibold">History & Favorites</h2>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              ×
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
            <Input type="text" placeholder="Search history..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 text-sm"/>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'history', label: 'History', icon: Clock },
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'insights', label: 'Insights', icon: Star }
        ].map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`}>
              <tab.icon className="w-4 h-4"/>
              {tab.label}
            </button>))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'history' && (<div className="p-4">
              {/* Clear All Button */}
              {history.length > 0 && (<div className="mb-4">
                  <Button onClick={clearHistory} variant="outline" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4"/>
                    Clear All History
                  </Button>
                </div>)}

              {/* History Items */}
              <div className="space-y-2">
                {filteredHistory.length === 0 ? (<div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    {searchQuery ? 'No matching items found' : 'No history yet'}
                  </div>) : (filteredHistory.map((item) => (<Card key={item.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm truncate">
                              {item.iconName}
                            </span>
                            {formatType(item.format)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(item.timestamp)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          <Button onClick={() => toggleFavorite(item.iconName)} variant="ghost" size="sm" className="p-1">
                            <Heart className={`w-4 h-4 ${isFavorite(item.iconName)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'}`}/>
                          </Button>
                          
                          <Button onClick={() => handleRecopy(item)} variant="ghost" size="sm" className="p-1">
                            <Copy className="w-4 h-4"/>
                          </Button>
                          
                          <Button onClick={() => removeFromHistory(item.id)} variant="ghost" size="sm" className="p-1 text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4"/>
                          </Button>
                        </div>
                      </div>
                    </Card>)))}
              </div>
            </div>)}

          {activeTab === 'favorites' && (<div className="p-4">
              {Object.keys(categorizedFavorites).length === 0 ? (<div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No favorites yet
                </div>) : (<div className="space-y-4">
                  {Object.entries(categorizedFavorites).map(([category, items]) => (<div key={category}>
                      <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {items.map((fav) => (<Card key={fav.iconName} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <span className="font-medium text-sm">{fav.iconName}</span>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Added {formatTime(fav.addedAt)}
                                </div>
                              </div>
                              
                              <Button onClick={() => toggleFavorite(fav.iconName)} variant="ghost" size="sm" className="p-1 text-red-500 hover:text-red-700">
                                <Trash2 className="w-4 h-4"/>
                              </Button>
                            </div>
                          </Card>))}
                      </div>
                    </div>))}
                </div>)}
            </div>)}

          {activeTab === 'insights' && (<div className="p-4 space-y-6">
              {/* Recent Icons */}
              <div>
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4"/>
                  Recently Used
                </h3>
                <div className="flex flex-wrap gap-1">
                  {recentIcons.length === 0 ? (<div className="text-sm text-gray-500 dark:text-gray-400">
                      No recent activity
                    </div>) : (recentIcons.map(iconName => (<Badge key={iconName} variant="outline" className="text-xs">
                        {iconName}
                      </Badge>)))}
                </div>
              </div>

              <Separator />

              {/* Popular Icons */}
              <div>
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4"/>
                  Most Used
                </h3>
                <div className="flex flex-wrap gap-1">
                  {popularIcons.length === 0 ? (<div className="text-sm text-gray-500 dark:text-gray-400">
                      No usage data yet
                    </div>) : (popularIcons.map(iconName => (<Badge key={iconName} variant="secondary" className="text-xs">
                        {iconName}
                      </Badge>)))}
                </div>
              </div>

              <Separator />

              {/* Statistics */}
              <div>
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Statistics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {history.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total Copies
                    </div>
                  </Card>
                  
                  <Card className="p-3 text-center">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">
                      {favorites.length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Favorites
                    </div>
                  </Card>
                  
                  <Card className="p-3 text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {new Set(history.map(h => h.iconName)).size}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Unique Icons
                    </div>
                  </Card>
                  
                  <Card className="p-3 text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {history.filter(h => h.timestamp > Date.now() - 86400000).length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Today
                    </div>
                  </Card>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=HistoryFavoritesPanel.jsx.map
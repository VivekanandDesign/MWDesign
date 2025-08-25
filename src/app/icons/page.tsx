'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { Search, Grid, List, Heart, Copy, Check, X, Menu } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { PageHero } from '@/components/PageHero'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getIconsData, searchIcons, getIconsByCategory, DynamicIcon } from '@/data/icons'

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [iconSize, setIconSize] = useState(24)
  const [favorites, setFavorites] = useState<string[]>([])
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Get icon data
  const iconData = getIconsData()

  // Get filtered icons
  const filteredIcons = useMemo(() => {
    let icons: string[] = []
    
    if (selectedCategory === 'favorites') {
      icons = favorites
    } else if (selectedCategory === 'all') {
      icons = iconData.allIcons
    } else {
      icons = getIconsByCategory(selectedCategory)
    }

    if (searchTerm) {
      const searchResults = searchIcons(searchTerm, 1000)
      icons = icons.filter(icon => searchResults.includes(icon))
    }

    return icons
  }, [searchTerm, selectedCategory, favorites, iconData.allIcons])

  // Reset search when filters change
  React.useEffect(() => {
    // Reset any necessary state when search changes
  }, [searchTerm, selectedCategory])

  const handleCopyIcon = useCallback(async (iconName: string) => {
    const importStatement = `import { ${iconName} } from 'lucide-react'`
    try {
      await navigator.clipboard.writeText(importStatement)
      setCopiedIcon(iconName)
      setTimeout(() => setCopiedIcon(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  const handleToggleFavorite = useCallback((iconName: string) => {
    setFavorites(prev => 
      prev.includes(iconName) 
        ? prev.filter(fav => fav !== iconName)
        : [...prev, iconName]
    )
  }, [])

  const getGridColumns = () => {
    // Always show 8 icons per row with responsive breakpoints
    return 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'
  }

  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      <Navigation />
      <PageHero
        title="Icons"
        description="Complete collection of Lucide icons with sidebar navigation for your design system"
        badge={{
          text: `${iconData.metadata.totalIcons} Icons`,
          variant: 'primary'
        }}
      />

      {/* Main Layout with Sidebar */}
      <div className="flex h-[calc(100vh-200px)] bg-mw-gray-50 dark:bg-mw-gray-900">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Search & Filters */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-mw-gray-800 
          border-r border-mw-gray-200 dark:border-mw-gray-700 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full p-6">
            {/* Sidebar Header */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                Search & Filter
              </h2>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Find icons by category or search
              </p>
            </div>

            {/* Search Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-mw-gray-900 dark:text-white mb-2">
                Search Icons
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white placeholder-mw-gray-500 focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-mw-gray-400 hover:text-mw-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-6 flex-1 overflow-y-auto">
              <h3 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {/* All Icons */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-mw-blue-50 text-mw-blue-700 dark:bg-mw-blue-900 dark:text-mw-blue-300'
                      : 'text-mw-gray-700 hover:bg-mw-gray-100 dark:text-mw-gray-300 dark:hover:bg-mw-gray-700'
                  }`}
                >
                  <span>All Icons</span>
                  <Badge variant="secondary" className="text-xs">
                    {iconData.metadata.totalIcons}
                  </Badge>
                </button>
                
                {/* Favorites */}
                <button
                  onClick={() => setSelectedCategory('favorites')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    selectedCategory === 'favorites'
                      ? 'bg-mw-blue-50 text-mw-blue-700 dark:bg-mw-blue-900 dark:text-mw-blue-300'
                      : 'text-mw-gray-700 hover:bg-mw-gray-100 dark:text-mw-gray-300 dark:hover:bg-mw-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favorites
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {favorites.length}
                  </Badge>
                </button>

                <hr className="my-3 border-mw-gray-200 dark:border-mw-gray-700" />

                {/* Category List */}
                {Object.entries(iconData.categories).map(([categoryId, category]) => (
                  <button
                    key={categoryId}
                    onClick={() => setSelectedCategory(categoryId)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                      selectedCategory === categoryId
                        ? 'bg-mw-blue-50 text-mw-blue-700 dark:bg-mw-blue-900 dark:text-mw-blue-300'
                        : 'text-mw-gray-700 hover:bg-mw-gray-100 dark:text-mw-gray-300 dark:hover:bg-mw-gray-700'
                    }`}
                  >
                    <span className="capitalize">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.icons.length}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* View Controls */}
            <div className="space-y-4 pt-4 border-t border-mw-gray-200 dark:border-mw-gray-700">
              {/* View Mode Toggle */}
              <div>
                <label className="block text-sm font-medium text-mw-gray-900 dark:text-white mb-2">
                  View Mode
                </label>
                <div className="flex border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-mw-blue-50 text-mw-blue-600 dark:bg-mw-blue-900 dark:text-mw-blue-300'
                        : 'bg-white text-mw-gray-600 hover:bg-mw-gray-50 dark:bg-mw-gray-800 dark:text-mw-gray-400 dark:hover:bg-mw-gray-700'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 px-3 py-2 text-sm flex items-center justify-center gap-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-mw-blue-50 text-mw-blue-600 dark:bg-mw-blue-900 dark:text-mw-blue-300'
                        : 'bg-white text-mw-gray-600 hover:bg-mw-gray-50 dark:bg-mw-gray-800 dark:text-mw-gray-400 dark:hover:bg-mw-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    List
                  </button>
                </div>
              </div>

              {/* Icon Size Slider */}
              <div>
                <label className="block text-sm font-medium text-mw-gray-900 dark:text-white mb-2">
                  Icon Size: {iconSize}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  step="4"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-full h-2 bg-mw-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-mw-gray-700"
                />
                <div className="flex justify-between text-xs text-mw-gray-500 mt-1">
                  <span>16px</span>
                  <span>48px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area - Icons Display */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <h1 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Icons</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2"
            >
              <Menu className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Content Header */}
          <div className="px-6 py-4 bg-white dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  {selectedCategory === 'all' ? 'All Icons' : 
                   selectedCategory === 'favorites' ? 'Favorite Icons' :
                   iconData.categories[selectedCategory]?.name || selectedCategory}
                </h2>
                <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  {filteredIcons.length.toLocaleString()} icons
                </span>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedCategory !== 'all') && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Filters:</span>
                  {searchTerm && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-1 hover:text-mw-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <span className="capitalize">
                        {selectedCategory === 'favorites' ? 'Favorites' : iconData.categories[selectedCategory]?.name}
                      </span>
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-1 hover:text-mw-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                    }}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Icons Content */}
          <div className="flex-1 overflow-auto px-6 py-6">
            {/* Empty State */}
            {filteredIcons.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="w-12 h-12 text-mw-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-mw-gray-600 dark:text-mw-gray-400 mb-2">
                  No icons found
                </h3>
                <p className="text-sm text-mw-gray-500 dark:text-mw-gray-500">
                  Try adjusting your search terms or selecting a different category
                </p>
              </div>
            ) : viewMode === 'list' ? (
              /* List View */
              <div className="space-y-2 mb-8">
                {filteredIcons.map((iconName) => (
                  <div
                    key={iconName}
                    className="flex items-center justify-between p-4 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg hover:border-mw-blue-300 dark:hover:border-mw-blue-600 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <DynamicIcon 
                        name={iconName} 
                        size={iconSize} 
                        className="text-mw-gray-700 dark:text-mw-gray-300 flex-shrink-0"
                      />
                      <span className="font-mono text-sm text-mw-gray-900 dark:text-white">
                        {iconName}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleCopyIcon(iconName)}
                        className="h-8 bg-mw-blue-600 hover:bg-mw-blue-700 text-white border-mw-blue-600 hover:border-mw-blue-700"
                      >
                        {copiedIcon === iconName ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFavorite(iconName)}
                        className="h-8 px-2"
                      >
                        <Heart 
                          className={`w-3 h-3 ${
                            favorites.includes(iconName) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-mw-gray-600 dark:text-mw-gray-400'
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Grid View */
              <div className={`grid ${getGridColumns()} gap-3 mb-8`}>
                {filteredIcons.map((iconName) => (
                  <div
                    key={iconName}
                    className="group relative aspect-[4/5] bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg hover:border-mw-blue-300 dark:hover:border-mw-blue-600 hover:shadow-md transition-all duration-200"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                      <DynamicIcon 
                        name={iconName} 
                        size={Math.min(iconSize, 32)}
                        className="text-mw-gray-700 dark:text-mw-gray-300 group-hover:text-mw-blue-600 dark:group-hover:text-mw-blue-400 transition-colors flex-shrink-0 mb-2"
                      />
                      <div className="text-xs text-center text-mw-gray-600 dark:text-mw-gray-400 truncate w-full px-1 leading-tight">
                        {iconName}
                      </div>
                    </div>
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end justify-center pb-3">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleCopyIcon(iconName)}
                        className="px-3 py-1 h-8 text-xs bg-mw-blue-600 hover:bg-mw-blue-700 text-white border-mw-blue-600 hover:border-mw-blue-700"
                        title="Copy import statement"
                      >
                        {copiedIcon === iconName ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

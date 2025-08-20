interface ExampleFilterProps {
  activeCategory: 'all' | 'application'
  onCategoryChange: (category: 'all' | 'application') => void
  subcategories: string[]
  selectedSubcategory: string
  onSubcategoryChange: (subcategory: string) => void
}

export function ExampleFilter({
  activeCategory,
  onCategoryChange,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange
}: ExampleFilterProps) {
  const categories = [
    { id: 'all', label: 'All Examples', count: 1 },
    { id: 'application', label: 'Moving Walls Applications', count: 1 }
  ] as const

  return (
    <div className="space-y-6">
      {/* Main Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-mw-primary-600 text-white shadow-lg'
                : 'bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700'
            }`}
          >
            {category.label}
            <span className={`ml-2 text-sm ${
              activeCategory === category.id
                ? 'text-white/80'
                : 'text-mw-gray-500 dark:text-mw-gray-400'
            }`}>
              ({category.count})
            </span>
          </button>
        ))}
      </div>

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSubcategoryChange('all')}
            className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
              selectedSubcategory === 'all'
                ? 'bg-mw-secondary-100 text-mw-secondary-700 dark:bg-mw-secondary-900 dark:text-mw-secondary-300'
                : 'bg-mw-gray-50 dark:bg-mw-gray-900 text-mw-gray-600 dark:text-mw-gray-400 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800'
            }`}
          >
            All Applications
          </button>
          {subcategories.map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => onSubcategoryChange(subcategory)}
              className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                selectedSubcategory === subcategory
                  ? 'bg-mw-secondary-100 text-mw-secondary-700 dark:bg-mw-secondary-900 dark:text-mw-secondary-300'
                  : 'bg-mw-gray-50 dark:bg-mw-gray-900 text-mw-gray-600 dark:text-mw-gray-400 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800'
              }`}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

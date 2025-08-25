'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { useState } from 'react'
import { ExampleCard, ExampleFilter } from './components'
import { exampleData, ExampleData } from './data/examples'

export default function ExamplesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'application'>('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')

  const filteredExamples = exampleData.filter((example: ExampleData) => {
    if (activeCategory !== 'all' && example.category !== activeCategory) return false
    if (selectedSubcategory !== 'all' && example.subcategory !== selectedSubcategory) return false
    return true
  })

  const subcategories = activeCategory === 'all' 
    ? []
    : [...new Set(exampleData.filter((ex: ExampleData) => ex.category === activeCategory).map((ex: ExampleData) => ex.subcategory))]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <PageHero
        title="Moving Walls Examples"
        description="Explore our comprehensive component showcases and application demos built with the Moving Walls Design System. From advanced data tables to AI chatbots, interactive carousels, and custom sliders."
        badge={{
          text: "Component Demos",
          variant: "secondary"
        }}
        stats={[
          { label: "Applications", value: "17" },
          { label: "MW Components", value: "15+" },
          { label: "Demo Pages", value: "200+" },
          { label: "Use Cases", value: "25+" }
        ]}
      />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
          <ExampleFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={setSelectedSubcategory}
          />

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {filteredExamples.map((example: ExampleData) => (
              <ExampleCard
                key={example.id}
                example={example}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredExamples.length === 0 && (
            <div className="text-center py-16">
              <div className="text-mw-gray-400 dark:text-mw-gray-500 text-6xl mb-4">Search</div>
              <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2">
                No examples found
              </h3>
              <p className="text-mw-gray-600 dark:text-mw-gray-300">
                Try adjusting your filters to see more examples.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

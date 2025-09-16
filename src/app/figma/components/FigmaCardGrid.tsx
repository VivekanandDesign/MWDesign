'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Eye, 
  Palette, 
  Type, 
  Layout, 
  Layers, 
  Code, 
  Heart,
  Grid,
  Zap,
  FileText,
  Settings
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export interface FigmaCard {
  id: string
  title: string
  description: string
  nodeId: string
  icon: React.ComponentType<{ className?: string }>
  category: 'foundation' | 'components' | 'patterns' | 'templates'
  tags: string[]
  lastUpdated: string
  thumbnail?: string
  complexity: 'basic' | 'intermediate' | 'advanced'
}

interface FigmaCardGridProps {
  onCardSelect: (nodeId: string, title: string) => void
  className?: string
}

const figmaCards: FigmaCard[] = [
  {
    id: 'overview',
    title: 'Design System Overview',
    description: 'Complete overview of the MW Global Design System including brand guidelines, principles, and structure.',
    nodeId: '179-5304', // Original working node ID
    icon: Eye,
    category: 'foundation',
    tags: ['Overview', 'Guidelines', 'Principles'],
    lastUpdated: '2025-09-16',
    complexity: 'basic'
  },
  {
    id: 'color-palette',
    title: 'Color Palette & Tokens',
    description: 'Complete color system with primary, secondary, and semantic colors. Includes dark mode variants.',
    nodeId: '179-5304', // Same as overview for now - shows color section
    icon: Palette,
    category: 'foundation',
    tags: ['Colors', 'Tokens', 'Dark Mode'],
    lastUpdated: '2025-09-15',
    complexity: 'basic'
  },
  {
    id: 'typography',
    title: 'Typography Scale',
    description: 'Typography hierarchy with Poppins font family, weights, sizes, and responsive scaling.',
    nodeId: '179-5304', // Same base node - will focus on typography area
    icon: Type,
    category: 'foundation',
    tags: ['Typography', 'Fonts', 'Hierarchy'],
    lastUpdated: '2025-09-14',
    complexity: 'basic'
  },
  {
    id: 'components',
    title: 'Components Library',
    description: 'Comprehensive component library with atomic design methodology and interactive states.',
    nodeId: '179-5304', // Same base node - components section
    icon: Layers,
    category: 'components',
    tags: ['Components', 'Atomic Design', 'States'],
    lastUpdated: '2025-09-16',
    complexity: 'intermediate'
  },
  {
    id: 'buttons',
    title: 'Button Variants',
    description: 'All button styles including primary, secondary, ghost variants with different sizes and states.',
    nodeId: '179-5304', // Same base node - buttons area
    icon: Zap,
    category: 'components',
    tags: ['Buttons', 'Variants', 'Interactive'],
    lastUpdated: '2025-09-15',
    complexity: 'basic'
  },
  {
    id: 'forms',
    title: 'Form Components',
    description: 'Input fields, textareas, selects, checkboxes, and complex form patterns with validation states.',
    nodeId: '179-5304', // Same base node - forms section
    icon: FileText,
    category: 'components',
    tags: ['Forms', 'Inputs', 'Validation'],
    lastUpdated: '2025-09-13',
    complexity: 'intermediate'
  },
  {
    id: 'navigation',
    title: 'Navigation Patterns',
    description: 'Navigation components including headers, sidebars, breadcrumbs, and mobile navigation.',
    nodeId: '179-5304', // Same base node - navigation area
    icon: Layout,
    category: 'patterns',
    tags: ['Navigation', 'Mobile', 'Responsive'],
    lastUpdated: '2025-09-12',
    complexity: 'intermediate'
  },
  {
    id: 'data-display',
    title: 'Data Display',
    description: 'Tables, cards, lists, and other data presentation components with sorting and filtering.',
    nodeId: '179-5304', // Same base node - data display area
    icon: Grid,
    category: 'components',
    tags: ['Tables', 'Cards', 'Data'],
    lastUpdated: '2025-09-11',
    complexity: 'advanced'
  },
  {
    id: 'layouts',
    title: 'Layout Templates',
    description: 'Page layouts, dashboard templates, and responsive grid systems for different use cases.',
    nodeId: '179-5304', // Same base node - layouts section
    icon: Code,
    category: 'templates',
    tags: ['Layouts', 'Templates', 'Grid'],
    lastUpdated: '2025-09-10',
    complexity: 'advanced'
  },
  {
    id: 'brand-elements',
    title: 'Brand Elements',
    description: 'Logo usage, brand colors, iconography, and visual identity guidelines.',
    nodeId: '179-5304', // Same base node - brand section
    icon: Heart,
    category: 'foundation',
    tags: ['Brand', 'Logo', 'Identity'],
    lastUpdated: '2025-09-09',
    complexity: 'basic'
  },
  {
    id: 'spacing-system',
    title: 'Spacing & Grid System',
    description: 'Spacing tokens, grid systems, and layout principles for consistent spatial relationships.',
    nodeId: '179-5304', // Same base node - spacing section
    icon: Settings,
    category: 'foundation',
    tags: ['Spacing', 'Grid', 'Layout'],
    lastUpdated: '2025-09-08',
    complexity: 'intermediate'
  }
]

export function FigmaCardGrid({ onCardSelect, className = '' }: FigmaCardGridProps) {
  const getCategoryColor = (category: FigmaCard['category']) => {
    switch (category) {
      case 'foundation': return 'mw-blue'
      case 'components': return 'mw-green'
      case 'patterns': return 'mw-purple'
      case 'templates': return 'mw-orange'
      default: return 'mw-gray'
    }
  }

  const getComplexityColor = (complexity: FigmaCard['complexity']) => {
    switch (complexity) {
      case 'basic': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const categoryGroups = figmaCards.reduce((groups, card) => {
    if (!groups[card.category]) {
      groups[card.category] = []
    }
    groups[card.category].push(card)
    return groups
  }, {} as Record<string, FigmaCard[]>)

  const categoryLabels = {
    foundation: 'Foundation',
    components: 'Components',
    patterns: 'Patterns',
    templates: 'Templates'
  }

  return (
    <div className={className}>
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-mw-blue-50 dark:bg-mw-blue-900/20 border border-mw-blue-200 dark:border-mw-blue-800 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Eye className="w-5 h-5 text-mw-blue-600 dark:text-mw-blue-400 mt-0.5" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-mw-blue-900 dark:text-mw-blue-100 mb-1">
              Interactive Figma Preview
            </h4>
            <p className="text-sm text-mw-blue-700 dark:text-mw-blue-300">
              These cards represent different sections of our design system. All cards currently show the main design system view
              since we're using the same Figma node ID. Navigate through the Figma file to explore different sections.
            </p>
          </div>
        </div>
      </motion.div>

      {Object.entries(categoryGroups).map(([category, cards], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-3 h-6 bg-${getCategoryColor(category as FigmaCard['category'])}-500 rounded-sm`}></div>
            <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3>
            <Badge variant="secondary" size="sm">
              {cards.length} {cards.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, cardIndex) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (categoryIndex * 0.1) + (cardIndex * 0.05) }}
              >
                <Card className="h-full hover:shadow-mw-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-${getCategoryColor(card.category)}-100 dark:bg-${getCategoryColor(card.category)}-900/20`}>
                        <card.icon className={`w-6 h-6 text-${getCategoryColor(card.category)}-600 dark:text-${getCategoryColor(card.category)}-400`} />
                      </div>
                      <Badge 
                        variant="secondary" 
                        size="sm"
                        className={getComplexityColor(card.complexity)}
                      >
                        {card.complexity}
                      </Badge>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-mw-gray-900 dark:text-white group-hover:text-mw-primary-600 dark:group-hover:text-mw-primary-400 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-2 line-clamp-3">
                        {card.description}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                        Updated {new Date(card.lastUpdated).toLocaleDateString()}
                      </span>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`https://www.figma.com/design/EXdqM1gSlWdFD7u5SjPBmV/MW-Global-Design-System?node-id=${card.nodeId}`, '_blank')
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Figma
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onCardSelect(card.nodeId, card.title)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

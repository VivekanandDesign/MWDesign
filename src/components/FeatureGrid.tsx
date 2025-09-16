import Link from 'next/link'
import { ArrowRight, Palette, Code, Layout, FileText, Heart, Accessibility, Sparkles, Bot, Figma } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Brand Identity',
    description: 'Discover the story, vision, and design philosophy behind Moving Walls unique approach to design systems.',
    href: '/brand-identity',
    items: ['Brand story', 'Vision & strategy', 'Design philosophy', 'Core values']
  },
  {
    icon: Palette,
    title: 'Design Tokens',
    description: 'Colors, typography, spacing, and elevation tokens that ensure visual consistency across all products.',
    href: '/tokens',
    items: ['Blue color palette', 'Poppins typography', '4pt grid system', 'Elevation shadows']
  },
  {
    icon: Code,
    title: 'Components',
    description: 'Atomic design components from simple buttons to complex organisms, all accessible and responsive.',
    href: '/components',
    items: ['68+ components', 'Interactive states', 'Props documentation', 'Code examples']
  },
  {
    icon: Sparkles,
    title: 'Icons',
    description: 'Complete Lucide icon library with over 3,400 carefully crafted icons organized in 20 categories.',
    href: '/icons',
    items: ['3,478 Lucide icons', '20 categories', 'Search functionality', 'Copy-paste ready']
  },
  {
    icon: Bot,
    title: 'MW-AI-DS',
    description: 'AI-powered design system tools for intelligent component generation, theme creation, and breakthrough creativity.',
    href: '/ai',
    items: ['AI Assistant', 'Theme Generator', 'Smart Search', 'Component AI']
  },
  {
    icon: Figma,
    title: 'Figma Integration',
    description: 'Live Figma design system viewer with design-code sync, token comparison, and collaboration tools.',
    href: '/figma',
    items: ['Live Figma viewer', 'Design token sync', 'Component mapping', 'Real-time collaboration']
  },
  {
    icon: Layout,
    title: 'Layout Patterns',
    description: 'Responsive layout patterns and templates that work across different screen sizes and devices.',
    href: '/patterns',
    items: ['Grid systems', 'Navigation patterns', 'Form layouts', 'Dashboard templates']
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Comprehensive guidelines and best practices for implementing the design system effectively.',
    href: '/design-process',
    items: ['Usage guidelines', 'Best practices', 'Implementation guides', 'Do\'s and don\'ts']
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    description: 'WCAG 2.1 AA compliant components with keyboard navigation and screen reader support.',
    href: '/accessibility',
    items: ['WCAG compliance', 'Keyboard navigation', 'Screen reader support', 'Color contrast']
  }
]

export function FeatureGrid() {
  return (
    <section className="py-20 bg-white dark:bg-mw-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-mw-gray-600 dark:text-mw-gray-300">
            A complete design system that bridges design and development, ensuring consistency and efficiency across all your projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group p-6 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 bg-white dark:bg-mw-gray-800 hover:border-mw-blue-300 dark:hover:border-mw-blue-600 transition-all duration-200 hover:shadow-mw-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-mw-blue-100 dark:bg-mw-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-mw-blue-200 dark:group-hover:bg-mw-blue-900/40 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-mw-blue-600 dark:text-mw-blue-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-mw-gray-400 group-hover:text-mw-blue-600 dark:group-hover:text-mw-blue-400 transform group-hover:translate-x-1 transition-all duration-200" />
                </div>
                
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2 group-hover:text-mw-blue-600 dark:group-hover:text-mw-blue-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-4">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.items.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-mw-gray-500 dark:text-mw-gray-400">
                      <div className="w-1.5 h-1.5 bg-mw-blue-600 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

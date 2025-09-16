'use client'

import { motion } from 'framer-motion'
import { Mic, Brain, Code, Zap, Shield, Wand2, Bot, Eye, Download, Settings } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Voice Commands',
    description: 'Natural language processing with voice recognition. Just speak your design requirements.',
    demo: 'Try: "Create a responsive button with primary styling"'
  },
  {
    icon: Brain,
    title: 'Context Awareness',
    description: 'Understands your project context, design system patterns, and user intent.',
    demo: 'Learns from your existing components and suggests improvements'
  },
  {
    icon: Code,
    title: 'Live Code Generation',
    description: 'Generates production-ready code with MW design tokens and best practices.',
    demo: 'Instant TypeScript/React components with proper typing'
  },
  {
    icon: Zap,
    title: 'Instant Preview',
    description: 'Real-time component preview with interactive states and responsive behavior.',
    demo: 'See your components come to life as you describe them'
  },
  {
    icon: Shield,
    title: 'Accessibility First',
    description: 'Built-in accessibility analysis and automatic WCAG compliance suggestions.',
    demo: 'Automatically adds ARIA labels, focus management, and color contrast'
  },
  {
    icon: Wand2,
    title: 'Smart Refinement',
    description: 'Iterative improvement with intelligent suggestions for optimization.',
    demo: 'Continuous learning from your feedback and usage patterns'
  }
]

const useCases = [
  {
    title: 'Rapid Prototyping',
    description: 'Create component mockups in seconds with natural language',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    title: 'Design System Expansion',
    description: 'Generate new components that fit your existing design language',
    icon: Bot,
    color: 'from-blue-400 to-purple-500'
  },
  {
    title: 'Accessibility Auditing',
    description: 'Automated accessibility analysis and improvement suggestions',
    icon: Shield,
    color: 'from-green-400 to-blue-500'
  },
  {
    title: 'Code Documentation',
    description: 'Automatic documentation generation with usage examples',
    icon: Code,
    color: 'from-purple-400 to-pink-500'
  }
]

export function CopilotFeatures() {
  return (
    <div className="bg-mw-gray-50 dark:bg-mw-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-mw-gray-900 dark:text-white mb-4">
              Breakthrough AI Capabilities
            </h2>
            <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300">
              Advanced features that understand your design intent and accelerate your workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-mw-gray-800 rounded-xl p-6 shadow-mw-md border border-mw-gray-200 dark:border-mw-gray-700 hover:shadow-mw-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-mw-primary-100 dark:bg-mw-primary-900/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-mw-primary-600 dark:text-mw-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-4">
                  {feature.description}
                </p>
                
                <div className="p-3 bg-mw-gray-50 dark:bg-mw-gray-700/50 rounded-lg">
                  <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 italic">
                    {feature.demo}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-mw-gray-900 dark:text-white mb-4">
              Transform Your Workflow
            </h2>
            <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300">
              From concept to code in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white dark:bg-mw-gray-800 rounded-xl p-6 shadow-mw-md border border-mw-gray-200 dark:border-mw-gray-700 hover:shadow-mw-xl transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-mw-gray-600 dark:text-mw-gray-300 text-sm">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

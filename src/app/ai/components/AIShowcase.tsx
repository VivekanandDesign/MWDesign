'use client'

import { motion } from 'framer-motion'
import { aiFeatures } from '../data/ai-features'
import { AIFeatureCard } from './AIFeatureCard'

export function AIShowcase() {
  return (
    <section id="ai-features" className="py-20 bg-mw-gray-50 dark:bg-mw-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 dark:text-white mb-4">
            AI-Powered Design Tools
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-mw-gray-600 dark:text-mw-gray-300">
            Revolutionary AI features that understand your design intent and help you create 
            breakthrough experiences faster than ever before.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <AIFeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-mw-primary-100 dark:bg-mw-primary-900/20 text-mw-primary-700 dark:text-mw-primary-300 rounded-full text-sm font-medium">
            🚀 More AI features coming soon in 2025
          </div>
        </motion.div>
      </div>
    </section>
  )
}

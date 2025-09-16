'use client'

import { motion } from 'framer-motion'
import { AIChat } from './AIChat'

export function AIPlayground() {
  return (
    <section id="ai-playground" className="py-20 bg-white dark:bg-mw-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 dark:text-white mb-4">
            Try MW Copilot
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-mw-gray-600 dark:text-mw-gray-300">
            Experience the future of design system interaction. Chat with our AI assistant 
            and watch it understand and respond to your design needs in real-time.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AIChat />
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Natural Language',
              description: 'Describe what you want in plain English, and watch AI create it.',
              icon: '💬'
            },
            {
              title: 'Context Aware',
              description: 'AI understands your project context and suggests relevant solutions.',
              icon: '🧠'
            },
            {
              title: 'Instant Code',
              description: 'Get production-ready code that follows MW design system patterns.',
              icon: '⚡'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="text-center p-6 bg-mw-gray-50 dark:bg-mw-gray-700 rounded-lg"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-mw-gray-600 dark:text-mw-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

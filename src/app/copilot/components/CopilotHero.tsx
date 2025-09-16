'use client'

import { motion } from 'framer-motion'
import { Bot, Mic, Code, Sparkles, Zap, Brain } from 'lucide-react'

export function CopilotHero() {
  return (
    <section className="relative overflow-hidden bg-mw-primary-50 dark:bg-mw-gray-900 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className={`w-16 h-16 rounded-lg ${
              i % 3 === 0 ? 'bg-mw-primary-200' :
              i % 3 === 1 ? 'bg-mw-flow-200' :
              'bg-mw-primary-100'
            } opacity-20 dark:opacity-10`} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-mw-primary-600 rounded-3xl shadow-xl mb-8"
          >
            <Bot className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-mw-gray-900 dark:text-white mb-6"
          >
            MW Copilot
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl lg:text-2xl text-mw-gray-600 dark:text-mw-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Your AI-powered design companion that understands your intent and creates breakthrough experiences
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Mic, text: 'Voice Commands' },
              { icon: Code, text: 'Live Preview' },
              { icon: Sparkles, text: 'Smart Suggestions' },
              { icon: Zap, text: 'Instant Generation' },
              { icon: Brain, text: 'Context Aware' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-mw-gray-800/80 backdrop-blur-sm rounded-full border border-mw-gray-200 dark:border-mw-gray-600 shadow-sm"
              >
                <feature.icon className="w-4 h-4 text-mw-primary-600" />
                <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-mw-flow-100 dark:bg-mw-flow-900/20 text-mw-flow-800 dark:text-mw-flow-400 rounded-full border border-mw-flow-200 dark:border-mw-flow-800"
          >
            <div className="w-3 h-3 bg-mw-flow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Beta Access Available</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

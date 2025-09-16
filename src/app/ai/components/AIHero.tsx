'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Bot, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function AIHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-mw-gray-50 to-white dark:from-mw-gray-900 dark:to-mw-gray-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-mw-primary-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-mw-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-mw-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-mw-flow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-mw-primary-100 dark:bg-mw-primary-900/20 text-mw-primary-700 dark:text-mw-primary-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Introducing MW-AI-DS
          <span className="ml-2 px-2 py-1 text-xs bg-mw-primary-200 dark:bg-mw-primary-800 rounded-full">BETA</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-mw-gray-900 dark:text-white mb-6"
        >
          Breaking Walls with{' '}
          <motion.span
            className="bg-gradient-to-r from-mw-primary-600 via-mw-secondary-500 to-mw-flow-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            AI Intelligence
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-mw-gray-600 dark:text-mw-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          The world's first AI-powered design system that understands your creative intent. 
          Generate components, themes, and experiences through natural conversation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#ai-playground"
            className="group inline-flex items-center px-8 py-4 bg-mw-primary-600 hover:bg-mw-primary-700 text-white rounded-lg font-medium text-lg transition-all duration-200 hover:shadow-mw-lg hover:scale-105"
          >
            <Bot className="w-5 h-5 mr-2" />
            Try AI Assistant
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="#ai-features"
            className="group inline-flex items-center px-8 py-4 border-2 border-mw-primary-600 text-mw-primary-600 hover:bg-mw-primary-50 dark:hover:bg-mw-primary-900/20 rounded-lg font-medium text-lg transition-all duration-200"
          >
            <Zap className="w-5 h-5 mr-2" />
            Explore Features
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: 'Components Generated', value: '12,847' },
            { label: 'Themes Created', value: '3,429' },
            { label: 'Issues Fixed', value: '8,756' },
            { label: 'Time Reduced', value: '67%' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-2xl sm:text-3xl font-bold text-mw-primary-600 dark:text-mw-primary-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-mw-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-mw-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

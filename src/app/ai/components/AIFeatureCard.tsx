'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { AIFeature } from '../data/ai-features'
import { FeatureModal } from './FeatureModal'

interface AIFeatureCardProps {
  feature: AIFeature
  index: number
}

export function AIFeatureCard({ feature, index }: AIFeatureCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const getStatusIcon = () => {
    switch (feature.status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'beta':
        return <Sparkles className="w-4 h-4 text-mw-secondary-600" />
      case 'coming-soon':
        return <Clock className="w-4 h-4 text-mw-gray-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (feature.status) {
      case 'available':
        return 'Available Now'
      case 'beta':
        return 'Public Beta'
      case 'coming-soon':
        return 'Coming Soon'
      default:
        return ''
    }
  }

  const getStatusBadgeStyle = () => {
    switch (feature.status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'beta':
        return 'bg-mw-secondary-100 text-mw-secondary-800 dark:bg-mw-secondary-900/20 dark:text-mw-secondary-400'
      case 'coming-soon':
        return 'bg-mw-gray-100 text-mw-gray-800 dark:bg-mw-gray-800 dark:text-mw-gray-400'
      default:
        return ''
    }
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (feature.status === 'coming-soon') return
    
    // For MW Copilot beta, redirect directly to copilot page
    if (feature.id === 'mw-copilot' && feature.status === 'beta') {
      window.location.href = '/copilot'
      return
    }
    
    setIsModalOpen(true)
  }

  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative z-0"
    >
      <div className="relative h-full p-8 bg-white dark:bg-mw-gray-800 rounded-xl border border-mw-gray-200 dark:border-mw-gray-700 shadow-mw-md hover:shadow-mw-xl transition-all duration-300 overflow-hidden z-10">
        {/* Background Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />
        
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle()}`}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </div>
          
          {/* Category Badge */}
          <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 capitalize">
            {feature.category}
          </div>
        </div>

        {/* Icon */}
        <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-2 group-hover:text-mw-primary-600 dark:group-hover:text-mw-primary-400 transition-colors duration-200">
              {feature.title}
            </h3>
            <p className="text-sm font-medium text-mw-primary-600 dark:text-mw-primary-400 mb-3">
              {feature.subtitle}
            </p>
            <p className="text-mw-gray-600 dark:text-mw-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {feature.features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index * 0.1) + (idx * 0.05) }}
              className="flex items-start space-x-3"
            >
              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${feature.gradient} rounded-full mt-2 flex-shrink-0`} />
              <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleButtonClick}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 relative z-10 ${
            feature.status === 'available' 
              ? 'bg-mw-primary-600 hover:bg-mw-primary-700 text-white shadow-sm hover:shadow-md cursor-pointer' 
              : feature.status === 'beta'
              ? 'bg-mw-secondary-100 hover:bg-mw-secondary-200 text-mw-secondary-700 dark:bg-mw-secondary-900/20 dark:hover:bg-mw-secondary-900/40 dark:text-mw-secondary-400 cursor-pointer'
              : 'bg-mw-gray-100 hover:bg-mw-gray-200 text-mw-gray-600 dark:bg-mw-gray-700 dark:hover:bg-mw-gray-600 dark:text-mw-gray-400 cursor-not-allowed'
          }`}
          disabled={feature.status === 'coming-soon'}
          type="button"
          aria-label={`${feature.status === 'available' ? 'Try' : feature.status === 'beta' ? 'Join beta for' : 'Coming soon'} ${feature.title}`}
        >
          {feature.status === 'available' && (
            <>
              Try Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
          {feature.status === 'beta' && (
            <>
              Join Beta
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
          {feature.status === 'coming-soon' && (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </>
          )}
        </motion.button>

        {/* Demo Type Indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-mw-primary-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal 
        feature={feature}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  )
}

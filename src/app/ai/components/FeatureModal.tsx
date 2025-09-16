'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Sparkles, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import type { AIFeature } from '../data/ai-features'

interface FeatureModalProps {
  feature: AIFeature | null
  isOpen: boolean
  onClose: () => void
}

export function FeatureModal({ feature, isOpen, onClose }: FeatureModalProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!feature) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Simulate submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
      onClose()
      // Redirect to Copilot for beta users
      if (feature?.status === 'beta') {
        window.location.href = '/copilot'
      }
    }, 2000)
  }

  const Icon = feature.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className={`relative p-6 bg-gradient-to-br ${feature.gradient} text-white`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  {feature.status === 'available' ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                        Ready to Experience {feature.title}?
                      </h4>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-6">
                        {feature.title} is available now! Get started with our breakthrough AI design tools.
                      </p>
                      <div className="space-y-3">
                        <a
                          href="/copilot"
                          className="w-full bg-mw-primary-600 hover:bg-mw-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                          Launch {feature.title}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                        <button 
                          onClick={onClose}
                          className="w-full bg-mw-gray-100 hover:bg-mw-gray-200 dark:bg-mw-gray-700 dark:hover:bg-mw-gray-600 text-mw-gray-700 dark:text-mw-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Maybe Later
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-6">
                        <Sparkles className="w-12 h-12 text-mw-secondary-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                          Join the {feature.title} Beta
                        </h4>
                        <p className="text-mw-gray-600 dark:text-mw-gray-300">
                          Be among the first to experience {feature.title}. Get early access and help shape the future of AI-powered design.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg focus:ring-2 focus:ring-mw-primary-500 focus:border-transparent dark:bg-mw-gray-700 dark:text-white transition-colors"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <button
                            type="submit"
                            className="w-full bg-mw-secondary-600 hover:bg-mw-secondary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Join Beta Waitlist
                          </button>
                          <button 
                            type="button"
                            onClick={onClose}
                            className="w-full bg-mw-gray-100 hover:bg-mw-gray-200 dark:bg-mw-gray-700 dark:hover:bg-mw-gray-600 text-mw-gray-700 dark:text-mw-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>

                      <div className="mt-6 p-4 bg-mw-gray-50 dark:bg-mw-gray-700/50 rounded-lg">
                        <h5 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Beta Benefits:</h5>
                        <ul className="text-xs text-mw-gray-600 dark:text-mw-gray-400 space-y-1">
                          <li>• Early access to cutting-edge features</li>
                          <li>• Direct feedback channel to our team</li>
                          <li>• Priority support and guidance</li>
                          <li>• Exclusive beta user community</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                    You're In!
                  </h4>
                  <p className="text-mw-gray-600 dark:text-mw-gray-300">
                    Welcome to the {feature.title} beta. You'll receive an email with next steps shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Send, Sparkles, Code, CheckCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  code?: string
  suggestions?: string[]
}

const demoMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: "👋 Hi! I'm your AI design assistant. I can help you create components, themes, and solve design challenges. What would you like to build today?",
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'user',
    content: "Create a pricing card with three tiers",
    timestamp: new Date()
  },
  {
    id: '3',
    type: 'assistant',
    content: "Perfect! I'll create a responsive pricing card component with three tiers using MW design tokens. This will include proper spacing, typography, and interactive states.",
    timestamp: new Date(),
    code: `<PricingCard className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <PricingTier 
    name="Starter" 
    price="$9"
    period="month"
    features={[
      'Basic components',
      '10 projects',
      'Community support'
    ]}
    ctaText="Get Started"
  />
  <PricingTier 
    name="Pro" 
    price="$29"
    period="month"
    highlighted 
    features={[
      'All components',
      'Unlimited projects',
      'AI assistance',
      'Priority support'
    ]}
    ctaText="Start Free Trial"
  />
  <PricingTier 
    name="Enterprise" 
    price="Custom"
    features={[
      'Everything in Pro',
      'Custom themes',
      'SSO integration',
      'Dedicated support'
    ]}
    ctaText="Contact Sales"
  />
</PricingCard>`
  },
  {
    id: '4',
    type: 'user',
    content: "Make it more accessible",
    timestamp: new Date()
  },
  {
    id: '5',
    type: 'assistant',
    content: "Great request! I've analyzed the pricing card for accessibility. Here are the improvements I recommend:",
    timestamp: new Date(),
    suggestions: [
      'Add ARIA labels for screen readers: aria-label="Pricing plans"',
      'Include focus management with visible focus rings',
      'Ensure 4.5:1 color contrast ratio for all text',
      'Add semantic headings (h3) for tier names',
      'Include role="region" for the highlighted tier',
      'Add keyboard navigation support for CTAs'
    ]
  }
]

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')

  // Auto-play demo messages
  useEffect(() => {
    if (currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        
        setTimeout(() => {
          setMessages(prev => [...prev, demoMessages[currentMessageIndex]])
          setIsTyping(false)
          setCurrentMessageIndex(prev => prev + 1)
        }, 1500)
      }, currentMessageIndex === 0 ? 500 : 2000)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex])

  const handleSendMessage = () => {
    if (!input.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    setInput('')
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "I understand! Let me help you with that. This is a demo, but in the full version, I'd provide detailed assistance for your request.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    }, 500)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-mw-gray-800 rounded-xl shadow-mw-lg border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-mw-primary-50 dark:bg-mw-primary-900/20 border-b border-mw-gray-200 dark:border-mw-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-mw-primary-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-mw-gray-900 dark:text-white">MW Copilot</h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">AI Design Assistant</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-mw-gray-600 ml-3' 
                    : 'bg-mw-primary-600 mr-3'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-mw-primary-600 text-white'
                    : 'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Code Block */}
                  {message.code && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <SyntaxHighlighter
                        language="tsx"
                        style={tomorrow}
                        customStyle={{
                          margin: 0,
                          fontSize: '12px',
                          background: '#1a1a1a'
                        }}
                      >
                        {message.code}
                      </SyntaxHighlighter>
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-800 dark:text-green-300">{suggestion}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-mw-primary-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-mw-gray-100 dark:bg-mw-gray-700 rounded-lg p-4">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-mw-gray-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <div className="px-6 py-4 border-t border-mw-gray-200 dark:border-mw-gray-700">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me to create components, themes, or help with design..."
            className="flex-1 px-4 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg bg-white dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white placeholder-mw-gray-500 focus:ring-2 focus:ring-mw-primary-500 focus:border-transparent transition-all duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="px-4 py-2 bg-mw-primary-600 hover:bg-mw-primary-700 disabled:bg-mw-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-xs text-mw-gray-500 dark:text-mw-gray-400 mt-2">
          This is a demo. The full AI assistant will provide real-time help with your design system needs.
        </p>
      </div>
    </div>
  )
}

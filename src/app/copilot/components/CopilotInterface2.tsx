'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Send, Mic, MicOff, Download, Sparkles } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LivePreview } from './LivePreview'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  code?: string
  component?: string
}

interface ComponentPreview {
  name: string
  code: string
  props?: Record<string, any>
}

export function CopilotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I am MW Copilot, your AI design assistant. I can help you generate components, design patterns, and code using MovingWalls Design System. What would you like to create today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPreview, setCurrentPreview] = useState<ComponentPreview | null>(null)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition()
      speechRecognition.continuous = false
      speechRecognition.interimResults = false
      speechRecognition.lang = 'en-US'
      
      speechRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }
      
      speechRecognition.onerror = () => {
        setIsListening(false)
      }
      
      speechRecognition.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(speechRecognition)
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleListening = () => {
    if (!recognition) return
    
    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const parseIntent = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('button')) {
      return { component: 'button', intent: 'create' }
    }
    if (lowerMessage.includes('card')) {
      return { component: 'card', intent: 'create' }
    }
    if (lowerMessage.includes('modal') || lowerMessage.includes('dialog')) {
      return { component: 'modal', intent: 'create' }
    }
    if (lowerMessage.includes('form')) {
      return { component: 'form', intent: 'create' }
    }
    if (lowerMessage.includes('nav') || lowerMessage.includes('navigation')) {
      return { component: 'navbar', intent: 'create' }
    }
    
    return { component: null, intent: 'chat' }
  }

  const generateCode = (component: string) => {
    const templates: Record<string, string> = {
      button: `import { Button } from '@/components/ui/Button'

// MW Design System Button Component
export function CustomButton() {
  return (
    <Button 
      variant="primary" 
      size="md"
      className="bg-mw-primary-600 hover:bg-mw-primary-700"
    >
      Click Me
    </Button>
  )
}`,
      card: `import { Card } from '@/components/ui/Card'

// MW Design System Card Component
export function CustomCard() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-mw-gray-600">Card description</p>
      </Card.Header>
      <Card.Content>
        <p>Your content goes here</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">Action</Button>
      </Card.Footer>
    </Card>
  )
}`,
      modal: `import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

// MW Design System Modal Component
export function CustomModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2>Modal Title</h2>
      </Modal.Header>
      <Modal.Content>
        <p>Modal content goes here</p>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Confirm
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}`,
      form: `import { Form, Input, Button } from '@/components/ui'

// MW Design System Form Component
export function ContactForm() {
  return (
    <Form className="max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <Input 
          type="text" 
          placeholder="Enter your name"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <Input 
          type="email" 
          placeholder="Enter your email"
          className="w-full"
        />
      </div>
      <Button variant="primary" className="w-full">
        Submit
      </Button>
    </Form>
  )
}`,
      navbar: `import { Navbar, Button } from '@/components/ui'

// MW Design System Navbar Component
export function CustomNavbar() {
  return (
    <Navbar className="border-b">
      <Navbar.Brand>
        <span className="font-bold">Brand</span>
      </Navbar.Brand>
      <Navbar.Links>
        <a href="#" className="hover:text-mw-primary-600">Home</a>
        <a href="#" className="hover:text-mw-primary-600">About</a>
        <a href="#" className="hover:text-mw-primary-600">Services</a>
        <a href="#" className="hover:text-mw-primary-600">Contact</a>
      </Navbar.Links>
      <Button variant="primary" size="sm">
        Get Started
      </Button>
    </Navbar>
  )
}`
    }
    
    return templates[component] || `// Component code for ${component}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsGenerating(true)

    // Parse intent
    const { component, intent } = parseIntent(input)

    // Simulate AI processing
    setTimeout(() => {
      let assistantContent = ''
      let code = ''
      let componentName = ''

      if (component && intent === 'create') {
        assistantContent = `I'll create a ${component} component for you using MovingWalls Design System tokens and best practices.`
        code = generateCode(component)
        componentName = component
        
        // Update live preview
        setCurrentPreview({
          name: component,
          code: code,
          props: {}
        })
      } else {
        assistantContent = `I understand you want to ${input}. I can help you create components like buttons, cards, modals, forms, and navigation bars. What specific component would you like me to generate?`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
        code: code || undefined,
        component: componentName || undefined
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.tsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Interface */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-mw-primary-600 to-mw-secondary-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">MW Copilot</h3>
                  <p className="text-sm text-white/80">AI Design Assistant</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-mw-primary-600 text-white' 
                        : 'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {message.type === 'assistant' && (
                          <Bot className="w-4 h-4 mt-0.5 text-mw-primary-600" />
                        )}
                        {message.type === 'user' && (
                          <User className="w-4 h-4 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          {message.code && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                                  Generated Code:
                                </span>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => copyToClipboard(message.code!)}
                                    className="p-1 text-xs bg-mw-gray-200 dark:bg-mw-gray-600 rounded hover:bg-mw-gray-300 dark:hover:bg-mw-gray-500"
                                  >
                                    Copy
                                  </button>
                                  <button
                                    onClick={() => downloadCode(message.code!, message.component || 'component')}
                                    className="p-1 text-xs bg-mw-primary-100 dark:bg-mw-primary-900/20 text-mw-primary-700 dark:text-mw-primary-300 rounded hover:bg-mw-primary-200 dark:hover:bg-mw-primary-900/40"
                                  >
                                    <Download className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="text-xs bg-mw-gray-900 text-green-400 p-2 rounded font-mono overflow-x-auto">
                                <SyntaxHighlighter
                                  language="typescript"
                                  style={tomorrow}
                                  customStyle={{
                                    background: 'transparent',
                                    padding: 0,
                                    margin: 0,
                                    fontSize: '11px'
                                  }}
                                >
                                  {message.code}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-mw-gray-100 dark:bg-mw-gray-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-mw-primary-600" />
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-mw-primary-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-mw-primary-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-mw-primary-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-mw-gray-200 dark:border-mw-gray-700">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe the component you want to create..."
                    className="w-full px-4 py-3 pr-12 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg focus:ring-2 focus:ring-mw-primary-500 focus:border-transparent dark:bg-mw-gray-700 dark:text-white"
                    disabled={isGenerating}
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                      isListening 
                        ? 'text-red-500 bg-red-100 dark:bg-red-900/20' 
                        : 'text-mw-gray-400 hover:text-mw-gray-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isGenerating}
                  className="px-6 py-3 bg-mw-primary-600 text-white rounded-lg hover:bg-mw-primary-700 focus:ring-2 focus:ring-mw-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 p-6">
            <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-4">Quick Start</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Create Button', command: 'Create a primary button component' },
                { label: 'Build Card', command: 'Generate a card layout component' },
                { label: 'Make Modal', command: 'Create a modal dialog component' },
                { label: 'Design Form', command: 'Build a contact form component' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setInput(item.command)}
                  className="p-3 text-left bg-mw-gray-50 dark:bg-mw-gray-700 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-600 rounded-lg transition-colors"
                >
                  <div className="text-sm font-medium text-mw-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 mt-1">{item.command}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <LivePreview preview={currentPreview} />
          
          {/* Component Stats */}
          <div className="bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 p-6">
            <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-4">Session Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-mw-primary-600">{messages.filter(m => m.component).length}</div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-mw-secondary-600">{messages.length}</div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Messages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-mw-accent-600">
                  {Math.floor((Date.now() - new Date().setHours(0,0,0,0)) / 60000)}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

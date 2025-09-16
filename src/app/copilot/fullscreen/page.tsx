'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Send, Mic, MicOff, Download, Sparkles, X, Minimize } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LivePreview } from '../components/LivePreview'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isCode?: boolean
  intent?: string
}

interface VoiceRecognition {
  start: () => void
  stop: () => void
  onresult: ((event: any) => void) | null
  onend: ((event: any) => void) | null
  onerror: ((event: any) => void) | null
  continuous: boolean
  interimResults: boolean
  lang: string
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): VoiceRecognition
    }
    webkitSpeechRecognition: {
      new (): VoiceRecognition
    }
  }
}

export default function CopilotFullscreenPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm MW Copilot, your AI design assistant. I can help you create components, understand design patterns, and generate code. Try saying or typing something like 'Create a primary button' or 'Show me a card component'.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [previewCode, setPreviewCode] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<VoiceRecognition | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Voice Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        const recognition = recognitionRef.current
        
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognition.onerror = () => {
          setIsListening(false)
        }
      }
    }
  }, [])

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const parseIntent = (message: string): { intent: string; content: string } => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('button')) return { intent: 'button', content: message }
    if (lowerMessage.includes('card')) return { intent: 'card', content: message }
    if (lowerMessage.includes('modal') || lowerMessage.includes('dialog')) return { intent: 'modal', content: message }
    if (lowerMessage.includes('form')) return { intent: 'form', content: message }
    if (lowerMessage.includes('navbar') || lowerMessage.includes('navigation')) return { intent: 'navbar', content: message }
    
    return { intent: 'general', content: message }
  }

  const generateCode = (intent: string, message: string): string => {
    const templates = {
      button: `// MW Design System Button
<Button 
  variant="primary"
  size="md"
  className="bg-mw-primary-600 hover:bg-mw-primary-700 text-white px-6 py-3 rounded-lg"
>
  Click Me
</Button>`,
      card: `// MW Design System Card
<div className="bg-white dark:bg-mw-gray-800 rounded-xl p-6 shadow-lg border border-mw-gray-200 dark:border-mw-gray-700">
  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
    Card Title
  </h3>
  <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-4">
    This is a beautiful card component following MW design guidelines.
  </p>
  <Button variant="primary">Learn More</Button>
</div>`,
      modal: `// MW Design System Modal
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white dark:bg-mw-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
    <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
      Modal Title
    </h2>
    <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-6">
      Modal content goes here...
    </p>
    <div className="flex space-x-3">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </div>
  </div>
</div>`,
      form: `// MW Design System Form
<form className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
      Email
    </label>
    <input 
      type="email"
      className="w-full px-4 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg focus:ring-2 focus:ring-mw-primary-500 dark:bg-mw-gray-800"
      placeholder="Enter your email"
    />
  </div>
  <Button type="submit" variant="primary" className="w-full">
    Submit
  </Button>
</form>`,
      navbar: `// MW Design System Navigation
<nav className="bg-white dark:bg-mw-gray-900 border-b border-mw-gray-200 dark:border-mw-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <div className="text-xl font-bold text-mw-primary-600">MW Design</div>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-mw-gray-600 hover:text-mw-primary-600">Components</a>
        <a href="#" className="text-mw-gray-600 hover:text-mw-primary-600">Tokens</a>
        <a href="#" className="text-mw-gray-600 hover:text-mw-primary-600">Icons</a>
      </div>
    </div>
  </div>
</nav>`
    }
    
    return templates[intent as keyof typeof templates] || `// Generated code for: ${message}\n// This would contain component code based on your request.`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Parse intent and generate response
    const { intent, content } = parseIntent(input)
    const generatedCode = generateCode(intent, content)
    
    // Update preview with generated code
    setPreviewCode(generatedCode)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I've created a ${intent} component for you! Here's the code:`,
        timestamp: new Date(),
      }

      const codeMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: generatedCode,
        timestamp: new Date(),
        isCode: true,
        intent,
      }

      setMessages(prev => [...prev, botMessage, codeMessage])
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadCode = (code: string, filename: string = 'component.tsx') => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-mw-gray-800 border-b border-mw-gray-200 dark:border-mw-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mw-primary-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-mw-gray-900 dark:text-white">MW Copilot - Full Screen</h1>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">AI Design Assistant</p>
              </div>
            </div>
            <button
              onClick={() => window.close()}
              className="p-2 rounded-lg bg-mw-gray-100 dark:bg-mw-gray-700 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600 transition-colors duration-200"
              title="Close"
            >
              <X className="w-5 h-5 text-mw-gray-600 dark:text-mw-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Chat Interface */}
          <div className="flex flex-col">
            <div className="bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 flex flex-col h-full">
              {/* Chat Header */}
              <div className="px-6 py-4 bg-mw-primary-600 text-white rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
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

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' ? 'bg-mw-primary-600 ml-3' : 'bg-mw-gray-200 dark:bg-mw-gray-700 mr-3'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-mw-gray-600 dark:text-mw-gray-300" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-mw-primary-600 text-white'
                            : 'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white'
                        }`}>
                          {message.isCode ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium opacity-75">
                                  {message.intent?.toUpperCase()} COMPONENT
                                </span>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => copyToClipboard(message.content)}
                                    className="text-xs px-2 py-1 rounded bg-black/10 hover:bg-black/20 transition-colors"
                                  >
                                    Copy
                                  </button>
                                  <button
                                    onClick={() => downloadCode(message.content)}
                                    className="text-xs px-2 py-1 rounded bg-black/10 hover:bg-black/20 transition-colors flex items-center space-x-1"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Download</span>
                                  </button>
                                </div>
                              </div>
                              <SyntaxHighlighter
                                language="tsx"
                                style={tomorrow}
                                className="rounded-lg text-sm"
                                customStyle={{
                                  margin: 0,
                                  padding: '12px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                {message.content}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-mw-gray-200 dark:bg-mw-gray-700 mr-3">
                        <Bot className="w-4 h-4 text-mw-gray-600 dark:text-mw-gray-300" />
                      </div>
                      <div className="bg-mw-gray-100 dark:bg-mw-gray-700 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                              className="w-2 h-2 bg-mw-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-6 border-t border-mw-gray-200 dark:border-mw-gray-700">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me to create a component..."
                      className="w-full px-4 py-3 pr-12 border border-mw-gray-300 dark:border-mw-gray-600 rounded-xl 
                               focus:ring-2 focus:ring-mw-primary-500 focus:border-mw-primary-500 
                               dark:bg-mw-gray-800 dark:text-white text-sm"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={toggleVoiceRecognition}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                        isListening 
                          ? 'bg-red-500 text-white' 
                          : 'bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-200 dark:hover:bg-mw-gray-600'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-3 bg-mw-primary-600 text-white rounded-xl hover:bg-mw-primary-700 
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 
                             transition-colors font-medium text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex flex-col">
            <div className="bg-white dark:bg-mw-gray-800 rounded-xl shadow-xl border border-mw-gray-200 dark:border-mw-gray-700 h-full">
              <div className="px-6 py-4 border-b border-mw-gray-200 dark:border-mw-gray-700">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-mw-flow-600" />
                  <h3 className="font-semibold text-mw-gray-900 dark:text-white">Live Preview</h3>
                </div>
              </div>
              <div className="flex-1 p-6">
                <LivePreview code={previewCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

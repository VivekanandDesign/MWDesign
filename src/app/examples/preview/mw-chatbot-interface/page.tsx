'use client'

import { useState, useRef, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { Send, Paperclip, Smile, MoreVertical, Bot, User, ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  typing?: boolean
  attachments?: { name: string; type: string; url: string }[]
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 5000)
    },
    {
      id: '2',
      text: 'Hi! I\'m looking for information about your design system components.',
      sender: 'user',
      timestamp: new Date(Date.now() - 4000)
    },
    {
      id: '3',
      text: 'Great! I\'d be happy to help you with our Moving Walls Design System. We have over 65+ components including buttons, forms, data tables, charts, and much more. What specific component are you interested in?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 3000)
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let botResponse = ''
      
      if (userMessage.toLowerCase().includes('button')) {
        botResponse = 'Our Button component comes with multiple variants (primary, secondary, outline, ghost, destructive), different sizes, and supports icons. It\'s fully accessible and includes hover states. Would you like to see the documentation or try it out?'
      } else if (userMessage.toLowerCase().includes('table') || userMessage.toLowerCase().includes('data')) {
        botResponse = 'We have both basic Table and Advanced Table components. The Advanced Table includes 50+ features like sorting, filtering, pagination, row selection, and bulk actions. Perfect for enterprise applications!'
      } else if (userMessage.toLowerCase().includes('form')) {
        botResponse = 'Our Form system includes Input, Textarea, Select, Checkbox, Radio, DatePicker, and many more. All components have built-in validation, error handling, and accessibility features.'
      } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('support')) {
        botResponse = 'I\'m here to help! You can ask me about any component in our design system, or visit our documentation at movingwalls.design. Is there a specific feature you\'re looking for?'
      } else {
        botResponse = 'That\'s interesting! Our design system covers a wide range of components and patterns. You can explore our documentation, try the interactive examples, or ask me about specific components. What would you like to know more about?'
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => prev.filter(m => !m.typing).concat(newMessage))
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    simulateBotResponse(inputValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const quickSuggestions = [
    'Show me button examples',
    'How do I use the data table?',
    'Tell me about form components',
    'What about accessibility?'
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/examples">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Examples
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                  AI Chatbot Interface
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">AI & Chat</Badge>
                  <Badge variant="secondary">Intermediate</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => window.open(window.location.href, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-4">
              Modern conversational AI interface with message bubbles, typing indicators, file attachments, and smart responses.
            </p>
            <p className="text-mw-gray-600 dark:text-mw-gray-400">
              <span className="font-medium">Use Case:</span> Customer support automation, conversational AI, user assistance, and interactive communication interfaces.
            </p>
          </div>

          {/* Preview Content */}
          <div className="bg-gradient-to-br from-mw-blue-50 to-mw-purple-50 dark:from-mw-gray-900 dark:to-mw-gray-800 rounded-lg p-8 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar fallback="AI" className="bg-mw-blue-100 dark:bg-mw-blue-900" />
                  <div>
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">AI Assistant</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">Online</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar 
                        fallback={message.sender === 'user' ? 'U' : 'AI'}
                        className={`w-8 h-8 ${message.sender === 'user' ? 'bg-mw-purple-100 dark:bg-mw-purple-900' : 'bg-mw-blue-100 dark:bg-mw-blue-900'}`}
                      />
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-mw-blue-600 text-white' 
                          : 'bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-mw-blue-100' 
                            : 'text-mw-gray-500 dark:text-mw-gray-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <Avatar fallback="AI" className="w-8 h-8 bg-mw-blue-100 dark:bg-mw-blue-900" />
                      <div className="bg-mw-gray-100 dark:bg-mw-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-1">
                          <Spinner size="sm" />
                          <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                            AI is typing...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Suggestions */}
              {messages.length <= 3 && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputValue(suggestion)
                          setTimeout(handleSendMessage, 100)
                        }}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isTyping}
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Features Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-mw-gray-900 dark:text-white">Chat Features</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Real-time messaging</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Typing indicators</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">File attachments</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Smart suggestions</span>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-mw-gray-900 dark:text-white">AI Capabilities</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                  • Natural language processing
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                  • Context-aware responses
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                  • Component recommendations
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                  • Documentation assistance
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-mw-gray-900 dark:text-white">Usage Stats</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-mw-gray-600 dark:text-mw-gray-300">Messages sent</span>
                  <span className="font-medium">{messages.filter(m => m.sender === 'user').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-mw-gray-600 dark:text-mw-gray-300">AI responses</span>
                  <span className="font-medium">{messages.filter(m => m.sender === 'bot').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-mw-gray-600 dark:text-mw-gray-300">Response time</span>
                  <span className="font-medium text-green-600">~1.2s</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
        
    </div>
    </main>
      
    <Footer />
  </div>
  )
}

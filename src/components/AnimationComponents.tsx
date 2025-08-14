'use client'

import React from 'react'

interface AnimatedElementProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  className?: string
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransformClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out'
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseClasses} translate-y-8 opacity-0`
        case 'down':
          return `${baseClasses} -translate-y-8 opacity-0`
        case 'left':
          return `${baseClasses} translate-x-8 opacity-0`
        case 'right':
          return `${baseClasses} -translate-x-8 opacity-0`
        case 'fade':
          return `${baseClasses} opacity-0`
        default:
          return `${baseClasses} translate-y-8 opacity-0`
      }
    }
    
    return `${baseClasses} translate-y-0 translate-x-0 opacity-100`
  }

  return (
    <div ref={elementRef} className={`${getTransformClasses()} ${className}`}>
      {children}
    </div>
  )
}

interface ProcessFlowAnimationProps {
  steps: Array<{
    id: string
    title: string
    icon: React.ComponentType<any>
    color: string
  }>
  activeStep: number
  onStepClick: (index: number) => void
}

export const ProcessFlowAnimation: React.FC<ProcessFlowAnimationProps> = ({
  steps,
  activeStep,
  onStepClick
}) => {
  return (
    <div className="relative">
      {/* Connection Lines */}
      <svg className="absolute top-8 left-0 w-full h-4 -z-10">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <line
          x1="10%"
          y1="50%"
          x2="90%"
          y2="50%"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          className="animate-pulse"
        />
      </svg>

      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = index === activeStep
          const isPast = index < activeStep
          const IconComponent = step.icon

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(index)}
              className={`relative group transition-all duration-300 ${
                isActive ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Step Circle */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-mw-blue-600 text-white shadow-lg ring-4 ring-mw-blue-200'
                    : isPast
                    ? 'bg-green-500 text-white'
                    : 'bg-mw-gray-200 text-mw-gray-600 group-hover:bg-mw-gray-300'
                }`}
              >
                <IconComponent className="w-8 h-8" />
              </div>

              {/* Step Label */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                <div
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-mw-blue-600'
                      : 'text-mw-gray-600 dark:text-mw-gray-300'
                  }`}
                >
                  {step.title}
                </div>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-mw-blue-600 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface CounterAnimationProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  end,
  duration = 2000,
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = React.useState(0)
  const [hasStarted, setHasStarted] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          
          const increment = end / (duration / 50)
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 50)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasStarted])

  return (
    <div ref={elementRef} className={className}>
      {count}{suffix}
    </div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  amplitude?: number
  duration?: number
  className?: string
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  amplitude = 10,
  duration = 3000,
  className = ''
}) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        transform: `translateY(${amplitude}px)`
      }}
    >
      {children}
    </div>
  )
}

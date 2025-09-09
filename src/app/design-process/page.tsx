'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedElement, ProcessFlowAnimation, CounterAnimation } from '@/components/AnimationComponents'
import { 
  ArrowRight, 
  Users, 
  Search, 
  Lightbulb, 
  TestTube, 
  Rocket,
  Eye,
  Heart,
  Target,
  Layers,
  Grid3x3,
  Palette,
  Type,
  Layout as Spacing,
  Component,
  Workflow,
  RotateCcw,
  CheckCircle,
  Play,
  ChevronDown,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react'

const DesignProcessPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const processSteps = [
    {
      id: 'research',
      title: 'Research & Discovery',
      subtitle: 'Understanding Users',
      icon: Search,
      color: 'blue',
      description: 'Deep dive into user needs, behaviors, and pain points through interviews, surveys, and analytics.',
      activities: ['User Interviews', 'Market Research', 'Competitive Analysis', 'User Personas'],
      duration: '2-4 weeks'
    },
    {
      id: 'define',
      title: 'Define & Ideate',
      subtitle: 'Problem Definition',
      icon: Lightbulb,
      color: 'yellow',
      description: 'Synthesize research findings to define core problems and generate innovative solutions.',
      activities: ['Problem Statements', 'How Might We', 'Brainstorming', 'Concept Development'],
      duration: '1-2 weeks'
    },
    {
      id: 'design',
      title: 'Design & Prototype',
      subtitle: 'Solution Creation',
      icon: Palette,
      color: 'purple',
      description: 'Create wireframes, designs, and interactive prototypes to visualize solutions.',
      activities: ['Wireframing', 'Visual Design', 'Prototyping', 'Design Systems'],
      duration: '3-6 weeks'
    },
    {
      id: 'test',
      title: 'Test & Validate',
      subtitle: 'User Validation',
      icon: TestTube,
      color: 'green',
      description: 'Test prototypes with real users to validate assumptions and gather feedback.',
      activities: ['Usability Testing', 'A/B Testing', 'User Feedback', 'Iteration'],
      duration: '1-3 weeks'
    },
    {
      id: 'implement',
      title: 'Implement & Launch',
      subtitle: 'Bringing to Life',
      icon: Rocket,
      color: 'red',
      description: 'Work with developers to implement the design and launch to users.',
      activities: ['Development Handoff', 'Quality Assurance', 'Launch Strategy', 'Monitoring'],
      duration: '4-8 weeks'
    },
    {
      id: 'iterate',
      title: 'Learn & Iterate',
      subtitle: 'Continuous Improvement',
      icon: RotateCcw,
      color: 'indigo',
      description: 'Analyze user behavior post-launch and continuously improve the experience.',
      activities: ['Analytics Review', 'User Feedback', 'Performance Metrics', 'Optimization'],
      duration: 'Ongoing'
    }
  ]

  const designAnatomy = [
    {
      category: 'Visual Hierarchy',
      icon: Layers,
      elements: [
        { name: 'Typography', icon: Type, description: 'Clear, consistent text hierarchy' },
        { name: 'Color System', icon: Palette, description: 'Purposeful color applications' },
        { name: 'Spacing', icon: Spacing, description: '4pt grid system for consistency' },
        { name: 'Layout Grid', icon: Grid3x3, description: 'Structured content organization' }
      ]
    },
    {
      category: 'User Experience',
      icon: Heart,
      elements: [
        { name: 'Accessibility', icon: Eye, description: 'Inclusive design for all users' },
        { name: 'Interaction', icon: Component, description: 'Intuitive user interactions' },
        { name: 'Navigation', icon: Workflow, description: 'Clear information architecture' },
        { name: 'Feedback', icon: CheckCircle, description: 'System status communication' }
      ]
    }
  ]

  const ucdPrinciples = [
    {
      title: 'User-Centered',
      icon: Users,
      description: 'Every decision is made with the user in mind, based on real user needs and behaviors.',
      benefits: ['Higher satisfaction', 'Better adoption', 'Reduced support costs']
    },
    {
      title: 'Iterative Process',
      icon: RotateCcw,
      description: 'Continuous cycle of design, test, learn, and improve based on user feedback.',
      benefits: ['Risk reduction', 'Better outcomes', 'Faster learning']
    },
    {
      title: 'Evidence-Based',
      icon: Target,
      description: 'Decisions backed by user research, data, and testing rather than assumptions.',
      benefits: ['Objective decisions', 'Measurable results', 'Stakeholder confidence']
    }
  ]

  const cycleSteps = () => {
    setIsAnimating(true)
    const nextStep = (activeStep + 1) % processSteps.length
    setActiveStep(nextStep)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      purple: 'bg-purple-500 text-white',
      green: 'bg-green-500 text-white',
      red: 'bg-red-500 text-white',
      indigo: 'bg-indigo-500 text-white'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-500 text-white'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mw-blue-50 via-white to-mw-blue-50 dark:from-mw-gray-950 dark:via-mw-gray-900 dark:to-mw-gray-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedElement direction="fade" delay={200}>
              <Badge className="mb-6 bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/20 dark:text-mw-blue-300">
                Design Process & Methodology
              </Badge>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={400}>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text text-transparent mb-6">
                Design That Works
              </h1>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={600}>
              <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto mb-8">
                Discover how we create meaningful digital experiences through user-centered design, 
                systematic design anatomy, and proven design processes.
              </p>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={800}>
              <div className="flex justify-center">
                <Button size="lg" className="group">
                  Explore Process
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </AnimatedElement>
          </div>

          {/* Floating Stats */}
          <AnimatedElement direction="fade" delay={1000}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">
                  <CounterAnimation end={98} suffix="%" />
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">User Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">
                  <CounterAnimation end={40} suffix="%" />
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Faster Development</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">
                  <CounterAnimation end={60} suffix="%" />
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">
                  <CounterAnimation end={250} suffix="+" />
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Projects Delivered</p>
              </div>
            </div>
          </AnimatedElement>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-mw-gray-400" />
        </div>
      </section>

      {/* User-Centered Design Principles */}
      <section className="py-20 bg-white dark:bg-mw-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement direction="up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
                User-Centered Design Principles
              </h2>
              <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto">
                Our approach puts users at the heart of every design decision, ensuring solutions that truly meet their needs.
              </p>
            </div>
          </AnimatedElement>
          
          <div className="grid md:grid-cols-3 gap-8">
            {ucdPrinciples.map((principle, index) => (
              <AnimatedElement 
                key={principle.title}
                direction="up"
                delay={300 + index * 200}
              >
                <Card className="group hover:shadow-xl transition-all duration-500 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-mw-blue-100 dark:bg-mw-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <principle.icon className="w-8 h-8 text-mw-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
                      {principle.title}
                    </h3>
                    <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-6">
                      {principle.description}
                    </p>
                    <div className="space-y-2">
                      {principle.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center text-sm text-mw-gray-500 dark:text-mw-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Design Process */}
      <section className="py-20 bg-gradient-to-br from-mw-gray-50 to-white dark:from-mw-gray-800 dark:to-mw-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement direction="up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
                Our Design Process
              </h2>
              <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto mb-8">
                A systematic approach that ensures every project delivers meaningful results through proven methodologies.
              </p>
              <Button onClick={cycleSteps} className="mb-12">
                <Play className="mr-2 w-4 h-4" />
                Play Animation
              </Button>
            </div>
          </AnimatedElement>

          {/* Interactive Process Flow */}
          <AnimatedElement direction="fade" delay={300}>
            <div className="mb-16">
              <ProcessFlowAnimation
                steps={processSteps.map(step => ({
                  id: step.id,
                  title: step.title,
                  icon: step.icon,
                  color: step.color
                }))}
                activeStep={activeStep}
                onStepClick={setActiveStep}
              />
            </div>
          </AnimatedElement>

          {/* Active Step Details */}
          <AnimatedElement direction="up" delay={500}>
            <Card className="bg-gradient-to-r from-mw-blue-50 to-mw-blue-100 dark:from-mw-blue-900/20 dark:to-mw-blue-800/20 border-none shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getColorClasses(processSteps[activeStep].color)}`}>
                        {React.createElement(processSteps[activeStep].icon, { className: "w-6 h-6" })}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                          {processSteps[activeStep].title}
                        </h3>
                        <p className="text-mw-gray-600 dark:text-mw-gray-300">
                          Step {activeStep + 1} of {processSteps.length}
                        </p>
                      </div>
                    </div>
                    <p className="text-mw-gray-700 dark:text-mw-gray-300 mb-6">
                      {processSteps[activeStep].description}
                    </p>
                    
                    {/* Progress Indicators */}
                    <div className="flex items-center gap-2 mb-6">
                      <Clock className="w-4 h-4 text-mw-gray-500" />
                      <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                        Duration: {processSteps[activeStep].duration}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {processSteps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveStep(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === activeStep 
                              ? 'bg-mw-blue-600 scale-125' 
                              : 'bg-mw-gray-300 dark:bg-mw-gray-600 hover:bg-mw-blue-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-mw-gray-900 dark:text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Key Activities
                    </h4>
                    <div className="grid gap-3">
                      {processSteps[activeStep].activities.map((activity, index) => (
                        <AnimatedElement 
                          key={activity}
                          direction="left"
                          delay={index * 100}
                          className="flex items-center text-sm text-mw-gray-600 dark:text-mw-gray-300 p-3 bg-white dark:bg-mw-gray-800 rounded-lg shadow-sm"
                        >
                          <Zap className="w-4 h-4 text-mw-blue-500 mr-3" />
                          {activity}
                        </AnimatedElement>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </section>

      {/* Design Anatomy */}
      <section className="py-20 bg-white dark:bg-mw-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement direction="up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
                Design Anatomy
              </h2>
              <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto">
                Understanding the building blocks that create cohesive, functional, and beautiful digital experiences.
              </p>
            </div>
          </AnimatedElement>

          <div className="grid lg:grid-cols-2 gap-12">
            {designAnatomy.map((category, categoryIndex) => (
              <div key={category.category}>
                <AnimatedElement direction="right" delay={categoryIndex * 200}>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-mw-blue-100 dark:bg-mw-blue-900/20 rounded-lg flex items-center justify-center mr-4">
                      <category.icon className="w-6 h-6 text-mw-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-mw-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                </AnimatedElement>
                
                <div className="grid gap-6">
                  {category.elements.map((element, index) => (
                    <AnimatedElement 
                      key={element.name}
                      direction="left"
                      delay={categoryIndex * 200 + index * 150}
                    >
                      <Card className="group hover:shadow-lg transition-all duration-500 hover:border-mw-blue-200">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-mw-gray-100 dark:bg-mw-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-mw-blue-100 dark:group-hover:bg-mw-blue-900/20 transition-colors">
                              <element.icon className="w-5 h-5 text-mw-gray-600 dark:text-mw-gray-300 group-hover:text-mw-blue-600 transition-colors" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-mw-gray-900 dark:text-white">
                                {element.name}
                              </h4>
                              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                                {element.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedElement>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default DesignProcessPage

'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Keyboard, 
  MousePointer, 
  Volume2,
  Monitor,
  Smartphone,
  Users,
  BookOpen,
  TestTube,
  Target,
  Zap,
  Shield
} from 'lucide-react'

const wcagGuidelines = [
  {
    principle: 'Perceivable',
    description: 'Information must be presentable in ways users can perceive',
    icon: Eye,
    color: 'blue',
    guidelines: [
      {
        id: '1.1',
        title: 'Text Alternatives',
        description: 'All images have descriptive alt text',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '1.2',
        title: 'Time-based Media',
        description: 'Captions and transcripts for audio/video',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '1.3',
        title: 'Adaptable',
        description: 'Content can be presented without losing meaning',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '1.4',
        title: 'Distinguishable',
        description: 'Make it easier to see and hear content',
        level: 'AA',
        status: 'compliant'
      }
    ]
  },
  {
    principle: 'Operable',
    description: 'Interface components must be operable by all users',
    icon: Keyboard,
    color: 'green',
    guidelines: [
      {
        id: '2.1',
        title: 'Keyboard Accessible',
        description: 'All functionality available via keyboard',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '2.2',
        title: 'Enough Time',
        description: 'Users have enough time to read content',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '2.3',
        title: 'Seizures',
        description: 'No content that causes seizures',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '2.4',
        title: 'Navigable',
        description: 'Help users navigate and find content',
        level: 'AA',
        status: 'compliant'
      }
    ]
  },
  {
    principle: 'Understandable',
    description: 'Information and UI operation must be understandable',
    icon: BookOpen,
    color: 'purple',
    guidelines: [
      {
        id: '3.1',
        title: 'Readable',
        description: 'Make text readable and understandable',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '3.2',
        title: 'Predictable',
        description: 'Web pages appear and operate predictably',
        level: 'A',
        status: 'compliant'
      },
      {
        id: '3.3',
        title: 'Input Assistance',
        description: 'Help users avoid and correct mistakes',
        level: 'AA',
        status: 'compliant'
      }
    ]
  },
  {
    principle: 'Robust',
    description: 'Content must be robust enough for various assistive technologies',
    icon: Shield,
    color: 'orange',
    guidelines: [
      {
        id: '4.1',
        title: 'Compatible',
        description: 'Maximize compatibility with assistive technologies',
        level: 'A',
        status: 'compliant'
      }
    ]
  }
]

const testingTools = [
  {
    name: 'axe DevTools',
    description: 'Browser extension for automated accessibility testing',
    type: 'Browser Extension',
    cost: 'Free',
    features: ['Automated scanning', 'Issue highlighting', 'Detailed reports']
  },
  {
    name: 'WAVE',
    description: 'Web accessibility evaluation tool',
    type: 'Browser Extension',
    cost: 'Free',
    features: ['Visual feedback', 'Error identification', 'Structure analysis']
  },
  {
    name: 'Lighthouse',
    description: 'Built-in Chrome accessibility auditing',
    type: 'Built-in Tool',
    cost: 'Free',
    features: ['Performance metrics', 'Best practices', 'SEO analysis']
  },
  {
    name: 'Screen Reader Testing',
    description: 'Manual testing with assistive technology',
    type: 'Manual Testing',
    cost: 'Free',
    features: ['Real user experience', 'Navigation testing', 'Content verification']
  }
]

const colorContrastTests = [
  {
    background: 'bg-white',
    text: 'text-mw-gray-900',
    ratio: '16.2:1',
    level: 'AAA',
    status: 'pass'
  },
  {
    background: 'bg-mw-blue-600',
    text: 'text-white',
    ratio: '4.8:1',
    level: 'AA',
    status: 'pass'
  },
  {
    background: 'bg-mw-gray-100',
    text: 'text-mw-gray-700',
    ratio: '7.1:1',
    level: 'AAA',
    status: 'pass'
  },
  {
    background: 'bg-mw-gray-900',
    text: 'text-white',
    ratio: '16.2:1',
    level: 'AAA',
    status: 'pass'
  }
]

const assistiveTechnologies = [
  {
    name: 'Screen Readers',
    description: 'NVDA, JAWS, VoiceOver support',
    icon: Volume2,
    features: ['Semantic HTML', 'ARIA labels', 'Focus management', 'Landmark navigation']
  },
  {
    name: 'Keyboard Navigation',
    description: 'Full keyboard accessibility',
    icon: Keyboard,
    features: ['Tab order', 'Skip links', 'Keyboard shortcuts', 'Focus indicators']
  },
  {
    name: 'Voice Control',
    description: 'Dragon NaturallySpeaking compatibility',
    icon: MousePointer,
    features: ['Voice commands', 'Click targets', 'Interactive elements', 'Form controls']
  },
  {
    name: 'High Contrast',
    description: 'Windows High Contrast mode',
    icon: Monitor,
    features: ['Contrast ratios', 'Color independence', 'Border visibility', 'Icon clarity']
  }
]

function GuidelineCard({ guideline }: { guideline: typeof wcagGuidelines[0] }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${colorClasses[guideline.color as keyof typeof colorClasses].replace('text-', 'bg-').replace('dark:text-', 'dark:bg-').split(' ')[0]}`}>
            <guideline.icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              {guideline.principle}
            </h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
              {guideline.description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {guideline.guidelines.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-mw-gray-900 dark:text-white">
                      {item.id} {item.title}
                    </span>
                    <Badge className={item.level === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'}>
                      WCAG {item.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <PageHero
        title="Accessibility"
        description="Our design system is built with accessibility at its core, ensuring inclusive experiences for all users. WCAG 2.1 AA compliant with comprehensive testing and documentation."
        badge={{
          text: "WCAG 2.1 AA Compliant",
          variant: "success"
        }}
        stats={[
          { label: "WCAG Compliance", value: "AA" },
          { label: "Contrast Ratio", value: "7:1+" },
          { label: "Screen Readers", value: "100%" },
          { label: "Keyboard Nav", value: "100%" }
        ]}
      />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Overview */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-600 rounded-full">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      Accessibility First Design
                    </h2>
                    <p className="text-mw-gray-600 dark:text-mw-gray-300">
                      Every component follows accessibility best practices
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Inclusive by Default</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                      Components work for everyone, regardless of ability
                    </p>
                  </div>
                  <div className="text-center">
                    <TestTube className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Thoroughly Tested</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                      Automated and manual testing with assistive technologies
                    </p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Performance Focused</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                      Fast loading and responsive for all devices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* WCAG Guidelines */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              WCAG 2.1 Guidelines Compliance
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {wcagGuidelines.map((guideline) => (
                <GuidelineCard key={guideline.principle} guideline={guideline} />
              ))}
            </div>
          </section>

          {/* Color Contrast */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Color Contrast Testing
            </h2>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Contrast Ratio Results
                </h3>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  All color combinations meet or exceed WCAG AA standards
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colorContrastTests.map((test, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${test.background} ${test.text}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Sample Text</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {test.level}
                        </Badge>
                      </div>
                      <div className="text-sm opacity-75">
                        Contrast Ratio: {test.ratio}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Assistive Technology Support */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Assistive Technology Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assistiveTechnologies.map((tech, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <tech.icon className="w-6 h-6 text-mw-blue-600" />
                      <div>
                        <h3 className="font-semibold text-mw-gray-900 dark:text-white">
                          {tech.name}
                        </h3>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tech.features.map((feature, i) => (
                        <Badge key={i} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}

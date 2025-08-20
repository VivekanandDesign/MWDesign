import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Download, Code, Palette, BookOpen, Figma, Github } from 'lucide-react'
import Link from 'next/link'

const quickStartSteps = [
  {
    step: 1,
    title: 'Install the Package',
    description: 'Add the Moving Walls Design System to your project',
    code: 'npm install @movingwalls/design-system',
    icon: Code,
  },
  {
    step: 2,
    title: 'Import Components',
    description: 'Import and use components in your application',
    code: `import { Button, Input, Card } from '@movingwalls/design-system'
import '@movingwalls/design-system/styles.css'`,
    icon: Code,
  },
  {
    step: 3,
    title: 'Apply Design Tokens',
    description: 'Use our design tokens for consistent styling',
    code: `// CSS Variables
var(--mw-color-primary)
var(--mw-spacing-4)
var(--mw-font-family-primary)`,
    icon: Palette,
  },
]

const resources = [
  {
    title: 'Figma Library',
    description: 'Complete design library with all components and tokens',
    icon: Figma,
    href: 'https://figma.com/@movingwalls/design-system',
    badge: 'Design',
  },
  {
    title: 'GitHub Repository',
    description: 'Source code, issues, and contribution guidelines',
    icon: Github,
    href: 'https://github.com/movingwalls/design-system',
    badge: 'Development',
  },
  {
    title: 'Component Documentation',
    description: 'Detailed component API and usage examples',
    icon: BookOpen,
    href: '/components',
    badge: 'Documentation',
  },
  {
    title: 'Design Tokens',
    description: 'Complete token reference and implementation guide',
    icon: Palette,
    href: '/tokens',
    badge: 'Design',
  },
]

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <PageHero
        title="Getting Started"
        description="Start building with the Moving Walls Design System. Follow these steps to integrate our components and design tokens into your project."
        badge={{
          text: "Quick Setup",
          variant: "success"
        }}
        stats={[
          { label: "Setup Time", value: "5 min" },
          { label: "Install Steps", value: "3" },
          { label: "Framework", value: "React" },
          { label: "TypeScript", value: "Ready" }
        ]}
      />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Quick Start Guide */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-8">
              Quick Start Guide
            </h2>
            
            <div className="space-y-6">
              {quickStartSteps.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.step}>
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-mw-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon className="w-5 h-5 text-mw-blue-600 dark:text-mw-blue-400" />
                            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-4">
                            {step.description}
                          </p>
                          <div className="bg-mw-gray-900 rounded-lg p-4">
                            <pre className="text-sm text-mw-gray-100 overflow-x-auto">
                              <code>{step.code}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Framework Integration */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-8">
              Framework Integration
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                    React / Next.js
                  </h3>
                  <p className="text-mw-gray-600 dark:text-mw-gray-300">
                    Native React components with TypeScript support
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-mw-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-mw-gray-100">
                      <code>{`import { Button } from '@movingwalls/design-system'

function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  )
}`}</code>
                    </pre>
                  </div>
                  <Link href="/components">
                    <Button variant="outline" size="sm">
                      View React Components
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                    CSS / HTML
                  </h3>
                  <p className="text-mw-gray-600 dark:text-mw-gray-300">
                    Pure CSS classes for any framework or vanilla HTML
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-mw-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-mw-gray-100">
                      <code>{`<link rel="stylesheet" href="@movingwalls/design-system/dist/styles.css">

<button class="mw-button mw-button--primary">
  Click me
</button>`}</code>
                    </pre>
                  </div>
                  <Link href="/tokens">
                    <Button variant="outline" size="sm">
                      View CSS Classes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Guidelines */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-8">
              Design Guidelines
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                    Color Usage
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-mw-gray-600 dark:text-mw-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-mw-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use primary blue for main actions and brand elements</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-mw-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use gray tones for secondary content and backgrounds</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use utility colors sparingly for state communication</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                    Typography Best Practices
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-mw-gray-600 dark:text-mw-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-mw-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Maintain consistent type scale across all interfaces</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-mw-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use Poppins for optimal readability on all platforms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ensure adequate contrast ratios for accessibility</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

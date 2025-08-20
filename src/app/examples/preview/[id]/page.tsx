'use client'

'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Code, ExternalLink, Copy } from 'lucide-react'
import Link from 'next/link'
import { exampleData } from '../../data/examples'
import { notFound } from 'next/navigation'
import { AnalyticsDashboardPreview } from '../../components/previews/AnalyticsDashboardPreview'
import { AdvancedTablePreview } from '../../components/previews/AdvancedTablePreview'
import { EventCalendarPreview } from '../../components/previews/EventCalendarPreview'
import { MeetingSchedulerPreview } from '../../components/previews/MeetingSchedulerPreview'
import { ChartsGraphsPreview } from '../../components/previews/ChartsGraphsPreview'
import FormsAuthenticationPreview from '../../components/previews/FormsAuthenticationPreview'
import SaasAnalyticsPreview from '../../components/previews/SaasAnalyticsPreview'
import AdminPanelPreview from '../../components/previews/AdminPanelPreview'
import BillingDashboardPreview from '../../components/previews/BillingDashboardPreview'
import CustomerSuccessPreview from '../../components/previews/CustomerSuccessPreview'
import UserOnboardingPreview from '../../components/previews/UserOnboardingPreview'

interface ExamplePreviewPageProps {
  params: {
    id: string
  }
}

export default function ExamplePreviewPage({ params }: ExamplePreviewPageProps) {
  const [id, setId] = useState<string>('')
  
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    getParams()
  }, [params])

  if (!id) {
    return <div>Loading...</div>
  }

  const example = exampleData.find(ex => ex.id === id)
  
  if (!example) {
    notFound()
  }

  const complexityColors = {
    beginner: 'success',
    intermediate: 'secondary',
    advanced: 'primary'
  } as const

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank')
  }

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
                  {example.title}
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{example.subcategory}</Badge>
                  <Badge variant={complexityColors[example.complexity]}>
                    {example.complexity}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline">
                <Code className="w-4 h-4 mr-2" />
                View Code
              </Button>
              <Button onClick={handleOpenNewTab}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-4">
              {example.description}
            </p>
            <p className="text-mw-gray-600 dark:text-mw-gray-400">
              <span className="font-medium">Use Case:</span> {example.useCase}
            </p>
          </div>

          {/* Preview Area */}
          <div className="bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg overflow-hidden mb-8">
            <div className="bg-mw-gray-50 dark:bg-mw-gray-800 px-4 py-2 border-b border-mw-gray-200 dark:border-mw-gray-700 flex items-center justify-between">
              <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                Live Preview
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Actual Preview Content */}
            <div className="min-h-[600px]">
              {example.id === 'analytics-dashboard' ? (
                <AnalyticsDashboardPreview />
              ) : example.id === 'mw-advanced-table' ? (
                <AdvancedTablePreview />
              ) : example.id === 'mw-event-calendar' ? (
                <EventCalendarPreview />
              ) : example.id === 'mw-meeting-scheduler' ? (
                <MeetingSchedulerPreview />
              ) : example.id === 'mw-charts-graphs' ? (
                <ChartsGraphsPreview />
              ) : example.id === 'mw-forms-authentication' ? (
                <FormsAuthenticationPreview />
              ) : example.id === 'saas-analytics-dashboard' ? (
                <SaasAnalyticsPreview />
              ) : example.id === 'multi-tenant-admin-panel' ? (
                <AdminPanelPreview />
              ) : example.id === 'billing-dashboard' ? (
                <BillingDashboardPreview />
              ) : example.id === 'customer-success-dashboard' ? (
                <CustomerSuccessPreview />
              ) : example.id === 'user-onboarding-flow' ? (
                <UserOnboardingPreview />
              ) : (
                <div className="p-8 bg-gradient-to-br from-mw-gray-50 to-mw-gray-100 dark:from-mw-gray-900 dark:to-mw-gray-800 min-h-[500px] flex items-center justify-center">
                  <div className="text-center text-mw-gray-500 dark:text-mw-gray-400">
                    <div className="text-2xl mb-4">Preview Coming Soon</div>
                    <p>Interactive {example.category} preview will be available here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Components Used */}
            <div className="bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                Components Used
              </h3>
              <div className="space-y-2">
                {example.components.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-mw-gray-50 dark:bg-mw-gray-800 rounded"
                  >
                    <span className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                      {component}
                    </span>
                    <Link href="/components" className="text-mw-primary-600 hover:text-mw-primary-700 text-xs">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {example.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-mw-gray-600 dark:text-mw-gray-300">
                    <span className="w-2 h-2 bg-mw-primary-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {example.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-mw-blue-50 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

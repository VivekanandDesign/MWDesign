'use client'

import { ExampleData } from '../data/examples'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { ExternalLink, Code, Eye, BarChart3, Calendar, Users, Settings, CreditCard, 
         UserCheck, BookOpen, Bell, FileText, Table, PieChart, FormInput } from 'lucide-react'
import Link from 'next/link'
// import { useState } from 'react'
// import { CodeViewModal } from './CodeViewModal'

// Function to generate thumbnail content for each example
function getThumbnailContent(exampleId: string) {
  const thumbnails: Record<string, JSX.Element> = {
    'mw-advanced-table': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Table className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Advanced Table</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="grid grid-cols-4 gap-1 text-xs">
            <div className="bg-mw-gray-200 dark:bg-mw-gray-700 h-4 rounded"></div>
            <div className="bg-mw-gray-200 dark:bg-mw-gray-700 h-4 rounded"></div>
            <div className="bg-mw-gray-200 dark:bg-mw-gray-700 h-4 rounded"></div>
            <div className="bg-mw-gray-200 dark:bg-mw-gray-700 h-4 rounded"></div>
          </div>
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-1">
              <div className="bg-mw-blue-100 dark:bg-mw-blue-900 h-3 rounded"></div>
              <div className="bg-mw-green-100 dark:bg-mw-green-900 h-3 rounded"></div>
              <div className="bg-mw-purple-100 dark:bg-mw-purple-900 h-3 rounded"></div>
              <div className="bg-mw-orange-100 dark:bg-mw-orange-900 h-3 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    'mw-event-calendar': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Event Calendar</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs flex-1">
          {Array.from({length: 35}).map((_, i) => (
            <div key={i} className={`aspect-square rounded ${
              i % 7 === 0 || i % 7 === 6 ? 'bg-mw-gray-100 dark:bg-mw-gray-800' : 
              [5, 12, 18, 24].includes(i) ? 'bg-mw-blue-200 dark:bg-mw-blue-800' :
              'bg-mw-gray-50 dark:bg-mw-gray-900'
            }`}></div>
          ))}
        </div>
      </div>
    ),
    'mw-meeting-scheduler': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Meeting Scheduler</span>
        </div>
        <div className="space-y-2 flex-1">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="w-16 bg-mw-gray-200 dark:bg-mw-gray-700 h-6 rounded text-xs flex items-center justify-center">
                {9 + i}:00
              </div>
              <div className={`flex-1 h-6 rounded ${
                i === 1 ? 'bg-mw-green-200 dark:bg-mw-green-800' :
                i === 3 ? 'bg-mw-blue-200 dark:bg-mw-blue-800' :
                'bg-mw-gray-100 dark:bg-mw-gray-800'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    ),
    'mw-charts-graphs': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Charts & Graphs</span>
        </div>
        <div className="flex gap-2 flex-1 items-end">
          {[40, 70, 30, 90, 60, 80, 45].map((height, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-mw-blue-400 to-mw-blue-600 rounded-t" 
                 style={{height: `${height}%`}}></div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <PieChart className="w-8 h-8 text-mw-purple-500" />
        </div>
      </div>
    ),
    'mw-forms-authentication': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <FormInput className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Forms & Auth</span>
        </div>
        <div className="space-y-3 flex-1">
          <div className="space-y-2">
            <div className="bg-mw-gray-200 dark:bg-mw-gray-700 h-3 rounded w-3/4"></div>
            <div className="bg-mw-blue-100 dark:bg-mw-blue-900 h-8 rounded border-2 border-mw-blue-300"></div>
          </div>
          <div className="space-y-2">
            <div className="bg-mw-gray-200 dark:bg-mw-gray-700 h-3 rounded w-2/3"></div>
            <div className="bg-mw-green-100 dark:bg-mw-green-900 h-8 rounded border-2 border-mw-green-300"></div>
          </div>
          <div className="bg-mw-primary-500 h-8 rounded text-white flex items-center justify-center text-sm">
            Submit
          </div>
        </div>
      </div>
    ),
    'mw-saas-analytics': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">SaaS Analytics</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {['$12.5K', '2.3K', '94%', '156'].map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 dark:from-mw-blue-900 dark:to-mw-blue-800 p-2 rounded text-center">
              <div className="text-xs font-bold text-mw-blue-700 dark:text-mw-blue-300">{stat}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-gradient-to-t from-mw-purple-100 to-mw-purple-50 dark:from-mw-purple-900 dark:to-mw-purple-800 rounded relative">
          <div className="absolute inset-2 border-l-2 border-b-2 border-mw-purple-300">
            <div className="w-full h-full relative">
              <div className="absolute bottom-0 left-1/4 w-1 bg-mw-purple-500 h-3/4"></div>
              <div className="absolute bottom-0 left-2/4 w-1 bg-mw-purple-500 h-1/2"></div>
              <div className="absolute bottom-0 left-3/4 w-1 bg-mw-purple-500 h-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    'mw-admin-panel': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Admin Panel</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 bg-mw-red-50 dark:bg-mw-red-900 p-2 rounded">
            <div className="w-6 h-6 bg-mw-red-200 dark:bg-mw-red-700 rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="bg-mw-red-200 dark:bg-mw-red-700 h-2 rounded w-2/3"></div>
              <div className="bg-mw-red-100 dark:bg-mw-red-800 h-2 rounded w-1/2"></div>
            </div>
            <div className="bg-mw-red-500 text-white px-2 py-1 rounded text-xs">Admin</div>
          </div>
          <div className="flex items-center gap-2 bg-mw-blue-50 dark:bg-mw-blue-900 p-2 rounded">
            <div className="w-6 h-6 bg-mw-blue-200 dark:bg-mw-blue-700 rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="bg-mw-blue-200 dark:bg-mw-blue-700 h-2 rounded w-3/4"></div>
              <div className="bg-mw-blue-100 dark:bg-mw-blue-800 h-2 rounded w-1/3"></div>
            </div>
            <div className="bg-mw-blue-500 text-white px-2 py-1 rounded text-xs">User</div>
          </div>
        </div>
      </div>
    ),
    'mw-billing-dashboard': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Billing Dashboard</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="bg-gradient-to-r from-mw-green-100 to-mw-green-200 dark:from-mw-green-900 dark:to-mw-green-800 p-2 rounded">
            <div className="text-xs font-bold text-mw-green-700 dark:text-mw-green-300">$2,845.00</div>
            <div className="text-xs text-mw-green-600 dark:text-mw-green-400">Monthly Revenue</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {['Pro', 'Enterprise', 'Starter'].map((plan, i) => (
              <div key={i} className="bg-mw-gray-100 dark:bg-mw-gray-800 p-1 rounded text-center">
                <div className="text-xs font-medium">{plan}</div>
                <div className="text-xs text-mw-gray-500">{[12, 5, 28][i]}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center bg-mw-blue-50 dark:bg-mw-blue-900 p-1 rounded">
              <span className="text-xs">Invoice #001</span>
              <span className="text-xs bg-mw-blue-500 text-white px-1 rounded">Paid</span>
            </div>
            <div className="flex justify-between items-center bg-mw-orange-50 dark:bg-mw-orange-900 p-1 rounded">
              <span className="text-xs">Invoice #002</span>
              <span className="text-xs bg-mw-orange-500 text-white px-1 rounded">Pending</span>
            </div>
          </div>
        </div>
      </div>
    ),
    'mw-customer-success': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <UserCheck className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Customer Success</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-mw-green-400 to-mw-green-600 rounded-full flex items-center justify-center text-white font-bold">
              92
            </div>
            <div>
              <div className="text-xs font-medium">Health Score</div>
              <div className="text-xs text-mw-green-600">Excellent</div>
            </div>
          </div>
          <div className="space-y-1">
            {[
              { label: 'Onboarding', value: 100, color: 'green' },
              { label: 'Feature Adoption', value: 75, color: 'blue' },
              { label: 'Engagement', value: 88, color: 'purple' }
            ].map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{metric.label}</span>
                  <span>{metric.value}%</span>
                </div>
                <div className="bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full bg-mw-${metric.color}-500`}
                    style={{width: `${metric.value}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    'mw-user-onboarding': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">User Onboarding</span>
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < 2 ? 'bg-mw-green-500 text-white' : 
                  i === 2 ? 'bg-mw-blue-500 text-white' : 
                  'bg-mw-gray-300 dark:bg-mw-gray-600 text-mw-gray-600 dark:text-mw-gray-400'
                }`}>
                  {step}
                </div>
                {i < 3 && <div className={`w-4 h-0.5 ${i < 2 ? 'bg-mw-green-500' : 'bg-mw-gray-300'}`}></div>}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-mw-green-500 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded"></div>
              </div>
              <span className="text-xs">Account Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-mw-green-500 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded"></div>
              </div>
              <span className="text-xs">Team Invitation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-mw-blue-500 rounded"></div>
              <span className="text-xs">Integration Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-mw-gray-300 rounded"></div>
              <span className="text-xs text-mw-gray-500">Feature Tour</span>
            </div>
          </div>
        </div>
      </div>
    ),
    'mw-saas-settings': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">SaaS Settings</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between bg-mw-gray-50 dark:bg-mw-gray-800 p-2 rounded">
            <span className="text-xs">Notifications</span>
            <div className="w-8 h-4 bg-mw-green-500 rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-mw-gray-50 dark:bg-mw-gray-800 p-2 rounded">
            <span className="text-xs">Auto Backup</span>
            <div className="w-8 h-4 bg-mw-gray-300 rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium">API Settings</div>
            <div className="bg-mw-blue-50 dark:bg-mw-blue-900 p-2 rounded">
              <div className="text-xs font-mono">sk_test_4eC39HqLy...</div>
              <div className="text-xs text-mw-blue-600 dark:text-mw-blue-400">Test API Key</div>
            </div>
          </div>
        </div>
      </div>
    ),
    'mw-team-collaboration': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Team Collaboration</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-mw-blue-500 rounded-full flex items-center justify-center text-white text-xs">A</div>
            <div className="flex-1 bg-mw-blue-100 dark:bg-mw-blue-900 p-1 rounded">
              <div className="text-xs">Hey team! Let's review the new features</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-mw-green-500 rounded-full flex items-center justify-center text-white text-xs">B</div>
            <div className="flex-1 bg-mw-green-100 dark:bg-mw-green-900 p-1 rounded">
              <div className="text-xs">Looks great! When is the deadline?</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-mw-purple-500 rounded-full flex items-center justify-center text-white text-xs">C</div>
            <div className="flex-1 bg-mw-purple-100 dark:bg-mw-purple-900 p-1 rounded">
              <div className="text-xs">📎 Design_specs.pdf</div>
            </div>
          </div>
          <div className="bg-mw-gray-100 dark:bg-mw-gray-800 p-2 rounded">
            <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Project: Mobile App Redesign</div>
            <div className="text-xs">Tasks: 12 | Completed: 8</div>
          </div>
        </div>
      </div>
    ),
    'mw-notification-center': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Notifications</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-start gap-2 bg-mw-blue-50 dark:bg-mw-blue-900 p-2 rounded">
            <div className="w-2 h-2 bg-mw-blue-500 rounded-full mt-1"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">New user registered</div>
              <div className="text-xs text-mw-gray-500">2 min ago</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-mw-green-50 dark:bg-mw-green-900 p-2 rounded">
            <div className="w-2 h-2 bg-mw-green-500 rounded-full mt-1"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">Payment received</div>
              <div className="text-xs text-mw-gray-500">15 min ago</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-mw-orange-50 dark:bg-mw-orange-900 p-2 rounded">
            <div className="w-2 h-2 bg-mw-orange-500 rounded-full mt-1"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">System maintenance</div>
              <div className="text-xs text-mw-gray-500">1 hour ago</div>
            </div>
          </div>
          <div className="bg-mw-gray-100 dark:bg-mw-gray-800 p-2 rounded text-center">
            <div className="text-xs text-mw-gray-500">View all notifications</div>
          </div>
        </div>
      </div>
    ),
    'mw-api-documentation': (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-mw-primary-600" />
          <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">API Documentation</span>
        </div>
        <div className="space-y-2 flex-1">
          <div className="bg-mw-green-50 dark:bg-mw-green-900 p-2 rounded border-l-4 border-mw-green-500">
            <div className="text-xs font-bold text-mw-green-700 dark:text-mw-green-300">GET /api/users</div>
            <div className="text-xs text-mw-green-600 dark:text-mw-green-400">200 OK</div>
          </div>
          <div className="bg-mw-blue-50 dark:bg-mw-blue-900 p-2 rounded border-l-4 border-mw-blue-500">
            <div className="text-xs font-bold text-mw-blue-700 dark:text-mw-blue-300">POST /api/users</div>
            <div className="text-xs text-mw-blue-600 dark:text-mw-blue-400">201 Created</div>
          </div>
          <div className="bg-mw-purple-50 dark:bg-mw-purple-900 p-2 rounded border-l-4 border-mw-purple-500">
            <div className="text-xs font-bold text-mw-purple-700 dark:text-mw-purple-300">PUT /api/users/:id</div>
            <div className="text-xs text-mw-purple-600 dark:text-mw-purple-400">200 Updated</div>
          </div>
          <div className="bg-mw-gray-100 dark:bg-mw-gray-800 p-1 rounded">
            <div className="text-xs font-mono text-mw-gray-600 dark:text-mw-gray-400">curl -X GET \\</div>
            <div className="text-xs font-mono text-mw-gray-600 dark:text-mw-gray-400">  api.example.com/users</div>
          </div>
        </div>
      </div>
    )
  }

  return thumbnails[exampleId] || (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="text-mw-gray-400 dark:text-mw-gray-500 text-lg font-medium">
        MW Application Preview
      </div>
    </div>
  )
}

interface ExampleCardProps {
  example: ExampleData
}

export function ExampleCard({ example }: ExampleCardProps) {
  // const [showCodeModal, setShowCodeModal] = useState(false)
  
  const complexityColors = {
    beginner: 'success',
    intermediate: 'secondary',
    advanced: 'primary'
  } as const

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        {/* Example Preview Image */}
        <div className="relative aspect-video bg-gradient-to-br from-mw-gray-100 to-mw-gray-200 dark:from-mw-gray-800 dark:to-mw-gray-900 rounded-t-lg overflow-hidden">
          {/* Actual thumbnail/preview */}
          <div className="absolute inset-0 bg-white dark:bg-mw-gray-900">
            {getThumbnailContent(example.id)}
          </div>
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-3">
              <Link href={`/examples/preview/${example.id}`}>
                <Button 
                  size="sm" 
                  className="bg-mw-primary-500 hover:bg-mw-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-mw-primary-500 focus:ring-offset-2 border-0"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              </Link>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  // Simple alert for now - will enhance with modal later
                  alert(`Code for ${example.title}\n\nThis will show the component source code in a modal.`)
                }}
                className="bg-mw-gray-800 hover:bg-mw-gray-900 text-white border-mw-gray-700 hover:border-mw-gray-600 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-mw-gray-500 focus:ring-offset-2"
              >
                <Code className="w-4 h-4 mr-1" />
                Code
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Category and Complexity */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {example.subcategory}
          </Badge>
          <Badge variant={complexityColors[example.complexity]} className="text-xs">
            {example.complexity}
          </Badge>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2 group-hover:text-mw-primary-600 transition-colors">
          {example.title}
        </h3>
        <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-4 text-sm leading-relaxed">
          {example.description}
        </p>

        {/* Components Used */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Components Used</h4>
          <div className="flex flex-wrap gap-1">
            {example.components.slice(0, 4).map((component, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-mw-blue-50 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300 text-xs rounded"
              >
                {component}
              </span>
            ))}
            {example.components.length > 4 && (
              <span className="px-2 py-1 bg-mw-gray-100 dark:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400 text-xs rounded">
                +{example.components.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Key Features</h4>
          <ul className="space-y-1">
            {example.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-xs text-mw-gray-600 dark:text-mw-gray-400 flex items-center">
                <span className="w-1 h-1 bg-mw-primary-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/examples/preview/${example.id}`} className="flex-1">
            <Button className="w-full hover:bg-mw-primary-700 focus:ring-2 focus:ring-mw-primary-500 focus:ring-offset-2">
              <Eye className="w-4 h-4 mr-2" />
              View Example
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // For now, we'll copy the example URL - will enhance with proper external links later
              navigator.clipboard.writeText(`${window.location.origin}/examples/preview/${example.id}`)
            }}
            className="hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 focus:ring-2 focus:ring-mw-gray-300 focus:ring-offset-2"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
      
      {/* Code View Modal - temporarily disabled */}
      {/* <CodeViewModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        example={example}
      /> */}
    </Card>
  )
}

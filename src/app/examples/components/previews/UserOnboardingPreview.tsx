'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Stepper } from '@/components/ui/Stepper'
import { Form, FormField, FormLabel, FormControl } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { 
  Play, CheckCircle, Clock, ArrowRight, ArrowLeft,
  User, Building, CreditCard, Zap, Target,
  ChevronRight, Star, Award, BookOpen, Video,
  HelpCircle, MessageCircle, Phone, Download, Plus
} from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  type: 'welcome' | 'setup' | 'integration' | 'training' | 'completion'
  status: 'pending' | 'active' | 'completed' | 'skipped'
  required: boolean
  estimatedTime: number
}

interface NewUser {
  id: string
  name: string
  email: string
  company: string
  role: string
  avatar: string
  joinDate: string
  currentStep: number
  completionRate: number
  timeSpent: number
}

export default function UserOnboardingPreview() {
  const [currentView, setCurrentView] = useState<'overview' | 'flow' | 'users'>('overview')
  const [activeStep, setActiveStep] = useState(0)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  // Mock onboarding steps
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome & Introduction',
      description: 'Get acquainted with the platform basics',
      type: 'welcome',
      status: 'completed',
      required: true,
      estimatedTime: 5
    },
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your personal and company information',
      type: 'setup',
      status: 'completed',
      required: true,
      estimatedTime: 10
    },
    {
      id: 'team',
      title: 'Invite Team Members',
      description: 'Add colleagues to collaborate with',
      type: 'setup',
      status: 'active',
      required: false,
      estimatedTime: 15
    },
    {
      id: 'integration',
      title: 'Connect Your Tools',
      description: 'Integrate with your existing workflow',
      type: 'integration',
      status: 'pending',
      required: false,
      estimatedTime: 20
    },
    {
      id: 'first_project',
      title: 'Create Your First Project',
      description: 'Set up your first project and explore features',
      type: 'training',
      status: 'pending',
      required: true,
      estimatedTime: 25
    },
    {
      id: 'training',
      title: 'Interactive Tutorial',
      description: 'Learn key features through guided tour',
      type: 'training',
      status: 'pending',
      required: false,
      estimatedTime: 30
    },
    {
      id: 'success',
      title: 'You\'re All Set!',
      description: 'Congratulations on completing onboarding',
      type: 'completion',
      status: 'pending',
      required: true,
      estimatedTime: 5
    }
  ]

  // Mock new users
  const newUsers: NewUser[] = [
    {
      id: 'user_001',
      name: 'Alex Thompson',
      email: 'alex@newcorp.com',
      company: 'NewCorp Ltd',
      role: 'Product Manager',
      avatar: 'AT',
      joinDate: '2024-08-30',
      currentStep: 3,
      completionRate: 45,
      timeSpent: 35
    },
    {
      id: 'user_002',
      name: 'Maria Garcia',
      email: 'maria@startup.io',
      company: 'Startup.io',
      role: 'Designer',
      avatar: 'MG',
      joinDate: '2024-08-29',
      currentStep: 5,
      completionRate: 85,
      timeSpent: 78
    },
    {
      id: 'user_003',
      name: 'David Kim',
      email: 'david@techfirm.com',
      company: 'TechFirm',
      role: 'Developer',
      avatar: 'DK',
      joinDate: '2024-08-28',
      currentStep: 2,
      completionRate: 25,
      timeSpent: 18
    }
  ]

  const metrics = {
    totalUsers: 1847,
    completedOnboarding: 1234,
    averageCompletionTime: 65,
    dropOffRate: 15.2,
    satisfactionScore: 4.6
  }

  const getStepIcon = (type: string, status: string) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-600" />
    if (status === 'active') return <Play className="w-5 h-5 text-blue-600" />
    
    switch (type) {
      case 'welcome': return <Star className="w-5 h-5 text-gray-400" />
      case 'setup': return <User className="w-5 h-5 text-gray-400" />
      case 'integration': return <Zap className="w-5 h-5 text-gray-400" />
      case 'training': return <BookOpen className="w-5 h-5 text-gray-400" />
      case 'completion': return <Award className="w-5 h-5 text-gray-400" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'active': return 'primary'
      case 'pending': return 'secondary'
      case 'skipped': return 'warning'
      default: return 'secondary'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-mw-gray-50 dark:bg-mw-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
            User Onboarding
          </h1>
          <p className="text-mw-gray-600 dark:text-mw-gray-400 mt-1">
            Guide new users through their journey and track progress
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant={currentView === 'overview' ? 'primary' : 'outline'}
            onClick={() => setCurrentView('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={currentView === 'flow' ? 'primary' : 'outline'}
            onClick={() => setCurrentView('flow')}
          >
            Onboarding Flow
          </Button>
          <Button 
            variant={currentView === 'users' ? 'primary' : 'outline'}
            onClick={() => setCurrentView('users')}
          >
            New Users
          </Button>
        </div>
      </div>

      {/* Overview View */}
      {currentView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      {metrics.totalUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      {metrics.completedOnboarding}
                    </p>
                    <p className="text-xs text-green-600">
                      {((metrics.completedOnboarding / metrics.totalUsers) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Avg Time</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      {metrics.averageCompletionTime}min
                    </p>
                    <p className="text-xs text-purple-600">-5min this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <Target className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Drop-off Rate</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      {metrics.dropOffRate}%
                    </p>
                    <p className="text-xs text-green-600">-2.3% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Satisfaction</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      {metrics.satisfactionScore}
                    </p>
                    <p className="text-xs text-yellow-600">⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Progress Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Step Completion Rates
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboardingSteps.map((step, index) => {
                    const completionRate = Math.max(0, 100 - (index * 15))
                    return (
                      <div key={step.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-mw-gray-900 dark:text-white">
                            {step.title}
                          </span>
                          <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {completionRate}%
                          </span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: 'Alex Thompson', action: 'Completed profile setup', time: '5 minutes ago' },
                    { user: 'Maria Garcia', action: 'Started integration tutorial', time: '12 minutes ago' },
                    { user: 'David Kim', action: 'Invited team members', time: '1 hour ago' },
                    { user: 'Sarah Wilson', action: 'Completed onboarding', time: '2 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                      <Avatar>{activity.user.split(' ').map(n => n[0]).join('')}</Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-mw-gray-900 dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                          {activity.action}
                        </p>
                      </div>
                      <span className="text-xs text-mw-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Onboarding Flow View */}
      {currentView === 'flow' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Interactive Onboarding Flow
                </h3>
                <Button onClick={() => setShowHelpModal(true)} variant="outline">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-mw-gray-900 dark:text-white">
                    Step {activeStep + 1} of {onboardingSteps.length}
                  </span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                    {Math.round(((activeStep + 1) / onboardingSteps.length) * 100)}% Complete
                  </span>
                </div>
                <Progress value={((activeStep + 1) / onboardingSteps.length) * 100} className="h-3" />
              </div>

              {/* Step Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Steps Sidebar */}
                <div className="space-y-3">
                  {onboardingSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        index === activeStep 
                          ? 'bg-mw-primary-50 dark:bg-mw-primary-900/20 border border-mw-primary-200 dark:border-mw-primary-800'
                          : 'hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800'
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      {getStepIcon(step.type, step.status)}
                      <div className="flex-1">
                        <p className={`font-medium ${
                          index === activeStep ? 'text-mw-primary-900 dark:text-mw-primary-100' : 'text-mw-gray-900 dark:text-white'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                          {step.estimatedTime} min
                        </p>
                      </div>
                      <Badge variant={getStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-mw-primary-100 dark:bg-mw-primary-900/30 rounded-full flex items-center justify-center">
                        {getStepIcon(onboardingSteps[activeStep].type, 'active')}
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-2">
                          {onboardingSteps[activeStep].title}
                        </h2>
                        <p className="text-mw-gray-600 dark:text-mw-gray-400">
                          {onboardingSteps[activeStep].description}
                        </p>
                      </div>

                      {/* Step-specific content */}
                      {activeStep === 0 && (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-mw-primary-50 to-mw-blue-50 dark:from-mw-primary-900/20 dark:to-mw-blue-900/20 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Welcome to our platform!</h3>
                            <p className="text-mw-gray-600 dark:text-mw-gray-400">
                              We're excited to have you on board. This quick tour will help you get started.
                            </p>
                          </div>
                          <Button className="w-full">
                            <Video className="w-4 h-4 mr-2" />
                            Watch Welcome Video
                          </Button>
                        </div>
                      )}

                      {activeStep === 1 && (
                        <div className="space-y-4">
                          <Form>
                            <FormField>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" defaultValue="John Doe" />
                              </FormControl>
                            </FormField>
                            
                            <FormField>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your company name" defaultValue="Acme Corp" />
                              </FormControl>
                            </FormField>
                            
                            <FormField>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Select
                                  options={[
                                    { value: 'manager', label: 'Manager' },
                                    { value: 'developer', label: 'Developer' },
                                    { value: 'designer', label: 'Designer' },
                                    { value: 'other', label: 'Other' }
                                  ]}
                                  defaultValue="manager"
                                />
                              </FormControl>
                            </FormField>
                          </Form>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="space-y-4">
                          <div className="text-left">
                            <h3 className="text-lg font-semibold mb-4">Invite Your Team</h3>
                            <div className="space-y-3">
                              <Input placeholder="colleague@company.com" />
                              <div className="flex items-center space-x-2">
                                <Checkbox id="admin" />
                                <label htmlFor="admin" className="text-sm">Make admin</label>
                              </div>
                              <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between pt-6">
                        <Button
                          variant="outline"
                          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                          disabled={activeStep === 0}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline">
                            Skip
                          </Button>
                          <Button
                            onClick={() => setActiveStep(Math.min(onboardingSteps.length - 1, activeStep + 1))}
                            disabled={activeStep === onboardingSteps.length - 1}
                          >
                            {activeStep === onboardingSteps.length - 1 ? 'Finish' : 'Continue'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Users View */}
      {currentView === 'users' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  New User Progress
                </h3>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 cursor-pointer"
                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>{user.avatar}</Avatar>
                      <div>
                        <h4 className="font-medium text-mw-gray-900 dark:text-white">{user.name}</h4>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">{user.email}</p>
                        <p className="text-sm text-mw-gray-500">{user.company} • {user.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Progress</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={user.completionRate} className="w-20 h-2" />
                          <span className="text-sm font-medium">{user.completionRate}%</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Step</p>
                        <p className="font-medium">{user.currentStep}/{onboardingSteps.length}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Time Spent</p>
                        <p className="font-medium">{user.timeSpent}min</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help Modal */}
      <Modal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
            Onboarding Help
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-mw-gray-900 dark:text-white mb-2">Getting Started</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Follow the guided steps to complete your account setup. Each step builds on the previous one.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-mw-gray-900 dark:text-white mb-2">Need Assistance?</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={() => setShowHelpModal(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

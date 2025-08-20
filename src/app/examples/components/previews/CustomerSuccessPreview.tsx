'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Table } from '@/components/ui/Table'
import { Progress } from '@/components/ui/Progress'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { Form, FormField, FormLabel, FormControl } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { 
  Users, TrendingUp, AlertTriangle, CheckCircle,
  MessageSquare, Calendar, Phone, Mail, Star,
  Plus, Send, Eye, Filter, Download,
  Heart, Zap, Target, Activity, Clock
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  avatar: string
  plan: string
  healthScore: number
  lastActivity: string
  riskLevel: 'low' | 'medium' | 'high'
  lifetime: number
  nps: number
}

interface Activity {
  id: string
  customer: string
  type: 'support' | 'sales' | 'onboarding' | 'check-in'
  description: string
  date: string
  outcome: 'positive' | 'neutral' | 'negative'
}

interface Task {
  id: string
  customer: string
  title: string
  type: 'follow-up' | 'onboarding' | 'renewal' | 'upsell'
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  completed: boolean
}

export default function CustomerSuccessPreview() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState('all')

  // Mock data
  const customers: Customer[] = [
    {
      id: 'cust_001',
      name: 'Sarah Chen',
      email: 'sarah@techcorp.com',
      avatar: 'SC',
      plan: 'Enterprise',
      healthScore: 85,
      lastActivity: '2 hours ago',
      riskLevel: 'low',
      lifetime: 24,
      nps: 9
    },
    {
      id: 'cust_002',
      name: 'Mike Johnson',
      email: 'mike@startupxyz.com',
      avatar: 'MJ',
      plan: 'Professional',
      healthScore: 65,
      lastActivity: '3 days ago',
      riskLevel: 'medium',
      lifetime: 8,
      nps: 7
    },
    {
      id: 'cust_003',
      name: 'Lisa Rodriguez',
      email: 'lisa@designstudio.com',
      avatar: 'LR',
      plan: 'Starter',
      healthScore: 45,
      lastActivity: '1 week ago',
      riskLevel: 'high',
      lifetime: 3,
      nps: 6
    }
  ]

  const activities: Activity[] = [
    {
      id: 'act_001',
      customer: 'Sarah Chen',
      type: 'check-in',
      description: 'Quarterly business review completed - very positive feedback',
      date: '2024-08-30',
      outcome: 'positive'
    },
    {
      id: 'act_002',
      customer: 'Mike Johnson',
      type: 'support',
      description: 'Helped resolve integration issues with third-party API',
      date: '2024-08-29',
      outcome: 'positive'
    },
    {
      id: 'act_003',
      customer: 'Lisa Rodriguez',
      type: 'onboarding',
      description: 'Customer struggling with initial setup - needs follow-up',
      date: '2024-08-28',
      outcome: 'negative'
    }
  ]

  const tasks: Task[] = [
    {
      id: 'task_001',
      customer: 'Lisa Rodriguez',
      title: 'Schedule onboarding call',
      type: 'onboarding',
      priority: 'high',
      dueDate: '2024-09-02',
      completed: false
    },
    {
      id: 'task_002',
      customer: 'Mike Johnson',
      title: 'Check feature adoption',
      type: 'follow-up',
      priority: 'medium',
      dueDate: '2024-09-05',
      completed: false
    },
    {
      id: 'task_003',
      customer: 'Sarah Chen',
      title: 'Renewal discussion',
      type: 'renewal',
      priority: 'medium',
      dueDate: '2024-09-15',
      completed: true
    }
  ]

  const metrics = {
    totalCustomers: 1247,
    healthyCustomers: 892,
    atRiskCustomers: 156,
    averageNPS: 7.8,
    churnRisk: 12.5
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success'
      case 'medium': return 'warning'
      case 'high': return 'error'
      default: return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error'
      case 'medium': return 'warning'
      case 'low': return 'secondary'
      default: return 'primary'
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'positive': return 'success'
      case 'negative': return 'error'
      case 'neutral': return 'secondary'
      default: return 'primary'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-mw-gray-50 dark:bg-mw-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
            Customer Success Dashboard
          </h1>
          <p className="text-mw-gray-600 dark:text-mw-gray-400 mt-1">
            Monitor customer health, reduce churn, and drive growth
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={[
              { value: 'all', label: 'All Risk Levels' },
              { value: 'high', label: 'High Risk' },
              { value: 'medium', label: 'Medium Risk' },
              { value: 'low', label: 'Low Risk' }
            ]}
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
          />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowTaskModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Total Customers</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {metrics.totalCustomers.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Healthy</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {metrics.healthyCustomers}
                </p>
                <p className="text-xs text-green-600">
                  {((metrics.healthyCustomers / metrics.totalCustomers) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">At Risk</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {metrics.atRiskCustomers}
                </p>
                <p className="text-xs text-red-600">
                  {((metrics.atRiskCustomers / metrics.totalCustomers) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Avg NPS</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {metrics.averageNPS}
                </p>
                <p className="text-xs text-purple-600">+0.3 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Churn Risk</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {metrics.churnRisk}%
                </p>
                <p className="text-xs text-green-600">-2.1% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* High Risk Customers */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  High Risk Customers
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.filter(c => c.riskLevel === 'high').map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>{customer.avatar}</Avatar>
                        <div>
                          <p className="font-medium text-mw-gray-900 dark:text-white">
                            {customer.name}
                          </p>
                          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {customer.plan} • Health: {customer.healthScore}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getRiskColor(customer.riskLevel)}>
                          {customer.riskLevel} risk
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Recent Activities
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.outcome === 'positive' ? 'bg-green-500' :
                        activity.outcome === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-mw-gray-900 dark:text-white">
                            {activity.customer}
                          </p>
                          <Badge variant={getOutcomeColor(activity.outcome)} className="ml-2">
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-mw-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Score Distribution */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Customer Health Score Distribution
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">71%</div>
                  <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Healthy (80-100)</div>
                  <Progress value={71} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">17%</div>
                  <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">At Risk (60-79)</div>
                  <Progress value={17} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">12%</div>
                  <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Critical (0-59)</div>
                  <Progress value={12} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Customer Health Overview
                </h3>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Plan</th>
                    <th>Health Score</th>
                    <th>Risk Level</th>
                    <th>Last Activity</th>
                    <th>Lifetime (months)</th>
                    <th>NPS</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <Avatar>{customer.avatar}</Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-mw-gray-500">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{customer.plan}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${getHealthColor(customer.healthScore)}`}>
                            {customer.healthScore}%
                          </span>
                          <Progress value={customer.healthScore} className="w-16 h-2" />
                        </div>
                      </td>
                      <td>
                        <Badge variant={getRiskColor(customer.riskLevel)}>
                          {customer.riskLevel}
                        </Badge>
                      </td>
                      <td>{customer.lastActivity}</td>
                      <td>{customer.lifetime}</td>
                      <td>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{customer.nps}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Customer Interaction History
                </h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                    <div className={`w-4 h-4 rounded-full mt-1 ${
                      activity.outcome === 'positive' ? 'bg-green-500' :
                      activity.outcome === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-mw-gray-900 dark:text-white">
                          {activity.customer}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getOutcomeColor(activity.outcome)}>
                            {activity.type}
                          </Badge>
                          <span className="text-sm text-mw-gray-500">{activity.date}</span>
                        </div>
                      </div>
                      <p className="text-mw-gray-600 dark:text-mw-gray-400">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Customer Success Tasks
                </h3>
                <Button onClick={() => setShowTaskModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="font-medium">{task.title}</td>
                      <td>{task.customer}</td>
                      <td>
                        <Badge variant="secondary">
                          {task.type}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </td>
                      <td>{task.dueDate}</td>
                      <td>
                        {task.completed ? (
                          <Badge variant="success">Completed</Badge>
                        ) : (
                          <Badge variant="warning">Pending</Badge>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            {task.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Success Insights
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">
                        High Engagement Trend
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Enterprise customers show 23% higher feature adoption
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">
                        Onboarding Success
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Customers with guided onboarding have 40% higher retention
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Action Items
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900 dark:text-yellow-100">
                        Follow up needed
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        3 high-risk customers need immediate attention
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900 dark:text-purple-100">
                        Renewal Opportunities
                      </p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        5 customers eligible for plan upgrades this month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Task Modal */}
      <Modal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
            Create New Task
          </h2>
          <Form>
            <FormField>
              <FormLabel>Customer</FormLabel>
              <FormControl>
                <Select
                  options={customers.map(c => ({ value: c.id, label: c.name }))}
                  placeholder="Select customer"
                />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  options={[
                    { value: 'follow-up', label: 'Follow-up' },
                    { value: 'onboarding', label: 'Onboarding' },
                    { value: 'renewal', label: 'Renewal' },
                    { value: 'upsell', label: 'Upsell' }
                  ]}
                  placeholder="Select type"
                />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  options={[
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' }
                  ]}
                  placeholder="Select priority"
                />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes..." />
              </FormControl>
            </FormField>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowTaskModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowTaskModal(false)}>
                Create Task
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

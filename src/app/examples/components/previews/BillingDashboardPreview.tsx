'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Table } from '@/components/ui/Table'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { Form, FormField, FormLabel, FormControl } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { 
  CreditCard, DollarSign, TrendingUp, TrendingDown,
  Calendar, Download, AlertCircle, CheckCircle,
  XCircle, Clock, Receipt, Users, Target,
  Plus, Edit3, Send, RefreshCw, Filter
} from 'lucide-react'

interface Subscription {
  id: string
  customer: string
  plan: string
  amount: number
  status: 'active' | 'past_due' | 'canceled' | 'trialing'
  nextBilling: string
  usage: number
  usageLimit: number
}

interface Invoice {
  id: string
  customer: string
  amount: number
  status: 'paid' | 'pending' | 'failed' | 'draft'
  dueDate: string
  paidDate?: string
  items: number
}

interface Usage {
  feature: string
  current: number
  limit: number
  percentage: number
  overage: number
}

export default function BillingDashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Mock data
  const subscriptions: Subscription[] = [
    {
      id: 'sub_001',
      customer: 'TechCorp Inc.',
      plan: 'Enterprise',
      amount: 299,
      status: 'active',
      nextBilling: '2024-09-15',
      usage: 850,
      usageLimit: 1000
    },
    {
      id: 'sub_002', 
      customer: 'StartupXYZ',
      plan: 'Professional',
      amount: 99,
      status: 'past_due',
      nextBilling: '2024-08-28',
      usage: 180,
      usageLimit: 250
    },
    {
      id: 'sub_003',
      customer: 'DesignStudio',
      plan: 'Starter',
      amount: 29,
      status: 'trialing',
      nextBilling: '2024-09-01',
      usage: 45,
      usageLimit: 100
    }
  ]

  const invoices: Invoice[] = [
    {
      id: 'inv_001',
      customer: 'TechCorp Inc.',
      amount: 299.00,
      status: 'paid',
      dueDate: '2024-08-15',
      paidDate: '2024-08-14',
      items: 3
    },
    {
      id: 'inv_002',
      customer: 'StartupXYZ', 
      amount: 99.00,
      status: 'failed',
      dueDate: '2024-08-28',
      items: 2
    },
    {
      id: 'inv_003',
      customer: 'DesignStudio',
      amount: 29.00,
      status: 'pending',
      dueDate: '2024-09-01',
      items: 1
    }
  ]

  const usageData: Usage[] = [
    { feature: 'API Calls', current: 28500, limit: 50000, percentage: 57, overage: 0 },
    { feature: 'Storage (GB)', current: 85, limit: 100, percentage: 85, overage: 0 },
    { feature: 'Team Members', current: 12, limit: 15, percentage: 80, overage: 0 },
    { feature: 'Projects', current: 45, limit: 50, percentage: 90, overage: 0 }
  ]

  const revenueMetrics = {
    monthlyRevenue: 127540,
    annualRevenue: 1453280,
    churnRate: 2.3,
    averageRevenue: 156.50
  }

  const statusColors = {
    active: 'success',
    past_due: 'warning',
    canceled: 'error',
    trialing: 'secondary',
    paid: 'success',
    pending: 'warning',
    failed: 'error',
    draft: 'secondary'
  } as const

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-mw-gray-50 dark:bg-mw-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
            Billing Dashboard
          </h1>
          <p className="text-mw-gray-600 dark:text-mw-gray-400 mt-1">
            Manage subscriptions, invoices, and revenue analytics
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' },
              { value: '1y', label: 'Last year' }
            ]}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowInvoiceModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Monthly Revenue</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  ${revenueMetrics.monthlyRevenue.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Annual Revenue</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  ${revenueMetrics.annualRevenue.toLocaleString()}
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +18.2%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Avg Revenue/User</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  ${revenueMetrics.averageRevenue}
                </p>
                <div className="flex items-center text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5.3%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Churn Rate</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {revenueMetrics.churnRate}%
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -0.8%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Recent Transactions
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { amount: 299, customer: 'TechCorp Inc.', status: 'paid', time: '2 hours ago' },
                    { amount: 99, customer: 'StartupXYZ', status: 'failed', time: '1 day ago' },
                    { amount: 29, customer: 'DesignStudio', status: 'pending', time: '2 days ago' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.status === 'paid' ? 'bg-green-500' :
                          transaction.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium text-mw-gray-900 dark:text-white">
                            ${transaction.amount}
                          </p>
                          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {transaction.customer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={statusColors[transaction.status as keyof typeof statusColors]}>
                          {transaction.status}
                        </Badge>
                        <p className="text-xs text-mw-gray-500 mt-1">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Issues */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Payment Issues
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900 dark:text-red-100">Failed Payments</p>
                        <p className="text-sm text-red-700 dark:text-red-300">2 payments need attention</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900 dark:text-yellow-100">Past Due</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">1 subscription overdue</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Contact
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">Healthy Accounts</p>
                        <p className="text-sm text-green-700 dark:text-green-300">3 accounts in good standing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Revenue Trend
              </h3>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-mw-primary-50 to-mw-blue-50 dark:from-mw-primary-900/20 dark:to-mw-blue-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-mw-gray-500 dark:text-mw-gray-400">
                  <DollarSign className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Revenue Analytics Chart</p>
                  <p>Monthly recurring revenue and growth trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Active Subscriptions
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
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Next Billing</th>
                    <th>Usage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id}>
                      <td className="font-medium">{sub.customer}</td>
                      <td>{sub.plan}</td>
                      <td>${sub.amount}/month</td>
                      <td>
                        <Badge variant={statusColors[sub.status]}>
                          {sub.status}
                        </Badge>
                      </td>
                      <td>{sub.nextBilling}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Progress value={(sub.usage / sub.usageLimit) * 100} className="w-16 h-2" />
                          <span className="text-sm text-mw-gray-500">
                            {sub.usage}/{sub.usageLimit}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Receipt className="w-4 h-4" />
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

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Invoice Management
                </h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync
                  </Button>
                  <Button onClick={() => setShowInvoiceModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Invoice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Paid Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="font-mono text-sm">{invoice.id}</td>
                      <td>{invoice.customer}</td>
                      <td>${invoice.amount.toFixed(2)}</td>
                      <td>
                        <Badge variant={statusColors[invoice.status]}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td>{invoice.dueDate}</td>
                      <td>{invoice.paidDate || '-'}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
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

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Feature Usage Analytics
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {usageData.map((usage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-mw-gray-900 dark:text-white">
                        {usage.feature}
                      </span>
                      <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        {usage.current.toLocaleString()} / {usage.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={usage.percentage} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-mw-gray-500">{usage.percentage}% used</span>
                      {usage.overage > 0 && (
                        <span className="text-red-600">+{usage.overage} overage</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Plan Distribution
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Enterprise</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={33} className="w-24 h-2" />
                      <span className="text-sm">1 (33%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Professional</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={33} className="w-24 h-2" />
                      <span className="text-sm">1 (33%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Starter</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={33} className="w-24 h-2" />
                      <span className="text-sm">1 (33%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Revenue by Plan
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Enterprise</span>
                    <span className="font-bold">$299 (70%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Professional</span>
                    <span className="font-bold">$99 (23%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Starter</span>
                    <span className="font-bold">$29 (7%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Invoice Modal */}
      <Modal isOpen={showInvoiceModal} onClose={() => setShowInvoiceModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
            Create New Invoice
          </h2>
          <Form>
            <FormField>
              <FormLabel>Customer</FormLabel>
              <FormControl>
                <Select
                  options={[
                    { value: 'techcorp', label: 'TechCorp Inc.' },
                    { value: 'startupxyz', label: 'StartupXYZ' },
                    { value: 'designstudio', label: 'DesignStudio' }
                  ]}
                  placeholder="Select customer"
                />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" />
              </FormControl>
            </FormField>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowInvoiceModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowInvoiceModal(false)}>
                Create Invoice
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

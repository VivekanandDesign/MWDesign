'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Table } from '@/components/ui/Table'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { Form, FormField, FormLabel, FormControl } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch'
import { 
  Building2, Users, Shield, Settings, CreditCard,
  Plus, Edit3, Trash2, Search, Filter, MoreHorizontal,
  CheckCircle, XCircle, AlertCircle, Eye, Key,
  Clock, Activity, Database, Zap, Globe, Lock
} from 'lucide-react'

interface Organization {
  id: string
  name: string
  domain: string
  plan: 'starter' | 'professional' | 'enterprise'
  users: number
  status: 'active' | 'suspended' | 'trial'
  created: string
  lastActive: string
  features: string[]
}

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
  organization: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  avatar: string
}

interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean
  rollout: number
  environments: string[]
}

export default function AdminPanelPreview() {
  const [activeTab, setActiveTab] = useState('organizations')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'TechCorp Inc.',
      domain: 'techcorp.com',
      plan: 'enterprise',
      users: 247,
      status: 'active',
      created: '2024-01-15',
      lastActive: '2 hours ago',
      features: ['API Access', 'SSO', 'Advanced Analytics', 'Custom Branding']
    },
    {
      id: '2', 
      name: 'StartupXYZ',
      domain: 'startupxyz.io',
      plan: 'professional',
      users: 23,
      status: 'active',
      created: '2024-03-22',
      lastActive: '1 day ago',
      features: ['API Access', 'Team Collaboration', 'Advanced Reports']
    },
    {
      id: '3',
      name: 'DesignStudio',
      domain: 'designstudio.co',
      plan: 'starter',
      users: 8,
      status: 'trial',
      created: '2024-08-10',
      lastActive: '3 hours ago',
      features: ['Basic Analytics', 'File Sharing']
    }
  ]

  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@techcorp.com',
      role: 'admin',
      organization: 'TechCorp Inc.',
      status: 'active',
      lastLogin: '2 hours ago',
      avatar: 'JS'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@startupxyz.io',
      role: 'manager',
      organization: 'StartupXYZ',
      status: 'active', 
      lastLogin: '1 day ago',
      avatar: 'SW'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@designstudio.co',
      role: 'user',
      organization: 'DesignStudio',
      status: 'pending',
      lastLogin: 'Never',
      avatar: 'MC'
    }
  ]

  const featureFlags: FeatureFlag[] = [
    {
      id: '1',
      name: 'New Dashboard UI',
      description: 'Updated dashboard with improved analytics',
      enabled: true,
      rollout: 75,
      environments: ['staging', 'production']
    },
    {
      id: '2',
      name: 'AI Assistant',
      description: 'Intelligent assistant for user queries',
      enabled: false,
      rollout: 0,
      environments: ['development']
    },
    {
      id: '3',
      name: 'Advanced Reporting',
      description: 'Enhanced reporting capabilities',
      enabled: true,
      rollout: 100,
      environments: ['production']
    }
  ]

  const planColors = {
    starter: 'secondary',
    professional: 'primary', 
    enterprise: 'success'
  } as const

  const statusColors = {
    active: 'success',
    suspended: 'error',
    trial: 'secondary'
  } as const

  const roleColors = {
    admin: 'error',
    manager: 'primary',
    user: 'secondary'
  } as const

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-mw-gray-50 dark:bg-mw-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-mw-gray-600 dark:text-mw-gray-400 mt-1">
            Manage organizations, users, and system settings
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Organizations</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {organizations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {organizations.reduce((sum, org) => sum + org.users, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Active Plans</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {organizations.filter(org => org.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Trials</p>
                <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {organizations.filter(org => org.status === 'trial').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Organizations Management
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                    <Input
                      placeholder="Search organizations..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Plan</th>
                    <th>Users</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((org) => (
                    <tr key={org.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <Avatar size="sm">{org.name.substring(0, 2)}</Avatar>
                          <div>
                            <p className="font-medium text-mw-gray-900 dark:text-white">
                              {org.name}
                            </p>
                            <p className="text-sm text-mw-gray-500">{org.domain}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge variant={planColors[org.plan]}>
                          {org.plan}
                        </Badge>
                      </td>
                      <td>{org.users}</td>
                      <td>
                        <Badge variant={statusColors[org.status]}>
                          {org.status}
                        </Badge>
                      </td>
                      <td>{org.lastActive}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
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

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                User Management
              </h3>
            </CardHeader>
            <CardContent>
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Organization</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <Avatar size="sm">{user.avatar}</Avatar>
                          <div>
                            <p className="font-medium text-mw-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-mw-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{user.organization}</td>
                      <td>
                        <Badge variant={roleColors[user.role]}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Lock className="w-4 h-4" />
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

        {/* Feature Flags Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Feature Flags
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureFlags.map((flag) => (
                  <div key={flag.id} className="border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-mw-gray-900 dark:text-white">
                            {flag.name}
                          </h4>
                          <Switch checked={flag.enabled} />
                        </div>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mt-1">
                          {flag.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-mw-gray-500">
                            Rollout: {flag.rollout}%
                          </span>
                          <div className="flex space-x-2">
                            {flag.environments.map((env) => (
                              <Badge key={env} variant="outline" className="text-xs">
                                {env}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Revenue Overview
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">$45,280</p>
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Annual Revenue</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">$498,650</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Plan Distribution
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Enterprise</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Professional</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Starter</span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Payment Issues
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Payments</span>
                    <Badge variant="error">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overdue Invoices</span>
                    <Badge variant="secondary">0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Churn Risk</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                System Audit Logs
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'User login', user: 'john@techcorp.com', time: '2 minutes ago', status: 'success' },
                  { action: 'Organization created', user: 'admin@system.com', time: '1 hour ago', status: 'success' },
                  { action: 'Failed login attempt', user: 'unknown@domain.com', time: '2 hours ago', status: 'warning' },
                  { action: 'Feature flag updated', user: 'admin@system.com', time: '3 hours ago', status: 'success' },
                  { action: 'User permission changed', user: 'sarah@startupxyz.io', time: '5 hours ago', status: 'success' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 
                        log.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium text-mw-gray-900 dark:text-white">{log.action}</p>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">{log.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-mw-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Organization Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-4">
            Create New Organization
          </h2>
          <Form>
            <FormField>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="company.com" />
              </FormControl>
            </FormField>
            
            <FormField>
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <Select
                  options={[
                    { value: 'starter', label: 'Starter' },
                    { value: 'professional', label: 'Professional' },
                    { value: 'enterprise', label: 'Enterprise' }
                  ]}
                  placeholder="Select plan"
                />
              </FormControl>
            </FormField>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                Create Organization
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

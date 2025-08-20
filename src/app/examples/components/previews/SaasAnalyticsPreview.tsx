'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Select } from '@/components/ui/Select'
import { Progress } from '@/components/ui/Progress'
import { Table } from '@/components/ui/Table'
import { Avatar } from '@/components/ui/Avatar'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, Calendar, Download,
  Target, Zap, Globe, Smartphone, Monitor, Eye,
  MousePointer, Clock, BarChart3, PieChart,
  LineChart, Filter, RefreshCw, Settings
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  icon: React.ReactNode
  trend?: number[]
}

interface RevenueData {
  month: string
  revenue: number
  growth: number
}

interface UserMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down'
}

export default function SaasAnalyticsPreview() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)

  // Mock data
  const overviewMetrics = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$847,290',
      change: 12.5,
      changeType: 'increase' as const,
      icon: <DollarSign className="w-5 h-5" />,
      trend: [120, 140, 110, 180, 165, 190, 210]
    },
    {
      title: 'Active Users',
      value: '12,847',
      change: 8.2,
      changeType: 'increase' as const,
      icon: <Users className="w-5 h-5" />,
      trend: [100, 120, 115, 140, 135, 155, 170]
    },
    {
      title: 'Conversion Rate',
      value: '4.23%',
      change: -2.1,
      changeType: 'decrease' as const,
      icon: <Target className="w-5 h-5" />,
      trend: [4.5, 4.2, 4.8, 4.1, 4.3, 4.0, 4.23]
    },
    {
      title: 'Customer Churn',
      value: '2.1%',
      change: -0.8,
      changeType: 'increase' as const,
      icon: <TrendingDown className="w-5 h-5" />,
      trend: [3.1, 2.8, 2.5, 2.3, 2.0, 2.2, 2.1]
    }
  ]

  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 720000, growth: 8.2 },
    { month: 'Feb', revenue: 760000, growth: 5.5 },
    { month: 'Mar', revenue: 810000, growth: 6.6 },
    { month: 'Apr', revenue: 790000, growth: -2.5 },
    { month: 'May', revenue: 820000, growth: 3.8 },
    { month: 'Jun', revenue: 847290, growth: 3.3 }
  ]

  const userMetrics: UserMetric[] = [
    { name: 'New Signups', value: 1247, change: 18.2, trend: 'up' },
    { name: 'Trial Conversions', value: 89, change: 12.5, trend: 'up' },
    { name: 'Feature Adoption', value: 67, change: -3.2, trend: 'down' },
    { name: 'Support Tickets', value: 23, change: -15.8, trend: 'up' }
  ]

  const topFeatures = [
    { name: 'Dashboard Analytics', usage: 89, trend: 'up' },
    { name: 'Team Collaboration', usage: 76, trend: 'up' },
    { name: 'API Integration', usage: 64, trend: 'down' },
    { name: 'Mobile App', usage: 52, trend: 'up' },
    { name: 'Reporting Suite', usage: 41, trend: 'down' }
  ]

  const recentActivity = [
    { user: 'Sarah Chen', action: 'Upgraded to Pro plan', time: '2 minutes ago', avatar: 'SC' },
    { user: 'Mike Johnson', action: 'Created new integration', time: '5 minutes ago', avatar: 'MJ' },
    { user: 'Lisa Wang', action: 'Exported monthly report', time: '12 minutes ago', avatar: 'LW' },
    { user: 'David Kim', action: 'Invited 5 team members', time: '18 minutes ago', avatar: 'DK' },
    { user: 'Emma Davis', action: 'Completed onboarding', time: '25 minutes ago', avatar: 'ED' }
  ]

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon, trend }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-mw-primary-50 dark:bg-mw-primary-900/20 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-mw-gray-600 dark:text-mw-gray-400">{title}</p>
              <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">{value}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'increase' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
            <p className="text-xs text-mw-gray-500">vs last period</p>
          </div>
        </div>
        {trend && (
          <div className="mt-4">
            <div className="flex items-end space-x-1 h-8">
              {trend.map((value, index) => (
                <div
                  key={index}
                  className="bg-mw-primary-200 dark:bg-mw-primary-800 rounded-sm flex-1"
                  style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-mw-gray-50 dark:bg-mw-gray-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-mw-gray-600 dark:text-mw-gray-400 mt-1">
            Track your SaaS metrics and business performance
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={[
              { value: '1d', label: 'Last 24 hours' },
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' }
            ]}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          />
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Revenue Trend
                  </h3>
                  <Badge variant="secondary">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-mw-primary-50 to-mw-blue-50 dark:from-mw-primary-900/20 dark:to-mw-blue-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-mw-gray-500 dark:text-mw-gray-400">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Revenue Chart</p>
                    <p className="text-sm">Revenue trend visualization would appear here</p>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 mt-4">
                  {revenueData.map((data, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-mw-gray-500">{data.month}</p>
                      <p className="text-sm font-medium text-mw-gray-900 dark:text-white">
                        ${(data.revenue / 1000).toFixed(0)}k
                      </p>
                      <p className={`text-xs ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.growth >= 0 ? '+' : ''}{data.growth}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar size="sm">{activity.avatar}</Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-mw-gray-900 dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                          {activity.action}
                        </p>
                        <p className="text-xs text-mw-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">{metric.name}</p>
                      <p className="text-xl font-bold text-mw-gray-900 dark:text-white">{metric.value}</p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Revenue Breakdown
                </h3>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-br from-mw-primary-50 to-mw-blue-50 dark:from-mw-primary-900/20 dark:to-mw-blue-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-mw-gray-500 dark:text-mw-gray-400">
                    <PieChart className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Revenue Distribution Chart</p>
                    <p>Subscription vs One-time vs Add-ons</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Revenue Sources
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Subscriptions</span>
                  <span className="font-medium">$720,450</span>
                </div>
                <Progress value={85} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">One-time</span>
                  <span className="font-medium">$89,340</span>
                </div>
                <Progress value={15} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Add-ons</span>
                  <span className="font-medium">$37,500</span>
                </div>
                <Progress value={25} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  User Growth
                </h3>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-mw-primary-50 to-mw-blue-50 dark:from-mw-primary-900/20 dark:to-mw-blue-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-mw-gray-500 dark:text-mw-gray-400">
                    <LineChart className="w-12 h-12 mx-auto mb-2" />
                    <p>User Growth Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  User Segments
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Free Users</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">8,234</span>
                    <Badge variant="secondary">64%</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Premium Users</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">3,891</span>
                    <Badge variant="primary">30%</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Enterprise</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">722</span>
                    <Badge variant="success">6%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Feature Usage Analytics
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-mw-primary-100 dark:bg-mw-primary-900/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-mw-primary-600" />
                      </div>
                      <span className="font-medium text-mw-gray-900 dark:text-white">{feature.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32">
                        <Progress value={feature.usage} className="h-2" />
                      </div>
                      <span className="text-sm font-medium text-mw-gray-600 dark:text-mw-gray-400 w-12">
                        {feature.usage}%
                      </span>
                      {feature.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Page Views</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">847,290</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <MousePointer className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Click Rate</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">4.23%</p>
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
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Avg. Session</p>
                    <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">8m 42s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

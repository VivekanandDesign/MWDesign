'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { Layout, Grid, Smartphone, Monitor, Tablet, Code, Eye, Download, X } from 'lucide-react'

const layoutPatterns = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    description: 'Admin and analytics dashboard patterns with sidebar navigation and responsive grid.',
    category: 'Dashboard',
    complexity: 'Advanced',
    preview: '/patterns/dashboard-preview.png',
    features: ['Sidebar navigation', 'Card grid layout', 'Responsive design', 'Data visualization'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Data-focused dashboard with charts, KPIs, and real-time metrics visualization.',
    category: 'Dashboard',
    complexity: 'Advanced',
    preview: '/patterns/analytics-preview.png',
    features: ['Chart widgets', 'KPI cards', 'Real-time data', 'Filter controls'],
    technologies: ['React', 'Chart.js', 'TypeScript'],
  },
  {
    id: 'sales-dashboard',
    title: 'Sales Dashboard',
    description: 'CRM and sales performance dashboard with pipeline tracking and revenue metrics.',
    category: 'Dashboard',
    complexity: 'Advanced',
    preview: '/patterns/sales-preview.png',
    features: ['Sales pipeline', 'Revenue tracking', 'Lead management', 'Performance metrics'],
    technologies: ['React', 'CRM API', 'Charts'],
  },
  {
    id: 'project-dashboard',
    title: 'Project Dashboard',
    description: 'Team collaboration dashboard with task management and project progress tracking.',
    category: 'Dashboard',
    complexity: 'Intermediate',
    preview: '/patterns/project-preview.png',
    features: ['Task boards', 'Progress tracking', 'Team collaboration', 'Timeline view'],
    technologies: ['React', 'Drag & Drop', 'WebSocket'],
  },
  {
    id: 'finance-dashboard',
    title: 'Finance Dashboard',
    description: 'Financial overview with expense tracking, budget analysis, and investment portfolio.',
    category: 'Dashboard',
    complexity: 'Advanced',
    preview: '/patterns/finance-preview.png',
    features: ['Expense tracking', 'Budget analysis', 'Portfolio view', 'Financial charts'],
    technologies: ['React', 'Financial APIs', 'D3.js'],
  },
  {
    id: 'landing',
    title: 'Landing Page',
    description: 'Marketing and product landing page templates with hero sections and feature grids.',
    category: 'Marketing',
    complexity: 'Intermediate',
    preview: '/patterns/landing-preview.png',
    features: ['Hero sections', 'Feature grids', 'Call-to-action', 'Social proof'],
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Product',
    description: 'Product listing and detail pages with shopping cart and checkout flows.',
    category: 'E-commerce',
    complexity: 'Advanced',
    preview: '/patterns/ecommerce-preview.png',
    features: ['Product grids', 'Filters & search', 'Shopping cart', 'Checkout flow'],
    technologies: ['React', 'TypeScript', 'Commerce API'],
  },
  {
    id: 'blog',
    title: 'Blog & Content',
    description: 'Editorial layouts for blogs, documentation, and content management.',
    category: 'Content',
    complexity: 'Beginner',
    preview: '/patterns/blog-preview.png',
    features: ['Article layouts', 'Navigation', 'Typography', 'Reading experience'],
    technologies: ['Next.js', 'MDX', 'Tailwind CSS'],
  },
  {
    id: 'auth',
    title: 'Authentication',
    description: 'Login, signup, and password reset flows with form validation and error handling.',
    category: 'Forms',
    complexity: 'Intermediate',
    preview: '/patterns/auth-preview.png',
    features: ['Form validation', 'Error handling', 'Social login', 'Password reset'],
    technologies: ['React Hook Form', 'Zod', 'Auth providers'],
  },
  {
    id: 'settings',
    title: 'Settings & Profile',
    description: 'User profile and application settings with tabbed navigation and form controls.',
    category: 'Application',
    complexity: 'Intermediate',
    preview: '/patterns/settings-preview.png',
    features: ['Tabbed navigation', 'Form controls', 'File uploads', 'Privacy settings'],
    technologies: ['React', 'TypeScript', 'Form handling'],
  }
]

const gridSystems = [
  {
    name: '4pt Grid System',
    description: 'Base spacing unit of 4px for consistent spacing and alignment',
    usage: 'Use for padding, margins, and component spacing',
    example: 'gap-4, p-4, m-4, space-y-4'
  },
  {
    name: '12-Column Grid',
    description: 'Flexible 12-column grid system for responsive layouts',
    usage: 'Use for page layouts and content organization',
    example: 'grid-cols-12, col-span-6, lg:col-span-4'
  },
  {
    name: 'Container System',
    description: 'Max-width containers for content centering and responsive breakpoints',
    usage: 'Use max-w-7xl mx-auto for main content areas',
    example: 'max-w-7xl, max-w-4xl, mx-auto px-4'
  }
]

// Pattern Preview Components
function DashboardPreview() {
  return (
    <div className="w-full h-96 bg-mw-gray-100 dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-mw-gray-800 p-4">
          <div className="text-white font-semibold mb-6">Admin Dashboard</div>
          <div className="space-y-2">
            {['Overview', 'Analytics', 'Reports', 'Settings'].map((item, i) => (
              <div key={i} className="text-mw-gray-300 text-sm py-2 px-3 rounded bg-mw-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-mw-gray-800 p-4 rounded-lg shadow">
                <div className="text-sm text-mw-gray-500">Metric {i}</div>
                <div className="text-2xl font-bold text-mw-blue-600">2,{i}47</div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-mw-gray-800 p-4 rounded-lg shadow h-48">
            <div className="text-lg font-semibold mb-4">Analytics Chart</div>
            <div className="h-32 bg-gradient-to-r from-mw-blue-100 to-mw-blue-200 dark:from-mw-blue-900 dark:to-mw-blue-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsDashboardPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Analytics Overview</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-mw-blue-100 dark:bg-mw-blue-900 text-mw-blue-700 dark:text-mw-blue-300 rounded text-sm">7D</button>
            <button className="px-3 py-1 bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-600 dark:text-mw-gray-300 rounded text-sm">30D</button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: '24.5K', change: '+12%', color: 'text-green-600' },
            { label: 'Revenue', value: '$48.2K', change: '+8%', color: 'text-green-600' },
            { label: 'Conversion', value: '3.2%', change: '-2%', color: 'text-red-600' },
            { label: 'Bounce Rate', value: '42%', change: '-5%', color: 'text-green-600' }
          ].map((kpi, i) => (
            <div key={i} className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded-lg">
              <div className="text-sm text-mw-gray-500 dark:text-mw-gray-400">{kpi.label}</div>
              <div className="text-xl font-bold text-mw-gray-900 dark:text-white">{kpi.value}</div>
              <div className={`text-xs ${kpi.color}`}>{kpi.change}</div>
            </div>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-mw-gray-900 dark:text-white">Traffic Sources</h3>
            <div className="h-24 bg-gradient-to-br from-mw-blue-400 to-mw-purple-500 rounded-full w-24 mx-auto"></div>
          </div>
          <div className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-mw-gray-900 dark:text-white">User Growth</h3>
            <div className="h-24 flex items-end space-x-1">
              {[40, 60, 45, 80, 65, 90, 75].map((height, i) => (
                <div key={i} className="bg-mw-blue-500 rounded-t" style={{ height: `${height}%`, width: '12px' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SalesDashboardPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Sales Dashboard</h2>
          <button className="bg-mw-blue-600 text-white px-4 py-2 rounded-lg text-sm">Add Lead</button>
        </div>
        
        {/* Sales Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <div className="text-sm text-green-600 dark:text-green-400">Monthly Revenue</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">$142,850</div>
            <div className="text-xs text-green-600">+15% from last month</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
            <div className="text-sm text-blue-600 dark:text-blue-400">Deals Closed</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">247</div>
            <div className="text-xs text-blue-600">+8% from last month</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
            <div className="text-sm text-purple-600 dark:text-purple-400">Conversion Rate</div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">18.4%</div>
            <div className="text-xs text-purple-600">+2.1% from last month</div>
          </div>
        </div>
        
        {/* Sales Pipeline */}
        <div className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-mw-gray-900 dark:text-white">Sales Pipeline</h3>
          <div className="flex space-x-3">
            {[
              { stage: 'Leads', count: 145, color: 'bg-gray-400' },
              { stage: 'Qualified', count: 89, color: 'bg-blue-400' },
              { stage: 'Proposal', count: 34, color: 'bg-yellow-400' },
              { stage: 'Closed', count: 12, color: 'bg-green-400' }
            ].map((stage, i) => (
              <div key={i} className="flex-1 text-center">
                <div className={`h-8 ${stage.color} rounded mb-2`}></div>
                <div className="text-sm font-medium text-mw-gray-900 dark:text-white">{stage.stage}</div>
                <div className="text-xs text-mw-gray-500">{stage.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectDashboardPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Project Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-mw-blue-500 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <span className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Team</span>
          </div>
        </div>
        
        {/* Project Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active Projects', value: '12' },
            { label: 'Completed Tasks', value: '84' },
            { label: 'In Progress', value: '23' },
            { label: 'Overdue', value: '3' }
          ].map((stat, i) => (
            <div key={i} className="bg-mw-gray-50 dark:bg-mw-gray-800 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-mw-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-mw-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Task Board */}
        <div className="grid grid-cols-3 gap-4">
          {['To Do', 'In Progress', 'Done'].map((column, i) => (
            <div key={i} className="bg-mw-gray-50 dark:bg-mw-gray-800 p-3 rounded-lg">
              <h3 className="font-semibold mb-3 text-mw-gray-900 dark:text-white text-sm">{column}</h3>
              <div className="space-y-2">
                {[1, 2].map((task) => (
                  <div key={task} className="bg-white dark:bg-mw-gray-700 p-2 rounded text-xs">
                    <div className="font-medium text-mw-gray-900 dark:text-white">Task {task}</div>
                    <div className="text-mw-gray-500 text-xs">Due: Aug {15 + task}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FinanceDashboardPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Financial Overview</h2>
          <select className="bg-mw-gray-100 dark:bg-mw-gray-700 text-mw-gray-900 dark:text-white px-3 py-1 rounded text-sm">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>
        
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-lg">
            <div className="text-sm text-emerald-600 dark:text-emerald-400">Total Balance</div>
            <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">$24,580.45</div>
            <div className="text-xs text-emerald-600">+$2,340 this month</div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg">
            <div className="text-sm text-red-600 dark:text-red-400">Monthly Expenses</div>
            <div className="text-3xl font-bold text-red-700 dark:text-red-300">$8,240.20</div>
            <div className="text-xs text-red-600">-$120 from last month</div>
          </div>
        </div>
        
        {/* Charts and Portfolio */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-mw-gray-900 dark:text-white">Expense Categories</h3>
            <div className="space-y-2">
              {[
                { category: 'Housing', amount: '$2,400', percent: 60 },
                { category: 'Food', amount: '$800', percent: 20 },
                { category: 'Transport', amount: '$600', percent: 15 },
                { category: 'Other', amount: '$200', percent: 5 }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-mw-gray-600 dark:text-mw-gray-300">{item.category}</span>
                  <span className="font-semibold text-mw-gray-900 dark:text-white">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-mw-gray-900 dark:text-white">Investment Portfolio</h3>
            <div className="space-y-2">
              {[
                { stock: 'AAPL', value: '$4,520', change: '+2.4%' },
                { stock: 'GOOGL', value: '$3,240', change: '+1.8%' },
                { stock: 'MSFT', value: '$2,890', change: '-0.5%' },
                { stock: 'TSLA', value: '$1,450', change: '+5.2%' }
              ].map((stock, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="font-medium text-mw-gray-900 dark:text-white">{stock.stock}</span>
                  <div className="text-right">
                    <div className="text-mw-gray-900 dark:text-white">{stock.value}</div>
                    <div className={stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>{stock.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LandingPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-mw-blue-600 to-mw-blue-700 text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Product Name</h1>
        <p className="text-mw-blue-100 mb-6">Revolutionary solution for modern problems</p>
        <div className="space-x-4">
          <button className="bg-white text-mw-blue-600 px-6 py-2 rounded-lg font-semibold">Get Started</button>
          <button className="border border-white text-white px-6 py-2 rounded-lg">Learn More</button>
        </div>
      </div>
      {/* Features */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {['Feature 1', 'Feature 2', 'Feature 3'].map((feature, i) => (
            <div key={i} className="text-center p-4">
              <div className="w-12 h-12 bg-mw-blue-100 dark:bg-mw-blue-900 rounded-full mx-auto mb-3"></div>
              <h3 className="font-semibold text-mw-gray-900 dark:text-white">{feature}</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Feature description</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EcommercePreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-mw-gray-200 dark:border-mw-gray-700">
          <h2 className="text-xl font-bold text-mw-gray-900 dark:text-white">Products</h2>
          <div className="text-sm text-mw-gray-500">Cart (3)</div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg p-3">
              <div className="aspect-square bg-mw-gray-200 dark:bg-mw-gray-700 rounded mb-2"></div>
              <div className="text-xs font-medium text-mw-gray-900 dark:text-white">Product {i}</div>
              <div className="text-xs text-mw-blue-600 font-semibold">${i * 10}.99</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BlogPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-2">Blog Title</h1>
          <p className="text-mw-gray-500">Published on August 14, 2025</p>
        </div>
        {/* Content */}
        <div className="space-y-4">
          <div className="h-4 bg-mw-gray-200 dark:bg-mw-gray-700 rounded w-full"></div>
          <div className="h-4 bg-mw-gray-200 dark:bg-mw-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-mw-gray-200 dark:bg-mw-gray-700 rounded w-4/6"></div>
          <div className="h-32 bg-mw-gray-100 dark:bg-mw-gray-800 rounded mb-4"></div>
          <div className="h-4 bg-mw-gray-200 dark:bg-mw-gray-700 rounded w-full"></div>
          <div className="h-4 bg-mw-gray-200 dark:bg-mw-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}

function AuthPreview() {
  return (
    <div className="w-full h-96 bg-mw-gray-50 dark:bg-mw-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="bg-white dark:bg-mw-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-mw-gray-900 dark:text-white mb-6">Sign In</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">Email</label>
            <div className="w-full h-10 bg-mw-gray-100 dark:bg-mw-gray-700 rounded border"></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">Password</label>
            <div className="w-full h-10 bg-mw-gray-100 dark:bg-mw-gray-700 rounded border"></div>
          </div>
          <button className="w-full bg-mw-blue-600 text-white py-2 rounded-lg">Sign In</button>
          <div className="text-center">
            <a href="#" className="text-sm text-mw-blue-600">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsPreview() {
  return (
    <div className="w-full h-96 bg-white dark:bg-mw-gray-900 rounded-lg overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-mw-gray-50 dark:bg-mw-gray-800 p-4 border-r border-mw-gray-200 dark:border-mw-gray-700">
          <div className="space-y-2">
            {['Profile', 'Account', 'Privacy', 'Notifications'].map((item, i) => (
              <div key={i} className={`text-sm py-2 px-3 rounded ${i === 0 ? 'bg-mw-blue-100 dark:bg-mw-blue-900 text-mw-blue-600' : 'text-mw-gray-600 dark:text-mw-gray-300'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-6">Profile Settings</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">First Name</label>
                <div className="w-full h-10 bg-mw-gray-100 dark:bg-mw-gray-700 rounded border"></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">Last Name</label>
                <div className="w-full h-10 bg-mw-gray-100 dark:bg-mw-gray-700 rounded border"></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">Email</label>
              <div className="w-full h-10 bg-mw-gray-100 dark:bg-mw-gray-700 rounded border"></div>
            </div>
            <button className="bg-mw-blue-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PatternPreviewModal({ pattern, isOpen, onClose }: {
  pattern: typeof layoutPatterns[0]
  isOpen: boolean
  onClose: () => void
}) {
  const previewComponents = {
    dashboard: DashboardPreview,
    'analytics-dashboard': AnalyticsDashboardPreview,
    'sales-dashboard': SalesDashboardPreview,
    'project-dashboard': ProjectDashboardPreview,
    'finance-dashboard': FinanceDashboardPreview,
    landing: LandingPreview,
    ecommerce: EcommercePreview,
    blog: BlogPreview,
    auth: AuthPreview,
    settings: SettingsPreview
  }

  const PreviewComponent = previewComponents[pattern.id as keyof typeof previewComponents]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalHeader>
        <div>
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
            {pattern.title} Preview
          </h2>
          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300 mt-1">
            {pattern.description}
          </p>
        </div>
      </ModalHeader>
      
      <ModalBody className="p-6">
        <div className="mb-6">
          {PreviewComponent && <PreviewComponent />}
        </div>
        
        {/* Pattern Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-3">Features</h3>
            <ul className="space-y-2">
              {pattern.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-mw-gray-600 dark:text-mw-gray-300">
                  <div className="w-1.5 h-1.5 bg-mw-blue-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {pattern.technologies.map((tech, index) => (
                <Badge key={index} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-2">Complexity</h3>
              <Badge className={
                pattern.complexity === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                pattern.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
              }>
                {pattern.complexity}
              </Badge>
            </div>
          </div>
        </div>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>
          <Code className="w-4 h-4 mr-2" />
          Get Code
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function PatternCard({ pattern, onPreview }: { 
  pattern: typeof layoutPatterns[0]
  onPreview: (pattern: typeof layoutPatterns[0]) => void
}) {
  const complexityColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-1">
              {pattern.title}
            </h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
              {pattern.category}
            </p>
          </div>
          <Badge className={complexityColors[pattern.complexity as keyof typeof complexityColors]}>
            {pattern.complexity}
          </Badge>
        </div>
        <p className="text-mw-gray-600 dark:text-mw-gray-300">
          {pattern.description}
        </p>
      </CardHeader>
      
      <CardContent>
        {/* Preview Placeholder */}
        <div 
          className="aspect-video bg-mw-gray-100 dark:bg-mw-gray-800 rounded-lg mb-4 flex items-center justify-center cursor-pointer hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700 transition-colors"
          onClick={() => onPreview(pattern)}
        >
          <Layout className="w-12 h-12 text-mw-gray-400" />
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Features</h4>
          <div className="flex flex-wrap gap-1">
            {pattern.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {pattern.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onPreview(pattern)}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" variant="outline">
            <Code className="w-4 h-4 mr-2" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PatternsPage() {
  const [selectedPattern, setSelectedPattern] = useState<typeof layoutPatterns[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePreview = (pattern: typeof layoutPatterns[0]) => {
    setSelectedPattern(pattern)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPattern(null)
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <PageHero
        title="Layout Patterns"
        description="Responsive layout patterns and templates that work across different screen sizes and devices. Build faster with proven design patterns."
        badge={{
          text: "10 Pattern Templates",
          variant: "info"
        }}
        stats={[
          { label: "Layout Patterns", value: "10" },
          { label: "Dashboard Types", value: "5" },
          { label: "Responsive", value: "100%" },
          { label: "Code Ready", value: "Yes" }
        ]}
      />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid Systems */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Grid Systems
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {gridSystems.map((grid, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                      {grid.name}
                    </h3>
                    <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-3">
                      {grid.description}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400">Usage:</span>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">{grid.usage}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400">Example:</span>
                        <code className="text-sm bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded text-mw-blue-600 dark:text-mw-blue-400 block mt-1">
                          {grid.example}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Layout Patterns */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                Layout Templates
              </h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {layoutPatterns.map((pattern) => (
                <PatternCard 
                  key={pattern.id} 
                  pattern={pattern} 
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </section>

          {/* Responsive Breakpoints */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Responsive Breakpoints
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 text-mw-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Mobile</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">0 - 640px</p>
                    <code className="text-xs bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded">sm:</code>
                  </div>
                  <div className="text-center">
                    <Tablet className="w-8 h-8 text-mw-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Tablet</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">641 - 1024px</p>
                    <code className="text-xs bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded">md:</code>
                  </div>
                  <div className="text-center">
                    <Monitor className="w-8 h-8 text-mw-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Desktop</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">1025 - 1280px</p>
                    <code className="text-xs bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded">lg:</code>
                  </div>
                  <div className="text-center">
                    <Monitor className="w-8 h-8 text-mw-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-mw-gray-900 dark:text-white">Large</h3>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">1281px+</p>
                    <code className="text-xs bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded">xl:</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </main>
      
      {/* Pattern Preview Modal */}
      {selectedPattern && (
        <PatternPreviewModal
          pattern={selectedPattern}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      
      <Footer />
    </div>
  )
}

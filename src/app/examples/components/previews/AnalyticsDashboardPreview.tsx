import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react'

export function AnalyticsDashboardPreview() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: '8,429',
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Orders',
      value: '1,429',
      change: '-2.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'text-orange-600'
    },
    {
      title: 'Page Views',
      value: '142,934',
      change: '+8.7%',
      trend: 'up',
      icon: Eye,
      color: 'text-purple-600'
    }
  ]

  const recentOrders = [
    { id: '#3425', customer: 'John Doe', amount: '$129.00', status: 'completed' },
    { id: '#3424', customer: 'Jane Smith', amount: '$89.50', status: 'pending' },
    { id: '#3423', customer: 'Bob Johnson', amount: '$249.99', status: 'completed' },
    { id: '#3422', customer: 'Alice Brown', amount: '$179.00', status: 'processing' }
  ]

  const statusColors = {
    completed: 'success',
    pending: 'warning',
    processing: 'primary'
  } as const

  return (
    <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-mw-gray-600 dark:text-mw-gray-300">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-opacity-10 ${stat.color}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts and Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Monthly revenue trend</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-mw-primary-50 to-mw-secondary-50 dark:from-mw-primary-900/20 dark:to-mw-secondary-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-mw-gray-500 dark:text-mw-gray-400">
                  <div className="text-lg font-medium mb-2">Revenue Chart</div>
                  <p className="text-sm">Interactive chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Recent Orders</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Latest customer orders</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-mw-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-mw-gray-900 dark:text-white">{order.amount}</p>
                      <Badge variant={statusColors[order.status as keyof typeof statusColors]} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Metrics */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Goal Progress</h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Track your monthly goals</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Sales Target</span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">User Growth</span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Revenue Goal</span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

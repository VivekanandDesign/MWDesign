import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Table } from '@/components/ui/Table'
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Star,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react'

export function EcommerceDashboardPreview() {
  const salesData = [
    { period: 'Today', sales: '$1,429', orders: 23, conversion: '3.2%' },
    { period: 'This Week', sales: '$8,247', orders: 147, conversion: '3.8%' },
    { period: 'This Month', sales: '$28,439', orders: 542, conversion: '4.1%' }
  ]

  const topProducts = [
    { 
      name: 'Wireless Headphones Pro', 
      sales: 245, 
      revenue: '$12,250', 
      stock: 45,
      rating: 4.8,
      image: 'WH'
    },
    { 
      name: 'Smart Watch Series X', 
      sales: 189, 
      revenue: '$18,900', 
      stock: 23,
      rating: 4.6,
      image: 'SW'
    },
    { 
      name: 'Gaming Mouse Ultra', 
      sales: 167, 
      revenue: '$8,350', 
      stock: 67,
      rating: 4.9,
      image: 'GM'
    },
    { 
      name: 'Bluetooth Speaker Mini', 
      sales: 134, 
      revenue: '$6,700', 
      stock: 12,
      rating: 4.4,
      image: 'BS'
    }
  ]

  const recentOrders = [
    {
      id: '#ORD-2445',
      customer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      amount: '$329.00',
      status: 'completed',
      date: '2 min ago'
    },
    {
      id: '#ORD-2444',
      customer: 'Mike Chen',
      email: 'mike.c@email.com',
      amount: '$159.50',
      status: 'processing',
      date: '5 min ago'
    },
    {
      id: '#ORD-2443',
      customer: 'Emily Davis',
      email: 'emily.d@email.com',
      amount: '$89.99',
      status: 'shipped',
      date: '12 min ago'
    },
    {
      id: '#ORD-2442',
      customer: 'Alex Kumar',
      email: 'alex.k@email.com',
      amount: '$249.00',
      status: 'pending',
      date: '18 min ago'
    }
  ]

  const statusColors = {
    completed: 'success',
    processing: 'primary',
    shipped: 'secondary',
    pending: 'warning',
    cancelled: 'error'
  } as const

  const getStockStatus = (stock: number) => {
    if (stock > 50) return { label: 'In Stock', color: 'success' }
    if (stock > 20) return { label: 'Low Stock', color: 'warning' }
    return { label: 'Critical', color: 'error' }
  }

  return (
    <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-mw-gray-900 dark:text-white">E-commerce Dashboard</h1>
            <p className="text-mw-gray-600 dark:text-mw-gray-300">Monitor your store performance and manage orders</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Sales Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salesData.map((data, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-2">
                    {data.period}
                  </h3>
                  <div className="text-3xl font-bold text-mw-primary-600 mb-1">
                    {data.sales}
                  </div>
                  <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-x-4">
                    <span>{data.orders} orders</span>
                    <span>{data.conversion} conversion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Products */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Top Products</h3>
                  <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Best performing products this month</p>
                </div>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12 bg-mw-primary-100 dark:bg-mw-primary-900">
                        <span className="text-mw-primary-700 dark:text-mw-primary-300 font-semibold">
                          {product.image}
                        </span>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-mw-gray-900 dark:text-white">
                          {product.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-mw-gray-600 dark:text-mw-gray-300">
                          <span>{product.sales} sales</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            {product.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-mw-gray-900 dark:text-white">
                        {product.revenue}
                      </div>
                      <Badge 
                        variant={getStockStatus(product.stock).color as any} 
                        className="text-xs"
                      >
                        {getStockStatus(product.stock).label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Quick Stats</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-mw-primary-50 to-mw-primary-100 dark:from-mw-primary-900/20 dark:to-mw-primary-800/20 rounded-lg">
                <ShoppingCart className="w-8 h-8 text-mw-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-mw-primary-700 dark:text-mw-primary-300">
                  1,429
                </div>
                <div className="text-sm text-mw-primary-600 dark:text-mw-primary-400">
                  Total Orders
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-mw-secondary-50 to-mw-secondary-100 dark:from-mw-secondary-900/20 dark:to-mw-secondary-800/20 rounded-lg">
                <Package className="w-8 h-8 text-mw-secondary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-mw-secondary-700 dark:text-mw-secondary-300">
                  89
                </div>
                <div className="text-sm text-mw-secondary-600 dark:text-mw-secondary-400">
                  Products
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-mw-flow-50 to-mw-flow-100 dark:from-mw-flow-900/20 dark:to-mw-flow-800/20 rounded-lg">
                <Users className="w-8 h-8 text-mw-flow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-mw-flow-700 dark:text-mw-flow-300">
                  2,340
                </div>
                <div className="text-sm text-mw-flow-600 dark:text-mw-flow-400">
                  Customers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Recent Orders</h3>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Latest customer orders and status</p>
              </div>
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-mw-gray-200 dark:border-mw-gray-700">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300">Order ID</th>
                    <th className="pb-3 text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300">Customer</th>
                    <th className="pb-3 text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300">Amount</th>
                    <th className="pb-3 text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300">Status</th>
                    <th className="pb-3 text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300">Time</th>
                    <th className="pb-3 text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mw-gray-200 dark:divide-mw-gray-700">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 transition-colors">
                      <td className="py-4 text-sm font-medium text-mw-gray-900 dark:text-white">
                        {order.id}
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="text-sm font-medium text-mw-gray-900 dark:text-white">
                            {order.customer}
                          </div>
                          <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                            {order.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm font-medium text-mw-gray-900 dark:text-white">
                        {order.amount}
                      </td>
                      <td className="py-4">
                        <Badge variant={statusColors[order.status as keyof typeof statusColors]} className="text-xs">
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        {order.date}
                      </td>
                      <td className="py-4">
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

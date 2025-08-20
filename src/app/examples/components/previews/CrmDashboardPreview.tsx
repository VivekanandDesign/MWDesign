import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { 
  Users, 
  Target, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  Building,
  DollarSign,
  Clock,
  Plus
} from 'lucide-react'

export function CrmDashboardPreview() {
  const salesMetrics = [
    {
      label: 'Total Revenue',
      value: '$247,580',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'positive'
    },
    {
      label: 'Active Leads',
      value: '1,429',
      change: '+8.2%',
      icon: Target,
      trend: 'positive'
    },
    {
      label: 'Conversion Rate',
      value: '24.8%',
      change: '-2.1%',
      icon: TrendingUp,
      trend: 'negative'
    },
    {
      label: 'Pipeline Value',
      value: '$1.2M',
      change: '+15.3%',
      icon: Building,
      trend: 'positive'
    }
  ]

  const recentActivities = [
    {
      type: 'call',
      customer: 'Alice Thompson',
      company: 'TechFlow Inc.',
      action: 'Scheduled demo call',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      type: 'email',
      customer: 'David Wilson',
      company: 'StartupXYZ',
      action: 'Sent proposal',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      type: 'meeting',
      customer: 'Sarah Chen',
      company: 'Global Corp',
      action: 'Meeting completed',
      time: '6 hours ago',
      priority: 'high'
    },
    {
      type: 'call',
      customer: 'Mike Rodriguez',
      company: 'Innovation Labs',
      action: 'Follow-up call',
      time: '1 day ago',
      priority: 'low'
    }
  ]

  const topDeals = [
    {
      company: 'Enterprise Solutions Ltd',
      contact: 'John Smith',
      value: '$125,000',
      stage: 'Negotiation',
      probability: 85,
      closeDate: '2024-02-15'
    },
    {
      company: 'Digital Dynamics',
      contact: 'Lisa Wang',
      value: '$89,500',
      stage: 'Proposal',
      probability: 65,
      closeDate: '2024-02-28'
    },
    {
      company: 'Future Tech Systems',
      contact: 'Robert Brown',
      value: '$156,000',
      stage: 'Demo',
      probability: 45,
      closeDate: '2024-03-10'
    },
    {
      company: 'Smart Solutions Inc',
      contact: 'Maria Garcia',
      value: '$78,200',
      stage: 'Qualified',
      probability: 30,
      closeDate: '2024-03-20'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone
      case 'email': return Mail
      case 'meeting': return Calendar
      default: return Clock
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'secondary'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Negotiation': return 'success'
      case 'Proposal': return 'primary'
      case 'Demo': return 'secondary'
      case 'Qualified': return 'warning'
      default: return 'secondary'
    }
  }

  return (
    <div className="p-6 bg-mw-gray-50 dark:bg-mw-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-mw-gray-900 dark:text-white">CRM Dashboard</h1>
            <p className="text-mw-gray-600 dark:text-mw-gray-300">Manage your sales pipeline and customer relationships</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-mw-primary-100 dark:bg-mw-primary-900/30 rounded-lg">
                      <IconComponent className="w-5 h-5 text-mw-primary-600 dark:text-mw-primary-400" />
                    </div>
                    <Badge 
                      variant={metric.trend === 'positive' ? 'success' : 'error'} 
                      className="text-xs"
                    >
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300 mb-1">
                    {metric.label}
                  </h3>
                  <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Deals */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Top Deals</h3>
                  <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">High-value opportunities in your pipeline</p>
                </div>
                <Button variant="outline" size="sm">
                  View Pipeline
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDeals.map((deal, index) => (
                  <div key={index} className="p-4 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-mw-gray-900 dark:text-white">
                          {deal.company}
                        </h4>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                          Contact: {deal.contact}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-mw-gray-900 dark:text-white">
                          {deal.value}
                        </div>
                        <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                          Close: {deal.closeDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={getStageColor(deal.stage) as any} className="text-xs">
                        {deal.stage}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                          {deal.probability}% probability
                        </span>
                        <div className="w-20">
                          <Progress value={deal.probability} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Recent Activities</h3>
                  <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Latest customer interactions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type)
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-1.5 bg-mw-primary-100 dark:bg-mw-primary-900/30 rounded-full">
                        <IconComponent className="w-3 h-3 text-mw-primary-600 dark:text-mw-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-mw-gray-900 dark:text-white truncate">
                            {activity.customer}
                          </p>
                          <Badge 
                            variant={getPriorityColor(activity.priority) as any} 
                            className="text-xs ml-2"
                          >
                            {activity.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400 mb-1">
                          {activity.company}
                        </p>
                        <p className="text-xs text-mw-gray-500 dark:text-mw-gray-500">
                          {activity.action}
                        </p>
                        <p className="text-xs text-mw-gray-400 dark:text-mw-gray-600 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Funnel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Sales Funnel</h3>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Lead progression through your sales pipeline</p>
              </div>
              <Button variant="outline" size="sm">
                Detailed Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { stage: 'Leads', count: 2340, value: '$3.2M', color: 'mw-gray' },
                { stage: 'Qualified', count: 892, value: '$2.1M', color: 'mw-primary' },
                { stage: 'Demo', count: 345, value: '$1.4M', color: 'mw-secondary' },
                { stage: 'Proposal', count: 156, value: '$890K', color: 'mw-flow' },
                { stage: 'Closed', count: 89, value: '$420K', color: 'green' }
              ].map((stage, index) => (
                <div key={index} className="text-center p-4 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-mw-gray-600 dark:text-mw-gray-300 mb-2">
                    {stage.stage}
                  </h4>
                  <div className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-1">
                    {stage.count}
                  </div>
                  <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                    {stage.value}
                  </div>
                  <div className="mt-3">
                    <Progress 
                      value={(stage.count / 2340) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

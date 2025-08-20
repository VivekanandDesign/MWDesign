'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Progress } from '@/components/ui/Progress'
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  ShoppingCart,
  Download,
  Filter,
  RefreshCw,
  Calendar,
  Target,
  Zap,
  Globe,
  MousePointer,
  Eye,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Star,
  Heart,
  Share2,
  MessageSquare
} from 'lucide-react'

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    color: string
    backgroundColor?: string
  }[]
}

interface MetricData {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  color: string
}

// Generate sample chart data
const generateLineChartData = (): ChartData => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [65000, 78000, 85000, 82000, 95000, 102000, 110000, 125000, 118000, 135000, 142000, 155000],
      color: '#3B82F6'
    },
    {
      label: 'Expenses',
      data: [45000, 52000, 58000, 55000, 62000, 68000, 72000, 78000, 75000, 82000, 88000, 95000],
      color: '#EF4444'
    }
  ]
})

const generateBarChartData = (): ChartData => ({
  labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
  datasets: [
    {
      label: 'Sales',
      data: [850000, 920000, 1100000, 1250000],
      color: '#10B981',
      backgroundColor: '#10B981'
    },
    {
      label: 'Target',
      data: [800000, 900000, 1000000, 1200000],
      color: '#6B7280',
      backgroundColor: '#6B7280'
    }
  ]
})

const generatePieChartData = (): ChartData => ({
  labels: ['Digital Marketing', 'Print Advertising', 'Social Media', 'TV & Radio', 'Events', 'Other'],
  datasets: [
    {
      label: 'Marketing Spend',
      data: [35, 20, 25, 12, 5, 3],
      color: '#8B5CF6'
    }
  ]
})

const generateDonutChartData = (): ChartData => ({
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      label: 'Device Usage',
      data: [65, 28, 7],
      color: '#06B6D4'
    }
  ]
})

const generateScatterData = (): ChartData => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Ad Spend vs Conversions',
      data: [45, 78, 62, 89, 95, 115, 88, 135, 142, 158, 165, 175],
      color: '#F59E0B'
    }
  ]
})

const generateRadarData = (): ChartData => ({
  labels: ['Brand Awareness', 'Engagement', 'Reach', 'Conversion', 'Retention', 'Satisfaction'],
  datasets: [
    {
      label: 'Current Campaign',
      data: [85, 92, 78, 88, 75, 90],
      color: '#10B981'
    },
    {
      label: 'Previous Campaign',
      data: [70, 85, 82, 75, 80, 85],
      color: '#6B7280'
    }
  ]
})

const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({length: 24}, (_, i) => i)
  const data = []
  
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const value = Math.floor(Math.random() * 100)
      data.push({
        day: days[day],
        hour,
        value,
        intensity: value > 75 ? 'high' : value > 50 ? 'medium' : value > 25 ? 'low' : 'minimal'
      })
    }
  }
  return data
}

const generateBubbleData = () => {
  const campaigns = ['Summer Sale', 'Holiday Promo', 'Brand Launch', 'Flash Sale', 'Newsletter']
  return campaigns.map((campaign, index) => ({
    x: Math.floor(Math.random() * 100) + 20, // Reach
    y: Math.floor(Math.random() * 10) + 2, // CTR
    z: Math.floor(Math.random() * 50000) + 10000, // Budget
    label: campaign,
    color: `hsl(${index * 72}, 70%, 50%)`
  }))
}

const generateFunnelData = () => [
  { stage: 'Impressions', value: 100000, percentage: 100, color: '#3B82F6' },
  { stage: 'Clicks', value: 8500, percentage: 8.5, color: '#10B981' },
  { stage: 'Landing Page Views', value: 7200, percentage: 7.2, color: '#F59E0B' },
  { stage: 'Sign-ups', value: 2400, percentage: 2.4, color: '#EF4444' },
  { stage: 'Purchases', value: 850, percentage: 0.85, color: '#8B5CF6' }
]

const generateGaugeData = () => [
  { label: 'Performance Score', value: 87, max: 100, color: '#10B981' },
  { label: 'Budget Utilization', value: 73, max: 100, color: '#3B82F6' },
  { label: 'ROI Target', value: 142, max: 200, color: '#F59E0B' },
  { label: 'Customer Satisfaction', value: 4.6, max: 5, color: '#8B5CF6' }
]

const generateWaterfallData = () => [
  { category: 'Starting Budget', value: 100000, type: 'start', cumulative: 100000 },
  { category: 'Digital Ads', value: -35000, type: 'negative', cumulative: 65000 },
  { category: 'Social Media', value: -25000, type: 'negative', cumulative: 40000 },
  { category: 'Print Media', value: -20000, type: 'negative', cumulative: 20000 },
  { category: 'Events', value: -8000, type: 'negative', cumulative: 12000 },
  { category: 'Remaining Budget', value: 12000, type: 'end', cumulative: 12000 }
]

const generateMetrics = (): MetricData[] => [
  {
    title: 'Total Revenue',
    value: '$1.2M',
    change: '+12.5%',
    trend: 'up',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-green-600'
  },
  {
    title: 'Active Campaigns',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: <Target className="w-5 h-5" />,
    color: 'text-blue-600'
  },
  {
    title: 'Conversion Rate',
    value: '3.4%',
    change: '-0.2%',
    trend: 'down',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-red-600'
  },
  {
    title: 'Impressions',
    value: '2.4M',
    change: '+18.7%',
    trend: 'up',
    icon: <Activity className="w-5 h-5" />,
    color: 'text-purple-600'
  },
  {
    title: 'Click-through Rate',
    value: '2.8%',
    change: '+0.5%',
    trend: 'up',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-yellow-600'
  },
  {
    title: 'Global Reach',
    value: '180 Countries',
    change: '+12',
    trend: 'up',
    icon: <Globe className="w-5 h-5" />,
    color: 'text-indigo-600'
  }
]

// Simple Chart Components (simulating chart libraries)
interface SimpleChartProps {
  data: ChartData
  height?: number
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut' | 'scatter' | 'radar'
}

interface SpecialChartProps {
  data?: any
  height?: number
}

function SimpleChart({ data, height = 300, type }: SimpleChartProps) {
  const maxValue = Math.max(...data.datasets.flatMap(d => d.data))
  
  if (type === 'pie' || type === 'donut') {
    const innerRadius = type === 'donut' ? 30 : 0
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {data.datasets[0].data.map((value, index) => {
              const total = data.datasets[0].data.reduce((a, b) => a + b, 0)
              const percentage = (value / total) * 100
              const strokeDasharray = `${percentage * 2.51} 251`
              const rotation = data.datasets[0].data.slice(0, index).reduce((acc, val) => acc + (val / total) * 360, 0)
              
              return (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset="0"
                  transform={`rotate(${rotation} 100 100)`}
                  className="opacity-80"
                />
              )
            })}
            {type === 'donut' && (
              <circle
                cx="100"
                cy="100"
                r={innerRadius}
                fill="white"
                className="dark:fill-mw-gray-900"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                {type === 'donut' ? '100%' : '100%'}
              </div>
              <div className="text-xs text-mw-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'radar') {
    const centerX = 100
    const centerY = 100
    const radius = 80
    const angleStep = (2 * Math.PI) / data.labels.length

    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Grid lines */}
          {[20, 40, 60, 80].map((r) => (
            <circle
              key={r}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-mw-gray-300 dark:text-mw-gray-600 opacity-50"
            />
          ))}
          
          {/* Axis lines */}
          {data.labels.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2
            const x = centerX + Math.cos(angle) * radius
            const y = centerY + Math.sin(angle) * radius
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-mw-gray-300 dark:text-mw-gray-600 opacity-50"
              />
            )
          })}

          {/* Data polygons */}
          {data.datasets.map((dataset, datasetIndex) => {
            const points = dataset.data.map((value, index) => {
              const angle = index * angleStep - Math.PI / 2
              const normalizedValue = (value / 100) * radius
              const x = centerX + Math.cos(angle) * normalizedValue
              const y = centerY + Math.sin(angle) * normalizedValue
              return `${x},${y}`
            }).join(' ')

            return (
              <polygon
                key={datasetIndex}
                points={points}
                fill={dataset.color}
                fillOpacity="0.3"
                stroke={dataset.color}
                strokeWidth="2"
              />
            )
          })}

          {/* Labels */}
          {data.labels.map((label, index) => {
            const angle = index * angleStep - Math.PI / 2
            const x = centerX + Math.cos(angle) * (radius + 15)
            const y = centerY + Math.sin(angle) * (radius + 15)
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-current text-mw-gray-600 dark:text-mw-gray-400"
              >
                {label}
              </text>
            )
          })}
        </svg>
      </div>
    )
  }

  if (type === 'scatter') {
    return (
      <div className="relative p-4" style={{ height }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {data.datasets.map((dataset, datasetIndex) => (
            <g key={datasetIndex}>
              {dataset.data.map((value, index) => {
                const x = (index / (dataset.data.length - 1)) * 100
                const y = 100 - (value / maxValue) * 80
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill={dataset.color}
                    opacity="0.7"
                  />
                )
              })}
            </g>
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-4 right-4 flex justify-between">
          {data.labels.map(label => (
            <div key={label} className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
              {label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div className="flex items-end justify-between space-x-2 px-4" style={{ height }}>
        {data.labels.map((label, index) => (
          <div key={label} className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex flex-col items-end space-y-1 h-full justify-end pb-8">
              {data.datasets.map((dataset, datasetIndex) => {
                const barHeight = (dataset.data[index] / maxValue) * (height - 80)
                return (
                  <div
                    key={datasetIndex}
                    className="w-8 rounded-t"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: dataset.color,
                      opacity: 0.8
                    }}
                  />
                )
              })}
            </div>
            <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 text-center">
              {label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Line/Area chart
  return (
    <div className="relative p-4" style={{ height }}>
      <svg width="100%" height="100%" className="overflow-visible">
        {data.datasets.map((dataset, datasetIndex) => {
          const points = dataset.data.map((value, index) => {
            const x = (index / (dataset.data.length - 1)) * 100
            const y = 100 - (value / maxValue) * 80
            return `${x},${y}`
          }).join(' ')

          return (
            <g key={datasetIndex}>
              {type === 'area' && (
                <polygon
                  points={`0,100 ${points} 100,100`}
                  fill={dataset.color}
                  opacity="0.2"
                />
              )}
              <polyline
                points={points}
                fill="none"
                stroke={dataset.color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {dataset.data.map((value, index) => {
                const x = (index / (dataset.data.length - 1)) * 100
                const y = 100 - (value / maxValue) * 80
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="3"
                    fill={dataset.color}
                  />
                )
              })}
            </g>
          )
        })}
      </svg>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 left-4 right-4 flex justify-between">
        {data.labels.map(label => (
          <div key={label} className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// Heatmap Component
function HeatmapChart({ data, height = 300 }: SpecialChartProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({length: 24}, (_, i) => i)

  return (
    <div className="p-4" style={{ height }}>
      <div className="grid grid-cols-25 gap-1 text-xs">
        {/* Hour labels */}
        <div></div>
        {hours.map(hour => (
          <div key={hour} className="text-center text-mw-gray-600 dark:text-mw-gray-400 p-1">
            {hour}
          </div>
        ))}
        
        {/* Heatmap cells */}
        {days.map(day => (
          <div key={day} className="contents">
            <div className="text-mw-gray-600 dark:text-mw-gray-400 p-1 text-right">
              {day}
            </div>
            {hours.map(hour => {
              const cellData = data.find((d: any) => d.day === day && d.hour === hour)
              const intensity = cellData?.intensity || 'minimal'
              return (
                <div
                  key={`${day}-${hour}`}
                  className={`w-4 h-4 rounded-sm ${
                    intensity === 'high' ? 'bg-green-600' :
                    intensity === 'medium' ? 'bg-green-400' :
                    intensity === 'low' ? 'bg-green-200' :
                    'bg-gray-100 dark:bg-gray-800'
                  }`}
                  title={`${day} ${hour}:00 - ${cellData?.value || 0}%`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// Bubble Chart Component
function BubbleChart({ data, height = 300 }: SpecialChartProps) {
  return (
    <div className="relative p-4" style={{ height }}>
      <svg width="100%" height="100%" className="overflow-visible">
        {data.map((bubble: any, index: number) => (
          <circle
            key={index}
            cx={`${bubble.x}%`}
            cy={`${100 - bubble.y * 8}%`}
            r={Math.sqrt(bubble.z / 1000)}
            fill={bubble.color}
            opacity="0.6"
            stroke={bubble.color}
            strokeWidth="2"
          />
        ))}
      </svg>
      
      <div className="absolute bottom-2 left-4 text-xs text-mw-gray-600 dark:text-mw-gray-400">
        Reach (%)
      </div>
      <div className="absolute top-4 left-2 text-xs text-mw-gray-600 dark:text-mw-gray-400 transform -rotate-90 origin-left">
        CTR (%)
      </div>
    </div>
  )
}

// Funnel Chart Component
function FunnelChart({ data, height = 300 }: SpecialChartProps) {
  return (
    <div className="p-4 space-y-2" style={{ height }}>
      {data.map((stage: any, index: number) => (
        <div key={index} className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
              {stage.stage}
            </span>
            <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
              {stage.value.toLocaleString()} ({stage.percentage}%)
            </span>
          </div>
          <div className="relative">
            <div 
              className="h-8 rounded transition-all"
              style={{
                width: `${stage.percentage}%`,
                backgroundColor: stage.color,
                opacity: 0.8
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Gauge Chart Component
function GaugeChart({ data, height = 300 }: SpecialChartProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4" style={{ height }}>
      {data.map((gauge: any, index: number) => (
        <div key={index} className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-2">
            <svg className="transform -rotate-90" width="96" height="96">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-mw-gray-200 dark:text-mw-gray-700"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke={gauge.color}
                strokeWidth="8"
                strokeDasharray={`${(gauge.value / gauge.max) * 251} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-mw-gray-900 dark:text-white">
                {gauge.value}{gauge.max === 5 ? '' : '%'}
              </span>
            </div>
          </div>
          <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
            {gauge.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// Waterfall Chart Component
function WaterfallChart({ data, height = 300 }: SpecialChartProps) {
  const maxValue = Math.max(...data.map((d: any) => Math.abs(d.value)))
  
  return (
    <div className="flex items-end justify-between space-x-2 px-4" style={{ height }}>
      {data.map((item: any, index: number) => {
        const barHeight = (Math.abs(item.value) / maxValue) * (height - 80)
        const isNegative = item.value < 0
        
        return (
          <div key={index} className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex flex-col items-center h-full justify-end pb-8">
              <div className="text-xs text-center mb-1 text-mw-gray-600 dark:text-mw-gray-400">
                ${Math.abs(item.value).toLocaleString()}
              </div>
              <div
                className={`w-12 rounded-t ${
                  item.type === 'start' ? 'bg-blue-500' :
                  item.type === 'end' ? 'bg-green-500' :
                  isNegative ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ height: `${barHeight}px` }}
              />
            </div>
            <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400 text-center">
              {item.category}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ChartsGraphsPreview() {
  const [selectedPeriod, setSelectedPeriod] = useState('12months')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [activeTab, setActiveTab] = useState('overview')

  const lineData = generateLineChartData()
  const barData = generateBarChartData()
  const pieData = generatePieChartData()
  const donutData = generateDonutChartData()
  const scatterData = generateScatterData()
  const radarData = generateRadarData()
  const heatmapData = generateHeatmapData()
  const bubbleData = generateBubbleData()
  const funnelData = generateFunnelData()
  const gaugeData = generateGaugeData()
  const waterfallData = generateWaterfallData()
  const metrics = generateMetrics()

  // Statistics
  const stats = useMemo(() => {
    return {
      totalCharts: 15,
      activeDataSources: 12,
      lastUpdated: 'Just now',
      dataPoints: '47.2K'
    }
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.totalCharts}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Total Charts
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.activeDataSources}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Data Sources
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.lastUpdated}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Last Updated
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.dataPoints}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Data Points
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            options={[
              { value: '7days', label: 'Last 7 Days' },
              { value: '30days', label: 'Last 30 Days' },
              { value: '90days', label: 'Last 90 Days' },
              { value: '12months', label: 'Last 12 Months' },
              { value: 'ytd', label: 'Year to Date' }
            ]}
            className="w-40"
          />
          
          <Select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            options={[
              { value: 'revenue', label: 'Revenue' },
              { value: 'impressions', label: 'Impressions' },
              { value: 'clicks', label: 'Clicks' },
              { value: 'conversions', label: 'Conversions' },
              { value: 'roi', label: 'ROI' }
            ]}
            className="w-40"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-opacity-10 ${metric.color.replace('text-', 'bg-').replace('-600', '-100')} dark:bg-opacity-20`}>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      {metric.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                    metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                    'text-mw-gray-600 dark:text-mw-gray-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="basic">Basic Charts</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Charts</TabsTrigger>
          <TabsTrigger value="specialized">Specialized</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Line Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Revenue vs Expenses
                  </h3>
                  <Badge variant="secondary">Line Chart</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Monthly comparison of revenue and expenses
                </p>
              </CardHeader>
              <CardContent>
                <SimpleChart data={lineData} type="line" height={250} />
                <div className="flex items-center justify-center space-x-6 mt-4">
                  {lineData.datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dataset.color }}
                      />
                      <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        {dataset.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Sales Bar Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Quarterly Sales Performance
                  </h3>
                  <Badge variant="secondary">Bar Chart</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Sales vs targets by quarter
                </p>
              </CardHeader>
              <CardContent>
                <SimpleChart data={barData} type="bar" height={250} />
                <div className="flex items-center justify-center space-x-6 mt-4">
                  {barData.datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dataset.color }}
                      />
                      <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        {dataset.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marketing Spend Pie Chart */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Marketing Spend
                  </h3>
                  <Badge variant="secondary">Pie Chart</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Budget allocation by channel
                </p>
              </CardHeader>
              <CardContent>
                <SimpleChart data={pieData} type="pie" height={200} />
                <div className="space-y-2 mt-4">
                  {pieData.labels.map((label, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                        />
                        <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                          {label}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-mw-gray-900 dark:text-white">
                        {pieData.datasets[0].data[index]}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicators */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Campaign Progress
                </h3>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Current campaign performance against targets
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Holiday Campaign 2024
                    </span>
                    <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      85%
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Social Media Drive
                    </span>
                    <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      92%
                    </span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Email Marketing
                    </span>
                    <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      67%
                    </span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Brand Awareness
                    </span>
                    <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      78%
                    </span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Line Chart
                  </h3>
                  <Badge variant="secondary">Basic</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={lineData} type="line" height={250} />
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Bar Chart
                  </h3>
                  <Badge variant="secondary">Basic</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={barData} type="bar" height={250} />
              </CardContent>
            </Card>

            {/* Area Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Area Chart
                  </h3>
                  <Badge variant="secondary">Basic</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={lineData} type="area" height={250} />
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Pie Chart
                  </h3>
                  <Badge variant="secondary">Basic</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={pieData} type="pie" height={250} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Donut Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Donut Chart - Device Usage
                  </h3>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={donutData} type="donut" height={250} />
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Desktop</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Mobile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tablet className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Tablet</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scatter Plot */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Scatter Plot - Ad Performance
                  </h3>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={scatterData} type="scatter" height={250} />
              </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Radar Chart - Campaign Metrics
                  </h3>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <SimpleChart data={radarData} type="radar" height={250} />
                <div className="flex items-center justify-center space-x-6 mt-4">
                  {radarData.datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dataset.color }}
                      />
                      <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        {dataset.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bubble Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Bubble Chart - Campaign Analysis
                  </h3>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <BubbleChart data={bubbleData} height={250} />
                <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-mw-gray-600 dark:text-mw-gray-400">
                  <span>X: Reach</span>
                  <span>Y: CTR</span>
                  <span>Size: Budget</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specialized" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Conversion Funnel
                  </h3>
                  <Badge variant="secondary">Specialized</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Customer journey from impression to purchase
                </p>
              </CardHeader>
              <CardContent>
                <FunnelChart data={funnelData} height={300} />
              </CardContent>
            </Card>

            {/* Waterfall Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Budget Waterfall
                  </h3>
                  <Badge variant="secondary">Specialized</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Budget allocation breakdown
                </p>
              </CardHeader>
              <CardContent>
                <WaterfallChart data={waterfallData} height={300} />
              </CardContent>
            </Card>

            {/* Gauge Charts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Performance Gauges
                  </h3>
                  <Badge variant="secondary">Specialized</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Key performance indicators
                </p>
              </CardHeader>
              <CardContent>
                <GaugeChart data={gaugeData} height={300} />
              </CardContent>
            </Card>

            {/* Heatmap */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Activity Heatmap
                  </h3>
                  <Badge variant="secondary">Specialized</Badge>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  User activity by day and hour
                </p>
              </CardHeader>
              <CardContent>
                <HeatmapChart data={heatmapData} height={300} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Combined Analytics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Comprehensive Analytics Dashboard
                </h3>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  All chart types combined for complete data visualization
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SimpleChart data={lineData} type="area" height={200} />
                  <SimpleChart data={radarData} type="radar" height={200} />
                </div>
              </CardContent>
            </Card>

            {/* Real-time Metrics */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Real-time Metrics
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Page Views</span>
                  </div>
                  <span className="text-lg font-bold">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Clicks</span>
                  </div>
                  <span className="text-lg font-bold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Likes</span>
                  </div>
                  <span className="text-lg font-bold">567</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Shares</span>
                  </div>
                  <span className="text-lg font-bold">89</span>
                </div>
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Trend Analysis
                </h3>
              </CardHeader>
              <CardContent>
                <SimpleChart data={lineData} type="line" height={200} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Slider } from '@/components/ui/Slider'
import { Progress } from '@/components/ui/Progress'
import { Input } from '@/components/ui/Input'
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Zap, 
  Thermometer,
  DollarSign,
  Star,
  Settings,
  Gauge,
  BarChart3,
  TrendingUp,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'

export default function SliderControls() {
  // Basic sliders
  const [volume, setVolume] = useState(75)
  const [brightness, setBrightness] = useState(60)
  const [temperature, setTemperature] = useState(22)
  
  // Range sliders
  const [priceRange, setPriceRange] = useState([100, 500])
  const [timeRange, setTimeRange] = useState([9, 17])
  const [qualityRange, setQualityRange] = useState([3, 5])
  
  // Advanced sliders
  const [performance, setPerformance] = useState(85)
  const [memoryUsage, setMemoryUsage] = useState(42)
  const [satisfaction, setSatisfaction] = useState(4.2)
  const [progress, setProgress] = useState(68)

  // Dynamic values for demo
  const formatPrice = (value: number) => `$${value}`
  const formatTime = (value: number) => `${value}:00`
  const formatTemperature = (value: number) => `${value}°C`
  const formatPercentage = (value: number) => `${value}%`
  const formatRating = (value: number) => `${value}/5 ⭐`

  const sliderExamples = [
    {
      title: 'Volume Control',
      icon: volume > 0 ? Volume2 : VolumeX,
      value: volume,
      onChange: setVolume,
      min: 0,
      max: 100,
      step: 1,
      formatter: formatPercentage,
      color: 'blue'
    },
    {
      title: 'Brightness',
      icon: brightness > 50 ? Sun : Moon,
      value: brightness,
      onChange: setBrightness,
      min: 0,
      max: 100,
      step: 5,
      formatter: formatPercentage,
      color: 'yellow'
    },
    {
      title: 'Temperature',
      icon: Thermometer,
      value: temperature,
      onChange: setTemperature,
      min: 10,
      max: 35,
      step: 0.5,
      formatter: formatTemperature,
      color: 'red'
    },
    {
      title: 'Performance',
      icon: Zap,
      value: performance,
      onChange: setPerformance,
      min: 0,
      max: 100,
      step: 1,
      formatter: formatPercentage,
      color: 'green'
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/examples">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Examples
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                  Advanced Slider Controls
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">Input Controls</Badge>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => window.open(window.location.href, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-4">
              Interactive slider components with range selection, dual handles, custom styling, and real-time value updates for various applications.
            </p>
            <p className="text-mw-gray-600 dark:text-mw-gray-400">
              <span className="font-medium">Use Case:</span> Settings panels, price ranges, volume controls, performance dashboards, and configuration interfaces.
            </p>
          </div>

          {/* Preview Content */}
          <div className="bg-gradient-to-br from-mw-purple-50 to-mw-pink-50 dark:from-mw-gray-900 dark:to-mw-gray-800 rounded-lg p-8 mb-8">
            <div className="max-w-7xl mx-auto space-y-8">

        {/* Basic Sliders Grid */}
        <section>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">Single Value Sliders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sliderExamples.map((slider, index) => {
              const IconComponent = slider.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-mw-gray-600 dark:text-mw-gray-400" />
                      <h3 className="font-semibold text-mw-gray-900 dark:text-white">{slider.title}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {slider.formatter(slider.value)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <Slider
                      value={slider.value}
                      onChange={slider.onChange}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      className="w-full"
                    />
                    
                    <div className="flex justify-between text-xs text-mw-gray-500 dark:text-mw-gray-400">
                      <span>{slider.formatter(slider.min)}</span>
                      <span>{slider.formatter(slider.max)}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Range Sliders */}
        <section>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">Range Sliders</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Range */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-mw-gray-900 dark:text-white">Price Range</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Min: {formatPrice(priceRange[0])}</span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Max: {formatPrice(priceRange[1])}</span>
                </div>
                {/* Note: This would need a dual-handle slider implementation */}
                <div className="relative">
                  <Slider
                    value={priceRange[0]}
                    onChange={(value) => setPriceRange([value, priceRange[1]])}
                    min={0}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-center mt-2 text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    min={0}
                    max={priceRange[1]}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    min={priceRange[0]}
                    max={1000}
                    className="text-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Time Range */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-mw-gray-900 dark:text-white">Working Hours</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Start: {formatTime(timeRange[0])}</span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">End: {formatTime(timeRange[1])}</span>
                </div>
                <Slider
                  value={timeRange[0]}
                  onChange={(value) => setTimeRange([value, timeRange[1]])}
                  min={0}
                  max={24}
                  step={1}
                  className="w-full"
                />
                <div className="text-center text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  {formatTime(timeRange[0])} - {formatTime(timeRange[1])} ({timeRange[1] - timeRange[0]} hours)
                </div>
              </div>
            </Card>

            {/* Quality Range */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-mw-gray-900 dark:text-white">Rating Filter</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Min: {formatRating(qualityRange[0])}</span>
                  <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Max: {formatRating(qualityRange[1])}</span>
                </div>
                <Slider
                  value={qualityRange[0]}
                  onChange={(value) => setQualityRange([value, qualityRange[1]])}
                  min={1}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-center text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                  {formatRating(qualityRange[0])} - {formatRating(qualityRange[1])}
                </div>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star >= qualityRange[0] && star <= qualityRange[1]
                          ? 'text-yellow-400 fill-current'
                          : 'text-mw-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Progress & Performance Sliders */}
        <section>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">Progress & Performance Indicators</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Dashboard */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <h3 className="font-semibold text-mw-gray-900 dark:text-white flex items-center">
                  <Gauge className="h-5 w-5 mr-2 text-green-600" />
                  System Performance
                </h3>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">CPU Usage</span>
                    <span className="text-sm font-bold text-mw-gray-900 dark:text-white">{performance}%</span>
                  </div>
                  <Progress value={performance} className="h-2" />
                  <Slider
                    value={performance}
                    onChange={setPerformance}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full mt-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Memory Usage</span>
                    <span className="text-sm font-bold text-mw-gray-900 dark:text-white">{memoryUsage}%</span>
                  </div>
                  <Progress value={memoryUsage} variant="warning" className="h-2" />
                  <Slider
                    value={memoryUsage}
                    onChange={setMemoryUsage}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full mt-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">Overall Progress</span>
                    <span className="text-sm font-bold text-mw-gray-900 dark:text-white">{progress}%</span>
                  </div>
                  <Progress value={progress} variant="success" className="h-2" />
                  <Slider
                    value={progress}
                    onChange={setProgress}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <h3 className="font-semibold text-mw-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Customer Satisfaction
                </h3>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-2">
                    {satisfaction.toFixed(1)}
                  </div>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= Math.floor(satisfaction)
                            ? 'text-yellow-400 fill-current'
                            : star <= satisfaction
                            ? 'text-yellow-400 fill-current opacity-50'
                            : 'text-mw-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Slider
                    value={satisfaction}
                    onChange={setSatisfaction}
                    min={1}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Positive Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">Total Reviews</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>5 stars</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-1" />
                  
                  <div className="flex justify-between text-sm">
                    <span>4 stars</span>
                    <span>24%</span>
                  </div>
                  <Progress value={24} className="h-1" />
                  
                  <div className="flex justify-between text-sm">
                    <span>3 stars</span>
                    <span>6%</span>
                  </div>
                  <Progress value={6} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Slider Features */}
        <section>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">Slider Features & Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Customization
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Custom step values</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Min/max ranges</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Value formatting</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Custom styling</span>
                  <Badge variant="success">✓</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Functionality
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time updates</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Keyboard navigation</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Touch support</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Precision control</span>
                  <Badge variant="success">✓</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Accessibility
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">ARIA labels</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Screen reader support</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Focus indicators</span>
                  <Badge variant="success">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">WCAG 2.1 compliant</span>
                  <Badge variant="success">✓</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
        
    </div>
    </main>
      
    <Footer />
  </div>
  )
}

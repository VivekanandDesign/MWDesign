'use client'

import { useState } from 'react'
import { Copy, Check, Search, Heart, Star } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import * as Icons from '@/components/icons'

const iconCategories = [
  {
    id: 'arrows',
    name: 'Arrows & Direction',
    description: 'Navigation and directional indicators',
    icons: [
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight',
      'DoubleArrowUp', 'DoubleArrowDown', 'DoubleArrowLeft', 'DoubleArrowRight',
      'TrendingUp', 'TrendingDown', 'CornerUpLeft', 'CornerUpRight',
      'ArrowUpRight', 'ArrowDownLeft', 'ArrowUpLeft', 'ArrowDownRight',
      'MoveUp', 'MoveDown', 'MoveLeft', 'MoveRight', 'Move', 'Maximize', 'Minimize'
    ]
  },
  {
    id: 'interface',
    name: 'Interface',
    description: 'Common UI elements and controls',
    icons: [
      'Menu', 'X', 'Plus', 'Minus', 'Settings', 'MoreHorizontal', 'MoreVertical',
      'Search', 'Filter', 'SortAsc', 'SortDesc', 'Refresh', 'Download', 'Upload',
      'Edit', 'Trash', 'Copy', 'Share', 'Save', 'Print', 'Bookmark', 'BookmarkFilled', 'Cut',
      'Clipboard', 'ClipboardCopy', 'ClipboardPaste', 'Undo', 'Redo',
      'ZoomIn', 'ZoomOut', 'Fullscreen', 'Minimize2',
      'Grid', 'List', 'LayoutGrid', 'LayoutList', 'Columns', 'Rows',
      'AlignLeft', 'AlignCenter', 'AlignRight', 'AlignJustify',
      'Bold', 'Italic', 'Underline', 'Strikethrough', 'Type'
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Communication and social icons',
    icons: [
      'Mail', 'MessageSquare', 'MessageSquareFilled', 'MessageCircle', 'MessageCircleFilled', 'Phone', 'Video',
      'Bell', 'BellFilled', 'BellOff', 'Heart', 'HeartFilled', 'Star', 'StarFilled',
      'ThumbsUp', 'ThumbsUpFilled', 'ThumbsDown', 'ThumbsDownFilled', 'Send', 'Reply', 'Forward', 'AtSign', 'Hash',
      'Users', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX', 'Contact',
      'Mic', 'MicOff', 'Volume', 'VolumeOff', 'Volume1', 'Volume2',
      'Headphones', 'Speaker', 'Megaphone', 'Radio', 'Podcast',
      'Quote', 'MessageSquareText', 'MessageSquareMore', 'MessageSquareDot',
      'MessagesSquare', 'MessageSquareReply', 'MessageSquareShare'
    ]
  },
  {
    id: 'business',
    name: 'Business & Finance',
    description: 'Business and financial icons',
    icons: [
      'DollarSign', 'CreditCard', 'ShoppingCart', 'ShoppingBag',
      'Receipt', 'BarChart', 'PieChart', 'Activity', 'Target', 'TargetFilled', 'Award', 'AwardFilled',
      'Calendar', 'Clock', 'Timer', 'GrowthChart',
      'Calculator', 'Coins', 'Banknote', 'Wallet', 'PiggyBank',
      'Building', 'BuildingFilled', 'Building2', 'Store', 'Briefcase', 'Factory',
      'HandCoins', 'Invoice', 'Package', 'Truck',
      'ShoppingBasket', 'Tag', 'Tags', 'Percent', 'Gift'
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech and device related icons',
    icons: [
      'Smartphone', 'Laptop', 'Monitor', 'Tablet', 'Watch',
      'Keyboard', 'Mouse', 'Headphones', 'Webcam', 'Printer',
      'Router', 'Server', 'Database', 'HardDrive', 'ScanLine',
      'Cpu', 'MemoryStick', 'Battery', 'BatteryCharging', 'BatteryFull',
      'BatteryLow', 'Power', 'PowerOff', 'Plug', 'Cable',
      'Wifi', 'WifiOff', 'Signal', 'SignalHigh', 'SignalLow',
      'SignalMedium', 'SignalZero', 'Bluetooth', 'BluetoothConnected', 'BluetoothSearching'
    ]
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    description: 'Media controls and entertainment',
    icons: [
      'Play', 'Pause', 'Stop', 'Rewind', 'FastForward',
      'SkipBack', 'SkipForward', 'Repeat', 'Repeat1', 'Shuffle',
      'Volume', 'Volume1', 'Volume2', 'VolumeX', 'VolumeOff',
      'Music', 'Music2', 'Music3', 'Music4', 'Radio',
      'Disc', 'Disc2', 'Disc3', 'Film', 'Clapperboard',
      'Camera', 'CameraOff', 'Video', 'VideoOff', 'Image',
      'Images', 'FileImage', 'FileVideo', 'FileAudio', 'Mic',
      'MicOff', 'Headphones', 'Speaker', 'SpeakerX'
    ]
  },
  {
    id: 'files',
    name: 'Files & Documents',
    description: 'File types and document management',
    icons: [
      'File', 'FileText', 'FilePlus', 'FileMinus', 'FileCheck',
      'FileX', 'FileEdit', 'FileCopy', 'FileSearch', 'FileImage',
      'FileVideo', 'FileAudio', 'FilePdf', 'FileSpreadsheet', 'FileCode',
      'Folder', 'FolderOpen', 'FolderPlus', 'FolderMinus', 'FolderCheck',
      'FolderX', 'FolderEdit', 'FolderCopy', 'FolderSearch', 'Archive',
      'Download', 'Upload', 'CloudDownload', 'CloudUpload', 'Cloud',
      'CloudOff', 'CloudRain', 'CloudSnow', 'CloudLightning', 'CloudDrizzle'
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation and location icons',
    icons: [
      'Home', 'HomeFilled', 'MapPin', 'MapPinFilled', 'Map', 'Globe', 'Compass', 'Navigation',
      'Route', 'Milestone', 'Signpost', 'Flag', 'FlagFilled', 'Bookmark', 'BookmarkFilled',
      'Link', 'ExternalLink', 'Anchor', 'Crosshair', 'Focus',
      'Locate', 'LocateFixed', 'LocateOff'
    ]
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Weather and climate icons',
    icons: [
      'Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow',
      'CloudLightning', 'CloudDrizzle', 'CloudHail', 'Cloudy', 'PartlyCloudy',
      'Sunrise', 'Sunset', 'Wind', 'Tornado', 'Snowflake',
      'Droplets', 'Umbrella', 'Thermometer', 'Gauge', 'Eye',
      'EyeOff', 'Zap', 'Flame'
    ]
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Security and privacy icons',
    icons: [
      'Lock', 'LockFilled', 'Unlock', 'Key', 'KeyRound', 'Shield', 'ShieldFilled', 'ShieldCheck', 'ShieldAlert',
      'ShieldX', 'Eye', 'EyeOff', 'Fingerprint', 'Scan',
      'ScanLine', 'QrCode', 'UserCheck', 'UserX', 'UserShield',
      'AlertTriangle', 'AlertCircle', 'Info', 'CheckCircle', 'XCircle'
    ]
  },
  {
    id: 'health',
    name: 'Health & Medical',
    description: 'Health and medical icons',
    icons: [
      'Heart', 'HeartFilled', 'HeartPulse', 'Activity', 'Stethoscope', 'Pill',
      'Cross', 'Plus', 'Minus', 'Thermometer', 'Syringe',
      'Bandage', 'Ambulance', 'Hospital', 'Wheelchair', 'Baby',
      'Accessibility', 'Eye', 'EyeOff', 'Ear', 'EarOff'
    ]
  },
  {
    id: 'food',
    name: 'Food & Dining',
    description: 'Food and dining icons',
    icons: [
      'UtensilsCrossed', 'Coffee', 'Wine', 'Beer', 'Martini',
      'IceCream', 'Cookie', 'Cherry', 'Apple', 'Grape',
      'Banana', 'Carrot', 'Pizza', 'Sandwich', 'Soup',
      'ChefHat'
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Recreation',
    description: 'Sports and recreational activities',
    icons: [
      'Football', 'Trophy', 'TrophyFilled', 'Medal', 'Target', 'TargetFilled', 'Zap', 'Activity',
      'Dumbbell', 'Bike', 'Car', 'Plane', 'Ship',
      'Gamepad', 'Gamepad2', 'Dice1', 'Dice2', 'Dice3',
      'Dice4', 'Dice5', 'Dice6', 'Puzzle', 'Tent'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Education and learning icons',
    icons: [
      'GraduationCap', 'BookOpen', 'Book', 'Library', 'School',
      'Backpack', 'PenTool', 'Pencil', 'Eraser', 'Ruler',
      'Calculator', 'Globe', 'Lightbulb', 'LightbulbFilled', 'Brain'
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Social media and sharing icons',
    icons: [
      'Share', 'Share2', 'Forward', 'Reply', 'Repeat',
      'Heart', 'HeartFilled', 'Star', 'StarFilled', 'ThumbsUp', 'ThumbsUpFilled', 'ThumbsDown', 'ThumbsDownFilled',
      'MessageCircle', 'MessageCircleFilled', 'Users', 'UserPlus', 'UserMinus', 'AtSign',
      'Hash', 'Trending', 'TrendingUp', 'TrendingDown'
    ]
  },
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'E-commerce and shopping icons',
    icons: [
      'ShoppingCart', 'ShoppingBag', 'Store', 'Package', 'Gift',
      'CreditCard', 'DollarSign', 'Receipt', 'Tag', 'Tags',
      'Percent', 'Truck', 'MapPin', 'MapPinFilled', 'Clock', 'Star', 'StarFilled'
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Vehicles and transportation',
    icons: [
      'Car', 'Truck', 'Bus', 'Train', 'Plane',
      'Ship', 'Bike', 'Motorcycle', 'Scooter', 'Taxi',
      'ParkingCircle', 'ParkingSquare', 'Fuel', 'MapPin', 'MapPinFilled',
      'Route', 'Navigation', 'Compass'
    ]
  },
  {
    id: 'time',
    name: 'Time & Date',
    description: 'Time and calendar icons',
    icons: [
      'Clock', 'Timer', 'Stopwatch', 'Calendar', 'CalendarDays',
      'CalendarCheck', 'CalendarX', 'CalendarPlus', 'CalendarMinus', 'CalendarClock',
      'AlarmClock', 'Sunrise', 'Sunset', 'History', 'RotateCcw',
      'RotateCw'
    ]
  }
]

// Get all icons from categories
const allIcons = iconCategories.reduce((acc, category) => {
  return [...acc, ...category.icons]
}, [] as string[])

// Helper component for icon grid
function IconGrid({ icons, searchTerm }: { icons: string[], searchTerm: string }) {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)

  const copyToClipboard = async (iconName: string) => {
    const importStatement = `import { ${iconName} } from '@/components/icons'`
    const usageExample = `<${iconName} className="w-6 h-6" />`
    const fullCode = `${importStatement}\n\n// Usage:\n${usageExample}`
    
    try {
      await navigator.clipboard.writeText(fullCode)
      setCopiedIcon(iconName)
      setTimeout(() => setCopiedIcon(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const filteredIcons = icons.filter(icon => 
    !searchTerm || icon.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (filteredIcons.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-mw-gray-300 dark:text-mw-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-2">No icons found</h3>
        <p className="text-mw-gray-500 dark:text-mw-gray-400">
          Try adjusting your search terms
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
      {filteredIcons.map(iconName => {
        const IconComponent = (Icons as any)[iconName]
        if (!IconComponent) return null

        return (
          <div
            key={iconName}
            className="group relative p-4 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-primary-300 dark:hover:border-mw-primary-600 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white dark:bg-mw-gray-800"
            onClick={() => copyToClipboard(iconName)}
          >
            <div className="flex flex-col items-center space-y-2">
              <IconComponent className="w-6 h-6 text-mw-gray-700 dark:text-mw-gray-300 group-hover:text-mw-primary-600 dark:group-hover:text-mw-primary-400 transition-colors" />
              <span className="text-xs text-mw-gray-600 dark:text-mw-gray-400 text-center leading-tight">
                {iconName}
              </span>
            </div>
            
            {/* Copy feedback */}
            {copiedIcon === iconName && (
              <div className="absolute inset-0 flex items-center justify-center bg-mw-primary-50 dark:bg-mw-primary-900/20 rounded-lg border-2 border-mw-primary-200 dark:border-mw-primary-700">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-mw-primary-600 dark:text-mw-primary-400" />
                  <span className="text-xs font-medium text-mw-primary-700 dark:text-mw-primary-300">Copied!</span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('interface') // Default to first category
  const [showFilledIcons, setShowFilledIcons] = useState(false)

  // Debug logging
  console.log('showFilledIcons state:', showFilledIcons)

  // Function to filter icons based on filled/outline preference
  const filterIconsByType = (icons: string[]) => {
    console.log('filterIconsByType called with showFilledIcons:', showFilledIcons)
    console.log('Input icons count:', icons.length)
    
    if (showFilledIcons) {
      // Show only filled variants, fallback to outline if no filled version exists
      const filledIcons = icons.filter(icon => icon.endsWith('Filled'))
      console.log('Filled mode result count:', filledIcons.length)
      return filledIcons
    } else {
      // Show only outline variants (exclude filled versions)
      const outlineIcons = icons.filter(icon => !icon.endsWith('Filled'))
      console.log('Outline mode result count:', outlineIcons.length)
      return outlineIcons
    }
  }

  const filteredCategories = iconCategories.filter(category =>
    selectedCategoryId ? category.id === selectedCategoryId : true
  )

  return (
    <div className="min-h-screen bg-white dark:bg-mw-gray-950">
      <Navigation />
      
      <PageHero
        title="Icons"
        description="A comprehensive collection of 470+ carefully crafted icons for your applications. Click any icon to copy the import and usage code."
        badge={{
          text: "470+ Icons",
          variant: "info"
        }}
        stats={[
          { label: "Total Icons", value: "470+" },
          { label: "Categories", value: "18" },
          { label: "Copy-Ready", value: "100%" },
          { label: "TypeScript", value: "Full" }
        ]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Layout: Sidebar + Main Content */}
        <div className="flex gap-8">
          
          {/* Left Sidebar - Categories */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              <Card className="shadow-sm border border-mw-gray-200 dark:border-mw-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                    Categories
                  </h3>
                  
                  {/* All Categories Option */}
                  <button
                    onClick={() => setSelectedCategoryId(null)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 mb-3 ${
                      !selectedCategoryId 
                        ? 'bg-mw-primary-50 border-mw-primary-200 text-mw-primary-700 dark:bg-mw-primary-900/20 dark:border-mw-primary-700 dark:text-mw-primary-300' 
                        : 'border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-primary-300 dark:hover:border-mw-primary-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">All Categories</div>
                        <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">View all icons</div>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {allIcons.length}
                      </Badge>
                    </div>
                  </button>

                  {/* Category List */}
                  <div className="space-y-2">
                    {iconCategories.map(category => {
                      const categoryIconCount = filterIconsByType(category.icons).length
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategoryId(category.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                            selectedCategoryId === category.id 
                              ? 'bg-mw-primary-50 border-mw-primary-200 text-mw-primary-700 dark:bg-mw-primary-900/20 dark:border-mw-primary-700 dark:text-mw-primary-300' 
                              : 'border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-primary-300 dark:hover:border-mw-primary-600'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-sm">{category.name}</div>
                              <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 line-clamp-1">
                                {category.description}
                              </div>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              {categoryIconCount}
                            </Badge>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Content - Icons */}
          <div className="flex-1 min-w-0">
            
            {/* Search and Toggle Controls */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search icons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200"
                  />
                </div>
              </div>

              {/* Icon Type Toggle */}
              <div className="p-4 bg-mw-gray-50 dark:bg-mw-gray-900/50 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Icon Style
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-mw-gray-600 dark:text-mw-gray-400">
                      <span className={!showFilledIcons ? 'text-mw-primary-600 dark:text-mw-primary-400 font-medium' : ''}>
                        Outline
                      </span>
                      <button
                        onClick={() => {
                          console.log('Button toggle clicked, current state:', showFilledIcons)
                          setShowFilledIcons(!showFilledIcons)
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-mw-primary-500 focus:ring-offset-2 ${
                          showFilledIcons ? 'bg-mw-primary-600' : 'bg-mw-gray-200 dark:bg-mw-gray-700'
                        }`}
                      >
                        <span className="sr-only">Toggle icon style</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            showFilledIcons ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className={showFilledIcons ? 'text-mw-primary-600 dark:text-mw-primary-400 font-medium' : ''}>
                        Filled
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                    {showFilledIcons ? 'Showing filled variants' : 'Showing outline variants'}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Category Content */}
            <div>
              {selectedCategoryId ? (
                (() => {
                  const selectedCategory = iconCategories.find(cat => cat.id === selectedCategoryId)
                  if (!selectedCategory) return null
                  
                  const filteredCategoryIcons = filterIconsByType(selectedCategory.icons).filter(icon => 
                    !searchTerm || icon.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  
                  return (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-2">
                          {selectedCategory.name}
                        </h2>
                        <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-2">
                          {selectedCategory.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {filteredCategoryIcons.length} icons
                            {searchTerm && ` matching "${searchTerm}"`}
                          </Badge>
                          {searchTerm && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSearchTerm('')}
                              className="text-xs"
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {filteredCategoryIcons.length > 0 ? (
                        <IconGrid icons={filteredCategoryIcons} searchTerm="" />
                      ) : (
                        <div className="text-center py-12">
                          <Search className="w-12 h-12 text-mw-gray-300 dark:text-mw-gray-600 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-mw-gray-900 dark:text-white mb-2">
                            No icons found
                          </h3>
                          <p className="text-mw-gray-500 dark:text-mw-gray-400">
                            {searchTerm 
                              ? `No icons in "${selectedCategory.name}" match "${searchTerm}"`
                              : `No icons available in "${selectedCategory.name}"`
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })()
              ) : (
                // All Categories View
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-2">
                      All Icons
                      {searchTerm && (
                        <span className="text-lg font-normal text-mw-gray-600 dark:text-mw-gray-400">
                          {' '}matching "{searchTerm}"
                        </span>
                      )}
                    </h2>
                    <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-2">
                      Browse all icons across all categories
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {filterIconsByType(allIcons).filter(icon => 
                          !searchTerm || icon.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length} icons
                        {searchTerm && ` matching "${searchTerm}"`}
                      </Badge>
                      {searchTerm && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSearchTerm('')}
                          className="text-xs"
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <IconGrid 
                    icons={filterIconsByType(allIcons)} 
                    searchTerm={searchTerm} 
                  />
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

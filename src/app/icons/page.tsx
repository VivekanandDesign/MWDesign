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
      'Edit', 'Trash', 'Copy', 'Share', 'Save', 'Print', 'Bookmark', 'Cut',
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
      'Mail', 'MessageSquare', 'MessageCircle', 'Phone', 'Video',
      'Bell', 'BellOff', 'Heart', 'HeartFilled', 'Star', 'StarFilled',
      'ThumbsUp', 'ThumbsDown', 'Send', 'Reply', 'Forward', 'AtSign', 'Hash',
      'Users', 'User', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX',
      'Contact', 'PhoneCall', 'MessageSquareMore', 'MessageSquarePlus', 'MessageSquareX',
      'Voicemail', 'Mic', 'MicOff', 'PhoneIncoming', 'PhoneOutgoing'
    ]
  },
  {
    id: 'media',
    name: 'Media & Files',
    description: 'Media controls and file types',
    icons: [
      'Play', 'Pause', 'Stop', 'SkipForward', 'SkipBack',
      'Volume', 'VolumeOff', 'Volume1', 'Mute',
      'Image', 'File', 'FileText', 'Folder', 'FolderOpen', 'Camera', 'Music',
      'Archive', 'Attachment', 'FileImage', 'FileVideo',
      'FileAudio', 'FilePlus', 'FileMinus', 'FileCheck', 'FileX',
      'FolderPlus', 'FolderMinus', 'FolderCheck', 'FolderX',
      'VideoFile', 'Record', 'Radio', 'Headphones', 'Speaker', 'Disc', 'Film', 'ImageIcon'
    ]
  },
  {
    id: 'business',
    name: 'Business & Finance',
    description: 'Business and financial icons',
    icons: [
      'DollarSign', 'CreditCard', 'ShoppingCart', 'ShoppingBag',
      'Receipt', 'BarChart', 'PieChart', 'Activity', 'Target', 'Award',
      'Calendar', 'Clock', 'Timer', 'GrowthChart',
      'Calculator', 'Coins', 'Banknote', 'Wallet', 'PiggyBank',
      'Building', 'Building2', 'Store', 'Briefcase', 'Factory',
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
      'Wifi', 'WifiOff', 'Bluetooth', 'Battery', 'BatteryLow', 'Power',
      'Code', 'Terminal', 'Database', 'Server', 'Cloud', 'HardDrive',
      'Cpu', 'MemoryStick', 'Usb', 'Zap', 'Plug', 'Cable',
      'Router', 'Antenna', 'Signal', 'SignalHigh', 'SignalLow', 'SignalZero',
      'Github', 'GitBranch', 'GitCommit', 'GitMerge', 'GitPullRequest',
      'Bug', 'Wrench', 'Hammer', 'Settings2', 'Cog'
    ]
  },
  {
    id: 'status',
    name: 'Status & Feedback',
    description: 'Status indicators and feedback icons',
    icons: [
      'Check', 'CheckCircle', 'XCircle', 'AlertTriangle', 'AlertCircle',
      'Info', 'HelpCircle', 'Eye', 'EyeOff', 'Lock', 'Unlock', 'Shield',
      'ShieldCheck', 'Loading', 'Loader', 'CheckCircle2',
      'ErrorCircle', 'AlertOctagon', 'Warning',
      'CheckSquare', 'Square', 'Circle', 'Dot', 'DotSquare',
      'ToggleLeft', 'ToggleRight', 'PowerOff', 'PowerOn',
      'Lightbulb', 'LightbulbOff', 'Sun', 'Moon', 'CloudRain', 'CloudSnow'
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation and location icons',
    icons: [
      'Home', 'MapPin', 'Map', 'Navigation', 'Compass', 'Globe',
      'ExternalLink', 'Link', 'Unlink', 'Anchor', 'Route', 'Flag',
      'ArrowBigUp', 'ArrowBigDown', 'ArrowBigLeft', 'ArrowBigRight',
      'Navigation2', 'Locate', 'LocateFixed', 'LocateOff',
      'Milestone', 'Signpost'
    ]
  },
  {
    id: 'design',
    name: 'Design & Layout',
    description: 'Layout and design tools',
    icons: [
      'Layout', 'LayoutDashboard', 'LayoutTemplate', 'LayoutPanelLeft',
      'Grid3x3', 'Grid2x2', 
      'Sidebar', 'SidebarOpen', 'SidebarClose',
      'PanelLeft', 'PanelRight', 'PanelTop', 'PanelBottom',
      'SplitSquareHorizontal', 'SplitSquareVertical', 'Box',
      'RectangleHorizontal', 'RectangleVertical', 'CircleIcon',
      'Triangle', 'Diamond', 'Pentagon', 'Hexagon', 'Octagon'
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Vehicles and transport',
    icons: [
      'Car', 'Bus', 'Bike', 'Plane', 'Train', 'Ship', 'Rocket',
      'Fuel', 'ParkingCircle', 'Road', 'TrafficCone',
      'Taxi', 'Ambulance'
    ]
  },
  {
    id: 'weather',
    name: 'Weather & Nature',
    description: 'Weather conditions and nature',
    icons: [
      'CloudLightning', 'Rainbow', 'Umbrella', 'Snowflake', 'Droplets', 'Wind',
      'Thermometer', 'ThermometerSun', 'ThermometerSnowflake',
      'TreePine', 'Trees', 'Flower', 'Flower2', 'Leaf', 'Seedling',
      'Mountain', 'MountainSnow', 'Waves', 'Flame', 'Lightning'
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Activities',
    description: 'Sports and recreational activities',
    icons: [
      'Trophy', 'Medal', 'Crown', 'Gamepad', 'Gamepad2', 'Dice1', 'Dice2',
      'Dice3', 'Dice4', 'Dice5', 'Dice6', 'Bullseye',
      'Dumbbell', 'Fitness', 'HeartHandshake'
    ]
  },
  {
    id: 'food',
    name: 'Food & Drink',
    description: 'Food and beverage icons',
    icons: [
      'Coffee', 'Tea', 'Beer', 'Wine', 'Pizza', 'Utensils', 'UtensilsCrossed',
      'ChefHat', 'Cookie', 'Cake', 'IceCream', 'Apple', 'Banana',
      'Cherry', 'Grape', 'Carrot', 'Salad'
    ]
  },
  {
    id: 'health',
    name: 'Health & Medical',
    description: 'Healthcare and medical icons',
    icons: [
      'HealthHeart', 'HeartPulse', 'Stethoscope', 'Pill',
      'Syringe', 'MedicalThermometer', 'Bandage',
      'Cross', 'MedicalPlus', 'Microscope', 'TestTube', 'Dna', 'Brain'
    ]
  },
  {
    id: 'education',
    name: 'Education & Learning',
    description: 'Educational and learning resources',
    icons: [
      'GraduationCap', 'BookOpen', 'Book', 'School',
      'PenTool', 'Pencil', 'Pen', 'Eraser', 'Ruler', 'Calc',
      'WorldIcon', 'Diploma', 'Presentation', 'Projector'
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Shopping and e-commerce',
    icons: [
      'Package2', 'PackageCheck', 'PackageX', 'PackagePlus',
      'Location', 'Payment', 'Cash', 'Money', 'Bill',
      'Price', 'Prices', 'Discount', 'Present', 'Ticket', 'Barcode', 'QrCode'
    ]
  },
  {
    id: 'security',
    name: 'Security & Privacy',
    description: 'Security and privacy features',
    icons: [
      'Key', 'KeyRound', 'ShieldAlert', 'ShieldX',
      'ViewIcon', 'HideIcon', 'Verified', 'Blocked', 'Ban',
      'SecurityAlert', 'Fingerprint', 'Scan', 'Surveillance'
    ]
  },
  {
    id: 'social',
    name: 'Social & Community',
    description: 'Social media and community features',
    icons: [
      'Community', 'Person', 'AddUser', 'RemoveUser', 'Like', 'ShareIcon',
      'Comment', 'Notification', 'Rating', 'Approve', 'Disapprove',
      'Report', 'Premium', 'Achievement', 'Recognition', 'Handshake'
    ]
  },
  {
    id: 'productivity',
    name: 'Office & Productivity',
    description: 'Office and productivity tools',
    icons: [
      'Schedule', 'Time', 'Stopwatch', 'AlarmClock', 'Notes',
      'Sticky', 'Pin', 'Attach', 'Document', 'Directory', 'Zip',
      'PrintIcon', 'Telephone', 'Email', 'SendIcon', 'Inbox'
    ]
  }
]

function IconGrid({ icons, searchTerm }: { icons: string[], searchTerm: string }) {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)

  const filteredIcons = icons.filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = async (iconName: string) => {
    try {
      const importStatement = `import { ${iconName} } from '@/components/icons'`
      const jsxUsage = `<${iconName} className="w-5 h-5" />`
      const fullCode = `${importStatement}\n\n// Usage:\n${jsxUsage}`
      
      await navigator.clipboard.writeText(fullCode)
      setCopiedIcon(iconName)
      setTimeout(() => setCopiedIcon(null), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback for older browsers or when clipboard API is not available
      try {
        const textArea = document.createElement('textarea')
        const importStatement = `import { ${iconName} } from '@/components/icons'`
        const jsxUsage = `<${iconName} className="w-5 h-5" />`
        const fullCode = `${importStatement}\n\n// Usage:\n${jsxUsage}`
        
        textArea.value = fullCode
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
        setCopiedIcon(iconName)
        setTimeout(() => setCopiedIcon(null), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
    }
  }

  const getIconComponent = (iconName: string) => {
    try {
      const IconComponent = (Icons as any)[iconName]
      return IconComponent ? <IconComponent className="w-6 h-6" /> : (
        <div className="w-6 h-6 bg-mw-gray-200 dark:bg-mw-gray-700 rounded flex items-center justify-center text-xs text-mw-gray-500">
          ?
        </div>
      )
    } catch (error) {
      console.error(`Failed to render icon: ${iconName}`, error)
      return (
        <div className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-xs text-red-500">
          !
        </div>
      )
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {filteredIcons.map(iconName => (
        <Card 
          key={iconName} 
          className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-mw-primary-300 dark:hover:border-mw-primary-600 hover:-translate-y-1 border border-mw-gray-200 dark:border-mw-gray-700 bg-white dark:bg-mw-gray-800"
          onClick={() => copyToClipboard(iconName)}
        >
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2 text-mw-gray-600 dark:text-mw-gray-300 group-hover:text-mw-primary-600 dark:group-hover:text-mw-primary-400 transition-colors duration-300">
              {getIconComponent(iconName)}
            </div>
            <div className="text-xs font-medium text-mw-gray-700 dark:text-mw-gray-200 mb-1 group-hover:text-mw-primary-700 dark:group-hover:text-mw-primary-300 transition-colors duration-300">
              {iconName}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
              {copiedIcon === iconName ? (
                <Badge variant="success" className="text-xs py-0.5 shadow-sm">
                  <Check className="w-3 h-3 mr-1" />
                  Copied
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs py-0.5 border-mw-primary-300 text-mw-primary-700 dark:border-mw-primary-600 dark:text-mw-primary-400 shadow-sm">
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const allIcons = iconCategories.flatMap(category => category.icons)
  const filteredCategories = iconCategories.filter(category =>
    activeCategory ? category.id === activeCategory : true
  )

  return (
    <div className="min-h-screen bg-white dark:bg-mw-gray-950">
      <Navigation />
      
      <PageHero
        title="Icons"
        description="A comprehensive collection of 300+ carefully crafted icons for your applications. Click any icon to copy the import and usage code."
        badge={{
          text: "300+ Icons",
          variant: "info"
        }}
        stats={[
          { label: "Total Icons", value: "300+" },
          { label: "Categories", value: "18" },
          { label: "Copy-Ready", value: "100%" },
          { label: "TypeScript", value: "Full" }
        ]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 w-5 h-5" />
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200"
              />
            </div>
            <Button
              variant={activeCategory ? "outline" : "primary"}
              onClick={() => setActiveCategory(null)}
              className="shadow-sm hover:shadow-md transition-all duration-200"
            >
              All Categories
            </Button>
          </div>

          {/* Category Filters */}
          <div className="bg-mw-gray-50 dark:bg-mw-gray-900/50 rounded-lg p-4 border border-mw-gray-200 dark:border-mw-gray-700">
            <div className="flex flex-wrap gap-3">
              {iconCategories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(
                    activeCategory === category.id ? null : category.id
                  )}
                  className={`transition-all duration-200 ${
                    activeCategory === category.id 
                      ? 'bg-mw-primary-600 text-white hover:bg-mw-primary-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                      : 'text-mw-gray-700 dark:text-mw-gray-300 hover:bg-mw-primary-50 hover:text-mw-primary-700 dark:hover:bg-mw-primary-900/20 dark:hover:text-mw-primary-400 border border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-primary-300 dark:hover:border-mw-primary-600 shadow-sm hover:shadow-md'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <Card className="mb-8 bg-mw-blue-50 dark:bg-mw-blue-950/30 border-mw-blue-200 dark:border-mw-blue-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-mw-blue-900 dark:text-mw-blue-100 mb-4">
              How to Use Icons
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="space-y-2 text-sm text-mw-blue-800 dark:text-mw-blue-200">
                  <p>• <strong>Click any icon</strong> to copy the import and usage code</p>
                  <p>• <strong>Customize size:</strong> Use className="w-4 h-4" for different sizes</p>
                  <p>• <strong>Add colors:</strong> Use text-color classes like text-blue-600</p>
                  <p>• <strong>Import:</strong> import {'{ IconName }'} from '@/components/icons'</p>
                </div>
              </div>
              <div className="bg-white dark:bg-mw-gray-800 rounded-lg p-4 border">
                <h4 className="text-sm font-medium text-mw-gray-900 dark:text-white mb-2">Example Usage:</h4>
                <pre className="text-xs text-mw-gray-600 dark:text-mw-gray-300 overflow-x-auto">
{`import { Heart, Star } from '@/components/icons'

// Basic usage
<Heart className="w-5 h-5" />

// With colors and effects
<Star className="w-6 h-6 text-yellow-500 
  hover:scale-110 transition-transform" />

// Filled variants
<HeartFilled className="w-5 h-5 text-red-500" />`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Icon Sizes Showcase */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
              Icon Sizes
            </h3>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Heart className="w-4 h-4 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">w-4 h-4 (16px)</p>
              </div>
              <div className="text-center">
                <Heart className="w-5 h-5 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">w-5 h-5 (20px)</p>
              </div>
              <div className="text-center">
                <Heart className="w-6 h-6 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">w-6 h-6 (24px)</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">w-8 h-8 (32px)</p>
              </div>
              <div className="text-center">
                <Heart className="w-10 h-10 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">w-10 h-10 (40px)</p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">w-12 h-12 (48px)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Variants Showcase */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
              Color Variants
            </h3>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-mw-gray-400" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Default</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-mw-blue-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Primary</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Success</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Warning</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-red-600" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Error</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Yellow</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Icon Categories */}
        {searchTerm ? (
          <div>
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Search Results ({allIcons.filter(icon => 
                icon.toLowerCase().includes(searchTerm.toLowerCase())
              ).length} icons)
            </h2>
            <IconGrid icons={allIcons} searchTerm={searchTerm} />
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map(category => (
              <div key={category.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-1">
                    {category.description}
                  </p>
                  <Badge variant="secondary">
                    {category.icons.length} icons
                  </Badge>
                </div>
                <IconGrid icons={category.icons} searchTerm="" />
                {category.id !== filteredCategories[filteredCategories.length - 1].id && (
                  <Separator className="mt-12" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

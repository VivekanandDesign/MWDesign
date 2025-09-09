'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { AnimatedElement } from '@/components/AnimationComponents'
import { 
  Download, 
  Search, 
  Filter,
  Copy,
  Eye,
  FileImage,
  FileText,
  Palette,
  Type,
  Monitor,
  Smartphone,
  Printer,
  Mail,
  Share2,
  Archive,
  Star,
  Grid3x3,
  List,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  Image as ImageIcon,
  Video,
  File,
  Folder
} from 'lucide-react'

const MediaPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [copiedColor, setCopiedColor] = useState('')

  const categories = [
    { id: 'all', name: 'All Assets', count: 45 },
    { id: 'logos', name: 'Logos & Marks', count: 12 },
    { id: 'colors', name: 'Brand Colors', count: 8 },
    { id: 'typography', name: 'Typography', count: 6 },
    { id: 'templates', name: 'Templates', count: 15 },
    { id: 'guidelines', name: 'Guidelines', count: 4 }
  ]

  const brandColors = [
    { 
      name: 'Primary Blue (Light)', 
      hex: '#1d65af', 
      rgb: 'rgb(29, 101, 175)', 
      cmyk: 'C83 M42 Y0 K31',
      description: 'Deep Blue for light mode - innovation, trust, and breakthrough thinking'
    },
    { 
      name: 'Primary Blue (Dark)', 
      hex: '#2176cc', 
      rgb: 'rgb(33, 118, 204)', 
      cmyk: 'C84 M42 Y0 K20',
      description: 'Bright Blue for dark mode - innovation, trust, and breakthrough thinking'
    },
    { 
      name: 'Secondary Blue (Light)', 
      hex: '#4cb0e4', 
      rgb: 'rgb(76, 176, 228)', 
      cmyk: 'C67 M23 Y0 K11',
      description: 'Light Blue for light mode - momentum, achievement, and pushing boundaries'
    },
    { 
      name: 'Secondary Blue (Dark)', 
      hex: '#60b8e7', 
      rgb: 'rgb(96, 184, 231)', 
      cmyk: 'C58 M20 Y0 K9',
      description: 'Light Blue for dark mode - momentum, achievement, and pushing boundaries'
    },
    { 
      name: 'Success Green (Light)', 
      hex: '#2d7d32', 
      rgb: 'rgb(45, 125, 50)', 
      cmyk: 'C64 M0 Y60 K51',
      description: 'Success Green for light mode - positive actions and confirmations'
    },
    { 
      name: 'Success Green (Dark)', 
      hex: '#38983d', 
      rgb: 'rgb(56, 152, 61)', 
      cmyk: 'C63 M0 Y60 K40',
      description: 'Bright Green for dark mode - positive actions and confirmations'
    },
    { 
      name: 'Warning Orange (Light)', 
      hex: '#f9a825', 
      rgb: 'rgb(249, 168, 37)', 
      cmyk: 'C0 M33 Y85 K2',
      description: 'Warning Orange for light mode - caution and attention-needed states'
    },
    { 
      name: 'Warning Orange (Dark)', 
      hex: '#ffb74d', 
      rgb: 'rgb(255, 183, 77)', 
      cmyk: 'C0 M28 Y70 K0',
      description: 'Bright Orange for dark mode - caution and attention-needed states'
    },
    { 
      name: 'Danger Red (Light)', 
      hex: '#d63535', 
      rgb: 'rgb(214, 53, 53)', 
      cmyk: 'C0 M75 Y75 K16',
      description: 'Error Red for light mode - errors and destructive actions'
    },
    { 
      name: 'Danger Red (Dark)', 
      hex: '#e64646', 
      rgb: 'rgb(230, 70, 70)', 
      cmyk: 'C0 M70 Y70 K10',
      description: 'Bright Red for dark mode - errors and destructive actions'
    },
    { 
      name: 'Info Blue (Light)', 
      hex: '#0188d1', 
      rgb: 'rgb(1, 136, 209)', 
      cmyk: 'C100 M35 Y0 K18',
      description: 'Info Blue for light mode - neutral information and guidance'
    },
    { 
      name: 'Info Blue (Dark)', 
      hex: '#29b6f6', 
      rgb: 'rgb(41, 182, 246)', 
      cmyk: 'C83 M26 Y0 K4',
      description: 'Bright Info Blue for dark mode - neutral information and guidance'
    },
    { 
      name: 'Neutral Gray (Light)', 
      hex: '#717171', 
      rgb: 'rgb(113, 113, 113)', 
      cmyk: 'C0 M0 Y0 K56',
      description: 'Neutral Gray for light mode - secondary text and subtle elements'
    },
    { 
      name: 'Neutral Gray (Dark)', 
      hex: '#9e9e9e', 
      rgb: 'rgb(158, 158, 158)', 
      cmyk: 'C0 M0 Y0 K38',
      description: 'Light Gray for dark mode - secondary text and subtle elements'
    }
  ]

  const logoAssets = [
    {
      id: 'logo-primary',
      name: 'MWDesign Primary Logo',
      description: 'Full color horizontal logo',
      formats: ['SVG', 'PNG', 'PDF'],
      category: 'logos',
      preview: '/assets/brand/logos/mw-logo-primary.svg',
      downloads: 245
    },
    {
      id: 'logo-white',
      name: 'MWDesign White Logo',
      description: 'White version for dark backgrounds',
      formats: ['SVG', 'PNG', 'PDF'],
      category: 'logos',
      preview: '/assets/brand/logos/mw-logo-white.svg',
      downloads: 167
    },
    {
      id: 'logo-monochrome',
      name: 'MWDesign Monochrome',
      description: 'Single color version',
      formats: ['SVG', 'PNG', 'PDF'],
      category: 'logos',
      preview: '/assets/brand/logos/mw-logo-primary.svg',
      downloads: 134
    }
  ]

  const templateAssets = [
    {
      id: 'ppt-template',
      name: 'PowerPoint Template',
      description: 'Complete presentation template with 20+ slides',
      formats: ['PPTX'],
      category: 'templates',
      preview: '/api/placeholder/400/300',
      downloads: 89
    },
    {
      id: 'social-media',
      name: 'Social Media Kit',
      description: 'Instagram, LinkedIn, Twitter templates',
      formats: ['PSD', 'PNG', 'JPG'],
      category: 'templates',
      preview: '/api/placeholder/400/400',
      downloads: 223
    }
  ]

  const guidelineAssets = [
    {
      id: 'brand-guide',
      name: 'Complete Brand Guidelines',
      description: 'Full brand guidelines document (24 pages)',
      formats: ['PDF'],
      category: 'guidelines',
      preview: '/api/placeholder/300/400',
      downloads: 312
    },
    {
      id: 'logo-usage',
      name: 'Logo Usage Guidelines',
      description: 'Do\'s and don\'ts for logo usage',
      formats: ['PDF'],
      category: 'guidelines',
      preview: '/api/placeholder/300/400',
      downloads: 198
    }
  ]

  const allAssets = [...logoAssets, ...templateAssets, ...guidelineAssets]

  const filteredAssets = allAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const copyToClipboard = async (text: string, colorName: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedColor(colorName)
    setTimeout(() => setCopiedColor(''), 2000)
  }

  const downloadAsset = (assetId: string, format: string) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${assetId} in ${format} format`)
  }

  const downloadFont = async () => {
    try {
      // First try to download from Google Fonts
      const fontUrl = 'https://fonts.google.com/download?family=Poppins'
      const link = document.createElement('a')
      link.href = fontUrl
      link.download = 'Poppins-Font-Family.zip'
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Show success message
      console.log('Downloading Poppins font family from Google Fonts...')
      
      // Optional: You can add a toast notification here
      // toast.success('Poppins font family download started!')
      
    } catch (error) {
      console.error('Font download failed:', error)
      
      // Fallback: Open Google Fonts page
      window.open('https://fonts.google.com/specimen/Poppins', '_blank', 'noopener,noreferrer')
      console.log('Redirecting to Google Fonts Poppins page...')
    }
  }

  const downloadAll = () => {
    // In a real app, this would create and download a ZIP file
    console.log('Downloading complete media kit...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mw-blue-50 via-white to-mw-blue-50 dark:from-mw-gray-950 dark:via-mw-gray-900 dark:to-mw-gray-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedElement direction="fade" delay={200}>
              <Badge className="mb-6 bg-mw-blue-100 text-mw-blue-800 dark:bg-mw-blue-900/20 dark:text-mw-blue-300">
                <FileImage className="w-4 h-4 mr-2" />
                Media & Brand Guidelines
              </Badge>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={400}>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 bg-clip-text text-transparent mb-6">
                Brand Asset Library
              </h1>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={600}>
              <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto mb-8">
                Download logos, templates, brand guidelines, and media assets. Everything you need to maintain 
                consistent brand identity across all your projects.
              </p>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" onClick={downloadAll} className="group">
                  <Archive className="mr-2 w-4 h-4" />
                  Download Complete Kit
                </Button>
                <Button size="lg" variant="outline">
                  <Eye className="mr-2 w-4 h-4" />
                  Preview Guidelines
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-y border-amber-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement direction="up" delay={200}>
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-2xl p-6 border border-amber-300 dark:border-amber-700 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-500 dark:bg-amber-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    🚧 Brand Assets Update Notice
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 mb-3">
                    <strong>Important:</strong> The current logos and brand assets shown here are placeholder content. 
                    Our design team is working on finalizing the official brand identity elements.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-200 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200">
                      📝 Real logos coming soon
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-200 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200">
                      🎨 Updated brand guidelines
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-200 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200">
                      📦 Final asset templates
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">

            {/* Search and Filter */}
            <AnimatedElement direction="fade" delay={1000}>
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-mw-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement direction="fade" delay={100}>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category, index) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="group"
                >
                  {category.name}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 group-hover:bg-white group-hover:text-mw-blue-600"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Brand Colors Section */}
      {(selectedCategory === 'all' || selectedCategory === 'colors') && (
        <section className="py-16 bg-gradient-to-r from-mw-gray-50 to-white dark:from-mw-gray-800 dark:to-mw-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedElement direction="up" delay={100}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                  Brand Colors
                </h2>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  Official color palette with precise color codes for all formats
                </p>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brandColors.map((color, index) => (
                <AnimatedElement 
                  key={color.name}
                  direction="up"
                  delay={200 + index * 100}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500">
                    <div 
                      className="h-24 w-full rounded-t-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-3">
                        {color.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-mw-gray-500">HEX</span>
                          <button
                            onClick={() => copyToClipboard(color.hex, color.name)}
                            className="flex items-center text-xs font-mono bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700 transition-colors"
                          >
                            {color.hex}
                            {copiedColor === color.name ? (
                              <CheckCircle className="w-3 h-3 ml-1 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 ml-1" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-mw-gray-500">RGB</span>
                          <button
                            onClick={() => copyToClipboard(color.rgb, color.name + '-rgb')}
                            className="text-xs font-mono bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded hover:bg-mw-gray-200 dark:hover:bg-mw-gray-700 transition-colors"
                          >
                            {color.rgb.replace('rgb(', '').replace(')', '')}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-mw-gray-500">CMYK</span>
                          <span className="text-xs font-mono bg-mw-gray-100 dark:bg-mw-gray-800 px-2 py-1 rounded">
                            {color.cmyk}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Assets Grid */}
      <section className="py-16 bg-white dark:bg-mw-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement direction="up" delay={100}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-2">
                  {selectedCategory === 'all' ? 'All Assets' : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  {filteredAssets.length} assets available
                </p>
              </div>
            </div>
          </AnimatedElement>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredAssets.map((asset, index) => (
              <AnimatedElement 
                key={asset.id}
                direction="up"
                delay={200 + index * 100}
              >
                <Card className="group hover:shadow-xl transition-all duration-500 h-full">
                  <div className="aspect-video bg-mw-gray-100 dark:bg-mw-gray-800 rounded-t-lg relative overflow-hidden">
                    {asset.category === 'logos' ? (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <img 
                          src={asset.preview} 
                          alt={asset.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-mw-blue-500/20 to-mw-blue-600/20 flex items-center justify-center">
                        <div className="text-center">
                          <FileImage className="w-12 h-12 text-mw-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {asset.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-1">
                          {asset.name}
                        </h3>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                          {asset.description}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-mw-gray-500">
                        <Download className="w-3 h-3 mr-1" />
                        {asset.downloads}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {asset.formats.map((format) => (
                        <Badge key={format} variant="secondary" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => downloadAsset(asset.id, asset.formats[0])}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      {(selectedCategory === 'all' || selectedCategory === 'typography') && (
        <section className="py-16 bg-gradient-to-r from-mw-gray-50 to-white dark:from-mw-gray-800 dark:to-mw-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedElement direction="up" delay={100}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                  Typography System
                </h2>
                <p className="text-mw-gray-600 dark:text-mw-gray-300">
                  Official fonts and typography guidelines for consistent brand communication
                </p>
              </div>
            </AnimatedElement>

            <div className="flex justify-center">
              <AnimatedElement direction="up" delay={200}>
                <Card className="max-w-2xl w-full">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Primary Font - Poppins</h3>
                    <p className="text-mw-gray-600 dark:text-mw-gray-400">
                      Used for headings, body text, and all brand communications
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-4xl font-bold mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>The quick brown fox</h1>
                        <p className="text-sm text-mw-gray-500">48px Bold</p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>jumps over the lazy dog</h2>
                        <p className="text-sm text-mw-gray-500">24px Semibold</p>
                      </div>
                      <div>
                        <p className="text-lg mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>The quick brown fox jumps over the lazy dog</p>
                        <p className="text-sm text-mw-gray-500">18px Regular</p>
                      </div>
                      <div>
                        <p className="text-base mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>The quick brown fox jumps over the lazy dog</p>
                        <p className="text-sm text-mw-gray-500">16px Regular</p>
                      </div>
                      <div>
                        <p className="text-sm mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>The quick brown fox jumps over the lazy dog</p>
                        <p className="text-sm text-mw-gray-500">14px Regular</p>
                      </div>
                    </div>
                    <Button size="sm" className="mt-6" onClick={downloadFont}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Font
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default MediaPage

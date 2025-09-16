'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  X, 
  AlertTriangle, 
  RefreshCw, 
  Palette, 
  Type, 
  Move, 
  Zap,
  Download,
  Upload
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { DesignToken } from '../types/figma'

interface DesignTokenSyncProps {
  className?: string
}

export function DesignTokenSync({ className = '' }: DesignTokenSyncProps) {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete'>('idle')
  const [selectedTokenType, setSelectedTokenType] = useState<'all' | 'color' | 'typography' | 'spacing' | 'shadow'>('all')

  // Mock design tokens data
  const designTokens: DesignToken[] = useMemo(() => [
    // Colors
    {
      name: 'Primary 600',
      value: '#3B82F6',
      type: 'color',
      category: 'Primary Colors',
      figmaValue: '#3B82F6',
      codeValue: '#3B82F6',
      synced: true
    },
    {
      name: 'Primary 500',
      value: '#60A5FA',
      type: 'color',
      category: 'Primary Colors',
      figmaValue: '#60A5FA',
      codeValue: '#60A5FA',
      synced: true
    },
    {
      name: 'Secondary 600',
      value: '#14B8A6',
      type: 'color',
      category: 'Secondary Colors',
      figmaValue: '#14B8A6',
      codeValue: '#10B981',
      synced: false
    },
    {
      name: 'Gray 900',
      value: '#111827',
      type: 'color',
      category: 'Neutral Colors',
      figmaValue: '#111827',
      codeValue: '#111827',
      synced: true
    },
    
    // Typography
    {
      name: 'Heading XL',
      value: '36px / 40px Poppins Bold',
      type: 'typography',
      category: 'Headings',
      figmaValue: '36px / 40px Poppins Bold',
      codeValue: '2.25rem / 2.5rem Poppins 700',
      synced: true
    },
    {
      name: 'Body Large',
      value: '18px / 28px Poppins Regular',
      type: 'typography',
      category: 'Body Text',
      figmaValue: '18px / 28px Poppins Regular',
      codeValue: '1.125rem / 1.75rem Poppins 400',
      synced: true
    },
    {
      name: 'Caption',
      value: '12px / 16px Poppins Medium',
      type: 'typography',
      category: 'Supporting Text',
      figmaValue: '12px / 16px Poppins Medium',
      codeValue: '0.75rem / 1rem Poppins 500',
      synced: false
    },

    // Spacing
    {
      name: 'Space 4',
      value: '16px',
      type: 'spacing',
      category: 'Base Spacing',
      figmaValue: '16px',
      codeValue: '1rem',
      synced: true
    },
    {
      name: 'Space 8',
      value: '32px',
      type: 'spacing',
      category: 'Base Spacing',
      figmaValue: '32px',
      codeValue: '2rem',
      synced: true
    },
    {
      name: 'Space 12',
      value: '48px',
      type: 'spacing',
      category: 'Base Spacing',
      figmaValue: '48px',
      codeValue: '3rem',
      synced: false
    },

    // Shadows
    {
      name: 'Shadow Small',
      value: '0 1px 2px rgba(0, 0, 0, 0.05)',
      type: 'shadow',
      category: 'Elevation',
      figmaValue: '0 1px 2px rgba(0, 0, 0, 0.05)',
      codeValue: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      synced: true
    },
    {
      name: 'Shadow Medium',
      value: '0 4px 6px rgba(0, 0, 0, 0.1)',
      type: 'shadow',
      category: 'Elevation',
      figmaValue: '0 4px 6px rgba(0, 0, 0, 0.1)',
      codeValue: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      synced: false
    }
  ], [])

  const filteredTokens = useMemo(() => {
    if (selectedTokenType === 'all') return designTokens
    return designTokens.filter(token => token.type === selectedTokenType)
  }, [designTokens, selectedTokenType])

  const syncStats = useMemo(() => {
    const total = designTokens.length
    const synced = designTokens.filter(token => token.synced).length
    const outdated = total - synced
    const syncPercentage = Math.round((synced / total) * 100)

    return { total, synced, outdated, syncPercentage }
  }, [designTokens])

  const handleSyncAll = async () => {
    setSyncStatus('syncing')
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setSyncStatus('complete')
    setTimeout(() => setSyncStatus('idle'), 2000)
  }

  const getTokenIcon = (type: DesignToken['type']) => {
    switch (type) {
      case 'color': return Palette
      case 'typography': return Type
      case 'spacing': return Move
      case 'shadow': return Zap
      default: return Palette
    }
  }

  const TokenItem = ({ token }: { token: DesignToken }) => {
    const Icon = getTokenIcon(token.type)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 border rounded-lg ${
          token.synced 
            ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
            : 'border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`p-2 rounded-lg ${
              token.synced 
                ? 'bg-green-100 dark:bg-green-800' 
                : 'bg-orange-100 dark:bg-orange-800'
            }`}>
              <Icon className={`w-4 h-4 ${
                token.synced 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-orange-600 dark:text-orange-400'
              }`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-medium text-mw-gray-900 dark:text-white">
                  {token.name}
                </h4>
                <Badge 
                  variant={token.synced ? 'success' : 'warning'}
                  size="sm"
                >
                  {token.synced ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Synced
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Outdated
                    </>
                  )}
                </Badge>
              </div>
              
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mb-3">
                {token.category}
              </p>

              {/* Value Comparison */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 mb-1">
                    Figma Value
                  </p>
                  <div className="p-2 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-600 rounded">
                    {token.type === 'color' ? (
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded border border-mw-gray-300"
                          style={{ backgroundColor: token.figmaValue }}
                        />
                        <code className="text-xs">{token.figmaValue}</code>
                      </div>
                    ) : (
                      <code className="text-xs">{token.figmaValue}</code>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 mb-1">
                    Code Value
                  </p>
                  <div className="p-2 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-600 rounded">
                    {token.type === 'color' ? (
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded border border-mw-gray-300"
                          style={{ backgroundColor: token.codeValue }}
                        />
                        <code className="text-xs">{token.codeValue}</code>
                      </div>
                    ) : (
                      <code className="text-xs">{token.codeValue}</code>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!token.synced && (
            <Button variant="outline" size="sm" className="ml-4">
              <RefreshCw className="w-3 h-3 mr-1" />
              Sync
            </Button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              Design Token Sync
            </h3>
            <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
              Compare and synchronize design tokens between Figma and code
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSyncAll}
              disabled={syncStatus === 'syncing'}
            >
              {syncStatus === 'syncing' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync All
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sync Status */}
        <div className="mt-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-mw-gray-900 dark:text-white">
              Sync Status
            </span>
            <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
              {syncStats.synced} of {syncStats.total} tokens synced
            </span>
          </div>
          <Progress value={syncStats.syncPercentage} className="mb-3" />
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-mw-gray-600 dark:text-mw-gray-400">
                {syncStats.synced} Synced
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-mw-gray-600 dark:text-mw-gray-400">
                {syncStats.outdated} Outdated
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedTokenType} onValueChange={(value) => setSelectedTokenType(value as any)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="color">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="shadow">Shadows</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTokenType} className="mt-6">
            <div className="space-y-4">
              {filteredTokens.map((token, index) => (
                <TokenItem key={`${token.name}-${index}`} token={token} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredTokens.length === 0 && (
          <div className="text-center py-8">
            <Palette className="w-12 h-12 mx-auto text-mw-gray-400 mb-4" />
            <p className="text-mw-gray-600 dark:text-mw-gray-400">
              No tokens found for the selected type
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

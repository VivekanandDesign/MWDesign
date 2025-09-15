'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { PageHero } from '@/components/PageHero'
import { Footer } from '@/components/Footer'
import { SimpleIconsPage } from '@/components/icons/SimpleIconsPage'
import { getLucideMetadata } from '@/lib/lucide-icons'

export default function IconsPage() {
  const lucideMetadata = getLucideMetadata()
  
  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      <Navigation />
      <PageHero
        title="Icons"
        description="Complete Lucide icon library with over 3,400 carefully crafted icons for your design system"
        badge={{
          text: `${lucideMetadata.totalIcons.toLocaleString()} Lucide Icons`,
          variant: 'primary'
        }}
      />
      
      <SimpleIconsPage />
      
      <Footer />
    </div>
  )
}

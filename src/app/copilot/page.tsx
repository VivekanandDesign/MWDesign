'use client'

import { Navigation } from '../../components/Navigation'
import { CopilotInterface } from './components/CopilotInterface'
import { CopilotHero } from './components/CopilotHero'
import { CopilotFeatures } from './components/CopilotFeatures'
import { Footer } from '../../components/Footer'

export default function CopilotPage() {
  return (
    <div className="min-h-screen bg-mw-gray-50 dark:bg-mw-gray-900">
      <Navigation />
      <CopilotHero />
      <CopilotInterface />
      <CopilotFeatures />
      <Footer />
    </div>
  )
}

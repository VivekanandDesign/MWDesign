import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AIHero } from './components/AIHero'
import { AIShowcase } from './components/AIShowcase'
import { AIPlayground } from './components/AIPlayground'

export default function AIPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AIHero />
        <AIShowcase />
        <AIPlayground />
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: 'MW-AI-DS | AI-Powered Design System | MovingWalls',
  description: 'Experience the future of design systems with AI-powered tools for component generation, theme creation, and intelligent design assistance.',
}

import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <FeatureGrid />
      </main>
      <Footer />
    </div>
  )
}

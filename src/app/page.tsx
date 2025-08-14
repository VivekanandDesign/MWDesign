import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { BrandShowcase } from '@/components/BrandShowcase'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <BrandShowcase />
        <FeatureGrid />
      </main>
      <Footer />
    </div>
  )
}

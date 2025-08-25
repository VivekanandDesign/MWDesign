import Link from 'next/link'
import { Button } from './ui/Button'
import { ArrowRight, Zap, Target, Waves as Flow } from 'lucide-react'

export function BrandShowcase() {
  return (
    <section className="py-20 bg-mw-gray-50 dark:bg-mw-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/brand-identity">
            <Button size="lg" className="inline-flex items-center">
              Explore Brand Identity
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

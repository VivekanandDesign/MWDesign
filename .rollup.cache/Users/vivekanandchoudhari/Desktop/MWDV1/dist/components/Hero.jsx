import Link from 'next/link';
import { Button } from './ui/Button';
import { ArrowRight, Palette, Code, BookOpen } from 'lucide-react';
export function Hero() {
    return (<section className="relative overflow-hidden bg-mw-primary-50 dark:bg-mw-gray-900 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-20"></div>
      
      {/* Moving Walls Brand Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-mw-primary-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-mw-flow-200 rounded-full blur-2xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-mw-primary-100 dark:bg-mw-primary-900/20 text-mw-primary-700 dark:text-mw-primary-300 text-sm font-medium mb-8 shadow-lg">
            <Palette className="w-4 h-4 mr-2"/>
            Moving Walls Global Design System v1.0
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-mw-gray-900 dark:text-white mb-6">
            <span className="block">Moving Walls</span>
            <span className="block text-mw-primary-600 dark:text-mw-primary-400">
              Design System
            </span>
          </h1>

          {/* Hero Description */}
          <p className="max-w-3xl mx-auto text-xl text-mw-gray-600 dark:text-mw-gray-300 mb-10">
            A Movement-First design system that empowers breakthrough innovations. Built for designers, 
            developers, and visionaries who create transformative digital experiences.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/examples">
              <Button size="lg" className="inline-flex items-center shadow-2xl">
                Explore Examples
                <ArrowRight className="ml-2 w-4 h-4"/>
              </Button>
            </Link>
            <Link href="/components">
              <Button variant="flow" size="lg" className="inline-flex items-center">
                <Code className="mr-2 w-4 h-4"/>
                Explore Components
              </Button>
            </Link>
          </div>

          {/* Hero Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-white/80 dark:bg-mw-gray-800/80 backdrop-blur-sm border border-mw-primary-200 dark:border-mw-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-mw-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Palette className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-3">
                Energy Design Tokens
              </h3>
              <p className="text-mw-gray-600 dark:text-mw-gray-300">
                Movement-First tokens with Energy Blue, Movement Orange, and Flow Teal creating dynamic visual experiences.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/80 dark:bg-mw-gray-800/80 backdrop-blur-sm border border-mw-secondary-200 dark:border-mw-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-mw-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Code className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-3">
                Moving Walls Components
              </h3>
              <p className="text-mw-gray-600 dark:text-mw-gray-300">
                78+ components designed for breakthrough experiences - from micro-interactions to complex patterns.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/80 dark:bg-mw-gray-800/80 backdrop-blur-sm border border-mw-flow-200 dark:border-mw-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-mw-flow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-3">
                Flow Documentation
              </h3>
              <p className="text-mw-gray-600 dark:text-mw-gray-300">
                Seamless guidelines that flow from concept to implementation, ensuring every interaction feels intentional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
//# sourceMappingURL=Hero.jsx.map
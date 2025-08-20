'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { 
  Zap, 
  Target, 
  Palette, 
  Layers, 
  Move, 
  ArrowRight,
  Users,
  Heart,
  Lightbulb,
  Globe,
  Star,
  TrendingUp,
  Eye,
  Compass,
  Rocket
} from 'lucide-react'

export default function BrandIdentityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-mw-gray-900">
      <Navigation />
      
      <PageHero
        title="Moving Walls Brand Identity"
        description="Discover the story, vision, and design philosophy behind our unique design system"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Brand Story Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Our Story</Badge>
            <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Breaking Barriers Through Design
            </h2>
            <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto">
              Moving Walls isn't just a design system—it's a philosophy of transformation, 
              accessibility, and endless possibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-mw-blue-600 dark:text-mw-blue-400">
                <Move className="w-5 h-5" />
                <span className="font-semibold">The Moving Walls Story</span>
              </div>
              
              <h3 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                Every wall is an opportunity to move forward
              </h3>
              
              <div className="space-y-4 text-mw-gray-600 dark:text-mw-gray-300 leading-relaxed">
                <p>
                  In 2023, our team faced a challenge that many organizations encounter: 
                  design inconsistency across products, lengthy development cycles, and 
                  barriers that prevented seamless user experiences.
                </p>
                
                <p>
                  Rather than accepting these limitations, we chose to move the walls. 
                  We envisioned a design system that doesn't just standardize—it liberates. 
                  One that doesn't just organize—it inspires.
                </p>
                
                <p>
                  Moving Walls was born from the belief that great design should be 
                  accessible, scalable, and transformative. It should break down the 
                  barriers between conception and creation, between designers and developers, 
                  between vision and reality.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 dark:from-mw-blue-950 dark:to-mw-blue-900 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-20 h-20 bg-mw-blue-600 rounded-full opacity-10"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-mw-blue-400 rounded-full opacity-10"></div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mw-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">68+</div>
                      <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Components</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mw-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">10x</div>
                      <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Faster Build</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mw-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">100%</div>
                      <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Accessible</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-mw-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">Infinite</div>
                      <div className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Possibilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Vision & Strategy */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-mw-blue-600 dark:text-mw-blue-400 mb-4">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Brand Vision & Strategy</span>
            </div>
            <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
              Our North Star
            </h2>
            <p className="text-xl text-mw-gray-600 dark:text-mw-gray-300 max-w-3xl mx-auto">
              Moving Walls is guided by a clear vision: to democratize exceptional design 
              and make innovation accessible to all.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <Card className="border-2 border-dashed border-mw-blue-200 dark:border-mw-blue-800 hover:border-mw-blue-400 dark:hover:border-mw-blue-600 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white">Mission</h3>
              </CardHeader>
              <CardContent>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 leading-relaxed">
                  To break down the barriers between great design and great implementation, 
                  empowering teams to build beautiful, accessible, and meaningful experiences 
                  without compromise.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-2 border-dashed border-mw-blue-200 dark:border-mw-blue-800 hover:border-mw-blue-400 dark:hover:border-mw-blue-600 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white">Vision</h3>
              </CardHeader>
              <CardContent>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 leading-relaxed">
                  A world where every digital experience is thoughtfully designed, 
                  universally accessible, and genuinely delightful—where the only limit 
                  to innovation is imagination itself.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="border-2 border-dashed border-mw-blue-200 dark:border-mw-blue-800 hover:border-mw-blue-400 dark:hover:border-mw-blue-600 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white">Values</h3>
              </CardHeader>
              <CardContent>
                <p className="text-mw-gray-600 dark:text-mw-gray-300 leading-relaxed">
                  <strong>Accessibility first.</strong> <strong>Innovation always.</strong> 
                  <strong>Community driven.</strong> We believe great design should be 
                  inclusive, forward-thinking, and created together.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Brand Essence */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Brand Essence</Badge>
            <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
              What Makes Us Move
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-mw-gray-50 dark:bg-mw-gray-800 hover:bg-mw-blue-50 dark:hover:bg-mw-blue-950 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Move className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-mw-gray-900 dark:text-white mb-2">Dynamic</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                Always evolving, always adapting, always moving forward
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-mw-gray-50 dark:bg-mw-gray-800 hover:bg-mw-blue-50 dark:hover:bg-mw-blue-950 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-mw-gray-900 dark:text-white mb-2">Innovative</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                Pushing boundaries and reimagining possibilities
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-mw-gray-50 dark:bg-mw-gray-800 hover:bg-mw-blue-50 dark:hover:bg-mw-blue-950 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-mw-gray-900 dark:text-white mb-2">Accessible</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                Open to all, designed for everyone, excluding no one
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-mw-gray-50 dark:bg-mw-gray-800 hover:bg-mw-blue-50 dark:hover:bg-mw-blue-950 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-mw-gray-900 dark:text-white mb-2">Progressive</h3>
              <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                Building bridges to tomorrow's experiences
              </p>
            </div>
          </div>
        </section>

        {/* Brand Personality */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-mw-blue-50 via-purple-50 to-pink-50 dark:from-mw-gray-800 dark:via-mw-gray-800 dark:to-mw-gray-800 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Brand Personality</Badge>
              <h2 className="text-4xl font-bold text-mw-gray-900 dark:text-white mb-6">
                Our Voice & Character
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-4">
                    Primary Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Dynamic', 'Innovative', 'Accessible', 'Progressive'].map((trait) => (
                      <Badge key={trait} variant="secondary" className="text-sm">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-4">
                    Secondary Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Trustworthy', 'Human-Centered', 'Adaptable', 'Inspiring'].map((trait) => (
                      <Badge key={trait} variant="outline" className="text-sm">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-mw-gray-900 dark:text-white mb-4">
                    Voice & Tone
                  </h3>
                  <p className="text-mw-gray-600 dark:text-mw-gray-300 leading-relaxed">
                    <strong>Confident yet approachable.</strong> We speak with authority earned 
                    through experience, but remain humble and human. Our tone is clear, 
                    empowering, and optimistic—like a trusted mentor who believes in your potential.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-mw-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-mw-gray-900 dark:text-white mb-2">
                          "Moving Walls doesn't just solve design problems—it inspires solutions."
                        </h4>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                          — Our design philosophy in action
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-mw-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-mw-gray-900 dark:text-white mb-2">
                          "Every component is crafted with intention, designed with empathy."
                        </h4>
                        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                          — Our commitment to human-centered design
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Carousel, CarouselSlide, ImageCarousel } from '@/components/ui/Carousel'
import { Thumbnail } from '@/components/ui/Thumbnail'
import { Progress } from '@/components/ui/Progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Settings,
  Star,
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  ExternalLink
} from 'lucide-react'

export default function CarouselShowcase() {
  const [autoPlay, setAutoPlay] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample data for different carousel types
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      title: 'Modern Business Solutions',
      subtitle: 'Streamline your workflow with our cutting-edge tools',
      cta: 'Get Started'
    },
    {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      title: 'Data-Driven Insights',
      subtitle: 'Make informed decisions with powerful analytics',
      cta: 'Learn More'
    },
    {
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop',
      title: 'Collaborative Workspace',
      subtitle: 'Connect your team and boost productivity',
      cta: 'Start Free Trial'
    }
  ]

  const products = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: '$299',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: '$199',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Wireless Speaker',
      price: '$149',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Camera Lens',
      price: '$599',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      badge: 'Pro'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100&h=100&fit=crop&crop=face',
      quote: 'The Moving Walls design system has transformed how we build interfaces. The components are intuitive and the documentation is excellent.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Frontend Developer',
      company: 'StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      quote: 'Incredible attention to detail and accessibility. Our development speed increased by 40% after adopting these components.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'DesignStudio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      quote: 'Beautiful, consistent, and highly customizable. This design system bridges the gap between design and development perfectly.',
      rating: 5
    }
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617761043968-2f38b374b45e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616628188540-0092d80d5dc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop'
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/examples">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Examples
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white">
                  Interactive Carousel Showcase
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">Carousel & Galleries</Badge>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => window.open(window.location.href, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-4">
              Comprehensive carousel components with auto-play, thumbnails, indicators, and responsive layouts for various content types.
            </p>
            <p className="text-mw-gray-600 dark:text-mw-gray-400">
              <span className="font-medium">Use Case:</span> Hero sections, product galleries, testimonials, image showcases, and content sliders.
            </p>
          </div>

          {/* Preview Content */}
          <div className="bg-gradient-to-br from-mw-gray-50 to-mw-blue-50 dark:from-mw-gray-900 dark:to-mw-gray-800 rounded-lg p-8 mb-8">
            <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Carousel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white">Hero Carousel</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoPlay(!autoPlay)}
              >
                {autoPlay ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {autoPlay ? 'Pause' : 'Play'}
              </Button>
              <Badge variant="secondary">Auto-play: {autoPlay ? 'On' : 'Off'}</Badge>
            </div>
          </div>
          
          <Card className="overflow-hidden">
            <Carousel
              autoplay={autoPlay}
              autoplayInterval={4000}
              showDots={true}
              showArrows={true}
              className="h-96"
            >
              {heroImages.map((slide, index) => (
                <CarouselSlide key={index}>
                  <div 
                    className="relative h-96 bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${slide.src})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="relative z-10 text-center text-white max-w-2xl px-6">
                      <h3 className="text-4xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-xl mb-6 opacity-90">{slide.subtitle}</p>
                      <Button size="lg" className="bg-white text-mw-gray-900 hover:bg-mw-gray-100">
                        {slide.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CarouselSlide>
              ))}
            </Carousel>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Carousel */}
          <section>
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-4">Product Gallery</h2>
            <Card>
              <CardContent className="p-6">
                <Carousel
                  slidesToShow={2}
                  slidesToScroll={1}
                  showArrows={true}
                  className="product-carousel"
                >
                  {products.map((product) => (
                    <CarouselSlide key={product.id}>
                      <div className="p-4">
                        <Card className="h-full">
                          <div className="relative">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <Badge 
                              className="absolute top-2 left-2"
                              variant={product.badge === 'Sale' ? 'error' : product.badge === 'New' ? 'success' : 'primary'}
                            >
                              {product.badge}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-mw-gray-900 dark:text-white mb-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-mw-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-mw-gray-600 dark:text-mw-gray-400">
                                {product.rating}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-mw-gray-900 dark:text-white">
                                {product.price}
                              </span>
                              <Button size="sm">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselSlide>
                  ))}
                </Carousel>
              </CardContent>
            </Card>
          </section>

          {/* Testimonials Carousel */}
          <section>
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-4">Customer Testimonials</h2>
            <Card>
              <CardContent className="p-6">
                <Carousel
                  autoplay={true}
                  autoplayInterval={5000}
                  showDots={true}
                >
                  {testimonials.map((testimonial, index) => (
                    <CarouselSlide key={index}>
                      <div className="text-center p-6">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mx-auto mb-4"
                        />
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-lg text-mw-gray-700 dark:text-mw-gray-300 mb-4 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <div className="font-semibold text-mw-gray-900 dark:text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CarouselSlide>
                  ))}
                </Carousel>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Image Gallery Carousel */}
        <section>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-4">Image Gallery with Thumbnails</h2>
          <Card>
            <CardContent className="p-6">
              <ImageCarousel
                images={galleryImages.map((src, index) => ({
                  src,
                  alt: `Gallery image ${index + 1}`,
                  caption: `Beautiful landscape ${index + 1}`
                }))}
                showDots={true}
                autoplay={true}
                autoplayInterval={3000}
                className="max-w-4xl mx-auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* Carousel Controls Demo */}
        <section>
          <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-4">Carousel Controls & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Navigation Controls</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Arrow navigation</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dot indicators</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Keyboard support</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Touch/swipe</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Playback Options</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-play</span>
                  <Badge variant={autoPlay ? 'success' : 'secondary'}>
                    {autoPlay ? 'On' : 'Off'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Infinite loop</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pause on hover</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Custom timing</span>
                  <Badge variant="success">4s</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Advanced Features</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Lazy loading</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Responsive design</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Custom animations</span>
                  <Badge variant="success">Slide</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Accessibility</span>
                  <Badge variant="success">WCAG 2.1</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
        
    </div>
    </main>
      
    <Footer />
  </div>
  )
}

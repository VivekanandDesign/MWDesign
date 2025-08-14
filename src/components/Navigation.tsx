'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Palette, Code, BookOpen, Heart } from 'lucide-react'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'

const navigationItems = [
  { name: 'Brand Identity', href: '/brand-identity', icon: Heart },
  { name: 'Design Tokens', href: '/tokens', icon: Palette },
  { name: 'New Design Tokens', href: '/new-design-tokens', icon: Palette },
  { name: 'Components', href: '/components', icon: Code },
  { name: 'Icons', href: '/icons', icon: Palette },
  { name: 'Patterns', href: '/patterns', icon: Code },
  { name: 'Design Process', href: '/design-process', icon: BookOpen },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-mw-gray-900 border-b border-mw-gray-200 dark:border-mw-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mw-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">MW</span>
              </div>
              <span className="font-bold text-xl text-mw-gray-900 dark:text-white">
                Design System
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600 dark:hover:text-mw-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mw-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-mw-gray-900 border-t border-mw-gray-200 dark:border-mw-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-primary-600 hover:bg-mw-primary-50 dark:hover:text-mw-primary-400 dark:hover:bg-mw-primary-900 px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

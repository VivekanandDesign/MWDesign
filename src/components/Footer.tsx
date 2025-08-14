import Link from 'next/link'

const footerSections = [
  {
    title: 'Design System',
    links: [
      { name: 'Design Tokens', href: '/tokens' },
      { name: 'Components', href: '/components' },
      { name: 'Patterns', href: '/patterns' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Figma Library', href: '/resources#figma' },
      { name: 'Icon Library', href: '/icons' },
      { name: 'Downloads', href: '/resources#downloads' },
      { name: 'Developer Tools', href: '/resources#tools' },
    ]
  }
]

export function Footer() {
  return (
    <footer className="bg-mw-gray-50 dark:bg-mw-gray-900 border-t border-mw-gray-200 dark:border-mw-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-mw-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MW</span>
                </div>
                <span className="font-bold text-2xl text-mw-gray-900 dark:text-white">
                  Design System
                </span>
              </div>
              
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 max-w-md">
                A comprehensive design system that empowers teams to build consistent, 
                accessible, and scalable digital experiences.
              </p>
            </div>
            
            {/* Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-mw-gray-600 dark:text-mw-gray-300 hover:text-mw-blue-600 dark:hover:text-mw-blue-400 transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-mw-gray-200 dark:border-mw-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-mw-gray-600 dark:text-mw-gray-400">
              © 2025 Moving Walls. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-blue-600 dark:hover:text-mw-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-blue-600 dark:hover:text-mw-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

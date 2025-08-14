import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Moving Walls Global Design System',
  description: 'A comprehensive design system for Moving Walls digital products',
  keywords: ['design system', 'components', 'UI', 'UX', 'Moving Walls'],
  authors: [{ name: 'Moving Walls Team' }],
  openGraph: {
    title: 'Moving Walls Global Design System',
    description: 'A comprehensive design system for Moving Walls digital products',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sf-pro antialiased bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
}

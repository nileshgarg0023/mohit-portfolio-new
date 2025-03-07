'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/blog-settings', label: 'Blog Settings' },
    { href: '/admin/contact-messages', label: 'Contact Messages' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black">
      {/* Navigation */}
      <nav className="bg-black/80 border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="text-cyan-400 font-mono text-lg hover:text-cyan-300 transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-mono transition-all ${
                    pathname === item.href
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  )
} 
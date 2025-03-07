'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from './mobile-menu'

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'EXPERIENCE', path: '/#experience' },
  { name: 'PROJECTS', path: '/#projects' },
  { name: 'BLOG', path: '/blog' },
  { name: 'CONTACT', path: '/#contact' }
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="relative group">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                MOHIT.SEC
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path || 
                  (pathname === '/' && item.path.startsWith('/#')) ||
                  (item.path === '/' && pathname === '/')
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2 rounded-lg font-mono text-sm group ${
                      isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-cyan-950/50 rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden relative group p-2"
            >
              <div className="w-6 h-0.5 bg-cyan-400 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-cyan-400 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-cyan-400"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  )
} 
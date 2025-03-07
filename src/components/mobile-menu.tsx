'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{ name: string; path: string }>
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-64 bg-black border-l border-cyan-500/30 z-50"
          >
            {/* Menu header */}
            <div className="p-4 border-b border-cyan-800/50">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-mono text-sm">NAVIGATION_MENU.sh</span>
                <button onClick={onClose} className="text-gray-500 hover:text-cyan-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path || 
                  (pathname === '/' && item.path.startsWith('/#')) ||
                  (item.path === '/' && pathname === '/')

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={onClose}
                    className={`block px-4 py-2 rounded-lg font-mono text-sm relative group ${
                      isActive ? 'text-cyan-400 bg-cyan-950/50' : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                )
              })}
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-800/50">
              <div className="text-xs font-mono text-cyan-500/50 flex items-center">
                <span className="animate-pulse mr-2">⚡</span>
                SYSTEM_READY
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 
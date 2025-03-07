'use client'

import { motion } from 'framer-motion'
import BlogFeed from '@/components/blog-feed'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black py-20">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-20"></div>
        <div className="scan-line"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 cyber-glitch-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              MISSION BRIEFINGS
            </span>
          </h1>
          <p className="text-cyan-400 font-mono text-lg mb-8">
            Classified documents on cybersecurity and technology
          </p>
        </motion.div>

        {/* Blog Feed */}
        <BlogFeed />
      </div>
    </div>
  )
} 
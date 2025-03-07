'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface MediumConfig {
  username: string
  display_count: number
  auto_sync: boolean
  categories: string[]
}

export default function MediumIntegration() {
  const [config, setConfig] = useState<MediumConfig>({
    username: '',
    display_count: 3,
    auto_sync: true,
    categories: []
  })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<any[]>([])

  const handleSave = async () => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('medium_config')
        .upsert({ ...config, updated_at: new Date() })

      if (error) throw error
      
      // Trigger initial sync
      await fetchMediumPosts()
    } catch (err) {
      console.error('Error saving config:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMediumPosts = async () => {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${config.username}`
      )
      const data = await response.json()
      setPreview(data.items.slice(0, config.display_count))
    } catch (err) {
      console.error('Error fetching Medium posts:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-glitch-text">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                MEDIUM INTEGRATION MATRIX
              </span>
            </h1>
            <p className="text-cyan-400 font-mono">Configure your Medium blog synchronization parameters</p>
          </div>

          {/* Configuration Form */}
          <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden p-6">
            <div className="relative">
              {/* Glowing border */}
              <div className="absolute -inset-0.5 rounded-xl opacity-75 blur-sm border-glow bg-gradient-to-br from-cyan-500/30 to-purple-600/30"></div>
              
              {/* Form content */}
              <div className="relative space-y-6">
                {/* Username input */}
                <div>
                  <label className="block text-cyan-400 font-mono mb-2">Medium Username</label>
                  <input
                    type="text"
                    value={config.username}
                    onChange={(e) => setConfig({ ...config, username: e.target.value })}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    placeholder="@username"
                  />
                </div>

                {/* Display count */}
                <div>
                  <label className="block text-cyan-400 font-mono mb-2">Posts to Display</label>
                  <input
                    type="number"
                    value={config.display_count}
                    onChange={(e) => setConfig({ ...config, display_count: parseInt(e.target.value) })}
                    className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    min="1"
                    max="10"
                  />
                </div>

                {/* Auto sync toggle */}
                <div className="flex items-center space-x-4">
                  <label className="text-cyan-400 font-mono">Auto Synchronization</label>
                  <button
                    onClick={() => setConfig({ ...config, auto_sync: !config.auto_sync })}
                    className={`px-4 py-2 rounded-lg font-mono transition-colors ${
                      config.auto_sync
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}
                  >
                    {config.auto_sync ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-cyan-400 font-mono mb-2">Categories Filter</label>
                  <input
                    type="text"
                    placeholder="Enter categories separated by commas"
                    className="w-full bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    value={config.categories.join(', ')}
                    onChange={(e) => setConfig({
                      ...config,
                      categories: e.target.value.split(',').map(cat => cat.trim()).filter(Boolean)
                    })}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => fetchMediumPosts()}
                    className="px-6 py-2 bg-cyan-900/50 text-cyan-400 rounded-lg font-mono border border-cyan-500/30 hover:bg-cyan-900/70 transition-colors"
                  >
                    PREVIEW
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg font-mono border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'SAVING...' : 'SAVE CONFIG'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview section */}
          {preview.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-cyan-400 font-mono mb-6">PREVIEW MATRIX</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preview.map((post, index) => (
                  <motion.div
                    key={post.guid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/80 border border-cyan-500/30 rounded-xl overflow-hidden group hover:border-cyan-500/60 transition-colors"
                  >
                    <div className="relative h-48">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-cyan-400 font-mono">
                          {new Date(post.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 
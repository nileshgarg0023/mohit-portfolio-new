'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface MediumPost {
  title: string
  content: string
  thumbnail: string
  link: string
  pubDate: string
  categories: string[]
  author: string
}

export default function MediumFeed({ username }: { username: string }) {
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMediumPosts()
  }, [username])

  const fetchMediumPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
      )
      const data = await response.json()
      
      if (data.status === 'ok') {
        setPosts(data.items)
      } else {
        throw new Error('Failed to fetch Medium posts')
      }
    } catch (err) {
      console.error('Error fetching Medium posts:', err)
      setError('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-mono min-h-[400px] flex items-center justify-center">
        {error}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.a
          key={post.link}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden h-full hover:border-cyan-500/60 transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.thumbnail || '/default-blog-image.jpg'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Terminal-style header */}
              <div className="flex items-center mb-4 border-b border-cyan-800/50 pb-2">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-cyan-400">
                  {new Date(post.pubDate).toLocaleDateString()}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="text-xs px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded-full font-mono"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center mt-4">
                <span className="text-gray-400 text-sm font-mono">
                  By {post.author}
                </span>
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </motion.a>
      ))}
    </div>
  )
} 
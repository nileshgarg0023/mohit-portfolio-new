'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { BlogPost, BlogSettings } from '@/lib/supabase'
import MediumFeed from './medium-feed'

export default function BlogFeed() {
  const [dbPosts, setDbPosts] = useState<BlogPost[]>([])
  const [settings, setSettings] = useState<BlogSettings>({
    id: 'default',
    show_medium_posts: false,
    medium_username: null,
    show_db_posts: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    if (settings.show_db_posts) {
      fetchDbPosts()
    } else {
      setLoading(false)
    }
  }, [settings.show_db_posts])

  const fetchSettings = async () => {
    try {
      const { data, error: settingsError } = await supabase
        .from('blog_settings')
        .select('*')
        .single()

      if (settingsError) {
        // If no settings exist, use defaults
        if (settingsError.code === 'PGRST116') {
          return
        }
        throw settingsError
      }
      
      if (data) {
        setSettings(data)
      }
    } catch (err) {
      console.error('Error fetching blog settings:', err)
      // Don't show error to user, just use defaults
    }
  }

  const fetchDbPosts = async () => {
    try {
      setLoading(true)
      const { data, error: postsError } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (postsError) throw postsError
      setDbPosts(data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching blog posts:', err)
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

  return (
    <div className="space-y-16">
      {/* Database Posts */}
      {settings.show_db_posts && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Internal Archives
            </span>
          </h2>
          
          {error ? (
            <div className="text-center text-red-500 font-mono min-h-[200px] flex items-center justify-center">
              {error}
            </div>
          ) : dbPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="group relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden transition-all hover:border-cyan-500/60">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
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
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-cyan-900/30 text-cyan-400 text-xs px-3 py-1 rounded-full font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 font-mono min-h-[200px] flex items-center justify-center">
              No internal posts found
            </div>
          )}
        </section>
      )}

      {/* Medium Posts */}
      {settings.show_medium_posts && settings.medium_username && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              External Transmissions
            </span>
          </h2>
          <MediumFeed username={settings.medium_username} />
        </section>
      )}

      {/* No posts message */}
      {(!settings.show_db_posts && !settings.show_medium_posts) && (
        <div className="text-center text-gray-400 font-mono min-h-[400px] flex items-center justify-center">
          No blog posts configured. Visit the <Link href="/admin/blog-settings" className="text-cyan-400 hover:underline">admin settings</Link> to enable posts.
        </div>
      )}
    </div>
  )
} 
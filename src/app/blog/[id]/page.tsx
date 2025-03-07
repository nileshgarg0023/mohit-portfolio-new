'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'
import BlogContent from '@/components/blog-content'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const { data, error: postError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', params.id)
        .single()

      if (postError) throw postError
      setPost(data)
    } catch (err) {
      console.error('Error fetching blog post:', err)
      setError('Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-mono">
        {error || 'Blog post not found'}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black py-20">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-20"></div>
        <div className="scan-line"></div>
      </div>

      <article className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30"></div>
          <div className="relative w-full h-full">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              >
                {post.title}
              </motion.h1>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-cyan-900/30 text-cyan-400 text-sm px-3 py-1 rounded-full font-mono border border-cyan-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Date */}
              <div className="font-mono text-cyan-400 text-sm">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto">
          <BlogContent content={post.content} />
        </div>
      </article>
    </div>
  )
} 
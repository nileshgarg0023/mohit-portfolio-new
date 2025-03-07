'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/lib/supabase'
import { sampleProjects } from '@/data/sample-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [projects, setProjects] = useState<Project[]>([])
  const [showSampleData, setShowSampleData] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (data && data.length > 0) {
        setProjects(data)
        setShowSampleData(false)
      }
    }

    fetchProjects()

    // Subscribe to changes
    const channel = supabase
      .channel('projects')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          console.log('Change received!', payload)
          fetchProjects()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const displayProjects = showSampleData ? sampleProjects : projects

  return (
    <section ref={containerRef} id="projects" className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-black via-cyan-950/10 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-20"></div>
        <div className="scan-line"></div>
        
        {/* Star field */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.5 + 0.25
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 cyber-glitch-text relative inline-block" data-text="SECURITY PROJECTS">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-text">
                SECURITY PROJECTS
              </span>
              <div className="absolute -inset-4 blur-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 -z-10 rounded-full"></div>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="px-8 font-mono text-base text-cyan-400 tracking-wider">FEATURED WORK</div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayProjects && displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 overflow-hidden group">
                  <div className="relative">
                    {/* Project image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>

                    {/* Project content */}
                    <div className="relative p-6">
                      {/* Terminal-style header */}
                      <div className="flex items-center mb-4 border-b border-cyan-800/50 pb-2">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="font-mono text-xs text-cyan-400">project_{project.id}.sh</div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:to-purple-500 transition-all duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded-full border border-cyan-800/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 bg-black/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
                        >
                          <Link href={project.github_url} target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 bg-black/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300"
                        >
                          <Link href={project.demo_url} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
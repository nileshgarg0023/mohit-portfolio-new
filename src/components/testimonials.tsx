'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at TechSecure",
    content: "Working with this cybersecurity expert was transformative for our organization. Their implementation of zero-trust architecture significantly improved our security posture.",
    image: "/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Security Director at GlobalDefense",
    content: "The depth of knowledge in automotive security is impressive. They helped us develop a comprehensive security framework for our connected vehicles.",
    image: "/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Lead Security Engineer at SecureNet",
    content: "Their expertise in threat intelligence and incident response was invaluable. The AI-powered platform they developed revolutionized our security operations.",
    image: "/images/testimonial3.jpg"
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-30"></div>
        <div className="scan-line"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 cyber-glitch-text" data-text="TESTIMONIALS">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                CLIENT FEEDBACK
              </span>
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="px-4 font-mono text-xs text-cyan-500">MISSION ACCOMPLISHED</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 h-full">
                  <div className="relative">
                    {/* Glowing border */}
                    <div className="absolute -inset-0.5 rounded-xl opacity-75 blur-sm border-glow bg-gradient-to-br from-cyan-500/30 to-purple-600/30"></div>
                    
                    {/* Card content */}
                    <div className="relative p-6">
                      {/* Terminal-style header */}
                      <div className="flex items-center mb-4 border-b border-cyan-800/50 pb-2">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="font-mono text-xs text-cyan-400">client_{testimonial.id}.log</div>
                      </div>

                      {/* Testimonial content */}
                      <div className="space-y-4">
                        <p className="text-gray-300 font-mono text-sm leading-relaxed">
                          "{testimonial.content}"
                        </p>

                        <div className="flex items-center space-x-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-500/30">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-white font-bold">{testimonial.name}</h3>
                            <p className="text-cyan-400 font-mono text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>

                      {/* Data flow animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 data-flow"></div>
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
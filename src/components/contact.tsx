'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import ContactInfo from './contact-info'
import type { ContactMessage } from '@/lib/supabase'
import { toast } from 'sonner'

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all fields')
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        })

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        throw new Error('Failed to send message. Please try again.')
      }

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      
      // Show success message
      toast.success('Message sent successfully!')
    } catch (err) {
      console.error('Error submitting form:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={containerRef} id="contact" className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-black via-cyan-950/10 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-20"></div>
        <div className="scan-line"></div>
        
        {/* Enhanced star field */}
        {Array.from({ length: 75 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
              opacity: Math.random() * 0.7 + 0.3
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
            <h2 className="text-5xl md:text-7xl font-bold mb-8 cyber-glitch-text relative inline-block" data-text="ESTABLISH CONTACT">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-text">
                ESTABLISH CONTACT
              </span>
              <div className="absolute -inset-4 blur-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 -z-10 rounded-full"></div>
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="px-8 font-mono text-base text-cyan-400 tracking-wider">SECURE CHANNEL</div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
          </motion.div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Contact form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-black/80 backdrop-blur-sm border border-cyan-500/30">
                  <div className="relative">
                    {/* Glowing border */}
                    <div className="absolute -inset-0.5 rounded-xl opacity-75 blur-sm border-glow bg-gradient-to-br from-cyan-500/30 to-purple-600/30"></div>
                    
                    {/* Form content */}
                    <div className="relative p-6">
                      {/* Terminal-style header */}
                      <div className="flex items-center mb-6 border-b border-cyan-800/50 pb-2">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="font-mono text-xs text-cyan-400">secure_contact.sh</div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-cyan-400 font-mono text-sm">IDENTIFICATION</label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="bg-black/50 border-cyan-500/30 text-white font-mono focus:border-cyan-500"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-cyan-400 font-mono text-sm">COMMUNICATION CHANNEL</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="bg-black/50 border-cyan-500/30 text-white font-mono focus:border-cyan-500"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-cyan-400 font-mono text-sm">MISSION OBJECTIVE</label>
                          <Input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            required
                            className="bg-black/50 border-cyan-500/30 text-white font-mono focus:border-cyan-500"
                            placeholder="Enter subject"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-cyan-400 font-mono text-sm">MESSAGE CONTENT</label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            required
                            className="bg-black/50 border-cyan-500/30 text-white font-mono focus:border-cyan-500 min-h-[150px]"
                            placeholder="Enter your message"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-mono"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              TRANSMITTING...
                            </>
                          ) : (
                            'INITIATE TRANSMISSION'
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
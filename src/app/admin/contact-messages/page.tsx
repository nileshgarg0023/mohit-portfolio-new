'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { ContactMessage } from '@/lib/supabase'
import { toast } from 'sonner'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const { data, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (messagesError) {
        console.error('Error fetching messages:', messagesError)
        throw new Error('Failed to load messages')
      }
      
      setMessages(data || [])
    } catch (err) {
      console.error('Error:', err)
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      setDeleting(id)
      const { error: deleteError } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Error deleting message:', deleteError)
        throw new Error('Failed to delete message')
      }

      setMessages(messages.filter(msg => msg.id !== id))
      toast.success('Message deleted successfully')
    } catch (err) {
      console.error('Error:', err)
      toast.error('Failed to delete message')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center gap-2 text-cyan-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="font-mono">Loading messages...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Contact Messages
            </span>
          </h1>

          {messages.length === 0 ? (
            <div className="text-center text-gray-400 font-mono bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8">
              No messages found
            </div>
          ) : (
            <div className="grid gap-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden group hover:border-cyan-500/60 transition-colors"
                >
                  <div className="p-6">
                    {/* Terminal-style header */}
                    <div className="flex items-center justify-between mb-4 border-b border-cyan-800/50 pb-2">
                      <div className="flex items-center">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="font-mono text-sm text-cyan-400">
                          message_{message.id}.txt
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMessage(message.id)}
                        disabled={deleting === message.id}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        {deleting === message.id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </Button>
                    </div>

                    {/* Message content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                          {message.subject}
                        </h2>
                        <span className="text-sm text-gray-400 font-mono">
                          {new Date(message.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{message.name}</span>
                        <span>•</span>
                        <a
                          href={`mailto:${message.email}`}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {message.email}
                        </a>
                      </div>

                      <p className="text-gray-300 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 
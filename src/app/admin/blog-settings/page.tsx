'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { BlogSettings } from '@/lib/supabase'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function BlogSettingsPage() {
  const [settings, setSettings] = useState<BlogSettings>({
    id: 'default',
    show_medium_posts: false,
    medium_username: null,
    show_db_posts: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const { data, error: settingsError } = await supabase
        .from('blog_settings')
        .select('*')
        .single()

      if (settingsError) {
        // If no settings exist, create default settings
        if (settingsError.code === 'PGRST116') {
          await createDefaultSettings()
          return
        }
        throw settingsError
      }

      if (data) {
        setSettings(data)
      }
    } catch (err) {
      console.error('Error fetching blog settings:', err)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const createDefaultSettings = async () => {
    try {
      const { error: createError } = await supabase
        .from('blog_settings')
        .insert({
          id: 'default',
          show_medium_posts: false,
          medium_username: null,
          show_db_posts: true,
        })

      if (createError) throw createError
    } catch (err) {
      console.error('Error creating default settings:', err)
      toast.error('Failed to create default settings')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)

      const { error: saveError } = await supabase
        .from('blog_settings')
        .upsert({
          id: settings.id,
          show_medium_posts: settings.show_medium_posts,
          medium_username: settings.medium_username,
          show_db_posts: settings.show_db_posts,
          updated_at: new Date().toISOString(),
        })

      if (saveError) throw saveError
      toast.success('Settings saved successfully')
    } catch (err) {
      console.error('Error saving settings:', err)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center gap-2 text-cyan-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="font-mono">Loading settings...</span>
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
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Blog Settings
            </span>
          </h1>

          <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6">
            {/* Terminal-style header */}
            <div className="flex items-center mb-6 border-b border-cyan-800/50 pb-2">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm text-cyan-400">
                config.terminal
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Database Posts Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Internal Posts</h2>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.show_db_posts}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        show_db_posts: e.target.checked,
                      }))
                    }
                    className="form-checkbox h-5 w-5 text-cyan-500 rounded border-cyan-500/30 bg-black focus:ring-cyan-500"
                  />
                  <span className="text-gray-300">Show database posts</span>
                </label>
              </div>

              {/* Medium Posts Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Medium Integration</h2>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.show_medium_posts}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        show_medium_posts: e.target.checked,
                      }))
                    }
                    className="form-checkbox h-5 w-5 text-cyan-500 rounded border-cyan-500/30 bg-black focus:ring-cyan-500"
                  />
                  <span className="text-gray-300">Show Medium posts</span>
                </label>

                {settings.show_medium_posts && (
                  <div className="space-y-2">
                    <label className="block text-gray-300">Medium Username</label>
                    <input
                      type="text"
                      value={settings.medium_username || ''}
                      onChange={(e) =>
                        setSettings(prev => ({
                          ...prev,
                          medium_username: e.target.value,
                        }))
                      }
                      placeholder="@username"
                      className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Settings'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
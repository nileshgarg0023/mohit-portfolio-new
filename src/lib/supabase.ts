import { createClient } from '@supabase/supabase-js'
import { RealtimeChannel } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  start_date: string
  end_date: string | null
  description: string
  technologies: string[]
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  github_url: string
  demo_url: string
  tags: string[]
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  tags: string[]
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  message: string
  image_url: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface BlogSettings {
  id: string
  show_medium_posts: boolean
  medium_username: string | null
  show_db_posts: boolean
  created_at: string
  updated_at: string
}

type TableName = 'experiences' | 'projects' | 'blogs' | 'testimonials' | 'contact_messages'
type DataType = Experience | Project | BlogPost | Testimonial | ContactMessage

export function subscribeToTable<T extends DataType>(
  table: TableName,
  callback: (payload: { new: T | null; old: T | null }) => void
): RealtimeChannel {
  return supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
      },
      callback
    )
    .subscribe()
} 
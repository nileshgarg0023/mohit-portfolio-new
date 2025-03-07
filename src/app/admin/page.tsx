'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, Experience, Project, BlogPost, subscribeToTable } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash, LogOut, Eye, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function AdminPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [activeTab, setActiveTab] = useState('experiences')
  const [editingItem, setEditingItem] = useState<any>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [previewItem, setPreviewItem] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
      return
    }
    fetchData()

    // Set up real-time subscriptions
    const experiencesSubscription = subscribeToTable<Experience>('experiences', (payload) => {
      if (payload.new) {
        const newExperience = payload.new as Experience
        setExperiences(prev => {
          const index = prev.findIndex(exp => exp.id === newExperience.id)
          if (index === -1) {
            return [newExperience, ...prev]
          }
          return prev.map(exp => exp.id === newExperience.id ? newExperience : exp)
        })
      } else if (payload.old) {
        const oldExperience = payload.old as Experience
        setExperiences(prev => prev.filter(exp => exp.id !== oldExperience.id))
      }
    })

    const projectsSubscription = subscribeToTable<Project>('projects', (payload) => {
      if (payload.new) {
        const newProject = payload.new as Project
        setProjects(prev => {
          const index = prev.findIndex(proj => proj.id === newProject.id)
          if (index === -1) {
            return [newProject, ...prev]
          }
          return prev.map(proj => proj.id === newProject.id ? newProject : proj)
        })
      } else if (payload.old) {
        const oldProject = payload.old as Project
        setProjects(prev => prev.filter(proj => proj.id !== oldProject.id))
      }
    })

    const blogsSubscription = subscribeToTable<BlogPost>('blogs', (payload) => {
      if (payload.new) {
        const newBlog = payload.new as BlogPost
        setBlogs(prev => {
          const index = prev.findIndex(blog => blog.id === newBlog.id)
          if (index === -1) {
            return [newBlog, ...prev]
          }
          return prev.map(blog => blog.id === newBlog.id ? newBlog : blog)
        })
      } else if (payload.old) {
        const oldBlog = payload.old as BlogPost
        setBlogs(prev => prev.filter(blog => blog.id !== oldBlog.id))
      }
    })

    // Cleanup subscriptions
    return () => {
      experiencesSubscription.unsubscribe()
      projectsSubscription.unsubscribe()
      blogsSubscription.unsubscribe()
    }
  }, [user, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const fetchData = async () => {
    try {
      const [experiencesRes, projectsRes, blogsRes] = await Promise.all([
        supabase.from('experiences').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false })
      ])

      if (experiencesRes.data) setExperiences(experiencesRes.data)
      if (projectsRes.data) setProjects(projectsRes.data)
      if (blogsRes.data) setBlogs(blogsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage({ type: 'error', text: 'Error fetching data' })
    }
  }

  const handleExperienceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      title: formData.get('title'),
      company: formData.get('company'),
      location: formData.get('location'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date') || null,
      description: formData.get('description'),
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim())
    }

    try {
      if (editingItem) {
        await supabase.from('experiences').update(data).eq('id', editingItem.id)
      } else {
        await supabase.from('experiences').insert([data])
      }
      setMessage({ type: 'success', text: `Experience ${editingItem ? 'updated' : 'added'} successfully` })
      setEditingItem(null)
      if (form) {
        form.reset()
      }
    } catch (error) {
      console.error('Error saving experience:', error)
      setMessage({ type: 'error', text: 'Error saving experience' })
    }
  }

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
      image_url: formData.get('image_url'),
      github_url: formData.get('github_url'),
      live_url: formData.get('live_url') || null
    }

    try {
      if (editingItem) {
        await supabase.from('projects').update(data).eq('id', editingItem.id)
      } else {
        await supabase.from('projects').insert([data])
      }
      setMessage({ type: 'success', text: `Project ${editingItem ? 'updated' : 'added'} successfully` })
      setEditingItem(null)
      if (form) {
        form.reset()
      }
    } catch (error) {
      console.error('Error saving project:', error)
      setMessage({ type: 'error', text: 'Error saving project' })
    }
  }

  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      image_url: formData.get('image_url'),
      slug: formData.get('title')?.toString().toLowerCase().replace(/\s+/g, '-')
    }

    try {
      if (editingItem) {
        await supabase.from('blogs').update(data).eq('id', editingItem.id)
      } else {
        await supabase.from('blogs').insert([data])
      }
      setMessage({ type: 'success', text: `Blog post ${editingItem ? 'updated' : 'added'} successfully` })
      setEditingItem(null)
      if (form) {
        form.reset()
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
      setMessage({ type: 'error', text: 'Error saving blog post' })
    }
  }

  const handleDelete = async (table: string, id: string) => {
    try {
      await supabase.from(table).delete().eq('id', id)
      setMessage({ type: 'success', text: 'Item deleted successfully' })
      fetchData()
    } catch (error) {
      console.error('Error deleting item:', error)
      setMessage({ type: 'error', text: 'Error deleting item' })
    }
  }

  const handlePreview = (item: any) => {
    setPreviewItem(item)
    setIsPreviewOpen(true)
  }

  const renderPreview = () => {
    if (!previewItem) return null

    switch (activeTab) {
      case 'experiences':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{previewItem.title}</h2>
              <p className="text-gray-600">{previewItem.company} - {previewItem.location}</p>
              <p className="text-sm text-gray-500">{previewItem.start_date} - {previewItem.end_date || 'Present'}</p>
            </div>
            <Separator />
            <div className="prose max-w-none">
              <p>{previewItem.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {previewItem.technologies.map((tech: string) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{previewItem.title}</h2>
              <img src={previewItem.image_url} alt={previewItem.title} className="w-full h-48 object-cover rounded-lg" />
            </div>
            <Separator />
            <div className="prose max-w-none">
              <p>{previewItem.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {previewItem.technologies.map((tech: string) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href={previewItem.github_url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
              {previewItem.live_url && (
                <Button variant="outline" asChild>
                  <a href={previewItem.live_url} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        )
      case 'blogs':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{previewItem.title}</h2>
              <img src={previewItem.image_url} alt={previewItem.title} className="w-full h-48 object-cover rounded-lg" />
            </div>
            <Separator />
            <div className="prose max-w-none">
              {previewItem.content}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid opacity-30"></div>
        <div className="scan-line"></div>
      </div>

      <div className="container mx-auto py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Admin Dashboard
            </h1>
            <div className="flex items-center mt-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="px-4 font-mono text-xs text-cyan-500">CONTROL PANEL</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2 text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        {message && (
          <div className={`p-4 mb-4 rounded border ${message.type === 'success' ? 'bg-green-500/20 text-green-500 border-green-500/50' : 'bg-red-500/20 text-red-500 border-red-500/50'}`}>
            {message.text}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-secondary border border-cyan-500/50">
            <TabsTrigger 
              value="experiences" 
              className="data-[state=active]:bg-background data-[state=active]:text-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500"
            >
              Experiences
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-background data-[state=active]:text-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="data-[state=active]:bg-background data-[state=active]:text-cyan-500 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500"
            >
              Blog Posts
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card className="bg-secondary border border-cyan-500/50">
                <CardHeader>
                  <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Add/Edit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={
                    activeTab === 'experiences' ? handleExperienceSubmit :
                    activeTab === 'projects' ? handleProjectSubmit :
                    handleBlogSubmit
                  } className="space-y-4">
                    {activeTab === 'experiences' && (
                      <>
                        <Input name="title" placeholder="Title" defaultValue={editingItem?.title} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="company" placeholder="Company" defaultValue={editingItem?.company} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="location" placeholder="Location" defaultValue={editingItem?.location} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="start_date" type="date" defaultValue={editingItem?.start_date} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="end_date" type="date" defaultValue={editingItem?.end_date || ''} className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Textarea name="description" placeholder="Description" defaultValue={editingItem?.description} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="technologies" placeholder="Technologies (comma-separated)" defaultValue={editingItem?.technologies?.join(', ')} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                      </>
                    )}
                    {activeTab === 'projects' && (
                      <>
                        <Input name="title" placeholder="Title" defaultValue={editingItem?.title} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Textarea name="description" placeholder="Description" defaultValue={editingItem?.description} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="technologies" placeholder="Technologies (comma-separated)" defaultValue={editingItem?.technologies?.join(', ')} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="image_url" placeholder="Image URL" defaultValue={editingItem?.image_url} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="github_url" placeholder="GitHub URL" defaultValue={editingItem?.github_url} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="live_url" placeholder="Live URL (optional)" defaultValue={editingItem?.live_url || ''} className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                      </>
                    )}
                    {activeTab === 'blogs' && (
                      <>
                        <Input name="title" placeholder="Title" defaultValue={editingItem?.title} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Textarea name="content" placeholder="Content (Markdown supported)" defaultValue={editingItem?.content} required className="min-h-[200px] bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                        <Input name="image_url" placeholder="Image URL" defaultValue={editingItem?.image_url} required className="bg-background text-foreground border-cyan-500/50 focus:border-cyan-500" />
                      </>
                    )}
                    <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-background">
                      {editingItem ? 'Update' : 'Add'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {activeTab === 'experiences' && experiences.map((exp) => (
                  <Card key={exp.id} className="bg-secondary border border-cyan-500/50 hover:border-cyan-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company} - {exp.location}</p>
                          <p className="text-sm text-muted-foreground">{exp.start_date} - {exp.end_date || 'Present'}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-cyan-500/20 text-cyan-500 border border-cyan-500/50">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handlePreview(exp)} className="text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => setEditingItem(exp)} className="text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete('experiences', exp.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {activeTab === 'projects' && projects.map((project) => (
                  <Card key={project.id} className="bg-secondary border border-cyan-500/50 hover:border-cyan-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{project.title}</h3>
                          <img src={project.image_url} alt={project.title} className="w-32 h-32 object-cover rounded border border-cyan-500/50" />
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-cyan-500/20 text-cyan-500 border border-cyan-500/50">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handlePreview(project)} className="text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => setEditingItem(project)} className="text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete('projects', project.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {activeTab === 'blogs' && blogs.map((blog) => (
                  <Card key={blog.id} className="bg-secondary border border-cyan-500/50 hover:border-cyan-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{blog.title}</h3>
                          <img src={blog.image_url} alt={blog.title} className="w-32 h-32 object-cover rounded border border-cyan-500/50" />
                          <p className="text-sm text-muted-foreground">{new Date(blog.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handlePreview(blog)} className="text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => setEditingItem(blog)} className="text-foreground hover:text-cyan-500 border-cyan-500/50 hover:border-cyan-500">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete('blogs', blog.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-secondary border border-cyan-500/50">
          <DialogHeader>
            <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {renderPreview()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
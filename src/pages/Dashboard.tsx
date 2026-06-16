import { useState, useEffect } from 'react'
import { Plus, FileText, Settings, BarChart3 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generateNotes } from '@/lib/gemini'
import FileUpload from '@/components/FileUpload'
import Navbar from '@/components/Navbar'
import toast from 'react-hot-toast'

interface NoteType {
  id: string
  title: string
  type: string
  createdAt: string
}

export default function Dashboard() {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedNoteType, setSelectedNoteType] = useState<'short' | 'detailed' | 'bullet' | 'chapter' | 'formulas' | 'definitions' | 'flashcards' | 'mcq'>('short')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchUser()
    fetchNotes()
  }, [])

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*')
    if (error) {
      toast.error('Failed to load notes')
    } else {
      setNotes(data || [])
    }
  }

  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return

    setLoading(true)
    try {
      for (const file of files) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const content = e.target?.result as string
          
          const result = await generateNotes({
            content: content.substring(0, 4000), // Limit content
            type: selectedNoteType,
          })

          // Save to database
          const { error } = await supabase.from('notes').insert([
            {
              title: file.name,
              content: result.text,
              type: result.type,
              user_id: user?.id,
              created_at: new Date().toISOString(),
            },
          ])

          if (error) {
            toast.error('Failed to save notes')
          } else {
            toast.success(`Notes generated for ${file.name}`)
            fetchNotes()
          }
        }
        reader.readAsText(file)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const noteTypes = [
    { id: 'short', label: 'Short Notes', icon: '📝' },
    { id: 'detailed', label: 'Detailed', icon: '📚' },
    { id: 'bullet', label: 'Bullet Points', icon: '🔹' },
    { id: 'chapter', label: 'Chapter Summary', icon: '📖' },
    { id: 'formulas', label: 'Formulas', icon: '📐' },
    { id: 'definitions', label: 'Definitions', icon: '📋' },
    { id: 'flashcards', label: 'Flashcards', icon: '🎴' },
    { id: 'mcq', label: 'MCQs', icon: '❓' },
  ]

  return (
    <>
      <Navbar isAuthenticated />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Welcome back! Create your first AI-powered notes.</p>
          </div>

          {/* Upload Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="glass-effect rounded-2xl p-8 border border-white dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6">Upload Study Materials</h2>
                <FileUpload onFilesSelected={handleFilesSelected} isLoading={loading} />
              </div>
            </div>

            {/* Note Types */}
            <div className="glass-effect rounded-2xl p-8 border border-white dark:border-slate-700">
              <h3 className="text-xl font-bold mb-4">Select Note Type</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {noteTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedNoteType(type.id as any)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedNoteType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Notes */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Notes</h2>
            {notes.length === 0 ? (
              <div className="glass-effect rounded-2xl p-12 text-center border border-white dark:border-slate-700">
                <FileText size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">No notes yet. Upload a file to get started!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="glass-effect rounded-xl p-6 border border-white dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold flex-1 truncate">{note.title}</h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                        {note.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

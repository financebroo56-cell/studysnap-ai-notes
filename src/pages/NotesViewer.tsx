import { useParams } from 'react-router-dom'
import { Download, Copy, Bookmark } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function NotesViewer() {
  const { id } = useParams()

  const handleCopy = () => {
    alert('Copy functionality coming soon')
  }

  const handleDownload = () => {
    alert('Download functionality coming soon')
  }

  return (
    <>
      <Navbar isAuthenticated />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="glass-effect rounded-2xl p-8 border border-white dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Note: {id}</h1>
              <div className="flex gap-4">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  <Copy size={18} /> Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download size={18} /> PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <Bookmark size={18} /> Save
                </button>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>Note content will be displayed here...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

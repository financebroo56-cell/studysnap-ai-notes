import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Moon, Sun } from 'lucide-react'
import { supabase } from './lib/supabase'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import NotesViewer from './pages/NotesViewer'
import AdminPanel from './pages/AdminPanel'
import PricingPage from './pages/PricingPage'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  // Load dark mode preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
  }, [])

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading StudySnap...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-4 right-4 z-50 p-2 rounded-full glass-effect hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={session ? <Navigate to="/dashboard" /> : <Auth />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/auth" />} />
            <Route path="/notes/:id" element={session ? <NotesViewer /> : <Navigate to="/auth" />} />
            <Route path="/admin" element={session ? <AdminPanel /> : <Navigate to="/auth" />} />
          </Routes>

          <Toaster position="top-right" />
        </div>
      </div>
    </Router>
  )
}

export default App
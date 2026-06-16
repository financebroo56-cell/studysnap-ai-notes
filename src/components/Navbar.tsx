import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface NavbarProps {
  isAuthenticated?: boolean
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-40 glass-effect border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">StudySnap</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link to="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400">
              Pricing
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/auth"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-800">
            <Link to="/" className="block py-2 hover:text-blue-600">
              Home
            </Link>
            <Link to="/pricing" className="block py-2 hover:text-blue-600">
              Pricing
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="block py-2 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

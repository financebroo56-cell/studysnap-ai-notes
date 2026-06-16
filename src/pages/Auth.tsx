import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Chrome } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast.success('Sign up successful! Check your email to confirm.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast.success('Welcome back!')
        navigate('/dashboard')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw error
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 px-4">
        <div className="w-full max-w-md">
          <div className="glass-effect rounded-2xl p-8 border border-white dark:border-slate-700">
            <h2 className="text-3xl font-bold text-center mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
              {isSignUp ? 'Join thousands of students' : 'Sign in to your account'}
            </p>

            <form onSubmit={handleAuth} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <div className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg border border-slate-200 dark:border-slate-700">
                  <Mail size={18} className="text-blue-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <div className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg border border-slate-200 dark:border-slate-700">
                  <Lock size={18} className="text-blue-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 button-glow"
              >
                {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-950">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleAuth}
              className="w-full py-2 border-2 border-slate-300 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-center gap-2"
            >
              <Chrome size={18} />
              Google
            </button>

            <div className="mt-6 text-center text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

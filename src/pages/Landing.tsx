import { ArrowRight, Zap, BookOpen, Brain, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">🎉 Transform Your Learning</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              StudySnap AI Notes Builder
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Transform your study materials into AI-powered notes instantly. Upload PDFs, documents, or images and get instant summaries, flashcards, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 button-glow"
              >
                Get Started Free <ArrowRight size={20} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                View Pricing
              </Link>
            </div>
            <div className="flex justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
              <div>✨ AI-Powered</div>
              <div>📱 Mobile Friendly</div>
              <div>⚡ Instant Results</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-yellow-500" size={32} />,
                  title: 'Instant Processing',
                  desc: 'Get AI-generated notes in seconds, not hours',
                },
                {
                  icon: <BookOpen className="text-blue-600" size={32} />,
                  title: 'Multiple Formats',
                  desc: 'Support for PDF, DOCX, PPT, and images',
                },
                {
                  icon: <Brain className="text-purple-600" size={32} />,
                  title: 'Smart Summaries',
                  desc: '8 types of notes: short, detailed, bullets, flashcards, MCQ, and more',
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-8 glass-effect rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of students using StudySnap to ace their exams</p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100"
            >
              Start Your Free Trial <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

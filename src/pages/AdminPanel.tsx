import { BarChart3, Users, FileText, CreditCard } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function AdminPanel() {
  return (
    <>
      <Navbar isAuthenticated />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">Admin Dashboard</h1>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Users />, label: 'Total Users', value: '1,234' },
              { icon: <FileText />, label: 'Total Notes', value: '5,678' },
              { icon: <CreditCard />, label: 'Active Pro', value: '234' },
              { icon: <BarChart3 />, label: 'Revenue', value: '$12.3k' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-6 border border-white dark:border-slate-700">
                <div className="text-blue-600 mb-4">{stat.icon}</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

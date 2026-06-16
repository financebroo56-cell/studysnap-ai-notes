import { Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { Link } from 'react-router-dom'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for trying StudySnap',
      features: [
        '5 notes per month',
        'Basic note types',
        'Dark mode',
        'Mobile app',
      ],
    },
    {
      name: 'Pro',
      price: '9.99',
      period: '/month',
      description: 'Best for serious students',
      features: [
        'Unlimited notes',
        'All note types',
        'Priority support',
        'Advanced search',
        'Custom folders',
        'No ads',
      ],
      featured: true,
    },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 border transition-all ${
                  plan.featured
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 shadow-xl scale-105'
                    : 'border-slate-200 dark:border-slate-700 glass-effect'
                }`}
              >
                {plan.featured && (
                  <div className="mb-4 inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.period && <span className="text-slate-600">{plan.period}</span>}
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                    plan.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-700 button-glow'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'
                  }`}
                >
                  Get Started
                </button>
                <div className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center gap-3">
                      <Check className="text-green-500" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

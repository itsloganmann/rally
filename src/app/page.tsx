'use client'

import { useState, useEffect, useRef } from 'react'
import { send } from '@emailjs/browser'

// Types
interface FormData {
  email: string
  role: 'brand' | 'influencer' | ''
  // Influencer fields
  college?: string
  clubs?: string
  platform?: string
  followers?: string
  interests?: string
  // Brand fields
  company?: string
  industry?: string
  goal?: string
  target_colleges?: string
  deliverables?: string
  min_followers?: string
  budget?: string
}

interface StatProps {
  number: string
  label: string
  source: string
  sourceUrl: string
}

// Stats data with real citations
const STATS: StatProps[] = [
  {
    number: "11x",
    label: "higher engagement than traditional ads",
    source: "Influencer Marketing Hub",
    sourceUrl: "https://influencermarketinghub.com/influencer-marketing-benchmark-report/"
  },
  {
    number: "89%",
    label: "of Gen Z discovers brands through social",
    source: "Deloitte",
    sourceUrl: "https://www2.deloitte.com/us/en/insights/topics/marketing-and-sales-operations/global-marketing-trends.html"
  },
  {
    number: "67%",
    label: "of brands struggle to find authentic creators",
    source: "Creator Economy Report",
    sourceUrl: "https://www.creatoreconomy.so/report"
  },
  {
    number: "$21B",
    label: "creator economy market size by 2025",
    source: "Goldman Sachs",
    sourceUrl: "https://www.goldmansachs.com/insights/pages/the-creator-economy.html"
  }
]

// Features data
const FEATURES = [
  {
    icon: "🎯",
    title: "AI-Powered Matching",
    description: "Smart vector embeddings connect the right students with the perfect brand campaigns"
  },
  {
    icon: "🏫",
    title: "Campus-First Focus",
    description: "Built specifically for college students and campus micro-influencers"
  },
  {
    icon: "⚡",
    title: "Lightning Fast Onboarding",
    description: "Get matched and start earning in minutes, not weeks"
  },
  {
    icon: "💰",
    title: "Secure Payments",
    description: "Automated contracts and payouts via Stripe for peace of mind"
  }
]

function StatCard({ number, label, source, sourceUrl }: StatProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center fade-in">
      <div className={`text-4xl md:text-5xl font-bold text-gradient mb-2 ${isVisible ? 'stat-number' : ''}`}>
        {number}
      </div>
      <div className="text-sm text-white/80 mb-1">{label}</div>
      <a 
        href={sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-white/60 hover:text-white/80 transition-colors underline"
      >
        {source} ↗
      </a>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="glass rounded-xl p-6 text-center fade-in">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  )
}

export default function WaitlistPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    role: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [showOptionalFields, setShowOptionalFields] = useState(false)

  // Honeypot field for spam protection
  const [honeypot, setHoneypot] = useState('')

  // Rate limiting
  const [lastSubmit, setLastSubmit] = useState<number | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRoleSelect = (role: 'brand' | 'influencer') => {
    setFormData(prev => ({ ...prev, role }))
    setShowOptionalFields(true)
  }

  const generateSummary = (data: FormData): string => {
    const parts: string[] = []
    
    if (data.role) parts.push(`Role: ${data.role}`)
    
    if (data.role === 'influencer') {
      if (data.college) parts.push(`College: ${data.college}`)
      if (data.clubs) parts.push(`Clubs: ${data.clubs}`)
      if (data.platform) parts.push(`Platform: ${data.platform}`)
      if (data.followers) parts.push(`Followers: ${data.followers}`)
      if (data.interests) parts.push(`Interests: ${data.interests}`)
    } else if (data.role === 'brand') {
      if (data.company) parts.push(`Company: ${data.company}`)
      if (data.industry) parts.push(`Industry: ${data.industry}`)
      if (data.goal) parts.push(`Goal: ${data.goal}`)
      if (data.target_colleges) parts.push(`Target colleges: ${data.target_colleges}`)
      if (data.deliverables) parts.push(`Deliverables: ${data.deliverables}`)
      if (data.min_followers) parts.push(`Min followers: ${data.min_followers}`)
      if (data.budget) parts.push(`Budget: ${data.budget}`)
    }
    
    return parts.length > 1 ? parts.join(', ') : 'Email only signup'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check honeypot
    if (honeypot) {
      console.log('Bot detected')
      return
    }

    // Rate limiting check
    const now = Date.now()
    if (lastSubmit && now - lastSubmit < 5000) { // 5 second cooldown
      setStatusMessage('Please wait a moment before submitting again.')
      return
    }

    if (!formData.email || !formData.email.includes('@')) {
      setStatusMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    try {
      const templateParams = {
        user_email: formData.email,
        role: formData.role || 'Not specified',
        date: new Date().toISOString(),
        source: 'rally-waitlist',
        summary: generateSummary(formData),
        reply_to: formData.email,
        // All optional fields
        college: formData.college || '',
        clubs: formData.clubs || '',
        platform: formData.platform || '',
        followers: formData.followers || '',
        interests: formData.interests || '',
        company: formData.company || '',
        industry: formData.industry || '',
        goal: formData.goal || '',
        target_colleges: formData.target_colleges || '',
        deliverables: formData.deliverables || '',
        min_followers: formData.min_followers || '',
        budget: formData.budget || ''
      }

      // Send admin notification
      await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
        {
          ...templateParams,
          to_email: 'rallyfounders@gmail.com'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      // Send user confirmation
      await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setSubmitStatus('success')
      setStatusMessage(`Thanks for joining the waitlist! Check your email for confirmation.`)
      setLastSubmit(now)
      
    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
      setStatusMessage('Something went wrong. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrimaryCTA = () => {
    const emailInput = document.getElementById('email') as HTMLInputElement
    if (!formData.email) {
      emailInput?.focus()
    } else {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
  }

  if (submitStatus === 'success') {
    return (
      <main className="min-h-screen relative">
        {/* Background orbs */}
        <div className="bg-orbs">
          <div className="orb-conic"></div>
          <div className="orb-radial"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full text-center fade-in">
            <div className="success-checkmark"></div>
            <h2 className="text-2xl font-bold text-white mb-4">You&apos;re on the list! 🎉</h2>
            <p className="text-white/80 mb-6">
              Thanks for joining Rally, <span className="text-gradient font-semibold">{formData.email}</span>. 
              We&apos;ll be in touch soon with early access and exclusive campus perks.
            </p>
            
            <button
              onClick={() => setShowOptionalFields(true)}
              className="text-white/70 hover:text-white text-sm underline mb-4 block mx-auto"
            >
              Add more details
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Rally Waitlist',
                    text: 'Join me on the Rally waitlist for AI-powered campus brand matching!',
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }
              }}
              className="text-accent-end hover:text-white text-sm transition-colors"
            >
              Share Rally with a friend →
            </button>

            {showOptionalFields && (
              <details className="optional-details mt-6 text-left">
                <summary>Optional: help us match you better</summary>
                <div className="details-content mt-4 space-y-4">
                  {/* Role selector and optional fields would go here */}
                  <p className="text-white/60 text-sm">
                    You can add more details by refreshing and filling out the form again.
                  </p>
                </div>
              </details>
            )}
          </div>
        </div>

        {/* Status for screen readers */}
        <div 
          role="status" 
          aria-live="polite" 
          className="sr-only"
        >
          Successfully joined the Rally waitlist
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      {/* Background orbs */}
      <div className="bg-orbs">
        <div className="orb-conic"></div>
        <div className="orb-radial"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 fade-in">
                Campus marketplace • AI matching
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in text-glow">
              Rally matches students and brands for elite{' '}
              <span className="text-gradient">campus campaigns</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto fade-in">
              Apply once with your resume and socials. Smart vector matching brings the right campaigns to you.
            </p>

            {/* Primary CTA */}
            <button
              onClick={handlePrimaryCTA}
              className="btn-primary text-lg px-8 py-4 mb-8 fade-in"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Securing your spot...' : 'Secure My Spot'}
            </button>

            {/* Waitlist Form */}
            <div className="glass rounded-2xl p-8 max-w-md mx-auto fade-in">
              <h2 className="text-2xl font-bold text-white mb-2">Join the waitlist</h2>
              <p className="text-white/70 mb-6">Get early access and exclusive updates.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Email field */}
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@college.edu"
                    className="form-input"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Role selector */}
                <div className="form-field">
                  <label className="form-label">I am a... (optional)</label>
                  <div className="role-selector">
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('influencer')}
                      className={`role-option ${formData.role === 'influencer' ? 'active' : ''}`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('brand')}
                      className={`role-option ${formData.role === 'brand' ? 'active' : ''}`}
                    >
                      Brand
                    </button>
                  </div>
                </div>

                {/* Optional details */}
                {showOptionalFields && (
                  <details className="optional-details" open>
                    <summary>Optional: help us match you better</summary>
                    <div className="details-content mt-4 space-y-4">
                      {formData.role === 'influencer' && (
                        <>
                          <div className="grid-2">
                            <input
                              type="text"
                              value={formData.college || ''}
                              onChange={(e) => handleInputChange('college', e.target.value)}
                              placeholder="College"
                              className="form-input"
                            />
                            <input
                              type="text"
                              value={formData.clubs || ''}
                              onChange={(e) => handleInputChange('clubs', e.target.value)}
                              placeholder="Clubs/Orgs"
                              className="form-input"
                            />
                          </div>
                          <div className="grid-3">
                            <input
                              type="text"
                              value={formData.platform || ''}
                              onChange={(e) => handleInputChange('platform', e.target.value)}
                              placeholder="Primary platform"
                              className="form-input"
                            />
                            <input
                              type="number"
                              value={formData.followers || ''}
                              onChange={(e) => handleInputChange('followers', e.target.value)}
                              placeholder="Followers"
                              min="0"
                              className="form-input"
                            />
                            <input
                              type="text"
                              value={formData.interests || ''}
                              onChange={(e) => handleInputChange('interests', e.target.value)}
                              placeholder="Interests"
                              className="form-input"
                            />
                          </div>
                        </>
                      )}

                      {formData.role === 'brand' && (
                        <>
                          <div className="grid-2">
                            <input
                              type="text"
                              value={formData.company || ''}
                              onChange={(e) => handleInputChange('company', e.target.value)}
                              placeholder="Company"
                              className="form-input"
                            />
                            <input
                              type="text"
                              value={formData.industry || ''}
                              onChange={(e) => handleInputChange('industry', e.target.value)}
                              placeholder="Industry"
                              className="form-input"
                            />
                          </div>
                          <div className="grid-3">
                            <input
                              type="text"
                              value={formData.goal || ''}
                              onChange={(e) => handleInputChange('goal', e.target.value)}
                              placeholder="Campaign goal"
                              className="form-input"
                            />
                            <input
                              type="text"
                              value={formData.target_colleges || ''}
                              onChange={(e) => handleInputChange('target_colleges', e.target.value)}
                              placeholder="Target colleges"
                              className="form-input"
                            />
                            <input
                              type="text"
                              value={formData.deliverables || ''}
                              onChange={(e) => handleInputChange('deliverables', e.target.value)}
                              placeholder="Deliverables"
                              className="form-input"
                            />
                          </div>
                          <div className="grid-2">
                            <input
                              type="number"
                              value={formData.min_followers || ''}
                              onChange={(e) => handleInputChange('min_followers', e.target.value)}
                              placeholder="Min followers"
                              min="0"
                              className="form-input"
                            />
                            <input
                              type="text"
                              value={formData.budget || ''}
                              onChange={(e) => handleInputChange('budget', e.target.value)}
                              placeholder="Budget"
                              className="form-input"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </details>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Securing Your Spot...' : 'Secure My Spot'}
                </button>

                <small className="text-white/60 text-xs text-center block">
                  By joining, you agree to our{' '}
                  <a href="#" className="text-white/80 hover:text-white">Privacy Policy</a>.
                </small>
              </form>

              {/* Status message */}
              {statusMessage && (
                <div 
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    submitStatus === 'error' ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 fade-in">
              Why Rally?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center space-x-8 mb-6">
              {/* Placeholder for social links */}
              <div className="w-8 h-8 rounded bg-white/10"></div>
              <div className="w-8 h-8 rounded bg-white/10"></div>
              <div className="w-8 h-8 rounded bg-white/10"></div>
            </div>
            <p className="text-white/60 text-sm">
              © 2024 Rally. Building the future of campus marketing.
            </p>
          </div>
        </footer>
      </div>

      {/* Status for screen readers */}
      <div 
        role="status" 
        aria-live="polite" 
        className="sr-only"
      >
        {statusMessage}
      </div>
    </main>
  )
}

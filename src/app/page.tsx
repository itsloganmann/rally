'use client'

import { useState, useEffect, useRef } from 'react'
import { send } from '@emailjs/browser'
import Link from 'next/link'

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

// Updated stats with real, functional data
const STATS: StatProps[] = [
  {
    number: "11x",
    label: "higher ROI than traditional ads",
    source: "Influencer Marketing Hub 2024",
    sourceUrl: "https://influencermarketinghub.com/influencer-marketing-benchmark-report-2024/"
  },
  {
    number: "89%",
    label: "of Gen Z discovers brands via social",
    source: "Deloitte Global Marketing Trends",
    sourceUrl: "https://www2.deloitte.com/us/en/insights/topics/marketing-and-sales-operations/global-marketing-trends.html"
  },
  {
    number: "4.2x",
    label: "engagement rate for micro-influencers",
    source: "Later Influence Report 2024",
    sourceUrl: "https://later.com/blog/micro-influencer-marketing/"
  },
  {
    number: "$21B",
    label: "creator economy market size by 2025",
    source: "Goldman Sachs Research",
    sourceUrl: "https://www.goldmansachs.com/insights/pages/the-creator-economy.html"
  },
  {
    number: "73%",
    label: "of students open to brand partnerships",
    source: "Campus Marketing Study 2024",
    sourceUrl: "https://www.campusmarketingresearch.com/student-brand-partnerships"
  }
]

// Features data
const FEATURES = [
  {
    icon: "🎯",
    title: "AI-Powered Matching",
    description: "Smart vector embeddings connect the right students with perfect campaigns"
  },
  {
    icon: "🏫",
    title: "Campus-First Focus", 
    description: "Built specifically for college students and campus micro-influencers"
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Get matched and start earning in minutes, not weeks"
  },
  {
    icon: "💰",
    title: "Secure Payments",
    description: "Automated contracts and payouts via Stripe"
  }
]

// Loading Screen Component
function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing Rally...")

  useEffect(() => {
    if (!isLoading) return

    const texts = [
      "Initializing Rally...",
      "Loading AI matching engine...",
      "Connecting to campus networks...", 
      "Preparing your experience..."
    ]

    let textIndex = 0
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIndex])
      textIndex = (textIndex + 1) % texts.length
    }, 800)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 100)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="bg-orbs">
        <div className="orb-conic"></div>
        <div className="orb-radial"></div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-accent-start to-accent-end rounded-2xl flex items-center justify-center mb-8 mx-auto animate-pulse">
          <span className="text-white font-bold text-2xl">R</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">{loadingText}</h2>
        
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent-start to-accent-end transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-white/60 text-sm mt-4">{Math.round(progress)}% complete</p>
      </div>
    </div>
  )
}

// Konami Code Easter Egg
function useKonamiCode() {
  const [konamiActivated, setKonamiActivated] = useState(false)
  const sequence = useRef<string[]>([])
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      sequence.current.push(e.code)
      if (sequence.current.length > konamiCode.length) {
        sequence.current.shift()
      }
      
      if (sequence.current.length === konamiCode.length && 
          sequence.current.every((key, index) => key === konamiCode[index])) {
        setKonamiActivated(true)
        setTimeout(() => setKonamiActivated(false), 3000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiCode])

  return konamiActivated
}

function StatCard({ number, label, source, sourceUrl }: StatProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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
    <div 
      ref={ref} 
      className="text-center fade-in cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-3xl md:text-4xl font-bold text-gradient mb-2 transition-all duration-500 ${isVisible ? 'stat-number' : ''} ${isHovered ? 'scale-110' : ''}`}>
        {number}
      </div>
      <div className="text-sm text-white/80 mb-1">{label}</div>
      <a 
        href={sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-white/60 hover:text-accent-end transition-colors underline"
      >
        {source} ↗
      </a>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="glass rounded-xl p-6 text-center fade-in hover:scale-105 transition-all duration-300">
      <div className="text-3xl mb-4 animate-bounce">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  )
}

export default function WaitlistPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    role: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [lastSubmit, setLastSubmit] = useState<number | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const konamiActivated = useKonamiCode()

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Logo click easter egg
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    if (clickCount === 6) {
      alert('🎉 You found the secret! Rally team says hi! 👋')
      setClickCount(0)
    }
  }

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
    
    if (honeypot) {
      console.log('Bot detected')
      return
    }

    const now = Date.now()
    if (lastSubmit && now - lastSubmit < 5000) {
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

  if (submitStatus === 'success') {
    return (
      <main className="min-h-screen relative">
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
              className="btn-primary w-full mb-4"
            >
              Share Rally with a friend →
            </button>

            <Link 
              href="/about"
              className="text-white/70 hover:text-white text-sm transition-colors underline block mb-4"
            >
              Meet the team
            </Link>
          </div>
        </div>

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
    <>
      <LoadingScreen isLoading={isLoading} />
      
      {konamiActivated && (
        <div className="fixed top-4 right-4 z-40 bg-gradient-to-r from-accent-start to-accent-end p-4 rounded-lg text-white font-bold animate-bounce">
          🎮 Konami Code Activated! You&apos;re a legend! 🎮
        </div>
      )}

      <main className={`min-h-screen relative transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-orbs">
          <div className="orb-conic"></div>
          <div className="orb-radial"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-accent-start to-accent-end rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white">Rally</span>
            </div>
            
            <Link 
              href="/about"
              className="text-white/80 hover:text-white transition-colors"
            >
              About Team
            </Link>
          </div>
        </nav>

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

              {/* Waitlist Form */}
              <div className="glass rounded-2xl p-8 max-w-md mx-auto fade-in">
                <h2 className="text-2xl font-bold text-white mb-2">Join the waitlist</h2>
                <p className="text-white/70 mb-6">Get early access and exclusive updates.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

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
                                placeholder="School"
                                className="form-input"
                              />
                              <input
                                type="text"
                                value={formData.clubs || ''}
                                onChange={(e) => handleInputChange('clubs', e.target.value)}
                                placeholder="Clubs"
                                className="form-input"
                              />
                            </div>
                            <div className="grid-3">
                              <input
                                type="text"
                                value={formData.platform || ''}
                                onChange={(e) => handleInputChange('platform', e.target.value)}
                                placeholder="Platform"
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
                                placeholder="Goal"
                                className="form-input"
                              />
                              <input
                                type="text"
                                value={formData.target_colleges || ''}
                                onChange={(e) => handleInputChange('target_colleges', e.target.value)}
                                placeholder="Target schools"
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
              <p className="text-white/60 text-sm">
                © 2025 Rally. Building the future of campus marketing.
              </p>
            </div>
          </footer>
        </div>

        <div 
          role="status" 
          aria-live="polite" 
          className="sr-only"
        >
          {statusMessage}
        </div>
      </main>
    </>
  )
}

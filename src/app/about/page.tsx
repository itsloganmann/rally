'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TEAM_MEMBERS = [
  {
    name: "Logan Mann",
    role: "Co-Founder & CEO",
    school: "UCSB Computer Engineering",
    linkedin: "https://www.linkedin.com/in/logansmann/",
    image: "/team/logan.png",
    bio: "Full-stack developer with expertise in AI/ML and scalable web applications. Passionate about connecting brands with authentic campus voices through innovative technology.",
    expertise: ["AI/ML", "Full-Stack Development", "Product Strategy"]
  },
  {
    name: "Ajit Saravanan", 
    role: "Co-Founder & CTO",
    school: "UCSB Computer Engineering",
    linkedin: "https://www.linkedin.com/in/ajit-saravanan-871968273/",
    image: "/team/ajit.png",
    bio: "Systems architect and backend specialist focused on building robust, scalable infrastructure. Expert in vector databases and semantic matching algorithms.",
    expertise: ["Backend Architecture", "Vector Databases", "System Design"]
  },
  {
    name: "Aadi Chauhan",
    role: "Co-Founder & Head of Engineering", 
    school: "Stanford Computer Science",
    linkedin: "https://www.linkedin.com/in/aadi-chauhan-5a440521b/",
    image: "/team/aadi.png",
    bio: "Computer science researcher with deep expertise in machine learning and natural language processing. Drives the AI matching engine that powers Rally.",
    expertise: ["Machine Learning", "NLP", "Algorithm Design"]
  },
  {
    name: "Aarnav Nagabhirava",
    role: "Co-Founder & Head of Strategy",
    school: "Stanford Management Science & Engineering", 
    linkedin: "https://www.linkedin.com/in/aarnav-nagabhirava-801322243/",
    image: "/team/aarnav.png",
    bio: "Business strategist with expertise in marketplace dynamics and growth operations. Leads go-to-market strategy and partnership development.",
    expertise: ["Business Strategy", "Growth Operations", "Market Analysis"]
  }
]

function TeamMember({ member }: { member: typeof TEAM_MEMBERS[0] }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="glass rounded-2xl p-8 text-center fade-in hover:scale-105 transition-all duration-300 group">
      <div className="relative mb-6">
        {!imageError ? (
          <Image
            src={member.image}
            alt={member.name}
            width={120}
            height={120}
            className="rounded-full mx-auto border-4 border-gradient"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-[120px] h-[120px] rounded-full mx-auto bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center text-4xl font-bold text-white">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}

      </div>
      
      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
      <div className="text-accent-end font-semibold mb-2">{member.role}</div>
      <div className="text-white/70 text-sm mb-4">{member.school}</div>
      
      <p className="text-white/80 text-sm mb-6 leading-relaxed">{member.bio}</p>
      
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {member.expertise.map((skill, i) => (
          <span 
            key={i}
            className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 btn-primary px-6 py-2 text-sm group-hover:scale-105 transition-transform"
      >
        <span>Connect on LinkedIn</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen relative">
      {/* Background orbs */}
      <div className="bg-orbs">
        <div className="orb-conic"></div>
        <div className="orb-radial"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
                     <Link href="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-accent-start to-accent-end rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-lg">R</span>
             </div>
             <span className="text-xl font-bold text-white">Rally</span>
           </Link>
          
                     <Link 
             href="/"
             className="text-white/80 hover:text-white transition-colors"
           >
             ← Back to Waitlist
           </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 px-4 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 fade-in text-glow">
            Meet the{' '}
            <span className="text-gradient">Rally Team</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto fade-in">
            We&apos;re a team of engineers and strategists from UCSB and Stanford, 
            passionate about revolutionizing campus marketing through AI-powered matching.
          </p>
        </section>

        {/* Team Grid */}
        <section className="max-w-6xl mx-auto">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             {TEAM_MEMBERS.map((member) => (
               <TeamMember key={member.name} member={member} />
             ))}
           </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 fade-in">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Rally was born from our collective experience in campus marketing and technology. 
              We saw how brands struggled to find authentic student voices, while talented 
              campus influencers couldn&apos;t easily connect with relevant opportunities.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              By combining cutting-edge AI with deep understanding of campus culture, 
              we&apos;re building the future of authentic brand-student partnerships.
            </p>
            
                         <div className="mt-8">
               <Link 
                 href="/"
                 className="btn-primary px-8 py-3 text-lg"
               >
                 Join Our Waitlist →
               </Link>
             </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            © 2025 Rally. Building the future of campus marketing.
          </p>
        </div>
      </footer>

      {/* Status for screen readers */}
      <div 
        role="status" 
        aria-live="polite" 
        className="sr-only"
      >
        About the Rally team
      </div>
    </main>
  )
}

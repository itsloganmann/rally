import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { readFileSync } from 'fs'
import { join } from 'path'

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 10000 // 10 seconds
  const maxRequests = 1
  
  const record = rateLimitStore.get(ip)
  if (!record || now - record.lastReset > windowMs) {
    rateLimitStore.set(ip, { count: 1, lastReset: now })
    return false
  }
  
  if (record.count >= maxRequests) {
    return true
  }
  
  record.count++
  return false
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429 }
      )
    }

    // Validate environment variables
    const apiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.SENDGRID_FROM || 'rallyfounders@gmail.com'
    const adminEmail = process.env.SENDGRID_ADMIN || 'rallyfounders@gmail.com'

    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { email, role } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Set up SendGrid
    sgMail.setApiKey(apiKey)

    // Read HTML templates
    const templatesDir = process.cwd()
    const welcomeTemplatePath = join(templatesDir, 'emailjs-welcome-template.html')
    const adminTemplatePath = join(templatesDir, 'emailjs-admin-template.html')

    let welcomeTemplate: string
    let adminTemplate: string

    try {
      welcomeTemplate = readFileSync(welcomeTemplatePath, 'utf-8')
      adminTemplate = readFileSync(adminTemplatePath, 'utf-8')
    } catch (error) {
      console.error('Failed to read email templates:', error)
      return NextResponse.json(
        { error: 'Email templates not found' },
        { status: 500 }
      )
    }

    // Replace template variables
    const userRole = role || 'waitlist member'
    const welcomeHtml = welcomeTemplate
      .replace(/\{\{user_email\}\}/g, email)
      .replace(/\{\{user_role\}\}/g, userRole)
      .replace(/\{\{reply_to\}\}/g, fromEmail)

    const adminHtml = adminTemplate
      .replace(/\{\{user_email\}\}/g, email)
      .replace(/\{\{user_role\}\}/g, userRole)
      .replace(/\{\{to_email\}\}/g, adminEmail)
      .replace(/\{\{timestamp\}\}/g, new Date().toISOString())

    // Prepare emails
    const welcomeMsg = {
      to: email,
      from: {
        email: fromEmail,
        name: 'Rally Team'
      },
      subject: 'Welcome to Rally - You\'re on the Waitlist! 🚀',
      html: welcomeHtml,
      text: `Welcome to Rally! Thanks for joining our waitlist. We're building the future of campus marketing and can't wait to have you be part of it. We'll keep you updated on our progress and let you know as soon as we're ready to launch. Best regards, The Rally Team`
    }

    const adminMsg = {
      to: adminEmail,
      from: {
        email: fromEmail,
        name: 'Rally Waitlist'
      },
      subject: `New Waitlist Signup: ${email}`,
      html: adminHtml,
      text: `New waitlist signup:\nEmail: ${email}\nRole: ${userRole}\nTime: ${new Date().toISOString()}`
    }

    // Send emails
    console.log(`Sending welcome email to: ${email}`)
    await sgMail.send(welcomeMsg)
    
    console.log(`Sending admin notification to: ${adminEmail}`)
    await sgMail.send(adminMsg)

    return NextResponse.json({ 
      success: true, 
      message: 'Welcome! Check your email for confirmation.' 
    })

  } catch (error: unknown) {
    console.error('SendGrid email send failed:', error)
    
    let errorMessage = 'Failed to send email. Please try again.'
    
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { body?: { errors?: Array<{ message: string }> } } }
      if (sgError.response?.body?.errors?.[0]?.message) {
        console.error('SendGrid error details:', sgError.response.body.errors[0].message)
        // Don't expose internal errors to user
        if (sgError.response.body.errors[0].message.includes('not a verified sender')) {
          errorMessage = 'Email configuration error. Please contact support.'
        }
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

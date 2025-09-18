# Rally Waitlist Setup Guide

This branch contains a single-page waitlist application built with Next.js and EmailJS.

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file in the root directory:**
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id_here
   NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID=your_user_template_id_here
   ```

3. **Configure EmailJS:**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service (Gmail recommended)
   - Create two email templates (see below)
   - Get your credentials and update `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## EmailJS Template Configuration

### Admin Notification Template
**To Email:** `rallyfounders@gmail.com`
**Subject:** `New Rally waitlist signup - {{role}}`
**Body:**
```html
<h2>New Rally Waitlist Signup</h2>
<p><strong>Email:</strong> {{user_email}}</p>
<p><strong>Role:</strong> {{role}}</p>
<p><strong>Date:</strong> {{date}}</p>
<p><strong>Summary:</strong> {{summary}}</p>

{{#if college}}<p><strong>College:</strong> {{college}}</p>{{/if}}
{{#if clubs}}<p><strong>Clubs:</strong> {{clubs}}</p>{{/if}}
{{#if platform}}<p><strong>Platform:</strong> {{platform}}</p>{{/if}}
{{#if followers}}<p><strong>Followers:</strong> {{followers}}</p>{{/if}}
{{#if interests}}<p><strong>Interests:</strong> {{interests}}</p>{{/if}}

{{#if company}}<p><strong>Company:</strong> {{company}}</p>{{/if}}
{{#if industry}}<p><strong>Industry:</strong> {{industry}}</p>{{/if}}
{{#if goal}}<p><strong>Goal:</strong> {{goal}}</p>{{/if}}
{{#if target_colleges}}<p><strong>Target Colleges:</strong> {{target_colleges}}</p>{{/if}}
{{#if deliverables}}<p><strong>Deliverables:</strong> {{deliverables}}</p>{{/if}}
{{#if min_followers}}<p><strong>Min Followers:</strong> {{min_followers}}</p>{{/if}}
{{#if budget}}<p><strong>Budget:</strong> {{budget}}</p>{{/if}}

<p><a href="mailto:{{user_email}}">Reply to {{user_email}}</a></p>
```

### User Confirmation Template
**To Email:** `{{user_email}}`
**Subject:** `You're on the Rally waitlist! 🎉`
**Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Rally!</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1, #22d3ee); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px 20px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: linear-gradient(135deg, #6366f1, #22d3ee); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 You're on the Rally waitlist!</h1>
      <p>Thanks for joining the future of campus marketing</p>
    </div>
    <div class="content">
      <p>Hi there!</p>
      
      <p>We're thrilled to have you on the Rally waitlist. You're now part of an exclusive group that will get early access to our AI-powered campus brand-student matching platform.</p>
      
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>We'll keep you updated on our progress</li>
        <li>You'll be among the first to access Rally when we launch</li>
        <li>Exclusive perks and early-bird pricing</li>
        {{#if role}}
        <li>Personalized onboarding for {{role}}s</li>
        {{/if}}
      </ul>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://rally.com" class="button">Learn More About Rally</a>
      </p>
      
      <p>Questions? Just reply to this email - we'd love to hear from you!</p>
      
      <p>Best,<br>The Rally Team</p>
    </div>
    <div class="footer">
      <p>Rally - Building the future of campus marketing</p>
      <p>You received this email because you signed up for our waitlist at rally.com</p>
    </div>
  </div>
</body>
</html>
```

## Template Variables

Both templates support these variables:
- `{{user_email}}` - User's email address
- `{{role}}` - Selected role (brand/influencer)
- `{{date}}` - Submission timestamp
- `{{summary}}` - Generated summary of provided info
- `{{college}}`, `{{clubs}}`, `{{platform}}`, `{{followers}}`, `{{interests}}` - Influencer fields
- `{{company}}`, `{{industry}}`, `{{goal}}`, `{{target_colleges}}`, `{{deliverables}}`, `{{min_followers}}`, `{{budget}}` - Brand fields

## Features

- ✅ Single-page waitlist with email-only signup
- ✅ Optional role selection (Brand/Influencer)
- ✅ Progressive disclosure of optional fields
- ✅ Two-click signup flow
- ✅ Dual email system (admin notification + user confirmation)
- ✅ Spam protection (honeypot + rate limiting)
- ✅ Accessibility compliant (ARIA, keyboard navigation)
- ✅ Responsive design with animated backgrounds
- ✅ Success state with sharing functionality
- ✅ Stats section with credible citations
- ✅ Feature highlights
- ✅ Reduced motion support

## Deployment

1. **Vercel (Recommended):**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Environment Variables:**
   Add your EmailJS credentials to your deployment platform's environment variables.

3. **Custom Domain:**
   Configure your custom domain in your hosting platform.

## Testing

1. Fill out the form with a test email
2. Check that you receive both:
   - Admin notification at `rallyfounders@gmail.com`
   - User confirmation at your test email
3. Verify all optional fields appear in the admin notification
4. Test the two-click flow (focus email → submit)
5. Test accessibility with keyboard navigation
6. Test on mobile devices

## Troubleshooting

- **No emails received:** Check EmailJS service status and template configuration
- **Environment variables not loading:** Ensure `.env.local` is in the project root
- **Build errors:** Verify all dependencies are installed with `npm install`
- **Styling issues:** Clear browser cache and restart dev server

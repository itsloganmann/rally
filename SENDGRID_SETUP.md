# SendGrid Setup Guide

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM=rallyfounders@gmail.com
SENDGRID_ADMIN=rallyfounders@gmail.com
```

Add the same variables to Vercel:
- Go to your project settings
- Environment Variables section
- Add each variable for Production environment

## Testing Commands

Test the API locally:
```bash
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","role":"student"}'
```

Test environment variables:
```bash
node -e "console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'SET' : 'NOT SET')"
```

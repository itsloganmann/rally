# 🚀 Manual Steps to Complete SendGrid Migration

Follow these steps **exactly** to complete the switch from EmailJS to SendGrid.

## ✅ What's Already Done

- ✅ SendGrid SDK installed (`@sendgrid/mail`)
- ✅ API route created (`/api/notify`) with rate limiting
- ✅ Frontend updated to use new API
- ✅ EmailJS dependency removed
- ✅ Error handling and validation implemented
- ✅ Test script created

## 🔧 Step 1: Create SendGrid Account (5 minutes)

1. Go to **https://sendgrid.com** 
2. Click **"Get Started for Free"**
3. Fill out account creation form:
   - **Email**: Your email (rallyfounders@gmail.com recommended)
   - **Password**: Strong password
   - **Company**: Rally
4. Verify your email address
5. Complete the onboarding survey (select "Transactional" emails)

## 📧 Step 2: Verify Sender Identity (3 minutes)

**CRITICAL**: This must be done before sending any emails.

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Single Sender Verification"** (easier than domain auth)
3. Click **"Create New Sender"**
4. Fill out the form:
   - **From Name**: `Rally Team`
   - **From Email**: `rallyfounders@gmail.com`
   - **Reply To Email**: `rallyfounders@gmail.com`
   - **Company Address**: Your address (required by law)
   - **City**: Your city
   - **State**: Your state  
   - **Zip**: Your zip code
   - **Country**: United States
5. Click **"Create"**
6. Check your email (`rallyfounders@gmail.com`) and click the verification link
7. ✅ You should see **"Verified"** status in the dashboard

## 🔑 Step 3: Create API Key (2 minutes)

1. Go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Choose **"Restricted Access"**
4. Set permissions:
   - **Mail Send**: `Full Access` ✅
   - **Template Engine**: `Full Access` (optional)
   - **Suppressions**: `Read` (optional)
   - Everything else: `No Access`
5. Name it: `Rally Production API Key`
6. Click **"Create & View"**
7. **COPY THE API KEY IMMEDIATELY** - you won't see it again!

## 🌍 Step 4: Add Environment Variables Locally (1 minute)

1. Open/create `.env.local` in your project root:
   ```bash
   # SendGrid Configuration  
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   SENDGRID_FROM=rallyfounders@gmail.com
   SENDGRID_ADMIN=rallyfounders@gmail.com
   ```

2. Replace `SG.your_actual_api_key_here` with your real API key
3. Save the file
4. **NEVER commit .env.local to git**

## ☁️ Step 5: Add Environment Variables to Vercel (2 minutes)

1. Go to **https://vercel.com** → Your project
2. Go to **Settings** tab
3. Click **"Environment Variables"** in sidebar
4. Add each variable:
   
   **Variable 1:**
   - Name: `SENDGRID_API_KEY`
   - Value: `SG.your_actual_api_key_here` (paste your real key)
   - Environment: **Production** ✅
   
   **Variable 2:**
   - Name: `SENDGRID_FROM`
   - Value: `rallyfounders@gmail.com`
   - Environment: **Production** ✅
   
   **Variable 3:**
   - Name: `SENDGRID_ADMIN`
   - Value: `rallyfounders@gmail.com`
   - Environment: **Production** ✅

5. Click **"Save"** for each variable

## 🧪 Step 6: Test Locally (5 minutes)

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the API directly:**
   ```bash
   curl -X POST http://localhost:3000/api/notify \
     -H "Content-Type: application/json" \
     -d '{"email":"your-email@gmail.com","role":"test user"}'
   ```

3. **Expected result:**
   - Status: `200 OK`
   - Response: `{"success":true,"message":"Welcome! Check your email for confirmation."}`
   - You should receive **2 emails**:
     - Welcome email to the test email
     - Admin notification to `rallyfounders@gmail.com`

4. **If you get errors:**
   - `"Email service not configured"` → Check `.env.local` file exists and has correct API key
   - `"not a verified sender"` → Complete Step 2 (sender verification)
   - `"permission denied"` → Recreate API key with Mail Send: Full Access

## 🎯 Step 7: Test via Website Form (2 minutes)

1. Go to **http://localhost:3000** 
2. Fill out the waitlist form with your email
3. Click **"Join Waitlist"**
4. **Expected result:**
   - Success message appears
   - You receive welcome email
   - Admin receives notification email

## 🚀 Step 8: Deploy to Production (3 minutes)

1. **Push your changes:**
   ```bash
   git push origin waitlist
   ```

2. **Deploy on Vercel:**
   - Go to Vercel dashboard
   - Your project should auto-deploy
   - Or manually trigger deployment

3. **Test production:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/notify \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","role":"production test"}'
   ```

## 📊 Step 9: Monitor Email Delivery (2 minutes)

1. In SendGrid dashboard, go to **Activity**
2. You should see your test emails with:
   - **Status**: `Delivered` ✅
   - **Opens/Clicks**: Tracked automatically

2. Check **spam folders** if emails don't arrive
3. For better deliverability later, consider Domain Authentication

## 🐛 Troubleshooting Common Issues

### "Email service not configured"
- ✅ Check `.env.local` exists and has `SENDGRID_API_KEY=SG.your_key`  
- ✅ Restart your dev server after adding env vars

### "The from address does not have a verified sender identity"
- ✅ Complete sender verification in SendGrid dashboard
- ✅ Make sure `SENDGRID_FROM=rallyfounders@gmail.com` matches verified email

### "Permission denied, missing Mail Send permission"
- ✅ Recreate API key with "Mail Send: Full Access"

### Emails go to spam
- ✅ Set up Domain Authentication (optional but recommended)
- ✅ Ask users to whitelist your sender email

### Rate limiting errors
- ✅ Wait 10 seconds between test requests (intentional protection)

## 📝 Final Checklist

- [ ] SendGrid account created and verified
- [ ] Sender identity verified for `rallyfounders@gmail.com`  
- [ ] API key created with Mail Send permissions
- [ ] Environment variables added locally (`.env.local`)
- [ ] Environment variables added to Vercel
- [ ] Local testing successful (API + website form)
- [ ] Deployed to production
- [ ] Production testing successful
- [ ] Email delivery confirmed in SendGrid Activity

## 🎉 You're Done! 

Your email system is now:
- ✅ **Industry standard** (SendGrid used by Netflix, Shopify, etc.)
- ✅ **Fast** (sends in milliseconds)  
- ✅ **Free** (100 emails/day forever)
- ✅ **Secure** (server-side API keys)
- ✅ **Rate limited** (prevents abuse)
- ✅ **Uses your HTML templates** (existing designs preserved)

## 📞 Need Help?

If something doesn't work:
1. Check the troubleshooting section above
2. Look at browser dev tools Network tab for API errors
3. Check Vercel function logs for server errors
4. Check SendGrid Activity dashboard for delivery status

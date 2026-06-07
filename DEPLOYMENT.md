# Deployment Guide — Phase 0

## Prerequisites

1. **GitHub Account** — To push the repo
2. **Vercel Account** — For hosting (free tier is fine)
3. **Neon Account** — For managed PostgreSQL
4. **Clerk Account** — For authentication
5. **Stripe Account** — For payments (test mode for now)
6. **Anthropic & OpenAI API Keys** — For AI features

---

## Step 1: Create GitHub Repository

```bash
# Initialize and push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/gcsc-student-hub.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up Neon PostgreSQL

1. Go to [neon.tech](https://neon.tech) → Create account
2. Create a new project (database)
3. Copy the **Connection String** (labeled `DATABASE_URL`)
4. In the same project, create a migration role and get the **Direct URL** (`DIRECT_URL`)
5. Save both URLs

---

## Step 3: Set Up Clerk

1. Go to [clerk.com](https://clerk.com) → Create account
2. Create a new application
3. Copy these keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Go to **Webhooks** → Create webhook for `user.created` and `user.deleted`
   - Endpoint: `https://YOUR_VERCEL_DOMAIN/api/webhooks/clerk`
   - Copy the **Signing Secret** (`CLERK_WEBHOOK_SIGNING_SECRET`)

---

## Step 4: Set Up Stripe (Test Mode)

1. Go to [stripe.com](https://stripe.com) → Create account
2. Enable Test Mode (toggle in the top-right)
3. Go to **Developers** → **API Keys** → Copy:
   - `STRIPE_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_test_`)
4. Go to **Webhooks** → Create webhook
   - Endpoint: `https://YOUR_VERCEL_DOMAIN/api/webhooks/stripe`
   - Copy the **Signing Secret** (`STRIPE_WEBHOOK_SECRET`)

---

## Step 5: Get AI API Keys

1. **Anthropic:** Go to [console.anthropic.com](https://console.anthropic.com)
   - Create API key → `ANTHROPIC_API_KEY`
2. **OpenAI:** Go to [platform.openai.com](https://platform.openai.com)
   - Create API key → `OPENAI_API_KEY`

---

## Step 6: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import the GitHub repository
3. **Environment Variables** — Add these in Vercel's project settings:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<from Clerk>
   CLERK_SECRET_KEY=<from Clerk>
   CLERK_WEBHOOK_SIGNING_SECRET=<from Clerk webhooks>
   
   DATABASE_URL=<from Neon>
   DIRECT_URL=<from Neon>
   
   STRIPE_PUBLISHABLE_KEY=<from Stripe test>
   STRIPE_SECRET_KEY=<from Stripe test>
   STRIPE_WEBHOOK_SECRET=<from Stripe webhooks>
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<from Stripe test>
   
   ANTHROPIC_API_KEY=<from Anthropic>
   OPENAI_API_KEY=<from OpenAI>
   
   CLOUDINARY_CLOUD_NAME=<optional, add later>
   CLOUDINARY_API_KEY=<optional, add later>
   CLOUDINARY_API_SECRET=<optional, add later>
   
   KV_URL=<optional, defer to Phase 2>
   KV_REST_API_URL=<optional, defer to Phase 2>
   KV_REST_API_TOKEN=<optional, defer to Phase 2>
   
   NEXT_PUBLIC_APP_URL=https://YOUR_VERCEL_DOMAIN.vercel.app
   ```

4. Click **Deploy** — Vercel will build and deploy automatically

---

## Step 7: Run Database Migrations

After deployment, go to Vercel → Project → Deployments → Click the latest deployment → go to the terminal and run:

```bash
npx prisma migrate dev --name init
```

Or run it locally:
```bash
export DATABASE_URL="<your Neon connection string>"
export DIRECT_URL="<your Neon direct URL>"
npx prisma migrate dev --name init
```

---

## Step 8: Test the Flow

1. Go to `https://YOUR_VERCEL_DOMAIN.vercel.app`
2. Click **Get Started** → Sign up with email
3. Verify Clerk webhook created a user in Neon (check Prisma Studio)
4. Complete onboarding → Select subjects → Dashboard should load

---

## Clerk Webhook URL

Once Vercel deploys, update Clerk webhook endpoint to:
```
https://YOUR_VERCEL_DOMAIN.vercel.app/api/webhooks/clerk
```

---

## Status Check

- [ ] GitHub repo pushed
- [ ] Neon PostgreSQL created (DATABASE_URL + DIRECT_URL)
- [ ] Clerk application created (keys + webhook)
- [ ] Stripe test project created (keys + webhook)
- [ ] AI API keys obtained
- [ ] Vercel project created + env vars set
- [ ] Initial deploy completed
- [ ] Database migrations run
- [ ] Sign-up → Onboarding → Dashboard tested

Once all are done, Phase 0 is live. Ready for Phase 1.

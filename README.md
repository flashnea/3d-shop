# my-3d-shop - Minimal Next.js shop (ready for Vercel)

This is a minimal Next.js starter for your Atelier 3D shop.
- Contains sample product pages, cart (client-side), and API routes for Stripe checkout + webhook.
- Supabase client stub included.

## Setup
1. Create a Supabase project and run migrations (create `orders` table).
2. Create a Stripe account and get API keys (test keys for dev).
3. Set environment variables on Vercel:
   - NEXT_PUBLIC_APP_URL=https://your-domain.com
   - NEXT_PUBLIC_SUPABASE_URL=...
   - NEXT_PUBLIC_SUPABASE_ANON=...
   - SUPABASE_SERVICE_ROLE_KEY=... (server-only)
   - STRIPE_SECRET_KEY=sk_test_...
   - STRIPE_WEBHOOK_SECRET=whsec_...
4. Deploy on Vercel (import from GitHub or upload ZIP).

## Notes
- Replace the placeholder image in /public/product.png with your own assets.
- Connect buttons to real checkout by using the provided /api/create-checkout API.

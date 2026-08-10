# Surat Langit

Standalone single-page app for `suratlangit.wahyuteguh.com`, also available at
`https://wahyuteguh.com/suratlangit` when the main Astro site is deployed.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase.sql`](./supabase.sql) in the SQL Editor. Re-run it after
   schema/policy changes; it is safe to run repeatedly.
3. Create a Cloudflare Turnstile widget. Add these domains: `wahyuteguh.com`,
   `www.wahyuteguh.com`, `suratlangit.wahyuteguh.com`, and your local dev host.
4. Replace the config values in `public/apps/suratlangit/index.html`:

```html
<script>
window.SURAT_LANGIT_CONFIG = {
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key',
  turnstileSiteKey: 'your-turnstile-site-key',
  submitUrl: 'https://your-project.supabase.co/functions/v1/submit-message'
  };
</script>
```

Place that block before the app script. The anon key and Turnstile site key are
public browser values. Never put a service-role key or Turnstile secret in this
file.

## Anti-spam function

The browser must not insert directly into `messages`. The SQL migration removes
the public insert policy. Deploy the function and set its secrets with the
Supabase CLI:

```sh
supabase functions deploy submit-message --no-verify-jwt
supabase secrets set TURNSTILE_SECRET_KEY=your-turnstile-secret RATE_LIMIT_SALT=$(openssl rand -hex 32)
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically to
Supabase Edge Functions. The function verifies Turnstile, rejects a honeypot,
validates the message, and limits each hashed IP to 5 submissions per 10
minutes. The raw IP is never stored.

Without Supabase credentials, the app runs in demo mode with local sample messages.
New messages receive a random ayah from the 6,236-ayah Quran index through
`api.alquran.cloud`, with the local verses as a fallback if that API is unavailable.

## Deploy

The app lives at `public/apps/suratlangit/index.html` for the main-site build.
Deploy the main Astro site to get `/suratlangit`. For a separate subdomain, use
`public/apps/suratlangit/` as the static document root. No Node build step is required.

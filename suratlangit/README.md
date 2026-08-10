# Surat Langit

Standalone single-page app for `suratlangit.wahyuteguh.com`, also available at
`https://wahyuteguh.com/suratlangit` when the main Astro site is deployed.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase.sql`](./supabase.sql) in the SQL Editor. Re-run it after
   schema/policy changes; it is safe to run repeatedly.
3. Replace the empty values in the config block in `public/apps/suratlangit/index.html`:

```html
<script>
window.SURAT_LANGIT_CONFIG = {
    supabaseUrl: 'https://your-project.supabase.co',
    supabaseAnonKey: 'your-anon-key'
  };
</script>
```

Place that block before the app script. The anon key is safe for browser use when Row Level Security is enabled. Never put a service-role key in this file.

Without Supabase credentials, the app runs in demo mode with local sample messages.

## Deploy

The app lives at `public/apps/suratlangit/index.html` for the main-site build.
Deploy the main Astro site to get `/suratlangit`. For a separate subdomain, use
`public/apps/suratlangit/` as the static document root. No Node build step is required.

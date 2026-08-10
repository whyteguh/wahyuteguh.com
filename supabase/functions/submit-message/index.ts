import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = new Set([
  'https://wahyuteguh.com',
  'https://www.wahyuteguh.com',
  'https://suratlangit.wahyuteguh.com',
  'http://localhost:4321',
  'http://localhost:3000',
]);

const json = (body: Record<string, unknown>, status: number, origin: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Vary': 'Origin',
    },
  });

async function hash(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async request => {
  const origin = request.headers.get('origin') || '';
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://wahyuteguh.com',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Vary': 'Origin',
      },
    });
  }
  if (request.method !== 'POST' || !allowedOrigins.has(origin)) {
    return json({ error: 'Origin or method not allowed.' }, 403, 'https://wahyuteguh.com');
  }

  try {
    const { verse_key, content, turnstileToken, website } = await request.json();
    const cleanContent = typeof content === 'string' ? content.trim() : '';
    const cleanVerseKey = typeof verse_key === 'string' ? verse_key.trim() : '';

    if (website || !turnstileToken || cleanContent.length < 1 || cleanContent.length > 1000) {
      return json({ error: 'Invalid submission.' }, 400, origin);
    }
    if (!/^\d{1,3}:\d{1,3}$/.test(cleanVerseKey)) {
      return json({ error: 'Invalid verse.' }, 400, origin);
    }
    const [surah, ayah] = cleanVerseKey.split(':').map(Number);
    if (surah < 1 || surah > 114 || ayah < 1 || ayah > 286) {
      return json({ error: 'Invalid verse.' }, 400, origin);
    }

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: Deno.env.get('TURNSTILE_SECRET_KEY') || '',
        response: turnstileToken,
        remoteip: request.headers.get('cf-connecting-ip') || '',
      }),
    });
    const turnstile = await turnstileResponse.json();
    if (!turnstile.success) {
      console.warn('Turnstile verification failed', turnstile['error-codes'] || []);
      return json({ error: 'Verification failed.', codes: turnstile['error-codes'] || [] }, 403, origin);
    }

    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const rateKey = await hash(`${Deno.env.get('RATE_LIMIT_SALT') || 'change-me'}:${ip}`);
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: allowed, error: rateError } = await supabase.rpc('consume_message_rate_limit', { p_key: rateKey, p_limit: 5 });
    if (rateError || !allowed) return json({ error: 'Too many messages. Coba lagi nanti.' }, 429, origin);

    const { error: insertError } = await supabase.from('messages').insert({ verse_key: cleanVerseKey, content: cleanContent });
    if (insertError) return json({ error: 'Message could not be saved.' }, 500, origin);
    return json({ ok: true }, 200, origin);
  } catch (_error) {
    return json({ error: 'Invalid request.' }, 400, origin);
  }
});

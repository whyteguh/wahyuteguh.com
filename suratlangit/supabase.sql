-- Run this in Supabase SQL Editor.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  verse_key text not null,
  content text not null check (char_length(content) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Keep the public API limited to valid-looking surat:ayah references.
delete from public.messages
where verse_key !~ '^[0-9]+:[0-9]+$'
   or split_part(verse_key, ':', 1)::int not between 1 and 114
   or split_part(verse_key, ':', 2)::int not between 1 and 286;

-- Remove temporary rows created while verifying the public endpoint.
delete from public.messages
where content in ('diagnostic test', 'cors diagnostic');

-- Remove the temporary row used to verify the direct REST insert path.
delete from public.messages
where content = 'security-check';

alter table public.messages drop constraint if exists messages_verse_key_check;
alter table public.messages add constraint messages_verse_key_check
  check (
    verse_key ~ '^[0-9]+:[0-9]+$'
    and split_part(verse_key, ':', 1)::int between 1 and 114
    and split_part(verse_key, ':', 2)::int between 1 and 286
  );

-- Remove old policies before recreating the restricted versions below.
drop policy if exists "Anyone can read messages" on public.messages;
drop policy if exists "Anyone can submit a message" on public.messages;

create policy "Anyone can read messages"
  on public.messages for select
  to anon
  using (created_at <= now());

-- Inserts go through the Turnstile-protected Edge Function, not the public REST API.
revoke insert on public.messages from anon, authenticated;

create table if not exists public.message_rate_limits (
  key text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0
);

alter table public.message_rate_limits enable row level security;
revoke all on public.message_rate_limits from anon, authenticated;

create or replace function public.consume_message_rate_limit(p_key text, p_limit integer default 5)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_window public.message_rate_limits%rowtype;
begin
  select * into current_window
  from public.message_rate_limits
  where key = p_key
  for update;

  if not found then
    insert into public.message_rate_limits (key, window_started_at, request_count)
    values (p_key, now(), 1);
    return true;
  end if;

  if current_window.window_started_at < now() - interval '10 minutes' then
    update public.message_rate_limits
    set window_started_at = now(), request_count = 1
    where key = p_key;
    return true;
  end if;

  if current_window.request_count >= p_limit then
    return false;
  end if;

  update public.message_rate_limits
  set request_count = request_count + 1
  where key = p_key;
  return true;
end;
$$;

revoke all on function public.consume_message_rate_limit(text, integer) from public;
grant execute on function public.consume_message_rate_limit(text, integer) to service_role;

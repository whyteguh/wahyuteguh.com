-- Run this in Supabase SQL Editor.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  verse_key text not null,
  content text not null check (char_length(content) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Keep the public API limited to the verses shipped by the app.
delete from public.messages
where verse_key not in ('94:5', '2:286', '13:28', '65:2', '93:5', '12:87', '2:216');

-- Remove temporary rows created while verifying the public endpoint.
delete from public.messages
where content in ('diagnostic test', 'cors diagnostic');

alter table public.messages drop constraint if exists messages_verse_key_check;
alter table public.messages add constraint messages_verse_key_check
  check (verse_key in ('94:5', '2:286', '13:28', '65:2', '93:5', '12:87', '2:216'));

-- Remove old policies before recreating the restricted versions below.
drop policy if exists "Anyone can read messages" on public.messages;
drop policy if exists "Anyone can submit a message" on public.messages;

create policy "Anyone can read messages"
  on public.messages for select
  to anon
  using (created_at <= now());

create policy "Anyone can submit a message"
  on public.messages for insert
  to anon
  with check (
    char_length(content) between 1 and 1000
    and verse_key in ('94:5', '2:286', '13:28', '65:2', '93:5', '12:87', '2:216')
    and created_at between now() - interval '1 minute' and now() + interval '1 minute'
  );

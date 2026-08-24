-- CyberWallah — v1 "Identity core" schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY guards.

-- ============================================================
-- Sequence: sequential membership numbers.
-- First member = 101 → rendered as "CW-101" in the app.
-- Low numbers = "founding member" prestige.
-- ============================================================
create sequence if not exists public.card_number_seq start 101;

-- ============================================================
-- profiles: one row per auth user (1:1 with auth.users)
-- ============================================================
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  card_number  int  not null unique default nextval('public.card_number_seq'),
  full_name    text,
  age          int  check (age is null or (age between 5 and 120)),
  location     text,
  avatar_url   text,
  tier         text not null default 'free' check (tier in ('free','pro','pro_plus')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- quiz_results: quiz attempts tied to an account.
-- answers = the per-question selections (now persisted; previously lost).
-- ============================================================
create table if not exists public.quiz_results (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  score      int  not null,
  total      int  not null,
  answers    jsonb,
  created_at timestamptz not null default now()
);

create index if not exists quiz_results_user_id_created_at_idx
  on public.quiz_results (user_id, created_at desc);

-- ============================================================
-- Auto-create a profile whenever a new auth user is created
-- (works for both email/password and Google OAuth signups).
-- SECURITY DEFINER so the insert bypasses RLS; card_number is
-- assigned automatically by the column's sequence default.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, age)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',   -- Google provides "name"
      ''
    ),
    nullif(new.raw_user_meta_data->>'age', '')::int
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep updated_at fresh on profile updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security — THE security boundary.
-- The anon key ships in the browser, so every table must be
-- locked down here. Owner-only access; nothing public by default.
-- ============================================================
alter table public.profiles     enable row level security;
alter table public.quiz_results enable row level security;

-- profiles: a user can read & update ONLY their own row.
-- (INSERT is handled by the SECURITY DEFINER trigger, so no insert policy.)
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- quiz_results: a user can insert & read ONLY their own rows.
drop policy if exists quiz_insert_own on public.quiz_results;
create policy quiz_insert_own on public.quiz_results
  for insert with check (auth.uid() = user_id);

drop policy if exists quiz_select_own on public.quiz_results;
create policy quiz_select_own on public.quiz_results
  for select using (auth.uid() = user_id);

-- ============================================================
-- Public verify page (/id/CW-101): expose ONLY safe fields by
-- card number. SECURITY DEFINER intentionally bypasses the
-- owner-only RLS above, but the SELECT list returns NO
-- age / location / email — privacy by design.
-- ============================================================
create or replace function public.get_public_card(p_card_number int)
returns table (
  card_number int,
  full_name   text,
  tier        text,
  avatar_url  text,
  created_at  timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select card_number, full_name, tier, avatar_url, created_at
  from public.profiles
  where card_number = p_card_number;
$$;

grant execute on function public.get_public_card(int) to anon, authenticated;

-- Collection rows: one per user per Smiski catalog id (quantity >= 1 when row exists).
create table if not exists public.user_smiski (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  smiski_id text not null,
  quantity integer not null default 1 check (quantity > 0),
  updated_at timestamptz not null default now(),
  unique (user_id, smiski_id)
);

create index if not exists user_smiski_user_id_idx on public.user_smiski (user_id);

alter table public.user_smiski enable row level security;

create policy "Users can select own collection rows"
  on public.user_smiski
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own collection rows"
  on public.user_smiski
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own collection rows"
  on public.user_smiski
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own collection rows"
  on public.user_smiski
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Supabase schema for leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  company text,
  role text,
  team_size int,
  report_id text,
  created_at timestamptz default now()
);

create index if not exists leads_email_idx on leads (email);

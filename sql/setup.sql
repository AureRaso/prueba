-- Enable Row Level Security
alter table auth.users enable row level security;

-- Create landing_pages table
create table public.landing_pages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  academy_name text not null,
  slug text not null unique,
  data jsonb not null,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on landing_pages
alter table public.landing_pages enable row level security;

-- Create policies for landing_pages
create policy "Users can view their own landing pages" on public.landing_pages
  for select using (auth.uid() = user_id);

create policy "Users can insert their own landing pages" on public.landing_pages
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own landing pages" on public.landing_pages
  for update using (auth.uid() = user_id);

create policy "Users can delete their own landing pages" on public.landing_pages
  for delete using (auth.uid() = user_id);

-- Create policy for public access to published landing pages
create policy "Anyone can view published landing pages" on public.landing_pages
  for select using (published = true);

-- Create function to update updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger set_updated_at
  before update on public.landing_pages
  for each row execute function public.handle_updated_at();

-- Create index for better performance
create index landing_pages_user_id_idx on public.landing_pages(user_id);
create index landing_pages_slug_idx on public.landing_pages(slug);
create index landing_pages_published_idx on public.landing_pages(published);
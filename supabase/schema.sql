create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  area text,
  city text,
  postcode text,
  status text default 'Available',
  property_type text,
  rooms text,
  suitable_for text,
  created_at timestamptz default now()
);

insert into properties (title,address,area,city,postcode,status,property_type,rooms,suitable_for)
values ('34 Milsom Street','34 Milsom Street, Easton, Bristol, BS5 0SS','Easton','Bristol','BS5 0SS','Available','Supported accommodation','Rooms available','Adults with housing-related support needs')
on conflict do nothing;

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_name text,
  organisation text,
  email text,
  telephone text,
  details text,
  status text default 'New',
  created_at timestamptz default now()
);

create table if not exists landlord_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  email text,
  telephone text,
  property_address text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

-- Lightweight, privacy-safe table backing the public "Track My Referral" tool.
-- Deliberately stores NO personal/case data — only a reference number and a
-- numeric stage (1-5, matching the stages shown on /track-referral) — so it can
-- safely be readable by anyone who has the reference number.
create table if not exists referral_tracking (
  id uuid primary key default gen_random_uuid(),
  reference_number text unique not null,
  stage int not null default 1 check (stage between 1 and 5),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keeps updated_at current whenever staff move a referral to its next stage.
create or replace function set_referral_tracking_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists referral_tracking_set_updated_at on referral_tracking;
create trigger referral_tracking_set_updated_at
  before update on referral_tracking
  for each row execute function set_referral_tracking_updated_at();

alter table properties enable row level security;
alter table referrals enable row level security;
alter table landlord_enquiries enable row level security;
alter table contact_messages enable row level security;
alter table referral_tracking enable row level security;

drop policy if exists "Public can read properties" on properties;
create policy "Public can read properties"
  on properties for select
  using (true);

drop policy if exists "Public can submit referrals" on referrals;
create policy "Public can submit referrals"
  on referrals for insert
  with check (true);

drop policy if exists "Public can submit landlord enquiries" on landlord_enquiries;
create policy "Public can submit landlord enquiries"
  on landlord_enquiries for insert
  with check (true);

drop policy if exists "Public can submit contact messages" on contact_messages;
create policy "Public can submit contact messages"
  on contact_messages for insert
  with check (true);

-- The website creates a tracking row (stage 1) immediately after a referral is
-- submitted, and anyone with the reference number can look up its stage.
-- Staff update `stage` from the Supabase dashboard (or an internal tool) as a
-- referral progresses — this schema does not build that internal tool.
drop policy if exists "Public can create referral tracking" on referral_tracking;
create policy "Public can create referral tracking"
  on referral_tracking for insert
  with check (true);

drop policy if exists "Public can look up referral tracking" on referral_tracking;
create policy "Public can look up referral tracking"
  on referral_tracking for select
  using (true);
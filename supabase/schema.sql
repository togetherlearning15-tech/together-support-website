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

alter table properties enable row level security;
alter table referrals enable row level security;
alter table landlord_enquiries enable row level security;
alter table contact_messages enable row level security;

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
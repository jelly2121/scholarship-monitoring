-- Run this SQL in Supabase SQL Editor.
create extension if not exists "pgcrypto";

create table if not exists students (
 id uuid primary key default gen_random_uuid(),
 student_id text unique not null,
 full_name text not null,
 course text not null,
 year_level text not null,
 email text,
 contact text,
 status text default 'Active',
 created_at timestamptz default now()
);

create table if not exists scholarships (
 id uuid primary key default gen_random_uuid(),
 scholarship_name text not null,
 provider text not null,
 amount numeric default 0,
 requirements text,
 deadline date,
 status text default 'Active',
 created_at timestamptz default now()
);

create table if not exists student_scholarships (
 id uuid primary key default gen_random_uuid(),
 student_id uuid references students(id) on delete cascade,
 scholarship_id uuid references scholarships(id) on delete cascade,
 application_date date default current_date,
 status text default 'Pending',
 created_at timestamptz default now()
);

create table if not exists requirements (
 id uuid primary key default gen_random_uuid(),
 student_scholarship_id uuid references student_scholarships(id) on delete cascade,
 requirement_name text not null,
 submission_status text default 'Pending',
 submission_date date,
 remarks text,
 created_at timestamptz default now()
);

create table if not exists academic_compliance (
 id uuid primary key default gen_random_uuid(),
 student_id uuid references students(id) on delete cascade,
 semester text not null,
 school_year text not null,
 gwa numeric,
 attendance numeric,
 compliance_status text default 'Pending',
 remarks text,
 created_at timestamptz default now()
);

-- For a classroom prototype, you may enable read/write policies.
-- For a real production system, use Supabase Auth and role-based RLS.
alter table students enable row level security;
alter table scholarships enable row level security;
alter table student_scholarships enable row level security;
alter table requirements enable row level security;
alter table academic_compliance enable row level security;

create policy "prototype students access" on students for all using (true) with check (true);
create policy "prototype scholarships access" on scholarships for all using (true) with check (true);
create policy "prototype student scholarships access" on student_scholarships for all using (true) with check (true);
create policy "prototype requirements access" on requirements for all using (true) with check (true);
create policy "prototype compliance access" on academic_compliance for all using (true) with check (true);

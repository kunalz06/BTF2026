create schema if not exists private;

create table public.btf_problem_catalog (
  slug text primary key,
  problem_id text not null unique,
  title text not null,
  track text not null check (track in ('Drones','AI Software','Automation')),
  created_at timestamptz not null default now()
);

create table public.btf_participants (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.btf_teams (
  id uuid primary key default gen_random_uuid(),
  team_code char(7) not null unique check (team_code ~ '^[A-Z0-9]{7}$'),
  name text not null check (char_length(btrim(name)) between 2 and 60),
  leader_id uuid not null references auth.users(id) on delete cascade,
  problem_slug text references public.btf_problem_catalog(slug) on delete restrict,
  created_at timestamptz not null default now()
);

create table public.btf_team_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  team_id uuid not null references public.btf_teams(id) on delete cascade,
  joined_at timestamptz not null default now()
);

create index btf_team_members_team_id_idx on public.btf_team_members(team_id);
create index btf_teams_leader_id_idx on public.btf_teams(leader_id);

create table public.btf_team_creation_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  team_name text not null,
  created_team_id uuid references public.btf_teams(id) on delete cascade,
  created_team_code char(7),
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index btf_team_creation_requests_user_id_idx
  on public.btf_team_creation_requests(user_id);

create table public.btf_team_join_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  team_code char(7) not null,
  joined_team_id uuid references public.btf_teams(id) on delete cascade,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index btf_team_join_requests_user_id_idx
  on public.btf_team_join_requests(user_id);

create table public.btf_problem_selection_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  problem_slug text not null,
  selected_team_id uuid references public.btf_teams(id) on delete cascade,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index btf_problem_selection_requests_user_id_idx
  on public.btf_problem_selection_requests(user_id);

insert into public.btf_problem_catalog (slug, problem_id, title, track) values
('gps-denied-indoor-autonomous-navigation-drone','BTF-D01','GPS-Denied Indoor Autonomous Navigation Drone','Drones'),
('drone-battery-propulsion-health-intelligence','BTF-D02','Drone Battery and Propulsion Health Intelligence','Drones'),
('collaborative-multi-drone-mapping-intermittent-connectivity','BTF-D03','Collaborative Multi-Drone Mapping with Intermittent Connectivity','Drones'),
('vision-guided-precision-landing-dynamic-marker','BTF-D04','Vision-Guided Precision Landing on a Dynamic Marker','Drones'),
('low-cost-obstacle-detection-collision-avoidance-module','BTF-D05','Low-Cost Obstacle Detection and Collision Avoidance Module','Drones'),
('multimodal-industrial-defect-detection-assistant','BTF-AI01','Multimodal Industrial Defect Detection Assistant','AI Software'),
('explainable-ai-campus-energy-optimization','BTF-AI02','Explainable AI for Campus Energy Optimization','AI Software'),
('ai-document-intake-classification-action-routing','BTF-AI03','AI Document Intake, Classification and Action Routing','AI Software'),
('privacy-preserving-edge-vision-analytics','BTF-AI04','Privacy-Preserving Edge Vision Analytics','AI Software'),
('model-drift-data-quality-monitoring-platform','BTF-AI05','Model Drift and Data Quality Monitoring Platform','AI Software'),
('smart-laboratory-inventory-replenishment-system','BTF-AU01','Smart Laboratory Inventory and Replenishment System','Automation'),
('adaptive-conveyor-sorting-machine-vision','BTF-AU02','Adaptive Conveyor Sorting with Machine Vision','Automation'),
('autonomous-greenhouse-monitoring-climate-control','BTF-AU03','Autonomous Greenhouse Monitoring and Climate Control','Automation'),
('electrical-panel-inspection-maintenance-automation','BTF-AU04','Electrical Panel Inspection and Maintenance Automation','Automation'),
('no-code-academic-administration-workflow-automation','BTF-AU05','No-Code Academic Administration Workflow Automation','Automation');

create or replace function private.btf_current_team_id()
returns uuid language sql stable security definer set search_path = ''
as $$
  select tm.team_id
  from public.btf_team_members tm
  where tm.user_id = (select auth.uid())
  limit 1
$$;

create or replace function private.btf_same_team(target_user_id uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.btf_team_members me
    join public.btf_team_members them on them.team_id = me.team_id
    where me.user_id = (select auth.uid())
      and them.user_id = target_user_id
  )
$$;

create or replace function private.btf_generate_team_code()
returns text language sql volatile security invoker set search_path = ''
as $$
  select string_agg(
    substr(
      'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
      1 + floor(random() * 32)::int,
      1
    ),
    ''
  )
  from generate_series(1, 7)
$$;

create or replace function private.btf_sync_auth_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.btf_participants (user_id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (user_id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists btf_sync_auth_user on auth.users;
create trigger btf_sync_auth_user
after insert or update of email on auth.users
for each row execute function private.btf_sync_auth_user();

insert into public.btf_participants (user_id, email)
select id, coalesce(email, '')
from auth.users
on conflict (user_id) do update set email = excluded.email;

create or replace function private.btf_process_team_creation()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_team_id uuid;
  v_code text;
  v_attempt integer := 0;
begin
  if (select auth.uid()) is null or new.user_id <> (select auth.uid()) then
    raise exception 'Authentication required';
  end if;

  new.team_name := btrim(new.team_name);

  if char_length(new.team_name) < 2 or char_length(new.team_name) > 60 then
    raise exception 'Team name must be between 2 and 60 characters';
  end if;

  if exists (
    select 1 from public.btf_team_members
    where user_id = (select auth.uid())
  ) then
    raise exception 'You are already a member of a team';
  end if;

  loop
    v_attempt := v_attempt + 1;
    if v_attempt > 25 then
      raise exception 'Could not allocate a unique team ID';
    end if;

    v_code := private.btf_generate_team_code();

    begin
      insert into public.btf_teams (team_code, name, leader_id)
      values (v_code, new.team_name, (select auth.uid()))
      returning id into v_team_id;
      exit;
    exception when unique_violation then
      null;
    end;
  end loop;

  insert into public.btf_team_members (user_id, team_id)
  values ((select auth.uid()), v_team_id);

  new.created_team_id := v_team_id;
  new.created_team_code := v_code;
  new.processed_at := now();
  return new;
end;
$$;

drop trigger if exists btf_process_team_creation on public.btf_team_creation_requests;
create trigger btf_process_team_creation
before insert on public.btf_team_creation_requests
for each row execute function private.btf_process_team_creation();

create or replace function private.btf_process_team_join()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_team_id uuid;
  v_count integer;
  v_code text;
begin
  if (select auth.uid()) is null or new.user_id <> (select auth.uid()) then
    raise exception 'Authentication required';
  end if;

  if exists (
    select 1 from public.btf_team_members
    where user_id = (select auth.uid())
  ) then
    raise exception 'You are already a member of a team';
  end if;

  v_code := upper(btrim(new.team_code::text));

  if v_code !~ '^[A-Z0-9]{7}$' then
    raise exception 'Team ID must be exactly 7 alphanumeric characters';
  end if;

  select id into v_team_id
  from public.btf_teams
  where team_code = v_code
  for update;

  if v_team_id is null then
    raise exception 'Team ID not found';
  end if;

  select count(*) into v_count
  from public.btf_team_members
  where team_id = v_team_id;

  if v_count >= 6 then
    raise exception 'This team already has 6 members';
  end if;

  insert into public.btf_team_members (user_id, team_id)
  values ((select auth.uid()), v_team_id);

  new.team_code := v_code;
  new.joined_team_id := v_team_id;
  new.processed_at := now();
  return new;
end;
$$;

drop trigger if exists btf_process_team_join on public.btf_team_join_requests;
create trigger btf_process_team_join
before insert on public.btf_team_join_requests
for each row execute function private.btf_process_team_join();

create or replace function private.btf_process_problem_selection()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_team_id uuid;
  v_problem_slug text;
begin
  if (select auth.uid()) is null or new.user_id <> (select auth.uid()) then
    raise exception 'Authentication required';
  end if;

  select t.id into v_team_id
  from public.btf_teams t
  where t.leader_id = (select auth.uid())
    and t.id = (
      select tm.team_id
      from public.btf_team_members tm
      where tm.user_id = (select auth.uid())
      limit 1
    );

  if v_team_id is null then
    raise exception 'Only the team leader can select the problem statement';
  end if;

  v_problem_slug := btrim(new.problem_slug);

  if not exists (
    select 1 from public.btf_problem_catalog
    where slug = v_problem_slug
  ) then
    raise exception 'Invalid problem statement';
  end if;

  update public.btf_teams
  set problem_slug = v_problem_slug
  where id = v_team_id;

  new.problem_slug := v_problem_slug;
  new.selected_team_id := v_team_id;
  new.processed_at := now();
  return new;
end;
$$;

drop trigger if exists btf_process_problem_selection on public.btf_problem_selection_requests;
create trigger btf_process_problem_selection
before insert on public.btf_problem_selection_requests
for each row execute function private.btf_process_problem_selection();

alter table public.btf_problem_catalog enable row level security;
alter table public.btf_participants enable row level security;
alter table public.btf_teams enable row level security;
alter table public.btf_team_members enable row level security;
alter table public.btf_team_creation_requests enable row level security;
alter table public.btf_team_join_requests enable row level security;
alter table public.btf_problem_selection_requests enable row level security;

revoke all on table public.btf_problem_catalog from anon, authenticated;
revoke all on table public.btf_participants from anon, authenticated;
revoke all on table public.btf_teams from anon, authenticated;
revoke all on table public.btf_team_members from anon, authenticated;
revoke all on table public.btf_team_creation_requests from anon, authenticated;
revoke all on table public.btf_team_join_requests from anon, authenticated;
revoke all on table public.btf_problem_selection_requests from anon, authenticated;

grant select on table public.btf_problem_catalog to authenticated;
grant select on table public.btf_participants to authenticated;
grant select on table public.btf_teams to authenticated;
grant select on table public.btf_team_members to authenticated;
grant select, insert on table public.btf_team_creation_requests to authenticated;
grant select, insert on table public.btf_team_join_requests to authenticated;
grant select, insert on table public.btf_problem_selection_requests to authenticated;

grant usage on schema private to authenticated;
revoke execute on function private.btf_current_team_id() from public, anon;
revoke execute on function private.btf_same_team(uuid) from public, anon;
revoke execute on function private.btf_generate_team_code() from public, anon, authenticated;
revoke execute on function private.btf_sync_auth_user() from public, anon, authenticated;
revoke execute on function private.btf_process_team_creation() from public, anon, authenticated;
revoke execute on function private.btf_process_team_join() from public, anon, authenticated;
revoke execute on function private.btf_process_problem_selection() from public, anon, authenticated;
grant execute on function private.btf_current_team_id() to authenticated;
grant execute on function private.btf_same_team(uuid) to authenticated;

create policy "btf problem catalog read"
on public.btf_problem_catalog for select to authenticated
using (true);

create policy "btf participants read own or teammates"
on public.btf_participants for select to authenticated
using (
  user_id = (select auth.uid())
  or (select private.btf_same_team(user_id))
);

create policy "btf teams members read own team"
on public.btf_teams for select to authenticated
using (id = (select private.btf_current_team_id()));

create policy "btf memberships members read own team"
on public.btf_team_members for select to authenticated
using (team_id = (select private.btf_current_team_id()));

create policy "btf creation requests read own"
on public.btf_team_creation_requests for select to authenticated
using (user_id = (select auth.uid()));

create policy "btf creation requests insert own"
on public.btf_team_creation_requests for insert to authenticated
with check (user_id = (select auth.uid()));

create policy "btf join requests read own"
on public.btf_team_join_requests for select to authenticated
using (user_id = (select auth.uid()));

create policy "btf join requests insert own"
on public.btf_team_join_requests for insert to authenticated
with check (user_id = (select auth.uid()));

create policy "btf problem selection requests read own"
on public.btf_problem_selection_requests for select to authenticated
using (user_id = (select auth.uid()));

create policy "btf problem selection requests insert own"
on public.btf_problem_selection_requests for insert to authenticated
with check (user_id = (select auth.uid()));

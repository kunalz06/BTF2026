create table public.btf_team_presentations (
  team_id uuid primary key references public.btf_teams(id) on delete cascade,
  asset_id text not null unique,
  public_id text not null,
  secure_url text not null,
  original_filename text not null,
  file_bytes bigint not null check (file_bytes > 0 and file_bytes <= 10485760),
  file_format text not null check (lower(file_format) in ('pdf','ppt','pptx')),
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  uploaded_at timestamptz not null default now()
);

create index btf_team_presentations_uploaded_by_idx
  on public.btf_team_presentations(uploaded_by);

create table public.btf_presentation_submission_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  asset_id text not null,
  public_id text not null,
  secure_url text not null,
  original_filename text not null,
  file_bytes bigint not null,
  file_format text not null,
  submitted_team_id uuid references public.btf_teams(id) on delete cascade,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index btf_presentation_submission_requests_user_idx
  on public.btf_presentation_submission_requests(user_id);

create index btf_presentation_submission_requests_team_idx
  on public.btf_presentation_submission_requests(submitted_team_id);

create or replace function private.btf_process_presentation_submission()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_team_id uuid;
  v_format text;
begin
  if (select auth.uid()) is null or new.user_id <> (select auth.uid()) then
    raise exception 'Authentication required';
  end if;

  select tm.team_id into v_team_id
  from public.btf_team_members tm
  where tm.user_id = (select auth.uid())
  limit 1;

  if v_team_id is null then
    raise exception 'You must be part of a team before uploading a presentation';
  end if;

  if now() >= timestamptz '2026-10-31 00:00:00+05:30' then
    raise exception 'The project presentation deadline has passed';
  end if;

  v_format := lower(btrim(new.file_format));

  if v_format not in ('pdf','ppt','pptx') then
    raise exception 'Presentation must be a PDF, PPT, or PPTX file';
  end if;

  if new.file_bytes <= 0 or new.file_bytes > 10485760 then
    raise exception 'Presentation file must be 10 MB or smaller';
  end if;

  if new.secure_url !~ '^https://res\.cloudinary\.com/dvdobvlm4/' then
    raise exception 'Invalid presentation upload';
  end if;

  insert into public.btf_team_presentations (
    team_id,
    asset_id,
    public_id,
    secure_url,
    original_filename,
    file_bytes,
    file_format,
    uploaded_by,
    uploaded_at
  )
  values (
    v_team_id,
    new.asset_id,
    new.public_id,
    new.secure_url,
    left(new.original_filename, 255),
    new.file_bytes,
    v_format,
    (select auth.uid()),
    now()
  )
  on conflict (team_id) do update
    set asset_id = excluded.asset_id,
        public_id = excluded.public_id,
        secure_url = excluded.secure_url,
        original_filename = excluded.original_filename,
        file_bytes = excluded.file_bytes,
        file_format = excluded.file_format,
        uploaded_by = excluded.uploaded_by,
        uploaded_at = excluded.uploaded_at;

  new.file_format := v_format;
  new.submitted_team_id := v_team_id;
  new.processed_at := now();
  return new;
end;
$$;

drop trigger if exists btf_process_presentation_submission
  on public.btf_presentation_submission_requests;
create trigger btf_process_presentation_submission
before insert on public.btf_presentation_submission_requests
for each row execute function private.btf_process_presentation_submission();

alter table public.btf_team_presentations enable row level security;
alter table public.btf_presentation_submission_requests enable row level security;

revoke all on table public.btf_team_presentations from anon, authenticated;
revoke all on table public.btf_presentation_submission_requests from anon, authenticated;

grant select on table public.btf_team_presentations to authenticated;
grant select, insert on table public.btf_presentation_submission_requests to authenticated;

revoke execute on function private.btf_process_presentation_submission()
  from public, anon, authenticated;

create policy "btf team presentations members read own team"
on public.btf_team_presentations
for select
to authenticated
using (team_id = (select private.btf_current_team_id()));

create policy "btf presentation requests read own"
on public.btf_presentation_submission_requests
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "btf presentation requests insert own"
on public.btf_presentation_submission_requests
for insert
to authenticated
with check (user_id = (select auth.uid()));

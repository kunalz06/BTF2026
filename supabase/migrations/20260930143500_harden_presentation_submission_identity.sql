create or replace function private.btf_process_presentation_submission()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_team_id uuid;
  v_team_code char(7);
  v_format text;
begin
  if (select auth.uid()) is null or new.user_id <> (select auth.uid()) then
    raise exception 'Authentication required';
  end if;

  select tm.team_id, t.team_code
  into v_team_id, v_team_code
  from public.btf_team_members tm
  join public.btf_teams t on t.id = tm.team_id
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

  if new.public_id !~ ('^team-' || v_team_code || '-presentation-[0-9]+$') then
    raise exception 'Presentation upload does not match your team';
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

revoke execute on function private.btf_process_presentation_submission()
  from public, anon, authenticated;

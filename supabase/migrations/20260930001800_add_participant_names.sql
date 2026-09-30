alter table public.btf_participants
  add column full_name text;

alter table public.btf_participants
  add constraint btf_participants_full_name_length
  check (full_name is null or char_length(btrim(full_name)) between 2 and 80);

create or replace function private.btf_sync_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_full_name text;
  v_is_participant boolean;
begin
  v_is_participant :=
    coalesce((new.raw_user_meta_data ->> 'btf_participant')::boolean, false);

  if not v_is_participant then
    return new;
  end if;

  v_full_name := btrim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));

  if char_length(v_full_name) < 2 or char_length(v_full_name) > 80 then
    raise exception 'Participant name must be between 2 and 80 characters';
  end if;

  insert into public.btf_participants (user_id, email, full_name)
  values (new.id, coalesce(new.email, ''), v_full_name)
  on conflict (user_id) do update
    set email = excluded.email,
        full_name = excluded.full_name;

  return new;
end;
$$;

update public.btf_participants p
set full_name = btrim(u.raw_user_meta_data ->> 'full_name')
from auth.users u
where p.user_id = u.id
  and u.raw_user_meta_data ->> 'full_name' is not null;

alter table public.btf_participants
  alter column full_name set not null;

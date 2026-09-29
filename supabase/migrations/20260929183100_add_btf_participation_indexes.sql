create index btf_teams_problem_slug_idx
  on public.btf_teams(problem_slug);

create index btf_team_creation_requests_created_team_id_idx
  on public.btf_team_creation_requests(created_team_id);

create index btf_team_join_requests_joined_team_id_idx
  on public.btf_team_join_requests(joined_team_id);

create index btf_problem_selection_requests_selected_team_id_idx
  on public.btf_problem_selection_requests(selected_team_id);

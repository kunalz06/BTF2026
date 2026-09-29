export const TEAM_ID_LENGTH = 7;
export const TEAM_MIN_MEMBERS = 2;
export const TEAM_MAX_MEMBERS = 6;
export const TEAM_ID_PATTERN = /^[A-Z0-9]{7}$/;

export function normalizeTeamCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, TEAM_ID_LENGTH);
}

export function isValidTeamCode(value: string) {
  return TEAM_ID_PATTERN.test(normalizeTeamCode(value));
}

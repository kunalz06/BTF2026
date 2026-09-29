import { describe, expect, it } from "vitest";
import {
  isValidTeamCode,
  normalizeTeamCode,
  TEAM_ID_LENGTH,
  TEAM_MAX_MEMBERS,
  TEAM_MIN_MEMBERS,
} from "@/lib/participation";

describe("participation team rules", () => {
  it("normalizes shared team IDs to seven uppercase alphanumeric characters", () => {
    expect(normalizeTeamCode("ab-c2x7q9")).toBe("ABC2X7Q");
    expect(normalizeTeamCode("  z9!k2#lm ")).toBe("Z9K2LM");
  });

  it("validates only complete seven-character team IDs", () => {
    expect(isValidTeamCode("ABC2X7Q")).toBe(true);
    expect(isValidTeamCode("abc2x7q")).toBe(true);
    expect(isValidTeamCode("ABC123")).toBe(false);
    expect(isValidTeamCode("ABC-123")).toBe(false);
    expect(TEAM_ID_LENGTH).toBe(7);
  });

  it("matches the hackathon team-size rules", () => {
    expect(TEAM_MIN_MEMBERS).toBe(2);
    expect(TEAM_MAX_MEMBERS).toBe(6);
  });
});

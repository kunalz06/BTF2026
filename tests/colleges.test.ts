import { describe, expect, it } from "vitest";
import {
  gdgCollegeRegions,
  gdgColleges,
  getCollegeMapsUrl,
} from "@/data/gdg-colleges";

describe("West Bengal GDG college directory", () => {
  it("contains the verified college directory", () => {
    expect(gdgColleges).toHaveLength(29);
    expect(new Set(gdgColleges.map((college) => college.name)).size).toBe(29);
  });

  it("covers every configured West Bengal region", () => {
    for (const region of gdgCollegeRegions) {
      expect(gdgColleges.some((college) => college.region === region)).toBe(true);
    }
  });

  it("attaches a location and official GDG source to every college", () => {
    for (const college of gdgColleges) {
      expect(college.location.length).toBeGreaterThan(8);
      expect(college.gdgUrl.startsWith("https://gdg.community.dev/")).toBe(true);
      expect(getCollegeMapsUrl(college)).toContain("https://www.google.com/maps/search/");
    }
  });
});

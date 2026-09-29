import { describe, expect, it } from "vitest";
import {
  getProblemBySlug,
  problemStatements,
  problemTracks,
} from "@/data/problem-statements";
import { generateProblemPdf } from "@/lib/problem-pdf";

describe("problem statements", () => {
  it("ships exactly 15 unique problem statements", () => {
    expect(problemStatements).toHaveLength(15);
    expect(new Set(problemStatements.map((problem) => problem.slug)).size).toBe(15);
    expect(new Set(problemStatements.map((problem) => problem.id)).size).toBe(15);
  });

  it("contains five problems in each requested track", () => {
    for (const track of problemTracks) {
      expect(problemStatements.filter((problem) => problem.track === track)).toHaveLength(5);
    }
  });

  it("covers hardware and software build types", () => {
    const types = new Set(problemStatements.map((problem) => problem.type));
    expect(types.has("Hardware")).toBe(true);
    expect(types.has("Software")).toBe(true);
    expect(types.has("Hybrid")).toBe(true);
  });

  it("provides complete detail content for every problem", () => {
    for (const problem of problemStatements) {
      expect(problem.summary.length).toBeGreaterThan(40);
      expect(problem.problem.length).toBeGreaterThan(100);
      expect(problem.objective.length).toBeGreaterThan(60);
      expect(problem.requirements.length).toBeGreaterThanOrEqual(5);
      expect(problem.constraints.length).toBeGreaterThanOrEqual(3);
      expect(problem.deliverables.length).toBeGreaterThanOrEqual(4);
      expect(problem.evaluation.length).toBeGreaterThanOrEqual(5);
      expect(getProblemBySlug(problem.slug)?.id).toBe(problem.id);
    }
  });

  it("generates a valid downloadable PDF payload", () => {
    const pdf = generateProblemPdf(problemStatements[0]);
    const header = new TextDecoder().decode(pdf.slice(0, 8));
    expect(header).toBe("%PDF-1.4");
    expect(pdf.byteLength).toBeGreaterThan(4000);
  });
});

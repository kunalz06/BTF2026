import rawProblemStatements from "./problem-statements.json";

export type ProblemTrack = "Drones" | "AI Software" | "Automation";
export type ProblemType = "Hardware" | "Software" | "Hybrid";
export type ProblemDifficulty = "Intermediate" | "Advanced";

export type ProblemStatement = {
  id: string;
  slug: string;
  title: string;
  track: ProblemTrack;
  type: ProblemType;
  difficulty: ProblemDifficulty;
  summary: string;
  problem: string;
  objective: string;
  requirements: readonly string[];
  constraints: readonly string[];
  deliverables: readonly string[];
  evaluation: readonly string[];
};

export const problemStatements = rawProblemStatements as readonly ProblemStatement[];
export const problemTracks = ["Drones", "AI Software", "Automation"] as const;

export function getProblemBySlug(slug: string) {
  return problemStatements.find((problem) => problem.slug === slug);
}

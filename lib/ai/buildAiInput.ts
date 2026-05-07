// lib/ai/buildAIInput.ts
import { getTopRiskFiles } from "./helper";
import { buildPRSummary, buildCommitSummary } from "./summaries";

export function buildAIInput({
  riskHeatmap,
  prs,
  commits,
}: {
  riskHeatmap: any[];
  prs: any[];
  commits: any[];
}) {
  return {
    topRiskFiles: getTopRiskFiles(riskHeatmap),
    prSummary: buildPRSummary(prs),
    commitSummary: buildCommitSummary(commits),
  };
}

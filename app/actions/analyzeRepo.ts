// app/actions/analyzeRepo.ts
"use server";

import { fetchRepoData } from "@/lib/github/fetchRepoData";
import { extractFeatures } from "@/lib/features/extractFeatures";
import { calculateRiskHeatmap } from "@/lib/risk/riskEngine";
import { calculatePRScores } from "@/lib/pr/prScore";

export async function analyzeRepo(repo: string) {
  const rawData = await fetchRepoData(repo);

  const features = extractFeatures(rawData);

  const riskHeatmap = calculateRiskHeatmap(features);
  const prScores = calculatePRScores(rawData.prs);

  return {
    riskHeatmap,
    prScores,
    features,
  };
}

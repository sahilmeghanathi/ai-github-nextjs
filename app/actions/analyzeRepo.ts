"use server"
import { fetchRepoData } from "@/lib/github/fetchRepoData";
import { extractFeatures } from "@/lib/features/extractFeatures";
import { calculateRiskHeatmap } from "@/lib/risk/riskEngine";
import { calculatePRScores } from "@/lib/pr/prScore";

type AnalyzeRepoResult = {
  riskHeatmap: ReturnType<typeof calculateRiskHeatmap>;
  prScores: ReturnType<typeof calculatePRScores>;
  features: ReturnType<typeof extractFeatures>;
};

function parseRepo(input: string): string {
  const trimmed = input.trim();

  if (!trimmed.includes("github.com")) return trimmed;

  // Handles:
  // https://github.com/owner/repo
  // https://github.com/owner/repo.git
  // git@github.com:owner/repo.git
  const match = trimmed.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
  if (!match) throw new Error(`Cannot parse GitHub URL: "${trimmed}"`);

  return `${match[1]}/${match[2]}`;
}

export async function analyzeRepo(repo: string): Promise<AnalyzeRepoResult> {
  let normalizedRepo: string;

  try {
    normalizedRepo = parseRepo(repo);
  } catch (err) {
    throw new Error(`Invalid repo input — ${(err as Error).message}`);
  }

  try {
    const rawData = await fetchRepoData(normalizedRepo);

    console.log(`[analyzeRepo] Data fetched for ${normalizedRepo}:`, rawData);
    const features = extractFeatures(rawData);
    const riskHeatmap = calculateRiskHeatmap(features);
    const prScores = calculatePRScores(rawData.prs);

    return { riskHeatmap, prScores, features };
  } catch (err) {
    // Preserve original stack but add repo context for server logs
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`analyzeRepo failed for "${normalizedRepo}": ${message}`);
  }
}
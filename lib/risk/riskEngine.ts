// lib/risk/riskEngine.ts

export type RiskLevel = "low" | "medium" | "high";

export interface RiskFeatures {
  fileFrequency: Record<string, number>;
}

export interface RiskHeatmapEntry {
  file: string;
  score: number;
  level: RiskLevel;
}

export function calculateRiskHeatmap(
  features: RiskFeatures,
): RiskHeatmapEntry[] {
  const entries = Object.entries(features.fileFrequency);

  if (entries.length === 0) return [];

  const max = Math.max(...entries.map(([, value]) => value));

  return entries.map(([file, frequency]) => {
    const normalized = max === 0 ? 0 : frequency / max;
    const score = normalized * 0.4;

    let level: RiskLevel;
    if (score > 0.7) level = "high";
    else if (score > 0.4) level = "medium";
    else level = "low";

    return { file, score, level };
  });
}

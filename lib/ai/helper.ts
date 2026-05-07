// lib/ai/helpers.ts
export function getTopRiskFiles(riskHeatmap: any[], limit = 10) {
  return riskHeatmap
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((file) => ({
      file: file.file,
      score: Number(file.score.toFixed(2)),
      level: file.level,
    }));
}

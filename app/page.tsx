"use client";

import RepoInput from "@/components/shared/RepoInput";
import { useRepoAnalysis } from "@/hooks/useRepoAnalysis";
import RiskHeatmap from "@/components/risk/RiskHeatmap";
import { PrScoresList } from "@/components/pr/PRScoreList";
import { FileFrequency } from "@/components/insights/FileFrequency";

export default function Home() {
  const { runAnalysis, data, loading } = useRepoAnalysis();

  const hasData =
    data &&
    (data.riskHeatmap?.length > 0 ||
      data.prScores?.length > 0 ||
      Object.keys(data.features?.fileFrequency || {}).length > 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/40 to-background">
      {/* 🔥 HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
         AI Github Intelligence for Your Codebase
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Analyze your repository to detect risky files, unstable PRs, and
          high-change hotspots — instantly.
        </p>

        <div className="pt-4">
          <RepoInput onSubmit={runAnalysis} />
        </div>
      </div>

      {/* 🔄 LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">
            Analyzing repository...
          </p>
        </div>
      )}

      {/* 📊 RESULTS */}
      {!loading && hasData && (
        <div className="max-w-6xl mx-auto px-6 pb-12 space-y-6 animate-fade-in">
          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Risk Heatmap */}
            {data.riskHeatmap?.length > 0 && (
              <div className="col-span-1 md:col-span-2 xl:col-span-1 hover:scale-[1.01] transition">
                <RiskHeatmap data={data.riskHeatmap} />
              </div>
            )}

            {/* PR Scores */}
            {data.prScores?.length > 0 && (
              <div className="col-span-1 hover:scale-[1.01] transition">
                <PrScoresList data={data.prScores} />
              </div>
            )}

            {/* File Frequency */}
            {Object.keys(data.features?.fileFrequency || {}).length > 0 && (
              <div className="col-span-1 hover:scale-[1.01] transition">
                <FileFrequency data={data.features.fileFrequency} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 💤 EMPTY STATE */}
      {!loading && !hasData && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
          <div className="text-5xl">📊</div>
          <h3 className="text-lg font-semibold">No analysis yet</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            Enter a GitHub repository URL above to start analyzing code risk and
            insights.
          </p>
        </div>
      )}
    </div>
  );
}
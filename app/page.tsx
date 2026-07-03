"use client";

import RepoInput from "@/components/shared/RepoInput";
import { useRepoAnalysis } from "@/hooks/useRepoAnalysis";
import RiskHeatmap from "@/components/risk/RiskHeatmap";
import { PrScoresList } from "@/components/pr/PRScoreList";
import { FileFrequency } from "@/components/insights/FileFrequency";
import { PredictionsList } from "@/components/ai/predictionList";
import { RefactorPlan } from "@/components/ai/refactorPlan";

export default function Home() {


  const {
    runAnalysis,
    data,
    loading,
    predictionsStream,
    refactorStream,
    predictionsDone,
    refactorDone,
  } = useRepoAnalysis();

  
  const hasData =
    data &&
    (data.riskHeatmap?.length > 0 ||
      data.prScores?.length > 0 ||
      Object.keys(data.features?.fileFrequency || {}).length > 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#060810] text-slate-200">
      {/* Background Orbs */}
      <div className="animate-orb fixed -left-40 -top-40 h-120 w-120 rounded-full bg-emerald-400/10 blur-[90px]" />

      <div className="animate-orb fixed -bottom-32 -right-32 h-100 w-100 rounded-full bg-blue-400/10 blur-[90px] [animation-delay:-5s]" />

      <div className="animate-orb fixed left-[45%] top-1/2 h-72 w-72 rounded-full bg-violet-400/10 blur-[90px] [animation-delay:-2.5s]" />

      {/* Grid */}
      <div className="fixed inset-0 z-0 bg-grid bg-grid pointer-events-none" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-5xl space-y-7 px-6 pb-10 pt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            AI-POWERED REPOSITORY ANALYSIS
          </div>

          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight">
            <span>GitHub</span>

            <br />

            <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          <p className="mx-auto max-w-lg font-mono text-sm leading-7 text-slate-500">
            Detect risky files, unstable PRs, and high-change hotspots.
            <br />
            AI insights streamed in real-time.
          </p>

          <div className="mx-auto max-w-xl pt-1">
            <RepoInput onSubmit={runAnalysis} />
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-6 py-28">
            <div className="relative h-16 w-16">
              <div className="animate-spinCW absolute inset-0 rounded-full border-2 border-white/10 border-t-emerald-400" />

              <div className="animate-spinCCW absolute inset-2 rounded-full border-2 border-white/10 border-t-blue-400" />

              <div className="absolute inset-5.5 rounded-full bg-emerald-400/40 shadow-[0_0_16px_#00ffb2]" />
            </div>

            <div className="space-y-1 text-center">
              <p className="font-mono text-xs font-semibold tracking-widest text-emerald-400">
                SCANNING REPOSITORY
              </p>

              <p className="font-mono text-xs text-slate-500">
                Analyzing commits, PRs, and file change patterns…
              </p>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {!loading && hasData && (
          <section className="animate-fadeUp mx-auto max-w-6xl space-y-5 px-6 pb-16">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.riskHeatmap?.length > 0 && (
                <div className="col-span-1 md:col-span-2 xl:col-span-1">
                  <RiskHeatmap data={data.riskHeatmap} />
                </div>
              )}

              {data.prScores?.length > 0 && (
                <PrScoresList data={data.prScores} />
              )}

              {Object.keys(data.features?.fileFrequency || {}).length > 0 && (
                <FileFrequency data={data.features.fileFrequency} />
              )}
            </div>

            {(predictionsStream || refactorStream) && (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <PredictionsList
                  stream={predictionsStream}
                  isDone={predictionsDone}
                />

                <RefactorPlan stream={refactorStream} isDone={refactorDone} />
              </div>
            )}
          </section>
        )}

        {/* Empty */}
        {!loading && !hasData && (
          <section className="flex flex-col items-center justify-center space-y-5 py-32 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0e18]/90 text-4xl shadow-[0_0_40px_rgba(0,255,178,0.04)] backdrop-blur-2xl">
              📊
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-bold">
                No Analysis Yet
              </h3>

              <p className="font-mono text-xs text-slate-500">
                Enter a GitHub repository URL above to begin scanning.
              </p>
            </div>

            <div className="flex gap-6 pt-4">
              {[
                { icon: "🔥", label: "Risk Heatmap" },
                { icon: "🤖", label: "AI Predictions" },
                { icon: "🛠️", label: "Refactor Plan" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0a0e18]/90 text-2xl backdrop-blur-xl">
                    {icon}
                  </div>

                  <span className="font-mono text-[10px] text-slate-500">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

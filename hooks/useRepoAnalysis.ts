"use client";

import { analyzeRepo } from "@/app/actions/analyzeRepo";
import { useAsyncResource } from "./useAsyncResource";
import { useStream } from "./useStream";

export function useRepoAnalysis() {
  const resource = useAsyncResource<any>();
  const predictionsStream = useStream();
  const refactorStream = useStream();

  const runAnalysis = async (repo: string) => {
    resource.reset();
    predictionsStream.reset();
    refactorStream.reset();

    try {
      const result = await resource.fetch(() => analyzeRepo(repo));

      if (result) {
        const streamBody = {
          riskHeatmap: result.riskHeatmap,
          prs: result.prScores,
          commits: [],
        };

        await Promise.all([
          predictionsStream.fetch("/api/predict", streamBody),
          refactorStream.fetch("/api/refactor", streamBody),
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    loading: resource.isLoading,
    data: resource.data,
    predictionsStream: predictionsStream.stream,
    refactorStream: refactorStream.stream,
    predictionsDone: predictionsStream.isDone,
    refactorDone: refactorStream.isDone,
    runAnalysis,
  };
}
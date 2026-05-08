"use client";

import { analyzeRepo } from "@/app/actions/analyzeRepo";
import { readStream } from "@/lib/ai/streamReader";
import { useState } from "react";

export function useRepoAnalysis() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [predictionsStream, setPredictionsStream] = useState("");
  const [refactorStream, setRefactorStream] = useState("");
  const [predictionsDone, setPredictionsDone] = useState(false);
  const [refactorDone, setRefactorDone] = useState(false);

  const runAnalysis = async (repo: string) => {
    setLoading(true);
    setPredictionsStream("");
    setRefactorStream("");
    setPredictionsDone(false);
    setRefactorDone(false);
    setData(null);

    try {
      const result = await analyzeRepo(repo);
      setData(result);
      setLoading(false);

      const streamBody = {
        riskHeatmap: result.riskHeatmap,
        prs: result.prScores,
        commits: [],
      };

      await Promise.all([
        readStream("/api/predict", streamBody, setPredictionsStream).then(() =>
          setPredictionsDone(true),
        ), 
        readStream("/api/refactor", streamBody, setRefactorStream).then(() =>
          setRefactorDone(true),
        ), 
      ]);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  console.log("refactorStream:", refactorStream);

  return {
    loading,
    data,
    predictionsStream,
    refactorStream,
    predictionsDone, 
    refactorDone, 
    runAnalysis,
  };
}
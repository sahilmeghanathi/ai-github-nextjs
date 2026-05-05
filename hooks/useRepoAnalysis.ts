// hooks/useRepoAnalysis.ts
"use client";

import { analyzeRepo } from "@/app/actions/analyzeRepo";
import { useState } from "react";

export function useRepoAnalysis() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const runAnalysis = async (repo: string) => {
    setLoading(true);
    try {
      const result = await analyzeRepo(repo);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, runAnalysis };
}

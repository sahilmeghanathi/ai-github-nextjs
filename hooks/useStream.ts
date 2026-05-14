"use client";

import { readStream } from "@/lib/ai/streamReader";
import { useState } from "react";

export interface UseStreamOptions {
  onChunk?: (text: string) => void;
}

export function useStream() {
  const [stream, setStream] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async (
    endpoint: string,
    body: object,
    options?: UseStreamOptions,
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    setStream("");
    setIsDone(false);

    try {
      const result = await readStream(endpoint, body, (text: string) => {
        setStream(text);
        options?.onChunk?.(text);
      });
      setIsDone(true);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setIsDone(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStream("");
    setIsDone(false);
    setError(null);
    setIsLoading(false);
  };

  return {
    stream,
    isDone,
    error,
    isLoading,
    fetch,
    reset,
  };
}

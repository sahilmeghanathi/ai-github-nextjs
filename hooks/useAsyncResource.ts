"use client";

import { useState } from "react";

export interface UseAsyncResourceOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useAsyncResource<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async (
    asyncFn: () => Promise<T>,
    options?: UseAsyncResourceOptions<T>,
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await asyncFn();
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    data,
    error,
    isLoading,
    fetch,
    reset,
  };
}

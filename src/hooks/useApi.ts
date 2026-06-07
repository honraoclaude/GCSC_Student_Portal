/**
 * Fetch wrapper hook with error handling, loading state, and refetch capability
 * Automatically fetches data on mount and provides utilities for manual refetch
 */

import { useState, useEffect, useCallback } from 'react';

export interface UseApiOptions<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  skip?: boolean; // Skip execution
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (newData?: T) => void;
  refetch: () => Promise<void>;
}

export function useApi<T = any>(
  options: UseApiOptions<T>
): UseApiReturn<T> {
  const {
    url,
    method = 'GET',
    body,
    headers,
    onSuccess,
    onError,
    skip = false,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<Error | null>(null);

  // Perform the fetch
  const execute = useCallback(async () => {
    if (skip) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.statusText} (${response.status})`
        );
      }

      const responseData = await response.json();

      // Handle both { data: T } and direct T responses
      const result = responseData.data !== undefined ? responseData.data : responseData;

      setData(result as T);
      onSuccess?.(result as T);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers, onSuccess, onError, skip]);

  // Fetch on mount
  useEffect(() => {
    execute();
  }, [execute]);

  // Manual refetch
  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  // Mutate local data for optimistic updates
  const mutate = useCallback((newData?: T) => {
    if (newData !== undefined) {
      setData(newData);
    }
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    refetch,
  };
}

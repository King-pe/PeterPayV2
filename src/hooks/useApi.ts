import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiRequestError } from '../lib/apiClient';

// =============================================
// useQuery — for GET requests (data fetching)
// =============================================

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiRequestError | null;
  refetch: () => Promise<void>;
}

interface UseQueryOptions {
  // Skip fetching until enabled is true (useful when waiting for params, e.g. an id).
  enabled?: boolean;
}

export function useQuery<T>(
// Stable key for dependency-array purposes (e.g. ['payments', page, status])
key: ReadonlyArray<unknown>,
fetcher: () => Promise<T>,
options: UseQueryOptions = {})
: UseQueryResult<T> {
  const { enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<ApiRequestError | null>(null);

  // Hold the latest fetcher in a ref so the effect doesn't re-fire on every render.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current();
      setData(result);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err);
      } else {
        setError(
          new ApiRequestError(0, {
            code: 'network_error',
            message: (err as Error).message || 'Network error'
          })
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...key]);

  return { data, loading, error, refetch: run };
}

// =============================================
// useMutation — for POST/PUT/PATCH/DELETE
// =============================================

interface UseMutationResult<TArgs, TResult> {
  mutate: (args: TArgs) => Promise<TResult>;
  data: TResult | null;
  loading: boolean;
  error: ApiRequestError | null;
  reset: () => void;
}

export function useMutation<TArgs, TResult>(
mutator: (args: TArgs) => Promise<TResult>)
: UseMutationResult<TArgs, TResult> {
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiRequestError | null>(null);

  const mutatorRef = useRef(mutator);
  mutatorRef.current = mutator;

  const mutate = useCallback(async (args: TArgs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await mutatorRef.current(args);
      setData(result);
      return result;
    } catch (err) {
      const apiErr =
      err instanceof ApiRequestError ?
      err :
      new ApiRequestError(0, {
        code: 'network_error',
        message: (err as Error).message || 'Network error'
      });
      setError(apiErr);
      throw apiErr;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, data, loading, error, reset };
}
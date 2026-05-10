import { useState, useCallback } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Retry mechanism for failed requests
  const fnWithRetry = async (maxRetries = 3, ...args) => {
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        setLoading(true);
        setError(null);
        const response = await cb(...args);
        setData(response);
        setError(null);
        setLoading(false);
        return response;
      } catch (error) {
        lastError = error;
        // Wait before retrying with exponential backoff
        if (attempt < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }
    setError(lastError);
    setLoading(false);
    toast.error(`Request failed after ${maxRetries} retries: ${lastError.message}`);
  };

  return { data, loading, error, fn, fnWithRetry, setData };
};

export default useFetch;

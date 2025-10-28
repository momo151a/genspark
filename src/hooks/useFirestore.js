import { useState, useEffect } from 'react';

/**
 * Custom hook for Firestore real-time subscriptions
 */
export function useFirestore(subscribeFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let unsubscribe = null;

    try {
      // Subscribe to Firestore updates
      unsubscribe = subscribeFunction((newData) => {
        setData(newData);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, dependencies);

  return { data, loading, error };
}

/**
 * Custom hook for one-time Firestore fetches
 */
export function useFirestoreFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: fetchFunction };
}

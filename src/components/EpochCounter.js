import React, { useState, useEffect } from 'react';

const START_EPOCH = 269;
// API route within our own Vercel project
const API_ENDPOINT = '/api/getEpochInfo';

// Formatting function (keep as is)
function formatCurrencyValue(value) {
    if (value === null || value === undefined) { return '...'; }
    if (value >= 1e9) { return `$${(value / 1e9).toFixed(1)}B`; }
    if (value >= 1e6) { return `$${(value / 1e6).toFixed(1)}M`; }
    if (value >= 1e3) { return `$${(value / 1e3).toFixed(1)}K`; }
    return `$${value.toFixed(0)}`;
}

export default function EpochCounter() {
  const [epochsOperated, setEpochsOperated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('EpochCounter: useEffect running.');

    const fetchData = async () => {
      console.log('EpochCounter: fetchData called.');
      setIsLoading(true);
      setError(null);
      setEpochsOperated(null);

      console.log('EpochCounter: Attempting to fetch from internal API:', API_ENDPOINT);

      try {
        // Fetch from our own backend API route
        // Use POST method as our API handler expects it for the RPC call logic
        const response = await fetch(API_ENDPOINT, { method: 'POST' });

        console.log('EpochCounter: API Fetch response status:', response.status, response.statusText);

        if (!response.ok) {
          let errorBody = `Status: ${response.status}`;
          try { errorBody = await response.text(); } catch (_) { /* Ignore */ }
          throw new Error(`Failed to fetch epoch info: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        console.log('EpochCounter: API Data received:', data);

        if (data.error || data.currentEpoch === undefined) {
          console.error('EpochCounter: Error in API response:', data.error || 'Invalid data');
          throw new Error(data.error || 'Failed to parse epoch info from API response.');
        }

        const currentEpoch = data.currentEpoch;
        const operated = currentEpoch - START_EPOCH;
        console.log(`EpochCounter: Calculation: ${currentEpoch} - ${START_EPOCH} = ${operated}`);
        setEpochsOperated(operated);

      } catch (err) {
        console.error("EpochCounter: Error caught in fetchData:", err);
        setError(err.message);
      } finally {
        console.log('EpochCounter: Fetch attempt finished, calling setIsLoading(false).');
        setIsLoading(false);
      }
    };

    fetchData();

  }, []); // Run only once on mount

  console.log('EpochCounter: Rendering component state:', { isLoading, error, epochsOperated });

  if (isLoading) { return <>...</>; }
  if (error || epochsOperated === null || epochsOperated < 0) {
     console.error("EpochCounter Error State:", error);
     return <span title={error || 'Calculation error'}>Error</span>;
  }
  return <>{epochsOperated}</>;
}
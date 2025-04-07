import React, { useState, useEffect } from 'react';

const START_EPOCH = 269;
// Using a public Solana RPC endpoint
const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';
// You could replace this with your own preferred RPC endpoint

export default function EpochCounter() {
  const [epochsOperated, setEpochsOperated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpoch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(SOLANA_RPC_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getEpochInfo',
          }),
        });

        if (!response.ok) {
          throw new Error(`Solana RPC Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error || !data.result || data.result.epoch === undefined) {
          console.error('Error in RPC response:', data.error || 'Invalid data');
          throw new Error('Failed to parse epoch info from RPC response.');
        }

        const currentEpoch = data.result.epoch;
        const operated = currentEpoch - START_EPOCH;
        setEpochsOperated(operated);

      } catch (err) {
        console.error("Error fetching Solana epoch:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpoch();
    // Optional: Refresh periodically (e.g., every hour)
    // const intervalId = setInterval(fetchEpoch, 60 * 60 * 1000);
    // return () => clearInterval(intervalId);

  }, []); // Runs once on mount

  if (isLoading) {
    return <>...</>; // Loading indicator
  }

  if (error || epochsOperated === null || epochsOperated < 0) {
    // Fallback or error display - you might want just a static number
    // return <span title={error || 'Calculation error'}>Error</span>;
    return <>many</>; // Simple fallback text
  }

  // Render the calculated number of epochs
  return <>{epochsOperated}</>;
}
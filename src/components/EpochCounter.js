import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const START_EPOCH = 280;
const HELIUS_RPC_BASE_URL = 'https://mainnet.helius-rpc.com/';

// Function to format large numbers (e.g., 28000000 -> $28M)
// (Make sure this function exists and is correct if you copied it before)
function formatCurrencyValue(value) {
    if (value === null || value === undefined) { return '...'; }
    if (value >= 1e9) { return `$${(value / 1e9).toFixed(1)}B`; }
    if (value >= 1e6) { return `$${(value / 1e6).toFixed(1)}M`; }
    if (value >= 1e3) { return `$${(value / 1e3).toFixed(1)}K`; }
    return `$${value.toFixed(0)}`;
}

export default function EpochCounter() {
  const { siteConfig } = useDocusaurusContext();
  // Ensure customFields and the specific key exist before trying to access
  const HELIUS_API_KEY = siteConfig?.customFields?.heliusApiKey;

  const [epochsOperated, setEpochsOperated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('EpochCounter: useEffect running.'); // Log: Hook start

    const fetchData = async () => {
      console.log('EpochCounter: fetchData called.'); // Log: Function start
      // Reset state on new fetch attempt
      setIsLoading(true);
      setError(null);
      setEpochsOperated(null);


      if (!HELIUS_API_KEY) {
        const errorMsg = 'Helius API Key missing in siteConfig.customFields.heliusApiKey';
        console.error('EpochCounter:', errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      // Construct the full URL
      const rpcUrl = `${HELIUS_RPC_BASE_URL}?api-key=${HELIUS_API_KEY}`;

      // *** ADDED CONSOLE LOG FOR URL ***
      console.log('EpochCounter: EXACT URL being fetched:', rpcUrl);

      try {
        const response = await fetch(rpcUrl, { // Use the constructed URL
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
        console.log('EpochCounter: Fetch response status:', response.status, response.statusText); // Log: Response status

        if (!response.ok) {
          let errorBody = `Status: ${response.status}`;
          try { errorBody = await response.text(); } catch (_) { /* Ignore supplemental error */ }
          throw new Error(`Solana RPC Error: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        console.log('EpochCounter: RPC Data received:', data); // Log: Received data

        if (data.error || !data.result || data.result.epoch === undefined) {
          console.error('EpochCounter: Error in RPC response:', data.error || 'Invalid data');
          throw new Error('Failed to parse epoch info from RPC response.');
        }

        const currentEpoch = data.result.epoch;
        const operated = currentEpoch - START_EPOCH;
        console.log(`EpochCounter: Calculation: ${currentEpoch} - ${START_EPOCH} = ${operated}`); // Log: Calculation
        setEpochsOperated(operated);

      } catch (err) {
        console.error("EpochCounter: Error caught in fetchData:", err); // Log: Error caught
        setError(err.message);
      } finally {
        console.log('EpochCounter: Fetch attempt finished, calling setIsLoading(false).'); // Log: Finally block
        setIsLoading(false);
      }
    };

    fetchData();

  }, [HELIUS_API_KEY]); // Dependency array includes API key

  console.log('EpochCounter: Rendering component state:', { isLoading, error, epochsOperated }); // Log: Render state

  if (isLoading) {
    return <>...</>;
  }

  if (error || epochsOperated === null || epochsOperated < 0) {
     console.error("EpochCounter Error State:", error); // Log error to console for debugging
     return <span title={error || 'Calculation error'}>Error</span>; // Show error tooltip
  }

  return <>{epochsOperated}</>;
}
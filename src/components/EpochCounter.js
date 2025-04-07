import React, { useState, useEffect } from 'react';
// REMOVE: import { useDocusaurusContext } from '@docusaurus/useDocusaurusContext';

const START_EPOCH = 269;
const HELIUS_RPC_BASE_URL = 'https://mainnet.helius-rpc.com/';
// *** Read the API key from environment variables AGAIN ***
const HELIUS_API_KEY = process.env.DOCUSAURUS_HELIUS_API_KEY;

// Formatting function (keep as is)
function formatCurrencyValue(value) {
    if (value === null || value === undefined) { return '...'; }
    if (value >= 1e9) { return `$${(value / 1e9).toFixed(1)}B`; }
    if (value >= 1e6) { return `$${(value / 1e6).toFixed(1)}M`; }
    if (value >= 1e3) { return `$${(value / 1e3).toFixed(1)}K`; }
    return `$${value.toFixed(0)}`;
}


export default function EpochCounter() {
  // REMOVE: const { siteConfig } = useDocusaurusContext();
  // REMOVE: const HELIUS_API_KEY = siteConfig?.customFields?.heliusApiKey;

  const [epochsOperated, setEpochsOperated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We'll read HELIUS_API_KEY directly from the top scope now
    console.log('EpochCounter: useEffect running.');

    const fetchData = async () => {
      console.log('EpochCounter: fetchData called.');
      setIsLoading(true);
      setError(null);
      setEpochsOperated(null);

      // *** Check key from process.env (via constant) ***
      if (!HELIUS_API_KEY) {
        const errorMsg = 'Helius API Key environment variable not found (DOCUSAURUS_HELIUS_API_KEY)';
        console.error('EpochCounter:', errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      // Construct the full URL
      const rpcUrl = `<span class="math-inline">\{HELIUS\_RPC\_BASE\_URL\}?api\-key\=</span>{HELIUS_API_KEY}`;
      console.log('EpochCounter: EXACT URL being fetched:', rpcUrl);

      try {
        const response = await fetch(rpcUrl, { /* ... fetch options ... */ });
        console.log('EpochCounter: Fetch response status:', response.status, response.statusText);
        if (!response.ok) { /* ... throw error ... */ }
        const data = await response.json();
        console.log('EpochCounter: RPC Data received:', data);
        if (data.error || !data.result || data.result.epoch === undefined) { /* ... throw error ... */ }
        const currentEpoch = data.result.epoch;
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

  // }, [HELIUS_API_KEY]); // Dependency no longer needed as it's a top-level const now
  }, []); // Run only once on mount

  console.log('EpochCounter: Rendering component state:', { isLoading, error, epochsOperated });

  if (isLoading) { return <>...</>; }
  if (error || epochsOperated === null || epochsOperated < 0) {
     console.error("EpochCounter Error State:", error);
     return <span title={error || 'Calculation error'}>Error</span>;
  }
  return <>{epochsOperated}</>;
}
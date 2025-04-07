import React, { useState, useEffect } from 'react';
import { useDocusaurusContext } from '@docusaurus/useDocusaurusContext'; // Import context hook

const START_EPOCH = 269;
const HELIUS_RPC_BASE_URL = 'https://mainnet.helius-rpc.com/';
// REMOVE: const HELIUS_API_KEY = process.env.DOCUSAURUS_HELIUS_API_KEY;

// Formatting function (keep as is)
function formatCurrencyValue(value) { /* ... */ }

export default function EpochCounter() {
  // *** Get siteConfig via context hook ***
  const { siteConfig } = useDocusaurusContext();
  // *** Get key from customFields ***
  const HELIUS_API_KEY = siteConfig?.customFields?.heliusApiKey;

  const [epochsOperated, setEpochsOperated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('EpochCounter: useEffect running.'); // Keep logs

    const fetchData = async () => {
      console.log('EpochCounter: fetchData called.');
      setIsLoading(true);
      setError(null);

      // *** Check key from customFields ***
      if (!HELIUS_API_KEY) {
        const errorMsg = 'Helius API Key missing in siteConfig.customFields.heliusApiKey';
        console.error('EpochCounter:', errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }
      // *** Construct URL using key from customFields ***
      const rpcUrl = `<span class="math-inline">\{HELIUS\_RPC\_BASE\_URL\}?api\-key\=</span>{HELIUS_API_KEY}`;
      console.log('EpochCounter: Attempting to fetch from', rpcUrl);

      // ... rest of the try/catch/finally block remains the same ...
      try {
        const response = await fetch(rpcUrl, { /* ... */ });
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

  }, [HELIUS_API_KEY]); // Add key as dependency to refetch if it changes (though it won't here)

  console.log('EpochCounter: Rendering component state:', { isLoading, error, epochsOperated });

  // ... rest of the return logic remains the same ...
  if (isLoading) { return <>...</>; }
  if (error || epochsOperated === null || epochsOperated < 0) {
     console.error("EpochCounter Error State:", error);
     return <span title={error || 'Calculation error'}>Error</span>;
  }
  return <>{epochsOperated}</>;
}
import React, { useState, useEffect } from 'react';

const START_EPOCH = 269;
const HELIUS_RPC_BASE_URL = 'https://mainnet.helius-rpc.com/';
const HELIUS_API_KEY = process.env.DOCUSAURUS_HELIUS_API_KEY;

// Formatting function (keep as is)
function formatCurrencyValue(value) { /* ... */ }

export default function EpochCounter() {
  const [epochsOperated, setEpochsOperated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('EpochCounter: useEffect running.'); // Log: Hook start

    const fetchData = async () => {
      console.log('EpochCounter: fetchData called.'); // Log: Function start
      setIsLoading(true); // Set loading true initially
      setError(null);

      if (!HELIUS_API_KEY) {
        const errorMsg = 'Helius API Key is missing (DOCUSAURUS_HELIUS_API_KEY)';
        console.error('EpochCounter:', errorMsg);
        setError(errorMsg);
        setIsLoading(false); // Set loading false on config error
        return;
      }
      const rpcUrl = `<span class="math-inline">\{HELIUS\_RPC\_BASE\_URL\}?api\-key\=</span>{HELIUS_API_KEY}`;
      console.log('EpochCounter: Attempting to fetch from', rpcUrl); // Log: Before fetch

      try {
        const response = await fetch(rpcUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getEpochInfo' }),
        });
        console.log('EpochCounter: Fetch response status:', response.status, response.statusText); // Log: Response status

        if (!response.ok) {
          let errorBody = `Status: ${response.status}`;
          try { errorBody = await response.text(); } catch (_) {}
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

  }, []); // Runs once on mount

  console.log('EpochCounter: Rendering component state:', { isLoading, error, epochsOperated }); // Log: Render state

  if (isLoading) {
    return <>...</>;
  }

  if (error || epochsOperated === null || epochsOperated < 0) {
     console.error("EpochCounter Error State:", error);
     return <span title={error || 'Calculation error'}>Error</span>;
  }

  return <>{epochsOperated}</>;
}
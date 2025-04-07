import React, { useState, useEffect } from 'react';

const START_EPOCH = 269;
// Base Helius URL without the key
const HELIUS_RPC_BASE_URL = 'https://mainnet.helius-rpc.com/';
// Read the API key from environment variables
const HELIUS_API_KEY = process.env.DOCUSAURUS_HELIUS_API_KEY;

// Function to format large numbers (e.g., 28000000 -> $28M)
function formatCurrencyValue(value) {
    // ... (keep the formatting function as it was) ...
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
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
  
        // Check if API key is configured
        if (!HELIUS_API_KEY) {
          setError('Helius API Key is missing. Configure DOCUSAURUS_HELIUS_API_KEY.');
          setIsLoading(false);
          console.error('Helius API Key environment variable not set.');
          return; // Stop fetching if key is missing
        }
  
        // Construct the full URL
        const rpcUrl = `<span class="math-inline">\{HELIUS\_RPC\_BASE\_URL\}?api\-key\=</span>{HELIUS_API_KEY}`;
  
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
  
          if (!response.ok) {
            // Try to get more info from response if possible
            let errorBody = `Status: ${response.status}`;
            try { errorBody = await response.text(); } catch (_) {}
            throw new Error(`Solana RPC Error: ${response.statusText} - ${errorBody}`);
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
  
      fetchData();
  
    }, []);
  
    if (isLoading) {
      return <>...</>;
    }
  
    if (error || epochsOperated === null || epochsOperated < 0) {
       // Display error or fallback
       console.error("EpochCounter Error:", error); // Log error to console for debugging
       return <span title={error || 'Calculation error'}>Error</span>; // Show error tooltip
       // Or return <>many</>;
    }
  
    return <>{epochsOperated}</>;
  }
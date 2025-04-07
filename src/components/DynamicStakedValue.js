import React, { useState, useEffect } from 'react';

// Function to format large numbers (e.g., 28000000 -> $28M)
function formatCurrencyValue(value) {
  if (value === null || value === undefined) {
    return '...'; // Return loading/placeholder if value not ready
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export default function DynamicStakedValue() {
  const [usdValue, setUsdValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      let solPrice = null;
      let stakedSolAmount = null; // Placeholder for your validator's stake

      try {
        // --- 1. Fetch SOL Price from CoinGecko ---
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        if (!priceResponse.ok) {
          throw new Error(`CoinGecko API Error: ${priceResponse.statusText}`);
        }
        const priceData = await priceResponse.json();
        solPrice = priceData?.solana?.usd;
        if (solPrice === undefined) {
          throw new Error('Could not parse SOL price from CoinGecko response');
        }

        // --- 2. Fetch Staked SOL Amount (NEEDS IMPLEMENTATION) ---
        // TODO: Replace this with the actual API call to get your validator's staked SOL
        // Example using a hypothetical API:
        // const stakeResponse = await fetch('API_ENDPOINT_FOR_YOUR_VALIDATOR_STAKE');
        // if (!stakeResponse.ok) { throw new Error(...) }
        // const stakeData = await stakeResponse.json();
        // stakedSolAmount = stakeData?.totalSolStaked; // Adjust based on actual API response

        // --- Placeholder ---
        // Remove this placeholder when you implement the actual fetch
         // Using the ~205k SOL from text as a temporary placeholder value
         // * 1e9 because stake is often returned in Lamports
         // Adjust this multiplier if your API returns SOL directly
        // stakedSolAmount = (205000 * 1e9) / 1e9; // Example in SOL directly for calculation
         stakedSolAmount = 205000; // Placeholder using the value from text


        if (stakedSolAmount === null) {
           throw new Error('Could not retrieve staked SOL amount');
        }

        // --- 3. Calculate USD Value ---
        const calculatedValue = stakedSolAmount * solPrice;
        setUsdValue(calculatedValue);

      } catch (err) {
        console.error("Error fetching dynamic staked value:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
     // Optional: Re-fetch data every N minutes?
     // const intervalId = setInterval(fetchData, 5 * 60 * 1000); // e.g., every 5 minutes
     // return () => clearInterval(intervalId); // Cleanup interval on unmount

  }, []); // Empty dependency array means this runs once on component mount

  if (isLoading) {
    return <>...</>; // Or a spinner component
  }

  if (error) {
    // return <span title={error}>Error</span>; // Or display the static value as fallback
    return <>~$28M USD</>; // Fallback static value on error
  }

  // Render the dynamically calculated and formatted value
  return <>{formatCurrencyValue(usdValue)} USD</>;
}
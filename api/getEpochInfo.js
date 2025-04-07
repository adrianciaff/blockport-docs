// File: api/getEpochInfo.js

// Use require for Node.js environment if using CommonJS, or import if project uses ES Modules
// Assuming CommonJS for basic Vercel Node functions unless package.json specifies "type": "module"
// const fetch = require('node-fetch'); // Use node-fetch or built-in fetch if Node version supports it

const HELIUS_RPC_BASE_URL = 'https://mainnet.helius-rpc.com/';
// This reads the key securely from Vercel Environment Variables on the backend
const HELIUS_API_KEY = process.env.HELIUS_API_KEY; // Use a non-prefixed name for backend

export default async function handler(request, response) {
  // Set CORS headers - adjust origin if needed, * is permissive
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST requests for the actual RPC call
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: `Method ${request.method} Not Allowed` });
  }

  if (!HELIUS_API_KEY) {
    console.error("API Function Error: HELIUS_API_KEY environment variable not set.");
    return response.status(500).json({ error: 'API key configuration error.' });
  }

  const rpcUrl = `${HELIUS_RPC_BASE_URL}?api-key=${HELIUS_API_KEY}`;

  try {
    const heliusResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Pass through the body from the client, or use a fixed body if preferred
      // body: request.body // If client sends the body
      body: JSON.stringify({ // Send the specific request body from the function
        jsonrpc: '2.0',
        id: 1,
        method: 'getEpochInfo',
      }),
    });

    const data = await heliusResponse.json();

    if (!heliusResponse.ok || data.error) {
      console.error('Helius RPC Error Response:', data);
      // Don't leak detailed errors potentially containing key info
      return response.status(heliusResponse.status || 500).json({ error: 'Failed to fetch epoch info from upstream API.' });
    }

    if (data.result && data.result.epoch !== undefined) {
      // Send successful response back to the client component
      return response.status(200).json({ currentEpoch: data.result.epoch });
    } else {
      console.error('Invalid data structure received from Helius:', data);
      return response.status(500).json({ error: 'Invalid data received from upstream API.' });
    }

  } catch (error) {
    console.error('Error in API function:', error);
    return response.status(500).json({ error: 'Internal server error fetching epoch info.' });
  }
}
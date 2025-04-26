// KV binding
const COUNTER = 'counter';
const LAST_RESET = 'last_reset';

// UTC+8 reset time (8:00 AM UTC+8)
const RESET_HOUR = 0; // 8:00 AM UTC+8 is 0:00 UTC

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function handleRequest(request, env) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // Check if we need to reset the counter
  const now = new Date();
  const lastReset = await env.GOON_GUESSR_KV.get(LAST_RESET);
  const lastResetDate = lastReset ? new Date(lastReset) : null;
  
  // Reset if it's a new day in UTC+8
  const shouldReset = !lastResetDate || 
    (now.getUTCHours() >= RESET_HOUR && 
     (now.getUTCDate() !== lastResetDate.getUTCDate() || 
      now.getUTCMonth() !== lastResetDate.getUTCMonth() || 
      now.getUTCFullYear() !== lastResetDate.getUTCFullYear()));

  if (shouldReset) {
    // Delete previous day's data
    await env.GOON_GUESSR_KV.delete(COUNTER);
    await env.GOON_GUESSR_KV.delete(LAST_RESET);
    
    // Set new counter and reset time
    await env.GOON_GUESSR_KV.put(COUNTER, '0');
    await env.GOON_GUESSR_KV.put(LAST_RESET, now.toISOString());
  }

  if (path === '/increment') {
    // Increment counter
    const currentCount = parseInt(await env.GOON_GUESSR_KV.get(COUNTER) || '0');
    await env.GOON_GUESSR_KV.put(COUNTER, (currentCount + 1).toString());
    
    return new Response(JSON.stringify({ count: currentCount + 1 }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } else if (path === '/count') {
    // Get current count
    const count = await env.GOON_GUESSR_KV.get(COUNTER) || '0';
    
    return new Response(JSON.stringify({ count: parseInt(count) }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  return new Response('Not found', { 
    status: 404,
    headers: corsHeaders,
  });
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },
}; 
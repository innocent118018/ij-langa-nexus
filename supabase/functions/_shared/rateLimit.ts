import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // milliseconds
}

export async function checkRateLimit(
  req: Request,
  functionName: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Get client identifier (IP address)
  const clientIP = req.headers.get('x-forwarded-for') || 
                   req.headers.get('x-real-ip') || 
                   'unknown';
  
  const rateLimitKey = `${functionName}:${clientIP}`;
  const now = new Date();
  const windowStart = new Date(now.getTime() - config.windowMs);

  try {
    // Get or create rate limit record
    const { data: rateLimit, error: fetchError } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('key', rateLimitKey)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Rate limit check error:', fetchError);
      // On error, allow the request (fail open)
      return { allowed: true, remaining: config.maxRequests, resetAt: now };
    }

    if (!rateLimit) {
      // First request in window - create new record
      await supabase.from('rate_limits').insert({
        key: rateLimitKey,
        count: 1,
        window_start: now
      });
      
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetAt: new Date(now.getTime() + config.windowMs)
      };
    }

    // Check if window has expired
    const windowStartTime = new Date(rateLimit.window_start).getTime();
    if (now.getTime() - windowStartTime > config.windowMs) {
      // Window expired - reset counter
      await supabase
        .from('rate_limits')
        .update({
          count: 1,
          window_start: now,
          updated_at: now
        })
        .eq('key', rateLimitKey);
      
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetAt: new Date(now.getTime() + config.windowMs)
      };
    }

    // Window still active - check count
    if (rateLimit.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(windowStartTime + config.windowMs)
      };
    }

    // Increment counter
    await supabase
      .from('rate_limits')
      .update({
        count: rateLimit.count + 1,
        updated_at: now
      })
      .eq('key', rateLimitKey);

    return {
      allowed: true,
      remaining: config.maxRequests - rateLimit.count - 1,
      resetAt: new Date(windowStartTime + config.windowMs)
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // On error, allow the request (fail open)
    return { allowed: true, remaining: config.maxRequests, resetAt: now };
  }
}

export function rateLimitResponse(resetAt: Date) {
  const retryAfter = Math.ceil((resetAt.getTime() - Date.now()) / 1000);
  
  return new Response(
    JSON.stringify({
      error: 'Too many requests. Please try again later.',
      retryAfter
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Reset': resetAt.toISOString()
      }
    }
  );
}

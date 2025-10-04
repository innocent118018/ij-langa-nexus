import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyOTPRequest {
  phone: string;
  code: string;
  username?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, code, username }: VerifyOTPRequest = await req.json();
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify OTP
    const { data: otpData, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('phone', phone)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (otpError || !otpData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired OTP' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Check if user exists
    let userData = null;
    if (username) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      userData = data;
    }

    // Delete used OTP
    await supabase
      .from('otp_codes')
      .delete()
      .eq('phone', phone)
      .eq('code', code);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP verified successfully',
        userExists: !!userData,
        userId: userData?.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in verify-otp function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
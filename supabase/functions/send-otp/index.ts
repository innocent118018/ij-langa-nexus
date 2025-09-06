import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OTPRequest {
  phone: string;
  method: 'sms' | 'whatsapp';
  username?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, method, username }: OTPRequest = await req.json();
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store OTP in database (expires in 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const { error: dbError } = await supabase
      .from('otp_codes')
      .upsert({
        phone,
        code: otp,
        expires_at: expiresAt.toISOString(),
        username: username || null,
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store OTP');
    }

    if (method === 'sms') {
      // Send SMS via BulkSMS
      const bulkSmsToken = Deno.env.get('BULKSMS_API_TOKEN');
      if (!bulkSmsToken) {
        throw new Error('BulkSMS API token not configured');
      }

      const message = `Your IJ Langa verification code is: ${otp}. Valid for 10 minutes.`;
      
      const smsResponse = await fetch('https://api.bulksms.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(bulkSmsToken + ':')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
          to: phone,
          body: message,
          from: 'IJ Langa'
        }])
      });

      if (!smsResponse.ok) {
        const errorText = await smsResponse.text();
        console.error('BulkSMS error:', errorText);
        throw new Error('Failed to send SMS');
      }

      console.log('SMS sent successfully to:', phone);
    } else if (method === 'whatsapp') {
      // For WhatsApp, you would integrate with WhatsApp Business API
      // This is a placeholder - implement with your WhatsApp provider
      console.log('WhatsApp OTP would be sent to:', phone, 'with code:', otp);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-otp function:', error);
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
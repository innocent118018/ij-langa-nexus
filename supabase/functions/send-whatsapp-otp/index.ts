import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OTPRequest {
  phone: string;
  method: 'whatsapp' | 'sms';
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

    if (method === 'whatsapp') {
      await sendWhatsAppOTP(phone, otp);
    } else {
      // Fallback to SMS using existing send-otp function
      const { error: smsError } = await supabase.functions.invoke('send-otp', {
        body: { phone, method: 'sms', username }
      });
      
      if (smsError) {
        console.error('SMS error:', smsError);
        throw new Error('Failed to send SMS OTP');
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-whatsapp-otp function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

async function sendWhatsAppOTP(phone: string, otp: string) {
  try {
    const accessToken = Deno.env.get('WHATSAPP_BUSINESS_API_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID') || '465811683912021';

    if (!accessToken) {
      throw new Error('WhatsApp Business API token not configured');
    }

    // Use WhatsApp template message for OTP
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: 'otp_verification',
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: otp }
              ]
            }
          ]
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WhatsApp API error:', errorText);
      
      // Fallback to simple text message if template fails
      const fallbackResponse = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: {
            body: `🔐 Your IJ Langa verification code is: ${otp}\n\nValid for 10 minutes. Do not share this code with anyone.\n\n- IJ Langa Consulting`
          }
        }),
      });

      if (!fallbackResponse.ok) {
        const fallbackError = await fallbackResponse.text();
        console.error('WhatsApp fallback error:', fallbackError);
        throw new Error('Failed to send WhatsApp OTP');
      }
    }

    console.log('WhatsApp OTP sent successfully to:', phone);
  } catch (error) {
    console.error('Error sending WhatsApp OTP:', error);
    throw error;
  }
}

serve(handler);
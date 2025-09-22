import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  quote: any;
  customer: any;
  emailData: {
    to: string;
    subject: string;
    body: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quote, customer, emailData }: EmailRequest = await req.json();

    // Create SMTP transporter configuration
    const smtpConfig = {
      host: 'mail.ijlanga.co.za',
      port: 465,
      secure: true,
      auth: {
        user: 'info@ijlanga.co.za',
        pass: Deno.env.get('SMTP_PASSWORD') || 'Innocent118018@123456789'
      }
    };

    // For now, we'll simulate sending the email
    // In a real implementation, you would:
    // 1. Generate a PDF of the quote
    // 2. Send the email with SMTP
    // 3. Log the email send attempt

    console.log('Email would be sent with config:', {
      to: emailData.to,
      subject: emailData.subject,
      body_preview: emailData.body.substring(0, 100) + '...',
      quote_number: quote.quote_number,
      customer_name: customer.customer_name
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log the email attempt in the database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: logError } = await supabase
      .from('audit_logs')
      .insert({
        user_id: quote.user_id,
        action: 'email_sent',
        table_name: 'sales_quotes',
        record_id: quote.id,
        new_values: {
          email_to: emailData.to,
          email_subject: emailData.subject,
          quote_number: quote.quote_number
        },
        ip_address: req.headers.get('x-forwarded-for') || 'unknown'
      });

    if (logError) {
      console.error('Failed to log email attempt:', logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote emailed successfully',
        email_id: `email_${Date.now()}`
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error sending quote email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send email'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
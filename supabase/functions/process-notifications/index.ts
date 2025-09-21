import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

interface Notification {
  id: string;
  channel: string;
  recipient: string;
  message: string;
  status: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing notifications...');

    // Get pending notifications
    const { data: notifications, error: fetchError } = await supabaseClient
      .from('notifications')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(10);

    if (fetchError) {
      console.error('Error fetching notifications:', fetchError);
      throw fetchError;
    }

    if (!notifications || notifications.length === 0) {
      console.log('No pending notifications found');
      return new Response(JSON.stringify({ message: 'No pending notifications' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`Found ${notifications.length} pending notifications`);

    // Process each notification
    const results = await Promise.allSettled(
      notifications.map(async (notification: Notification) => {
        try {
          if (notification.channel === 'email') {
            return await sendEmail(notification);
          } else if (notification.channel === 'whatsapp') {
            return await sendWhatsApp(notification);
          } else {
            throw new Error(`Unsupported channel: ${notification.channel}`);
          }
        } catch (error) {
          console.error(`Error processing notification ${notification.id}:`, error);
          
          // Update notification status to failed
          await supabaseClient
            .from('notifications')
            .update({
              status: 'failed',
              error_message: error.message,
              sent_at: new Date().toISOString()
            })
            .eq('id', notification.id);

          throw error;
        }
      })
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`Processed notifications: ${successful} successful, ${failed} failed`);

    return new Response(JSON.stringify({
      message: 'Notifications processed',
      successful,
      failed,
      total: notifications.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in process-notifications function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

async function sendEmail(notification: Notification): Promise<void> {
  console.log(`Sending email to ${notification.recipient}`);
  
  const emailResponse = await resend.emails.send({
    from: 'IJ Langa Security Alerts <alerts@ijlanga.co.za>',
    to: [notification.recipient],
    subject: '🔒 IJ Langa Security Alert - Role Permission Change',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #dc2626; margin-bottom: 20px;">🔒 Security Alert</h1>
        <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h2 style="color: #991b1b; margin-top: 0;">Role Permission Change Detected</h2>
          <pre style="background-color: #f9fafb; padding: 12px; border-radius: 4px; white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 14px;">${notification.message}</pre>
        </div>
        <p style="color: #374151; margin-bottom: 16px;">
          This is an automated security alert from IJ Langa system. If you did not make this change, please contact the system administrator immediately.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          This alert was generated automatically by the IJ Langa security monitoring system.
        </p>
      </div>
    `,
  });

  if (emailResponse.error) {
    throw new Error(`Email sending failed: ${emailResponse.error.message}`);
  }

  console.log('Email sent successfully:', emailResponse.data?.id);

  // Update notification status
  await supabaseClient
    .from('notifications')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString()
    })
    .eq('id', notification.id);
}

async function sendWhatsApp(notification: Notification): Promise<void> {
  console.log(`Sending WhatsApp to ${notification.recipient}`);
  
  const whatsappToken = Deno.env.get('WHATSAPP_BUSINESS_API_TOKEN');
  if (!whatsappToken) {
    throw new Error('WhatsApp Business API token not configured');
  }

  // Format phone number (remove + and ensure it starts with country code)
  const phoneNumber = notification.recipient.replace(/\+/, '').replace(/\s/g, '');

  const whatsappPayload = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "text",
    text: {
      body: notification.message
    }
  };

  const whatsappResponse = await fetch('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${whatsappToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(whatsappPayload),
  });

  if (!whatsappResponse.ok) {
    const errorData = await whatsappResponse.text();
    throw new Error(`WhatsApp sending failed: ${errorData}`);
  }

  const responseData = await whatsappResponse.json();
  console.log('WhatsApp sent successfully:', responseData.messages[0].id);

  // Update notification status
  await supabaseClient
    .from('notifications')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString()
    })
    .eq('id', notification.id);
}

serve(handler);
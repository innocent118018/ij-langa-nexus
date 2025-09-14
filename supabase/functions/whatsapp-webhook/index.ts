import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  type: string;
}

interface WhatsAppWebhookData {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        messages?: WhatsAppMessage[];
        statuses?: Array<{
          id: string;
          status: string;
          timestamp: string;
          recipient_id: string;
        }>;
      };
      field: string;
    }>;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle webhook verification (GET request)
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    const verifyToken = Deno.env.get('WHATSAPP_WEBHOOK_VERIFY_TOKEN');

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('Webhook verified successfully');
      return new Response(challenge, { status: 200 });
    } else {
      console.log('Webhook verification failed');
      return new Response('Forbidden', { status: 403 });
    }
  }

  // Handle OPTIONS for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const webhookData: WhatsAppWebhookData = await req.json();
    console.log('Received webhook data:', JSON.stringify(webhookData, null, 2));

    // Process each entry in the webhook
    for (const entry of webhookData.entry) {
      for (const change of entry.changes) {
        if (change.field === 'messages') {
          const { messages, metadata } = change.value;
          
          if (messages) {
            for (const message of messages) {
              await processIncomingMessage(supabase, message, metadata);
            }
          }

          // Handle message status updates
          if (change.value.statuses) {
            for (const status of change.value.statuses) {
              await updateMessageStatus(supabase, status);
            }
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

async function processIncomingMessage(
  supabase: any,
  message: WhatsAppMessage,
  metadata: any
) {
  try {
    // Find user by phone number
    const cleanPhone = message.from.replace(/\D/g, '');
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('phone', cleanPhone)
      .single();

    // Store the incoming message
    const { error: insertError } = await supabase
      .from('whatsapp_messages')
      .insert({
        wa_id: message.from,
        message_id: message.id,
        from_number: message.from,
        to_number: metadata.display_phone_number,
        message_type: message.type,
        content: message.text?.body || '',
        direction: 'inbound',
        user_id: user?.id || null,
        timestamp: new Date(parseInt(message.timestamp) * 1000).toISOString(),
      });

    if (insertError) {
      console.error('Error inserting message:', insertError);
      return;
    }

    // Process message commands
    const messageText = message.text?.body?.toLowerCase() || '';
    
    if (messageText.includes('order') || messageText.includes('quote')) {
      await sendOrderInstructions(supabase, message.from);
    } else if (messageText.includes('invoice') || messageText.includes('statement')) {
      await sendInvoiceInstructions(supabase, message.from, user?.id);
    } else if (messageText.includes('cancel')) {
      await handleCancellationRequest(supabase, message.from, user?.id);
    } else {
      await sendWelcomeMessage(supabase, message.from);
    }

  } catch (error) {
    console.error('Error processing message:', error);
  }
}

async function updateMessageStatus(supabase: any, status: any) {
  try {
    await supabase
      .from('whatsapp_messages')
      .update({ status: status.status })
      .eq('message_id', status.id);
  } catch (error) {
    console.error('Error updating message status:', error);
  }
}

async function sendOrderInstructions(supabase: any, toNumber: string) {
  const message = `📋 *Place an Order*

To place an order, please visit our website:
🌐 https://ijlanga.co.za/services

Or reply with:
• "TAX" for tax services
• "ACCOUNTING" for accounting services  
• "SECRETARIAL" for company services
• "PAYROLL" for payroll services

We'll send you a direct link to place your order.`;

  await sendWhatsAppMessage(supabase, toNumber, message);
}

async function sendInvoiceInstructions(supabase: any, toNumber: string, userId?: string) {
  if (!userId) {
    const message = `📄 *Invoice/Statement Request*

To access your invoices and statements, please:
1. Register an account at https://ijlanga.co.za/auth
2. Use the same phone number: ${toNumber}
3. Access your dashboard to view all invoices

Need help? Reply "HELP" for assistance.`;
    
    await sendWhatsAppMessage(supabase, toNumber, message);
    return;
  }

  // Get recent invoices for the user
  const { data: invoices } = await supabase
    .from('invoices')
    .select('reference, invoice_amount, status')
    .eq('customer_id', userId)
    .order('created_at', { ascending: false })
    .limit(3);

  let message = `📄 *Your Recent Invoices*\n\n`;
  
  if (invoices && invoices.length > 0) {
    invoices.forEach((invoice: any) => {
      message += `• Invoice ${invoice.reference}: R${invoice.invoice_amount} (${invoice.status})\n`;
    });
    message += `\nView all invoices: https://ijlanga.co.za/dashboard/my-invoices`;
  } else {
    message += `No invoices found. Visit https://ijlanga.co.za/dashboard for more details.`;
  }

  await sendWhatsAppMessage(supabase, toNumber, message);
}

async function handleCancellationRequest(supabase: any, toNumber: string, userId?: string) {
  if (!userId) {
    const message = `❌ *Order Cancellation*

To cancel an order, please:
1. Log into your account at https://ijlanga.co.za/dashboard
2. Go to "My Orders"
3. Select the order to cancel

Or provide your order number and we'll assist you.`;
    
    await sendWhatsAppMessage(supabase, toNumber, message);
    return;
  }

  // Get pending orders
  const { data: orders } = await supabase
    .from('orders')
    .select('id, status, total_amount, created_at')
    .eq('user_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (orders && orders.length > 0) {
    let message = `❌ *Cancellable Orders*\n\n`;
    orders.forEach((order: any, index: number) => {
      message += `${index + 1}. Order #${order.id.slice(0, 8)}: R${order.total_amount}\n`;
    });
    message += `\nReply with the order number to cancel, or visit https://ijlanga.co.za/dashboard/orders`;
    
    await sendWhatsAppMessage(supabase, toNumber, message);
  } else {
    await sendWhatsAppMessage(supabase, toNumber, `No cancellable orders found. Visit https://ijlanga.co.za/dashboard/orders for details.`);
  }
}

async function sendWelcomeMessage(supabase: any, toNumber: string) {
  const message = `👋 *Welcome to IJ Langa Consulting*

We provide professional:
• 📊 Accounting & Bookkeeping
• 📋 Tax Services  
• 🏢 Company Secretarial Services
• 💼 Payroll Services

*Quick Commands:*
• "ORDER" - Place new order
• "INVOICE" - View invoices
• "CANCEL" - Cancel order
• "HELP" - Get assistance

🌐 Visit: https://ijlanga.co.za
📞 Call: 013 004 0620`;

  await sendWhatsAppMessage(supabase, toNumber, message);
}

async function sendWhatsAppMessage(supabase: any, toNumber: string, message: string) {
  try {
    const accessToken = Deno.env.get('WHATSAPP_BUSINESS_API_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID') || '465811683912021';

    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: toNumber,
        type: 'text',
        text: { body: message }
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Error sending WhatsApp message:', result);
      return;
    }

    // Store outbound message
    await supabase
      .from('whatsapp_messages')
      .insert({
        wa_id: toNumber,
        message_id: result.messages?.[0]?.id,
        from_number: `+${phoneNumberId}`,
        to_number: toNumber,
        message_type: 'text',
        content: message,
        direction: 'outbound',
        status: 'sent',
      });

    console.log('WhatsApp message sent successfully:', result);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}

serve(handler);
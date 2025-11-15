import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface IKhokhaWebhookPayload {
  event_type: 'payment.success' | 'payment.failed' | 'payment.cancelled';
  transaction_id: string;
  payment_reference: string;
  amount: number;
  currency: string;
  status: string;
  paid_at?: string;
  metadata?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify webhook signature (in production, verify iKhokha signature)
    // const signature = req.headers.get('X-iKhokha-Signature');
    // if (!verifySignature(signature, body, IKHOKHA_WEBHOOK_SECRET)) {
    //   throw new Error('Invalid signature');
    // }

    const payload: IKhokhaWebhookPayload = await req.json();
    console.log('iKhokha webhook received:', payload);

    // Update payment status in database
    const updateData: any = {
      status: payload.status,
      updated_at: new Date().toISOString()
    };

    if (payload.paid_at) {
      updateData.paid_at = payload.paid_at;
    }

    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .update(updateData)
      .eq('payment_reference', payload.payment_reference)
      .select()
      .single();

    if (paymentError) {
      console.error('Error updating payment:', paymentError);
      throw paymentError;
    }

    // If payment successful, update contract status and create order
    if (payload.event_type === 'payment.success' && payment.contract_id) {
      // Update contract status
      await supabase
        .from('service_contracts')
        .update({
          status: 'active',
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.contract_id);

      // Create order record
      const metadata = payment.metadata as any;
      if (metadata?.items) {
        const orderItems = metadata.items.map((item: any) => ({
          name: item.name,
          quantity: item.qty,
          price: item.price,
          total: item.price * item.qty
        }));

        await supabase
          .from('orders')
          .insert({
            user_id: payment.user_id,
            total_amount: payment.amount,
            status: 'completed',
            payment_status: 'paid',
            payment_method: 'ikhokha',
            items: orderItems,
            created_at: new Date().toISOString()
          });
      }

      console.log('Payment processed successfully:', payment.payment_reference);
    }

    return new Response(
      JSON.stringify({ success: true, payment_reference: payment.payment_reference }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in ikhokha-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
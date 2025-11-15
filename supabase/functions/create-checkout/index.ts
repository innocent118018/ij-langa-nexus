import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  slug: string;
  contractNo?: string;
  contractUrl?: string;
  contractId?: string;
}

interface CheckoutRequest {
  items: CheckoutItem[];
  successBase: string;
  failBase: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const payload: CheckoutRequest = await req.json();
    console.log('Creating checkout for:', payload);

    // Calculate total amount
    const totalAmount = payload.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Generate unique payment reference
    const paymentRef = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Get first item's slug for redirect URLs
    const firstItemSlug = payload.items[0]?.slug || 'unknown';
    const successUrl = `${payload.successBase}/${firstItemSlug}/success?ref=${paymentRef}`;
    const failureUrl = `${payload.failBase}/${firstItemSlug}/failed?ref=${paymentRef}`;

    // TODO: Replace with actual iKhokha API call
    // For now, create a mock checkout URL
    // In production, you would call iKhokha's API here with your merchant credentials
    
    /*
    const ikhokhaResponse = await fetch('https://api.ikhokha.com/v1/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('IKHOKHA_APP_SECRET')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: 'ZAR',
        reference: paymentRef,
        success_url: successUrl,
        cancel_url: failureUrl,
        metadata: {
          user_id: user.id,
          items: payload.items,
          contracts: payload.items.filter(i => i.contractNo).map(i => ({
            contract_no: i.contractNo,
            contract_id: i.contractId
          }))
        }
      })
    });
    
    const ikhokhaData = await ikhokhaResponse.json();
    const checkoutUrl = ikhokhaData.checkout_url;
    const transactionId = ikhokhaData.transaction_id;
    */

    // Mock checkout URL for development
    const checkoutUrl = `https://checkout.ikhokha.com/pay/${paymentRef}`;
    const transactionId = `TXN-${Date.now()}`;

    // Store payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        payment_reference: paymentRef,
        ikhokha_transaction_id: transactionId,
        contract_id: payload.items[0]?.contractId || null,
        user_id: user.id,
        amount: totalAmount,
        currency: 'ZAR',
        status: 'pending',
        checkout_url: checkoutUrl,
        success_url: successUrl,
        failure_url: failureUrl,
        metadata: {
          items: payload.items,
          created_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      throw paymentError;
    }

    console.log('Checkout created successfully:', payment.payment_reference);

    return new Response(
      JSON.stringify({
        checkoutUrl,
        paymentReference: paymentRef,
        transactionId,
        amount: totalAmount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
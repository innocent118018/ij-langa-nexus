import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderRequest {
  serviceId: string;
  quantity?: number;
  hours?: number;
  notes?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Verify the JWT token and get user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid authentication token');
    }

    const { serviceId, quantity = 1, hours, notes }: OrderRequest = await req.json();

    // Get service details
    const { data: service, error: serviceError } = await supabaseClient
      .from('services')
      .select('*')
      .eq('id', serviceId)
      .single();

    if (serviceError || !service) {
      throw new Error('Service not found');
    }

    // Calculate total amount
    let totalAmount = service.price;
    if (hours && hours > 0) {
      totalAmount = service.price * hours;
    } else if (quantity > 1) {
      totalAmount = service.price * quantity;
    }

    // Add VAT
    const vatRate = service.vat_rate || 0.15;
    const vatAmount = totalAmount * vatRate;
    const totalWithVat = totalAmount + vatAmount;

    // Create the order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        service_id: serviceId,
        total_amount: totalWithVat,
        vat_amount: vatAmount,
        status: 'pending',
        notes: notes || `${service.name} - ${hours ? `${hours} hours` : `Quantity: ${quantity}`}`
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      throw new Error('Failed to create order');
    }

    console.log(`Order created successfully: ${order.id} for user ${user.id}`);

    // For now, return order details without payment integration
    // Payment integration can be added later
    return new Response(JSON.stringify({
      success: true,
      order: {
        id: order.id,
        service_name: service.name,
        total_amount: totalWithVat,
        vat_amount: vatAmount,
        status: order.status,
        created_at: order.created_at
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error in create-order function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
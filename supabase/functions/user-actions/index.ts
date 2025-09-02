import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { action, data } = await req.json();
    let response;

    switch (action) {
      case 'update-profile':
        // Update user's own profile
        const { error: updateError } = await supabaseClient
          .from('users')
          .update(data)
          .eq('id', user.id);
        
        if (updateError) throw updateError;
        response = { success: true, message: 'Profile updated successfully' };
        break;

      case 'mark-notification-read':
        // Mark user's own notification as read
        const { notificationId } = data;
        const { error: notificationError } = await supabaseClient
          .from('notifications')
          .update({ is_read: true })
          .eq('id', notificationId)
          .eq('user_id', user.id); // Ensure ownership
        
        if (notificationError) throw notificationError;
        response = { success: true, message: 'Notification marked as read' };
        break;

      case 'create-order':
        // Create order for the authenticated user
        const orderData = {
          ...data,
          user_id: user.id // Ensure ownership
        };
        
        const { data: newOrder, error: orderError } = await supabaseClient
          .from('orders')
          .insert(orderData)
          .select()
          .single();
        
        if (orderError) throw orderError;
        response = newOrder;
        break;

      case 'update-order':
        // Update user's own order
        const { orderId, updateData } = data;
        const { error: orderUpdateError } = await supabaseClient
          .from('orders')
          .update(updateData)
          .eq('id', orderId)
          .eq('user_id', user.id); // Ensure ownership
        
        if (orderUpdateError) throw orderUpdateError;
        response = { success: true, message: 'Order updated successfully' };
        break;

      default:
        throw new Error('Invalid action');
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in user-actions function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  user_id: string;
  title: string;
  message: string;
  type: string;
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

    const { user_id, title, message, type }: NotificationRequest = await req.json();

    if (!user_id || !title || !message || !type) {
      throw new Error('Missing required fields: user_id, title, message, type');
    }

    // Create notification in database
    const { data: notification, error } = await supabaseClient
      .from('notifications')
      .insert({
        user_id,
        title,
        message,
        type,
        is_read: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      throw new Error('Failed to create notification');
    }

    console.log(`Notification created successfully: ${notification.id} for user ${user_id}`);

    return new Response(JSON.stringify({
      success: true,
      notification
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error in create-notification function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Calculate 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Auto-cancel pending orders older than 7 days
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        admin_notes: 'Auto-cancelled: Payment not received within 7 days',
        updated_at: new Date().toISOString()
      })
      .eq('status', 'pending')
      .lt('created_at', sevenDaysAgo.toISOString())
      .select()

    if (error) {
      console.error('Error auto-cancelling orders:', error)
      throw error
    }

    console.log(`Auto-cancelled ${data?.length || 0} orders`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        cancelledOrders: data?.length || 0,
        message: `Auto-cancelled ${data?.length || 0} expired orders`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in auto-cancel-orders function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
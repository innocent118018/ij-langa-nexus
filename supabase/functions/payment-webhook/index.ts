import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, ik-appid, ik-sign',
}

interface WebhookPayload {
  paylinkID: string
  externalTransactionID: string
  amount: number
  currency: string
  responseCode: string
  responseDescription?: string
  status?: string
  [key: string]: any
}

async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    const signatureBytes = new Uint8Array(
      signature.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    )
    
    return await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(payload)
    )
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
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

    const appSecret = Deno.env.get('IKHOKHA_APP_SECRET')
    if (!appSecret) {
      throw new Error('iKhokha secret not configured')
    }

    // Get webhook payload
    const payload: WebhookPayload = await req.json()
    console.log('Webhook received:', payload)

    // Verify signature if provided
    const signature = req.headers.get('ik-sign') || req.headers.get('IK-SIGN')
    if (signature) {
      const rawBody = JSON.stringify(payload)
      const isValid = await verifySignature(rawBody, signature, appSecret)
      if (!isValid) {
        console.error('Invalid webhook signature')
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    // Extract order ID from externalTransactionID (format: ORDER-{uuid}-{timestamp})
    const orderId = payload.externalTransactionID?.match(/ORDER-([a-f0-9-]+)-/)?.[1]
    
    if (!orderId) {
      console.error('Could not extract order ID from:', payload.externalTransactionID)
      return new Response(JSON.stringify({ error: 'Invalid transaction ID format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Determine payment status from response code
    // iKhokha: "00" = success, others = failure
    const isSuccess = payload.responseCode === "00"
    const status = isSuccess ? 'paid' : 'failed'

    console.log('Payment status:', { orderId, status, responseCode: payload.responseCode })

    // Log webhook event
    await supabase.from('payment_logs').insert({
      order_id: orderId,
      status: status,
      request_data: null,
      response_data: payload,
      error_message: isSuccess ? null : payload.responseDescription,
    })

    // Update order status
    if (isSuccess) {
      const { error: orderError } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (orderError) {
        console.error('Error updating order:', orderError)
      } else {
        console.log('Order marked as paid:', orderId)
        
        // Check if this is a service subscription order
        const { data: order } = await supabase
          .from('orders')
          .select('*, order_items(*, services(*))')
          .eq('id', orderId)
          .single()

        if (order && order.order_items?.[0]?.services) {
          const service = order.order_items[0].services
          
          // Create service contract (24 months as per requirements)
          const startDate = new Date()
          const endDate = new Date()
          endDate.setMonth(endDate.getMonth() + 24)

          try {
            // Generate contract number
            const { data: contractNumber } = await supabase
              .rpc('generate_contract_number')

            // Create contract
            await supabase.from('service_contracts').insert({
              user_id: order.user_id,
              contract_number: contractNumber || `SC-${Date.now()}`,
              service_name: service.name,
              service_price: service.price,
              start_date: startDate.toISOString().split('T')[0],
              end_date: endDate.toISOString().split('T')[0],
              status: 'active',
              payment_status: 'paid',
              order_id: orderId,
            })

            console.log('Service contract created for order:', orderId)
          } catch (contractError) {
            console.error('Error creating contract:', contractError)
            // Don't fail the webhook if contract creation fails
          }
        }
      }
    } else {
      // Mark order as failed
      await supabase
        .from('orders')
        .update({ 
          status: 'payment_failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
    }

    return new Response(JSON.stringify({ success: true, status }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Webhook processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

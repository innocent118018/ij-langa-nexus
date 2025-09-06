
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  orderId: string
  amount: number
  description: string
  customerEmail: string
  externalTransactionID: string
}

function createPayloadToSign(urlPath: string, body: string): string {
  try {
    const url = new URL(urlPath)
    const basePath = url.pathname
    const payload = basePath + body
    return jsStringEscape(payload)
  } catch (error) {
    console.error('Error on createPayloadToSign:', error)
    throw error
  }
}

function jsStringEscape(str: string): string {
  try {
    return str.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0")
  } catch (error) {
    console.error('Error on jsStringEscape:', error)
    throw error
  }
}

async function createHmacSignature(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const hashArray = Array.from(new Uint8Array(signature))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with anon key for auth verification
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Create Supabase client with service role for database operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    let user = null
    
    if (authHeader) {
      // Try to verify the user with anon key client
      const { data: authData, error: authError } = await supabaseAuth.auth.getUser(authHeader.replace('Bearer ', ''))
      if (!authError && authData?.user) {
        user = authData.user
      }
    }

    const { orderId, amount, description, customerEmail, externalTransactionID }: PaymentRequest = await req.json()

    // Get iKhokha credentials from environment
    const appId = Deno.env.get('IKHOKHA_APP_ID')
    const appSecret = Deno.env.get('IKHOKHA_APP_SECRET')

    console.log('iKhokha credentials check:', {
      appId: appId ? `${appId.substring(0, 4)}...` : 'missing',
      appSecret: appSecret ? `${appSecret.substring(0, 4)}...` : 'missing'
    })

    if (!appId || !appSecret) {
      throw new Error('iKhokha credentials not configured')
    }

    // Create the payment request
    const apiEndPoint = "https://api.ikhokha.com/public-api/v1/api/payment"
    const baseUrl = req.headers.get('origin') || 'https://preview--ij-langa-nexus.lovable.app'
    
    const paymentRequest = {
      entityID: appId,
      externalEntityID: user?.id || 'guest',
      amount: Math.round(amount * 100), // Convert to cents
      currency: "ZAR",
      requesterUrl: baseUrl,
      mode: "live",
      description: description,
      externalTransactionID: externalTransactionID,
      urls: {
        callbackUrl: `${baseUrl}/api/payment-callback`,
        successPageUrl: `${baseUrl}/dashboard?payment=success&order=${orderId}`,
        failurePageUrl: `${baseUrl}/checkout?payment=failed&order=${orderId}`,
        cancelUrl: `${baseUrl}/checkout?payment=cancelled&order=${orderId}`
      }
    }

    const requestBody = JSON.stringify(paymentRequest)
    console.log('Payment request:', paymentRequest)

    // Create payload to sign
    const payloadToSign = createPayloadToSign(apiEndPoint, requestBody)
    console.log('Payload to sign:', payloadToSign)

    // Generate signature
    const signature = await createHmacSignature(payloadToSign, appSecret)
    console.log('Generated signature:', signature)

    // Make request to iKhokha API
    const response = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'IK-APPID': appId,
        'IK-SIGN': signature,
      },
      body: requestBody
    })

    const responseData = await response.json()
    console.log('iKhokha response:', responseData)

    if (!response.ok) {
      console.error('iKhokha API error:', {
        status: response.status,
        statusText: response.statusText,
        responseData
      })
      throw new Error(`iKhokha API error: ${responseData.message || 'Unknown error'}`)
    }

    // Check if we got a valid response with payment URL
    if (!responseData.paylinkUrl && !responseData.paylink_url && !responseData.url) {
      console.error('No payment URL in response:', responseData)
      throw new Error(`iKhokha API didn't return a payment URL. Response: ${JSON.stringify(responseData)}`)
    }

    // Log the payment creation (only if user is authenticated)
    if (user) {
      try {
        await supabase
          .from('payment_logs')
          .insert({
            order_id: orderId,
            user_id: user.id,
            status: 'payment_link_created',
            request_data: paymentRequest,
            response_data: responseData
          })
      } catch (logError) {
        console.error('Error logging payment:', logError)
        // Don't fail the payment creation if logging fails
      }
    }

    // Return the payment link URL for checkout redirection
    return new Response(JSON.stringify({
      success: true,
      paylinkUrl: responseData.paylinkUrl || responseData.paylink_url || responseData.url,
      transactionId: responseData.transactionId || responseData.transaction_id,
      ...responseData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error creating payment:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

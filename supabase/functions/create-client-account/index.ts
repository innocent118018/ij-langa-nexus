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

    // Check if user is admin
    const { data: userRole, error: roleError } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (roleError) {
      console.error('Role check error:', roleError);
      throw new Error('Failed to verify user permissions');
    }

    if (!userRole || !['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole.role)) {
      throw new Error('Insufficient permissions - admin access required');
    }

    const body = await req.json();
    const { clientData } = body;

    if (!clientData) {
      throw new Error('Client data is required');
    }

    if (!clientData.email || !clientData.full_name) {
      throw new Error('Email and full name are required fields');
    }

    // Create the user account with a temporary password
    const tempPassword = `TempPass${Math.random().toString(36).substring(7)}!`;
    
    const { data: newUser, error: signUpError } = await supabaseClient.auth.admin.createUser({
      email: clientData.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: clientData.full_name,
        company_name: clientData.company_name,
        phone: clientData.phone,
        id_number: clientData.id_number,
        address: clientData.address,
        company_registration: clientData.company_registration,
        role: 'client'
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    // Background task for database updates and notifications
    const backgroundUpdates = async () => {
      try {
        // Parallel database operations for better performance
        const [userUpdateResult, customerResult] = await Promise.allSettled([
          supabaseClient
            .from('users')
            .update({
              full_name: clientData.full_name,
              company_name: clientData.company_name,
              phone: clientData.phone,
              id_number: clientData.id_number,
              company_registration: clientData.company_registration,
              role: 'client'
            })
            .eq('id', newUser.user.id),
          
          supabaseClient
            .from('customers')
            .insert({
              name: clientData.company_name || clientData.full_name,
              email: clientData.email,
              phone: clientData.phone,
              address: clientData.address,
              status: 'Active'
            })
        ]);

        // Log any errors but don't fail the main response
        if (userUpdateResult.status === 'rejected') {
          console.error('User update failed:', userUpdateResult.reason);
        }
        if (customerResult.status === 'rejected') {
          console.warn('Customer creation failed:', customerResult.reason);
        }

        // Send welcome email to client
        try {
          await supabaseClient.functions.invoke('send-notification-email', {
            body: {
              type: 'client_welcome',
              data: {
                client_name: clientData.full_name,
                email: clientData.email,
                temp_password: tempPassword,
                company_name: clientData.company_name
              }
            }
          });
        } catch (emailError) {
          console.error('Welcome email failed:', emailError);
          // Don't fail the whole request if email fails
        }
      } catch (error) {
        console.error('Background updates failed:', error);
      }
    };

    // Start background task without awaiting
    if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime.waitUntil) {
      EdgeRuntime.waitUntil(backgroundUpdates());
    } else {
      // Fallback: run in background
      backgroundUpdates();
    }

    // Return immediate response for better user experience
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Client account created successfully',
      user_id: newUser.user.id,
      temp_password: tempPassword
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-client-account function:', error);
    
    // Handle specific error types
    let status = 400;
    let message = error.message;
    
    if (error.message?.includes('rate limit')) {
      status = 429;
      message = 'Rate limit exceeded. Please try again in a few minutes.';
    } else if (error.message?.includes('User already registered')) {
      status = 409;
      message = 'A user with this email already exists.';
    } else if (error.message?.includes('Invalid email')) {
      status = 400;
      message = 'Please provide a valid email address.';
    }
    
    return new Response(JSON.stringify({ 
      error: message,
      code: status 
    }), {
      status: status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
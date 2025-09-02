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
    const { data: userRole } = await supabaseClient
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!userRole || !['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole.role)) {
      throw new Error('Insufficient permissions');
    }

    const { clientData } = await req.json();

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

    // Update the user profile with additional business information
    const { error: updateError } = await supabaseClient
      .from('users')
      .update({
        full_name: clientData.full_name,
        company_name: clientData.company_name,
        phone: clientData.phone,
        id_number: clientData.id_number,
        company_registration: clientData.company_registration,
        role: 'client'
      })
      .eq('id', newUser.user.id);

    if (updateError) {
      throw updateError;
    }

    // Create a customer record
    const { error: customerError } = await supabaseClient
      .from('customers')
      .insert({
        name: clientData.company_name || clientData.full_name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        status: 'Active'
      });

    if (customerError) {
      console.warn('Customer creation failed:', customerError);
    }

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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
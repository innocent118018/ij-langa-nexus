import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const VerifyOTPSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  otp: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits'),
  autoRedirect: z.boolean().optional()
});

interface VerifyOTPRequest {
  phone: string;
  otp: string;
  autoRedirect?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = VerifyOTPSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Validation failed'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    
    const { phone, otp, autoRedirect = false } = validationResult.data;
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify OTP
    const { data: otpData, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('phone', phone)
      .eq('code', otp)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (otpError || !otpData) {
      console.error('Invalid OTP:', otpError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid or expired OTP'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check if user exists with this phone
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', phone) // Assuming phone is stored in email field for WhatsApp auth
      .single();

    let userId = null;
    let isNewUser = false;

    if (userError && userError.code === 'PGRST116') {
      // User doesn't exist, create new user if username was provided during OTP request
      if (otpData.username) {
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: phone,
          phone: phone,
          user_metadata: {
            full_name: otpData.username,
            phone: phone,
            auth_method: 'whatsapp_otp'
          },
          email_confirm: true,
          phone_confirm: true
        });

        if (authError) {
          console.error('Error creating user:', authError);
          throw new Error('Failed to create user account');
        }

        userId = authUser.user?.id;
        isNewUser = true;

        // Create user record in public schema
        await supabase
          .from('users')
          .insert({
            id: userId,
            email: phone,
            full_name: otpData.username,
            role: 'client',
            is_active: true,
            auth_method: 'whatsapp_otp'
          });
      } else {
        return new Response(JSON.stringify({
          success: false,
          error: 'User does not exist. Please provide username during registration.',
          requires_registration: true
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    } else if (userError) {
      throw userError;
    } else {
      userId = userData.id;
    }

    // Generate session token for the user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: phone,
      options: {
        redirectTo: autoRedirect ? 'https://ijlanga.co.za/dashboard' : undefined
      }
    });

    if (sessionError) {
      console.error('Error generating session:', sessionError);
      throw new Error('Failed to generate user session');
    }

    // Delete used OTP
    await supabase
      .from('otp_codes')
      .delete()
      .eq('phone', phone)
      .eq('code', otp);

    // Update user's last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    // Send login notification template
    if (!isNewUser) {
      const currentTime = new Date().toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      // Call send-whatsapp-template function for login notification
      await supabase.functions.invoke('send-whatsapp-template', {
        body: {
          to: phone,
          templateName: 'login_notification',
          variables: [
            userData.full_name || 'User',
            currentTime,
            'Web Browser - South Africa'
          ]
        }
      });
    }

    const response: any = {
      success: true,
      message: 'OTP verified successfully',
      user_id: userId,
      is_new_user: isNewUser,
      access_token: sessionData.properties?.access_token,
      refresh_token: sessionData.properties?.refresh_token
    };

    if (autoRedirect && sessionData.properties?.action_link) {
      response.redirect_url = sessionData.properties.action_link;
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in verify-whatsapp-otp function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Authentication failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
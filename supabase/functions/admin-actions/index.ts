import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdminActionRequest {
  action: string;
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Verify the user is authenticated and is an admin
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("Authentication failed");
    }

    // Check if user is admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData || !['admin', 'super_admin', 'accountant', 'consultant'].includes(userData.role)) {
      throw new Error("Insufficient permissions");
    }

    const { action, data }: AdminActionRequest = await req.json();

    let result;

    switch (action) {
      case 'send-password-reset':
        const { email, clientName } = data;
        
        // Generate password reset link using Supabase Auth
        const { data: resetData, error: resetError } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: email,
        });

        if (resetError) {
          throw new Error(`Failed to generate reset link: ${resetError.message}`);
        }

        // Send email via Resend
        const emailResponse = await resend.emails.send({
          from: "IJ Langa Consulting <noreply@ijlanga.co.za>",
          to: [email],
          subject: "Password Reset - IJ Langa Consulting",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #1f2937;">Password Reset Request</h1>
              <p>Dear ${clientName},</p>
              <p>You have requested a password reset for your IJ Langa Consulting account.</p>
              <p>Click the button below to reset your password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetData.properties.action_link}" 
                   style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Reset Password
                </a>
              </div>
              <p>If you didn't request this reset, please ignore this email.</p>
              <p>This link will expire in 1 hour for security reasons.</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                IJ Langa Consulting Team<br>
                <a href="https://ijlanga.co.za">www.ijlanga.co.za</a>
              </p>
            </div>
          `,
        });

        result = { success: true, emailId: emailResponse.data?.id };
        break;

      case 'create-client':
        const { email: newEmail, fullName, phone, companyName } = data;
        
        // Create user in auth
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: newEmail,
          email_confirm: true,
          user_metadata: {
            full_name: fullName,
            phone: phone,
            company_name: companyName
          }
        });

        if (createError) {
          throw new Error(`Failed to create user: ${createError.message}`);
        }

        // Update user profile in users table
        const { error: profileError } = await supabase
          .from('users')
          .update({
            full_name: fullName,
            phone: phone,
            company_name: companyName,
            role: 'client'
          })
          .eq('id', newUser.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }

        // Create customer record
        const { error: customerError } = await supabase
          .from('customers')
          .insert({
            name: fullName,
            email: newEmail,
            phone: phone,
            status: 'Active'
          });

        if (customerError) {
          console.error('Customer creation error:', customerError);
        }

        // Send welcome email with password setup
        const { data: welcomeResetData, error: welcomeResetError } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: newEmail,
        });

        if (!welcomeResetError && welcomeResetData) {
          await resend.emails.send({
            from: "IJ Langa Consulting <noreply@ijlanga.co.za>",
            to: [newEmail],
            subject: "Welcome to IJ Langa Consulting",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #1f2937;">Welcome to IJ Langa Consulting!</h1>
                <p>Dear ${fullName},</p>
                <p>Your account has been created successfully. Please set up your password by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${welcomeResetData.properties.action_link}" 
                     style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    Set Up Password
                  </a>
                </div>
                <p>Once you've set up your password, you can access your client portal at:</p>
                <p><strong>Portal URL:</strong> <a href="https://ijlanga.co.za/auth">https://ijlanga.co.za/auth</a></p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                  Best regards,<br>
                  IJ Langa Consulting Team<br>
                  <a href="https://ijlanga.co.za">www.ijlanga.co.za</a>
                </p>
              </div>
            `,
          });
        }

        result = { success: true, userId: newUser.user.id };
        break;

      case 'upload-client-document':
        const { clientId, fileName, fileData, documentType, description } = data;
        
        // Upload document for client
        const { error: docError } = await supabase
          .from('documents')
          .insert({
            user_id: clientId,
            file_name: fileName,
            file_path: fileData.path || fileName,
            document_type: documentType,
            description: description,
            mime_type: fileData.mimeType,
            file_size: fileData.size,
            uploaded_by: user.id,
            category: 'admin_upload'
          });

        if (docError) {
          throw new Error(`Failed to upload document: ${docError.message}`);
        }

        // Create notification for client
        await supabase
          .from('notifications')
          .insert({
            user_id: clientId,
            title: 'New Document Uploaded',
            message: `A new document "${fileName}" has been uploaded to your account.`,
            type: 'info'
          });

        result = { success: true };
        break;

      case 'create-client-invoice':
        const { customerId, invoiceData } = data;
        
        // Create invoice
        const { error: invoiceError } = await supabase
          .from('invoices')
          .insert({
            customer_id: customerId,
            reference: invoiceData.reference,
            issue_date: invoiceData.issueDate,
            invoice_amount: invoiceData.amount,
            balance_due: invoiceData.balanceDue,
            status: invoiceData.status || 'Unpaid'
          });

        if (invoiceError) {
          throw new Error(`Failed to create invoice: ${invoiceError.message}`);
        }

        result = { success: true };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in admin-actions function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
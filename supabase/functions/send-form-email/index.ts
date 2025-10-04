import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormEmailRequest {
  name: string;
  email: string;
  message?: string;
  phone?: string;
  company?: string;
  subject?: string;
  formType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormEmailRequest = await req.json();
    
    console.log("Processing form email:", formData);

    // Create email content based on form type
    const emailSubject = formData.subject || `New ${formData.formType} from ${formData.name}`;
    
    const emailContent = `
      <h2>New ${formData.formType} Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
      ${formData.message ? `<p><strong>Message:</strong></p><p>${formData.message.replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><em>Submitted on ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</em></p>
    `;

    // Send email to info@ijlanga.co.za
    const adminEmailResponse = await resend.emails.send({
      from: "IJ Langa Consulting <noreply@ijlanga.co.za>",
      to: ["info@ijlanga.co.za"],
      subject: emailSubject,
      html: emailContent,
      replyTo: formData.email,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation email to the sender
    const confirmationContent = `
      <h2>Thank you for contacting IJ Langa Consulting</h2>
      <p>Dear ${formData.name},</p>
      <p>We have received your ${formData.formType.toLowerCase()} and will get back to you as soon as possible.</p>
      
      <h3>Your submission details:</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
      ${formData.message ? `<p><strong>Message:</strong></p><p>${formData.message.replace(/\n/g, '<br>')}</p>` : ''}
      
      <p>Best regards,<br>
      IJ Langa Consulting (Pty) Ltd<br>
      Email: info@ijlanga.co.za<br>
      Phone: +27 11 123 4567</p>
    `;

    const confirmationEmailResponse = await resend.emails.send({
      from: "IJ Langa Consulting <noreply@ijlanga.co.za>",
      to: [formData.email],
      subject: `Thank you for your ${formData.formType.toLowerCase()} - IJ Langa Consulting`,
      html: confirmationContent,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      adminEmail: adminEmailResponse,
      confirmationEmail: confirmationEmailResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-form-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
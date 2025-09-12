import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MessageEmailRequest {
  type: 'new_message' | 'message_reply';
  data: {
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
    subject: string;
    content: string;
    messageId: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: MessageEmailRequest = await req.json();

    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'new_message':
        subject = `New Message: ${data.subject}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 30px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">📨 New Message Received</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">IJ Langa Consulting - Messages & Support</p>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #1e40af; margin: 0 0 20px 0;">Message Details</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">From:</strong> ${data.senderName} (${data.senderEmail})
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">To:</strong> ${data.recipientName} (${data.recipientEmail})
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Subject:</strong> ${data.subject}
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #374151;">Message:</strong>
                  <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 8px; white-space: pre-wrap;">${data.content}</div>
                </div>
                
                <div style="text-align: center; margin-top: 25px;">
                  <a href="https://ijlanga.co.za/dashboard/messages" 
                     style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    View in Dashboard
                  </a>
                </div>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p>This is an automated message from IJ Langa Consulting support system.</p>
              <p>© 2025 IJ Langa Consulting. All rights reserved.</p>
            </div>
          </div>
        `;
        break;

      case 'message_reply':
        subject = `Reply to: ${data.subject}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">💬 Message Reply</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">IJ Langa Consulting - Messages & Support</p>
            </div>
            
            <div style="padding: 30px; background: #f0fdf4;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #059669; margin: 0 0 20px 0;">Reply Details</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">From:</strong> ${data.senderName} (${data.senderEmail})
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">To:</strong> ${data.recipientName} (${data.recipientEmail})
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Subject:</strong> ${data.subject}
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #374151;">Reply:</strong>
                  <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; margin-top: 8px; white-space: pre-wrap;">${data.content}</div>
                </div>
                
                <div style="text-align: center; margin-top: 25px;">
                  <a href="https://ijlanga.co.za/dashboard/messages" 
                     style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    View Conversation
                  </a>
                </div>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p>This is an automated message from IJ Langa Consulting support system.</p>
              <p>© 2025 IJ Langa Consulting. All rights reserved.</p>
            </div>
          </div>
        `;
        break;

      default:
        throw new Error('Invalid message type');
    }

    // Send email to recipient
    const emailResponse = await resend.emails.send({
      from: "IJ Langa Consulting <info@ijlanga.co.za>",
      to: [data.recipientEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Message email sent successfully:", emailResponse);

    // Send copy to sender for new messages
    if (type === 'new_message') {
      const confirmationResponse = await resend.emails.send({
        from: "IJ Langa Consulting <info@ijlanga.co.za>",
        to: [data.senderEmail],
        subject: `Message Sent: ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 30px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">✅ Message Sent Successfully</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">IJ Langa Consulting</p>
            </div>
            
            <div style="padding: 30px; background: #faf5ff;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #7c3aed; margin: 0 0 20px 0;">Your Message Has Been Sent</h2>
                
                <p style="color: #374151; margin-bottom: 15px;">
                  Hi ${data.senderName},
                </p>
                
                <p style="color: #374151; margin-bottom: 15px;">
                  Your message titled "<strong>${data.subject}</strong>" has been successfully sent to our support team.
                </p>
                
                <p style="color: #374151; margin-bottom: 20px;">
                  We typically respond within 24 hours during business days. You'll receive a notification when there's a reply.
                </p>
                
                <div style="text-align: center; margin-top: 25px;">
                  <a href="https://ijlanga.co.za/dashboard/messages" 
                     style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                    View Your Messages
                  </a>
                </div>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Thank you for choosing IJ Langa Consulting.</p>
              <p>© 2025 IJ Langa Consulting. All rights reserved.</p>
            </div>
          </div>
        `,
      });

      console.log("Confirmation email sent:", confirmationResponse);
    }

    return new Response(JSON.stringify({ 
      success: true,
      emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-message-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
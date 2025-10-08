import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContractEmailRequest {
  email: string;
  clientName: string;
  companyName: string;
  contractNumber: string;
  packageName: string;
  packagePrice: number;
  startDate: string;
  endDate: string;
  contractHTML: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      email,
      clientName,
      companyName,
      contractNumber,
      packageName,
      packagePrice,
      startDate,
      endDate,
      contractHTML,
    }: ContractEmailRequest = await req.json();

    console.log("Sending contract email to:", email);

    const emailResponse = await resend.emails.send({
      from: "IJ Langa Consulting <order@ijlanga.co.za>",
      to: [email],
      subject: `Service Contract Activated - ${contractNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0D1B2A; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .logo { width: 60px; margin-bottom: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 5px 5px; }
            .highlight { background: white; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #0D1B2A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Contract Activated Successfully! 🎉</h1>
            </div>
            <div class="content">
              <p>Dear ${clientName},</p>
              
              <p>We're excited to confirm that your service contract with <strong>IJ Langa Consulting (Pty) Ltd</strong> has been successfully activated.</p>
              
              <div class="highlight">
                <p><strong>Contract Details:</strong></p>
                <p>📄 Contract Number: <strong>${contractNumber}</strong><br>
                📦 Package: <strong>${packageName}</strong><br>
                💰 Monthly Fee: <strong>R${(packagePrice * 1.15).toFixed(2)}</strong> (incl. VAT)<br>
                📅 Contract Period: <strong>${startDate} to ${endDate}</strong><br>
                🏢 Company: <strong>${companyName}</strong></p>
              </div>

              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Your first invoice has been generated and is available in your dashboard</li>
                <li>Monthly invoices will be issued automatically</li>
                <li>You can access all your contracts and invoices anytime in the client portal</li>
                <li>Your dedicated account manager will contact you within 24 hours</li>
              </ul>

              <p style="text-align: center;">
                <a href="https://ijlanga.co.za/dashboard/contracts" class="button">View My Contracts</a>
              </p>

              <p>A copy of your signed contract is attached to this email for your records. You can also download it anytime from your dashboard.</p>

              <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>

              <p>Thank you for choosing IJ Langa Consulting!</p>

              <p>Best regards,<br>
              <strong>IJ Langa Consulting Team</strong><br>
              📞 013 004 0620<br>
              📧 order@ijlanga.co.za</p>
            </div>
            <div class="footer">
              <p>IJ Langa Consulting (Pty) Ltd | Registration No: 2020/754266/07<br>
              78 Tekatakho, Nelspruit, Mpumalanga, South Africa<br>
              <a href="https://ijlanga.co.za">www.ijlanga.co.za</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Contract_${contractNumber}.html`,
          content: Buffer.from(contractHTML).toString('base64'),
        },
      ],
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending contract email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

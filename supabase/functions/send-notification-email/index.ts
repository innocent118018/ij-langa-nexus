import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  type: 'order' | 'billing' | 'contact' | 'payment' | 'client_welcome';
  data: any;
  customerEmail?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data, customerEmail }: NotificationRequest = await req.json();
    
    let emailTo: string[] = [];
    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'order':
        emailTo = ['orders@ijlanga.co.za'];
        subject = `New Order Received - Order #${data.id}`;
        htmlContent = `
          <h2>New Order Received</h2>
          <p><strong>Order ID:</strong> ${data.id}</p>
          <p><strong>Customer:</strong> ${data.customer_name || 'N/A'}</p>
          <p><strong>Email:</strong> ${data.customer_email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${data.customer_phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${data.service_name || 'N/A'}</p>
          <p><strong>Total Amount:</strong> R${data.total_amount}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Notes:</strong> ${data.notes || 'None'}</p>
          <p><strong>Created:</strong> ${new Date(data.created_at).toLocaleString()}</p>
        `;
        break;

      case 'billing':
        emailTo = ['billings@ijlanga.co.za'];
        subject = `Billing Notification - ${data.type}`;
        htmlContent = `
          <h2>Billing Notification</h2>
          <p><strong>Type:</strong> ${data.type}</p>
          <p><strong>Amount:</strong> R${data.amount}</p>
          <p><strong>Customer:</strong> ${data.customer}</p>
          <p><strong>Reference:</strong> ${data.reference || 'N/A'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;

      case 'contact':
        emailTo = ['info@ijlanga.co.za'];
        subject = `New Contact Form Submission - ${data.name}`;
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Service Type:</strong> ${data.service_type || 'N/A'}</p>
          <p><strong>Budget Range:</strong> ${data.budget_range || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message || 'No message provided'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;

      case 'payment':
        emailTo = ['billings@ijlanga.co.za'];
        subject = `Payment Notification - ${data.status}`;
        htmlContent = `
          <h2>Payment Notification</h2>
          <p><strong>Payment ID:</strong> ${data.id}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Amount:</strong> R${data.amount}</p>
          <p><strong>Transaction ID:</strong> ${data.transaction_id || 'N/A'}</p>
          <p><strong>Payment Method:</strong> ${data.payment_method || 'N/A'}</p>
          <p><strong>Customer:</strong> ${customerEmail}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;

      case 'client_welcome':
        emailTo = [data.email];
        subject = 'Welcome to IJ Langa Consulting';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb;">Welcome to IJ Langa Consulting</h1>
            </div>
            
            <h2>Account Created Successfully</h2>
            <p>Dear ${data.client_name},</p>
            
            <p>Your client account has been created successfully. You can now access your client portal to manage your services, view invoices, and communicate with our team.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #dc2626;">Login Credentials</h3>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Temporary Password:</strong> ${data.temp_password}</p>
              <p style="color: #dc2626; font-weight: bold;">⚠️ Please login and change your password immediately for security.</p>
            </div>
            
            ${data.company_name ? `<p><strong>Company:</strong> ${data.company_name}</p>` : ''}
            
            <div style="margin: 30px 0;">
              <h3>What's Next?</h3>
              <ol>
                <li>Login to your client portal</li>
                <li>Change your password</li>
                <li>Complete your profile information</li>
                <li>Upload any required documents</li>
              </ol>
            </div>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>
            <strong>IJ Langa Consulting Team</strong><br>
            Email: info@ijlanga.co.za<br>
            Phone: +27 11 234 5678</p>
          </div>
        `;
        break;

      default:
        throw new Error('Invalid notification type');
    }

    // Send notification email
    const emailResponse = await resend.emails.send({
      from: "IJ Langa CA <notifications@ijlanga.co.za>",
      to: emailTo,
      subject: subject,
      html: htmlContent,
    });

    // Send confirmation email to customer if provided
    if (customerEmail && type === 'order') {
      await resend.emails.send({
        from: "IJ Langa CA <orders@ijlanga.co.za>",
        to: [customerEmail],
        subject: `Order Confirmation - Order #${data.id}`,
        html: `
          <h2>Order Confirmation</h2>
          <p>Thank you for your order! We have received your request and will process it shortly.</p>
          <p><strong>Order ID:</strong> ${data.id}</p>
          <p><strong>Service:</strong> ${data.service_name}</p>
          <p><strong>Total Amount:</strong> R${data.total_amount}</p>
          <p>We will contact you soon with next steps.</p>
          <p>Best regards,<br>IJ Langa CA Team</p>
        `,
      });
    }

    console.log(`${type} notification sent successfully:`, emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error sending notification email:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
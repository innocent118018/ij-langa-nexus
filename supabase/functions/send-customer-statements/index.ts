import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CustomerStatement {
  customerId: string;
  customerName: string;
  customerEmail: string;
  totalOutstanding: number;
  invoices: any[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get SMTP settings from environment or database
    const smtpHost = Deno.env.get("SMTP_HOST") || "mail.ijlanga.co.za";
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER") || "info@ijlanga.co.za";
    const smtpPass = Deno.env.get("SMTP_PASS") || "";

    // Calculate 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch customers who need statements
    // Either never sent or last sent more than 30 days ago
    const { data: customers, error: customersError } = await supabase
      .from('customer_accounts')
      .select(`
        id,
        customer_name,
        email,
        last_statement_sent,
        statement_enabled
      `)
      .or(`last_statement_sent.is.null,last_statement_sent.lt.${thirtyDaysAgo.toISOString()}`)
      .eq('account_status', 'active')
      .limit(100);

    if (customersError) {
      throw new Error(`Failed to fetch customers: ${customersError.message}`);
    }

    console.log(`Found ${customers?.length || 0} customers needing statements`);

    const results = {
      processed: 0,
      sent: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const customer of customers || []) {
      results.processed++;

      try {
        // Fetch unpaid invoices for this customer
        const { data: invoices, error: invoicesError } = await supabase
          .from('sales_invoices')
          .select('*')
          .eq('customer_id', customer.id)
          .in('status', ['sent', 'overdue', 'partial'])
          .gt('balance_due', 0);

        if (invoicesError) {
          throw new Error(`Failed to fetch invoices: ${invoicesError.message}`);
        }

        if (!invoices || invoices.length === 0) {
          console.log(`No outstanding invoices for ${customer.customer_name}`);
          continue;
        }

        // Calculate total outstanding
        const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0);

        // Generate statement HTML
        const statementHtml = generateStatementHtml({
          customerId: customer.id,
          customerName: customer.customer_name,
          customerEmail: customer.email,
          totalOutstanding,
          invoices
        });

        // Send email using fetch (for SMTP, use a proper email service)
        // For production, integrate with Resend, SendGrid, or similar
        const emailSent = await sendStatementEmail({
          to: customer.email,
          subject: `Monthly Customer Statement - IJ Langa Consulting`,
          html: statementHtml,
          smtpConfig: { host: smtpHost, port: smtpPort, user: smtpUser, pass: smtpPass }
        });

        if (emailSent) {
          // Update last_statement_sent
          await supabase
            .from('customer_accounts')
            .update({ last_statement_sent: new Date().toISOString() })
            .eq('id', customer.id);

          // Log audit entry
          await supabase.from('audit_logs').insert({
            action: 'statement_sent',
            table_name: 'customer_accounts',
            record_id: customer.id,
            new_values: { 
              sent_to: customer.email, 
              total_outstanding: totalOutstanding,
              invoice_count: invoices.length 
            }
          });

          results.sent++;
          console.log(`Statement sent to ${customer.email}`);
        } else {
          throw new Error('Email sending failed');
        }

      } catch (err: any) {
        results.failed++;
        results.errors.push(`${customer.customer_name}: ${err.message}`);
        
        // Log failure
        await supabase.from('audit_logs').insert({
          action: 'statement_failed',
          table_name: 'customer_accounts',
          record_id: customer.id,
          new_values: { error: err.message }
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Statement job completed`,
      results
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-customer-statements:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateStatementHtml(statement: CustomerStatement): string {
  const today = new Date().toLocaleDateString('en-ZA');
  
  const invoiceRows = statement.invoices.map(inv => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${inv.invoice_number || 'N/A'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date(inv.issue_date).toLocaleDateString('en-ZA')}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${inv.due_date ? new Date(inv.due_date).toLocaleDateString('en-ZA') : '-'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">R${(inv.total_amount || 0).toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">R${(inv.balance_due || 0).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Customer Statement</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1e40af; margin-bottom: 5px;">IJ Langa Consulting (Pty) Ltd</h1>
        <p style="color: #666; margin: 0;">78 Tekatakho, Nelspruit, Mpumalanga, 2350</p>
        <p style="color: #666; margin: 0;">Tel: +27 XX XXX XXXX | Email: info@ijlanga.co.za</p>
        <p style="color: #666; margin: 0;">SAIBA No: 16176 | FSP No: 14279</p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="margin: 0 0 10px; color: #1e40af;">Customer Statement</h2>
        <p style="margin: 5px 0;"><strong>Customer:</strong> ${statement.customerName}</p>
        <p style="margin: 5px 0;"><strong>Statement Date:</strong> ${today}</p>
        <p style="margin: 5px 0;"><strong>Account ID:</strong> ${statement.customerId.slice(0, 8)}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background: #1e40af; color: white;">
            <th style="padding: 12px; text-align: left;">Invoice #</th>
            <th style="padding: 12px; text-align: left;">Issue Date</th>
            <th style="padding: 12px; text-align: left;">Due Date</th>
            <th style="padding: 12px; text-align: right;">Total</th>
            <th style="padding: 12px; text-align: right;">Balance Due</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceRows}
        </tbody>
        <tfoot>
          <tr style="background: #f3f4f6; font-weight: bold;">
            <td colspan="4" style="padding: 12px; text-align: right;">Total Outstanding:</td>
            <td style="padding: 12px; text-align: right; color: #dc2626;">R${statement.totalOutstanding.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #92400e;"><strong>Payment Terms:</strong> Payment is due within 7 days of invoice date. A late payment fee of 10% may be applied to overdue accounts.</p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666;">
        <p>Thank you for your business. Please contact us if you have any queries.</p>
        <p style="font-size: 12px;">This statement was automatically generated on ${today}</p>
      </div>
    </body>
    </html>
  `;
}

async function sendStatementEmail(options: {
  to: string;
  subject: string;
  html: string;
  smtpConfig: { host: string; port: number; user: string; pass: string };
}): Promise<boolean> {
  // For production, use a proper email service like Resend
  // This is a placeholder - implement actual SMTP or use Resend API
  
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  
  if (RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "IJ Langa Consulting <noreply@ijlanga.co.za>",
          to: options.to,
          subject: options.subject,
          html: options.html,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Resend error:", error);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Email send error:", err);
      return false;
    }
  }

  // Fallback: log that email would be sent (for testing)
  console.log(`[EMAIL MOCK] Would send to: ${options.to}`);
  console.log(`[EMAIL MOCK] Subject: ${options.subject}`);
  return true; // Return true for testing purposes
}

serve(handler);

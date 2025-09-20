import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TriggerRequest {
  flow_type: string;
  contact_id?: string;
  user_id?: string;
  order_id?: string;
  custom_data?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { flow_type, contact_id, user_id, order_id, custom_data }: TriggerRequest = await req.json();

    console.log(`Triggering automation flow: ${flow_type}`);

    // Get active flows of the specified type
    const { data: flows, error: flowError } = await supabaseClient
      .from('automation_flows')
      .select('*')
      .eq('flow_type', flow_type)
      .eq('is_active', true);

    if (flowError) {
      console.error('Error fetching flows:', flowError);
      throw new Error('Failed to fetch automation flows');
    }

    if (!flows || flows.length === 0) {
      console.log(`No active flows found for type: ${flow_type}`);
      return new Response(JSON.stringify({
        success: true,
        message: `No active flows for ${flow_type}`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    // Get contact information
    let contact = null;
    if (contact_id) {
      const { data: contactData, error: contactError } = await supabaseClient
        .from('customer_contacts')
        .select('*')
        .eq('id', contact_id)
        .eq('is_subscribed', true)
        .single();

      if (contactError) {
        console.error('Error fetching contact:', contactError);
        throw new Error('Contact not found or unsubscribed');
      }
      contact = contactData;
    } else if (user_id) {
      const { data: contactData, error: contactError } = await supabaseClient
        .from('customer_contacts')
        .select('*')
        .eq('user_id', user_id)
        .eq('is_subscribed', true)
        .single();

      if (contactError) {
        console.log('No contact found for user:', user_id);
        return new Response(JSON.stringify({
          success: true,
          message: 'User not subscribed to emails'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }
      contact = contactData;
    }

    if (!contact) {
      throw new Error('No valid contact found');
    }

    // Process each flow
    for (const flow of flows) {
      console.log(`Processing flow: ${flow.name}`);
      
      // Execute actions
      for (const action of flow.actions) {
        if (action.type === 'send_email') {
          await executeEmailAction(supabaseClient, flow, contact, action, custom_data);
        } else if (action.type === 'add_tag') {
          await executeTagAction(supabaseClient, contact, action);
        }
      }

      // Log execution
      await supabaseClient
        .from('flow_executions')
        .insert({
          flow_id: flow.id,
          contact_id: contact.id,
          execution_data: {
            flow_type,
            custom_data,
            contact_email: contact.email
          },
          status: 'completed'
        });
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Automation flows triggered for ${contact.email}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error in trigger-automation-flow function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function executeEmailAction(supabaseClient: any, flow: any, contact: any, action: any, customData: any) {
  try {
    // Get email template
    const { data: template, error: templateError } = await supabaseClient
      .from('email_templates')
      .select('*')
      .eq('template_type', flow.flow_type)
      .eq('is_active', true)
      .single();

    if (templateError) {
      console.error('Template not found for flow type:', flow.flow_type);
      return;
    }

    // Replace merge tags
    let subject = template.subject;
    let htmlContent = template.html_content;
    
    const mergeData = {
      '@@Customer@@': `${contact.first_name} ${contact.last_name}`.trim() || contact.email,
      '@@Date@@': new Date().toLocaleDateString(),
      '@@Reference@@': customData?.reference || '',
      '@@OrderAmount@@': customData?.order_amount || '',
      '@@InvoiceAmount@@': customData?.invoice_amount || '',
      '@@InvoiceStatus@@': customData?.invoice_status || '',
      '@@DeliveryStatus@@': customData?.delivery_status || '',
      '@@Timestamp@@': new Date().toISOString()
    };

    // Replace all merge tags
    Object.entries(mergeData).forEach(([tag, value]) => {
      subject = subject.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
      htmlContent = htmlContent.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'Ij Langa Consulting <info@ijlanga.co.za>',
      to: [contact.email],
      subject: subject,
      html: htmlContent,
    });

    console.log(`Email sent to ${contact.email}:`, emailResponse);

  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function executeTagAction(supabaseClient: any, contact: any, action: any) {
  try {
    const currentTags = contact.tags || [];
    const newTag = action.tag;
    
    if (!currentTags.includes(newTag)) {
      const updatedTags = [...currentTags, newTag];
      
      await supabaseClient
        .from('customer_contacts')
        .update({ tags: updatedTags })
        .eq('id', contact.id);
        
      console.log(`Tag "${newTag}" added to contact ${contact.email}`);
    }
  } catch (error) {
    console.error('Error adding tag:', error);
    throw error;
  }
}
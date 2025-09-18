import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WhatsAppTemplateRequest {
  to: string;
  templateName: string;
  variables: string[];
  redirectUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, templateName, variables, redirectUrl }: WhatsAppTemplateRequest = await req.json();
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get template from database
    const { data: template, error: templateError } = await supabase
      .from('whatsapp_templates')
      .select('*')
      .eq('name', templateName)
      .eq('status', 'active')
      .single();

    if (templateError || !template) {
      console.error('Template not found:', templateError);
      throw new Error(`Template ${templateName} not found`);
    }

    // Get WhatsApp API credentials
    const whatsappToken = Deno.env.get('WHATSAPP_BUSINESS_API_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    
    if (!whatsappToken || !phoneNumberId) {
      throw new Error('WhatsApp API credentials not configured');
    }

    // Build template message
    let templateBody = template.template_body;
    variables.forEach((variable, index) => {
      templateBody = templateBody.replace(`{{${index + 1}}}`, variable);
    });

    const messagePayload: any = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: template.language || 'en'
        },
        components: []
      }
    };

    // Add header component if exists
    if (template.header_content) {
      messagePayload.template.components.push({
        type: 'header',
        parameters: []
      });
    }

    // Add body component with variables
    if (variables.length > 0) {
      messagePayload.template.components.push({
        type: 'body',
        parameters: variables.map(variable => ({
          type: 'text',
          text: variable
        }))
      });
    }

    // Add button component if exists
    if (template.button_type && template.button_text) {
      const buttons = template.button_text.split('|');
      const buttonComponents = buttons.map((buttonText, index) => {
        if (template.button_type === 'Call to Action' && redirectUrl) {
          return {
            type: 'button',
            sub_type: 'url',
            index: index,
            parameters: [{
              type: 'text',
              text: redirectUrl
            }]
          };
        } else {
          return {
            type: 'button',
            sub_type: 'quick_reply',
            index: index
          };
        }
      });
      
      messagePayload.template.components.push(...buttonComponents);
    }

    // Send WhatsApp message
    const whatsappResponse = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messagePayload)
    });

    const responseData = await whatsappResponse.json();

    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', responseData);
      throw new Error(`WhatsApp API error: ${JSON.stringify(responseData)}`);
    }

    // Log the sent message
    await supabase
      .from('whatsapp_messages')
      .insert({
        wa_id: responseData.messages?.[0]?.id || 'unknown',
        from_number: phoneNumberId,
        to_number: to,
        message_type: 'template',
        content: templateBody,
        direction: 'outbound',
        status: 'sent',
        metadata: {
          template_name: templateName,
          variables: variables,
          response: responseData
        }
      });

    console.log('WhatsApp template sent successfully:', responseData);

    return new Response(JSON.stringify({
      success: true,
      message: 'Template sent successfully',
      whatsapp_response: responseData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in send-whatsapp-template function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
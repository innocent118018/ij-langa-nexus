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

    // Handle empty request body safely
    let endpoint = 'profile'; // default endpoint
    try {
      const body = await req.text();
      if (body && body.trim()) {
        const parsed = JSON.parse(body);
        endpoint = parsed.endpoint || 'profile';
      }
    } catch (parseError) {
      console.log('Using default endpoint due to parsing error:', parseError);
    }

    let response;

    switch (endpoint) {
      case 'profile':
        // Get user's own profile data
        const { data: profile, error: profileError } = await supabaseClient
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        response = profile;
        break;

      case 'notifications':
        // Get user's own notifications
        const { data: notifications, error: notificationsError } = await supabaseClient
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (notificationsError) throw notificationsError;
        response = notifications;
        break;

      case 'orders':
        // Get user's own orders
        const { data: orders, error: ordersError } = await supabaseClient
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (ordersError) throw ordersError;
        response = orders;
        break;

      case 'invoices':
        // Get invoices for user's customer record - use left join to handle missing customer records
        const { data: invoices, error: invoicesError } = await supabaseClient
          .from('invoices')
          .select(`
            *,
            customers(name)
          `)
          .eq('customers.email', user.email)
          .order('issue_date', { ascending: false });
        
        response = invoices || [];
        break;

      case 'dashboard-metrics':
        // Get dashboard metrics for the user
        const [
          { data: userOrders },
          { data: userNotifications },
          { data: userInvoices }
        ] = await Promise.all([
          supabaseClient.from('orders').select('*').eq('user_id', user.id),
          supabaseClient.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
          supabaseClient.from('invoices').select('*, customers(name)').eq('customers.email', user.email)
        ]);

        const activeServices = userOrders?.filter(order => order.status === 'completed' || order.status === 'processing').length || 0;
        const pendingOrders = userOrders?.filter(order => order.status === 'pending' || order.status === 'processing').length || 0;
        const unpaidInvoices = userInvoices?.filter(inv => inv.status === 'Unpaid' || inv.balance_due > 0) || [];
        const totalPendingAmount = unpaidInvoices.reduce((sum, invoice) => sum + Number(invoice.balance_due || 0), 0);

        response = {
          orders: userOrders || [],
          notifications: userNotifications || [],
          invoices: userInvoices || [],
          metrics: {
            activeServices,
            pendingOrders,
            unpaidAmount: totalPendingAmount,
            pendingInvoices: unpaidInvoices.length
          }
        };
        break;

      default:
        throw new Error('Invalid endpoint');
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in user-data function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
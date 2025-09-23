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
          .from('profiles')
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
        // Get invoices for user's customer record - use sales_invoices table
        const { data: invoices, error: invoicesError } = await supabaseClient
          .from('sales_invoices')
          .select(`
            *,
            customers:customer_accounts(customer_name)
          `)
          .eq('user_id', user.id)
          .order('issue_date', { ascending: false });
        
        response = invoices || [];
        break;

      case 'dashboard-metrics':
        // Check if user is admin
        const { data: adminUser } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        const isAdmin = adminUser?.role && ['admin', 'super_admin', 'accountant', 'consultant'].includes(adminUser.role);

        if (isAdmin) {
          // Admin dashboard with customer data
          const [
            { data: allOrders },
            { data: adminNotifications },
            { data: allInvoices },
            { data: customers }
          ] = await Promise.all([
            supabaseClient
              .from('orders')
              .select('id, status, total_amount, created_at, customer_name, user_id')
              .order('created_at', { ascending: false })
              .limit(100),
            supabaseClient
              .from('notifications')
              .select('id, title, message, type, is_read, created_at')
              .order('created_at', { ascending: false })
              .limit(20),
            supabaseClient
              .from('sales_invoices')
              .select('id, invoice_number, total_amount, balance_due, status, issue_date, days_overdue, customers:customer_accounts(customer_name, email)')
              .order('issue_date', { ascending: false })
              .limit(50),
            supabaseClient
              .from('customer_accounts')
              .select('id, customer_name, email, phone, billing_address, account_status')
              .order('customer_name')
          ]);

          // Calculate admin metrics
          const totalCustomers = customers?.length || 0;
          const totalRevenue = allOrders?.filter(order => order.status === 'completed')
            .reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;
          const pendingOrders = allOrders?.filter(order => 
            order.status === 'pending' || order.status === 'processing'
          ).length || 0;
          const totalUnpaid = allInvoices?.filter(inv => 
            inv.status === 'Unpaid' || (inv.balance_due && Number(inv.balance_due) > 0)
          ).reduce((sum, inv) => sum + Number(inv.balance_due || 0), 0) || 0;

          response = {
            orders: allOrders || [],
            notifications: adminNotifications || [],
            invoices: allInvoices || [],
            customers: customers || [],
            metrics: {
              totalCustomers,
              totalRevenue,
              pendingOrders,
              unpaidAmount: totalUnpaid,
              activeServices: allOrders?.filter(order => 
                order.status === 'completed' || order.status === 'processing'
              ).length || 0,
              pendingInvoices: allInvoices?.filter(inv => 
                inv.status === 'Unpaid' || (inv.balance_due && Number(inv.balance_due) > 0)
              ).length || 0
            }
          };
        } else {
          // Regular user dashboard - optimized for client users
          const [
            { data: userOrders },
            { data: userNotifications },
            { data: userInvoices }
          ] = await Promise.all([
            supabaseClient
              .from('orders')
              .select('id, status, total_amount, created_at, customer_name')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(50),
            supabaseClient
              .from('notifications')
              .select('id, title, message, type, is_read, created_at')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(10),
            supabaseClient
              .from('sales_invoices')
              .select('id, invoice_number, total_amount, balance_due, status, issue_date, days_overdue, customers:customer_accounts(customer_name)')
              .eq('user_id', user.id)
              .order('issue_date', { ascending: false })
              .limit(20)
          ]);

          // Pre-calculate metrics to reduce client-side computation
          const activeServices = userOrders?.filter(order => 
            order.status === 'completed' || order.status === 'processing'
          ).length || 0;
          
          const pendingOrders = userOrders?.filter(order => 
            order.status === 'pending' || order.status === 'processing'
          ).length || 0;
          
          const unpaidInvoices = userInvoices?.filter(inv => 
            inv.status === 'Unpaid' || (inv.balance_due && Number(inv.balance_due) > 0)
          ) || [];
          
          const totalPendingAmount = unpaidInvoices.reduce((sum, invoice) => 
            sum + Number(invoice.balance_due || 0), 0
          );

          response = {
            orders: userOrders || [],
            notifications: userNotifications || [],
            invoices: userInvoices || [],
            customers: [], // Regular users don't see customer data
            metrics: {
              activeServices,
              pendingOrders,
              unpaidAmount: totalPendingAmount,
              pendingInvoices: unpaidInvoices.length
            }
          };
        }
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
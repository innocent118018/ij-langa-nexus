
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardData = () => {
  // Fetch invoices data - now uses direct user relationship
  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customers(name)
        `)
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch customers data - admins see all, users see their linked records
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch user's own orders
  const { data: orders = [] } = useQuery({
    queryKey: ['user-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch services data (public)
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch user's notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    }
  });

  // Calculate dashboard metrics
  const totalRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.invoice_amount || 0), 0);
  const activeClients = customers.length;
  const unpaidInvoices = invoices.filter(inv => inv.status === 'Overdue' || inv.balance_due > 0);
  const totalUnpaidAmount = unpaidInvoices.reduce((sum, invoice) => sum + Number(invoice.balance_due || 0), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'processing').length;

  return {
    invoices,
    customers,
    orders,
    services,
    notifications,
    metrics: {
      totalRevenue,
      activeClients,
      unpaidAmount: totalUnpaidAmount,
      pendingOrders
    }
  };
};
